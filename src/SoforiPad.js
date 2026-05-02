import React, { useState, useEffect } from 'react';
// Firebase'in gerekli tüm fonksiyonlarını buraya ekledik: 'set' dahil!
import { ref, onValue, set } from "firebase/database"; 
import { db } from './FirebaseConfig';

export default function SoforiPad() {
  const [siparis, setSiparis] = useState(null);

  useEffect(() => {
    // Veritabanındaki 'aktifSiparis' yolunu dinliyoruz
    const siparisRef = ref(db, 'aktifSiparis/');
    
    const unsubscribe = onValue(siparisRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Gelen Veri:", data); // Konsoldan kontrol etmek için
      setSiparis(data);
    });

    return () => unsubscribe(); // Sayfa kapanınca dinlemeyi durdur
  }, []);

  const teslimEtHandler = () => {
    if (window.confirm("Bu siparişi teslim ettiğinizi onaylıyor musunuz?")) {
      // Firebase'e gidip o yolu 'null' yapıyoruz (Veriyi siliyoruz)
      set(ref(db, 'aktifSiparis/'), null)
        .then(() => {
          alert("Sipariş başarıyla teslim edildi! ✅");
        })
        .catch((error) => {
          alert("Bir hata oluştu: " + error.message);
        });
    }
  };

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ecc71', textAlign: 'center' }}>Şoför Teslimat Paneli</h1>
      
      <div style={{ 
        backgroundColor: '#111418', 
        borderRadius: '30px', 
        padding: '50px', 
        border: '2px solid #30363d', 
        marginTop: '20px', 
        textAlign: 'center',
        maxWidth: '800px',
        margin: '20px auto'
      }}>
        {siparis ? (
          <>
            <h2 style={{ fontSize: '50px', margin: '10px 0' }}>{siparis.isim}</h2>
            <p style={{ fontSize: '30px', color: '#2ecc71' }}>{siparis.urun}</p>
            <p style={{ color: '#8b949e', fontSize: '20px' }}>Durum: {siparis.durum} | Saat: {siparis.saat}</p>
            
            <button 
              onClick={teslimEtHandler}
              style={{ 
                marginTop: '30px', 
                padding: '20px 60px', 
                backgroundColor: '#e74c3c', 
                color: 'white', 
                border: 'none', 
                borderRadius: '15px', 
                fontWeight: 'bold', 
                fontSize: '24px', 
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            >
              TESLİM ETTİM
            </button>
          </>
        ) : (
          <div style={{ padding: '40px' }}>
            <p style={{ fontSize: '24px', color: '#8b949e' }}>🚚 Yeni bir sipariş bekleniyor...</p>
          </div>
        )}
      </div>
    </div>
  );
}