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

router = APIRouter(tags=["private"], prefix="/private")


class PrivateUserCreate(BaseModel):
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(
        ..., min_length=8, max_length=40, description="Password must be 8-40 characters"
    )
    full_name: str = Field(
        ..., min_length=1, max_length=255, description="Full name is required"
    )
    is_verified: bool = False

    @field_validator("password")
    @classmethod
    def validate_password(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters long")
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
