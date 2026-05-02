import React, { useState } from 'react';

export default function MusteriApp() {
  const [phone, setPhone] = useState("");

  return (
    <div style={{ backgroundColor: '#090d11', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', color: 'white', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ecc71', fontSize: '40px' }}>NEXTLOGI</h1>
      <p style={{ color: '#8b949e', marginBottom: '30px' }}>Müşteri Girişi</p>
      
      <input 
        type="tel" 
        placeholder="Numaranızı Girin" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#111418', border: '2px solid #1c2128', borderRadius: '12px', color: 'white', fontSize: '18px', textAlign: 'center', marginBottom: '20px' }}
      />
      
      <button style={{ width: '100%', maxWidth: '400px', padding: '20px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer' }}>
        UYGULAMAYA GİR
      </button>
    </div>
  );
}