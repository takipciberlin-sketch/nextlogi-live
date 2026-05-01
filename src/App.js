import React, { useState } from "react";

export default function NextLogiPro() {
  const [quantities, setQuantities] = useState({});
  const [note, setNote] = useState("");

  // Ürün ekleme/çıkarma fonksiyonu
  const updateQty = (id, val) => {
    setQuantities({ ...quantities, [id]: val });
  };

  // Sepetteki ürünleri hesapla
  const cartItems = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: 'RIND' },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: 'RIND' },
    { id: 3, name: "Rinder-Nacken", cat: 'RIND' },
    { id: 4, name: "Bullen-Bug", cat: 'RIND' },
    { id: 7, name: "Hähnchen-Brustfilet", cat: 'HAHN' },
    { id: 11, name: "Kalbs-Schnitzel", cat: 'KALB' }
  ].filter(p => quantities[p.id] > 0);

  return (
    <div style={{ display: 'flex', backgroundColor: '#0d1117', color: '#c9d1d9', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* SOL MENÜ */}
      <div style={{ width: '200px', borderRight: '1px solid #30363d', padding: '20px' }}>
        <h2 style={{ color: '#2ecc71' }}>NEXTLOGI</h2>
        <p style={{ color: '#4ade80', background: '#1a3a2a', padding: '10px', borderRadius: '8px' }}>Ürünler & Sipariş</p>
        <p style={{ color: '#8b949e' }}>Müşteriler</p>
      </div>

      {/* ORTA ALAN */}
      <div style={{ flex: 1, padding: '20px' }}>
        <div style={{ background: '#161b22', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #30363d' }}>
          👤 Max Bauer GmbH <span style={{ float: 'right', color: '#2ecc71' }}>ADIM 2/2</span>
        </div>

        <h3 style={{ color: '#e67e22', borderBottom: '1px solid #e67e22' }}>RIND / BULLE</h3>
        
        {[
          { id: 1, name: "Bullen-Vorderviertel ohne Knochen" },
          { id: 2, name: "Bullen-Keule mit Knochen" },
          { id: 3, name: "Rinder-Nacken" },
          { id: 4, name: "Bullen-Bug" }
        ].map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#161b22', padding: '15px', borderRadius: '10px', marginBottom: '10px', border: quantities[p.id] > 0 ? '1px solid #2ecc71' : '1px solid transparent' }}>
            <span>{p.name}</span>
            <input 
              type="number" 
              placeholder="0"
              value={quantities[p.id] || ""}
              onChange={(e) => updateQty(p.id, e.target.value)}
              style={{ width: '60px', background: '#0d1117', border: '1px solid #30363d', color: 'white', borderRadius: '5px', textAlign: 'center' }}
            />
          </div>
        ))}
      </div>

      {/* SAĞ PANEL (image_48e6dd.jpg stili) */}
      <div style={{ width: '300px', background: '#161b22', padding: '20px', borderLeft: '1px solid #30363d' }}>
        <h4>🛒 Sipariş Özeti</h4>
        <div style={{ minHeight: '200px' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ background: '#0d1117', padding: '10px', borderRadius: '8px', marginBottom: '10px', borderLeft: '4px solid #e67e22' }}>
              <div style={{ fontSize: '12px' }}>{item.name}</div>
              <div style={{ color: '#8b949e', fontSize: '11px' }}>{quantities[item.id]} kg</div>
            </div>
          ))}
        </div>
        
        <textarea 
          placeholder="Teslimat Notu..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: 'white', padding: '10px', marginTop: '20px' }}
        />

        <button style={{ width: '100%', background: '#2ecc71', color: '#0d1117', border: 'none', padding: '15px', borderRadius: '10px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}>
          Siparişi Tamamla
        </button>
      </div>
    </div>
  );
}