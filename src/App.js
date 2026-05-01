import React, { useState, useEffect } from "react";

export default function NextLogiSystemFixed() {
  // 1. PDF ÜRÜN LİSTESİ (SABİT)
  const fullInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", unit: "kg" },
    { id: 45, name: "Kalbs-Keule", cat: "Kalb", unit: "kg" },
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg" },
    { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", unit: "kg" },
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  const defaultCats = ["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];

  // STATE VE LOCALSTORAGE
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_vFinal_prod");
    return saved ? JSON.parse(saved) : fullInventory;
  });
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_vFinal_cats");
    return saved ? JSON.parse(saved) : defaultCats;
  });
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_vFinal_qty");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  useEffect(() => {
    localStorage.setItem("nl_vFinal_prod", JSON.stringify(products));
    localStorage.setItem("nl_vFinal_cats", JSON.stringify(categories));
    localStorage.setItem("nl_vFinal_qty", JSON.stringify(quantities));
  }, [products, categories, quantities]);

  // AKSİYONLAR
  const handleSave = () => {
    if (!formData.name.trim()) return;
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleAddNewCategory = () => {
    if (newCatInput.trim() && !categories.includes(newCatInput)) {
      setCategories([...categories, newCatInput.trim()]);
      setFormData({ ...formData, cat: newCatInput.trim() });
      setNewCatInput("");
      setIsAddingNewCat(false);
    }
  };

  const handleDeleteCategory = () => {
    if (categories.length > 1) {
      const updated = categories.filter(c => c !== formData.cat);
      setCategories(updated);
      setFormData({ ...formData, cat: updated[0] });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setIsAddingNewCat(false);
    setFormData({ name: "", cat: categories[0], unit: "kg" });
  };

  const filteredProducts = activeCategory === "ALL" ? products : products.filter(p => p.cat === activeCategory);
  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL NAV */}
      <div style={{ width: '220px', padding: '24px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71', marginBottom: '30px' }}>NEXTLOGI</h2>
        <div style={{ padding: '12px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', fontWeight: 'bold' }}>Ürün Listesi</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveCategory("ALL")} style={{ padding: '10px 18px', borderRadius: '20px', backgroundColor: activeCategory === "ALL" ? '#1a3a2a' : '#161b22', color: 'white', border: '1px solid #30363d', cursor: 'pointer' }}>ALL</button>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: '10px 18px', borderRadius: '20px', backgroundColor: activeCategory === c ? '#1a3a2a' : '#161b22', color: 'white', border: '1px solid #30363d', cursor: 'pointer' }}>{c}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#0d1117', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '12px', marginBottom: '10px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => { setEditingId(p.id); setFormData(p); setIsModalOpen(true); }} style={{ backgroundColor: '#30363d', color: '#8b949e', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>Düzenle</button>
              <div>
                <div style={{ fontWeight: 'bold' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.cat} • {p.unit}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (TAMAMLA BUTONU) */}
      <div style={{ width: '320px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '20px' }}>🛒 Sipariş Detayı</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '8px', marginBottom: '8px' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#2ecc71' }}>{quantities[item.id]} {item.unit}</div>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#0d1117', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px' }}>
          SİPARİŞİ TAMAMLA ({activeItems.length})
        </button>
      </div>

      {/* MODAL - DÜZELTİLEN BÖLÜM */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '400px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0 }}>{editingId ? "Ürünü Düzenle" : "Yeni Ürün"}</h3>
            <input placeholder="Ürün Adı" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '8px' }} />
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {!isAddingNewCat ? (
                <>
                  <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', color: 'white', borderRadius: '8px', border: '1px solid #30363d' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={handleDeleteCategory} style={{ backgroundColor: '#f85149', color: 'white', border: 'none', borderRadius: '8px', padding: '0 15px', cursor: 'pointer', fontWeight: 'bold' }}>Sil</button>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: '#2ecc71', border: 'none', borderRadius: '8px', padding: '0 15px', cursor: 'pointer', fontWeight: 'bold' }}>+Yeni</button>
                </>
              ) : (
                <>
                  <input autoFocus placeholder="Yeni Kategori..." value={newCatInput} onChange={e => setNewCatInput(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', color: 'white', borderRadius: '8px', border: '1px solid #30363d' }} />
                  <button onClick={handleAddNewCategory} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '0 15px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Ekle</button>
                  <button onClick={() => setIsAddingNewCat(false)} style={{ backgroundColor: '#30363d', color: 'white', border: 'none', borderRadius: '8px', padding: '0 10px', cursor: 'pointer' }}>x</button>
                </>
              )}
            </div>

            <input placeholder="Birim (kg, Adet...)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '25px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '8px' }} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '14px', backgroundColor: 'transparent', color: '#8b949e', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>İptal</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '14px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}