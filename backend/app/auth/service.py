import uuid
from datetime import datetime, timezone
from sqlmodel import Session, select
from app.users.models import User
from app.users.service import get_user_by_email
from app.auth.models import RefreshToken
from app.auth.utils import verify_password, create_refresh_token, get_refresh_token_expires_at


def authenticate(*, session: Session, email: str, password: str) -> User | None:
    db_user = get_user_by_email(session=session, email=email)
    if not db_user:
        return None
    if not verify_password(password, db_user.hashed_password):
        return None
    return db_user


def create_refresh_token_for_user(*, session: Session, user_id: uuid.UUID) -> RefreshToken:
    """Create a new refresh token for a user."""
    token = create_refresh_token()
    expires_at = get_refresh_token_expires_at()
    
    refresh_token = RefreshToken(
        token=token,
        user_id=user_id,
        expires_at=expires_at
    )
    
    session.add(refresh_token)
    session.commit()
    session.refresh(refresh_token)
    return refresh_token


def get_refresh_token(*, session: Session, token: str) -> RefreshToken | None:
    """Get a refresh token by token string."""
    statement = select(RefreshToken).where(
        RefreshToken.token == token,
        RefreshToken.is_revoked == False,
        RefreshToken.expires_at > datetime.now(timezone.utc)
    )
    return session.exec(statement).first()


def revoke_refresh_token(*, session: Session, token: str) -> bool:
    """Revoke a specific refresh token."""
    refresh_token = session.exec(
        select(RefreshToken).where(RefreshToken.token == token)
    ).first()
    
    if not refresh_token:
        return False
    
    refresh_token.is_revoked = True
    refresh_token.revoked_at = datetime.now(timezone.utc)
    session.add(refresh_token)
    session.commit()
    return True


def revoke_all_user_refresh_tokens(*, session: Session, user_id: uuid.UUID) -> int:
    """Revoke all refresh tokens for a user."""
    statement = select(RefreshToken).where(
        RefreshToken.user_id == user_id,
        RefreshToken.is_revoked == False
    )
    tokens = session.exec(statement).all()
    
    now = datetime.now(timezone.utc)
    count = 0
    for token in tokens:
        token.is_revoked = True
        token.revoked_at = now
        session.add(token)
        count += 1
    
    session.commit()
    return count


def cleanup_expired_refresh_tokens(*, session: Session) -> int:
    """Remove expired refresh tokens from the database."""
    statement = select(RefreshToken).where(
        RefreshToken.expires_at < datetime.now(timezone.utc)
    )
    expired_tokens = session.exec(statement).all()
    
    count = len(expired_tokens)
    for token in expired_tokens:
        session.delete(token)
    
    session.commit()
    return count
