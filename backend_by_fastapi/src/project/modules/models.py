from datetime import datetime

from pydantic import BaseModel


class User(BaseModel):
    username: str


class UserInDB(User):
    hashed_password: str
    additional_info: str | None = None


class Token(BaseModel):
    access_token: str
    token_type: str


class Item(BaseModel):
    name: str
    description: str | None = None
    price: float
    tax: float | None = None
    tags: list[str] = []


class Message(BaseModel):
    text: str
    dt: datetime | None = None
