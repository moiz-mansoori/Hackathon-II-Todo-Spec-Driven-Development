"""Authentication routes."""

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from database import get_session
from models.user import UserCreate, UserRead, UserLogin
from services.auth_service import AuthService


router = APIRouter(prefix="/api/auth", tags=["auth"])


class TokenResponse(UserRead):
    """Response with user data and token."""
    token: str


@router.post("/signup", response_model=TokenResponse)
def signup(
    user_data: UserCreate,
    session: Annotated[Session, Depends(get_session)]
):
    """Create a new user account."""
    # Check if email already exists
    existing = AuthService.get_user_by_email(session, user_data.email)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Validate password length
    if len(user_data.password) < 8:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 8 characters"
        )
    
    # Create user
    user = AuthService.create_user(session, user_data)
    token = AuthService.create_access_token(user.id)
    
    return TokenResponse(id=user.id, email=user.email, token=token)


@router.post("/signin", response_model=TokenResponse)
def signin(
    credentials: UserLogin,
    session: Annotated[Session, Depends(get_session)]
):
    """Sign in with email and password."""
    user = AuthService.authenticate_user(
        session, 
        credentials.email, 
        credentials.password
    )
    
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token = AuthService.create_access_token(user.id)
    return TokenResponse(id=user.id, email=user.email, token=token)


@router.post("/signout")
def signout():
    """Sign out (client-side token invalidation)."""
    return {"success": True, "message": "Signed out successfully"}


@router.get("/me", response_model=UserRead)
def get_me(
    session: Annotated[Session, Depends(get_session)],
    credentials: Annotated[str, Depends(AuthService.verify_token)]
):
    """Get current user info."""
    from ..dependencies import get_current_user
    # This is a simplified version - proper implementation in dependencies
    return {"id": 0, "email": "placeholder"}
