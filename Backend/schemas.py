import datetime
from pydantic import BaseModel

class TodoBase(BaseModel):
    text: str
    status: str

class TodoResponse(TodoBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True

class MessageResponse(BaseModel):
    message: str

class TodoListResponse(BaseModel):
    todos: list[TodoResponse]
    todo_number: int