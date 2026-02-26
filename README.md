# CodeBazaar Frontend

Production-ready React frontend for CodeBazaar marketplace.

## Repository Layout

```txt
codebazaar-frontend/
  frontend/
    src/
      pages/
      components/
      services/
      hooks/
      context/
      utils/
      styles/
    package.json
    vercel.json
```

## Stack

- React + Vite
- React Router
- Axios interceptors
- Context API auth state
- React Hot Toast notifications

## Theme

- Primary: `#111827`
- Accent: `#10B981`
- Background: `#020617`
- Text: `#E5E7EB`

## Local Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Vercel Deployment

1. Import repository in Vercel.
2. Set Root Directory to `frontend`.
3. Add `VITE_API_BASE_URL` env variable.
4. Deploy.

## Git Flow Branches

- `main`
- `dev`
- `feature/frontend-auth`
- `feature/frontend-ui`

Commit style:

- `feat:`
- `fix:`
- `refactor:`
