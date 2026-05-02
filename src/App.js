import React, { useState } from 'react';
import MusteriApp from './MusteriApp';
import SoforiPad from './SoforiPad';

export default function App() {
  // Başlangıçta müşteri ekranı görünsün
  const [mod, setMod] = useState('musteri'); 

  return (
    <div style={{ position: 'relative' }}>
      {/* TEST PANELİ: Ekranlar arası geçiş yapmak için sağ üste butonlar koyduk */}
      <div style={{
        position: 'fixed', 
        top: '10px', 
        right: '10px', 
        zIndex: 9999, 
        background: 'rgba(255,255,255,0.1)', 
        padding: '10px', 
        borderRadius: '8px',
        display: 'flex',
        gap: '10px'
      }}>
        <button 
          onClick={() => setMod('musteri')}
          style={{ padding: '8px', cursor: 'pointer', backgroundColor: mod === 'musteri' ? '#2ecc71' : '#fff' }}
        >
          📱 Müşteri Ekranı
        </button>
        <button 
          onClick={() => setMod('sofor')}
          style={{ padding: '8px', cursor: 'pointer', backgroundColor: mod === 'sofor' ? '#2ecc71' : '#fff' }}
        >
          🚛 Şoför Ekranı
        </button>
      </div>

      {/* Hangi mod seçiliyse o dosyayı ekrana yansıt */}
      {mod === 'musteri' ? <MusteriApp /> : <SoforiPad />}
    </div>
  );
}