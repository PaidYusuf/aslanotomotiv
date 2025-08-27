import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Ana Sayfa', icon: 'fas fa-home' },
    { path: '/hizmetler', label: 'Hizmetler', icon: 'fas fa-tools' },
    { path: '/hakkimizda', label: 'Hakkımızda', icon: 'fas fa-info-circle' },
    { path: '/iletisim', label: 'İletişim', icon: 'fas fa-phone' }
  ]

  return (
    <motion.header 
      className={`header ${isScrolled ? 'header-scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <i className="fas fa-car"></i>
            </div>
            <div className="logo-text">
              <span className="logo-main">ASLAN</span>
              <span className="logo-sub">OTOMOTİV</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'nav-link-active' : ''}`}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Contact CTA */}
          <div className="header-cta">
            <a href="tel:+905551234567" className="btn btn-primary">
              <i className="fas fa-phone"></i>
              Hemen Ara
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className={`nav-mobile ${isMobileMenuOpen ? 'nav-mobile-open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link-mobile ${location.pathname === item.path ? 'nav-link-active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </Link>
          ))}
          <div className="mobile-contact">
            <a href="tel:+905551234567" className="btn btn-primary btn-block">
              <i className="fas fa-phone"></i>
              Hemen Ara
            </a>
          </div>
        </nav>
      </div>

      <style jsx>{`
        .header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border-color);
          transition: all 0.3s ease;
        }

        .header-scrolled {
          background: rgba(10, 10, 10, 0.98);
          box-shadow: var(--shadow-dark);
        }

        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .logo:hover {
          transform: translateY(-2px);
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

        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: var(--text-muted);
          transition: all 0.3s ease;
          position: relative;
        }

        .nav-link i {
          font-size: 1.2rem;
          margin-bottom: 0.3rem;
        }

        .nav-link span {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }

        .nav-link:hover,
        .nav-link-active {
          color: var(--primary-gold);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 2px;
          background: var(--primary-gold);
          transition: width 0.3s ease;
        }

        .nav-link:hover::after,
        .nav-link-active::after {
          width: 100%;
        }

        .header-cta {
          display: flex;
          align-items: center;
        }

        .mobile-menu-btn {
          display: none;
          flex-direction: column;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.5rem;
          gap: 4px;
        }

        .mobile-menu-btn span {
          width: 25px;
          height: 2px;
          background: var(--primary-gold);
          transition: all 0.3s ease;
        }

        .nav-mobile {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(10px);
          border-top: 1px solid var(--border-color);
          padding: 2rem 0;
        }

        .nav-mobile-open {
          display: block;
        }

        .nav-link-mobile {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 2rem;
          text-decoration: none;
          color: var(--text-muted);
          transition: all 0.3s ease;
          border-left: 3px solid transparent;
        }

        .nav-link-mobile:hover,
        .nav-link-mobile.nav-link-active {
          color: var(--primary-gold);
          background: rgba(212, 175, 55, 0.1);
          border-left-color: var(--primary-gold);
        }

        .nav-link-mobile i {
          font-size: 1.2rem;
          width: 20px;
        }

        .mobile-contact {
          padding: 1rem 2rem;
        }

        .btn-block {
          width: 100%;
          text-align: center;
        }

        @media (max-width: 768px) {
          .nav-desktop,
          .header-cta {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }

          .logo-text {
            display: none;
          }

          .logo-icon {
            margin-right: 0;
          }
        }

        @media (max-width: 480px) {
          .header-content {
            padding: 0.8rem 0;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
          }
        }
      `}</style>
    </motion.header>
  )
}

export default Header
