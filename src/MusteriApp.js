import React, { useState } from 'react';
import { db } from './FirebaseConfig';
import { ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';

export default function MusteriApp() {
  const navigate = useNavigate();
  const [secilenKategori, setSecilenKategori] = useState(null);

  // Kategori ve Ürün Yapısı
  const kategoriler = [
    { 
      id: 'dana', 
      ad: 'DANA ETİ', 
      resim: 'https://cdn-icons-png.flaticon.com/512/2619/2619299.png', // Dana ikonu
      urunler: [
        { ad: "5kg Dana Antrikot", fiyat: "2500 TL" },
        { ad: "2kg Dana Kıyma", fiyat: "1100 TL" }
      ]
    },
    { 
      id: 'kuzu', 
      ad: 'KUZU ETİ', 
      resim: 'https://cdn-icons-png.flaticon.com/512/3750/3750519.png', // Kuzu ikonu
      urunler: [
        { ad: "3kg Kuzu Pirzola", fiyat: "1800 TL" },
        { ad: "Kuzu Gerdan (1.5kg)", fiyat: "950 TL" }
      ]
    },
    { 
      id: 'tavuk', 
      ad: 'TAVUK', 
      resim: 'https://cdn-icons-png.flaticon.com/512/3143/3143640.png', // Tavuk ikonu
      urunler: [
        { ad: "10kg Tavuk Kanat", fiyat: "1200 TL" },
        { ad: "5kg Tavuk Göğsü", fiyat: "850 TL" }
      ]
    }
  ];

  const siparisGonder = (urun) => {
    set(ref(db, 'aktifSiparis/'), {
      isim: "Özcan Et & Kasap",
      urun: urun.ad,
      fiyat: urun.fiyat,
      durum: "Hazırlanıyor",
      saat: new Date().toLocaleTimeString()
    }).then(() => {
      alert(`🚀 ${urun.ad} şoföre iletildi!`);
      navigate('/sofor');
    });
  };

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ecc71', textAlign: 'center', marginBottom: '30px' }}>NEXTLOGI TERMİNAL</h1>

      {/* KATEGORİ BUTONLARI */}
      {!secilenKategori ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', maxWidth: '600px', margin: '0 auto' }}>
          {kategoriler.map((kat) => (
            <button
              key={kat.id}
              onClick={() => setSecilenKategori(kat)}
              style={{
                backgroundColor: '#111418', border: '2px solid #30363d', borderRadius: '20px',
                padding: '30px', cursor: 'pointer', transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = '#2ecc71'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = '#30363d'}
            >
              <img src={kat.resim} alt={kat.ad} style={{ width: '80px', marginBottom: '15px' }} />
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>{kat.ad}</div>
            </button>
          ))}
        </div>
      ) : (
        /* ÜRÜN SEÇİM EKRANI */
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <button 
            onClick={() => setSecilenKategori(null)} 
            style={{ backgroundColor: 'transparent', color: '#8b949e', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
          >
            ← Kategorilere Dön
          </button>
          <h2 style={{ color: '#2ecc71' }}>{secilenKategori.ad} Ürünleri</h2>
          <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
            {secilenKategori.urunler.map((urun, index) => (
              <div 
                key={index}
                onClick={() => siparisGonder(urun)}
                style={{ 
                  backgroundColor: '#111418', padding: '25px', borderRadius: '15px', 
                  border: '1px solid #30363d', cursor: 'pointer', display: 'flex', 
                  justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{urun.ad}</span>
                <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{urun.fiyat}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}