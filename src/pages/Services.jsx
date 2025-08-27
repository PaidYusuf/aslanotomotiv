import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const services = [
    {
      id: 1,
      category: 'motor-yaği',
      title: 'Motor Yağı Değişimi',
      subtitle: 'Premium Motor Yağları',
      description: 'Aracınızın motor performansını artırmak ve uzun ömür sağlamak için kaliteli motor yağları kullanıyoruz.',
      icon: 'fas fa-oil-can',
      image: 'motor-yagi.jpg',
      features: [
        'Castrol, Mobil 1, Shell gibi premium markalar',
        'Aracın özelliklerine uygun yağ seçimi',
        '15-20 dakikada hızlı değişim',
        'Eski yağın çevre dostu bertarafı',
        'Yağ seviyesi ve kalite kontrolü'
      ],
      price: '₺150 - ₺400',
      duration: '15-20 dakika',
      warranty: '6 ay / 10.000 km'
    },
    {
      id: 2,
      category: 'filtre',
      title: 'Yağ Filtresi Değişimi',
      subtitle: 'Orijinal Filtreler',
      description: 'Motor yağının temiz kalması için yüksek kaliteli yağ filtrelerinin profesyonel montajı.',
      icon: 'fas fa-filter',
      image: 'yag-filtresi.jpg',
      features: [
        'Bosch, Mann Filter, Fram markaları',
        'Aracın marka ve modeline uygun filtre',
        'Hassas montaj ve sızdırmazlık kontrolü',
        'Filtreleme kapasitesi testleri',
        'Eski filtrenin güvenli bertarafı'
      ],
      price: '₺50 - ₺150',
      duration: '10-15 dakika',
      warranty: '6 ay / 10.000 km'
    },
    {
      id: 3,
      category: 'filtre',
      title: 'Hava Filtresi Değişimi',
      subtitle: 'Temiz Hava, Güçlü Motor',
      description: 'Motorun temiz hava almasını sağlayarak yakıt verimliliğini artıran hava filtresi değişimi.',
      icon: 'fas fa-wind',
      image: 'hava-filtresi.jpg',
      features: [
        'Yüksek filtreleme kapasiteli filtreler',
        'Motor performansını artırır',
        'Yakıt tasarrufu sağlar',
        'Kolay ve hızlı değişim',
        'Çevre dostu filtre seçenekleri'
      ],
      price: '₺40 - ₺120',
      duration: '5-10 dakika',
      warranty: '1 yıl / 15.000 km'
    },
    {
      id: 4,
      category: 'aksesuar',
      title: 'Cam Silecek Değişimi',
      subtitle: 'Net Görüş, Güvenli Sürüş',
      description: 'Her hava koşulunda net görüş için yüksek kaliteli cam silecek takımları.',
      icon: 'fas fa-eye',
      image: 'cam-silecek.jpg',
      features: [
        'Bosch, Valeo, Champion markaları',
        'Aerodinamik tasarım',
        'Sessiz çalışma',
        'UV dayanımlı malzeme',
        'Kolay montaj'
      ],
      price: '₺80 - ₺200',
      duration: '5 dakika',
      warranty: '6 ay'
    },
    {
      id: 5,
      category: 'bakim',
      title: 'Genel Araç Bakımı',
      subtitle: 'Kapsamlı Kontrol',
      description: 'Aracınızın tüm sistemlerinin kontrol edildiği kapsamlı bakım hizmeti.',
      icon: 'fas fa-tools',
      image: 'genel-bakim.jpg',
      features: [
        'Motor kontrol sistemi taraması',
        'Fren sistemi kontrolü',
        'Süspansiyon kontrolü',
        'Lastik kontrol ve rotasyonu',
        'Akü ve elektrik sistemi kontrolü',
        'Sıvı seviyeleri kontrolü'
      ],
      price: '₺200 - ₺500',
      duration: '45-60 dakika',
      warranty: '3 ay'
    },
    {
      id: 6,
      category: 'satiş',
      title: 'Yedek Parça Satışı',
      subtitle: 'Kaliteli Yedek Parçalar',
      description: 'Güvenilir markalardan yedek parça satışı ve profesyonel montaj hizmeti.',
      icon: 'fas fa-shopping-cart',
      image: 'yedek-parca.jpg',
      features: [
        'Orijinal ve yan sanayi parçaları',
        'Uygun fiyat garantisi',
        'Hızlı tedarik',
        'Montaj hizmeti',
        'Garanti sertifikası'
      ],
      price: 'Ürüne göre değişir',
      duration: 'Montaja göre değişir',
      warranty: 'Ürün garantisine göre'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tümü', icon: 'fas fa-th-large' },
    { id: 'motor-yaği', name: 'Motor Yağı', icon: 'fas fa-oil-can' },
    { id: 'filtre', name: 'Filtreler', icon: 'fas fa-filter' },
    { id: 'aksesuar', name: 'Aksesuarlar', icon: 'fas fa-cog' },
    { id: 'bakim', name: 'Bakım', icon: 'fas fa-tools' },
    { id: 'satiş', name: 'Satış', icon: 'fas fa-shopping-cart' }
  ]

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory)

  const brands = [
    'Castrol', 'Mobil 1', 'Total', 'Shell', 'Liqui Moly', 
    'Bosch', 'Mann Filter', 'Valeo', 'Champion', 'Fram'
  ]

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div 
            className="hero-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Hizmetlerimiz</h1>
            <p>
              Aracınızın ihtiyaç duyduğu tüm bakım ve servis hizmetlerini 
              profesyonel ekibimizle gerçekleştiriyoruz.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">6</span>
                <span className="stat-label">Ana Hizmet</span>
              </div>
              <div className="stat">
                <span className="stat-number">30+</span>
                <span className="stat-label">Yıl Tecrübe</span>
              </div>
              <div className="stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">Memnuniyet</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        <div className="container">
          <div className="filter-tabs">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                className={`filter-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <i className={category.icon}></i>
                <span>{category.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid section">
        <div className="container">
          <div className="grid grid-2">
            <AnimatePresence mode="wait">
              {filteredServices.map((service, index) => (
                <motion.div
                  key={`${activeCategory}-${service.id}`}
                  className="service-card-detailed card"
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.05,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  layout
                >
                <div className="service-image">
                  <div className="image-placeholder">
                    <i className={service.icon}></i>
                  </div>
                  <div className="service-badge">{service.category.replace('-', ' ').toUpperCase()}</div>
                </div>
                
                <div className="service-content">
                  <div className="service-header">
                    <h3>{service.title}</h3>
                    <p className="service-subtitle">{service.subtitle}</p>
                  </div>
                  
                  <div className="service-info">
                    <div className="info-item">
                      <i className="fas fa-lira-sign text-gold"></i>
                      <span>{service.price}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-clock text-gold"></i>
                      <span>{service.duration}</span>
                    </div>
                    <div className="info-item">
                      <i className="fas fa-shield-alt text-gold"></i>
                      <span>{service.warranty}</span>
                    </div>
                  </div>
                  
                  <p className="service-description">{service.description}</p>
                  
                  <div className="service-features">
                    <h4>Özellikler:</h4>
                    <ul>
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx}>
                          <i className="fas fa-check text-gold"></i>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="service-actions">
                    <a href="tel:+905327986542" className="btn btn-primary">
                      <i className="fas fa-phone"></i>
                      Randevu Al
                    </a>
                    <Link to="/iletisim" className="btn btn-outline">
                      <i className="fas fa-info-circle"></i>
                      Detaylar
                    </Link>
                  </div>
                </div>
              </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section section section-accent">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Çalıştığımız Markalar</h2>
            <p>Hizmetlerimizde sadece güvenilir ve kaliteli markaları tercih ediyoruz.</p>
          </motion.div>
          
          <div className="brands-list">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                className="brand-tag"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Hizmet Sürecimiz</h2>
            <p>Profesyonel hizmet sürecimizle aracınıza en iyi bakımı sağlıyoruz.</p>
          </motion.div>
          
          <div className="process-steps">
            <motion.div 
              className="step"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Randevu & Karşılama</h3>
                <p>Telefonla randevu alın ve belirlenen saatte gelin. Müşteri temsilcimiz sizi karşılar.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="step"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Araç Kontrolü & Analiz</h3>
                <p>Uzman teknisyenimiz aracınızı kontrol eder ve ihtiyaçları belirler.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="step"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Hizmet Uygulaması</h3>
                <p>Seçilen hizmetler kaliteli malzemeler kullanılarak profesyonelce uygulanır.</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="step"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Kalite Kontrolü & Teslim</h3>
                <p>İşlem sonrası kalite kontrolü yapılır ve aracınız teslim edilir.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta section section-dark">
        <div className="container">
          <motion.div 
            className="cta-content text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2>Hizmet Almak İçin Hemen İletişime Geçin</h2>
            <p>
              Profesyonel ekibimizle aracınızın bakım ihtiyaçlarını karşılayın. 
              Uygun fiyatlarla kaliteli hizmet garantisi.
            </p>
            <div className="cta-buttons">
              <a href="tel:+905327986542" className="btn btn-primary">
                <i className="fas fa-phone"></i>
                Hemen Ara: +90 532 798 65 42
              </a>
              <Link to="/iletisim" className="btn btn-outline">
                <i className="fas fa-envelope"></i>
                Online Randevu
              </Link>
            </div>
          </motion.div>
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
          margin: 0 auto 3rem;
          font-size: 1.1rem;
        }

        .hero-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
          margin-top: 3rem;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          display: block;
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary-gold);
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Category Filter */
        .category-filter {
          background: var(--secondary-black);
          padding: 2rem 0;
          border-bottom: 1px solid var(--border-color);
          position: sticky;
          top: 70px;
          z-index: 100;
        }

        .filter-tabs {
          display: flex;
          justify-content: center;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .filter-tab {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          background: transparent;
          color: var(--text-muted);
          border: 1px solid var(--border-color);
          text-decoration: none;
          transition: all 0.3s ease;
          cursor: pointer;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .filter-tab:hover,
        .filter-tab.active {
          background: var(--primary-gold);
          color: var(--primary-black);
          border-color: var(--primary-gold);
          transform: translateY(-2px);
        }

        /* Services Grid */
        .service-card-detailed {
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .service-image {
          position: relative;
          height: 200px;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .image-placeholder {
          color: var(--primary-black);
          font-size: 4rem;
        }

        .service-badge {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(0, 0, 0, 0.8);
          color: var(--primary-gold);
          padding: 0.3rem 0.8rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.1em;
        }

        .service-content {
          padding: 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .service-header {
          margin-bottom: 1.5rem;
        }

        .service-header h3 {
          margin-bottom: 0.5rem;
          font-size: 1.3rem;
        }

        .service-subtitle {
          color: var(--primary-gold);
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin: 0;
        }

        .service-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: var(--accent-gray);
          border: 1px solid var(--border-color);
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
        }

        .info-item i {
          font-size: 1rem;
        }

        .service-description {
          margin-bottom: 1.5rem;
        }

        .service-features {
          margin-bottom: 2rem;
        }

        .service-features h4 {
          color: var(--primary-gold);
          font-size: 1rem;
          margin-bottom: 1rem;
        }

        .service-features ul {
          list-style: none;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 0.5rem;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .service-actions {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .service-actions .btn {
          flex: 1;
          text-align: center;
        }

        /* Brands Section */
        .brands-list {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .brand-tag {
          background: var(--secondary-black);
          color: var(--text-light);
          padding: 0.8rem 1.5rem;
          border: 1px solid var(--border-color);
          font-weight: 600;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          transition: all 0.3s ease;
        }

        .brand-tag:hover {
          background: var(--primary-gold);
          color: var(--primary-black);
          border-color: var(--primary-gold);
          transform: translateY(-2px);
        }

        /* Process Section */
        .process-steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 3rem;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 1.5rem;
          padding: 2rem;
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .step:hover {
          border-color: var(--primary-gold);
          transform: translateY(-5px);
          box-shadow: var(--shadow-dark);
        }

        .step-number {
          width: 60px;
          height: 60px;
          background: var(--gradient-primary);
          color: var(--primary-black);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 800;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .step-content h3 {
          margin-bottom: 0.8rem;
          color: var(--text-light);
          font-size: 1.1rem;
        }

        .step-content p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* CTA Section */
        .services-cta {
          text-align: center;
        }

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
          .hero-stats {
            flex-direction: column;
            gap: 2rem;
          }

          .filter-tabs {
            gap: 0.5rem;
          }

          .filter-tab {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }

          .service-actions {
            flex-direction: column;
          }

          .process-steps {
            grid-template-columns: 1fr;
          }

          .step {
            flex-direction: column;
            text-align: center;
            gap: 1rem;
          }

          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }

          .cta-buttons .btn {
            width: 100%;
            max-width: 300px;
          }
        }

        @media (max-width: 480px) {
          .service-info {
            grid-template-columns: 1fr;
          }

          .brands-list {
            gap: 0.5rem;
          }

          .brand-tag {
            padding: 0.6rem 1rem;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Services
