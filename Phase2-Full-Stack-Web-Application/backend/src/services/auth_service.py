"""Authentication service for user management and JWT handling."""

from datetime import datetime, timedelta
from typing import Optional
import hashlib
import secrets
from jose import jwt, JWTError
from sqlmodel import Session, select
from ..models.user import User, UserCreate
from ..config import get_settings


settings = get_settings()


class AuthService:
    """Service for authentication operations."""
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Hash a password using PBKDF2-SHA256."""
        salt = secrets.token_hex(16)
        pw_hash = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt.encode('utf-8'),
            100000  # iterations
        )
        return f"{salt}${pw_hash.hex()}"
    
    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """Verify a password against its hash."""
        try:
            salt, stored_hash = hashed_password.split('$')
            pw_hash = hashlib.pbkdf2_hmac(
                'sha256',
                plain_password.encode('utf-8'),
                salt.encode('utf-8'),
                100000
            )
            return pw_hash.hex() == stored_hash
        except ValueError:
            return False
    
    @staticmethod
    def create_access_token(user_id: int) -> str:
        """Create a JWT access token."""
        expire = datetime.utcnow() + timedelta(days=settings.jwt_expire_days)
        payload = {
            "sub": str(user_id),
            "exp": expire
        }
        return jwt.encode(payload, settings.jwt_secret, algorithm=settings.jwt_algorithm)
    
    @staticmethod
    def verify_token(token: str) -> Optional[int]:
        """Verify a JWT token and return user_id if valid."""
        try:
            payload = jwt.decode(
                token, 
                settings.jwt_secret, 
                algorithms=[settings.jwt_algorithm]
            )
            user_id = payload.get("sub")
            if user_id is None:
                return None
            return int(user_id)
        except JWTError:
            return None
    
    @staticmethod
    def get_user_by_email(session: Session, email: str) -> Optional[User]:
        """Get user by email address."""
        statement = select(User).where(User.email == email)
        return session.exec(statement).first()
    
    @staticmethod
    def get_user_by_id(session: Session, user_id: int) -> Optional[User]:
        """Get user by ID."""
        return session.get(User, user_id)
    
    @staticmethod
    def create_user(session: Session, user_data: UserCreate) -> User:
        """Create a new user."""
        user = User(
            email=user_data.email,
            password_hash=AuthService.hash_password(user_data.password)
        )
        session.add(user)
        session.commit()
        session.refresh(user)
        return user
    
    @staticmethod
    def authenticate_user(
        session: Session, 
        email: str, 
        password: str
    ) -> Optional[User]:
        """Authenticate user with email and password."""
        user = AuthService.get_user_by_email(session, email)
        if user is None:
            return None
        if not AuthService.verify_password(password, user.password_hash):
            return None
        return user
