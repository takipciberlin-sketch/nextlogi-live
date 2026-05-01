import React, { useState } from "react";

export default function NextLogiFixed() {
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Hafızadaki eksik kategorileri ve ürünleri ekledik
  const PRODUCTS = [
    // RIND / BULLE
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 3, name: "Rinder-Nacken", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 4, name: "Bullen-Bug", cat: "RIND / BULLE", color: "#e67e22" },
    { id: 5, name: "Rinder-Gulasch fein", cat: "RIND / BULLE", color: "#e67e22" },
    
    // HÄHNCHEN (Eksik olan)
    { id: 6, name: "Hähnchen-Brustfilet (Sade)", cat: "HÄHNCHEN", color: "#f1c40f" },
    { id: 7, name: "Hähnchen-Schenkel (Kemiksiz)", cat: "HÄHNCHEN", color: "#f1c40f" },
    { id: 8, name: "Hähnchen-Flügel (Kanat)", cat: "HÄHNCHEN", color: "#f1c40f" },
    { id: 9, name: "Hähnchen-Kotelett", cat: "HÄHNCHEN", color: "#f1c40f" },

    // KALB (Eksik olan)
    { id: 10, name: "Kalbs-Schnitzel (Oberschale)", cat: "KALB", color: "#3498db" },
    { id: 11, name: "Kalbs-Haxe (İncik)", cat: "KALB", color: "#3498db" },
    { id: 12, name: "Kalbs-Rücken (Bonfilelik)", cat: "KALB", color: "#3498db" },
    { id: 13, name: "Kalbs-Gulasch", cat: "KALB", color: "#3498db" }
  ];

  const categories = ["ALL", "RIND / BULLE", "HÄHNCHEN", "KALB"];
  const filteredProducts = activeCategory === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCategory);
  const activeItems = PRODUCTS.filter(p => Number(quantities[p.id]) > 0);

  const adjustQty = (id, amount) => {
    const current = Number(quantities[id]) || 0;
    const next = Math.max(0, current + amount);
    setQuantities({ ...quantities, [id]: next });
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0 }}>
      
      {/* SOL MENÜ (Sabit) */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h3 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '30px', fontWeight: 'bold' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>Ürünler & Sipariş</div>
        <div style={{ color: '#8b949e', padding: '12px', fontSize: '14px' }}>Müşteriler</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', border: '1px solid #30363d' }}>
          <span style={{ fontSize: '14px' }}>👤 Max Bauer GmbH</span>
          <span style={{ color: '#2ecc71', fontSize: '13px', fontWeight: 'bold' }}>ADIM 2/2</span>
        </div>

        {/* KATEGORİ BUTONLARI (Geliştirildi) */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
              color: activeCategory === cat ? '#4ade80' : '#8b949e',
              border: `1px solid ${activeCategory === cat ? '#2ecc71' : '#30363d'}`,
              padding: '8px 16px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold'
            }}>{cat}</button>
          ))}
        </div>

        {/* ÜRÜN LİSTESİ */}
        {filteredProducts.map(p => (
          <div key={p.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', marginBottom: '10px',
            border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent'
          }}>
            <div>
               <span style={{ fontSize: '14px', display: 'block' }}>{p.name}</span>
               <span style={{ fontSize: '10px', color: '#8b949e' }}>{p.cat}</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => adjustQty(p.id, -1)} style={{ width: '35px', height: '35px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>-</button>
              <input type="number" value={quantities[p.id] || 0} readOnly style={{ width: '50px', backgroundColor: 'transparent', border: 'none', color: 'white', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} />
              <button onClick={() => adjustQty(p.id, 1)} style={{ width: '35px', height: '35px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (Sipariş Özeti) */}
      <div style={{ width: '320px', padding: '20px', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>🛒 Sipariş Özeti</div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '10px', marginBottom: '10px', borderLeft: `4px solid ${item.color}` }}>
              <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>{quantities[item.id]} kg</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '20px' }}>
          <textarea placeholder="Teslimat Notu..." style={{ width: '100%', height: '80px', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', color: 'white', padding: '12px', resize: 'none', fontSize: '13px', boxSizing: 'border-box' }} />
          <button style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', marginTop: '15px', cursor: 'pointer' }}>Siparişi Tamamla</button>
        </div>
      </div>
    </div>
  );
}