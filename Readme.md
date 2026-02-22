PrimeTrade Frontend Developer Task

A full-stack scalable web application built with React (Vite) + Node.js/Express + MongoDB, featuring JWT-based authentication, protected routes, and a modern task management dashboard.

🚀 Tech Stack
Frontend

React (Vite)

TailwindCSS

React Router

Axios

React Hot Toast

Lucide Icons

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT (Authentication)

bcrypt (Password Hashing)

cookie-parser

CORS

🔐 Authentication System

User Registration

User Login

Logout

JWT-based authentication

Token stored in httpOnly cookie

Protected routes using middleware

/api/auth/me endpoint for session verification

Passwords securely hashed using bcrypt

📊 Dashboard Features

Entity: Tasks

Create Task

Read Tasks

Update Task Status

Delete Task

Search Tasks

Filter by Status (Pending / Completed)

Toast Notifications

Responsive Dark SaaS UI

Persistent login (refresh safe)

📦 API Endpoints
Auth Routes
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
Task Routes (Protected)
GET /api/tasks
POST /api/tasks
PUT /api/tasks/:id
DELETE /api/tasks/:id
🛠 Project Structure
primetrade-frontend-task/
│
├── backend/
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vite.config.js
│
├── postman_collection.json
├── .env.example
└── README.md
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone <your-repo-url>
cd primetrade-frontend-task
2️⃣ Backend Setup
cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173

Start server:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
📬 Postman Collection

A Postman collection is included:

postman_collection.json

It contains:

Auth requests

Protected routes

CRUD operations

🔒 Security Considerations

Password hashing using bcrypt

JWT stored in httpOnly cookies

CORS configured with credentials

Protected route middleware

Centralized error handling

Environment-based configuration

🚀 Production Scaling Strategy

To scale this application for production, the following improvements would be implemented:

Authentication & Security

Refresh token rotation

Role-based access control

CSRF protection

Rate limiting

Secure cookies (HTTPS only)

Backend Scaling

Containerization using Docker

Deployment behind reverse proxy (NGINX)

Horizontal scaling with load balancer

Redis caching layer

Centralized logging (Winston)

API versioning

Database Scaling

MongoDB Atlas cluster with replica sets

Index optimization

Pagination for large datasets

Frontend Scaling

CDN deployment (Vercel)

Code splitting & lazy loading

Environment-based API configuration

Error boundary implementation

DevOps

CI/CD pipeline

Automated testing

Monitoring & alerting

Separate staging & production environments
