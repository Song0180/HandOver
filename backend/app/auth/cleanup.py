"""
Cleanup utilities for refresh tokens.
This module provides functions to clean up expired tokens and can be used
for scheduled cleanup tasks.
"""

from sqlmodel import Session
from app.core.db import engine
from app.auth.service import cleanup_expired_refresh_tokens


def cleanup_expired_tokens() -> int:
    """
    Clean up expired refresh tokens from the database.
    This function can be called periodically to remove old tokens.
    
    Returns:
        int: Number of tokens cleaned up
    """
    with Session(engine) as session:
        count = cleanup_expired_refresh_tokens(session=session)
        return count


if __name__ == "__main__":
    count = cleanup_expired_tokens()
    print(f"Cleaned up {count} expired refresh tokens")