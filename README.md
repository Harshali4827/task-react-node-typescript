# MERN Student Management System With Double Encryption

A full-stack MERN application built using React, TypeScript, Node.js, Express, and MongoDB with 2-level AES encryption.

---

# Tech Stack

## Frontend
- React
- TypeScript
- Axios
- CryptoJS

## Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose

---

# Features

- Login Form with Validation
- Student Registration
- View Student List
- Update Student
- Delete Student
- Frontend AES Encryption
- Backend AES Encryption
- Double-layer encrypted MongoDB storage

---

# Folder Structure

```bash
task-react-node-typescript/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── StudentForm.tsx
│   │   │   └── StudentList.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── utils/
│   │   │   └── crypto.ts
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   │
│   │   ├── controllers/
│   │   │   └── studentController.ts
│   │   │
│   │   ├── models/
│   │   │   └── Student.ts
│   │   │
│   │   ├── routes/
│   │   │   └── studentRoutes.ts
│   │   │
│   │   ├── utils/
│   │   │   └── crypto.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│
├── README.md
```

---

# API Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/register | Register Student |
| POST | /api/login | Login Student |
| GET | /api/students | Get All Students |
| PUT | /api/student/:id | Update Student |
| DELETE | /api/student/:id | Delete Student |

---

# Encryption Flow

## Frontend Encryption

Before sending data to backend:

```txt
Plain Text
↓
Frontend AES Encryption
↓
Encrypted Data
```

---

## Backend Encryption

Backend encrypts frontend encrypted data again before storing in MongoDB:

```txt
Frontend Encrypted Data
↓
Backend AES Encryption
↓
MongoDB
```

---

## Data Fetch Flow

```txt
MongoDB Data
↓
Backend Decrypt
↓
Frontend Encrypted Data
↓
Frontend Decrypt
↓
Original Data
```

---

# Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Harshali4827/task-react-node-typescript.git
```

---

## 2. Backend Setup

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/mern_task

FRONTEND_SECRET=mern_frontend_encrypt_key_2026

BACKEND_SECRET=mern_backend_encrypt_key_2026
```

Run backend server:

```bash
npm run dev
```

Backend runs on:

```txt
http://localhost:5000
```

---

## 3. Frontend Setup

Open new terminal:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

Frontend runs on:

```txt
http://localhost:5173
```

---

# MongoDB Setup

Start MongoDB service before running backend.

MongoDB connection:

```env
mongodb://127.0.0.1:27017/mern_task
```

---

# Login Validation

- Email must contain "@"
- Password minimum 6 characters

---

# Author

Harshali Bagul
