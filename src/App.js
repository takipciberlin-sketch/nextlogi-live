import React, { useState, useEffect } from "react";

export default function NextLogiPermanent() {
  // 1. HAFIZADAN YÜKLEME (Initial State)
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_categories");
    return saved ? JSON.parse(saved) : ["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];
  });

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_products");
    // Başlangıç listesi (PDF içeriği)[cite: 1]
    const defaultProds = [
      { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
      { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" },
      // Diğer PDF verileri buraya eklenmiş varsayılır[cite: 1]
    ];
    return saved ? JSON.parse(saved) : defaultProds;
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_quantities");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProd, setNewProd] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [tempCatName, setTempCatName] = useState("");

  // 2. HER DEĞİŞİKLİKTE HAFIZAYA KAYDETME (Auto-Save)
  useEffect(() => {
    localStorage.setItem("nl_categories", JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("nl_products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("nl_quantities", JSON.stringify(quantities));
  }, [quantities]);

  const handleSaveProduct = () => {
    if (!newProd.name) return;
    const entry = { ...newProd, id: Date.now(), color: "#95a5a6" };
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
      
      {/* SOL NAV */}
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
                padding: '8px 16px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', cursor: 'pointer'
              }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(46, 204, 113, 0.2)' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '18px 24px', borderRadius: '12px', marginBottom: '12px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div>
              <div style={{ fontSize: '14px', color: '#f0f6fc', fontWeight: '500' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: '#8b949e' }}>{p.cat} ({p.unit})</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>-</button>
              <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (Sipariş Özeti) */}
      <div style={{ width: '340px', padding: '24px', borderLeft: '1px solid #161b22', backgroundColor: '#0d1117' }}>
        <div style={{ fontSize: '15px', fontWeight: 'bold', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>🛒 Sipariş Özeti</div>
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '14px', borderRadius: '12px', marginBottom: '12px', borderLeft: `5px solid ${item.color}` }}>
            <div style={{ fontSize: '13px', fontWeight: '600' }}>{item.name}</div>
            <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '6px' }}>{quantities[item.id]} {item.unit}</div>
          </div>
        ))}
        {activeItems.length > 0 && (
          <button style={{ width: '100%', padding: '16px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', marginTop: '20px', cursor: 'pointer' }}>Siparişi Tamamla</button>
        )}
      </div>

      {/* POPUP MODAL */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(4px)' }}>
          <div style={{ backgroundColor: '#161b22', padding: '32px', borderRadius: '20px', width: '420px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0, marginBottom: '24px', color: '#f0f6fc' }}>Yeni Ürün Tanımla</h3>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Ürün İsmi</label>
              <input value={newProd.name} onChange={(e) => setNewProd({...newProd, name: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Birim</label>
              <select value={newProd.unit} onChange={(e) => setNewProd({...newProd, unit: e.target.value})} style={{ width: '100%', padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>
                <option value="kg">kg</option>
                <option value="Adet">Adet</option>
                <option value="Koli">Koli</option>
              </select>
            </div>

            <div style={{ marginBottom: '30px' }}>
              <label style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '8px' }}>Kategori</label>
              {!isAddingNewCat ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select value={newProd.cat} onChange={(e) => setNewProd({...newProd, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>
                    {categories.filter(c => c !== "ALL").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: 'white', border: 'none', padding: '0 16px', borderRadius: '8px', cursor: 'pointer' }}>+</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input placeholder="Kategori adı..." value={tempCatName} onChange={(e) => setTempCatName(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
                  <button onClick={handleAddNewCategory} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '0 16px', borderRadius: '8px', fontWeight: 'bold' }}>Ekle</button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '14px', backgroundColor: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '12px', cursor: 'pointer' }}>Vazgeç</button>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '14px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Sisteme Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}