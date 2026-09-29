from datetime import timedelta
from typing import List

from fastapi import Depends, HTTPException, status, Response
from fastapi.security import OAuth2PasswordRequestForm

from .modules.auth import (
    authenticate_user,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    COOKIE_HTTPONLY,
    COOKIE_MAX_AGE,
    COOKIE_NAME,
    COOKIE_SAMESITE,
    COOKIE_SECURE,
    pwd_context,
)
from .modules.models import (
    Nothing,
    User,
    UserInDB,
)
from .main import (
    app,
)

fake_users_collection: List[UserInDB] = [
    UserInDB(
        username="admin",
        hashed_password=pwd_context.hash("secret".encode("utf-8")),
        additional_info="Administrator",
    )
]


@app.post(
    "/login",
    tags=["authentication"],
    response_model=User,
)
async def login(
    response: Response,
    form_data: OAuth2PasswordRequestForm = Depends(),
):
    user = authenticate_user(
        fake_users_collection, form_data.username, form_data.password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": form_data.username}, expires_delta=access_token_expires
    )

    response.set_cookie(
        key=COOKIE_NAME,
        value=f"Bearer {access_token}",
        max_age=COOKIE_MAX_AGE,
        secure=COOKIE_SECURE,
        httponly=COOKIE_HTTPONLY,
        samesite=COOKIE_SAMESITE,
    )
    return User(username=form_data.username)


@app.post(
    "/logout",
    tags=["authentication"],
    response_model=Nothing,
)
async def logout(response: Response):
    response.delete_cookie(
        key=COOKIE_NAME,
        secure=COOKIE_SECURE,
        httponly=COOKIE_HTTPONLY,
        samesite=COOKIE_SAMESITE,
    )
    return Nothing()
