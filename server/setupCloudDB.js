const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load environment variables
dotenv.config()

async function setupCloudDatabase() {
  try {
    console.log('Setting up cloud database connection...')
    
    // Check if MONGODB_URI is configured
    if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('YOUR_USERNAME')) {
      console.error('❌ MongoDB URI is not properly configured!')
      console.log('Please update your .env file with your actual MongoDB Atlas connection string.')
      console.log('Example: mongodb+srv://username:password@cluster.mongodb.net/aslanotomotiv?retryWrites=true&w=majority')
      process.exit(1)
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGODB_URI)

    console.log('✅ Successfully connected to MongoDB Atlas!')
    console.log(`📊 Database: ${mongoose.connection.db.databaseName}`)
    console.log(`🌐 Host: ${mongoose.connection.host}`)

    // Test the connection by creating a simple test collection
    const testCollection = mongoose.connection.db.collection('connection_test')
    await testCollection.insertOne({ 
      message: 'Cloud database setup successful!', 
      timestamp: new Date(),
      environment: process.env.NODE_ENV || 'development'
    })

    console.log('✅ Test document inserted successfully!')
    
    // Clean up test document
    await testCollection.deleteOne({ message: 'Cloud database setup successful!' })
    console.log('🧹 Test cleanup completed!')

    // List existing collections
    const collections = await mongoose.connection.db.listCollections().toArray()
    console.log(`📁 Existing collections: ${collections.map(c => c.name).join(', ')}`)

    mongoose.connection.close()
    console.log('✅ Cloud database setup completed successfully!')
    
  } catch (error) {
    console.error('❌ Error setting up cloud database:', error.message)
    
    if (error.message.includes('authentication failed')) {
      console.log('🔑 Authentication failed. Please check your username and password.')
    } else if (error.message.includes('network')) {
      console.log('🌐 Network error. Please check your internet connection and MongoDB Atlas configuration.')
    } else if (error.message.includes('timeout')) {
      console.log('⏱️  Connection timeout. Please check your MongoDB Atlas cluster status.')
    }
    
    process.exit(1)
  }
}

// Run the setup if this file is executed directly
if (require.main === module) {
  setupCloudDatabase()
}

module.exports = { setupCloudDatabase }
