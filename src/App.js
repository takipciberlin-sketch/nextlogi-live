import React, { useState, useEffect } from "react";

export default function NextLogiFullFix() {
  // PDF'den gelen tam liste
  const initialInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg" },
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("nl_inv_v3");
    return saved ? JSON.parse(saved) : initialInventory;
  });

  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_qty_v3");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({ name: "", cat: "Rind/Bulle", unit: "kg" });

  useEffect(() => {
    localStorage.setItem("nl_inv_v3", JSON.stringify(products));
    localStorage.setItem("nl_qty_v3", JSON.stringify(quantities));
  }, [products, quantities]);

  const handleSave = () => {
    if (!formData.name) return;
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...formData, id: p.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    closeModal();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", cat: "Rind/Bulle", unit: "kg" });
  };

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  // SEPETTE GÖRÜNECEK ÜRÜNLER (Miktarı 0'dan büyük olanlar)
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
          <div style={{ display: 'flex', gap: '8px' }}>
            {["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"].map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '8px 16px', borderRadius: '20px', cursor: 'pointer',
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: activeCategory === cat ? '1px solid #2ecc71' : '1px solid #30363d'
              }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '16px 20px', borderRadius: '12px', marginBottom: '10px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* DÜZENLEME BUTONU */}
              <button onClick={() => { setEditingProduct(p); setFormData(p); setIsModalOpen(true); }} style={{ backgroundColor: '#30363d', color: '#8b949e', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '11px' }}>Düzenle</button>
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

      {/* SAĞ PANEL - SEPET (GÜNCELLENDİ)[cite: 1] */}
      <div style={{ width: '340px', padding: '24px', backgroundColor: '#0d1117', borderLeft: '1px solid #161b22', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>🛒 Sipariş Özeti</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '16px', borderRadius: '12px', marginBottom: '10px', borderLeft: '4px solid #2ecc71' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f0f6fc' }}>{item.name}</div>
              {/* Kategori ve Birim Eklendi[cite: 1] */}
              <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>
                {item.cat} • {quantities[item.id]} {item.unit}
              </div>
            </div>
          ))}
        </div>
        {activeItems.length > 0 && (
          <button onClick={() => alert("Sipariş Tamamlandı!")} style={{ width: '100%', padding: '16px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>
            SİPARİŞİ TAMAMLA
          </button>
        )}
      </div>

      {/* MODAL (ÜRÜN EKLE/DÜZENLE)[cite: 1] */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '20px', width: '380px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0 }}>{editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</h3>
            <input placeholder="Ürün Adı" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
            <select value={formData.cat} onChange={e => setFormData({...formData, cat: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '15px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }}>
              {["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <input placeholder="Birim (kg, Adet, Koli)" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})} style={{ width: '100%', padding: '12px', marginBottom: '20px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '8px' }} />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={closeModal} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#30363d', color: 'white' }}>İptal</button>
              <button onClick={handleSave} style={{ flex: 1, padding: '12px', borderRadius: '8px', backgroundColor: '#2ecc71', color: '#090d11', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}