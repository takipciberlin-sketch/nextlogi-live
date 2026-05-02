import React, { useState } from 'react';
import { db } from './FirebaseConfig';
import { ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom';

export default function MusteriApp() {
  const navigate = useNavigate();
  const [secilenUrun, setSecilenUrun] = useState(null);

  // Müşterinin seçebileceği ürün listesi
  const urunler = [
    { id: 1, ad: "5kg Dana Antrikot", fiyat: "2500 TL", ikon: "🥩" },
    { id: 2, ad: "3kg Kuzu Pirzola", fiyat: "1800 TL", ikon: "🍖" },
    { id: 3, ad: "10kg Tavuk Kanat", fiyat: "1200 TL", ikon: "🍗" },
    { id: 4, ad: "Özel Kasap Köfte (2kg)", fiyat: "900 TL", ikon: "🍔" }
  ];

  const siparisVer = (urun) => {
    set(ref(db, 'aktifSiparis/'), {
      musteriNo: "Müşteri-1",
      isim: "Özcan Et & Kasap",
      urun: urun.ad,
      fiyat: urun.fiyat,
      durum: "Hazırlanıyor",
      saat: new Date().toLocaleTimeString()
    }).then(() => {
      alert(`${urun.ad} siparişi verildi! Şoföre aktarılıyor... 🚀`);
      setTimeout(() => navigate('/sofor'), 1000);
    });
  };

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', padding: '20px', color: 'white', textAlign: 'center' }}>
      <h1 style={{ color: '#2ecc71', marginTop: '20px' }}>NEXTLOGI MENÜ</h1>
      <p style={{ color: '#8b949e' }}>Lütfen gönderilecek ürünü seçin</p>

      <div style={{ display: 'grid', gap: '15px', maxWidth: '500px', margin: '30px auto' }}>
        {urunler.map((urun) => (
          <div 
            key={urun.id}
            onClick={() => setSecilenUrun(urun)}
            style={{ 
              backgroundColor: secilenUrun?.id === urun.id ? '#2ecc71' : '#111418',
              color: secilenUrun?.id === urun.id ? '#090d11' : 'white',
              padding: '20px', borderRadius: '15px', cursor: 'pointer',
              border: '2px solid #30363d', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'all 0.3s'
            }}
          >
            <div>
              <span style={{ fontSize: '24px', marginRight: '10px' }}>{urun.ikon}</span>
              <span style={{ fontWeight: 'bold' }}>{urun.ad}</span>
            </div>
            <span>{urun.fiyat}</span>
          </div>
        ))}
      </div>

      {secilenUrun && (
        <button 
          onClick={() => siparisVer(secilenUrun)}
          style={{ 
            width: '100%', maxWidth: '500px', padding: '20px', backgroundColor: '#2ecc71', 
            color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', marginTop: '20px'
          }}
        >
          SİPARİŞİ ŞOFÖRE GÖNDER 🚛
        </button>
      )}
    </div>
  );
}