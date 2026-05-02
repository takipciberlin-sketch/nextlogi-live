import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MusteriApp from './MusteriApp';
import SoforiPad from './SoforiPad';

export default function App() {
  return (
    <Router>
      <div>
        {/* Navigasyon Menüsü - Her yerden erişmek için üstte sabit durur */}
        <nav style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, 
          backgroundColor: '#1c2128', padding: '10px', 
          display: 'flex', justifyContent: 'center', gap: '20px',
          zIndex: 1000, borderBottom: '1px solid #30363d' 
        }}>
          <Link to="/" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: 'bold' }}>Müşteri Girişi</Link>
          <Link to="/sofor" style={{ color: '#2ecc71', textDecoration: 'none', fontWeight: 'bold' }}>Şoför Paneli (iPad)</Link>
        </nav>

        {/* Sayfa İçerikleri */}
        <div style={{ paddingTop: '60px' }}> 
          <Routes>
            <Route path="/" element={<MusteriApp />} />
            <Route path="/sofor" element={<SoforiPad />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}