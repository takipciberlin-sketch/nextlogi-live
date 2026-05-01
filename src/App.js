
import React, { useState } from "react";

export default function NextLogiWithAddProduct() {
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState("ALL");
  
  // Başlangıç listesi (PDF'den gelen veriler)[cite: 1]
  const [products, setProducts] = useState([
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", color: "#e67e22" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", color: "#f1c40f" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", color: "#e74c3c" },
    // ... diğer ürünler buraya gelecek[cite: 1]
  ]);

  const CATEGORIES = ["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];

  // YENİ ÜRÜN EKLEME FONKSİYONU
  const addNewProduct = () => {
    const name = prompt("Ürün Adı:");
    const cat = prompt("Kategori (Rind/Bulle, Hähnchen, Kalb, Lamm, Pute, Geflügel, Verarbeitet):");
    
    if (name && cat) {
      const newEntry = {
        id: Date.now(),
        name: name,
        cat: cat,
        color: "#95a5a6" // Yeni ürünler için varsayılan gri renk
      };
      setProducts([...products, newEntry]);
    }
  };

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  const adjustQty = (id, amt) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + amt) }));
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL MENÜ */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h3 style={{ color: '#2ecc71', marginBottom: '30px' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>Ürünler & Sipariş</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: `1px solid ${activeCategory === cat ? '#2ecc71' : '#30363d'}`,
                padding: '8px 15px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer'
              }}>{cat}</button>
            ))}
          </div>
          
          {/* İŞTE O KRİTİK BUTON */}
          <button 
            onClick={addNewProduct}
            style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '8px 15px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginLeft: '10px', whiteSpace: 'nowrap' }}
          >
            + ÜRÜN EKLE
          </button>
        </div>

        {/* ÜRÜN LİSTESİ */}
        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', marginBottom: '10px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div>
               <div style={{ fontSize: '14px' }}>{p.name}</div>
               <div style={{ fontSize: '10px', color: '#8b949e' }}>{p.cat}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => adjustQty(p.id, -1)} style={{ width: '32px', height: '32px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '4px' }}>-</button>
              <span style={{ minWidth: '20px', textAlign: 'center' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => adjustQty(p.id, 1)} style={{ width: '32px', height: '32px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '4px' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (SEPET) */}
      <div style={{ width: '320px', padding: '20px', borderLeft: '1px solid #161b22' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>🛒 Sipariş Özeti</div>
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '10px', marginBottom: '10px', borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '11px', color: '#8b949e' }}>{quantities[item.id]} kg</div>
          </div>
        ))}
        <button style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '20px' }}>
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}