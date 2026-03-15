from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import TodoBase
from database import engine, SessionLocal
import models
from sqlalchemy.orm import Session

app = FastAPI(title="Todo App API")
models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally: 
        db.close()

@app.get("/me")
def get_current_user():
    return{"name": "Suat"}

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.get("/api/todos")
def get_todos(limit: int = 10, sort_order: str = "desc", page_number: int = 1, status: str = None, db: Session = Depends(get_db)):
    skip = (page_number - 1) * limit
    query = db.query(models.Todo)
    if status is not None and status != "":
        statuses = status.split(",")
        query = query.filter(models.Todo.status.in_(statuses))

    if sort_order == "desc":
        sorted_todos = query.order_by(models.Todo.createdAt.desc())
    else:
        sorted_todos = query.order_by(models.Todo.createdAt.asc())
        
    todos = sorted_todos.offset(skip).limit(limit).all()
    todo_number = sorted_todos.count()
    return {"todos": todos, "todo_number": todo_number}

@app.post("/api/todos")
def add_todo(todo: TodoBase, db: Session = Depends(get_db)):
    new_todo = models.Todo(text=todo.text, status=todo.status)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo_to_delete = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    
    if todo_to_delete is None:
        raise HTTPException(status_code=404, detail="Todo not found")
        
    db.delete(todo_to_delete)
    db.commit()
    return {"message": "Todo deleted"}

@app.delete("/api/todos")
def delete_all(db: Session = Depends(get_db)):
    db.query(models.Todo).delete()
    db.commit()
    return {"message": "All todos deleted"}

@app.put("/api/todos/{todo_id}")
def update_todo(todo_update: TodoBase, todo_id: int, db: Session = Depends(get_db)):
    db_todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    
    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
        
    setattr(db_todo, "text", todo_update.text)
    setattr(db_todo, "status", todo_update.status)
    db.commit()
    db.refresh(db_todo)
    return db_todo
