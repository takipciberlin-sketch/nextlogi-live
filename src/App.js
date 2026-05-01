import React, { useState, useEffect } from "react";

export default function NextLogiCustomerApp() {
  // 1. DURUM YÖNETİMİ (KİM GİRDİ? NE ALDI?)
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({ phone: "", name: "" });
  const [loginInput, setLoginInput] = useState("");
  const [quantities, setQuantities] = useState({});

  // PDF ÜRÜN LİSTESİ (SABİT)
  const fullInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 2, name: "Bullen-Keule mit Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 48, name: "KalbsSchwanz", cat: "Kalb", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  // 2. GİRİŞ MANTIĞI (BASİTÇE)
  const handleLogin = () => {
    if (loginInput.length >= 5) { // En az 5 haneli bir numara/kod
      setCustomerInfo({ phone: loginInput, name: "Değerli Müşterimiz" });
      setIsLoggedIn(true);
    } else {
      alert("Lütfen geçerli bir müşteri numarası veya telefon giriniz.");
    }
  };

  const handleOrderComplete = () => {
    const orderedItems = fullInventory.filter(p => quantities[p.id] > 0);
    if (orderedItems.length === 0) return alert("Sepetiniz boş!");
    
    // SİPARİŞİ ONAYLAMA (Burada veriyi Admin'e gönderme hazırlığı yapılıyor)
    alert(`Sayın ${customerInfo.phone}, siparişiniz başarıyla alındı!`);
    setQuantities({}); // Sipariş bitince sepeti sıfırla
    setIsLoggedIn(false); // Güvenli çıkış
  };

  // --- EKRAN 1: GİRİŞ EKRANI (MOBİL UYUMLU) ---
  if (!isLoggedIn) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#090d11', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
        <h1 style={{ color: '#2ecc71', marginBottom: '10px' }}>NEXTLOGI</h1>
        <p style={{ color: '#8b949e', marginBottom: '30px' }}>Müşteri Girişi</p>
        <input 
          type="tel" 
          placeholder="Müşteri No veya Telefon" 
          value={loginInput}
          onChange={(e) => setLoginInput(e.target.value)}
          style={{ width: '100%', maxWidth: '300px', padding: '15px', borderRadius: '10px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white', fontSize: '16px', marginBottom: '20px' }}
        />
        <button onClick={handleLogin} style={{ width: '100%', maxWidth: '300px', padding: '15px', backgroundColor: '#2ecc71', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', color: '#090d11' }}>GİRİŞ YAP</button>
      </div>
    );
  }

  // --- EKRAN 2: SİPARİŞ EKRANI (MÜŞTERİ PANELİ) ---
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#090d11', color: 'white', fontFamily: 'sans-serif' }}>
      
      {/* ÜST BİLGİ */}
      <div style={{ padding: '20px', borderBottom: '1px solid #161b22', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontSize: '12px', color: '#8b949e' }}>Müşteri:</div>
          <div style={{ fontWeight: 'bold' }}>{customerInfo.phone}</div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={{ backgroundColor: 'transparent', color: '#f85149', border: 'none', cursor: 'pointer' }}>Çıkış</button>
      </div>

      {/* ÜRÜN LİSTESİ */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '15px' }}>
        {fullInventory.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{p.name}</div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>{p.unit}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '35px', height: '35px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '8px' }}>-</button>
              <span style={{ minWidth: '20px', textAlign: 'center' }}>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '35px', height: '35px', backgroundColor: '#0d1117', color: 'white', border: '1px solid #30363d', borderRadius: '8px' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* ALT SİPARİŞ TAMAMLA BUTONU */}
      <div style={{ padding: '20px', backgroundColor: '#0d1117', borderTop: '1px solid #161b22' }}>
        <button 
          onClick={handleOrderComplete}
          style={{ width: '100%', padding: '18px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
        >
          SİPARİŞİ GÖNDER ({fullInventory.filter(p => quantities[p.id] > 0).length} Ürün)
        </button>
      </div>
    </div>
  );
}