import React, { useState, useEffect } from "react";

// --- SABİT ÜRÜN LİSTESİ ---
const PRODUCTS = [
  { id: 1, name: "Kalb Döner 10kg", unit: "Spieß" },
  { id: 2, name: "Hähnchen Döner 5kg", unit: "Spieß" },
  { id: 3, name: "Sucuk (Kangal)", unit: "Kg" }
];

export default function NextLogiV20_Final() {
  // 1. HAFIZADAN ÇAĞIR: Sayfa yenilendiğinde verilerin kaybolmasını engeller
  const [quantities, setQuantities] = useState(() => {
    const saved = localStorage.getItem("nextlogi_cart");
    return saved ? JSON.parse(saved) : {};
  });

  const [showResult, setShowResult] = useState(false);
  const [orderId, setOrderId] = useState("");

  // 2. HAFIZAYA YAZ: Her giriş yapıldığında tarayıcıya otomatik kaydeder
  useEffect(() => {
    localStorage.setItem("nextlogi_cart", JSON.stringify(quantities));
  }, [quantities]);

  const cartItems = PRODUCTS.filter(p => quantities[p.id] > 0);
  const totalWeight = cartItems.reduce((sum, item) => sum + Number(quantities[item.id] || 0), 0);

  // 3. SİPARİŞİ ONAYLA: Sonuç ekranını tetikler
  const handleOrder = () => {
    const code = "ORD-" + Math.floor(1000 + Math.random() * 9000);
    setOrderId(code);
    setShowResult(true);
  };

  return (
    <div style={{ backgroundColor: '#05070a', color: 'white', minHeight: '100vh', display: 'flex', fontFamily: 'sans-serif' }}>
      
      {/* SOL PANEL: Ürün Girişi (image_496361.jpg tasarımı) */}
      <div style={{ flex: 1, padding: '40px', borderRight: '1px solid #1e293b' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
          <div style={{ background: '#1e293b', padding: '10px', borderRadius: '10px', cursor: 'pointer' }}>←</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Döner Point</h2>
        </div>

        {PRODUCTS.map(p => (
          <div key={p.id} style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '25px', 
            backgroundColor: '#0f172a', marginBottom: '10px', borderRadius: '15px', 
            border: quantities[p.id] > 0 ? '1px solid #3b82f6' : '1px solid #1e293b' 
          }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{p.name}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input 
                type="number" 
                value={quantities[p.id] || ""} 
                onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                style={{ width: '80px', backgroundColor: '#05070a', color: 'white', border: '1px solid #3b82f6', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}
              />
              <span style={{ color: '#475569', width: '40px' }}>{p.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* SAĞ PANEL: Canlı Sepet Özet */}
      <div style={{ width: '380px', padding: '30px', backgroundColor: '#05070a', display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontSize: '12px', color: '#64748b', letterSpacing: '1.5px', marginBottom: '30px' }}>SİPARİŞ ÖZETİ</h3>
        
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ padding: '15px', backgroundColor: '#0f172a', borderRadius: '15px', marginBottom: '10px', borderLeft: '4px solid #3b82f6' }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.name}</div>
              <div style={{ color: '#3b82f6', marginTop: '5px' }}>{quantities[item.id]} {item.unit}</div>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #1e293b', padding: '20px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: '#64748b' }}>Toplam Miktar</span>
          <span style={{ fontWeight: 'bold' }}>{totalWeight} Birim</span>
        </div>

        <button 
          onClick={handleOrder}
          disabled={cartItems.length === 0}
          style={{ width: '100%', padding: '20px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
        >
          SİPARİŞİ ONAYLA
        </button>
      </div>

      {/* ✅ SONUÇ EKRANI (Modal) */}
      {showResult && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#0f172a', padding: '50px', borderRadius: '30px', textAlign: 'center', border: '1px solid #3b82f6' }}>
            <div style={{ fontSize: '50px', marginBottom: '15px' }}>✅</div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>SİPARİŞ KAYDEDİLDİ</h2>
            <p style={{ color: '#64748b' }}>Takip No: <span style={{ color: 'white' }}>{orderId}</span></p>
            <button 
              onClick={() => { setShowResult(false); setQuantities({}); localStorage.removeItem("nextlogi_cart"); }}
              style={{ marginTop: '30px', padding: '15px 40px', backgroundColor: 'white', color: 'black', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              YENİ SİPARİŞE BAŞLA
            </button>
          </div>
        </div>
      )}
    </div>
  );
}