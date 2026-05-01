import React, { useState } from 'react';

const App = () => {
  const [quantities, setQuantities] = useState({});

  // Veri Seti
  const items = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: 'Rind' },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: 'Rind' },
    { id: 3, name: "Rinder-Nacken", cat: 'Rind' },
    { id: 4, name: "Bullen-Bug", cat: 'Rind' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0d1117', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* Sol Kenar (image_48e6dd.jpg) */}
      <div style={{ width: '200px', borderRight: '1px solid #30363d', padding: '20px' }}>
        <h2 style={{ color: '#2ecc71' }}>NEXTLOGI</h2>
        <div style={{ marginTop: '20px', color: '#4ade80' }}>Ürünler & Sipariş</div>
      </div>

      {/* Ana Ürün Alanı */}
      <div style={{ flex: 1, padding: '20px' }}>
        <h3 style={{ color: '#e67e22', borderBottom: '1px solid #e67e22', paddingBottom: '5px' }}>RIND / BULLE</h3>
        
        {items.map(item => (
          <div key={item.id} style={{ 
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
            background: '#161b22', padding: '15px', borderRadius: '10px', marginBottom: '10px' 
          }}>
            <span>{item.name}</span>
            <input 
              type="number" 
              style={{ width: '60px', padding: '5px', borderRadius: '5px' }}
              onChange={(e) => setQuantities({ ...quantities, [item.id]: e.target.value })}
            />
          </div>
        ))}
      </div>

      {/* Sağ Sepet Paneli */}
      <div style={{ width: '300px', background: '#161b22', padding: '20px', borderLeft: '1px solid #30363d' }}>
        <h4 style={{ marginBottom: '20px' }}>🛒 Sipariş Özeti</h4>
        {items.filter(i => quantities[i.id] > 0).map(i => (
          <div key={i.id} style={{ background: '#0d1117', padding: '10px', borderRadius: '8px', marginBottom: '10px', borderLeft: '4px solid #e67e22' }}>
            {i.name} - {quantities[i.id]} kg
          </div>
        ))}
        <button style={{ width: '100%', padding: '15px', background: '#2ecc71', border: 'none', borderRadius: '10px', marginTop: '20px', fontWeight: 'bold' }}>
          Siparişi Tamamla
        </button>
      </div>

    </div>
  );
};

export default App;