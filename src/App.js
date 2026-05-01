import React, { useState, useEffect } from "react";

export default function NextLogiPro() {
  // PDF'DEN GELEN TAM LİSTE - TÜM KATEGORİLER DOLU
  const fullInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 3, name: "Rinder-Nacken", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 32, name: "Hähnchen-Unterkeule", cat: "Hähnchen", unit: "kg" },
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg" },
    { id: 53, name: "Lamm-Kopf gebrannt", cat: "Lamm", unit: "kg" },
    // PUTE KATEGORİSİ ŞİMDİ DOLU[cite: 1]
    { id: 54, name: "Puten-Flügel-Fleisch", cat: "Pute", unit: "kg" },
    { id: 55, name: "Puten-Oberkeule", cat: "Pute", unit: "kg" },
    { id: 56, name: "Pute ganz", cat: "Pute", unit: "kg" },
    { id: 57, name: "Wiener Geflügel", cat: "Geflügel", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  const [products] = useState(fullInventory);
  const [categories] = useState(["ALL", "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"]);
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nl_quantities_final");
    return saved ? JSON.parse(saved) : {};
  });
  const [activeCategory, setActiveCategory] = useState("ALL");

  useEffect(() => {
    localStorage.setItem("nl_quantities_final", JSON.stringify(quantities));
  }, [quantities]);

  const filteredProducts = activeCategory === "ALL" 
    ? products 
    : products.filter(p => p.cat === activeCategory);

  const activeItems = products.filter(p => quantities[p.id] > 0);

  const handleOrderComplete = () => {
    const orderText = activeItems.map(i => `${i.name}: ${quantities[i.id]} ${i.unit}`).join('\n');
    alert("Sipariş Hazır:\n\n" + orderText);
    // Buraya WhatsApp yönlendirmesi de eklenebilir
  };

  return (
    <div style={{ display: 'flex', backgroundColor: '#090d11', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* SOL BAR */}
      <div style={{ width: '240px', padding: '24px', borderRight: '1px solid #161b22' }}>
        <h2 style={{ color: '#2ecc71', fontSize: '22px', letterSpacing: '-1px' }}>NEXTLOGI</h2>
        <div style={{ marginTop: '40px', padding: '12px', backgroundColor: '#1a3a2a', color: '#4ade80', borderRadius: '8px', fontWeight: 'bold' }}>
          Ürünler & Sipariş
        </div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} style={{
                padding: '10px 18px', borderRadius: '20px', cursor: 'pointer',
                backgroundColor: activeCategory === cat ? '#1a3a2a' : '#161b22',
                color: activeCategory === cat ? '#4ade80' : '#8b949e',
                border: activeCategory === cat ? '1px solid #2ecc71' : '1px solid #30363d',
                fontSize: '12px', fontWeight: '600'
              }}>{cat}</button>
            ))}
          </div>
          <button style={{ backgroundColor: '#2ecc71', color: '#090d11', border: 'none', padding: '12px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>+ ÜRÜN EKLE</button>
        </div>

        {/* ÜRÜN KARTLARI */}
        <div style={{ display: 'grid', gap: '12px' }}>
          {filteredProducts.length > 0 ? filteredProducts.map(p => (
            <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '16px 24px', borderRadius: '12px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '500' }}>{p.name}</div>
                <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.cat} • {p.unit}</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>-</button>
                <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold', color: quantities[p.id] > 0 ? '#2ecc71' : 'white' }}>{quantities[p.id] || 0}</span>
                <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', cursor: 'pointer' }}>+</button>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '100px', color: '#8b949e' }}>Seçili kategoride ürün bulunamadı.</div>
          )}
        </div>
      </div>

      {/* SAĞ PANEL - SİPARİŞ ÖZETİ VE TAMAMLA[cite: 1] */}
      <div style={{ width: '360px', padding: '24px', borderLeft: '1px solid #161b22', backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '24px' }}>🛒 Sipariş Özeti</h3>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {activeItems.map(item => (
            <div key={item.id} style={{ backgroundColor: '#161b22', padding: '14px', borderRadius: '12px', marginBottom: '10px', borderLeft: '4px solid #2ecc71' }}>
              <div style={{ fontSize: '14px', fontWeight: '600' }}>{item.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e', marginTop: '4px' }}>{quantities[item.id]} {item.unit}</div>
            </div>
          ))}
          {activeItems.length === 0 && <div style={{ color: '#484f58', textAlign: 'center', marginTop: '40px' }}>Henüz ürün seçmediniz.</div>}
        </div>

        {/* EKSİK OLAN TAMAMLA BUTONU BURADA[cite: 1] */}
        {activeItems.length > 0 && (
          <div style={{ paddingTop: '20px', borderTop: '1px solid #30363d' }}>
            <button 
              onClick={handleOrderComplete}
              style={{ width: '100%', padding: '16px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
            >
              SİPARİŞİ TAMAMLA
            </button>
            <button 
              onClick={() => setQuantities({})}
              style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', color: '#f85149', border: 'none', marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}
            >
              Listeyi Temizle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}