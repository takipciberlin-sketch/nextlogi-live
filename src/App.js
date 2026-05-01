import React, { useState, useEffect } from "react";

// Görseldeki (image_48ee64.png) kategori verileri
const CATEGORIES = [
  { id: 'all', name: 'Tümü', count: 62, color: '#2ecc71' },
  { id: 'rind', name: 'Rind/Bulle', count: 30, color: '#e67e22' },
  { id: 'hahn', name: 'Hähnchen', count: 17, color: '#f1c40f' },
  { id: 'kalb', name: 'Kalb', count: 5, color: '#3498db' }
];

// Görseldeki ürün listesi
const INITIAL_PRODUCTS = [
  { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: 'rind' },
  { id: 2, name: "Bullen-Keule mit Knochen", cat: 'rind' },
  { id: 3, name: "Rinder-Nacken", cat: 'rind' },
  { id: 4, name: "Bullen-Bug", cat: 'rind' }
];

export default function NextLogiV20_Final() {
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nextlogi_v20_data");
    return saved ? JSON.parse(saved) : {};
  });
  const [note, setNote] = useState("");

  useEffect(() => {
    localStorage.setItem("nextlogi_v20_data", JSON.stringify(quantities));
  }, [quantities]);

  const activeItems = INITIAL_PRODUCTS.filter(p => quantities[p.id] > 0);
  const totalQty = activeItems.reduce((sum, p) => sum + Number(quantities[p.id]), 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#0d1117', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'Segoe UI, sans-serif' }}>
      
      {/* SOL MENÜ (image_48ee64.png sol bar) */}
      <div style={{ width: '220px', backgroundColor: '#0d1117', borderRight: '1px solid #1f2328', padding: '20px', display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ color: '#2ecc71', fontSize: '22px', fontWeight: 'bold', marginBottom: '40px' }}>NEXTLOGI</h1>
        <nav style={{ flex: 1 }}>
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler', 'Ürünler & Sipariş', 'Yakıt Raporu', 'Ödeme'].map(item => (
            <div key={item} style={{ 
              padding: '12px 16px', borderRadius: '8px', marginBottom: '4px', cursor: 'pointer',
              backgroundColor: item === 'Ürünler & Sipariş' ? '#1a3a2a' : 'transparent',
              color: item === 'Ürünler & Sipariş' ? '#4ade80' : '#8b949e',
              fontSize: '14px'
            }}>{item}</div>
          ))}
        </nav>
        <div style={{ padding: '15px', backgroundColor: '#161b22', borderRadius: '12px', fontSize: '12px' }}>
          <div style={{ fontWeight: 'bold', color: 'white' }}>Klaus Müller</div>
          <div style={{ color: '#8b949e' }}>Müller GmbH</div>
          <div style={{ marginTop: '10px', color: '#8b949e', cursor: 'pointer' }}>← Çıkış Yap</div>
        </div>
      </div>

      {/* ANA PANEL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* ÜST HEADER */}
        <div style={{ padding: '15px 20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button style={{ backgroundColor: '#21262d', border: '1px solid #30363d', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '13px' }}>← Müşteri Değiştir</button>
          <div style={{ flex: 1, backgroundColor: '#161b22', padding: '8px 20px', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '14px' }}>👤 Max Bauer GmbH</span>
            <span style={{ color: '#2ecc71', fontWeight: 'bold', fontSize: '12px' }}>ADIM 2/2</span>
          </div>
          <input placeholder="Ürün ara..." style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', padding: '8px 12px', borderRadius: '6px', width: '180px' }} />
          <button style={{ backgroundColor: '#238636', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold' }}>Yönetim</button>
        </div>

        {/* KATEGORİLER (Filtreler) */}
        <div style={{ padding: '0 20px 15px', display: 'flex', gap: '8px' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#161b22', padding: '5px 12px', borderRadius: '20px', border: '1px solid #30363d', fontSize: '11px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: cat.color }}></span>
              <span>{cat.name}</span>
              <span style={{ color: '#484f58' }}>{cat.count}</span>
            </div>
          ))}
        </div>

        {/* LİSTE VE SEPET (İki Sütun) */}
        <div style={{ flex: 1, display: 'flex', padding: '0 20px 20px', gap: '20px', overflow: 'hidden' }}>
          
          {/* ÜRÜN LİSTESİ (image_48ee64.png orta alan) */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <h3 style={{ color: '#e67e22', fontSize: '12px', fontWeight: 'bold', marginBottom: '15px', borderBottom: '1px solid #e67e22', paddingBottom: '5px' }}>RIND/BULLE</h3>
            {INITIAL_PRODUCTS.map(p => (
              <div key={p.id} style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '12px 20px', backgroundColor: '#161b22', borderRadius: '10px', 
                marginBottom: '8px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid #30363d'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: quantities[p.id] > 0 ? '#2ecc71' : '#484f58' }}></div>
                  <span style={{ fontSize: '14px', color: quantities[p.id] > 0 ? '#2ecc71' : 'white' }}>{p.name}</span>
                </div>
                <input 
                  type="number" min="0" value={quantities[p.id] || 0}
                  onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                  style={{ width: '50px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '6px', textAlign: 'center', padding: '5px' }}
                />
              </div>
            ))}
          </div>

          {/* SEPET ÖZETİ (image_48ee64.png sağ panel) */}
          <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ flex: 1, backgroundColor: '#161b22', borderRadius: '15px', border: '1px solid #30363d', padding: '20px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>🛒 Sipariş Özeti</span>
                <span style={{ backgroundColor: '#1a3a2a', color: '#4ade80', fontSize: '10px', padding: '2px 8px', borderRadius: '10px' }}>{activeItems.length} kalem</span>
              </div>
              
              <div style={{ flex: 1, overflowY: 'auto' }}>
                {activeItems.map(item => (
                  <div key={item.id} style={{ backgroundColor: '#0d1117', borderRadius: '8px', padding: '10px', marginBottom: '8px', borderLeft: '3px solid #e67e22', position: 'relative' }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold', width: '85%' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#8b949e' }}>{quantities[item.id]} kg</div>
                    <span onClick={() => setQuantities({...quantities, [item.id]: 0})} style={{ position: 'absolute', right: '10px', top: '10px', color: '#f85149', cursor: 'pointer' }}>✕</span>
                  </div>
                ))}
                <div style={{ marginTop: '10px' }}>
                   <label style={{ fontSize: '11px', color: '#8b949e' }}>📝 Teslimat Notu</label>
                   <textarea value={note} onChange={(e) => setNote(e.target.value)} style={{ width: '100%', height: '80px', backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: 'white', marginTop: '5px', padding: '8px', fontSize: '12px' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #30363d', paddingTop: '15px', marginTop: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                  <span style={{ fontSize: '12px', color: '#8b949e' }}>Toplam</span>
                  <span style={{ fontSize: '14px', color: '#2ecc71', fontWeight: 'bold' }}>{activeItems.length} ürün • {totalQty * 8} kg</span>
                </div>
                <button style={{ width: '100%', padding: '14px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'center', gap: '8px' }}>
                  📦 Siparişi Tamamla
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}