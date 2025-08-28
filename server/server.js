const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
const connectToDatabase = async () => {
  try {
    // Only use cloud database - no local fallback
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set!')
      console.log('Please configure your .env file with your MongoDB Atlas connection string.')
      process.exit(1)
    }

    if (process.env.MONGODB_URI.includes('localhost') || process.env.MONGODB_URI.includes('127.0.0.1')) {
      console.error('❌ Local MongoDB connection detected!')
      console.log('This server is configured to only use cloud database.')
      console.log('Please update your .env file with a MongoDB Atlas connection string.')
      process.exit(1)
    }
    
    await mongoose.connect(process.env.MONGODB_URI)
    
    console.log('✅ MongoDB connected successfully')
    console.log(`📊 Connected to: ${mongoose.connection.db.databaseName}`)
    console.log('🌐 Using MongoDB Atlas (Cloud Database)')
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    
    if (error.message.includes('authentication failed')) {
      console.log('🔑 Please check your MongoDB Atlas username and password')
    } else if (error.message.includes('network')) {
      console.log('🌐 Please check your internet connection and MongoDB Atlas settings')
    }
    
    process.exit(1)
  }
}

// Initialize database connection
connectToDatabase()

// Import routes
const appointmentRoutes = require('./routes/appointments')
const authRoutes = require('./routes/auth')

// Use routes
app.use('/api/appointments', appointmentRoutes)
app.use('/api/auth', authRoutes)

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend server is running!' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
