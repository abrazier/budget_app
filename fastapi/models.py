from database import Base
from sqlalchemy import Column, Integer, String, Boolean, Float, Date


class CheckingBalance(Base):
    __tablename__ = "checking_balance"

    id = Column(Integer, primary_key=True, index=True)
    checking_balance = Column(Float)


class SavingsBalance(Base):
    __tablename__ = "savings_balance"

    id = Column(Integer, primary_key=True, index=True)
    savings_balance = Column(Float)


class BudgetCategories(Base):
    __tablename__ = "budget_categories"

    id = Column(Integer, primary_key=True, index=True)
    category = Column(String)


class Budget(Base):
    __tablename__ = "budget"

    id = Column(Integer, primary_key=True, index=True)
    year = Column(String)
    category = Column(String)
    budget = Column(Float)


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    category = Column(String)
    amount = Column(Float)
    chase_card = Column(Boolean)
    amazon_card = Column(Boolean)
    description = Column(String)
    paid = Column(Boolean)


class Income(Base):
    __tablename__ = "income"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    person = Column(String)
    amount = Column(Float)
    description = Column(String)
