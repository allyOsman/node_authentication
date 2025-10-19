
# Express.js Authentication API

A simple **Node.js + Express.js** authentication API using Sequelize ORM, JWT authentication, bcrypt password hashing, and middleware validation.

---

## 🚀 Features
- Register a new user with hashed passwords (bcrypt)
- Generate JWT tokens for authentication
- Basic route protection using token verification
- Organized folder structure (controllers, routes, validators, middlewares)
- Secure HTTP headers (Helmet) and CORS enabled
- Sequelize ORM for database management

---

## 🧱 Project Structure
```
project-folder/
├── controllers/
│   └── auth.js
├── middlewares/
│   └── validate.js
├── models/
│   └── user.js
├── routes/
│   └── auth.js
├── validators/
│   └── user.js
├── databases/
│   └── db.js
├── .env
├── server.js
└── package.json
```

---

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/express-auth-api.git
   cd express-auth-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   SERVER_PORT=5000
   JWT_SECRET=your_jwt_secret_key
   DB_NAME=your_database_name
   DB_USER=your_database_user
   DB_PASS=your_database_password
   DB_HOST=localhost
   DB_DIALECT=mysql
   ```

4. **Run the server**
   ```bash
   npm start
   ```

   or (for development)
   ```bash
   nodemon server.js
   ```

---

## 📡 API Endpoints

| Method | Endpoint         | Description              | Auth Required |
|---------|------------------|--------------------------|---------------|
| POST    | `/api/register`  | Register new user        | ❌ No         |
| POST    | `/api/login`     | Login user (TODO)        | ❌ No         |
| GET     | `/api/events`    | Public event list        | ❌ No         |
| GET     | `/api/special`   | Protected special events | ✅ Yes        |

---

## 🔐 Token Verification Middleware

Token verification is handled using `verifyToken` middleware:
```js
const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
```

Make sure to include the token in your request headers like this:
```
Authorization: Bearer <your_token>
```

---

## 🧪 Example Registration Request

```bash
curl -X POST http://localhost:5000/api/register \
-H "Content-Type: application/json" \
-d '{"username":"ally","email":"ally@example.com","password":"password123"}'
```

Response:
```json
{
  "message": "user registration successfully.",
  "user": {"id": 1, "username": "ally", "email": "ally@example.com"},
  "token": "your.jwt.token"
}
```

---

## 🧰 Technologies Used
- **Express.js** — Web framework
- **Sequelize** — ORM for SQL databases
- **bcryptjs** — Password hashing
- **jsonwebtoken (JWT)** — Token-based authentication
- **dotenv** — Environment configuration
- **helmet** — Secure HTTP headers
- **cors** — Enable cross-origin resource sharing

---

## 📅 Last Updated
October 13, 2025

---

## 🧑‍💻 Author
**Ally A. Ngonyani**  
📧 ally.a.ngonyany36@gmail.com 
💻 https://github.com/allyosman
