# EcoTrack Workspace

EcoTrack is a carbon-footprint tracking project with:

- a React frontend for user input and dashboard visualization
- a Node.js + Express backend for auth and result history APIs
- a Python ML workspace for training and recommendation logic

## Project Structure

```text
CodeF/
  personal_carbon_footprint_behavior.csv
  readme.md
  frontend/
    src/
      components/
      pages/
      utils/carbonCalculator.js
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    server.js
  machine_lr/
    ecotrack_ml_training.ipynb
    recommendation_engine.py
```

## Data

`personal_carbon_footprint_behavior.csv` is the primary dataset used by ML workflows.

Important columns include:

- `transport_mode`
- `electricity_kwh`
- `waste_generated_kg`
- `carbon_footprint_kg`
- `carbon_impact_level`

## Frontend (`frontend/`)

Key files:

- `frontend/src/pages/LandingPage.jsx`: landing and feature overview
- `frontend/src/pages/TrackPage.jsx`: data-input page wrapper
- `frontend/src/components/InputForm.jsx`: collects lifestyle inputs
- `frontend/src/utils/carbonCalculator.js`: CO2 calculation and insights
- `frontend/src/pages/Dashboard.jsx`: charts, score, and breakdown

Data flow:

- Input form calculates result and stores it in `localStorage` as `ecotrack_result`
- Dashboard reads `ecotrack_result` and renders metrics/visuals

### Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Useful scripts:

- `npm run build`
- `npm run preview`
- `npm run lint`

For production deployments where frontend and backend are on different domains,
set `frontend/.env`:

```env
VITE_API_URL=https://your-api-domain.com
```

## Backend (`backend/`)

Tech stack:

- Express
- MongoDB (Mongoose)
- JWT authentication

Key files:

- `backend/server.js`: app startup, DB connect, CORS, route mounting
- `backend/config/db.js`: MongoDB connection (`MONGO_URI`)
- `backend/routes/authRoutes.js`: register/login/me/profile/logout routes
- `backend/routes/carbonRoutes.js`: save/history/stats/leaderboard/delete routes
- `backend/routes/aiRoutes.js`: AI chat route
- `backend/middleware/authMiddleware.js`: cookie/bearer token protection middleware

### Run Backend

```bash
cd backend
npm install
npm run dev
```

Or production mode:

```bash
npm start
```

### Backend Environment Variables

Create `backend/.env` with:

```env
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
PORT=5000
CORS_ORIGINS=https://your-frontend-domain.com
```

`VITE_API_BASE_URL` remains supported as a backward-compatible fallback.

Use `backend/.env.example` as the source-of-truth template.

### API Base and Routes

Base URL: `http://localhost:5001`

Routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)
- `PUT /api/auth/profile` (protected)
- `POST /api/auth/logout` (protected)
- `POST /api/carbon/save` (protected)
- `GET /api/carbon/history` (protected)
- `GET /api/carbon/stats` (protected)
- `DELETE /api/carbon/history/:id` (protected)
- `GET /api/carbon/leaderboard` (public)
- `POST /api/ai/chat` (public)

## ML Workspace (`machine_lr/`)

Files:

- `machine_lr/ecotrack_ml_training.ipynb`: model training and evaluation notebook
- `machine_lr/recommendation_engine.py`: recommendation module aligned with frontend input shape

`recommendation_engine.py` currently provides:

- per-category weekly emissions (`transportCO2`, `electricityCO2`, `wasteCO2`, `plasticCO2`)
- total weekly emissions (`totalCO2`)
- dominant source identification
- actionable recommendation tips
- dataset benchmark and impact-level estimation (when CSV is available)

### Run Recommendation Script

```bash
python machine_lr/recommendation_engine.py
```

## Sync Rule

Keep emission factors in sync between:

- `frontend/src/utils/carbonCalculator.js`
- `machine_lr/recommendation_engine.py`

If dataset location changes, update dataset path handling in `machine_lr/recommendation_engine.py`.

For local Docker deployment, use:

```bash
docker compose up --build
```
