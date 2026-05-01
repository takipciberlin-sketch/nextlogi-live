import React, { useState } from "react";

export default function NextLogiFullList() {
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState("ALL");

  // Kaynaktan alınan tüm ürün ve kategoriler[cite: 1]
  const PRODUCTS = [
    // RIND/BULLE
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 4, name: "Bullen-Kamm ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 5, name: "Bullen-Bug", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 6, name: "Bullen-Bug ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 7, name: "Bullen-Bug + Kamm ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 8, name: "Bullen-Kugel", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 9, name: "Bullen-Haxe", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 10, name: "Bullen-Oberschale", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 11, name: "Bullen-Unterschale", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 12, name: "Bullen-Rib-Eye", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 13, name: "Bullen-Entrecôte", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 14, name: "Bullen-Hals", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 15, name: "Bullen-Rosenstück", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 16, name: "Rinder-Abschnitt", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 17, name: "Bulle ganz", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 18, name: "Rinder Häckfleisch", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 19, name: "Bullen-Lappen mit Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 20, name: "Bullen-Lappen ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 21, name: "Rinder-Rücken", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 22, name: "Rinder-Kugel", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 23, name: "Rinder-Kamm", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 24, name: "Rinder-Entrecôte", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 25, name: "Bullen-Leber", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 26, name: "Bullen-Pansen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 27, name: "Bullen-Abschnitt", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 28, name: "Rinder-Bug", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 29, name: "Rinder-Oberschale", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 30, name: "Rinder-Kamm ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },

    // HÄHNCHEN
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", color: "#f1c40f" },
    { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", color: "#f1c40f" },
    { id: 33, name: "Hähnchen-Keule ohne Knochen", cat: "Hähnchen", color: "#f1c40f" },
    { id: 34, name: "Hähnchen-Flügel", cat: "Hähnchen", color: "#f1c40f" },
    { id: 35, name: "Hähnchen-Flügel geteilt", cat: "Hähnchen", color: "#f1c40f" },
    { id: 36, name: "Hähnchen ganz", cat: "Hähnchen", color: "#f1c40f" },
    { id: 37, name: "Hähnchen ganz gewürzt", cat: "Hähnchen", color: "#f1c40f" },
    { id: 38, name: "Hähnchen ganz ohne Knochen", cat: "Hähnchen", color: "#f1c40f" },
    { id: 39, name: "Hähnchen-Innenfilet", cat: "Hähnchen", color: "#f1c40f" },
    { id: 40, name: "Hähnchen-Brustfilet", cat: "Hähnchen", color: "#f1c40f" },
    { id: 41, name: "Hähnchen-Brustfilet mit Haut", cat: "Hähnchen", color: "#f1c40f" },
    { id: 42, name: "Hähnchen-Brustfilet ohne Haut", cat: "Hähnchen", color: "#f1c40f" },
    { id: 43, name: "Hähnchen-Leber", cat: "Hähnchen", color: "#f1c40f" },
    { id: 44, name: "Hähnchen-Herz", cat: "Hähnchen", color: "#f1c40f" },
    { id: 45, name: "Hähnchen-Magen", cat: "Hähnchen", color: "#f1c40f" },
    { id: 46, name: "Hähnchen-Nieren", cat: "Hähnchen", color: "#f1c40f" },
    { id: 47, name: "Hä.unter Keule", cat: "Hähnchen", color: "#f1c40f" },

    // KALB
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", color: "#3498db" },
    { id: 49, name: "Kalbs-Lappen mit Knochen", cat: "Kalb", color: "#3498db" },
    { id: 50, name: "Kalbs-Schulter ohne Knochen", cat: "Kalb", color: "#3498db" },
    { id: 51, name: "Kalbs-Lappen ohne Knochen", cat: "Kalb", color: "#3498db" },
    { id: 52, name: "Kalbs-Kugel rosé", cat: "Kalb", color: "#3498db" },

    // LAMM
    { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", color: "#9b59b6" },

    // PUTE
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", color: "#1abc9c" },
    { id: 55, name: "Puten-Oberkeule", cat: "Pute", color: "#1abc9c" },
    { id: 56, name: "Pute ganz", cat: "Pute", color: "#1abc9c" },

    // GEFLÜGEL
    { id: 57, name: "Wiener Geflügel", cat: "Geflügel", color: "#27ae60" },
    { id: 58, name: "Gänse", cat: "Geflügel", color: "#27ae60" },
    { id: 59, name: "Ente", cat: "Geflügel", color: "#27ae60" },

    // VERARBEITET
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", color: "#e74c3c" },
    { id: 61, name: "Döner-Hackspieß-Fleisch", cat: "Verarbeitet", color: "#e74c3c" },
    { id: 62, name: "Hamburger Fleisch", cat: "Verarbeitet", color: "#e74c3c" }
  ];

  const categories = ["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];
  const filteredProducts = activeCategory === "ALL" ? PRODUCTS : PRODUCTS.filter(p => p.cat === activeCategory);
  const activeItems = PRODUCTS.filter(p => Number(quantities[p.id]) > 0);

  const adjustQty = (id, amount) => {
    const current = Number(quantities[id]) || 0;
    const next = Math.max(0, current + amount);
    setQuantities({ ...quantities, [id]: next });
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0 }}>
      
      {/* SOL MENÜ */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #161b22', flexShrink: 0 }}>
        <h3 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '30px', fontWeight: 'bold' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>Ürünler & Sipariş</div>
        <div style={{ color: '#8b949e', padding: '12px', fontSize: '14px' }}>Müşteriler</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', marginBottom: '20px', border: '1px solid #30363d' }}>
          <span style={{ fontSize: '14px' }}>👤 Max Bauer GmbH</span>
          <span style={{ color: '#2ecc71', fontSize: '13px', fontWeight: 'bold' }}>ADIM 2/2</span>
        </div>

        {/* KATEGORİ BUTONLARI (Scroll edilebilir yatay sıra) */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', overflowX: 'auto', paddingBottom: '10px' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
              color: activeCategory === cat ? '#4ade80' : '#8b949e',
              border: `1px solid ${activeCategory === cat ? '#2ecc71' : '#30363d'}`,
              padding: '8px 16px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap'
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
              <input type="number" value={quantities[p.id] || 0} readOnly style={{ width: '40px', backgroundColor: 'transparent', border: 'none', color: 'white', textAlign: 'center', fontSize: '16px', fontWeight: 'bold' }} />
              <button onClick={() => adjustQty(p.id, 1)} style={{ width: '35px', height: '35px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '4px', cursor: 'pointer', fontSize: '18px' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL - DİNAMİK AKIŞ */}
      <div style={{ width: '320px', padding: '20px', borderLeft: '1px solid #161b22', overflowY: 'auto' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>🛒 Sipariş Özeti</div>
        
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '10px', marginBottom: '10px', borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '11px', color: '#8b949e', marginTop: '4px' }}>{quantities[item.id]} kg</div>
          </div>
        ))}

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