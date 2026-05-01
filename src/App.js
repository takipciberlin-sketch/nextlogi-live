import React, { useState } from "react";

export default function NextLogiFixed() {
  const [quantities, setQuantities] = useState({});

  // Sadece istenen kategoriler eklendi, yapı bozulmadı
  const PRODUCTS = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 3, name: "Rinder-Nacken", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 4, name: "Bullen-Bug", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 5, name: "Hähnchen-Brustfilet", cat: "HÄHNCHEN", color: "#f1c40f" },
    { id: 6, name: "Kalbs-Schnitzel", cat: "KALB", color: "#3498db" }
  ];

  const categories = ["RIND / BULLE", "HÄHNCHEN", "KALB"];
  const activeItems = PRODUCTS.filter(p => Number(quantities[p.id]) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0 }}>
      
      {/* SOL MENÜ */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h3 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '30px', fontWeight: 'bold' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
          Ürünler & Sipariş
        </div>
        <div style={{ color: '#8b949e', padding: '12px', fontSize: '14px' }}>Müşteriler</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '25px', border: '1px solid #30363d' }}>
          <span style={{ fontSize: '14px' }}>👤 Max Bauer GmbH</span>
          <span style={{ color: '#2ecc71', fontSize: '13px', fontWeight: 'bold' }}>ADIM 2/2</span>
        </div>

        {/* Kategorilere Göre Listeleme */}
        {categories.map(catName => (
          <div key={catName} style={{ marginBottom: '30px' }}>
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: PRODUCTS.find(p => p.cat === catName).color, fontSize: '12px', marginBottom: '5px', fontWeight: 'bold' }}>{catName}</h4>
              <div style={{ height: '1px', backgroundColor: PRODUCTS.find(p => p.cat === catName).color, width: '100%' }}></div>
            </div>

            {PRODUCTS.filter(p => p.cat === catName).map(p => (
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
        ))}
      </div>

      {/* SAĞ PANEL */}
      <div style={{ width: '320px', padding: '20px', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', fontSize: '14px' }}>
          <span>🛒</span> <strong>Sipariş Özeti</strong>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '10px', marginBottom: '10px', borderLeft: `4px solid ${item.color}` }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>{quantities[item.id]} kg</div>
            </div>
          ))}
        </div>

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