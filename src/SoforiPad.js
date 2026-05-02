import React from 'react';

export default function SoforiPad() {
  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', padding: '40px', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
        <h1 style={{ color: '#2ecc71', margin: 0 }}>Şoför Teslimat Ekranı</h1>
        <span style={{ color: '#8b949e' }}>iPad Modu Aktif</span>
      </div>

      <div style={{ backgroundColor: '#111418', borderRadius: '30px', padding: '50px', border: '2px solid #30363d' }}>
        <h2 style={{ fontSize: '50px', margin: 0 }}>Özcan Et & Kasap</h2>
        <p style={{ fontSize: '25px', color: '#8b949e', marginTop: '20px' }}>5kg Dana Antrikot, 3 Koli Tavuk</p>
        
        <button style={{ width: '100%', height: '180px', marginTop: '60px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '25px', fontSize: '45px', fontWeight: '900', cursor: 'pointer' }}>
          TESLİM ETTİM
        </button>
      </div>
    </div>
  );
}