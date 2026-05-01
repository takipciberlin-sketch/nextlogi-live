import React, { useState, useEffect } from "react";

export default function NextLogiKategoriEkleme() {
  const initialInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg" }
  ];

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_inv_v4");
    return saved ? JSON.parse(saved) : initialInventory;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_cats_v4");
    return saved ? JSON.parse(saved) : ["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_qty_v4");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNewCat, setIsAddingNewCat] = useState(false); // Yeni kategori modu
  const [newCatName, setNewCatName] = useState(""); // Yeni kategori inputu
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  useEffect(() => {
    localStorage.setItem("nl_inv_v4", JSON.stringify(products));
    localStorage.setItem("nl_qty_v4", JSON.stringify(quantities));
    localStorage.setItem("nl_cats_v4", JSON.stringify(categories));
  }, [products, quantities, categories]);

  const handleSave = () => {
    if (!formData.name) return;
    setProducts([...products, { ...formData, id: Date.now() }]);
    closeModal();
  };

  const handleAddNewCategory = () => {
    if (newCatName && !categories.includes(newCatName)) {
      const updatedCats = [...categories, newCatName];
      setCategories(updatedCats);
      setFormData({ ...formData, cat: newCatName }); // Seçili kategoriyi yeni eklenen yap
      setNewCatName("");
      setIsAddingNewCat(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddingNewCat(false);
    setFormData({ name: "", cat: categories[0], unit: "kg" });
  };

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL PANEL */}
      <div style={{ width: '220px', padding: '24px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71', fontSize: '20px' }}>NEXTLOGI</h2>
        <div style={{ marginTop: '40px', padding: '12px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', fontWeight: 'bold' }}>Ürünler & Sipariş</div>
      </div>

      {/* MERKEZ LİSTE */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveCategory("ALL")} style={{ padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backgroundColor: activeCategory === "ALL" ? '#1a3a2a' : '#161b22', color: activeCategory === "ALL" ? '#4ade80' : '#8b949e', border: activeCategory === "ALL" ? '1px solid #2ecc71' : '1px solid #30363d' }}>ALL</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22', color: activeCategory === cat ? '#4ade80' : '#8b949e', border: activeCategory === cat ? '1px solid #2ecc71' : '1px solid #30363d' }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '16px 20px', borderRadius: '12px', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button style={{ backgroundColor: '#30363d', color: '#8b949e', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'default', fontSize: '11px' }}>Düzenle</button>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{p.name}</div>
                <div style={{ fontSize: '11px', color: '#8b949e' }}>{p.cat} • {p.unit}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL - SEPET */}
      <div style={{ width: '340px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>🛒 Sipariş Özeti</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '16px', borderRadius: '12px', marginBottom: '10px', borderLeft: '4px solid #2ecc71' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>{item.cat} • {quantities[item.id]} {item.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL (YENİ KATEGORİ EKLEME ÖZELLİĞİ BURADA) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '400px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0 }}>Yeni Ürün Ekle</h3>
            
            <label style={{ fontSize: '12px', color: '#8b949e' }}>Ürün Adı</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />

            <label style={{ fontSize: '12px', color: '#8b949e' }}>Kategori Seçin veya Ekleyin</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '15px' }}>
              {!isAddingNewCat ? (
                <>
                  <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ padding: '0 15px', backgroundColor: '#30363d', color: '#2ecc71', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Yeni</button>
                </>
              ) : (
                <>
                  <input placeholder="Kategori Adı..." value={newCatName} onChange={e => setNewCatName(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
                  <button onClick={handleAddNewCategory} style={{ padding: '0 15px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Ekle</button>
                  <button onClick={() => setIsAddingNewCat(false)} style={{ padding: '0 10px', backgroundColor: '#f85149', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>X</button>
                </>
              )}
            </div>

            <label style={{ fontSize: '12px', color: '#8b949e' }}>Birim (kg, Adet...)</label>
            <input value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#30363d', color: 'white', border: 'none', cursor: 'pointer' }}>İptal</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Ürünü Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}