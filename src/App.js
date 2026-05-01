import React, { useState, useEffect } from "react";

const CATEGORIES = [
  { id: 'all', name: 'Tümü', count: 62, color: '#2ecc71' },
  { id: 'rind', name: 'Rind/Bulle', count: 30, color: '#e67e22' },
  { id: 'hahn', name: 'Hähnchen', count: 17, color: '#f1c40f' },
  { id: 'kalb', name: 'Kalb', count: 5, color: '#3498db' }
];

const PRODUCTS = [
  { id: 1, cat: 'rind', name: "Bullen-Vorderviertel ohne Knochen", unit: "kg" },
  { id: 2, cat: 'rind', name: "Bullen-Keule mit Knochen", unit: "kg" },
  { id: 3, cat: 'rind', name: "Rinder-Nacken", unit: "kg" },
  { id: 4, cat: 'rind', name: "Bullen-Bug", unit: "kg" }
];

export default function NextLogiPro() {
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nextlogi_pro_cart");
    return saved ? JSON.parse(saved) : {};
  });
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("nextlogi_pro_cart", JSON.stringify(quantities));
  }, [quantities]);

  const cartItems = PRODUCTS.filter(p => quantities[p.id] > 0);
  const totalWeight = cartItems.reduce((sum, p) => sum + (Number(quantities[p.id]) * 8), 0); // Örnek ağırlık hesabı

  return (
    <div style={{ display: 'flex', backgroundColor: '#0d1117', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL MENÜ */}
      <div style={{ width: '220px', backgroundColor: '#161b22', borderRight: '1px solid #30363d', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#2ecc71', fontSize: '18px', fontWeight: 'bold', marginBottom: '30px' }}>NEXTLOGI</h1>
        {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler', 'Ürünler & Sipariş'].map(item => (
          <div key={item} style={{ padding: '12px', borderRadius: '8px', cursor: 'pointer', backgroundColor: item === 'Ürünler & Sipariş' ? '#1f6745' : 'transparent', color: item === 'Ürünler & Sipariş' ? 'white' : '#8b949e', marginBottom: '5px' }}>{item}</div>
        ))}
        <div style={{ marginTop: 'auto', padding: '15px', backgroundColor: '#0d1117', borderRadius: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold' }}>Klaus Müller</div>
          <div style={{ fontSize: '10px', color: '#8b949e' }}>Müller GmbH</div>
        </div>
      </div>

      {/* ANA İÇERİK */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* HEADER */}
        <div style={{ padding: '15px 25px', borderBottom: '1px solid #30363d', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button style={{ background: '#21262d', border: '1px solid #30363d', color: 'white', padding: '8px 15px', borderRadius: '6px' }}>← Müşteri Değiştir</button>
          <div style={{ flex: 1, background: '#161b22', padding: '8px 15px', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', justifyContent: 'space-between' }}>
            <span>👤 Max Bauer GmbH</span>
            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>ADIM 2/2</span>
          </div>
          <button style={{ background: '#1f6feb', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px' }}>Yönetim</button>
        </div>

        {/* KATEGORİLER */}
        <div style={{ padding: '15px 25px', display: 'flex', gap: '10px' }}>
          {CATEGORIES.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#161b22', padding: '6px 12px', borderRadius: '20px', border: '1px solid #30363d', fontSize: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color }}></span>
              {c.name} <span style={{ color: '#484f58' }}>{c.count}</span>
            </div>
          ))}
        </div>

        {/* ÜRÜN LİSTESİ VE SEPET */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <div style={{ flex: 1, padding: '0 25px', overflowY: 'auto' }}>
            <div style={{ borderBottom: '1px solid #e67e22', color: '#e67e22', padding: '10px 0', marginBottom: '15px', fontWeight: 'bold', fontSize: '13px' }}>RIND/BULLE</div>
            {PRODUCTS.map(p => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#161b22', borderRadius: '12px', marginBottom: '8px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: quantities[p.id] > 0 ? '#2ecc71' : '#484f58' }}></span>
                  <span style={{ color: quantities[p.id] > 0 ? '#2ecc71' : 'white' }}>{p.name}</span>
                </div>
                <input 
                  type="number" value={quantities[p.id] || "0"} 
                  onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                  style={{ width: '60px', background: 'transparent', border: quantities[p.id] > 0 ? '2px solid #2ecc71' : '1px solid #30363d', color: 'white', textAlign: 'center', borderRadius: '8px' }}
                />
              </div>
            ))}
          </div>

          {/* SAĞ SEPET PANELİ */}
          <div style={{ width: '300px', background: '#161b22', borderLeft: '1px solid #30363d', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '14px' }}>🛒 Sipariş Özeti</h3>
              <span style={{ background: '#1f6745', color: '#aff5b4', padding: '2px 8px', borderRadius: '10px', fontSize: '10px' }}>{cartItems.length} kalem</span>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {cartItems.map(item => (
                <div key={item.id} style={{ padding: '12px', background: '#0d1117', borderRadius: '10px', marginBottom: '8px', borderLeft: '3px solid #e67e22', position: 'relative' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>{quantities[item.id]} {item.unit}</div>
                  <button onClick={() => setQuantities({...quantities, [item.id]: 0})} style={{ position: 'absolute', right: '10px', top: '10px', color: '#f85149', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                </div>
              ))}
              <div style={{ marginTop: '15px' }}>
                <div style={{ fontSize: '11px', color: '#8b949e', marginBottom: '5px' }}>📝 Teslimat Notu</div>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', height: '60px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: 'white', padding: '8px' }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #30363d', paddingTop: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '15px' }}>
                <span style={{ color: '#8b949e' }}>Toplam</span>
                <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{cartItems.length} ürün • {totalWeight} kg</span>
              </div>
              <button style={{ width: '100%', padding: '15px', background: '#2ecc71', color: 'black', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>📦 Siparişi Tamamla</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}