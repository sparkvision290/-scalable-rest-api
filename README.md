# 🚀 Scalable REST API with Authentication & RBAC

A full-stack application built using **Node.js, Express, MongoDB, JWT authentication, role-based access control (RBAC)**, and a **React frontend** for testing and interacting with APIs.

---

## 📌 Features

### 🔐 Authentication & Authorization
- User registration & login
- Secure password hashing using bcrypt
- JWT-based authentication
- Role-Based Access Control (USER / ADMIN)

---

### 🛡️ Role-Based Access

**USER**
- Create, view, update, and delete own tasks

**ADMIN**
- View all users’ tasks
- Delete any task
- Access Admin Panel in UI

---

### 📝 Task Management (CRUD)
- Create tasks
- Fetch logged-in user’s tasks
- Update task (owner only)
- Delete task (owner only)
- Admin override for tasks

---

### 🗄️ Database
- MongoDB with Mongoose
- Persistent storage
- User & Task schema relationships

---

### ⚛️ Frontend (React)
- Register & Login UI
- Display logged-in user email
- Admin panel toggle
- Task management UI
- Logout button
- Success / error toast messages

---

### 📘 API Documentation
Swagger UI available at:

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

### Frontend
- React
- Fetch API
- Minimal custom UI

---

## 📂 Project Structure

```bash
backend/
│── src/
│ ├── config/
│ │ ├── db.js
│ │ └── swagger.js
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ └── task.controller.js
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ └── role.middleware.js
│ ├── models/
│ │ ├── user.model.js
│ │ └── task.model.js
│ ├── routes/
│ │ ├── auth.routes.js
│ │ └── task.routes.js
│ ├── seed/
│ │ └── admin.seed.js
│ └── app.js
│
frontend/
│── src/
│ ├── App.jsx
│ ├── api.js
│ └── styles.css
```

---

## 🔐 Admin Handling (Security Design)

- Admin accounts cannot be created via public APIs
- Admin user is securely seeded on server startup
- Prevents privilege escalation
- Industry-standard RBAC design

### Default Admin Credentials (Demo Only)
```bash
Email: admin@system.com
Password: admin123
```
⚠️ Change credentials in production.

---

## ⚙️ Environment Variables

Create a `.env` file inside `backend/`:
```bash
PORT=5000
JWT_SECRET=your_secret_key
MONGO_URI=mongodb://127.0.0.1:27017/taskapp
```
---

## ▶️ Running the Project

### 1️⃣ Start MongoDB
```bash
mongod
```

---

### 2️⃣ Run Backend
```bash
cd backend
npm install
npm run dev
```

Expected output:
- ✅ MongoDB connected
- ✅ Admin seeded
- 🚀 Server running on port 5000

---

### 3️⃣ Run Frontend
```bash
cd frontend
npm install
npm start
```
---

## 📘 API Endpoints Overview

### Auth
- POST /api/v1/auth/register
- POST /api/v1/auth/login

### Tasks (USER)
- POST /api/v1/tasks
- GET /api/v1/tasks
- PUT /api/v1/tasks/:id
- DELETE /api/v1/tasks/:id

### Admin
- GET /api/v1/admin/tasks
- DELETE /api/v1/admin/tasks/:id

---

## 📈 Scalability Notes
- Modular architecture (controllers, routes, middleware)
- MongoDB supports horizontal scaling
- Stateless JWT authentication
- Easy migration to microservices
- Redis caching & load balancer ready

---

## 🚀 Future Improvements
- Docker & Docker Compose
- MongoDB Atlas
- Refresh token mechanism
- Pagination & filtering
- CI/CD pipeline

---

## 🧠 Learning Outcomes
- Secure JWT authentication
- Role-based authorization
- Backend–frontend integration
- MongoDB schema design
- Scalable REST API architecture

---

## 🏁 Conclusion

This project demonstrates a production-ready REST API with secure authentication, RBAC, persistent storage, and a functional frontend suitable for real-world applications.
