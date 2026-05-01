import React, { useState, useEffect } from "react";

export default function NextLogiUltimate() {
  // 1. HAFIZA VE PDF VERİLERİNİ BAŞLATMA[cite: 1]
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_categories");
    return saved ? JSON.parse(saved) : ["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_products");
    if (saved) return JSON.parse(saved);

    // PDF'den gelen tam liste[cite: 1]
    return [
      // RIND/BULLE
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
      { id: 14, name: "Bullen-Hals", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 15, name: "Bullen-Rosenstück", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 16, name: "Rinder-Abschnitt", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 17, name: "Bulle ganz", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 18, name: "Rinder Häckfleisch", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 19, name: "Bullen-Lappen mit Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 20, name: "Bullen-Lappen ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 21, name: "Rinder-Rücken", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 22, name: "Rinder-Kugel", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 23, name: "Rinder-Kamm", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 24, name: "Rinder-Entrecôte", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 25, name: "Bullen-Leber", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 26, name: "Bullen-Pansen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 27, name: "Bullen-Abschnitt", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 28, name: "Rinder-Bug", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 29, name: "Rinder-Oberschale", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 30, name: "Rinder-Kamm ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },

      // HÄHNCHEN[cite: 1]
      { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 33, name: "Hähnchen-Keule ohne Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 34, name: "Hähnchen-Flügel", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 35, name: "Hähnchen-Flügel geteilt", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 36, name: "Hähnchen ganz", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 37, name: "Hähnchen ganz gewürzt", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 38, name: "Hähnchen ganz ohne Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 39, name: "Hähnchen-Innenfilet", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 40, name: "Hähnchen-Brustfilet", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 41, name: "Hähnchen-Brustfilet mit Haut", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 42, name: "Hähnchen-Brustfilet ohne Haut", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 43, name: "Hähnchen-Leber", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 44, name: "Hähnchen-Herz", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 45, name: "Hähnchen-Magen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 46, name: "Hähnchen-Nieren", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      { id: 47, name: "Hä.unter Keule", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },

      // KALB[cite: 1]
      { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg", color: "#3498db" },
      { id: 49, name: "Kalbs-Lappen mit Knochen", cat: "Kalb", unit: "kg", color: "#3498db" },
      { id: 50, name: "Kalbs-Schulter ohne Knochen", cat: "Kalb", unit: "kg", color: "#3498db" },
      { id: 51, name: "Kalbs-Lappen ohne Knochen", cat: "Kalb", unit: "kg", color: "#3498db" },
      { id: 52, name: "Kalbs-Kugel rosé", cat: "Kalb", unit: "kg", color: "#3498db" },

      // LAMM[cite: 1]
      { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", unit: "kg", color: "#9b59b6" },

      // PUTE[cite: 1]
      { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg", color: "#1abc9c" },
      { id: 55, name: "Puten-Oberkeule", cat: "Pute", unit: "kg", color: "#1abc9c" },
      { id: 56, name: "Pute ganz", cat: "Pute", unit: "kg", color: "#1abc9c" },

      // GEFLÜGEL[cite: 1]
      { id: 57, name: "Wiener Geflügel", cat: "Geflügel", unit: "kg", color: "#27ae60" },
      { id: 58, name: "Gänse", cat: "Geflügel", unit: "kg", color: "#27ae60" },
      { id: 59, name: "Ente", cat: "Geflügel", unit: "kg", color: "#27ae60" },

      // VERARBEITET[cite: 1]
      { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" },
      { id: 61, name: "Döner-Hackspieß-Fleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" },
      { id: 62, name: "Hamburger Fleisch", cat: "Verarbeitet", unit: "kg", color: "#e74c3c" }
    ];
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_quantities");
    return saved ? JSON.parse(saved) : {};
  });

  // 2. OTOMATİK KAYIT MEKANİZMASI[cite: 1]
  useEffect(() => {
    localStorage.setItem("nl_categories", JSON.stringify(categories));
    localStorage.setItem("nl_products", JSON.stringify(products));
    localStorage.setItem("nl_quantities", JSON.stringify(quantities));
  }, [categories, products, quantities]);

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [tempCatName, setTempCatName] = useState("");

  const handleSaveProduct = () => {
    if (!newProd.name) return;
    const entry = { ...newProd, id: Date.now(), color: "#7f8c8d" };
    setProducts([...products, entry]);
    setIsModalOpen(false);
    setNewProd({ name: "", cat: "Rind/Bulle", unit: "kg" });
  };

  const handleAddNewCategory = () => {
    if (tempCatName && !categories.includes(tempCatName)) {
      setCategories([...categories, tempCatName]);
      setNewProd({ ...newProd, cat: tempCatName });
      setIsAddingNewCat(false);
      setTempCatName("");
    }
  };

  const filteredProducts = activeCategory === "ALL" ? products : products.filter(p => p.cat === activeCategory);
  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SOL SIDEBAR */}
      <div style={{ width: '220px', padding: '24px 16px', borderRight: '1px solid #161b22', flexShrink: 0 }}>
        <h2 style={{ color: '#2ecc71', fontSize: '18px', marginBottom: '40px' }}>NEXTLOGI</h2>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>Ürünler & Sipariş</div>
      </div>

      {/* MERKEZ PANEL */}
      <div style={{ flex: 1, padding: '20px 30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: `1px solid ${activeCategory === cat ? '#2ecc71' : '#30363d'}`,
                padding: '8px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', cursor: 'pointer', transition: '0.2s'
              }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '10px 24px', borderRadius: '24px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '18px 24px', borderRadius: '12px', marginBottom: '12px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#f0f6fc', fontWeight: '500' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>{p.cat} ({p.unit})</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>-</button>
              <span style={{ minWidth: '24px', textAlign: 'center', fontWeight: 'bold' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (SIPARIŞ ÖZETİ) */}
      <div style={{ width: '340px', padding: '24px', borderLeft: '1px solid #161b22', backgroundColor: '#0d1117' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '24px' }}>🛒 Sipariş Özeti</div>
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '14px', borderRadius: '12px', marginBottom: '12px', borderLeft: `5px solid ${item.color}` }}>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.name}</div>
            <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '6px' }}>{quantities[item.id]} {item.unit}</div>
          </div>
        ))}
        {activeItems.length > 0 && (
          <button style={{ width: '100%', padding: '16px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>Siparişi Tamamla</button>
        )}
      </div>

      {/* MODAL GİRİŞİ (IMAGE_3D8694.PNG STİLİ) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#161b22', padding: '32px', borderRadius: '24px', width: '420px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#f0f6fc' }}>Yeni Ürün Tanımla</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Ürün İsmi</label>
              <input value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '10px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Birim Seçimi</label>
              <select value={newProd.unit} onChange={(e) => setNewProd({...newProd, unit: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '10px' }}>
                <option value="kg">Kilogram (kg)</option>
                <option value="Adet">Adet</option>
                <option value="Koli">Koli</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Kategori Yönetimi</label>
              {!isAddingNewCat ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={newProd.cat} onChange={(e) => setNewProd({...newProd, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '10px' }}>
                    {categories.filter(c => c !== "ALL").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: 'white', border: 'none', padding: '0 16px', borderRadius: '10px', cursor: 'pointer' }}>+</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input placeholder="Kategori adı..." value={tempCatName} onChange={(e) => setTempCatName(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '10px' }} />
                  <button onClick={handleAddNewCategory} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '0 16px', borderRadius: '10px', fontWeight: 'bold' }}>Ekle</button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', backgroundColor: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '14px', cursor: 'pointer' }}>İptal</button>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '14px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}