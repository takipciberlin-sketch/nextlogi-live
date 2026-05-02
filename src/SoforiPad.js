import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { ref, onValue } from "firebase/database";

export default function SoforiPad() {
  const [siparis, setSiparis] = useState(null);

  useEffect(() => {
    // Veritabanındaki 'aktifSiparis' yolunu dinlemeye al
    const siparisRef = ref(db, 'aktifSiparis/');
    onValue(siparisRef, (snapshot) => {
      const data = snapshot.val();
      setSiparis(data); // Veri değiştiği an burası çalışır
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ecc71' }}>Şoför Teslimat Paneli</h1>
      
      <div style={{ backgroundColor: '#111418', borderRadius: '30px', padding: '50px', border: '2px solid #30363d', marginTop: '20px' }}>
        {siparis ? (
          <>
            <h2 style={{ fontSize: '40px' }}>{siparis.isim}</h2>
            <p style={{ fontSize: '25px', color: '#2ecc71' }}>{siparis.urun}</p>
            <p style={{ color: '#8b949e' }}>Durum: {siparis.durum} | Saat: {siparis.saat}</p>
          </>
        ) : (
          <p>Şu an yeni bir sipariş bekleniyor...</p>
        )}
      </div>
    </div>
  );
}