# To-Do App Backend

## About

This is the backend for a simple To-Do List application. It is built using Node.js, Express, and MongoDB. The backend provides APIs to create, read, update, and delete tasks.

## Technologies Used

* Node.js
* Express.js
* MongoDB (Mongoose)
* dotenv

## Features

* Add a new task
* Get all tasks
* Update task details
* Delete a task
* Mark task as completed
* Search tasks

## Folder Structure

* controllers → handles request and response
* services → contains business logic
* models → database schema
* routes → API routes
* config → database connection

## Setup Instructions

1. Go to backend folder

2. Install dependencies
   npm install

3. Create .env file and add:
   PORT=5000
   MONGO_URI=your_mongodb_url

4. Run server
   npm run dev

## API Endpoints

* GET /api/tasks → get all tasks
* POST /api/tasks → create task
* PUT /api/tasks/:id → update task
* DELETE /api/tasks/:id → delete task
* PATCH /api/tasks/:id/status → update status
* GET /api/tasks/search?q=keyword → search tasks

## Testing

Used Postman to test all APIs. Checked all CRUD operations and status update.

