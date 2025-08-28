  const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Admin = require('./models/Admin')

// Load environment variables
dotenv.config()

const seedAdmin = async () => {
  try {
    // Only use cloud database - no local fallback
    if (!process.env.MONGODB_URI) {
      console.error('❌ MONGODB_URI environment variable is not set!')
      console.log('Please configure your .env file with your MongoDB Atlas connection string.')
      process.exit(1)
    }

    if (process.env.MONGODB_URI.includes('localhost') || process.env.MONGODB_URI.includes('127.0.0.1')) {
      console.error('❌ Local MongoDB connection detected!')
      console.log('Seed script is configured to only use cloud database.')
      console.log('Please update your .env file with a MongoDB Atlas connection string.')
      process.exit(1)
    }

    // Connect to MongoDB Atlas only
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB Atlas for seeding')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' })
    if (existingAdmin) {
      console.log('Admin user already exists')
      return
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123', // This will be hashed automatically
      role: 'super_admin'
    })

    await admin.save()
    console.log('Default admin user created:')
    console.log('Username: admin')
    console.log('Password: admin123')
    console.log('Role: super_admin')
    console.log('')
    console.log('IMPORTANT: Please change the default password after first login!')

  } catch (error) {
    console.error('Error seeding admin:', error)
  } finally {
    mongoose.connection.close()
  }
}

seedAdmin()
