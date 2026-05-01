import React, { useState } from "react";

const CUSTOMERS = [
  { id: "C1", name: "Döner Point", city: "Hamburg" },
  { id: "C2", name: "Berlin Grillhaus", city: "Berlin" }
];

const PRODUCTS = [
  { id: 1, name: "Kalb Döner 10kg", unit: "Spieß" },
  { id: 2, name: "Hähnchen Döner 5kg", unit: "Spieß" },
  { id: 3, name: "Sucuk (Kangal)", unit: "Kg" }
];

export default function NextLogiFinal() {
  const [step, setStep] = useState("customer");
  const [selectedCust, setSelectedCust] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showSuccess, setShowSuccess] = useState(false); // Sonuç ekranı kontrolü
  const [orderId, setOrderId] = useState("");

  const cartItems = PRODUCTS.filter(p => quantities[p.id] > 0);

  // SİPARİŞİ TAMAMLA BUTONUNA BASINCA ÇALIŞAN FONKSİYON
  const handlePlaceOrder = () => {
    const randomId = "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
    setOrderId(randomId); // Rastgele sipariş kodu üret
    setShowSuccess(true); // Sonuç ekranını göster[cite: 1]
  };

  if (step === "customer") {
    return (
      <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', padding: '40px' }}>
        <h1 style={{ fontStyle: 'italic', fontWeight: '900', color: '#2563eb' }}>NEXTLOGI v20</h1>
        {CUSTOMERS.map(c => (
          <div key={c.id} onClick={() => { setSelectedCust(c); setStep("order"); }} style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '20px', marginTop: '15px', cursor: 'pointer', border: '1px solid #30363d' }}>
            {c.name} - {c.city}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0d1117', color: 'white', minHeight: '100vh', display: 'flex' }}>
      {/* Ürün Listesi */}
      <div style={{ flex: 1, padding: '30px', borderRight: '1px solid #30363d' }}>
        <h2 style={{ fontSize: '2rem' }}>{selectedCust?.name}</h2>
        {PRODUCTS.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: '#161b22', marginBottom: '10px', borderRadius: '20px' }}>
            <span>{p.name}</span>
            <input 
              type="number" 
              value={quantities[p.id] || ""} 
              onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
              style={{ width: '80px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #2563eb', textAlign: 'center' }}
            />
          </div>
        ))}
      </div>

      {/* Sağ Panel: Sepet Özet */}
      <div style={{ width: '350px', padding: '30px', display: 'flex', flexDirection: 'column' }}>
        <h3>SİPARİŞ ÖZETİ</h3>
        <div style={{ flex: 1 }}>
          {cartItems.map(item => (
            <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #333' }}>
              {item.name}: {quantities[item.id]} {item.unit}[cite: 1]
            </div>
          ))}
        </div>
        
        {/* TAMAMLA BUTONU - handlePlaceOrder fonksiyonuna bağlı[cite: 1] */}
        <button 
          onClick={handlePlaceOrder}
          disabled={cartItems.length === 0}
          style={{ width: '100%', padding: '20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          SİPARİŞİ TAMAMLA
        </button>
      </div>

      {/* ✅ SONUÇ EKRANI (MODAL)[cite: 1] */}
      {showSuccess && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#161b22', padding: '50px', borderRadius: '30px', textAlign: 'center', border: '1px solid #238636' }}>
            <div style={{ fontSize: '50px' }}>✅</div>
            <h2 style={{ fontWeight: '900' }}>BAŞARILI!</h2>
            <p style={{ color: '#8b949e' }}>Sipariş No: {orderId}</p>[cite: 1]
            <button 
              onClick={() => { setShowSuccess(false); setQuantities({}); setStep("customer"); }}
              style={{ marginTop: '20px', padding: '15px 30px', backgroundColor: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              YAPTIĞIMIZ İŞLEMİ KAPAT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}