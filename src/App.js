import React, { useState } from "react";

// --- VERİLER ---
const CUSTOMERS = [
  { id: "C1", name: "Berlin Grillhaus", city: "Berlin" },
  { id: "C2", name: "Döner Point", city: "Hamburg" },
  { id: "C3", name: "Antalya Imbiss", city: "Berlin" }
];

const PRODUCTS = [
  { id: 1, name: "Kalb Döner 10kg", unit: "Spieß", cat: "Kalb" },
  { id: 2, name: "Hähnchen Döner 5kg", unit: "Spieß", cat: "Hähnchen" },
  { id: 3, name: "Sucuk (Kangal)", unit: "Kg", cat: "Verarbeitet" }
];

export default function NextLogiV20_LiveCart() {
  const [step, setStep] = useState("customer");
  const [selectedCust, setSelectedCust] = useState(null);
  const [quantities, setQuantities] = useState({}); // Tüm miktarlar burada tutulur

  // Sepetteki ürünleri filtrele (Miktarı 0'dan büyük olanlar)
  const cartItems = PRODUCTS.filter(p => quantities[p.id] > 0);

  // Müşteri Seçme Ekranı (image_49cbdc.png)
  if (step === "customer") {
    return (
      <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontStyle: 'italic', fontWeight: '900', color: '#2563eb', marginBottom: '10px' }}>NEXTLOGI v20</h1>
        <p style={{ color: '#8b949e', marginBottom: '30px' }}>Lütfen devam etmek için bir müşteri seçin</p>
        {CUSTOMERS.map(c => (
          <div key={c.id} onClick={() => { setSelectedCust(c); setStep("order"); }} style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '20px', marginBottom: '15px', cursor: 'pointer', border: '1px solid #30363d' }}>
            <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{c.name}</div>
            <div style={{ fontSize: '0.9rem', color: '#2563eb' }}>📍 {c.city}</div>
          </div>
        ))}
      </div>
    );
  }

  // Sipariş ve Canlı Sepet Ekranı (image_497a3c.png)
  return (
    <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* SOL: Ürün Girişi */}
      <div style={{ flex: 1, padding: '30px', borderRight: '1px solid #30363d', overflowY: 'auto' }}>
        <button onClick={() => setStep("customer")} style={{ background: '#161b22', color: 'white', border: '1px solid #30363d', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer', marginBottom: '20px' }}>← Müşteri Listesi</button>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '5px' }}>{selectedCust?.name}</h2>
        <p style={{ color: '#8b949e', marginBottom: '30px' }}>Sipariş Formu</p>

        {PRODUCTS.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#161b22', marginBottom: '10px', borderRadius: '20px', border: quantities[p.id] > 0 ? '1px solid #2563eb' : '1px solid #30363d' }}>
            <span style={{ fontWeight: 'bold' }}>{p.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="number" 
                value={quantities[p.id] || ""}
                onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                style={{ width: '80px', backgroundColor: '#0d1117', border: '1px solid #2563eb', color: 'white', padding: '10px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold' }}
              />
              <span style={{ fontSize: '0.8rem', color: '#8b949e', width: '40px' }}>{p.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ: CANLI SEPET ÖZETİ */}
      <div style={{ width: '350px', padding: '30px', backgroundColor: '#0d1117', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '30px', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>SİPARİŞ ÖZETİ</h3>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cartItems.length === 0 ? (
            <p style={{ color: '#484f58', fontStyle: 'italic', textAlign: 'center', marginTop: '50px' }}>Henüz ürün eklenmedi.</p>
          ) : (
            cartItems.map(item => (
              <div key={item.id} style={{ backgroundColor: '#161b22', padding: '15px', borderRadius: '15px', marginBottom: '10px', borderLeft: '4px solid #2563eb' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ fontSize: '0.8rem', color: '#2563eb', marginTop: '5px' }}>{quantities[item.id]} {item.unit}</div>
              </div>
            ))
          )}
        </div>

        <button 
          disabled={cartItems.length === 0}
          style={{ width: '100%', padding: '20px', backgroundColor: cartItems.length > 0 ? '#2563eb' : '#161b22', color: cartItems.length > 0 ? 'white' : '#484f58', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' }}
          onClick={() => alert("Sipariş başarıyla gönderildi!")}
        >
          SİPARİŞİ TAMAMLA
        </button>
      </div>
    </div>
  );
}