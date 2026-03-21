from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
import schemas
from database import engine, SessionLocal
import models
from sqlalchemy.orm import Session
from sqlalchemy import or_
import auth
from database import get_db
from typing import cast

app = FastAPI(title="Todo App API")
models.Base.metadata.create_all(bind=engine)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)

@app.get("/me")
def get_me(current_user: models.User = Depends(auth.get_current_user)):
    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email,
        "family_id": current_user.family_id
    }

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/api/families", response_model=schemas.FamilyResponse)
def create_family(family_data: schemas.FamilyCreate, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.family_id is not None:
        raise HTTPException(status_code=400, detail="You are already in a family")
    new_family = models.Family(name=family_data.name)
    db.add(new_family)
    db.commit()
    db.refresh(new_family)
    current_user.family_id = new_family.id
    db.commit()
    return new_family

@app.post("/api/families/leave", response_model=schemas.MessageResponse)
def leave_family(db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.family_id is None:
        raise HTTPException(status_code=400, detail="You are not part of a family")
    old_family_id = current_user.family_id
    setattr(current_user, "family_id", None)
    db.commit()
    db.refresh(current_user)
    remaining_members = db.query(models.User).filter(models.User.family_id == old_family_id).count()
    if remaining_members == 0:
        db.query(models.Invitation).filter(models.Invitation.family_id == old_family_id).delete()
        db.query(models.Family).filter(models.Family.id == old_family_id).delete()
        db.commit()
    return {"message": "You have successfully left the family."}



@app.post("/api/families/invitations", response_model=schemas.MessageResponse)
def family_invite(invite: schemas.InviteUser, db: Session  = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    if current_user.family_id is None:
        raise HTTPException(status_code=400, detail="You are not in a family")
    invitee = db.query(models.User).filter(
        or_(models.User.username == invite.identifier,
            models.User.email == invite.identifier
        )).first()
    if invitee is None:
        raise HTTPException(status_code=404, detail="User not found")
    elif cast(int, invitee.id) == cast(int, current_user.id):
        raise HTTPException(status_code=400, detail="You cannot invite yourself")
    elif invitee.family_id is not None:
        raise HTTPException(status_code=400, detail="You cannot invite someone who is already in a family")
    new_invitation = models.Invitation(family_id=current_user.family_id, sender_id=current_user.id, recipient_id=invitee.id)
    db.add(new_invitation)
    db.commit()
    db.refresh(new_invitation)
    return {"message": "Invitation sent successfully!"}

@app.get("/api/families/invitations/me", response_model=list[schemas.InvitationResponse])
def receive_invites(db: Session  = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    invites = db.query(
        models.Invitation.id,
        models.Invitation.family_id,
        models.Invitation.sender_id,
        models.Invitation.recipient_id,
        models.Family.name.label("family_name"), 
        models.User.username.label("sender_username")
    ).join(
        models.Family, models.Invitation.family_id == models.Family.id 
    ).join(
        models.User, models.Invitation.sender_id == models.User.id
    ).filter(
        models.Invitation.recipient_id == current_user.id
    ).all()
    return invites

@app.post("/api/families/invitations/{invitation_id}/accept", response_model=schemas.MessageResponse)
def accept_invite(invitation_id: int, db:Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    invitation = db.query(models.Invitation).filter(models.Invitation.id == invitation_id).first()
    if invitation is None:
        raise HTTPException(status_code=404, detail="Invitation not found")
    if cast(int, invitation.recipient_id) != cast(int, current_user.id):
        raise HTTPException(status_code=403, detail="That invitation is not for you")
    current_user.family_id = invitation.family_id
    db.query(models.Invitation).filter(models.Invitation.recipient_id == current_user.id).delete()
    db.commit()
    return {"message": "Invitation accepted"}

@app.delete("/api/families/invitations/{invitation_id}/decline", response_model=schemas.MessageResponse)
def decline_invite(invitation_id: int, db: Session  = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    invitation = db.query(models.Invitation).filter(models.Invitation.id == invitation_id).first()
    if invitation is None:
        raise HTTPException(status_code=404, detail="Invitation not found")
    if cast(int, invitation.recipient_id) != cast(int, current_user.id):
        raise HTTPException(status_code=403, detail="That invitation is not for you")
    db.delete(invitation)
    db.commit()
    return {"message": "Invitation declined"}

@app.get("/api/families/members", response_model=list[schemas.UserResponse])
def get_family_members(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(auth.get_current_user)):
    if current_user.family_id is None:
        return []
    members = db.query(models.User).filter(models.User.family_id == current_user.family_id).all()
    return members

@app.get("/api/todos", response_model=schemas.TodoListResponse)
def get_todos(
    limit: int = 10, 
    sort_order: str = "desc", 
    page_number: int = 1, 
    status: list[str] | None = Query(None), 
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    skip = (page_number - 1) * limit
    if current_user.family_id is not None:
        query = db.query(models.Todo).join(models.User).filter(models.User.family_id == current_user.family_id)
    else:
        query = db.query(models.Todo).filter(models.Todo.owner_id == current_user.id)
    
    if status is not None and len(status) > 0:
        query = query.filter(models.Todo.status.in_(status))

    if sort_order == "desc":
        sorted_todos = query.order_by(models.Todo.created_at.desc())
    else:
        sorted_todos = query.order_by(models.Todo.created_at.asc())
        
    todos = sorted_todos.offset(skip).limit(limit).all()
    todo_number = sorted_todos.count()
    return {"todos": todos, "todo_number": todo_number}

@app.post("/api/todos", response_model=schemas.TodoResponse)
def add_todo(todo: schemas.TodoBase, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    new_todo = models.Todo(text=todo.text, status=todo.status,owner_id = current_user.id)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@app.delete("/api/todos/{todo_id}", response_model=schemas.MessageResponse)
def delete_todo(todo_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(auth.get_current_user)):
    todo_to_delete = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    
    
    if todo_to_delete is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    if cast(int, todo_to_delete.owner_id) != cast(int,current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to delete this todo")    
    db.delete(todo_to_delete)
    db.commit()
    return {"message": "Todo deleted"}

@app.delete("/api/todos", response_model=schemas.MessageResponse)
def delete_all(db: Session = Depends(get_db) , current_user: models.User = Depends(auth.get_current_user)):
    db.query(models.Todo).filter(models.Todo.owner_id == current_user.id).delete()
    db.commit()
    return {"message": "All todos deleted"}

@app.put("/api/todos/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_update: schemas.TodoBase, todo_id: int, db: Session = Depends(get_db) , current_user: models.User = Depends(auth.get_current_user)):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    if cast(int, db_todo.owner_id) != cast(int,current_user.id):
        raise HTTPException(status_code=403, detail="Not authorized to update this todo")    
    
    setattr(db_todo, "text", todo_update.text)
    setattr(db_todo, "status", todo_update.status)
    db.commit()
    db.refresh(db_todo)
    return db_todo


@app.put("/api/me", response_model=schemas.UserResponse)
def update_user(update_data: schemas.UserUpdate, db: Session = Depends(get_db) ,
                current_user: models.User = Depends(auth.get_current_user)):
    update_dict = update_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(current_user, key, value)
    try:
        db.commit()
        db.refresh(current_user)
    except Exception as e:
        raise HTTPException(status_code=400, detail="Update failed. Username or email already taken") from e
    return current_user

@app.put("/api/me/password", response_model=schemas.MessageResponse)
def update_password(password_data: schemas.PasswordUpdate, db: Session = Depends(get_db),
                    current_user: models.User = Depends(auth.get_current_user)):
    if not auth.verify_password(password_data.current_password, str(current_user.hashed_password)):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    
    new_hashed_pw = auth.get_password_hash(password_data.new_password)
    setattr(current_user, "hashed_password", new_hashed_pw)
    try:
        db.commit()
        db.refresh(current_user)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Password update failed") from e
    return {"message": "Password updated successfully!"}

@app.delete("/api/admin/cleanup-family/{family_id}")
def admin_delete_family(family_id: int, db: Session = Depends(get_db)):
    db.query(models.Invitation).filter(models.Invitation.family_id == family_id).delete()
    deleted_count = db.query(models.Family).filter(models.Family.id == family_id).delete()
    db.commit()
    if deleted_count == 0:
        return {"message": f"Family {family_id} not found."}
    return {"message": f"Successfully nuked Family {family_id}."}