from fastapi import APIRouter

from app.auth.routes import router as auth_router
from app.users.routes import router as users_router
from app.users.private_routes import router as private_router
from app.core.config import settings

api_router = APIRouter()
api_router.include_router(auth_router)
api_router.include_router(users_router)


if settings.ENVIRONMENT == "local":
    api_router.include_router(private_router)
