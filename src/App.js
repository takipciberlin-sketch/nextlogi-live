import React, { useState } from "react";

export default function NextLogiPro() {
  const [quantities, setQuantities] = useState({});
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Ürün ve Kategori State'leri[cite: 1]
  const [categories, setCategories] = useState(["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"]);
  const [products, setProducts] = useState([
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg", color: "#e67e22" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg", color: "#f1c40f" }
  ]);

  // Yeni Ürün Form State
  const [newProdName, setNewProdName] = useState("");
  const [newProdCat, setNewProdCat] = useState("Rind/Bulle");
  const [newProdUnit, setNewProdUnit] = useState("kg");
  const [isAddingNewCat, setIsAddingNewCat] = useState(false);
  const [tempCatName, setTempCatName] = useState("");

  const units = ["kg", "Adet", "Koli", "Gram"];

  const handleSaveProduct = () => {
    if (!newProdName) return;
    
    const newEntry = {
      id: Date.now(),
      name: newProdName,
      cat: newProdCat,
      unit: newProdUnit,
      color: "#95a5a6"
    };
    
    setProducts([...products, newEntry]);
    setIsModalOpen(false);
    setNewProdName("");
  };

  const handleAddNewCategory = () => {
    if (tempCatName && !categories.includes(tempCatName)) {
      setCategories([...categories, tempCatName]);
      setNewProdCat(tempCatName);
      setIsAddingNewCat(false);
      setTempCatName("");
    }
  };

  const filteredProducts = activeCategory === "ALL" ? products : products.filter(p => p.cat === activeCategory);
  const activeItems = products.filter(p => (quantities[p.id] || 0) > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL NAV */}
      <div style={{ width: '200px', padding: '20px', borderRight: '1px solid #161b22' }}>
        <h3 style={{ color: '#2ecc71', marginBottom: '30px' }}>NEXTLOGI</h3>
        <div style={{ backgroundColor: '#1a3a2a', color: '#4ade80', padding: '12px', borderRadius: '8px', fontWeight: 'bold' }}>Ürünler & Sipariş</div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: `1px solid ${activeCategory === cat ? '#2ecc71' : '#30363d'}`,
                padding: '8px 15px', borderRadius: '20px', fontSize: '11px', cursor: 'pointer'
              }}>{cat}</button>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '8px 20px', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {filteredProducts.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '15px 20px', borderRadius: '8px', marginBottom: '10px' }}>
            <div>
              <div style={{ fontSize: '14px' }}>{p.name}</div>
              <div style={{ fontSize: '10px', color: '#8b949e' }}>{p.cat} ({p.unit})</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '32px', height: '32px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white' }}>-</button>
              <span>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '32px', height: '32px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL (Pop-up) */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '15px', width: '400px', border: '1px solid #30363d' }}>
            <h3 style={{ marginTop: 0, color: '#f0f6fc' }}>Yeni Ürün Tanımla</h3>
            
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#8b949e' }}>Ürün İsmi</label>
            <input value={newProdName} onChange={(e) => setNewProdName(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', marginBottom: '15px', boxSizing: 'border-box' }} />

            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#8b949e' }}>Birim Seçin</label>
            <select value={newProdUnit} onChange={(e) => setNewProdUnit(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', marginBottom: '15px' }}>
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            <label style={{ display: 'block', fontSize: '12px', marginBottom: '5px', color: '#8b949e' }}>Kategori</label>
            {!isAddingNewCat ? (
              <div style={{ display: 'flex', gap: '5px' }}>
                <select value={newProdCat} onChange={(e) => setNewProdCat(e.target.value)} style={{ flex: 1, padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px' }}>
                  {categories.filter(c => c !== "ALL").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setIsAddingNewCat(true)} style={{ backgroundColor: '#30363d', color: 'white', border: 'none', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>+</button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '5px' }}>
                <input placeholder="Yeni Kategori..." value={tempCatName} onChange={(e) => setTempCatName(e.target.value)} style={{ flex: 1, padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px' }} />
                <button onClick={handleAddNewCategory} style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '0 15px', borderRadius: '6px', cursor: 'pointer' }}>Ekle</button>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '25px' }}>
              <button onClick={() => setIsModalOpen(false)} style={{ flex: 1, padding: '12px', backgroundColor: 'transparent', color: '#8b949e', border: '1px solid #30363d', borderRadius: '8px', cursor: 'pointer' }}>Vazgeç</button>
              <button onClick={handleSaveProduct} style={{ flex: 1, padding: '12px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Kaydet</button>
            </div>
          </div>
        </div>
      )}

      {/* SAĞ PANEL (Sipariş Özeti) */}
      <div style={{ width: '320px', padding: '20px', borderLeft: '1px solid #161b22' }}>
        <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '20px' }}>🛒 Sipariş Özeti</div>
        {activeItems.map(item => (
          <div key={item.id} style={{ backgroundColor: '#161b22', padding: '12px', borderRadius: '10px', marginBottom: '10px', borderLeft: `4px solid ${item.color}` }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
            <div style={{ fontSize: '11px', color: '#8b949e' }}>{quantities[item.id]} {item.unit}</div>
          </div>
        ))}
      </div>
    </div>
  );
}