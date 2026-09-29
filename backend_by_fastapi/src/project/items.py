from typing import List

from .modules.models import (
    Item,
)
from .main import (
    app,
)

items_collection: List[Item] = [
    Item(name="Portal Gun", price=42.0),
    Item(name="Plumbus", price=32.0),
]


@app.post(
    "/items/",
    tags=["items"],
    response_model=Item,
)
async def create_item(
    item: Item,
) -> Item:
    items_collection.append(item)
    return item


@app.get(
    "/items/",
    tags=["items"],
    response_model=list[Item],
)
async def read_items() -> List[Item]:
    return items_collection
