import React, { useState } from "react";

const CUSTOMERS = [
  { id: "C1", name: "Döner Point", city: "Hamburg", color: "#3b82f6" },
  { id: "C2", name: "Berlin Grillhaus", city: "Berlin", color: "#a855f7" }
];

const PRODUCTS = [
  { id: 1, name: "Kalb Döner 10kg", unit: "Spieß", price: 85 },
  { id: 2, name: "Hähnchen Döner 5kg", unit: "Spieß", price: 45 },
  { id: 3, name: "Sucuk (Kangal)", unit: "Kg", price: 12 }
];

export default function NextLogiUltra() {
  const [step, setStep] = useState("customer");
  const [selectedCust, setSelectedCust] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showResult, setShowResult] = useState(false);

  const cartItems = PRODUCTS.filter(p => quantities[p.id] > 0);
  const totalWeight = cartItems.reduce((sum, item) => sum + Number(quantities[item.id]), 0);

  // 1. ADIM: MÜŞTERİ SEÇİMİ (Şık Kartlar)
  if (step === "customer") {
    return (
      <div style={{ backgroundColor: '#05070a', color: 'white', minHeight: '100vh', padding: '60px 20px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-2px', marginBottom: '40px' }}>
            NEXTLOGI <span style={{ color: '#3b82f6' }}>v20</span>
          </h1>
          {CUSTOMERS.map(c => (
            <div 
              key={c.id} 
              onClick={() => { setSelectedCust(c); setStep("order"); }}
              style={{ backgroundColor: '#0f172a', padding: '30px', borderRadius: '24px', marginBottom: '20px', cursor: 'pointer', border: '1px solid #1e293b', transition: '0.3s' }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = c.color}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#1e293b'}
            >
              <div style={{ fontSize: '20px', fontWeight: '800' }}>{c.name}</div>
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: '5px' }}>{c.city} • Bölge: Kuzey</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. ADIM: KATALOG VE CANLI SEPET
  return (
    <div style={{ backgroundColor: '#05070a', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'Inter, sans-serif' }}>
      {/* Ürün Katalog */}
      <div style={{ flex: 1, padding: '40px', borderRight: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '40px' }}>
          <button onClick={() => setStep("customer")} style={{ background: '#0f172a', border: '1px solid #1e293b', color: 'white', padding: '12px', borderRadius: '15px', cursor: 'pointer' }}>←</button>
          <h2 style={{ fontSize: '24px', fontWeight: '900' }}>{selectedCust?.name}</h2>
        </div>

        {PRODUCTS.map(p => (
          <div key={p.id} style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '25px', 
            backgroundColor: quantities[p.id] > 0 ? '#0f172a' : '#0a0f1a', 
            marginBottom: '15px', borderRadius: '25px', border: quantities[p.id] > 0 ? '1px solid #3b82f6' : '1px solid #1e293b' 
          }}>
            <span style={{ fontWeight: '700', fontSize: '18px' }}>{p.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input 
                type="number" 
                placeholder="0"
                value={quantities[p.id] || ""} 
                onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                style={{ width: '100px', backgroundColor: '#05070a', color: '#3b82f6', border: '2px solid #1e293b', borderRadius: '15px', padding: '12px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', outline: 'none' }}
              />
              <span style={{ color: '#475569', fontWeight: 'bold' }}>{p.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sağ Panel: Sepet ve Aksiyon */}
      <div style={{ width: '400px', padding: '40px', background: 'linear-gradient(180deg, #05070a 0%, #0f172a 100%)', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '12px', fontWeight: '900', letterSpacing: '2px', color: '#64748b', marginBottom: '30px' }}>SİPARİŞ ÖZETİ</h3>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ padding: '20px', backgroundColor: '#0a0f1a', borderRadius: '20px', marginBottom: '10px', border: '1px solid #1e293b' }}>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{item.name}</div>
              <div style={{ color: '#3b82f6', fontSize: '18px', fontWeight: '900', marginTop: '5px' }}>{quantities[item.id]} {item.unit}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#64748b' }}>
            <span>Toplam Miktar</span>
            <span style={{ color: 'white', fontWeight: 'bold' }}>{totalWeight} Birim</span>
          </div>
        </div>

        <button 
          onClick={() => setShowResult(true)}
          disabled={cartItems.length === 0}
          style={{ 
            width: '100%', padding: '25px', backgroundColor: cartItems.length > 0 ? '#3b82f6' : '#1e293b', 
            color: 'white', border: 'none', borderRadius: '24px', fontWeight: '900', fontSize: '16px', 
            cursor: 'pointer', transition: '0.3s', boxShadow: cartItems.length > 0 ? '0 10px 30px rgba(59, 130, 246, 0.3)' : 'none' 
          }}
        >
          SİPARİŞİ ONAYLA
        </button>
      </div>

      {/* ✅ SONUÇ EKRANI (Daha Estetik Modal) */}
      {showResult && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '60px', borderRadius: '40px', textAlign: 'center', border: '2px solid #3b82f6', maxWidth: '450px', width: '90%' }}>
            <div style={{ fontSize: '80px', marginBottom: '20px' }}>🚀</div>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'white', marginBottom: '10px' }}>SİPARİŞ YOLDA!</h2>
            <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '30px' }}>Müşteri: <b>{selectedCust?.name}</b><br/>Sistem kaydı başarıyla oluşturuldu.</p>
            
            <button 
              onClick={() => { setShowResult(false); setStep("customer"); setQuantities({}); }}
              style={{ width: '100%', padding: '20px', backgroundColor: 'white', color: 'black', borderRadius: '20px', fontWeight: '900', border: 'none', cursor: 'pointer' }}
            >
              YENİ SİPARİŞE GEÇ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}