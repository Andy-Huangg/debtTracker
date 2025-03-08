# Debt Tracker 
Debt Tracker is a simple app I built to help track the amount of money people owe me. It can manage transactions and share debt details with debtors through a link.\
This app is built with the PERN (PostgreSQL, Express, React, Node.js) stack.

## Features

- **User Authentication**: Secure sign-up and login using JWT authentication.
- **Debt Management**: Add, update, and delete debts.
- **Transaction Tracking**: Log payments and additional debts.
- **Real-time Balance Updates**: Amount owed updates automatically based on transactions.
- **Shareable Debt Links**: Allow debtors to view their balance without an account.
- **Responsive UI**: Tailwind CSS for a seamless experience across devices.

## Tech Stack

### Backend:

- **Node.js** & **Express.js** - API and server-side logic
- **PostgreSQL** - Database for storing users, debts, and transactions
- **Prisma ORM** - Database modeling and queries
- **JWT Authentication** - Secure login and session management

### Frontend:

- **React.js** - Dynamic UI components
- **Tailwind CSS** - Modern styling and responsiveness
- **Fetch API** - Handling API requests

## Installation & Setup

### Prerequisites:

Ensure you have the following installed:

- Node.js (>=18)
- PostgreSQL
- Railway CLI (optional, for deployment)

### 1. Clone the Repository

```sh
git clone https://github.com/Andy-Huangg/debtTracker.git
cd debtTracker
```

### 2. Backend Setup

```sh
cd backend
npm install
cp .env.example .env # Fill in database and JWT secrets
npx prisma migrate dev # Apply database migrations
npm run dev # Start the backend server
```

### 3. Frontend Setup

```sh
cd frontend
npm install
npm run dev # Start the React app
```

### 4. Environment Variables

Create a `.env` file in the backend with:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=your_frontend_url
```

## API Endpoints

### **Auth Routes**

- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and receive a token

### **Debt Routes**

- `GET /api/debts` - Fetch all debts for logged-in user
- `POST /api/debts` - Create a new debt
- `GET /api/debts/:slug` - Fetch a specific debt
- `PUT /api/debts/:slug` - Update debt details
- `DELETE /api/debts/:slug` - Remove a debt

### **Transaction Routes**

- `POST /api/debts/:slug/transactions` - Add a transaction to a debt

## Deployment

### **Backend (Railway)**

1. Push code to GitHub.
2. Deploy on Railway by linking the GitHub repo.
3. Set environment variables on Railway.
4. Deploy!

### **Frontend (Vercel)**

1. Push code to GitHub.
2. Deploy on Vercel by linking the GitHub repo.
3. Set environment variables in Vercel.
4. Deploy!

## Preview
![Display](https://github.com/user-attachments/assets/0f080d27-c9d2-49e0-8315-e4a0d3b7af94)

Project Link: https://debt-tracker-eight.vercel.app/

