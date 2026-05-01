import React, { useState } from "react";

// --- VERİLER ---
const CUSTOMERS = [
  { id: 1, name: "Berlin Grillhaus", city: "Berlin" },
  { id: 2, name: "Döner Point", city: "Hamburg" },
  { id: 3, name: "Antalya Imbiss", city: "Berlin" }
];

const PRODUCTS = [
  { id: 101, name: "Kalb Döner 10kg", unit: "Spieß" },
  { id: 102, name: "Hähnchen Döner 5kg", unit: "Spieß" },
  { id: 103, name: "Sucuk", unit: "Kg" }
];

export default function NextLogiSimple() {
  const [step, setStep] = useState("customer");
  const [selectedCust, setSelectedCust] = useState(null);
  const [cart, setCart] = useState({});

  // Müşteri Seçme
  if (step === "customer") {
    return (
      <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontStyle: 'italic', fontWeight: '900', color: '#2563eb' }}>NEXTLOGI v20</h1>
        <p style={{ color: '#6b7280' }}>Lütfen bir müşteri seçin:</p>
        <div style={{ marginTop: '20px' }}>
          {CUSTOMERS.map(c => (
            <div 
              key={c.id} 
              onClick={() => { setSelectedCust(c); setStep("order"); }}
              style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '15px', marginBottom: '10px', cursor: 'pointer', border: '1px solid #30363d' }}
            >
              <div style={{ fontWeight: 'bold' }}>{c.name}</div>
              <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>{c.city}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sipariş Ekranı
  return (
    <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* Sol Taraf: Ürünler */}
      <div style={{ flex: 1, padding: '20px', borderRight: '1px solid #30363d' }}>
        <button onClick={() => setStep("customer")} style={{ background: 'none', color: '#58a6ff', border: 'none', cursor: 'pointer', marginBottom: '10px' }}>← Geri Dön</button>
        <h2>{selectedCust?.name}</h2>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#161b22', marginBottom: '5px', borderRadius: '10px' }}>
            <span>{p.name}</span>
            <input 
              type="number" 
              placeholder="0"
              style={{ width: '60px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: 'white', textAlign: 'center', borderRadius: '5px' }}
              onChange={(e) => setCart({...cart, [p.id]: e.target.value})}
            />
          </div>
        ))}
      </div>

      {/* Sağ Taraf: Özet */}
      <div style={{ width: '300px', padding: '20px', backgroundColor: '#161b22' }}>
        <h3>Sipariş Özeti</h3>
        <button 
          onClick={() => alert("Sipariş Alındı!")}
          style={{ width: '100%', padding: '15px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', marginTop: '20px', cursor: 'pointer' }}
        >
          ONAYLA
        </button>
      </div>
    </div>
  );
}