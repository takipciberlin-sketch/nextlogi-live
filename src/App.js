import React, { useState } from "react";

export default function NextLogiFixed() {
  const [quantities, setQuantities] = useState({});

  // image_584e.jpg'deki tam ürün listesi ve fazlası
  const PRODUCTS = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: 'RIND / BULLE' },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: 'RIND / BULLE' },
    { id: 3, name: "Rinder-Nacken", cat: 'RIND / BULLE' },
    { id: 4, name: "Bullen-Bug", cat: 'RIND / BULLE' },
    { id: 7, name: "Hähnchen-Brustfilet", cat: 'HÄHNCHEN' },
    { id: 11, name: "Kalbs-Schnitzel", cat: 'KALB' }
  ];

  const activeItems = PRODUCTS.filter(p => Number(quantities[p.id]) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#0b1118', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL MENÜ (image_584e.jpg stili) */}
      <div style={{ width: '180px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h3 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '20px' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '10px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px' }}>Ürünler & Sipariş</div>
        <div style={{ color: '#8b949e', padding: '10px', fontSize: '14px' }}>Müşteriler</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ backgroundColor: '#161b22', padding: '12px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', border: '1px solid #30363d' }}>
          <span>👤 Max Bauer GmbH</span>
          <span style={{ color: '#2ecc71' }}>ADIM 2/2</span>
        </div>

        <h4 style={{ color: '#e67e22', borderBottom: '1px solid #e67e22', paddingBottom: '5px', fontSize: '12px', marginBottom: '15px' }}>RIND / BULLE</h4>

        {PRODUCTS.map(p => (
          <div key={p.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#161b22', padding: '12px 20px', borderRadius: '8px', marginBottom: '8px',
            border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent'
          }}>
            <span style={{ fontSize: '14px' }}>{p.name}</span>
            <input 
              type="number" 
              value={quantities[p.id] || 0}
              onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
              style={{ width: '50px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', textAlign: 'center', borderRadius: '4px', padding: '5px' }}
            />
          </div>
        ))}
      </div>

      {/* SAĞ SEPET (image_584e.jpg stili) */}
      <div style={{ width: '280px', padding: '20px', borderLeft: '1px solid #161b22' }}>
        <div style={{ fontSize: '14px', marginBottom: '15px' }}>🛒 Sipariş Özeti</div>
        <div style={{ minHeight: '150px' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '10px', borderRadius: '8px', marginBottom: '8px', borderLeft: '4px solid #e67e22' }}>
              <div style={{ fontSize: '12px' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>{quantities[item.id]} kg</div>
            </div>
          ))}
        </div>

        <textarea 
          placeholder="Teslimat Notu..."
          style={{ width: '100%', height: '80px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: 'white', padding: '10px', marginTop: '20px', resize: 'none' }}
        />

        <button style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#0b1118', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '15px', cursor: 'pointer' }}>
          Siparişi Tamamla
        </button>
      </div>

    </div>
  );
}