from datetime import timedelta
from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.auth.dependencies import CurrentUser, SessionDep
from app.core.config import settings
from app.core.models import Message
from app.users.models import NewPassword, UserPublic, User

from app.auth.models import Token, RefreshTokenRequest
from app.auth.service import (
    authenticate, 
    get_user_by_email, 
    create_refresh_token_for_user,
    get_refresh_token,
    revoke_refresh_token,
    revoke_all_user_refresh_tokens
)
from app.auth.utils import (
    get_password_hash,
    create_access_token,
    verify_password_reset_token,
    # generate_password_reset_token,
)

router = APIRouter(tags=["login"])


@router.post("/login/access-token")
def login_access_token(
    session: SessionDep, form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token:
    """
    OAuth2 compatible token login, get an access token for future requests
    """
    user = authenticate(
        session=session, email=form_data.username, password=form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.id, expires_delta=access_token_expires)
    
    refresh_token = create_refresh_token_for_user(session=session, user_id=user.id)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token.token
    )


@router.post("/login/test-token", response_model=UserPublic)
def test_token(current_user: CurrentUser) -> Any:
    """
    Test access token
    """
    return current_user


@router.post("/reset-password/")
def reset_password(session: SessionDep, body: NewPassword) -> Message:
    """
    Reset password
    """
    email = verify_password_reset_token(token=body.token)
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid token"
        )
    user = get_user_by_email(session=session, email=email)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="The user with this email does not exist in the system.",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )
    hashed_password = get_password_hash(password=body.new_password)
    user.hashed_password = hashed_password
    session.add(user)
    session.commit()
    return Message(message="Password updated successfully")


@router.post("/refresh-token")
def refresh_token(session: SessionDep, request: RefreshTokenRequest) -> Token:
    """
    Exchange refresh token for new access token and refresh token
    """
    token_data = get_refresh_token(session=session, token=request.refresh_token)
    if not token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )
    
    user = session.get(User, token_data.user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Inactive user"
        )
    
    revoke_refresh_token(session=session, token=request.refresh_token)
    
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(user.id, expires_delta=access_token_expires)
    
    new_refresh_token = create_refresh_token_for_user(session=session, user_id=user.id)
    
    return Token(
        access_token=access_token,
        refresh_token=new_refresh_token.token
    )


@router.post("/logout")
def logout(session: SessionDep, request: RefreshTokenRequest) -> Message:
    """
    Logout by revoking refresh token
    """
    success = revoke_refresh_token(session=session, token=request.refresh_token)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid refresh token",
        )
    return Message(message="Successfully logged out")


@router.post("/revoke-all-tokens")
def revoke_all_tokens(session: SessionDep, current_user: CurrentUser) -> Message:
    """
    Revoke all refresh tokens for current user (security measure)
    """
    count = revoke_all_user_refresh_tokens(session=session, user_id=current_user.id)
    return Message(message=f"Revoked {count} refresh tokens")


# @router.post("/password-recovery/{email}")
# def recover_password(email: str, session: SessionDep) -> Message:
#     """
#     Password Recovery
#     """
#     user = crud.get_user_by_email(session=session, email=email)

#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this email does not exist in the system.",
#         )
#     password_reset_token = generate_password_reset_token(email=email)
#     email_data = generate_reset_password_email(
#         email_to=user.email, email=email, token=password_reset_token
#     )
#     send_email(
#         email_to=user.email,
#         subject=email_data.subject,
#         html_content=email_data.html_content,
#     )
#     return Message(message="Password recovery email sent")


# @router.post(
#     "/password-recovery-html-content/{email}",
#     dependencies=[Depends(get_current_active_superuser)],
#     response_class=HTMLResponse,
# )
# def recover_password_html_content(email: str, session: SessionDep) -> Any:
#     """
#     HTML Content for Password Recovery
#     """
#     user = crud.get_user_by_email(session=session, email=email)

#     if not user:
#         raise HTTPException(
#             status_code=404,
#             detail="The user with this username does not exist in the system.",
#         )
#     password_reset_token = generate_password_reset_token(email=email)
#     email_data = generate_reset_password_email(
#         email_to=user.email, email=email, token=password_reset_token
#     )

#     return HTMLResponse(
#         content=email_data.html_content, headers={"subject:": email_data.subject}
#     )
