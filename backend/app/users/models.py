import uuid

from pydantic import EmailStr
from sqlmodel import Field, SQLModel

from app.users.constants import (
    EMAIL_MAX_LENGTH,
    NAME_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    PASSWORD_MAX_LENGTH,
)


# Shared properties
class UserBase(SQLModel):
    email: EmailStr = Field(unique=True, index=True, max_length=EMAIL_MAX_LENGTH)
    is_active: bool = True
    is_superuser: bool = False
    name: str | None = Field(default=None, max_length=NAME_MAX_LENGTH)


class UserCreate(UserBase):
    password: str = Field(
        min_length=PASSWORD_MIN_LENGTH, max_length=PASSWORD_MAX_LENGTH
    )


class UserRegister(SQLModel):
    email: EmailStr = Field(max_length=EMAIL_MAX_LENGTH)
    password: str = Field(
        min_length=PASSWORD_MIN_LENGTH, max_length=PASSWORD_MAX_LENGTH
    )
    name: str | None = Field(default=None, max_length=NAME_MAX_LENGTH)


class UserUpdate(UserBase):
    email: EmailStr | None = Field(default=None, max_length=EMAIL_MAX_LENGTH)  # type: ignore
    password: str | None = Field(default=None, min_length=8, max_length=40)


class UserUpdateMe(SQLModel):
    name: str | None = Field(default=None, max_length=NAME_MAX_LENGTH)
    email: EmailStr | None = Field(default=None, max_length=EMAIL_MAX_LENGTH)


class NewPassword(SQLModel):
    token: str
    new_password: str = Field(
        min_length=PASSWORD_MIN_LENGTH, max_length=PASSWORD_MAX_LENGTH
    )


class UpdatePassword(SQLModel):
    current_password: str = Field(
        min_length=PASSWORD_MIN_LENGTH, max_length=PASSWORD_MAX_LENGTH
    )
    new_password: str = Field(
        min_length=PASSWORD_MIN_LENGTH, max_length=PASSWORD_MAX_LENGTH
    )


class User(UserBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    hashed_password: str


class UserPublic(UserBase):
    id: uuid.UUID


class UsersPublic(SQLModel):
    data: list[UserPublic]
    count: int
