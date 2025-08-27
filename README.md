# Aslan Otomotiv Website

A modern automotive service website with appointment booking and admin management system.

## 🚀 Features

### Frontend
- **Modern UI/UX**: Built with React, Framer Motion animations
- **Responsive Design**: Mobile-first approach
- **Service Showcase**: Professional service presentation
- **Contact System**: Integrated contact forms and appointment booking
- **Interactive Elements**: Smooth scrolling, hover effects, and animations

### Backend & Admin System
- **Appointment Management**: Complete CRUD operations for appointments
- **Admin Dashboard**: Secure admin panel with authentication
- **Calendar Integration**: Visual appointment calendar using React Big Calendar
- **Database Storage**: MongoDB integration for data persistence
- **Status Management**: Track appointments (pending, confirmed, completed, cancelled)
- **Responsive Admin Panel**: Works on all devices

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **React Big Calendar** - Calendar component
- **Axios** - HTTP client
- **Date-fns** - Date utility library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB (see setup instructions below)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/PaidYusuf/aslanotomotiv.git
cd aslanotomotiv
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd server
npm install
```

### 4. Setup MongoDB

#### Option A: Local MongoDB Installation
1. Download and install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # Windows (as Administrator)
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Compass (Recommended)
1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect to: `mongodb://localhost:27017`

#### Option C: Docker
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### 5. Environment Setup
```bash
# In the server directory
cp .env.example .env
# Edit .env file with your configuration
```

### 6. Create Admin User
```bash
# In the server directory
npm run seed
```

### 7. Start the Application

#### Start Backend Server
```bash
cd server
npm run dev
# Server runs on http://localhost:5000
```

#### Start Frontend Development Server
```bash
# In the root directory
npm run dev
# Frontend runs on http://localhost:5173 (or next available port)
```

## 🔐 Admin Panel Access

### Default Admin Credentials
- **URL**: `http://localhost:5173/admin`
- **Username**: `admin`
- **Password**: `admin123`

**⚠️ IMPORTANT**: Change the default password immediately after first login!

### Admin Features
- **Dashboard**: Overview of all appointments with statistics
- **Calendar View**: Visual representation of appointments
- **List View**: Detailed appointment management
- **Status Management**: Update appointment status (pending → confirmed → completed)
- **Appointment Details**: View complete customer information
- **Delete Appointments**: Remove appointments when necessary

## 📱 Usage

### For Customers
1. Visit the website
2. Navigate to "Hizmetler" (Services) page
3. Click "Randevu Al" (Book Appointment) button
4. Fill out the appointment form in the contact section
5. Submit the form to book an appointment

### For Admins
1. Access the admin panel at `/admin`
2. Login with admin credentials
3. View and manage appointments
4. Update appointment statuses
5. Use calendar or list view as needed

## 🔧 API Endpoints

### Public Endpoints
- `POST /api/appointments` - Create new appointment

### Admin Endpoints (Requires Authentication)
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/:id` - Get specific appointment
- `PUT /api/appointments/:id` - Update appointment status
- `DELETE /api/appointments/:id` - Delete appointment

### Authentication Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Get current admin info
- `POST /api/auth/change-password` - Change password

## 🎨 Customization

### Styling
The project uses CSS custom properties (CSS variables) for easy theming. Main color scheme:
- Primary Gold: `#d4af37`
- Primary Black: `#0a0a0a`
- Secondary Black: `#1a1a1a`
- Accent Gray: `#2a2a2a`

### MongoDB Configuration
Update the `MONGODB_URI` in the `.env` file to use a different database or cloud service like MongoDB Atlas.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check the connection URI in `.env`
   - Verify MongoDB service is started

2. **Port Already in Use**
   - Frontend automatically finds next available port
   - Backend port can be changed in `.env` (PORT variable)

3. **Admin Login Issues**
   - Run `npm run seed` to create default admin user
   - Check MongoDB connection
   - Verify JWT_SECRET is set in `.env`

4. **Calendar Not Loading**
   - Ensure React Big Calendar styles are imported
   - Check browser console for errors
   - Verify date-fns locale is installed

## 📞 Support

If you need assistance, please:
1. Check the troubleshooting section
2. Review the server logs in terminal
3. Check browser console for frontend errors
4. Ensure all dependencies are installed correctly

---

Made with ❤️ for Aslan Otomotiv
