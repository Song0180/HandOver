from typing import Any

from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr, Field, field_validator
from sqlmodel import select
import re

from app.auth.dependencies import SessionDep
from app.auth.utils import get_password_hash
from app.users.models import (
    User,
    UserPublic,
)
from app.users.constants import (
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
)

router = APIRouter(tags=["private"], prefix="/private")


class PrivateUserCreate(BaseModel):
    email: EmailStr = Field(
        ..., max_length=EMAIL_MAX_LENGTH, description="Valid email address"
    )
    password: str = Field(
        ...,
        min_length=PASSWORD_MIN_LENGTH,
        max_length=PASSWORD_MAX_LENGTH,
        description="Password must be 8-40 characters",
    )
    full_name: str = Field(
        ...,
        min_length=1,
        max_length=NAME_MAX_LENGTH,
        description="Full name is required",
    )
    is_verified: bool = False

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < PASSWORD_MIN_LENGTH:
            raise ValueError(
                f"Password must be at least {PASSWORD_MIN_LENGTH} characters long"
            )
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain at least one digit")
        return v


@router.post("/users/", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def create_user(user_in: PrivateUserCreate, session: SessionDep) -> Any:
    """
    Create a new user for local development.
    """

    # Check if user already exists
    existing_user = session.exec(
        select(User).where(User.email == user_in.email)
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists",
        )

    try:
        user = User(
            email=user_in.email,
            name=user_in.full_name,
            hashed_password=get_password_hash(user_in.password),
        )

        session.add(user)
        session.commit()
        session.refresh(user)

        return user
    except Exception:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create user",
        )
