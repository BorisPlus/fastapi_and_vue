from typing import Optional

from fastapi import Depends, HTTPException
from jose import JWTError, jwt

from .modules.auth import (
    SECRET_KEY,
    ALGORITHM,
    get_token_from_cookie,
)
from .modules.models import (
    User,
)
from .main import (
    app,
)


@app.get(
    "/users/me/",
    tags=["users"],
    response_model=User,
)
async def read_users_me(
    token: Optional[dict] = Depends(get_token_from_cookie),
):
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")
    return User(username=username)
