"""User model for authentication."""

from sqlmodel import SQLModel, Field
from datetime import datetime
from typing import Optional


class UserBase(SQLModel):
    """Base user fields."""
    email: str = Field(unique=True, index=True)


class User(UserBase, table=True):
    """User database model."""
    __tablename__ = "users"
    
    id: Optional[int] = Field(default=None, primary_key=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)


class UserCreate(SQLModel):
    """Schema for user registration."""
    email: str
    password: str


class UserRead(SQLModel):
    """Schema for user response (without password)."""
    id: int
    email: str


class UserLogin(SQLModel):
    """Schema for login request."""
    email: str
    password: str
