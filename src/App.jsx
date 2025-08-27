import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Admin Routes - No Header/Footer */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Public Routes - With Header/Footer */}
          <Route path="/" element={
            <>
              <Header />
              <main>
                <Home />
              </main>
              <Footer />
            </>
          } />
          <Route path="/hizmetler" element={
            <>
              <Header />
              <main>
                <Services />
              </main>
              <Footer />
            </>
          } />
          <Route path="/hakkimizda" element={
            <>
              <Header />
              <main>
                <About />
              </main>
              <Footer />
            </>
          } />
          <Route path="/iletisim" element={
            <>
              <Header />
              <main>
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
