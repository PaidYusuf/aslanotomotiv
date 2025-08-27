const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const auth = require('../middleware/auth')

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: 'Kullanıcı adı ve şifre gereklidir.'
      })
    }

    // Find admin
    const admin = await Admin.findOne({ username })
    if (!admin) {
      return res.status(401).json({
        message: 'Geçersiz kullanıcı adı veya şifre.'
      })
    }

    // Check password
    const isMatch = await admin.comparePassword(password)
    if (!isMatch) {
      return res.status(401).json({
        message: 'Geçersiz kullanıcı adı veya şifre.'
      })
    }

    // Update last login
    admin.lastLogin = new Date()
    await admin.save()

    // Create JWT token
    const payload = {
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    }

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    )

    res.json({
      message: 'Giriş başarılı.',
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role,
        lastLogin: admin.lastLogin
      }
    })

  } catch (error) {
    console.error('Error during login:', error)
    res.status(500).json({
      message: 'Giriş yapılırken bir hata oluştu.'
    })
  }
})

// @route   POST /api/auth/register
// @desc    Register new admin (Super admin only)
// @access  Private
router.post('/register', auth, async (req, res) => {
  try {
    // Check if user is super admin
    if (req.admin.role !== 'super_admin') {
      return res.status(403).json({
        message: 'Bu işlem için yetkiniz yok.'
      })
    }

    const { username, password, role = 'admin' } = req.body

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: 'Kullanıcı adı ve şifre gereklidir.'
      })
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: 'Şifre en az 6 karakter olmalıdır.'
      })
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      return res.status(400).json({
        message: 'Bu kullanıcı adı zaten kullanılıyor.'
      })
    }

    // Create new admin
    const admin = new Admin({
      username,
      password,
      role
    })

    await admin.save()

    res.status(201).json({
      message: 'Admin başarıyla oluşturuldu.',
      admin: {
        id: admin.id,
        username: admin.username,
        role: admin.role
      }
    })

  } catch (error) {
    console.error('Error during registration:', error)
    res.status(500).json({
      message: 'Admin oluşturulurken bir hata oluştu.'
    })
  }
})

// @route   GET /api/auth/me
// @desc    Get current admin info
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin.id).select('-password')
    
    if (!admin) {
      return res.status(404).json({
        message: 'Admin bulunamadı.'
      })
    }

    res.json(admin)

  } catch (error) {
    console.error('Error fetching admin info:', error)
    res.status(500).json({
      message: 'Admin bilgileri getirilirken bir hata oluştu.'
    })
  }
})

// @route   POST /api/auth/change-password
// @desc    Change admin password
// @access  Private
router.post('/change-password', auth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: 'Mevcut şifre ve yeni şifre gereklidir.'
      })
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message: 'Yeni şifre en az 6 karakter olmalıdır.'
      })
    }

    // Find admin
    const admin = await Admin.findById(req.admin.id)
    if (!admin) {
      return res.status(404).json({
        message: 'Admin bulunamadı.'
      })
    }

    // Check current password
    const isMatch = await admin.comparePassword(currentPassword)
    if (!isMatch) {
      return res.status(400).json({
        message: 'Mevcut şifre yanlış.'
      })
    }

    // Update password
    admin.password = newPassword
    await admin.save()

    res.json({
      message: 'Şifre başarıyla değiştirildi.'
    })

  } catch (error) {
    console.error('Error changing password:', error)
    res.status(500).json({
      message: 'Şifre değiştirilirken bir hata oluştu.'
    })
  }
})

module.exports = router
