from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="todos")
    text = Column(String, index=True)
    status = Column(String, index=True)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    
class Family(Base):
    __tablename__ = "families"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    members = relationship("User", back_populates="family")
    invitation = relationship("Invitation", back_populates="family")

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    family_id = Column(Integer, ForeignKey("families.id"), nullable=True)
    username = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    hashed_password = Column(String)
    todos = relationship("Todo", back_populates="owner")
    family = relationship("Family", back_populates="members")
    sent_invitations = relationship("Invitation", foreign_keys="[Invitation.sender_id]", back_populates="sender")
    received_invitations = relationship("Invitation", foreign_keys="[Invitation.recipient_id]", back_populates="recipient")

class Invitation(Base):
    __tablename__ = "invitations"
    id = Column(Integer, primary_key=True, index=True)
    family_id = Column(Integer, ForeignKey("families.id"), index=True)
    sender_id = Column(Integer, ForeignKey("users.id"), index=True)
    recipient_id = Column(Integer, ForeignKey("users.id"), index=True)
    family = relationship("Family", back_populates="invitation")
    sender = relationship("User", foreign_keys=[sender_id],  back_populates="sent_invitations")
    recipient = relationship("User", foreign_keys=[recipient_id], back_populates="received_invitations")