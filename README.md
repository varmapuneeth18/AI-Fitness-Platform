# Fitness Platform

## Setup

### Prerequisites
- Node.js 18+
- Python 3.10+
- (Optional) Docker for PostgreSQL. Defaults to SQLite if not available.

### Backend (FastAPI)
1. Navigate to `apps/api`.
2. Create and activate venv: `python3 -m venv venv && source venv/bin/activate`.
3. Install deps: `pip install -r requirements.txt` (Run `pip freeze > requirements.txt` first if needed, or install manually).
   *(Currently installed: fastapi, uvicorn[standard], sqlalchemy, psycopg2-binary, alembic)*.
4. Run server: `python3 -m uvicorn apps.api.main:app --reload --port 8001`.
   *(Note: Port 8001 is used to avoid conflicts)*.

### Frontend (Next.js)
1. Navigate to `apps/web`.
2. Install deps: `npm install`.
3. Run dev server: `npm run dev`.

## Architecture
- **Web**: Next.js App Router.
- **API**: FastAPI + SQLAlchemy.
- **Database**: SQLite (local dev), Postgres (production/docker).
