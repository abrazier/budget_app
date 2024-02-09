from fastapi import FastAPI, HTTPException, Depends
from typing import List, Annotated
from sqlalchemy.orm import Session
from pydantic import BaseModel
from database import SessionLocal, engine
import models
from fastapi.middleware.cors import CORSMiddleware
from datetime import date

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

class CategoryBase(BaseModel):
    category: str

class BudgetBase(BaseModel):
    year: date
    category: str
    budget: float

class TransactionBase(BaseModel):
    date: date
    category: str
    amount: float
    description: str

class IncomeBase(BaseModel):
    year: date
    person: str
    amount: float
    description: str

class CategoryModel(CategoryBase):
    id: int

    class Config:
        orm_mode = True

class BudgetModel(BudgetBase):
    id: int

    class Config:
        orm_mode = True

class TransactionModel(TransactionBase):
    id: int

    class Config:
        orm_mode = True

class IncomeModel(IncomeBase):
    id: int

    class Config:
        orm_mode = True

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

models.Base.metadata.create_all(bind=engine)

@app.post("/income/", response_model=IncomeModel)
async def create_income(income: IncomeBase, db: db_dependency):
    db_income = models.Income(**income.dict())
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income

@app.post("/transactions/", response_model=TransactionModel)
async def create_transaction(transaction: TransactionBase, db: db_dependency):
    db_transaction = models.Transaction(**transaction.dict())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions/", response_model=List[TransactionModel])
async def read_transactions(db: db_dependency, skip: int = 0, limit: int = 100):
    transactions = db.query(models.Transaction).offset(skip).limit(limit).all()
    return transactions