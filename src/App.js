import React, { useState } from "react";

export default function NextLogiFixed() {
  const [quantities, setQuantities] = useState({});

  // image_3eee77.png görselindeki ürün listesi
  const PRODUCTS = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen" },
    { id: 2, name: "Bullen-Keule mit Knochen" },
    { id: 3, name: "Rinder-Nacken" },
    { id: 4, name: "Bullen-Bug" },
    { id: 5, name: "Hähnchen-Brustfilet" },
    { id: 6, name: "Kalbs-Schnitzel" }
  ];

  const activeItems = PRODUCTS.filter(p => Number(quantities[p.id]) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0 }}>
      
      {/* SOL MENÜ - image_3eee77.png Sol Bar */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h3 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '30px', fontWeight: 'bold' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
          Ürünler & Sipariş
        </div>
        <div style={{ color: '#8b949e', padding: '12px', fontSize: '14px' }}>Müşteriler</div>
      </div>

      {/* ANA PANEL (ORTA) */}
      <div style={{ flex: 1, padding: '20px' }}>
        {/* Kullanıcı Bilgisi */}
        <div style={{ backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px', border: '1px solid #30363d' }}>
          <span style={{ fontSize: '14px' }}>👤 Max Bauer GmbH</span>
          <span style={{ color: '#2ecc71', fontSize: '13px', fontWeight: 'bold' }}>ADIM 2/2</span>
        </div>

        {/* Kategori Başlığı - image_3eee77.png Turuncu Çizgi */}
        <div style={{ marginBottom: '20px' }}>
          <h4 style={{ color: '#e67e22', fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>RIND / BULLE</h4>
          <div style={{ height: '1px', backgroundColor: '#e67e22', width: '100%' }}></div>
        </div>

        {/* Ürün Listesi */}
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', marginBottom: '10px',
            border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent'
          }}>
            <span style={{ fontSize: '14px' }}>{p.name}</span>
            <input 
              type="number" 
              value={quantities[p.id] || 0}
              onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
              style={{ width: '60px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', textAlign: 'center', borderRadius: '4px', padding: '8px', fontSize: '14px' }}
            />
          </div>
        ))}
      </div>

      {/* SAĞ PANEL - image_3eee77.png Sipariş Özeti */}
      <div style={{ width: '320px', padding: '20px', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '14px' }}>
          <span>🛒</span> <strong>Sipariş Özeti</strong>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '10px', marginBottom: '10px', borderLeft: '4px solid #e67e22' }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>{quantities[item.id]} kg</div>
            </div>
          ))}
        </div>

        {/* Not ve Buton Alanı */}
        <div style={{ marginTop: '20px' }}>
          <textarea 
            placeholder="Teslimat Notu..."
            style={{ width: '100%', height: '100px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: 'white', padding: '12px', resize: 'none', fontSize: '13px', boxSizing: 'border-box' }}
          />
          <button style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', marginTop: '15px', cursor: 'pointer' }}>
            Siparişi Tamamla
          </button>
        </div>
      </div>

    </div>
  );
}