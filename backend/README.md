# To-Do List Backend (Part 1)

A REST API for a To-Do List app built with Node.js, Express.js, and MongoDB.

## Project Structure

```
backend/
├── server.js
├── .env
└── src/
    ├── models/       # Mongoose schema
    ├── services/     # Business logic
    ├── controllers/  # Request handlers
    ├── routes/       # Express routes
    └── middleware/   # Error handler
```

## Setup & Run

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
Copy `.env.example` to `.env` and update values:
```
MONGO_URI=mongodb://localhost:27017/todoapp
PORT=5000
```

### 3. Start the server
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

## API Endpoints

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | /api/todos        | Get all todos (supports `?search=keyword`) |
| GET    | /api/todos/:id    | Get a single todo        |
| POST   | /api/todos        | Create a new todo        |
| PUT    | /api/todos/:id    | Update a todo            |
| DELETE | /api/todos/:id    | Delete a todo            |

### Request Body (POST/PUT)
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}
```

## Testing with Postman

Import requests for each endpoint above. Set base URL to `http://localhost:5000`.

## Environment Variables

| Variable  | Description              |
|-----------|--------------------------|
| MONGO_URI | MongoDB connection string |
| PORT      | Server port (default: 5000) |

## Challenges

- Structuring the controller/service separation cleanly while keeping the codebase minimal.
- Handling MongoDB CastError gracefully when invalid IDs are passed.
