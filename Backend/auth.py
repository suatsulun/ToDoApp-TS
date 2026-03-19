import bcrypt
from datetime import datetime, timedelta, timezone
from jose import jwt, JWTError
from fastapi import Depends, HTTPException, status, APIRouter
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from sqlalchemy import or_
from database import get_db
import models
import schemas


router = APIRouter(
    prefix="/api/auth",
    tags=["Authentication"]
)



SECRET_KEY = "insert-secret-key-here-at-the-end"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 120
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/auth/login")

def verify_password(plain_password: str, hashed_password:str) -> bool:
    return bcrypt.checkpw(
        plain_password.encode('utf-8'), 
        hashed_password.encode('utf-8')
    )

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_current_user(token:str= Depends(oauth2_scheme), db: Session= Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload =jwt.decode(token=token, key=SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str = payload.get("sub")
        if user_id_str is None:
            raise credentials_exception
        user_id = int(user_id_str)
    except (JWTError, ValueError):
       raise credentials_exception
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        raise credentials_exception
    else:
        return user
    
@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    if db.query(models.User).filter(models.User.email == user.email).first() is not None:
        raise HTTPException(status_code=400, detail="Email already registered")
    if db.query(models.User).filter(models.User.username == user.username).first() is not None:
        raise HTTPException(status_code=400, detail="Username already registered")
    hashed_pw = get_password_hash(user.password)
    new_user = models.User(username=user.username, email=user.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(
        or_(
            models.User.email == form_data.username,
            models.User.username == form_data.username
        )
    ).first()
    if user is None:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(form_data.password, str(user.hashed_password)):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub":str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}