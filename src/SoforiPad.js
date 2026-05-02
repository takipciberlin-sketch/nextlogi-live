import React, { useState, useEffect } from 'react';
import { db } from './FirebaseConfig';
import { ref, onValue } from "firebase/database";

export default function SoforiPad() {
  const [siparis, setSiparis] = useState(null);

  useEffect(() => {
    const siparisRef = ref(db, 'aktifSiparis/');
    onValue(siparisRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSiparis(data);
      }
    });
  }, []);

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ecc71' }}>Şoför Teslimat Paneli</h1>
      <div style={{ backgroundColor: '#111418', borderRadius: '30px', padding: '50px', border: '2px solid #30363d', marginTop: '20px', textAlign: 'center' }}>
        {siparis ? (
          <>
            <h2 style={{ fontSize: '50px', margin: '10px 0' }}>{siparis.isim}</h2>
            <p style={{ fontSize: '30px', color: '#2ecc71' }}>{siparis.urun}</p>
            <p style={{ color: '#8b949e', fontSize: '20px' }}>Durum: {siparis.durum} | Saat: {siparis.saat}</p>
            <button style={{ marginTop: '30px', padding: '20px 40px', backgroundColor: '#e74c3c', color: 'white', border: 'none', borderRadius: '15px', fontWeight: 'bold', fontSize: '20px' }}>
              TESLİM ETTİM
            </button>
          </>
        ) : (
          <p style={{ fontSize: '24px', color: '#8b949e' }}>Yeni bir sipariş bekleniyor...</p>
        )}
      </div>
    </div>
  );
}