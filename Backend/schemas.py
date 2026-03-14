from pydantic import BaseModel

class TodoBase(BaseModel):
    text: str
    status: str