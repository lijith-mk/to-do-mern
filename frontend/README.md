# To-Do List Frontend (Part 2)

React frontend integrated with the To-Do List REST API.

## Features

- Add, delete, and toggle tasks (pending / completed)
- Search tasks by title
- Loading indicators and error messages
- Responsive UI

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and set the backend URL:
```
VITE_API_URL=http://localhost:5000/api/todos
```

### 3. Start the dev server
```bash
npm run dev
```

App runs at `http://localhost:5173`

## Project Structure

```
frontend/
└── src/
    ├── api/
    │   └── todoApi.js       # Axios API calls
    ├── components/
    │   ├── TodoForm.jsx     # Add task form
    │   ├── TodoItem.jsx     # Single task card
    │   └── TodoList.jsx     # Task list
    ├── App.jsx              # Main component + state
    └── App.css              # Styles
```

## Deployment

- Backend: Deploy to [Render](https://render.com) — set `MONGO_URI` in environment variables.
- Frontend: Deploy to [Netlify](https://netlify.com) — set `VITE_API_URL` to your Render backend URL.

## Environment Variables

| Variable      | Description               |
|---------------|---------------------------|
| VITE_API_URL  | Backend API base URL      |

## Challenges

- Ensuring immediate UI sync after each CRUD operation by re-fetching todos.
- Handling CORS between frontend (Vite) and Express backend by adding the `cors` package.
- Search debouncing was kept simple (on-change fetch) to meet assignment scope without over-engineering.
