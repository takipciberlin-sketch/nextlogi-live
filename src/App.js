import React, { useState, useEffect } from "react";

export default function NextLogiFinalStation() {
  // 1. HAFIZA VE PDF VERİLERİ (fleisch_kategorien.pdf)[cite: 1]
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_categories");
    return saved ? JSON.parse(saved) : ["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_products");
    if (saved) return JSON.parse(saved);

    // PDF'den gelen tam envanter listesi[cite: 1]
    return [
      { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 4, name: "Bullen-Kamm ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 5, name: "Bullen-Bug", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 6, name: "Bullen-Bug ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 7, name: "Bullen-Bug + Kamm ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 8, name: "Bullen-Kugel", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 9, name: "Bullen-Haxe", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 10, name: "Bullen-Oberschale", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 11, name: "Bullen-Unterschale", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 12, name: "Bullen-Rib-Eye", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 13, name: "Bullen-Entrecôte", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 33, name: "Hähnchen-Keule ohne Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 34, name: "Hähnchen-Flügel", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 39, name: "Hähnchen-Innenfilet", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg", color: "#3498db" },
      { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", unit: "kg", color: "#9b59b6" },
      { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" },
      { id: 61, name: "Döner-Hackspieß-Fleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" }
    ];
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_quantities");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  // 2. HAFIZA KİLİTLEME (LocalStorage Save)[cite: 1]
  useEffect(() => {
    localStorage.setItem("nl_categories", JSON.stringify(categories));
    localStorage.setItem("nl_products", JSON.stringify(products));
    localStorage.setItem("nl_quantities", JSON.stringify(quantities));
  }, [categories, products, quantities]);

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SOL PANEL */}
      <div style={{ width: '220px', padding: '24px', borderRight: '1px solid #161b22', flexShrink: 0 }}>
        <h2 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '40px' }}>NEXTLOGI</h2>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>Ürünler & Sipariş</div>
      </div>

      {/* MERKEZ ÜRÜN LİSTESİ */}
      <div style={{ flex: 1, padding: '20px 30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: `1px solid ${activeCategory === cat ? '#2ecc71' : '#30363d'}`,
                padding: '8px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer'
              }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '10px 20px', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {/* ÜRÜNLERİN GÖRÜNDÜĞÜ ALAN */}
        {filteredProducts.length > 0 ? filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '18px 24px', borderRadius: '12px', marginBottom: '12px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#f0f6fc', fontWeight: '500' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>{p.cat} ({p.unit})</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>-</button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>+</button>
            </div>
          </div>
        )) : (
          <div style={{ textAlign: 'center', color: '#8b949e', marginTop: '50px' }}>Bu kategoride ürün bulunamadı.</div>
        )}
      </div>

      {/* SAĞ SİPARİŞ ÖZETİ */}
      <div style={{ width: '340px', padding: '24px', borderLeft: '1px solid #161b22', backgroundColor: '#0d1117' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '24px' }}>🛒 Sipariş Özeti</div>
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '14px', borderRadius: '12px', marginBottom: '12px', borderLeft: `5px solid ${item.color}` }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '12px', color: '#8b949e' }}>{quantities[item.id]} {item.unit}</div>
          </div>
        ))}
      </div>

      {/* POPUP (MODAL) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '400px', border: '1px solid #30363d' }}>
            <h3 style={{ color: 'white', marginTop: 0 }}>Yeni Ürün Girişi</h3>
            <input placeholder="Ürün İsmi" value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', marginBottom: '15px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', backgroundColor: '#30363d', color: 'white', border: 'none' }}>İptal</button>
              <button onClick={() => {
                setProducts([...products, {...newProd, id: Date.now()}]);
                setIsModalOpen(false);
              }} style={{ flex: 1, padding: '12px', borderRadius: '10px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}