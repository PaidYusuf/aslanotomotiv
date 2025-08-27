# Aslan Otomotiv - Backend Setup

## MongoDB Installation

You need MongoDB installed and running on your system.

### Option 1: Install MongoDB Community Edition

1. Download MongoDB Community Edition from: https://www.mongodb.com/try/download/community
2. Install MongoDB following the official guide for Windows
3. Start MongoDB service:
   - Open Command Prompt as Administrator
   - Run: `net start MongoDB`

### Option 2: Use MongoDB Compass (Recommended)

1. Download MongoDB Compass from: https://www.mongodb.com/try/download/compass
2. Install and open MongoDB Compass
3. Connect to: `mongodb://localhost:27017`

### Option 3: Use Docker (Advanced)

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## Backend Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Create the admin user:
```bash
npm run seed
```

3. Start the server:
```bash
npm run dev
```

The server will run on http://localhost:5000

## Default Admin Credentials

- Username: `admin`
- Password: `admin123`

**IMPORTANT:** Please change the default password after first login!

## API Endpoints

- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments (Admin only)
- `PUT /api/appointments/:id` - Update appointment status (Admin only)
- `DELETE /api/appointments/:id` - Delete appointment (Admin only)
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get admin info
- `POST /api/auth/change-password` - Change admin password

## Frontend Integration

The frontend automatically connects to the backend running on `http://localhost:5000`

## Environment Variables

Copy `.env.example` to `.env` and update the values:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens (change in production!)
- `JWT_EXPIRES_IN` - Token expiration time
- `NODE_ENV` - Environment (development/production)
