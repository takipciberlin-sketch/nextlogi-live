import React, { useState, useEffect } from "react";

// SABİT VERİLER (Burası değişmez)
const PRODUCTS = [
  { id: 1, name: "Kalb Döner 10kg", unit: "Spieß" },
  { id: 2, name: "Hähnchen Döner 5kg", unit: "Spieß" },
  { id: 3, name: "Sucuk (Kangal)", unit: "Kg" }
];

export default function NextLogiV20_Stable() {
  // 1. HAFIZADAN VERİLERİ GERİ ÇAĞIR (Sayfa yenilense de gitmez)
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nextlogi_cart");
    return saved ? JSON.parse(saved) : {};
  });
  
  const [step, setStep] = useState("order"); 
  const [showResult, setShowResult] = useState(false);

  // 2. HER DEĞİŞİKLİKTE HAFIZAYA KAYDET
  useEffect(() => {
    localStorage.setItem("nextlogi_cart", JSON.stringify(quantities));
  }, [quantities]);

  const cartItems = PRODUCTS.filter(p => quantities[p.id] > 0);
  const total = cartItems.reduce((sum, p) => sum + Number(quantities[p.id]), 0);

  return (
    <div style={{ backgroundColor: '#05070a', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      
      {/* ÜRÜN GİRİŞ ALANI (Sabit Tasarım) */}
      <div style={{ flex: 1, padding: '40px', borderRight: '1px solid #1e293b' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '30px' }}>Döner Point</h2>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#0f172a', marginBottom: '10px', borderRadius: '15px', border: quantities[p.id] > 0 ? '1px solid #3b82f6' : '1px solid #1e293b' }}>
            <span>{p.name}</span>
            <input 
              type="number" 
              value={quantities[p.id] || ""} 
              onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
              style={{ width: '80px', backgroundColor: '#05070a', color: 'white', border: '1px solid #3b82f6', borderRadius: '8px', textAlign: 'center' }}
            />
          </div>
        ))}
      </div>

      {/* SEPET ÖZETİ */}
      <div style={{ width: '350px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px' }}>SİPARİŞ ÖZETİ</h3>
        <div style={{ flex: 1 }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '12px', marginBottom: '10px', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ color: '#3b82f6' }}>{quantities[item.id]} {item.unit}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '20px 0', borderTop: '1px solid #1e293b', display: 'flex', justifyContent: 'space-between' }}>
          <span>Toplam</span>
          <span style={{ fontWeight: 'bold' }}>{total} Birim</span>
        </div>
        
        <button 
          onClick={() => setShowResult(true)}
          style={{ width: '100%', padding: '20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          SİPARİŞİ ONAYLA
        </button>
      </div>

      {/* SONUÇ EKRANI */}
      {showResult && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#0f172a', padding: '50px', borderRadius: '30px', textAlign: 'center', border: '1px solid #3b82f6' }}>
            <h2>✅ SİPARİŞ ALINDI</h2>
            <button onClick={() => {setShowResult(false); setQuantities({}); localStorage.removeItem("nextlogi_cart");}} style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>KAPAT VE SIFIRLA</button>
          </div>
        </div>
      )}
    </div>
  );
}