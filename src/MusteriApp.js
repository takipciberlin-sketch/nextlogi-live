import React, { useState } from 'react';
import { db } from './FirebaseConfig';
import { ref, set } from "firebase/database";
import { useNavigate } from 'react-router-dom'; // Yönlendirme için eklendi

export default function MusteriApp() {
  const [phone, setPhone] = useState("1234");
  const navigate = useNavigate(); // Yönlendirme kancası

  const sistemeGir = () => {
    set(ref(db, 'aktifSiparis/'), {
      musteriNo: phone,
      isim: "Özcan Et & Kasap",
      urun: "5kg Dana Antrikot",
      durum: "Hazırlanıyor",
      saat: new Date().toLocaleTimeString()
    }).then(() => {
      // Onay mesajından sonra otomatik olarak şoför sayfasına git
      setTimeout(() => {
        navigate('/sofor');
      }, 500); 
    }).catch((error) => {
      alert("Hata: " + error.message);
    });
  };

  return (
    <div style={{ backgroundColor: '#090d11', height: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white' }}>
      <h1 style={{ color: '#2ecc71', fontSize: '40px' }}>NEXTLOGI</h1>
      <input 
        type="tel" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#111418', border: '2px solid #1c2128', borderRadius: '12px', color: 'white', fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}
      />
      <button 
        onClick={sistemeGir}
        style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}
      >
        UYGULAMAYA GİR
      </button>
    </div>
  );
}