import React, { useState } from 'react';
import MusteriApp from './MusteriApp';
import SoforiPad from './SoforiPad';

export default function App() {
  const [ekran, setEkran] = useState('musteri'); // 'musteri' veya 'sofor'

  return (
    <div>
      {/* Ekranlar arası geçiş için üstte küçük bir menü */}
      <div style={{ position: 'fixed', top: 0, right: 0, zIndex: 100, padding: '10px' }}>
        <button onClick={() => setEkran('musteri')} style={{ marginRight: '10px' }}>Müşteri</button>
        <button onClick={() => setEkran('sofor')}>Şoför</button>
      </div>

      {ekran === 'musteri' ? <MusteriApp /> : <SoforiPad />}
    </div>
  );
}