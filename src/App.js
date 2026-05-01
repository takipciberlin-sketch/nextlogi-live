import React, { useState, useEffect } from "react";

export default function NextLogiFullInventory() {
  // 1. PDF'DEKİ TÜM ÜRÜNLERİN TAM LİSTESİ
  const initialProducts = [
    // RIND/BULLE[cite: 1]
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    { id: 4, name: "Bullen-Kamm ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    { id: 5, name: "Bullen-Bug", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    { id: 10, name: "Bullen-Oberschale", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    
    // HÄHNCHEN[cite: 1]
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
    { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
    { id: 40, name: "Hähnchen-Brustfilet", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },

    // KALB[cite: 1]
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg", color: "#3498db" },
    { id: 50, name: "Kalbs-Schulter ohne Knochen", cat: "Kalb", unit: "kg", color: "#3498db" },

    // LAMM[cite: 1]
    { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", unit: "kg", color: "#9b59b6" },

    // PUTE (Görseldeki Boş Kategori)[cite: 1]
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg", color: "#1abc9c" },
    { id: 55, name: "Puten-Oberkeule", cat: "Pute", unit: "kg", color: "#1abc9c" },
    { id: 56, name: "Pute ganz", cat: "Pute", unit: "kg", color: "#1abc9c" },

    // GEFLÜGEL[cite: 1]
    { id: 57, name: "Wiener Geflügel", cat: "Geflügel", unit: "kg", color: "#27ae60" },
    { id: 59, name: "Ente", cat: "Geflügel", unit: "kg", color: "#27ae60" },

    // VERARBEITET[cite: 1]
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" },
    { id: 62, name: "Hamburger Fleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" }
  ];

  // 2. HAFIZA YÖNETİMİ
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_products_v2");
    return saved ? JSON.parse(saved) : initialProducts;
  });

  const [categories] = useState(["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"]);
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_quantities_v2");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    localStorage.setItem("nl_products_v2", JSON.stringify(products));
    localStorage.setItem("nl_quantities_v2", JSON.stringify(quantities));
  }, [products, quantities]);

  // Ürünleri filtrele (Kategori boş kalmasın diye kontrol eklendi)
  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat.trim() === activeCategory.trim());

  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL NAV */}
      <div style={{ width: '240px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71', fontSize: '20px' }}>NEXTLOGI</h2>
        <div style={{ marginTop: '30px', padding: '10px', backgroundColor: '#1a3a2a', borderRadius: '8px', color: '#4ade80' }}>
          📦 Ürünler & Sipariş
        </div>
      </div>

      {/* ANA LİSTE */}
      <div style={{ flex: 1, padding: '30px' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '10px 20px',
                borderRadius: '20px',
                border: activeCategory === cat ? '1px solid #2ecc71' : '1px solid #30363d',
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                cursor: 'pointer'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#161b22', borderRadius: '12px', marginBottom: '10px' }}>
              <div>
                <div style={{ fontWeight: 'bold' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.cat} - {p.unit}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '30px', height: '30px', cursor: 'pointer' }}>-</button>
                <span>{quantities[p.id] || 0}</span>
                <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '30px', height: '30px', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', color: '#8b949e', marginTop: '40px' }}>
            ⚠️ "{activeCategory}" kategorisinde ürün bulunamadı. Lütfen "ALL" kısmını kontrol edin.
          </div>
        )}
      </div>

      {/* SİPARİŞ ÖZETİ */}
      <div style={{ width: '350px', padding: '20px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22' }}>
        <h3>🛒 Sipariş Özeti</h3>
        {activeItems.map(item => (
          <div key={item.id} style={{ padding: '15px', backgroundColor: '#161b22', borderRadius: '10px', marginBottom: '10px', borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ color: '#8b949e' }}>{quantities[item.id]} {item.unit}</div>
          </div>
        ))}
        {activeItems.length === 0 && <p style={{ color: '#484f58' }}>Henüz ürün seçilmedi.</p>}
      </div>
    </div>
  );
}