import { motion } from 'framer-motion'
import { useState } from 'react'
import axios from 'axios'

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData)
      
      if (response.status === 200) {
        // Store token in localStorage
        localStorage.setItem('adminToken', response.data.token)
        localStorage.setItem('adminInfo', JSON.stringify(response.data.admin))
        
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard'
      }
    } catch (error) {
      console.error('Login error:', error)
      if (error.response?.data?.message) {
        setError(error.response.data.message)
      } else {
        setError('Giriş yapılırken bir hata oluştu.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-container">
        <motion.div 
          className="admin-login-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="admin-login-header">
            <h1>Admin Panel</h1>
            <p>Aslan Otomotiv Yönetim Sistemi</p>
          </div>

          <form onSubmit={handleSubmit} className="admin-login-form">
            <div className="form-group">
              <label htmlFor="username">Kullanıcı Adı</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Şifre</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={isSubmitting}
              />
            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              className="admin-login-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Giriş Yapılıyor...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Giriş Yap
                </>
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <a href="/">← Ana Sayfaya Dön</a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AdminLogin
