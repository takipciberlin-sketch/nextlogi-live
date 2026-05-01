import React, { useState, useEffect } from "react";

export default function NextLogiSystemLocked() {
  // Sabit Ürün Listesi
  const fullInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", unit: "kg" },
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg" },
    { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", unit: "kg" },
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg" },
    { id: 55, name: "Puten-Oberkeule", cat: "Pute", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  const defaultCats = ["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_locked_inv");
    return saved ? JSON.parse(saved) : fullInventory;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_locked_cats");
    return saved ? JSON.parse(saved) : defaultCats;
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_locked_qty");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  useEffect(() => {
    localStorage.setItem("nl_locked_inv", JSON.stringify(products));
    localStorage.setItem("nl_locked_cats", JSON.stringify(categories));
    localStorage.setItem("nl_locked_qty", JSON.stringify(quantities));
  }, [products, categories, quantities]);

  // KATEGORİ SİLME FONKSİYONU
  const handleDeleteCategory = () => {
    if (categories.length <= 1) {
      alert("En az bir kategori kalmalıdır.");
      return;
    }
    const categoryToDelete = formData.cat;
    const updatedCats = categories.filter(c => c !== categoryToDelete);
    setCategories(updatedCats);
    setFormData({ ...formData, cat: updatedCats[0] }); // Silinince ilk kategoriyi seç
  };

  const handleSaveProduct = () => {
    if (!formData.name.trim()) return;
    setProducts([...products, { ...formData, id: Date.now() }]);
    closeModal();
  };

  const handleCreateCategory = () => {
    if (newCatInput.trim() && !categories.includes(newCatInput)) {
      setCategories([...categories, newCatInput.trim()]);
      setFormData({ ...formData, cat: newCatInput.trim() });
      setNewCatInput("");
      setIsAddingNewCat(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddingNewCat(false);
    setFormData({ name: "", cat: categories[0], unit: "kg" });
  };

  const filteredProducts = activeCategory === "ALL" ? products : products.filter(p => p.cat === activeCategory);
  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL NAV */}
      <div style={{ width: '240px', padding: '24px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71', fontSize: '22px', marginBottom: '40px' }}>NEXTLOGI</h2>
        <div style={{ padding: '12px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', fontWeight: 'bold' }}>🛒 Ürünler & Sipariş</div>
      </div>

      {/* ANA LİSTE */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveCategory("ALL")} style={{ padding: '10px 18px', borderRadius: '20px', cursor: 'pointer', backgroundColor: activeCategory === "ALL" ? '#1a3a2a' : '#161b22', color: activeCategory === "ALL" ? '#4ade80' : '#8b949e', border: activeCategory === "ALL" ? '1px solid #2ecc71' : '1px solid #30363d' }}>ALL</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding: '10px 18px', borderRadius: '20px', cursor: 'pointer', backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22', color: activeCategory === cat ? '#4ade80' : '#8b949e', border: activeCategory === cat ? '1px solid #2ecc71' : '1px solid #30363d' }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '18px 24px', borderRadius: '12px', marginBottom: '12px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: '600' }}>{p.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.cat} • {p.unit}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SEPET */}
      <div style={{ width: '360px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22' }}>
        <h3>🛒 Sipariş Özeti</h3>
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '15px', borderRadius: '10px', marginBottom: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '12px', color: '#8b949e' }}>{item.cat} • {quantities[item.id]} {item.unit}</div>
          </div>
        ))}
      </div>

      {/* MODAL - KATEGORİ SİLME EKLENDİ */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '420px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0 }}>Yeni Ürün Ekle</h3>
            <input placeholder="Ürün Adı" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
            
            <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '5px', display: 'block' }}>Kategori Yönetimi</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {!isAddingNewCat ? (
                <>
                  <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {/* SİLME BUTONU */}
                  <button onClick={handleDeleteCategory} title="Seçili Kategoriyi Sil" style={{ backgroundColor: '#f85149', color: 'white', border: 'none', borderRadius: '8px', padding: '0 12px', cursor: 'pointer' }}>Sil</button>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: '#2ecc71', border: 'none', borderRadius: '8px', padding: '0 12px', cursor: 'pointer', fontWeight: 'bold' }}>+ Yeni</button>
                </>
              ) : (
                <>
                  <input placeholder="Yeni Kategori..." value={newCatInput} onChange={e => setNewCatInput(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
                  <button onClick={handleCreateCategory} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '8px', padding: '0 15px', cursor: 'pointer', fontWeight: 'bold' }}>Ekle</button>
                </>
              )}
            </div>

            <input placeholder="Birim (kg...)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '25px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '14px', backgroundColor: '#30363d', border: 'none', color: 'white', borderRadius: '10px', cursor: 'pointer' }}>İptal</button>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '14px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}