from fastapi import FastAPI, HTTPException, Depends
from typing import List, Annotated
from sqlalchemy.orm import Session
from sqlalchemy.sql import functions
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
    allow_methods=["*"],
    allow_headers=["*"],
)


class CheckingBalance(BaseModel):
    checking_balance: float


class SavingsBalance(BaseModel):
    savings_balance: float


class BudgetSum(BaseModel):
    total_budget: float


class ChaseSum(BaseModel):
    chase_total: float


class CategoryBase(BaseModel):
    category: str


class BudgetBase(BaseModel):
    year: str
    category: str
    budget: float


class TransactionBase(BaseModel):
    date: date
    category: str
    amount: float
    chase_card: bool
    amazon_card: bool
    description: str
    paid: bool


class IncomeBase(BaseModel):
    year: date
    person: str
    amount: float
    description: str


class Checking(BaseModel):
    total_budget: float


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


class CheckingBalanceModel(CheckingBalance):
    id: int

    class Config:
        orm_mode = True


class SavingsBalanceModel(SavingsBalance):
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


@app.get("/chase_charges/", response_model=List[TransactionModel])
async def get_chase_charges(db: db_dependency, skip: int = 0, limit: int = 100):
    get_chase_charges = (
        db.query(models.Transaction)
        .filter(models.Transaction.chase_card == True)
        .filter(models.Transaction.paid == False)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return get_chase_charges


@app.get("/amazon_charges/", response_model=List[TransactionModel])
async def get_amazon_charges(db: db_dependency, skip: int = 0, limit: int = 100):
    get_amazon_charges = (
        db.query(models.Transaction)
        .filter(models.Transaction.amazon_card == True)
        .filter(models.Transaction.paid == False)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return get_amazon_charges


@app.get("/checking_balance/", response_model=List[CheckingBalanceModel])
async def read_checking_balance(db: db_dependency, skip: int = 0, limit: int = 100):
    checking_balance = db.query(models.CheckingBalance)
    return checking_balance


@app.get("/savings_balance/", response_model=List[SavingsBalanceModel])
async def read_savings_balance(db: db_dependency, skip: int = 0, limit: int = 100):
    savings_balance = db.query(models.SavingsBalance)
    return savings_balance


@app.get("/chase_sum/", response_model=List[ChaseSum])
async def get_chase_sum(db: db_dependency):
    chase_sum = db.query(functions.sum(models.Budget.budget).label("chase_total"))
    return chase_sum


@app.get("/budget_sum/", response_model=List[BudgetSum])
async def get_budget_sum(db: db_dependency):
    budget_sum = db.query(functions.sum(models.Budget.budget).label("total_budget"))
    return budget_sum


@app.post("/budget_categories/", response_model=CategoryModel)
async def create_budget_category(category: CategoryBase, db: db_dependency):
    db_budget_category = models.BudgetCategories(**category.dict())
    db.add(db_budget_category)
    db.commit()
    db.refresh(db_budget_category)
    return db_budget_category


@app.get("/budget_categories/", response_model=List[CategoryModel])
async def read_budget_category(db: db_dependency, skip: int = 0, limit: int = 100):
    budget_category = db.query(models.BudgetCategories).offset(skip).limit(limit).all()
    return budget_category


@app.post("/budget/", response_model=BudgetModel)
async def create_budget(budget: BudgetBase, db: db_dependency):
    db_budget = models.Budget(**budget.dict())
    db.add(db_budget)
    db.commit()
    db.refresh(db_budget)
    return db_budget


@app.get("/budget/", response_model=List[BudgetModel])
async def read_budget(db: db_dependency, skip: int = 0, limit: int = 100):
    budget = db.query(models.Budget).offset(skip).limit(limit).all()
    return budget


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


@app.post("/income/", response_model=IncomeModel)
async def create_income(income: IncomeBase, db: db_dependency):
    db_income = models.Income(**income.dict())
    db.add(db_income)
    db.commit()
    db.refresh(db_income)
    return db_income


@app.get("/income/", response_model=List[IncomeModel])
async def read_income(db: db_dependency, skip: int = 0, limit: int = 100):
    income = db.query(models.Income).offset(skip).limit(limit).all()
    return income
