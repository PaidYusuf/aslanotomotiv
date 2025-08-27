import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const fullText = 'Profesyonel Araç Bakım Hizmetleri'

  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.substring(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    return () => clearInterval(typingInterval)
  }, [])

  const services = [
    {
      icon: 'fas fa-oil-can',
      title: 'Motor Yağı Değişimi',
      description: 'Kaliteli motor yağları ile aracınızın performansını artırın ve motor ömrünü uzatın.',
      features: ['Premium yağ markaları', 'Hızlı servis', 'Uygun fiyat']
    },
    {
      icon: 'fas fa-filter',
      title: 'Filtre Değişimi',
      description: 'Yağ filtresi, hava filtresi ve diğer filtrelerin profesyonel değişimi.',
      features: ['Orijinal filtreler', 'Uzman montaj', 'Kalite garantisi']
    },
    {
      icon: 'fas fa-tools',
      title: 'Genel Bakım',
      description: 'Aracınızın genel kontrolü ve bakım hizmetleri ile güvenli sürüş.',
      features: ['Detaylı kontrol', 'Periyodik bakım', 'Önleyici hizmet']
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Yedek Parça Satışı',
      description: 'Kaliteli markalardan cam silecek, yağ ve diğer yedek parçalar.',
      features: ['Güvenilir markalar', 'Uygun fiyatlar', 'Hızlı tedarik']
    }
  ]

  const brands = [
    { name: 'Castrol', image: 'castrol-logo.png' },
    { name: 'Mobil 1', image: 'mobil1-logo.png' },
    { name: 'Total', image: 'total-logo.png' },
    { name: 'Shell', image: 'shell-logo.png' },
    { name: 'Liqui Moly', image: 'liquimoly-logo.png' },
    { name: 'Bosch', image: 'bosch-logo.png' }
  ]

  const testimonials = [
    {
      name: 'Mehmet Kaya',
      rating: 5,
      comment: '15 yıldır Aslan Otomotiv\'e gidiyorum. Her zaman kaliteli hizmet alıyorum.',
      service: 'Motor Yağı Değişimi'
    },
    {
      name: 'Ayşe Demir',
      rating: 5,
      comment: 'Çok güvenilir bir işletme. Fiyatları uygun, hizmetleri mükemmel.',
      service: 'Genel Bakım'
    },
    {
      name: 'Ali Yılmaz',
      rating: 5,
      comment: 'Profesyonel ekip, temiz ortam. Kesinlikle tavsiye ederim.',
      service: 'Filtre Değişimi'
    }
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="hero-title">
                <span className="text-gold">ASLAN OTOMOTİV</span><br />
                {typedText}
                <span className="cursor">|</span>
              </h1>
              <p className="hero-description">
                30 yıllık tecrübemizle aracınızın motor yağı değişimi, filtre bakımı 
                ve genel servis hizmetlerini profesyonel ekibimizle gerçekleştiriyoruz.
              </p>
              <div className="hero-buttons">
                <Link to="/hizmetler" className="btn btn-primary">
                  <i className="fas fa-tools"></i>
                  Hizmetlerimiz
                </Link>
                <a href="tel:+905327986542" className="btn btn-outline">
                  <i className="fas fa-phone"></i>
                  Hemen Ara
                </a>
              </div>
            </motion.div>
            <motion.div 
              className="hero-stats"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="stat">
                <div className="stat-number">30+</div>
                <div className="stat-label">Yıl Tecrübe</div>
              </div>
              <div className="stat">
                <div className="stat-number">10.000+</div>
                <div className="stat-label">Mutlu Müşteri</div>
              </div>
              <div className="stat">
                <div className="stat-number">24/7</div>
                <div className="stat-label">Destek</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services section section-dark">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Hizmetlerimiz</h2>
            <p>Aracınız için ihtiyacınız olan tüm bakım hizmetlerini tek çatı altında bulabilirsiniz.</p>
          </motion.div>
          <div className="grid grid-2">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="service-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-header">
                  <i className={`${service.icon} icon`}></i>
                  <h3 className="card-title">{service.title}</h3>
                </div>
                <div className="card-body">
                  <p>{service.description}</p>
                  <ul className="feature-list">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>
                        <i className="fas fa-check text-gold"></i>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <Link to="/hizmetler" className="btn btn-outline">
                    Detayları Gör
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose section">
        <div className="container">
          <div className="grid grid-2">
            <motion.div 
              className="why-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Neden Aslan Otomotiv?</h2>
              <p>
                Sektördeki uzun yıllık tecrübemiz ve müşteri memnuniyeti odaklı 
                hizmet anlayışımızla fark yaratıyoruz.
              </p>
              <div className="features">
                <div className="feature">
                  <i className="fas fa-award text-gold"></i>
                  <div>
                    <h4>30 Yıl Tecrübe</h4>
                    <p>Sektördeki uzun tecrübemizle en kaliteli hizmeti sunuyoruz.</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-users text-gold"></i>
                  <div>
                    <h4>Uzman Ekip</h4>
                    <p>Alanında uzman teknisyenlerimizle güvenilir hizmet.</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-shield-alt text-gold"></i>
                  <div>
                    <h4>Kalite Garantisi</h4>
                    <p>Kullandığımız tüm ürün ve hizmetlerde kalite garantisi.</p>
                  </div>
                </div>
                <div className="feature">
                  <i className="fas fa-clock text-gold"></i>
                  <div>
                    <h4>Hızlı Servis</h4>
                    <p>Zamanınıza değer veriyor, hızlı ve etkili çözümler sunuyoruz.</p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="why-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="image-placeholder">
                <i className="fas fa-car-side"></i>
                <span>Profesyonel Hizmet</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands section section-accent">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Çalıştığımız Markalar</h2>
            <p>Dünya çapında güvenilir markaların ürünlerini kullanarak hizmet veriyoruz.</p>
          </motion.div>
          <div className="brands-grid">
            {brands.map((brand, index) => (
              <motion.div 
                key={index}
                className="brand-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="brand-logo">
                  <span>{brand.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Müşteri Yorumları</h2>
            <p>Memnun müşterilerimizin deneyimlerini okuyun.</p>
          </motion.div>
          <div className="grid grid-3">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                className="testimonial-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-header">
                  <div className="stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="fas fa-star text-gold"></i>
                    ))}
                  </div>
                  <span className="service-tag">{testimonial.service}</span>
                </div>
                <div className="card-body">
                  <p>"{testimonial.comment}"</p>
                </div>
                <div className="card-footer">
                  <div className="customer-info">
                    <div className="customer-avatar">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="customer-details">
                      <h4>{testimonial.name}</h4>
                      <span>Müşteri</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta section section-dark">
        <div className="container">
          <motion.div 
            className="cta-content text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Aracınız Profesyonel Bakıma Hazır mı?</h2>
            <p>
              Uzman ekibimizle aracınızın bakım ihtiyaçlarını karşılayın. 
              Hemen iletişime geçin ve randevu alın.
            </p>
            <div className="cta-buttons">
              <a href="tel:+905327986542" className="btn btn-primary">
                <i className="fas fa-phone"></i>
                Hemen Ara: +90 532 798 65 42
              </a>
              <Link to="/iletisim" className="btn btn-outline">
                <i className="fas fa-envelope"></i>
                İletişim Formu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        /* Hero Section */
        .hero {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #2a2a2a 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(10, 10, 10, 0.7);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 4rem;
          align-items: center;
          margin-top: 80px;
        }

        .hero-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 2rem;
          color: var(--text-light);
        }

        .cursor {
          color: var(--primary-gold);
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.7;
          margin-bottom: 3rem;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        .hero-stats {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .stat {
          text-align: center;
          padding: 2rem;
          background: rgba(212, 175, 55, 0.1);
          border: 1px solid var(--primary-gold);
          backdrop-filter: blur(10px);
        }

        .stat-number {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-gold);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-light);
        }

        /* Services Section */
        .service-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .feature-list {
          list-style: none;
          margin-top: 1.5rem;
        }

        .feature-list li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.8rem;
          color: var(--text-muted);
        }

        /* Why Choose Us Section */
        .why-content h2 {
          margin-bottom: 1.5rem;
        }

        .features {
          display: flex;
          flex-direction: column;
          gap: 2rem;
          margin-top: 2rem;
        }

        .feature {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .feature i {
          font-size: 1.5rem;
          margin-top: 0.5rem;
        }

        .feature h4 {
          margin-bottom: 0.5rem;
          color: var(--text-light);
        }

        .feature p {
          margin: 0;
          font-size: 0.95rem;
        }

        .why-image {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-placeholder {
          width: 100%;
          height: 400px;
          background: var(--gradient-primary);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--primary-black);
          font-size: 4rem;
          text-align: center;
        }

        .image-placeholder span {
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1rem;
        }

        /* Brands Section */
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 2rem;
        }

        .brand-item {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100px;
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .brand-item:hover {
          background: var(--accent-gray);
          border-color: var(--primary-gold);
          transform: translateY(-5px);
        }

        .brand-logo {
          font-size: 1.2rem;
          font-weight: 600;
          color: var(--text-muted);
          text-align: center;
        }

        .brand-item:hover .brand-logo {
          color: var(--primary-gold);
        }

        /* Testimonials Section */
        .testimonial-card {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .stars {
          margin-bottom: 1rem;
        }

        .service-tag {
          background: var(--primary-gold);
          color: var(--primary-black);
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .customer-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .customer-avatar {
          width: 50px;
          height: 50px;
          background: var(--primary-gold);
          color: var(--primary-black);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .customer-details h4 {
          margin: 0 0 0.2rem 0;
          color: var(--text-light);
          font-size: 1rem;
        }

        .customer-details span {
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        /* CTA Section */
        .cta-content h2 {
          margin-bottom: 1.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-content p {
          max-width: 700px;
          margin: 0 auto 3rem;
          font-size: 1.1rem;
        }

        .cta-buttons {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .hero-stats {
            flex-direction: row;
            justify-content: center;
          }

          .stat {
            padding: 1.5rem 1rem;
          }

          .stat-number {
            font-size: 2rem;
          }

          .hero-buttons,
          .cta-buttons {
            justify-content: center;
          }

          .why-content {
            text-align: center;
          }

          .features {
            align-items: center;
          }

          .feature {
            flex-direction: column;
            text-align: center;
            max-width: 300px;
          }

          .brands-grid {
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .hero {
            min-height: 80vh;
          }

          .hero-stats {
            flex-direction: column;
          }

          .stat {
            padding: 1rem;
          }

          .btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
