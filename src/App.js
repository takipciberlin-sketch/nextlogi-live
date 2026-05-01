import React, { useState, useEffect } from "react";

// 1. KATEGORİ VERİLERİ (image_48ee64.png baz alınmıştır)
const CATEGORIES = [
  { id: 'rind', name: 'Rind/Bulle', count: 30, color: '#e67e22' },
  { id: 'hahn', name: 'Hähnchen', count: 17, color: '#f1c40f' },
  { id: 'kalb', name: 'Kalb', count: 5, color: '#3498db' }
];

// 2. GENİŞLETİLMİŞ ÜRÜN LİSTESİ
const PRODUCTS = [
  { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: 'rind', unit: 'kg' },
  { id: 2, name: "Bullen-Keule mit Knochen", cat: 'rind', unit: 'kg' },
  { id: 3, name: "Rinder-Nacken", cat: 'rind', unit: 'kg' },
  { id: 4, name: "Bullen-Bug", cat: 'rind', unit: 'kg' },
  { id: 5, name: "Rinder-Filet (Premium)", cat: 'rind', unit: 'kg' },
  { id: 6, name: "Entrecôte", cat: 'rind', unit: 'kg' },
  { id: 7, name: "Hähnchen-Brustfilet", cat: 'hahn', unit: 'kg' },
  { id: 8, name: "Hähnchen-Keule", cat: 'hahn', unit: 'kg' },
  { id: 9, name: "Hähnchen-Flügel (Wings)", cat: 'hahn', unit: 'kg' },
  { id: 10, name: "Ganze Hähnchen", cat: 'hahn', unit: 'adet' },
  { id: 11, name: "Kalbs-Schnitzel (Oberschale)", cat: 'kalb', unit: 'kg' },
  { id: 12, name: "Kalbs-Kotelett", cat: 'kalb', unit: 'kg' },
  { id: 13, name: "Kalbs-Haxe", cat: 'kalb', unit: 'kg' },
  { id: 14, name: "Kalbs-Leber", cat: 'kalb', unit: 'kg' }
];

