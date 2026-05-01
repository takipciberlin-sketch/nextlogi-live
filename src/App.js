import React, { useState } from "react";

// Ürünleri ve kategorileri bileşenin DIŞINA alıyoruz (Hafıza dostu)
const CATEGORIES = [
  { id: 'rind', name: 'Rind/Bulle', color: '#e67e22' },
  { id: 'hahn', name: 'Hähnchen', color: '#f1c40f' },
  { id: 'kalb', name: 'Kalb', color: '#3498db' }
];

const PRODUCTS = [
  { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: 'rind' },
  { id: 2, name: "Bullen-Keule mit Knochen", cat: 'rind' },
  { id: 3, name: "Rinder-Nacken", cat: 'rind' },
  { id: 7, name: "Hähnchen-Brustfilet", cat: 'hahn' },
  { id: 11, name: "Kalbs-Schnitzel", cat: 'kalb' }
];

function NextLogi() {
  const [quantities, setQuantities] = useState({});

  // Eğer sayfa render edilemiyorsa, basit bir 'Loading' kontrolü ekliyoruz
  if (!PRODUCTS) return <div style={{color: 'white'}}>Yükleniyor...</div>;

  return (
    <div style={{ background: '#0d1117', color: 'white', minHeight: '100vh', padding: '20px' }}>
       <h1 style={{color: '#2ecc71'}}>NEXTLOGI AKTİF</h1>
       <div style={{ display: 'flex', gap: '20px' }}>
          {/* Ürün Listesi */}
          <div style={{ flex: 1 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.id} style={{ marginBottom: '20px' }}>
                <h3 style={{ color: cat.color, borderBottom: `1px solid ${cat.color}` }}>{cat.name}</h3>
                {PRODUCTS.filter(p => p.cat === cat.id).map(p => (
                  <div key={p.id} style={{ background: '#161b22', padding: '10px', marginBottom: '5px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>{p.name}</span>
                    <input 
                      type="number" 
                      style={{ width: '50px' }} 
                      onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})} 
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Sağ Panel */}
          <div style={{ width: '250px', background: '#161b22', padding: '15px', borderRadius: '15px' }}>
            <h4>Sipariş Özeti</h4>
            {PRODUCTS.filter(p => quantities[p.id] > 0).map(p => (
              <div key={p.id} style={{fontSize: '12px', borderLeft: '2px solid orange', paddingLeft: '5px', marginBottom: '5px'}}>
                {p.name} - {quantities[p.id]} kg
              </div>
            ))}
          </div>
       </div>
    </div>
  );
}

export default NextLogi;