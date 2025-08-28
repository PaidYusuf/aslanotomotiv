import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format, parse } from 'date-fns'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    vehicleInfo: '',
    message: '',
    appointmentDate: '', // Will store DD/MM/YYYY format
    appointmentTime: ''
  })
  
  const [calendarDate, setCalendarDate] = useState(null) // Date object for picker

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  // Handle scrolling to hash target on component mount
  useEffect(() => {
    const hash = window.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        // Delay to ensure the page has rendered
        setTimeout(() => {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          })
        }, 100)
      }
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle date selection from calendar
  const handleDateChange = (date) => {
    setCalendarDate(date)
    if (date) {
      setFormData(prev => ({
        ...prev,
        appointmentDate: format(date, 'dd/MM/yyyy')
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        appointmentDate: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    
    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.phone || 
          !formData.service || !formData.appointmentDate || !formData.appointmentTime) {
        setSubmitStatus('error')
        setIsSubmitting(false)
        return
      }

      // Convert DD/MM/YYYY to ISO format for backend
      let isoDate = formData.appointmentDate
      if (formData.appointmentDate && formData.appointmentDate.includes('/')) {
        // Parse DD/MM/YYYY and convert to YYYY-MM-DD
        const parsedDate = parse(formData.appointmentDate, 'dd/MM/yyyy', new Date())
        isoDate = format(parsedDate, 'yyyy-MM-dd')
      }

      // Prepare data for backend
      const submitData = {
        ...formData,
        appointmentDate: isoDate
      }

      // Send data to backend
      const response = await axios.post('http://localhost:5000/api/appointments', submitData)
      
      if (response.status === 201) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          vehicleInfo: '',
          message: '',
          appointmentDate: '',
          appointmentTime: ''
        })
        setCalendarDate(null) // Reset calendar date
      }
    } catch (error) {
      console.error('Error submitting appointment:', error)
      setSubmitStatus('error')
      
      // Show specific error message if available
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const services = [
    'Motor Yağı Değişimi',
    'Yağ Filtresi Değişimi',
    'Hava Filtresi Değişimi',
    'Cam Silecek Değişimi',
    'Genel Araç Bakımı',
    'Yedek Parça Satışı',
    'Diğer'
  ]

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ]

  const contactInfo = [
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Adres',
      details: [
        'Cumhuriyet, 684. Sk. No:60',
        'Muratpaşa/Antalya, 07010'
      ],
      action: {
        text: 'Haritada Gör',
        link: 'https://maps.app.goo.gl/AYsRbxhSMLd3bpDQA'
      }
    },
    {
      icon: 'fas fa-phone',
      title: 'Telefon',
      details: [
        '+90 532 798 65 42',
        '+90 212 123 45 67'
      ],
      action: {
        text: 'Hemen Ara',
        link: 'tel:+905327986542'
      }
    },
    {
      icon: 'fas fa-envelope',
      title: 'E-posta',
      details: [
        'info@aslanotomotiv.com',
        'randevu@aslanotomotiv.com'
      ],
      action: {
        text: 'E-posta Gönder',
        link: 'mailto:info@aslanotomotiv.com'
      }
    },
    {
      icon: 'fas fa-clock',
      title: 'Çalışma Saatleri',
      details: [
        'Pazartesi - Cuma: 08:00 - 18:00',
        'Cumartesi: 08:00 - 16:00',
        'Pazar: Kapalı'
      ],
      action: null
    }
  ]

  const faqs = [
    {
      question: 'Randevu almadan gelebilir miyim?',
      answer: 'Evet, randevusuz da hizmet verebiliriz ancak randevu alırsanız beklemezsiniz.'
    },
    {
      question: 'Motor yağı değişimi ne kadar sürer?',
      answer: 'Motor yağı değişimi ortalama 15-20 dakika sürmektedir.'
    },
    {
      question: 'Hangi marka yağları kullanıyorsunuz?',
      answer: 'Castrol, Mobil 1, Shell, Total gibi kaliteli markaların ürünlerini kullanıyoruz.'
    },
    {
      question: 'Ödeme seçenekleriniz nelerdir?',
      answer: 'Nakit, kredi kartı ve havale ile ödeme kabul ediyoruz.'
    },
    {
      question: 'Garanti veriyor musunuz?',
      answer: 'Evet, tüm hizmetlerimiz için garanti veriyoruz. Detaylar hizmete göre değişmektedir.'
    }
  ]

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div 
            className="hero-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>İletişim</h1>
            <p>
              Sorularınız için bize ulaşın veya randevu alarak aracınızın bakım 
              ihtiyaçlarını karşılayalım.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="contact-info-section section">
        <div className="container">
          <div className="grid grid-4">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                className="contact-info-card card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
              >
                <div className="card-header text-center">
                  <i className={`${info.icon} icon`}></i>
                  <h3>{info.title}</h3>
                </div>
                <div className="card-body text-center">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="contact-detail">{detail}</p>
                  ))}
                </div>
                {info.action && (
                  <div className="card-footer text-center">
                    <a href={info.action.link} className="btn btn-outline btn-sm">
                      {info.action.text}
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section id="randevu-form" className="contact-form-section section section-dark">
        <div className="container">
          <div className="grid grid-2">
            {/* Contact Form */}
            <motion.div 
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="form-header">
                <h2>Randevu Al</h2>
                <p>Formu doldurarak randevu talep edebilirsiniz.</p>
              </div>

              {submitStatus === 'success' && (
                <div className="alert alert-success">
                  <i className="fas fa-check-circle"></i>
                  Randevu talebiniz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.
                </div>
              )}

              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="fas fa-user"></i>
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Adınız ve soyadınız"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      <i className="fas fa-phone"></i>
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="0532 798 65 42"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="fas fa-envelope"></i>
                      E-posta
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="service">
                      <i className="fas fa-tools"></i>
                      Hizmet Türü *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Hizmet seçiniz</option>
                      {services.map((service, index) => (
                        <option key={index} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentDate">
                      <i className="fas fa-calendar"></i>
                      Randevu Tarihi
                    </label>
                    <DatePicker
                      id="appointmentDate"
                      selected={calendarDate}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      placeholderText="GG/AA/YYYY"
                      className="form-control"
                      autoComplete="off"
                      showPopperArrow={false}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="appointmentTime">
                      <i className="fas fa-clock"></i>
                      Randevu Saati
                    </label>
                    <select
                      id="appointmentTime"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleInputChange}
                    >
                      <option value="">Saat seçiniz</option>
                      {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="vehicleInfo">
                    <i className="fas fa-car"></i>
                    Araç Bilgileri
                  </label>
                  <input
                    type="text"
                    id="vehicleInfo"
                    name="vehicleInfo"
                    value={formData.vehicleInfo}
                    onChange={handleInputChange}
                    placeholder="Örn: 2018 Toyota Corolla 1.6"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    <i className="fas fa-comment"></i>
                    Ek Notlar
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Varsa ek bilgiler ve istekleriniz..."
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className={`btn btn-primary btn-block ${isSubmitting ? 'loading' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane"></i>
                      Randevu Talebi Gönder
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map & Quick Contact */}
            <motion.div 
              className="map-wrapper"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="map-placeholder">
                <i className="fas fa-map"></i>
                <h3>Konum</h3>
                <p>Cumhuriyet, 684. Sk. No:60<br />Muratpaşa/Antalya</p>
                <a href="https://maps.app.goo.gl/AYsRbxhSMLd3bpDQA" className="btn btn-outline" target="_blank">
                  <i className="fas fa-external-link-alt" style={{ fontSize: '1.1rem', marginRight: '0.5rem', verticalAlign: 'middle' }}></i>
                  Google Maps'te Aç
                </a>
              </div>

              <div className="quick-contact">
                <h3>Hızlı İletişim</h3>
                <div className="quick-contact-options">
                  <a href="tel:+905327986542" className="quick-contact-btn">
                    <i className="fas fa-phone"></i>
                    <div>
                      <span className="label">Telefon</span>
                      <span className="value">+90 532 798 65 42</span>
                    </div>
                  </a>
                  <a href="https://wa.me/905327986542" className="quick-contact-btn">
                    <i className="fab fa-whatsapp"></i>
                    <div>
                      <span className="label">WhatsApp</span>
                      <span className="value">Mesaj Gönder</span>
                    </div>
                  </a>
                  <a href="mailto:info@aslanotomotiv.com" className="quick-contact-btn">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <span className="label">E-posta</span>
                      <span className="value">info@aslanotomotiv.com</span>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Sıkça Sorulan Sorular</h2>
            <p>En çok merak edilen sorular ve cevapları.</p>
          </motion.div>
          
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="faq-question">
                  <i className="fas fa-question-circle text-gold"></i>
                  <h3>{faq.question}</h3>
                </div>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        /* Page Hero */
        .page-hero {
          background: var(--gradient-dark);
          padding: 8rem 0 4rem;
          margin-top: 70px;
          text-align: center;
        }

        .hero-content h1 {
          margin-bottom: 1.5rem;
        }

        .hero-content p {
          max-width: 600px;
          margin: 0 auto;
          font-size: 1.1rem;
        }

        /* Contact Info Cards */
        .contact-info-card {
          text-align: center;
          height: 100%;
        }

        .contact-detail {
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-light);
        }

        .btn-sm {
          padding: 0.6rem 1.2rem;
          font-size: 0.9rem;
        }

        /* Contact Form */
        .contact-form-wrapper {
          background: var(--secondary-black);
          padding: 3rem;
          border: 1px solid var(--border-color);
        }

        .form-header {
          margin-bottom: 2rem;
        }

        .form-header h2 {
          margin-bottom: 0.5rem;
          color: var(--primary-gold);
        }

        .form-header p {
          color: var(--text-muted);
          margin: 0;
        }

        .alert {
          padding: 1rem;
          margin-bottom: 2rem;
          border-radius: 0;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .alert-success {
          background: rgba(40, 167, 69, 0.1);
          border: 1px solid #28a745;
          color: #28a745;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-light);
          font-weight: 600;
          font-size: 0.9rem;
        }

        .form-group label i {
          color: var(--primary-gold);
          width: 16px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          background: var(--accent-gray);
          border: 1px solid var(--border-color);
          color: var(--text-light);
          padding: 0.8rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 0;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-gold);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: var(--text-muted);
        }

        /* DatePicker Styling */
        .form-group .react-datepicker-wrapper {
          width: 100%;
        }

        .form-group .react-datepicker__input-container input {
          background: var(--accent-gray);
          border: 1px solid var(--border-color);
          color: var(--text-light);
          padding: 0.8rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          border-radius: 0;
          width: 100%;
        }

        .form-group .react-datepicker__input-container input:focus {
          outline: none;
          border-color: var(--primary-gold);
          box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
        }

        .form-group .react-datepicker__input-container input::placeholder {
          color: var(--text-muted);
        }

        .btn-block {
          width: 100%;
        }

        .btn.loading {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Map & Quick Contact */
        .map-wrapper {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .map-placeholder {
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          padding: 4rem 2rem;
          text-align: center;
          height: 300px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }

        .map-placeholder i {
          font-size: 4rem;
          color: var(--primary-gold);
        }

        .map-placeholder h3 {
          margin: 0;
          color: var(--text-light);
        }

        .map-placeholder p {
          margin: 0;
          color: var(--text-muted);
        }

        .map-placeholder .btn {
          margin-top: 1rem;
          min-width: 200px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          font-size: 0.9rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }

        .quick-contact {
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          padding: 2rem;
        }

        .quick-contact h3 {
          margin-bottom: 1.5rem;
          color: var(--primary-gold);
          text-align: center;
        }

        .quick-contact-options {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .quick-contact-btn {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          background: var(--accent-gray);
          border: 1px solid var(--border-color);
          color: var(--text-light);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .quick-contact-btn:hover {
          border-color: var(--primary-gold);
          background: rgba(212, 175, 55, 0.1);
        }

        .quick-contact-btn i {
          font-size: 1.5rem;
          color: var(--primary-gold);
          width: 24px;
          text-align: center;
        }

        .quick-contact-btn .label {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .quick-contact-btn .value {
          display: block;
          font-weight: 600;
          color: var(--text-light);
        }

        /* FAQ Section */
        .faq-list {
          max-width: 800px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .faq-item {
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          padding: 2rem;
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          border-color: var(--primary-gold);
        }

        .faq-question {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .faq-question i {
          font-size: 1.2rem;
        }

        .faq-question h3 {
          margin: 0;
          color: var(--text-light);
          font-size: 1.1rem;
        }

        .faq-answer p {
          margin: 0;
          color: var(--text-muted);
          line-height: 1.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .contact-form-wrapper {
            padding: 2rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .quick-contact-options {
            gap: 0.8rem;
          }

          .quick-contact-btn {
            padding: 0.8rem;
          }

          .faq-item {
            padding: 1.5rem;
          }

          .faq-question {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact-form-wrapper {
            padding: 1.5rem;
          }

          .map-placeholder {
            padding: 3rem 1rem;
          }

          .quick-contact {
            padding: 1.5rem;
          }

          .faq-item {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Contact
