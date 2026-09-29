from datetime import datetime
from typing import List

from fastapi import Depends

from .modules.auth import (
    get_token_from_cookie,
)
from .modules.models import (
    Message,
)
from .main import (
    app,
)

messages_collection: List[Message] = [
    Message(text="Message #1", dt=datetime.now()),
    Message(text="Message #2", dt=datetime.now()),
]


@app.post(
    "/messages/",
    tags=["messages"],
    response_model=Message,
)
async def create_message(
    item: Message,
    _: dict = Depends(get_token_from_cookie),
) -> Message:
    if item.dt is None:
        item.dt = datetime.now()
    messages_collection.append(item)
    return item


@app.get(
    "/messages/",
    tags=["messages"],
    response_model=list[Message],
)
async def read_messages(
    _: dict = Depends(get_token_from_cookie),
) -> List[Message]:
    return messages_collection
