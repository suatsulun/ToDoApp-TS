import datetime
from pydantic import BaseModel
from typing import Optional

class FamilyCreate(BaseModel):
    name: str

class FamilyResponse(BaseModel):
    id: int
    name: str
    
    class Config:
        from_atributes = True

class InviteUser(BaseModel):
    identifier: str

class InvitationResponse(BaseModel):
    id: int
    family_id: int
    sender_id: int
    family_name: str
    sender_username: str
    
    class Config:
        from_attributes = True


class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserResponse(BaseModel):
    id: int
    username: str
    email: str
    family_id: int | None = None
    family: FamilyResponse | None = None

    class Config:
        from_attributes = True

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None

class PasswordUpdate(BaseModel):
    current_password: str 
    new_password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TodoBase(BaseModel):
    text: str
    status: str

class TodoResponse(TodoBase):
    id: int
    created_at: datetime.datetime
    owner_id: int
    owner: UserResponse

    class Config:
        from_attributes = True

class MessageResponse(BaseModel):
    message: str

class TodoListResponse(BaseModel):
    todos: list[TodoResponse]
    todo_number: int