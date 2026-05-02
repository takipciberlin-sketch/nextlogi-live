import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MusteriApp from './MusteriApp';
import SoforiPad from './SoforiPad';

export default function App() {
  return (
    <Router>
      <div style={{ backgroundColor: '#090d11', minHeight: '100vh' }}>
        {/* Görünürlüğü artırılmış Navigasyon */}
        <nav style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, 
          backgroundColor: '#1c2128', padding: '15px', 
          display: 'flex', justifyContent: 'center', gap: '30px',
          zIndex: 1000, borderBottom: '2px solid #2ecc71' 
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>🏠 MÜŞTERİ GİRİŞİ</Link>
          <Link to="/sofor" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold', fontSize: '16px' }}>🚛 ŞOFÖR PANELİ</Link>
        </nav>

        <div style={{ paddingTop: '80px' }}> 
          <Routes>
            <Route path="/" element={<MusteriApp />} />
            <Route path="/sofor" element={<SoforiPad />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}