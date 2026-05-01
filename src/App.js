import React, { useState, useEffect } from "react";

/**
 * NEXTLOGI - FULL STABIL VERSİYON
 * - PDF Ürünleri Sabitlendi
 * - Düzenleme Modu Aktif
 * - Kategori Silme/Ekleme Aktif
 * - Sepet ve Tamamla Butonu Sabit
 */
export default function NextLogiFinal() {
  // 1. PDF'DEN GELEN TAM LİSTE (SİSTEMİN TEMELİ)
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
    { id: 56, name: "Pute ganz", cat: "Pute", unit: "kg" },
    { id: 57, name: "Wiener Geflügel", cat: "Geflügel", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  const defaultCats = ["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];

  // 2. STATE YÖNETİMİ
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_prod_v11");
    return saved ? JSON.parse(saved) : fullInventory;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_cat_v11");
    return saved ? JSON.parse(saved) : defaultCats;
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_qty_v11");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");
  const [editingId, setEditingId] = useState(null); 
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  // OTOMATİK KAYIT
  useEffect(() => {
    localStorage.setItem("nl_prod_v11", JSON.stringify(products));
    localStorage.setItem("nl_cat_v11", JSON.stringify(categories));
    localStorage.setItem("nl_qty_v11", JSON.stringify(quantities));
  }, [products, categories, quantities]);

  // 3. FONKSİYONLAR
  const openEdit = (product) => {
    setEditingId(product.id);
    setFormData({ name: product.name, cat: product.cat, unit: product.unit });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) return;
    if (editingId) {
      setProducts(products.map(p => p.id === editingId ? { ...formData, id: editingId } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDeleteCat = () => {
    if (categories.length > 1) {
      const newCats = categories.filter(c => c !== formData.cat);
      setCategories(newCats);
      setFormData({ ...formData, cat: newCats[0] });
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
      <div style={{ width: '240px', padding: '24px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71', margin: '0 0 40px 0' }}>NEXTLOGI</h2>
        <div style={{ padding: '12px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', fontWeight: 'bold' }}>🛒 Sipariş Ekranı</div>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveCategory("ALL")} style={{ padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', backgroundColor: activeCategory === "ALL" ? '#1a3a2a' : '#161b22', color: 'white', border: '1px solid #30363d' }}>ALL</button>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: '10px 20px', borderRadius: '20px', cursor: 'pointer', backgroundColor: activeCategory === c ? '#1a3a2a' : '#161b22', color: 'white', border: '1px solid #30363d' }}>{c}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '12px 25px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>+ YENİ ÜRÜN</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '18px 24px', borderRadius: '12px', marginBottom: '12px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => openEdit(p)} style={{ backgroundColor: '#30363d', color: '#c9d1d9', border: 'none', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px' }}>Düzenle</button>
              <div>
                <div style={{ fontWeight: 'bold', color: '#f0f6fc' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.cat} • {p.unit}</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>-</button>
              <span style={{ fontWeight: 'bold', minWidth: '24px', textAlign: 'center' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL - SEPET VE TAMAMLA */}
      <div style={{ width: '360px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '25px' }}>🛒 Sipariş Özeti</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '15px', borderRadius: '10px', marginBottom: '10px', borderLeft: '4px solid #2ecc71' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>{item.cat} • {quantities[item.id]} {item.unit}</div>
            </div>
          ))}
        </div>
        <button style={{ width: '100%', padding: '18px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
          SİPARİŞİ TAMAMLA ({activeItems.length})
        </button>
      </div>

      {/* MODAL - DÜZENLEME & EKLEME */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '400px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0 }}>{editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>
            <input placeholder="Ürün Adı" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '8px' }} />
            
            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              {!isAddingNewCat ? (
                <>
                  <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', color: 'white', borderRadius: '8px' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={handleDeleteCat} style={{ backgroundColor: '#f85149', color: 'white', border: 'none', padding: '0 12px', borderRadius: '8px', cursor: 'pointer' }}>Sil</button>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: '#2ecc71', border: 'none', padding: '0 12px', borderRadius: '8px', cursor: 'pointer' }}>+Yeni</button>
                </>
              ) : (
                <>
                  <input placeholder="Yeni Kategori..." value={newCatInput} onChange={e => setNewCatInput(e.target.value)} style={{ flex: 1, padding: '12px', backgroundColor: '#0d1117', color: 'white', borderRadius: '8px' }} />
                  <button onClick={() => { if(newCatInput){ setCategories([...categories, newCatInput]); setFormData({...formData, cat: newCatInput}); setIsAddingNewCat(false); setNewCatInput(""); } }} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '0 15px', borderRadius: '8px', cursor: 'pointer' }}>Ekle</button>
                </>
              )}
            </div>

            <input placeholder="Birim (kg, Adet...)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '25px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '8px' }} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '14px', backgroundColor: '#30363d', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>İptal</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '14px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none', borderRadius: '10px', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}