import React, { useState } from "react";

// --- VERİLER (İçine Gömülü) ---
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

export default function NextLogiV20_Fixed() {
  const [step, setStep] = useState("customer");
  const [selectedCust, setSelectedCust] = useState(null);
  const [cart, setCart] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Müşteri Seçme Ekranı
  if (step === "customer") {
    return (
      <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontStyle: 'italic', fontWeight: '900', fontSize: '2rem', marginBottom: '10px' }}>
            NEXTLOGI <span style={{ color: '#2563eb' }}>v20</span>
          </h1>
          <p style={{ color: '#8b949e', marginBottom: '30px' }}>Lütfen devam etmek için bir müşteri seçin</p>
          
          {CUSTOMERS.map(c => (
            <div 
              key={c.id} 
              onClick={() => { setSelectedCust(c); setStep("order"); }}
              style={{ 
                backgroundColor: '#161b22', padding: '20px', borderRadius: '20px', 
                marginBottom: '15px', cursor: 'pointer', border: '1px solid #30363d',
                transition: '0.2s'
              }}
            >
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{c.name}</div>
              <div style={{ fontSize: '0.9rem', color: '#2563eb', marginTop: '5px' }}>📍 {c.city}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Sipariş Verme Ekranı
  return (
    <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      {/* Sol: Katalog */}
      <div style={{ flex: 1, padding: '30px', borderRight: '1px solid #30363d' }}>
        <button onClick={() => setStep("customer")} style={{ background: '#161b22', color: 'white', border: '1px solid #30363d', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer', marginBottom: '20px' }}>
          ← Müşteri Listesi
        </button>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{selectedCust?.name}</h2>
        <p style={{ color: '#8b949e', fontSize: '0.9rem', marginBottom: '30px' }}>Sipariş Formu</p>

        {PRODUCTS.map(p => (
          <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: '#161b22', marginBottom: '10px', borderRadius: '15px', border: '1px solid #30363d' }}>
            <span style={{ fontWeight: 'bold' }}>{p.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="number" 
                style={{ width: '80px', backgroundColor: '#0d1117', border: '1px solid #2563eb', color: 'white', padding: '10px', borderRadius: '10px', textAlign: 'center' }}
                placeholder="0"
                onChange={(e) => setCart({...cart, [p.id]: e.target.value})}
              />
              <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>{p.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Sağ: Sepet */}
      <div style={{ width: '350px', padding: '30px', backgroundColor: '#0d1117' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: '900', letterSpacing: '1px', marginBottom: '30px' }}>SİPARİŞ ÖZETİ</h3>
        <div style={{ minHeight: '200px', color: '#484f58', fontSize: '0.9rem' }}>
          {Object.keys(cart).length === 0 ? "Henüz ürün eklenmedi." : "Ürünler hazır..."}
        </div>
        <button 
          onClick={() => setShowSuccess(true)}
          style={{ width: '100%', padding: '20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 10px 20px rgba(37,99,235,0.2)' }}
        >
          SİPARİŞİ TAMAMLA
        </button>
      </div>

      {/* Başarı Mesajı */}
      {showSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#161b22', padding: '50px', borderRadius: '40px', textAlign: 'center', border: '1px solid #238636' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>✅</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '900', marginBottom: '10px' }}>BAŞARILI!</h2>
            <p style={{ color: '#8b949e', marginBottom: '30px' }}>Sipariş başarıyla kaydedildi.</p>
            <button onClick={() => { setShowSuccess(false); setStep("customer"); setCart({}); }} style={{ padding: '15px 40px', backgroundColor: 'white', color: 'black', border: 'none', borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer' }}>KAPAT</button>
          </div>
        </div>
      )}
    </div>
  );
}