export default function NextLogiApp() {
  // State Tanımlamaları
  const [quantities, setQuantities] = useState({});
  const [note, setNote] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Sepetteki aktif ürünleri filtrele (image_48e6dd.jpg sağ panel için)
  const activeItems = PRODUCTS.filter(p => Number(quantities[p.id]) > 0);
  const totalWeight = activeItems.reduce((sum, p) => sum + (Number(quantities[p.id]) * 15), 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#0d1117', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif', margin: 0 }}>
      
      {/* SOL MENÜ BAR (image_48ee64.png) */}
      <div style={{ width: '220px', borderRight: '1px solid #30363d', padding: '20px', display: 'flex', flexDirection: 'column', height: '100vh', position: 'sticky', top: 0 }}>
        <h2 style={{ color: '#2ecc71', fontSize: '20px', fontWeight: 'bold', marginBottom: '30px' }}>NEXTLOGI</h2>
        <div style={{ flex: 1 }}>
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler', 'Ürünler & Sipariş'].map(item => (
            <div key={item} style={{ 
              padding: '12px', borderRadius: '8px', cursor: 'pointer', marginBottom: '5px', fontSize: '14px',
              backgroundColor: item === 'Ürünler & Sipariş' ? '#1a3a2a' : 'transparent',
              color: item === 'Ürünler & Sipariş' ? '#4ade80' : '#8b949e'
            }}>{item}</div>
          ))}
        </div>
        <div style={{ padding: '15px', backgroundColor: '#161b22', borderRadius: '12px', fontSize: '12px' }}>
          <strong>Klaus Müller</strong><br/><span style={{ color: '#8b949e' }}>Müller GmbH</span>
        </div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* HEADER (image_48e6dd.jpg) */}
        <div style={{ padding: '15px 25px', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button style={{ background: '#21262d', border: '1px solid #30363d', color: 'white', padding: '8px 15px', borderRadius: '6px' }}>← Müşteri Değiştir</button>
          <div style={{ flex: 1, background: '#161b22', padding: '8px 15px', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', justifyContent: 'space-between' }}>
            <span>👤 Max Bauer GmbH</span>
            <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>ADIM 2/2</span>
          </div>
          <input 
            placeholder="Ürün ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ background: '#0d1117', border: '1px solid #30363d', color: 'white', padding: '8px 12px', borderRadius: '6px', width: '150px' }} 
          />
          <button style={{ background: '#1f6feb', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '6px' }}>Yönetim</button>
        </div>

        {/* KATEGORİ FİLTRELERİ */}
        <div style={{ padding: '0 25px 15px', display: 'flex', gap: '10px' }}>
          {CATEGORIES.map(c => (
            <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#161b22', padding: '5px 12px', borderRadius: '20px', border: '1px solid #30363d', fontSize: '12px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: c.color }}></span>
              {c.name} <span style={{ color: '#484f58' }}>{c.count}</span>
            </div>
          ))}
        </div>

        {/* ÜRÜN LİSTESİ VE SEPET */}
        <div style={{ flex: 1, display: 'flex', padding: '0 25px 25px', gap: '20px', overflow: 'hidden' }}>
          
          {/* ORTA: Ürünler */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.id} style={{ marginBottom: '25px' }}>
                <h3 style={{ color: cat.color, fontSize: '12px', borderBottom: `1px solid ${cat.color}`, paddingBottom: '5px', marginBottom: '15px' }}>{cat.name.toUpperCase()}</h3>
                {PRODUCTS.filter(p => p.cat === cat.id && p.name.toLowerCase().includes(searchTerm.toLowerCase())).map(p => (
                  <div key={p.id} style={{ 
                    display: 'flex', justifyContent: 'space-between', padding: '15px', background: '#161b22', 
                    borderRadius: '12px', marginBottom: '8px', border: quantities[p.id] > 0 ? `1px solid ${cat.color}` : '1px solid transparent'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: quantities[p.id] > 0 ? cat.color : '#484f58' }}></div>
                      <span>{p.name}</span>
                    </div>
                    <input 
                      type="number" min="0" value={quantities[p.id] || ""}
                      onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                      style={{ width: '60px', background: '#0d1117', border: '1px solid #30363d', color: 'white', textAlign: 'center', borderRadius: '6px' }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* SAĞ: Sepet Paneli (image_48e6dd.jpg) */}
          <div style={{ width: '300px', background: '#161b22', borderRadius: '15px', border: '1px solid #30363d', padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>🛒 Sipariş Özeti</span>
              <span style={{ background: '#1a3a2a', color: '#4ade80', padding: '2px 8px', borderRadius: '10px', fontSize: '10px' }}>{activeItems.length} kalem</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {activeItems.map(item => (
                <div key={item.id} style={{ background: '#0d1117', padding: '10px', borderRadius: '10px', marginBottom: '8px', borderLeft: '3px solid #e67e22', position: 'relative' }}>
                  <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{item.name}</div>
                  <div style={{ fontSize: '11px', color: '#8b949e' }}>{quantities[item.id]} {item.unit}</div>
                  <button onClick={() => setQuantities({...quantities, [item.id]: 0})} style={{ position: 'absolute', right: '8px', top: '8px', color: '#f85149', background: 'none', border: 'none', cursor: 'pointer' }}>✕</button>
                </div>
              ))}
              <div style={{ marginTop: '10px' }}>
                <label style={{ fontSize: '11px', color: '#8b949e' }}>📝 Teslimat Notu</label>
                <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', height: '60px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: 'white', marginTop: '5px', padding: '8px' }} />
              </div>
            </div>
            <div style={{ borderTop: '1px solid #30363d', paddingTop: '15px', marginTop: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '15px' }}>
                <span style={{ color: '#8b949e' }}>Toplam</span>
                <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>{activeItems.length} ürün • {totalWeight} kg</span>
              </div>
              <button style={{ width: '100%', padding: '12px', background: '#2ecc71', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>📦 Siparişi Tamamla</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}