import React, { useState, useEffect } from "react";

export default function NextLogiV20_Pro() {
  // Hafıza yönetimi
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nextlogi_cart");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("nextlogi_cart", JSON.stringify(quantities));
  }, [quantities]);

  return (
    <div style={{ display: 'flex', backgroundColor: '#0d1117', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* 1. SOL YAN MENÜ (Sidebar) */}
      <div style={{ width: '240px', backgroundColor: '#161b22', borderRight: '1px solid #30363d', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#2ecc71', fontSize: '20px', fontWeight: 'bold', marginBottom: '40px' }}>NEXTLOGI</h1>
        
        <nav style={{ flex: 1 }}>
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler', 'Ürünler & Sipariş', 'Yakıt Raporu', 'Ödeme'].map((item) => (
            <div key={item} style={{ 
              padding: '12px 15px', borderRadius: '10px', marginBottom: '5px', cursor: 'pointer',
              backgroundColor: item === 'Ürünler & Sipariş' ? '#1f6745' : 'transparent',
              color: item === 'Ürünler & Sipariş' ? '#aff5b4' : '#8b949e'
            }}>
              {item}
            </div>
          ))}
        </nav>

        <div style={{ padding: '15px', backgroundColor: '#0d1117', borderRadius: '12px', fontSize: '12px' }}>
          <div style={{ fontWeight: 'bold', color: 'white' }}>Klaus Müller</div>
          <div style={{ color: '#8b949e' }}>Müller GmbH</div>
          <button style={{ background: 'none', border: 'none', color: '#8b949e', marginTop: '10px', cursor: 'pointer' }}>← Çıkış Yap</button>
        </div>
      </div>

      {/* 2. ANA İÇERİK ALANI */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* ÜST BİLGİ ÇUBUĞU (Header) */}
        <div style={{ padding: '20px', display: 'flex', gap: '15px', alignItems: 'center', borderBottom: '1px solid #30363d' }}>
          <button style={{ backgroundColor: '#21262d', border: '1px solid #30363d', color: 'white', padding: '8px 15px', borderRadius: '8px' }}>← Müşteri Değiştir</button>
          <div style={{ flex: 1, backgroundColor: '#161b22', padding: '10px 20px', borderRadius: '12px', border: '1px solid #30363d', display: 'flex', justifyContent: 'space-between' }}>
            <span>👤 Max Bauer GmbH</span>
            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>ADIM 2/2</span>
          </div>
          <input placeholder="Ürün ara..." style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', padding: '8px 15px', borderRadius: '8px', width: '200px' }} />
          <button style={{ backgroundColor: '#1f6feb', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '8px' }}>Yönetim</button>
        </div>

        {/* İÇERİK (Bir sonraki adımda kategori ve listeyi buraya ekleyeceğiz) */}
        <div style={{ flex: 1, padding: '20px' }}>
          <p style={{ color: '#8b949e' }}>Yerleşim hazır. Şimdi kategorileri ve ürün listesini ekleyelim mi?</p>
        </div>
      </div>
    </div>
  );
}