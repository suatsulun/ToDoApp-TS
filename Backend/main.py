from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from schemas import TodoCreate
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
def get_todos(db: Session = Depends(get_db)):
    todos = db.query(models.Todo).all()
    return todos

@app.post("/api/todos")
def add_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    new_todo = models.Todo(text=todo.text, status=todo.status)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

@app.delete("/api/todos/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    todo_to_delete = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    db.delete(todo_to_delete)
    db.commit()
    return {"message": "Todo deleted"}

@app.delete("/api/todos")
def delete_all(db: Session = Depends(get_db)):
    db.query(models.Todo).delete()
    db.commit()
    return {"message": "All todos deleted"}