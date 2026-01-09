# Expense Tracker API
A full‑featured Expense Tracker REST API built with Node.js, Express, MongoDB, and Mongoose. This project focuses on clean architecture, real-world backend practices, and scalable financial features, including budgeting, expense tracking, trend analysis, and audit logging.


## 🚀 Features

### 🔐 Authentication & Authorization
* User sign‑up / sign‑in using JWT
* Secure password hashing with bcrypt
* Protected routes using auth middleware

### 💸 Transactions
* Create, update, and delete income & expense transactions
* Category‑based transactions
* User‑specific data isolation

### 🗂 Categories
* User‑defined transaction categories
* Category type support (income/expense)
* Colour-coded categories for UI usage

### 📊 Expense Analytics
* Monthly expense trends
* Yearly expense summaries
* Category‑wise expense breakdown

### 💰 Budgets
* Category‑wise budgets
* Monthly or yearly budgets
* Budget vs actual expense comparison
* Over‑budget & remaining budget calculation

### 🧾 Audit Logs
* Automatic audit logging via middleware
* Tracks CREATE / UPDATE / DELETE actions
* Logs before & after snapshots
* Stores metadata (IP, user agent)


## 🏗 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* bcrypt
* express‑async‑handler
* express-rate-limit

## 📁 Project Structure
```

src/
│
├── controllers/        # Route controllers
├── services/           # Business logic & aggregations
├── models/             # Mongoose schemas
├── routes/             # Express route definitions
├── middlewares/        # Auth, audit log, error handlers
├── validations/        # Input validations
├── configs/            # Env, rate limit, db config
├── database/           # MongoDB connection
├── utils/              # Helpers & custom errors
└── server.js           # App entry point

```

## 🔑 Environment Variables
```
# ENVIRONMENT
NODE_ENV = development

# PORT
PORT = 5500

# MONGODB
MONGODB_URI = your_mongodb_connection_string

# JWT AUTHENTICATION
JWT_SECRET = your_super_secret_key
JWT_EXPIRES_IN = 7d
```

### ▶️ Running the Project
```
npm install
npm run server
```
### 📺 Server will start on:
```
http://localhost:5500
```

## 📌 API Overview
### Auth
* ` POST /api/v1/auth/sign-up `
* ` POST /api/v1/auth/sign-in `
* ` POST /api/v1/auth/sign-out `

### Categories
* ` GET /api/v1/categories `
* ` POST /api/v1/categories `
* ` PUT /api/v1/categories/:id `
* `DELETE /api/v1/categories/:id`

### Transactions
* ` GET /api/v1/transactionzs `
* ` POST /api/v1/transactionzs `
* ` PUT /api/v1/transactionzs/:id `
* ` DELETE /api/v1/transactionzs/:id `

### Budgets
* ` GET /api/v1/budgets?year=2026&month=3 `
* ` POST /api/v1/budgets `
* ` PUT /api/v1/budgets/:id `
* ` DELETE /api/v1/budgets/:id `

### Analytics
* ` GET /api/v1/trends/monthly?year=2025 `
* ` GET /api/v1/summary?year=2025&month=3 `

## 🛠 Future Improvements
### - Core Usability Improvements -
#### Smart defaults
* Remember the last date
* Default currency
#### Better Error Message
#### Editable Transactions
* Undo delete

### - Personalisation and Control -
#### Recurring Transactions 
* Generate expense record every month on the 1st
#### Custom categories and colours
* Reorder categories
* Archive unused ones
#### Date range filters
* Custom range (from - to)
* Last 7 days
* Last 30 days

### - Performance and Reliability -
#### Pagination and infinite scroll
#### Soft Deletes
* Allow recovery

### - Security and Account Features -
#### Password Reset Flow
* Forgot Password
* Email token
* Reset Password
#### Refresh Tokens
* Short-lived access token
* Long-lived refresh token

### - Data Export and Portability -
#### Export to CSV / Excel
* Monthly Reports
* Category Summary

### - Optional Features -
#### Expense Insights
* Simple AI logics
