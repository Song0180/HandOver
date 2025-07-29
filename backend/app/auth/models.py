import uuid
from datetime import datetime, timezone
from sqlmodel import SQLModel, Field


class Token(SQLModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenPayload(SQLModel):
    sub: str | None = None


class RefreshTokenRequest(SQLModel):
    refresh_token: str


class RefreshToken(SQLModel, table=True):
    __tablename__ = "refresh_tokens"
    
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    token: str = Field(unique=True, index=True)
    user_id: uuid.UUID = Field(foreign_key="user.id", index=True)
    expires_at: datetime = Field(index=True)
    is_revoked: bool = Field(default=False)
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    revoked_at: datetime | None = Field(default=None)
