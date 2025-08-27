const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Admin = require('./models/Admin')

// Load environment variables
dotenv.config()

const seedAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/aslanotomotiv')
    console.log('Connected to MongoDB')

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
