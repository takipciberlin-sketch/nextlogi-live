import React, { useState, useEffect } from "react";

export default function NextLogiUltraSecure() {
  // PDF'DEN GELEN TÜM ÜRÜNLER - SİLİNMEZ SABİT LİSTE
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

  // HAFIZA YÖNETİMİ
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_v10_prod");
    return saved ? JSON.parse(saved) : fullInventory;
  });

  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem("nl_v10_cats");
    return saved ? JSON.parse(saved) : defaultCats;
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_v10_qty");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [newCatInput, setNewCatInput] = useState("");
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  useEffect(() => {
    localStorage.setItem("nl_v10_prod", JSON.stringify(products));
    localStorage.setItem("nl_v10_cats", JSON.stringify(categories));
    localStorage.setItem("nl_v10_qty", JSON.stringify(quantities));
  }, [products, categories, quantities]);

  // FONKSİYONLAR
  const handleDeleteCategory = () => {
    if (categories.length > 1) {
      const updated = categories.filter(c => c !== formData.cat);
      setCategories(updated);
      setFormData({ ...formData, cat: updated[0] });
    }
  };

  const handleSaveProduct = () => {
    if (formData.name.trim()) {
      setProducts([...products, { ...formData, id: Date.now() }]);
      setIsModalOpen(false);
      setFormData({ name: "", cat: categories[0], unit: "kg" });
    }
  };

  const handleAddCat = () => {
    if (newCatInput.trim() && !categories.includes(newCatInput)) {
      setCategories([...categories, newCatInput.trim()]);
      setFormData({ ...formData, cat: newCatInput.trim() });
      setNewCatInput("");
      setIsAddingNewCat(false);
    }
  };

  const filteredProducts = activeCategory === "ALL" ? products : products.filter(p => p.cat === activeCategory);
  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL PANEL */}
      <div style={{ width: '220px', padding: '24px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71' }}>NEXTLOGI</h2>
        <div style={{ padding: '10px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', marginTop: '20px' }}>Ürünler</div>
      </div>

      {/* ORTA PANEL */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveCategory("ALL")} style={{ padding: '8px 15px', borderRadius: '20px', backgroundColor: activeCategory === "ALL" ? '#1a3a2a' : '#161b22', color: 'white', border: '1px solid #30363d', cursor: 'pointer' }}>ALL</button>
            {categories.map(c => (
              <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: '8px 15px', borderRadius: '20px', backgroundColor: activeCategory === c ? '#1a3a2a' : '#161b22', color: 'white', border: '1px solid #30363d', cursor: 'pointer' }}>{c}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', border: 'none', padding: '10px 20px', borderRadius: '25px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#161b22', borderRadius: '10px', marginBottom: '10px' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{p.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.cat} • {p.unit}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '30px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d' }}>-</button>
              <span>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '30px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (TAMAMLA BUTONU BURADA) */}
      <div style={{ width: '340px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ marginBottom: '20px' }}>🛒 Sipariş Özeti</h3>
        <div style={{ flex: 1 }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ padding: '10px', backgroundColor: '#161b22', marginBottom: '8px', borderRadius: '8px' }}>
              {item.name} - {quantities[item.id]} {item.unit}
            </div>
          ))}
        </div>
        {/* BUTON HER ZAMAN GÖRÜNÜR */}
        <button style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          SİPARİŞİ TAMAMLA ({activeItems.length})
        </button>
      </div>

      {/* MODAL (SİL VE EKLE BUTONLARIYLA) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ backgroundColor: '#161b22', padding: '25px', borderRadius: '15px', width: '380px' }}>
            <h4>Ürün Ekle</h4>
            <input placeholder="Ürün Adı" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '15px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d' }} />
            
            <div style={{ display: 'flex', gap: '5px', marginBottom: '15px' }}>
              {!isAddingNewCat ? (
                <>
                  <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ flex: 1, padding: '10px', backgroundColor: '#0d1117', color: 'white' }}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <button onClick={handleDeleteCategory} style={{ backgroundColor: '#f85149', color: 'white', border: 'none', padding: '0 10px', borderRadius: '5px' }}>Sil</button>
                  <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: '#2ecc71', border: 'none', padding: '0 10px', borderRadius: '5px' }}>+ Yeni</button>
                </>
              ) : (
                <>
                  <input placeholder="Yeni Kategori" value={newCatInput} onChange={e => setNewCatInput(e.target.value)} style={{ flex: 1, padding: '10px', backgroundColor: '#0d1117', color: 'white' }} />
                  <button onClick={handleAddCat} style={{ backgroundColor: '#2ecc71', padding: '0 10px', border: 'none' }}>Ekle</button>
                </>
              )}
            </div>

            <input placeholder="Birim (kg...)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '15px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d' }} />

            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '10px' }}>İptal</button>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '10px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}