const express = require('express')
const router = express.Router()
const Appointment = require('../models/Appointment')
const auth = require('../middleware/auth')

// @route   POST /api/appointments
// @desc    Create a new appointment
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      service,
      vehicleInfo,
      message,
      appointmentDate,
      appointmentTime
    } = req.body

    // Validate required fields
    if (!name || !email || !phone || !service || !appointmentDate || !appointmentTime) {
      return res.status(400).json({
        message: 'Lütfen tüm zorunlu alanları doldurun.'
      })
    }

    // Check if appointment slot is available
    const existingAppointment = await Appointment.findOne({
      appointmentDate: new Date(appointmentDate),
      appointmentTime,
      status: { $ne: 'cancelled' }
    })

    if (existingAppointment) {
      return res.status(400).json({
        message: 'Bu tarih ve saat için randevu mevcuttur. Lütfen başka bir saat seçin.'
      })
    }

    // Create new appointment
    const appointment = new Appointment({
      name,
      email,
      phone,
      service,
      vehicleInfo,
      message,
      appointmentDate: new Date(appointmentDate),
      appointmentTime
    })

    const savedAppointment = await appointment.save()

    res.status(201).json({
      message: 'Randevu başarıyla oluşturuldu!',
      appointment: savedAppointment
    })

  } catch (error) {
    console.error('Error creating appointment:', error)
    res.status(500).json({
      message: 'Randevu oluşturulurken bir hata oluştu.'
    })
  }
})

// @route   GET /api/appointments
// @desc    Get all appointments (Admin only)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { status, date, page = 1, limit = 10 } = req.query
    
    let query = {}
    
    // Filter by status if provided
    if (status) {
      query.status = status
    }
    
    // Filter by date if provided
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      
      query.appointmentDate = {
        $gte: startDate,
        $lt: endDate
      }
    }

    const appointments = await Appointment.find(query)
      .sort({ appointmentDate: 1, appointmentTime: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)

    const total = await Appointment.countDocuments(query)

    res.json({
      appointments,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    })

  } catch (error) {
    console.error('Error fetching appointments:', error)
    res.status(500).json({
      message: 'Randevular getirilirken bir hata oluştu.'
    })
  }
})

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID (Admin only)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)

    if (!appointment) {
      return res.status(404).json({
        message: 'Randevu bulunamadı.'
      })
    }

    res.json(appointment)

  } catch (error) {
    console.error('Error fetching appointment:', error)
    res.status(500).json({
      message: 'Randevu getirilirken bir hata oluştu.'
    })
  }
})

// @route   PUT /api/appointments/:id
// @desc    Update appointment status (Admin only)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { status } = req.body

    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    )

    if (!appointment) {
      return res.status(404).json({
        message: 'Randevu bulunamadı.'
      })
    }

    res.json({
      message: 'Randevu durumu güncellendi.',
      appointment
    })

  } catch (error) {
    console.error('Error updating appointment:', error)
    res.status(500).json({
      message: 'Randevu güncellenirken bir hata oluştu.'
    })
  }
})

// @route   DELETE /api/appointments/:id
// @desc    Delete appointment (Admin only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)

    if (!appointment) {
      return res.status(404).json({
        message: 'Randevu bulunamadı.'
      })
    }

    res.json({
      message: 'Randevu başarıyla silindi.'
    })

  } catch (error) {
    console.error('Error deleting appointment:', error)
    res.status(500).json({
      message: 'Randevu silinirken bir hata oluştu.'
    })
  }
})

module.exports = router
