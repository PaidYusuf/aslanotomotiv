import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const services = [
    'Motor Yağı Değişimi',
    'Yağ Filtresi Değişimi',
    'Hava Filtresi Değişimi',
    'Cam Silecek Değişimi',
    'Araç Bakım Hizmetleri',
    'Yedek Parça Satışı'
  ]

  const brands = [
    'Castrol',
    'Mobil 1',
    'Total',
    'Shell',
    'Liqui Moly',
    'Bosch'
  ]

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon">
                  <i className="fas fa-car"></i>
                </div>
                <div className="logo-text">
                  <span className="logo-main">ASLAN</span>
                  <span className="logo-sub">OTOMOTİV</span>
                </div>
              </div>
              <p className="footer-description">
                Profesyonel araç bakım ve servis hizmetleri ile 15 yıldır müşterilerimizin 
                güvenini kazanmış, kaliteli hizmet anlayışımızla sektörde öncü konumdayız.
              </p>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link" aria-label="YouTube">
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
            </div>

            {/* Services */}
            <div className="footer-section">
              <h3 className="footer-title">Hizmetlerimiz</h3>
              <ul className="footer-list">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link to="/hizmetler" className="footer-link">
                      <i className="fas fa-chevron-right"></i>
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div className="footer-section">
              <h3 className="footer-title">Çalıştığımız Markalar</h3>
              <ul className="footer-list">
                {brands.map((brand, index) => (
                  <li key={index}>
                    <span className="footer-link">
                      <i className="fas fa-star"></i>
                      {brand}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-section">
              <h3 className="footer-title">İletişim Bilgileri</h3>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <strong>Adres:</strong>
                    <p>Örnek Mahalle, Araç Bakım Sokak No:15<br />Fatih/İstanbul</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <strong>Telefon:</strong>
                    <a href="tel:+905551234567">+90 555 123 45 67</a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <strong>E-posta:</strong>
                    <a href="mailto:info@aslanotomotiv.com">info@aslanotomotiv.com</a>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-clock"></i>
                  <div>
                    <strong>Çalışma Saatleri:</strong>
                    <p>Pazartesi - Cumartesi: 08:00 - 18:00<br />Pazar: Kapalı</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} Aslan Otomotiv. Tüm hakları saklıdır.</p>
            </div>
            <div className="footer-links">
              <Link to="/gizlilik-politikasi" className="footer-bottom-link">
                Gizlilik Politikası
              </Link>
              <Link to="/kullanim-kosullari" className="footer-bottom-link">
                Kullanım Koşulları
              </Link>
              <Link to="/iletisim" className="footer-bottom-link">
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: var(--gradient-dark);
          color: var(--text-light);
          margin-top: auto;
        }

        .footer-main {
          padding: 4rem 0 2rem;
          border-top: 1px solid var(--border-color);
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .logo-icon {
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-size: 1.5rem;
          color: var(--primary-black);
        }

        .logo-text {
          display: flex;
          flex-direction: column;
        }

        .logo-main {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-light);
          line-height: 1;
          letter-spacing: 0.1em;
        }

        .logo-sub {
          font-size: 0.8rem;
          color: var(--primary-gold);
          letter-spacing: 0.2em;
          margin-top: -2px;
        }

        .footer-description {
          margin-bottom: 2rem;
          line-height: 1.6;
        }

        .social-links {
          display: flex;
          gap: 1rem;
        }

        .social-link {
          width: 40px;
          height: 40px;
          background: var(--secondary-black);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background: var(--primary-gold);
          color: var(--primary-black);
          transform: translateY(-2px);
        }

        .footer-title {
          color: var(--primary-gold);
          font-size: 1.2rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .footer-list {
          list-style: none;
        }

        .footer-list li {
          margin-bottom: 0.8rem;
        }

        .footer-link {
          color: var(--text-muted);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
        }

        .footer-link:hover {
          color: var(--primary-gold);
          padding-left: 0.5rem;
        }

        .footer-link i {
          font-size: 0.8rem;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .contact-item i {
          font-size: 1.2rem;
          color: var(--primary-gold);
          margin-top: 0.2rem;
          min-width: 20px;
        }

        .contact-item strong {
          color: var(--text-light);
          display: block;
          margin-bottom: 0.3rem;
        }

        .contact-item a {
          color: var(--primary-gold);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-item a:hover {
          color: var(--primary-gold-dark);
        }

        .contact-item p {
          margin-bottom: 0;
          color: var(--text-muted);
        }

        .footer-bottom {
          background: var(--primary-black);
          padding: 1.5rem 0;
          border-top: 1px solid var(--border-color);
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .copyright p {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .footer-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-bottom-link {
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .footer-bottom-link:hover {
          color: var(--primary-gold);
        }

        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .footer-main {
            padding: 3rem 0 1.5rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }

          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .social-links {
            justify-content: center;
          }

          .contact-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          .contact-item i {
            margin-top: 0;
          }
        }
      `}</style>
    </footer>
  )
}

export default Footer
