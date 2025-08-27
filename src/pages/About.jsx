import { motion } from 'framer-motion'
import { useState } from 'react'

const About = () => {
  const [activeYear, setActiveYear] = useState(2024)

  const timeline = [
    {
      year: 2009,
      title: 'Kuruluş',
      description: 'Aslan Otomotiv, küçük bir atölye olarak motor yağı değişimi hizmeti ile faaliyetine başladı.',
      icon: 'fas fa-flag'
    },
    {
      year: 2012,
      title: 'Büyüme',
      description: 'Artan müşteri memnuniyeti ile hizmet yelpazemizi genişlettik ve filtre değişimi hizmetini ekledik.',
      icon: 'fas fa-chart-line'
    },
    {
      year: 2015,
      title: 'Modernizasyon',
      description: 'Modern ekipmanlar ve kaliteli marka ürünleriyle hizmet kalitemizi artırdık.',
      icon: 'fas fa-tools'
    },
    {
      year: 2018,
      title: 'Genişleme',
      description: 'Genel araç bakımı ve yedek parça satışı ile hizmet alanımızı genişlettik.',
      icon: 'fas fa-expand-arrows-alt'
    },
    {
      year: 2021,
      title: 'Dijitalleşme',
      description: 'Online randevu sistemi ve müşteri takip sistemlerini hayata geçirdik.',
      icon: 'fas fa-laptop'
    },
    {
      year: 2024,
      title: 'Bugün',
      description: '15 yıllık tecrübe ile sektörde güvenilir bir marka haline geldik.',
      icon: 'fas fa-crown'
    }
  ]

  const values = [
    {
      icon: 'fas fa-handshake',
      title: 'Güven',
      description: 'Müşterilerimizle kurduğumuz güven bağı, işimizin temel taşıdır. Şeffaf ve dürüst hizmet anlayışımızla güveninizi kazanıyoruz.'
    },
    {
      icon: 'fas fa-medal',
      title: 'Kalite',
      description: 'Her zaman en kaliteli ürünleri kullanır, işimizi en iyi şekilde yaparız. Kalite bizim için pazarlık konusu değildir.'
    },
    {
      icon: 'fas fa-clock',
      title: 'Zamanında Hizmet',
      description: 'Zamanınıza değer veririz. Randevu saatlerine uyar, hızlı ve etkili çözümler sunarız.'
    },
    {
      icon: 'fas fa-heart',
      title: 'Müşteri Memnuniyeti',
      description: 'Müşteri memnuniyeti bizim önceliğimizdir. Her müşteriyi ailemizin bir ferdi gibi görürüz.'
    },
    {
      icon: 'fas fa-leaf',
      title: 'Çevre Bilinci',
      description: 'Atık yağ ve parçaların geri dönüşümü konusunda sorumluluğumuzu biliriz. Çevreye duyarlı hizmet veriyoruz.'
    },
    {
      icon: 'fas fa-graduation-cap',
      title: 'Sürekli Gelişim',
      description: 'Sektördeki yenilikleri takip eder, ekibimizin sürekli gelişimi için eğitimlere katılırız.'
    }
  ]

  const team = [
    {
      name: 'Ahmet Aslan',
      position: 'Kurucu & İşletmeci',
      experience: '15+ Yıl',
      specialization: 'Motor Yağları & Genel Bakım',
      description: '15 yıllık tecrübesiyle sektörün deneyimli isimlerinden. Motor yağları konusunda uzman.'
    },
    {
      name: 'Mehmet Kaya',
      position: 'Baş Teknisyen',
      experience: '12+ Yıl',
      specialization: 'Filtre Sistemleri & Elektronik',
      description: 'Filtre sistemleri ve araç elektroniği konularında uzman teknisyen.'
    },
    {
      name: 'Ali Demir',
      position: 'Teknisyen',
      experience: '8+ Yıl',
      specialization: 'Genel Bakım & Yedek Parça',
      description: 'Genel araç bakımı ve yedek parça montajında deneyimli teknisyen.'
    }
  ]

  const stats = [
    { number: '15+', label: 'Yıl Tecrübe', icon: 'fas fa-calendar-alt' },
    { number: '5000+', label: 'Mutlu Müşteri', icon: 'fas fa-users' },
    { number: '50000+', label: 'Tamamlanan İşlem', icon: 'fas fa-tasks' },
    { number: '98%', label: 'Memnuniyet Oranı', icon: 'fas fa-thumbs-up' }
  ]

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div 
            className="hero-content text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1>Hakkımızda</h1>
            <p>
              15 yıldır aynı tutku ve kalite anlayışıyla, aracınızın bakım ihtiyaçlarını 
              karşılayan güvenilir partneriniz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section section">
        <div className="container">
          <div className="grid grid-2">
            <motion.div 
              className="story-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Hikayemiz</h2>
              <p>
                2009 yılında küçük bir atölye olarak başladığımız yolculukta, müşteri memnuniyeti 
                ve kaliteli hizmet anlayışımızla bugün sektörün güvenilir markalarından biri haline geldik.
              </p>
              <p>
                15 yıl boyunca binlerce müşterimizin aracına bakmaktan gurur duyuyoruz. Her geçen gün 
                kendimizi yeniliyor, sektördeki gelişmeleri takip ediyor ve ekibimizi geliştiriyoruz.
              </p>
              <p>
                Amacımız, sadece araç bakım hizmeti vermek değil; müşterilerimizle uzun vadeli güven 
                bağları kurmak ve onların güvenli sürüş deneyimlerine katkıda bulunmak.
              </p>
              <div className="story-highlights">
                <div className="highlight">
                  <i className="fas fa-star text-gold"></i>
                  <span>Sektörde 15 yıllık tecrübe</span>
                </div>
                <div className="highlight">
                  <i className="fas fa-award text-gold"></i>
                  <span>5000+ mutlu müşteri</span>
                </div>
                <div className="highlight">
                  <i className="fas fa-shield text-gold"></i>
                  <span>%100 güvenilir hizmet</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="story-image"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="image-placeholder">
                <i className="fas fa-history"></i>
                <span>15 Yıllık Deneyim</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section section section-dark">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Tarihçemiz</h2>
            <p>Kuruluşumuzdan bugüne kadarki yolculuğumuz.</p>
          </motion.div>
          
          <div className="timeline">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`timeline-item ${activeYear === item.year ? 'active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveYear(item.year)}
              >
                <div className="timeline-marker">
                  <i className={item.icon}></i>
                </div>
                <div className="timeline-content">
                  <div className="timeline-year">{item.year}</div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section section">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Değerlerimiz</h2>
            <p>İş yapış biçimimizi şekillendiren temel değerlerimiz.</p>
          </motion.div>
          
          <div className="grid grid-3">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="value-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="card-header text-center">
                  <i className={`${value.icon} icon`}></i>
                  <h3>{value.title}</h3>
                </div>
                <div className="card-body">
                  <p>{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section section section-accent">
        <div className="container">
          <motion.div 
            className="section-header text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2>Ekibimiz</h2>
            <p>Alanında uzman ve deneyimli teknisyen kadromuz.</p>
          </motion.div>
          
          <div className="grid grid-3">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="team-card card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="team-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <div className="team-info">
                  <h3>{member.name}</h3>
                  <div className="team-position">{member.position}</div>
                  <div className="team-experience">
                    <i className="fas fa-clock text-gold"></i>
                    <span>{member.experience}</span>
                  </div>
                  <div className="team-specialization">
                    <i className="fas fa-star text-gold"></i>
                    <span>{member.specialization}</span>
                  </div>
                  <p>{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <i className={`${stat.icon} stat-icon`}></i>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section section section-dark">
        <div className="container">
          <div className="grid grid-2">
            <motion.div 
              className="mission-content"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Misyonumuz</h2>
              <p>
                Aracınızın bakım ve servis ihtiyaçlarını en kaliteli ürünler ve uzman ekibimizle 
                karşılayarak, güvenli ve konforlu sürüş deneyiminize katkıda bulunmak.
              </p>
              <p>
                Müşteri memnuniyetini ön planda tutarak, şeffaf, güvenilir ve uygun fiyatlı 
                hizmet sunmak temel amacımızdır.
              </p>
            </motion.div>
            <motion.div 
              className="vision-content"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2>Vizyonumuz</h2>
              <p>
                Araç bakım sektöründe güvenilirlik, kalite ve müşteri memnuniyeti konularında 
                öncü bir marka olmak.
              </p>
              <p>
                Sürekli gelişim ve yenilik anlayışımızla, bölgemizin en tercih edilen 
                otomotiv servis merkezi haline gelmek.
              </p>
            </motion.div>
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
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.1rem;
        }

        /* Story Section */
        .story-content h2 {
          margin-bottom: 2rem;
        }

        .story-content p {
          margin-bottom: 1.5rem;
        }

        .story-highlights {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-top: 2rem;
        }

        .highlight {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .highlight i {
          font-size: 1.2rem;
        }

        .highlight span {
          font-weight: 600;
          color: var(--text-light);
        }

        .story-image {
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

        /* Timeline Section */
        .timeline {
          position: relative;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--border-color);
          transform: translateX(-50%);
        }

        .timeline-item {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 3rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .timeline-item:nth-child(odd) {
          flex-direction: row;
        }

        .timeline-item:nth-child(even) {
          flex-direction: row-reverse;
        }

        .timeline-item:hover {
          transform: scale(1.02);
        }

        .timeline-marker {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 60px;
          background: var(--secondary-black);
          border: 3px solid var(--primary-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--primary-gold);
          font-size: 1.2rem;
          z-index: 2;
        }

        .timeline-item.active .timeline-marker {
          background: var(--primary-gold);
          color: var(--primary-black);
        }

        .timeline-content {
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          padding: 2rem;
          border-radius: 0;
          width: calc(50% - 50px);
          transition: all 0.3s ease;
        }

        .timeline-item:nth-child(odd) .timeline-content {
          margin-right: 50px;
        }

        .timeline-item:nth-child(even) .timeline-content {
          margin-left: 50px;
        }

        .timeline-item.active .timeline-content {
          border-color: var(--primary-gold);
          background: rgba(212, 175, 55, 0.1);
        }

        .timeline-year {
          color: var(--primary-gold);
          font-size: 1.2rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
        }

        .timeline-content h3 {
          margin-bottom: 1rem;
          color: var(--text-light);
        }

        .timeline-content p {
          margin: 0;
          color: var(--text-muted);
        }

        /* Values Section */
        .value-card {
          text-align: center;
          height: 100%;
        }

        /* Team Section */
        .team-card {
          text-align: center;
          padding: 2rem;
        }

        .team-avatar {
          width: 80px;
          height: 80px;
          background: var(--primary-gold);
          color: var(--primary-black);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          margin: 0 auto 1.5rem;
        }

        .team-info h3 {
          margin-bottom: 0.5rem;
          color: var(--text-light);
        }

        .team-position {
          color: var(--primary-gold);
          font-weight: 600;
          margin-bottom: 1rem;
          text-transform: uppercase;
          font-size: 0.9rem;
          letter-spacing: 0.1em;
        }

        .team-experience,
        .team-specialization {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
        }

        .team-info p {
          font-size: 0.95rem;
          line-height: 1.6;
        }

        /* Stats Section */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--secondary-black);
          border: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          border-color: var(--primary-gold);
          transform: translateY(-5px);
          box-shadow: var(--shadow-dark);
        }

        .stat-icon {
          font-size: 2.5rem;
          color: var(--primary-gold);
          margin-bottom: 1rem;
          display: block;
        }

        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          color: var(--text-light);
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .stat-label {
          font-size: 1rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        /* Mission Section */
        .mission-content,
        .vision-content {
          padding: 2rem;
        }

        .mission-content h2,
        .vision-content h2 {
          margin-bottom: 1.5rem;
          color: var(--primary-gold);
        }

        .mission-content p,
        .vision-content p {
          margin-bottom: 1.5rem;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .story-highlights {
            align-items: center;
            text-align: center;
          }

          .timeline::before {
            left: 30px;
          }

          .timeline-item {
            flex-direction: row !important;
          }

          .timeline-marker {
            left: 30px;
          }

          .timeline-content {
            width: calc(100% - 80px);
            margin-left: 80px !important;
            margin-right: 0 !important;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-card {
            padding: 2rem 1rem;
          }

          .stat-number {
            font-size: 2.5rem;
          }

          .timeline-content {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  )
}

export default About
