from fastapi import Depends

from .modules.models import (
    User,
)
from .authentication import (
    get_current_user,
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
    current_user: User = Depends(get_current_user),
):
    return current_user
