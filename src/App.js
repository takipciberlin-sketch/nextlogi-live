import React, { useState, useEffect } from "react";

/**
 * NEXTLOGI - Kilitli ve Stabil Versiyon
 * Özellikler: Ürün Ekle (Dinamik Kategori ile), Düzenle Modu, 
 * Tam Sepet Detayları (Birim + Kategori), Kalıcı Hafıza.
 */
export default function NextLogiLocked() {
  // 1. SABİT BAŞLANGIÇ VERİLERİ (Sistem boş kalmasın diye)[cite: 1]
  const defaultInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg" }
  ];

  const defaultCats = ["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];

  // 2. STATE YÖNETİMİ (Kilitli Hafıza)[cite: 1]
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nextlogi_prod_final");
    return saved ? JSON.parse(saved) : defaultInventory;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nextlogi_cats_final");
    return saved ? JSON.parse(saved) : defaultCats;
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nextlogi_qty_final");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");
  
  // Hem Ekleme hem Düzenleme için ortak form[cite: 1]
  const [editingId, setEditingId] = useState(null); 
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  // 3. OTOMATİK KAYIT SİSTEMİ (LocalStorage)[cite: 1]
  useEffect(() => {
    localStorage.setItem("nextlogi_prod_final", JSON.stringify(products));
    localStorage.setItem("nextlogi_cats_final", JSON.stringify(categories));
    localStorage.setItem("nextlogi_qty_final", JSON.stringify(quantities));
  }, [products, categories, quantities]);

  // 4. AKSİYONLAR[cite: 1]
  const handleSaveProduct = () => {
    if (!formData.name.trim()) return;

    if (editingId) {
      // Düzenleme modundaysak mevcut ürünü güncelle[cite: 1]
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      // Yeni ürün ekle[cite: 1]
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleCreateCategory = () => {
    const trimmed = newCatInput.trim();
    if (trimmed && !categories.includes(trimmed)) {
      setCategories([...categories, trimmed]);
      setFormData({ ...formData, cat: trimmed });
      setNewCatInput("");
      setIsAddingNewCat(false);
    }
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, cat: product.cat, unit: product.unit });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setIsAddingNewCat(false);
    setFormData({ name: "", cat: categories[0], unit: "kg" });
  };

  // 5. FİLTRELEME VE SEPET HESABI[cite: 1]
  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif', overflow: 'hidden' }}>
      
      {/* SOL NAV - SABİT */}
      <div style={{ width: '240px', padding: '24px', borderRight: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ color: '#2ecc71', fontSize: '22px', margin: '0 0 40px 0' }}>NEXTLOGI</h2>
        <div style={{ padding: '12px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', fontWeight: 'bold' }}>
          🛒 Ürünler & Sipariş
        </div>
      </div>

      {/* ANA PANEL - ÜRÜN LİSTESİ */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => setActiveCategory("ALL")}
              style={{
                padding: '10px 20px', borderRadius: '20px', cursor: 'pointer',
                backgroundColor: activeCategory === "ALL" ? '#1a3a2a' : '#161b22',
                color: activeCategory === "ALL" ? '#4ade80' : '#8b949e',
                border: activeCategory === "ALL" ? '1px solid #2ecc71' : '1px solid #30363d'
              }}
            >ALL</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '10px 20px', borderRadius: '20px', cursor: 'pointer',
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: activeCategory === cat ? '1px solid #2ecc71' : '1px solid #30363d'
              }}>{cat}</button>
            ))}
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 14px rgba(46, 204, 113, 0.3)' }}
          >+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '18px 24px', borderRadius: '12px', marginBottom: '12px', transition: '0.2s', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <button 
                onClick={() => openEdit(p)}
                style={{ backgroundColor: '#30363d', color: '#c9d1d9', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}
              >Düzenle</button>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#f0f6fc' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '2px' }}>{p.cat} • {p.unit}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', minWidth: '24px', textAlign: 'center', color: quantities[p.id] > 0 ? '#2ecc71' : 'white' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL - SEPET (Birim ve Kategori Kilitlemeli)[cite: 1] */}
      <div style={{ width: '360px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>🛒 Sipariş Özeti</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '16px', borderRadius: '12px', marginBottom: '10px', borderLeft: '4px solid #2ecc71' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '6px' }}>
                <span style={{ color: '#2ecc71' }}>{item.cat}</span> • {quantities[item.id]} {item.unit}
              </div>
            </div>
          ))}
          {activeItems.length === 0 && <div style={{ textAlign: 'center', color: '#484f58', marginTop: '40px' }}>Henüz ürün seçilmedi.</div>}
        </div>
        {activeItems.length > 0 && (
          <button style={{ width: '100%', padding: '18px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '20px' }}>
            SİPARİŞİ TAMAMLA
          </button>
        )}
      </div>

      {/* ÜRÜN EKLE/DÜZENLE MODAL (Kategori Ekleme Özellikli)[cite: 1] */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '420px', border: '1px solid #30363d', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '25px' }}>{editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>
            
            <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '5px', display: 'block' }}>Ürün Adı</label>
            <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', outline: 'none' }} />

            <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '5px', display: 'block' }}>Kategori</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {!isAddingNewCat ? (
                <>
                  <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', cursor: 'pointer' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ padding: '0 15px', backgroundColor: '#30363d', color: '#2ecc71', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>+ Yeni</button>
                </>
              ) : (
                <>
                  <input placeholder="Kategori ismi..." value={newCatInput} onChange={e => setNewCatInput(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', outline: 'none' }} />
                  <button onClick={handleCreateCategory} style={{ padding: '0 15px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Ekle</button>
                  <button onClick={() => setIsAddingNewCat(false)} style={{ padding: '0 12px', backgroundColor: '#f85149', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>X</button>
                </>
              )}
            </div>

            <label style={{ fontSize: '12px', color: '#8b949e', marginBottom: '5px', display: 'block' }}>Birim (kg, Adet, Koli...)</label>
            <input value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '25px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px', outline: 'none' }} />

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '14px', borderRadius: '10px', backgroundColor: '#30363d', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>İptal</button>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '14px', borderRadius: '10px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}