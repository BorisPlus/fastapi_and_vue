from datetime import (
    timezone,
    timedelta,
    datetime,
)
from typing import List

from fastapi import (
    HTTPException,
    status,
    Request,
)
from jose import jwt
from passlib.context import CryptContext

from .models import (
    UserInDB,
    Token,
)

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

COOKIE_HTTPONLY = True
COOKIE_MAX_AGE = ACCESS_TOKEN_EXPIRE_MINUTES * 60
COOKIE_NAME = "access_token"
COOKIE_SAMESITE = "lax"  # TODO: "strict" максимальная защита от CSRF
COOKIE_SECURE = False  # TODO: True при HTTPS!

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


async def get_token_from_cookie(request: Request) -> Token:
    token = request.cookies.get(COOKIE_NAME)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if token.startswith("Bearer "):
        token = token[7:]
    return token


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(
    db: List[UserInDB],
    username: str,
) -> UserInDB | None:
    for user in db:
        if user.username == username:
            return user
    return None


def authenticate_user(
    db: List[UserInDB],
    username: str,
    password: str,
) -> UserInDB | bool:
    user = get_user(db, username)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(
    data: dict,
    expires_delta: timedelta | None = None,
):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt
