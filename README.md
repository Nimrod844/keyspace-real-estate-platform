# KEYSPACE

**Find Your Space. Own Your Future.**

KEYSPACE is a Kenya-first property marketplace starter for rentals, property sales, commercial spaces and land. This repository contains a Next.js frontend and Django REST Framework backend.

## Project structure

- `frontend/` — Next.js, React and TypeScript user interface.
- `backend/` — Django REST Framework API, property models and advertiser verification request workflow.
- `prototypes/` — notes for earlier visual prototypes.

## Run locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

### Backend

```bash
cd backend
python -m venv .venv
# Windows PowerShell: .venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API health check: http://127.0.0.1:8000/api/health/

## Important status and security notes

This is an early development starter, not a production-ready real-estate platform. The frontend uses sample listings. The backend includes basic property and verification-request models, but it does not yet implement user authentication, identity or title verification, secure document uploads, agent-authorisation enforcement, fraud detection, payment handling, or production security controls. Do not use it to collect real identity documents or sensitive customer data. Review and harden configuration, secrets, permissions, validation, logging, storage, and deployment before any public launch. Never commit `.env` files, credentials, private documents, title deeds, or customer data.
