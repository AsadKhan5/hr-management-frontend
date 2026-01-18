# HR Management System (HRMS)

A modern, full-stack HR management system for tracking employees and attendance. Built with Node.js, Express, PostgreSQL, React, Tailwind CSS, and DaisyUI.

## Features
- Employee CRUD (Create, Read, Update, Delete)
- Attendance marking and tracking
- Dashboard with real-time stats
- Search and pagination for employees
- Responsive UI with sidebar navigation
- Black & white theme for a clean, professional look

## Tech Stack
- **Backend:** Node.js, Express, PostgreSQL, Prisma
- **Frontend:** React, Vite, Tailwind CSS, DaisyUI, React Router

## Getting Started

### Backend
1. `cd backend`
2. Install dependencies: `npm install`
3. Set up your PostgreSQL database and update `.env`
4. Run migrations (if using Prisma): `npx prisma migrate dev`
5. Start the server: `npm start`

### Frontend
1. `cd frontend/hrms`
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`

The frontend runs on [http://localhost:5173](http://localhost:5173) and the backend API on [http://localhost:5000](http://localhost:5000).

## Folder Structure
```
backend/
  src/
    controllers/
    routes/
    db/
frontend/
  hrms/
    src/
      components/
      pages/
      services/
      hooks/
```

## API Endpoints
- `/api/employees` - Employee CRUD
- `/api/attendance` - Attendance actions
- `/api/dashboard` - Dashboard stats

## License
MIT
