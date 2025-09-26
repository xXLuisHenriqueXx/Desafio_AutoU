from sqlalchemy import Column, Integer, String, Text
from app.database import Base

class Email(Base):
    __tablename__ = "emails"

    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text, nullable=False)
    category = Column(String(50), nullable=False)
    response = Column(Text, nullable=False)
