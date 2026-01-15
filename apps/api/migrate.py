from .database import engine
from .models import Base

def upgrade():
    # In a real app we use alembic.
    # Here, we just call create_all which creates missing tables.
    # It won't update existing tables in SQLite easily without drop, 
    # but WeeklySummary is new so it should work.
    Base.metadata.create_all(bind=engine)
    print("Database tables updated.")

if __name__ == "__main__":
    upgrade()
