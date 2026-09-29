from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

from .items import (
    create_item as _,
    read_items as _,
)

from .authentication import (
    login as _,
    logout as _,
)

from .users import (
    read_users_me as _,
)

from .messages import (
    create_message as _,
    read_messages as _,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)
