# ContAI - Financial Entries Management System

A financial entries management system for ContAI, allowing users to register and visualize accounting entries organized by month.

## Features

- Register financial entries with date, description, amount, and type (credit/debit)
- View entries organized by month
- Calculate monthly totals for credits and debits

## Technologies

### Backend
- Node.js with Express
- TypeScript
- TypeORM
- PostgreSQL

### Frontend
- React
- TypeScript
- Axios for API requests
- React Router for navigation

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL

### Backend Setup
1. Navigate to the backend directory
2. Copy `.env.example` to `.env` and configure your database settings
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```

## API Endpoints

- `GET /api/launches` - Get all financial entries grouped by month
- `POST /api/launches` - Create a new financial entry
- `GET /api/launches/:month/:year` - Get entries for a specific month and year

## Data Validation

- Date must be in DD/MM/YYYY format
- Amount must be a positive number
- Type must be either "credit" or "debit"
- All fields are required