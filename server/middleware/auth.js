const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

module.exports = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        message: 'Erişim reddedildi. Token bulunamadı.'
      })
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      // Check if admin still exists
      const admin = await Admin.findById(decoded.admin.id).select('-password')
      if (!admin) {
        return res.status(401).json({
          message: 'Geçersiz token. Admin bulunamadı.'
        })
      }

      req.admin = admin
      next()

    } catch (error) {
      return res.status(401).json({
        message: 'Geçersiz token.'
      })
    }

  } catch (error) {
    console.error('Auth middleware error:', error)
    res.status(500).json({
      message: 'Sunucu hatası.'
    })
  }
}
