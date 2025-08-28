import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays, endOfWeek } from 'date-fns'
import { tr } from 'date-fns/locale'
import axios from 'axios'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = {
  'tr': tr,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([])
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentView, setCurrentView] = useState('calendar') // 'calendar' or 'list'
  const [adminInfo, setAdminInfo] = useState(null)
  const [filters, setFilters] = useState({
    status: 'all',
    date: ''
  })
  
  // Calendar navigation state
  const [calendarDate, setCalendarDate] = useState(new Date())
  const [calendarView, setCalendarView] = useState('month') // 'month', 'week', 'day'

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken')
    const admin = localStorage.getItem('adminInfo')
    
    if (!token || !admin) {
      window.location.href = '/admin'
      return
    }

    setAdminInfo(JSON.parse(admin))
    fetchAppointments()
  }, [])

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get('http://localhost:5000/api/appointments', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: filters.status !== 'all' ? { status: filters.status } : {}
      })
      
      setAppointments(response.data.appointments || [])
    } catch (error) {
      console.error('Error fetching appointments:', error)
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken')
        localStorage.removeItem('adminInfo')
        window.location.href = '/admin'
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminInfo')
    window.location.href = '/'
  }

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.put(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      
      // Refresh appointments
      fetchAppointments()
      setSelectedAppointment(null)
    } catch (error) {
      console.error('Error updating appointment:', error)
      alert('Randevu durumu güncellenirken bir hata oluştu.')
    }
  }

  const deleteAppointment = async (appointmentId) => {
    if (!confirm('Bu randevuyu silmek istediğinizden emin misiniz?')) {
      return
    }

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`http://localhost:5000/api/appointments/${appointmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      
      fetchAppointments()
      setSelectedAppointment(null)
    } catch (error) {
      console.error('Error deleting appointment:', error)
      alert('Randevu silinirken bir hata oluştu.')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107'
      case 'confirmed': return '#28a745'
      case 'completed': return '#17a2b8'
      case 'cancelled': return '#dc3545'
      default: return '#6c757d'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Beklemede'
      case 'confirmed': return 'Onaylandı'
      case 'completed': return 'Tamamlandı'
      case 'cancelled': return 'İptal Edildi'
      default: return status
    }
  }

  // Convert appointments to calendar events
  const calendarEvents = appointments.map(appointment => ({
    id: appointment._id,
    title: `${appointment.name} - ${appointment.service}`,
    start: new Date(`${appointment.appointmentDate.split('T')[0]}T${appointment.appointmentTime}:00`),
    end: new Date(`${appointment.appointmentDate.split('T')[0]}T${appointment.appointmentTime}:00`),
    resource: appointment
  }))

  const handleSelectEvent = (event) => {
    setSelectedAppointment(event.resource)
  }

  // Calendar navigation functions
  const handleNavigateToday = () => {
    setCalendarDate(new Date())
  }

  const handleNavigateBack = () => {
    let newDate
    switch (calendarView) {
      case 'month':
        newDate = subMonths(calendarDate, 1)
        break
      case 'week':
        newDate = subWeeks(calendarDate, 1)
        break
      case 'day':
        newDate = subDays(calendarDate, 1)
        break
      default:
        newDate = subMonths(calendarDate, 1)
    }
    setCalendarDate(newDate)
  }

  const handleNavigateNext = () => {
    let newDate
    switch (calendarView) {
      case 'month':
        newDate = addMonths(calendarDate, 1)
        break
      case 'week':
        newDate = addWeeks(calendarDate, 1)
        break
      case 'day':
        newDate = addDays(calendarDate, 1)
        break
      default:
        newDate = addMonths(calendarDate, 1)
    }
    setCalendarDate(newDate)
  }

  const handleViewChange = (view) => {
    setCalendarView(view)
  }

  const handleDateChange = (date) => {
    setCalendarDate(date)
  }

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-left">
          <h1>
            <i className="fas fa-tachometer-alt"></i>
            Admin Panel
          </h1>
          <p>Hoşgeldiniz, {adminInfo?.username}</p>
        </div>
        <div className="admin-header-right">
          <button
            className={`view-toggle ${currentView === 'calendar' ? 'active' : ''}`}
            onClick={() => setCurrentView('calendar')}
          >
            <i className="fas fa-calendar"></i>
            Takvim
          </button>
          <button
            className={`view-toggle ${currentView === 'list' ? 'active' : ''}`}
            onClick={() => setCurrentView('list')}
          >
            <i className="fas fa-list"></i>
            Liste
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i>
            Çıkış
          </button>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <i className="fas fa-calendar-check"></i>
            <div>
              <h3>{appointments.length}</h3>
              <p>Toplam Randevu</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-clock"></i>
            <div>
              <h3>{appointments.filter(a => a.status === 'pending').length}</h3>
              <p>Bekleyen</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-check-circle"></i>
            <div>
              <h3>{appointments.filter(a => a.status === 'confirmed').length}</h3>
              <p>Onaylanan</p>
            </div>
          </div>
          <div className="stat-card">
            <i className="fas fa-star"></i>
            <div>
              <h3>{appointments.filter(a => a.status === 'completed').length}</h3>
              <p>Tamamlanan</p>
            </div>
          </div>
        </div>

        <div className="admin-filters">
          <select
            value={filters.status}
            onChange={(e) => {
              setFilters({ ...filters, status: e.target.value })
              fetchAppointments()
            }}
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending">Bekleyen</option>
            <option value="confirmed">Onaylanan</option>
            <option value="completed">Tamamlanan</option>
            <option value="cancelled">İptal Edilen</option>
          </select>
          <button onClick={fetchAppointments} className="refresh-btn">
            <i className="fas fa-sync-alt"></i>
            Yenile
          </button>
        </div>

        <div className="admin-main">
          {currentView === 'calendar' ? (
            <div className="calendar-container">
              {/* Custom Calendar Navigation */}
              <div className="calendar-toolbar">
                <div className="calendar-nav-buttons">
                  <button 
                    className="nav-btn today-btn" 
                    onClick={handleNavigateToday}
                    title="Bugüne git"
                  >
                    <i className="fas fa-calendar-day"></i>
                    Bugün
                  </button>
                  <button 
                    className="nav-btn" 
                    onClick={handleNavigateBack}
                    title="Geri"
                  >
                    <i className="fas fa-chevron-left"></i>
                    Geri
                  </button>
                  <button 
                    className="nav-btn" 
                    onClick={handleNavigateNext}
                    title="İleri"
                  >
                    <i className="fas fa-chevron-right"></i>
                    İleri
                  </button>
                </div>
                
                <div className="calendar-current-date">
                  <h3>
                    {calendarView === 'month' && format(calendarDate, 'MMMM yyyy', { locale: tr })}
                    {calendarView === 'week' && `${format(startOfWeek(calendarDate, { locale: tr }), 'd MMMM', { locale: tr })} - ${format(endOfWeek(calendarDate, { locale: tr }), 'd MMMM yyyy', { locale: tr })}`}
                    {calendarView === 'day' && format(calendarDate, 'd MMMM yyyy, EEEE', { locale: tr })}
                  </h3>
                </div>
                
                <div className="calendar-view-buttons">
                  <button 
                    className={`view-btn ${calendarView === 'month' ? 'active' : ''}`}
                    onClick={() => handleViewChange('month')}
                  >
                    <i className="fas fa-calendar-alt"></i>
                    Ay
                  </button>
                  <button 
                    className={`view-btn ${calendarView === 'week' ? 'active' : ''}`}
                    onClick={() => handleViewChange('week')}
                  >
                    <i className="fas fa-calendar-week"></i>
                    Hafta
                  </button>
                  <button 
                    className={`view-btn ${calendarView === 'day' ? 'active' : ''}`}
                    onClick={() => handleViewChange('day')}
                  >
                    <i className="fas fa-calendar-day"></i>
                    Gün
                  </button>
                </div>
              </div>
              
              <Calendar
                localizer={localizer}
                events={calendarEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
                views={['month', 'week', 'day']}
                view={calendarView}
                onView={handleViewChange}
                date={calendarDate}
                onNavigate={handleDateChange}
                step={30}
                timeslots={2}
                culture="tr"
                toolbar={false}
                messages={{
                  next: "İleri",
                  previous: "Geri",
                  today: "Bugün",
                  month: "Ay",
                  week: "Hafta",
                  day: "Gün",
                  agenda: "Gündem",
                  date: "Tarih",
                  time: "Saat",
                  event: "Etkinlik",
                  allDay: "Tüm Gün",
                  noEventsInRange: "Bu aralıkta randevu yok",
                }}
                eventPropGetter={(event) => ({
                  style: {
                    backgroundColor: getStatusColor(event.resource.status),
                    borderColor: getStatusColor(event.resource.status),
                  }
                })}
              />
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.length === 0 ? (
                <div className="no-appointments">
                  <i className="fas fa-calendar-times"></i>
                  <p>Henüz randevu bulunmuyor.</p>
                </div>
              ) : (
                appointments.map(appointment => (
                  <motion.div
                    key={appointment._id}
                    className="appointment-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="appointment-header">
                      <h3>{appointment.name}</h3>
                      <span 
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(appointment.status) }}
                      >
                        {getStatusText(appointment.status)}
                      </span>
                    </div>
                    <div className="appointment-details">
                      <p><i className="fas fa-wrench"></i> {appointment.service}</p>
                      <p><i className="fas fa-calendar"></i> {new Date(appointment.appointmentDate).toLocaleDateString('tr-TR')}</p>
                      <p><i className="fas fa-clock"></i> {appointment.appointmentTime}</p>
                      <p><i className="fas fa-phone"></i> {appointment.phone}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <div className="modal-overlay" onClick={() => setSelectedAppointment(null)}>
          <motion.div
            className="appointment-modal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Randevu Detayları</h2>
              <button onClick={() => setSelectedAppointment(null)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-content">
              <div className="appointment-info">
                <div className="info-row">
                  <label>Müşteri:</label>
                  <span>{selectedAppointment.name}</span>
                </div>
                <div className="info-row">
                  <label>E-posta:</label>
                  <span>{selectedAppointment.email}</span>
                </div>
                <div className="info-row">
                  <label>Telefon:</label>
                  <span>{selectedAppointment.phone}</span>
                </div>
                <div className="info-row">
                  <label>Hizmet:</label>
                  <span>{selectedAppointment.service}</span>
                </div>
                <div className="info-row">
                  <label>Tarih:</label>
                  <span>{new Date(selectedAppointment.appointmentDate).toLocaleDateString('tr-TR')}</span>
                </div>
                <div className="info-row">
                  <label>Saat:</label>
                  <span>{selectedAppointment.appointmentTime}</span>
                </div>
                {selectedAppointment.vehicleInfo && (
                  <div className="info-row">
                    <label>Araç Bilgisi:</label>
                    <span>{selectedAppointment.vehicleInfo}</span>
                  </div>
                )}
                {selectedAppointment.message && (
                  <div className="info-row">
                    <label>Mesaj:</label>
                    <span>{selectedAppointment.message}</span>
                  </div>
                )}
                <div className="info-row">
                  <label>Durum:</label>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(selectedAppointment.status) }}
                  >
                    {getStatusText(selectedAppointment.status)}
                  </span>
                </div>
                <div className="info-row">
                  <label>Oluşturma Tarihi:</label>
                  <span>{new Date(selectedAppointment.createdAt).toLocaleString('tr-TR')}</span>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="status-btn confirm"
                  onClick={() => updateAppointmentStatus(selectedAppointment._id, 'confirmed')}
                  disabled={selectedAppointment.status === 'confirmed'}
                >
                  <i className="fas fa-check"></i>
                  Onayla
                </button>
                <button
                  className="status-btn complete"
                  onClick={() => updateAppointmentStatus(selectedAppointment._id, 'completed')}
                  disabled={selectedAppointment.status === 'completed'}
                >
                  <i className="fas fa-star"></i>
                  Tamamla
                </button>
                <button
                  className="status-btn cancel"
                  onClick={() => updateAppointmentStatus(selectedAppointment._id, 'cancelled')}
                  disabled={selectedAppointment.status === 'cancelled'}
                >
                  <i className="fas fa-times"></i>
                  İptal Et
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteAppointment(selectedAppointment._id)}
                >
                  <i className="fas fa-trash"></i>
                  Sil
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard
