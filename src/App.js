import React, { useState } from "react";

export default function NextLogiSecureEntry() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginInput, setLoginInput] = useState("");
  const [quantities, setQuantities] = useState({});

  // 1. KAYITLI NUMARALAR LİSTESİ (Firma Sahibi burayı yönetecek)
  // Şimdilik test etmen için buraya örnek numaralar ekledim.
  const [registeredNumbers, setRegisteredNumbers] = useState(["5551112233", "5449998877", "12345"]);

  // 2. ÜRÜN LİSTESİ (Sapa Sağlam Liste)
  const fullInventory = [
    { id: 1, name: "Bullen-Vorderviertel ohne Knochen", cat: "Rind/Bulle", unit: "kg" },
    { id: 31, name: "Hähnchen-Keule mit Knochen", cat: "Hähnchen", unit: "kg" },
    { id: 45, name: "Kalbs-Keule", cat: "Kalb", unit: "kg" },
    { id: 60, name: "Gemüscht Häckfleisch", cat: "Verarbeitet", unit: "kg" }
  ];

  const handleLogin = () => {
    // Sadece listede olan numaralar girebilir
    if (registeredNumbers.includes(loginInput.trim())) {
      setIsLoggedIn(true);
    } else {
      alert("Bu numara sistemde kayıtlı değil. Lütfen firma sahibi ile iletişime geçin.");
    }
  };

  // --- GİRİŞ EKRANI (image_3bcec2.png SADIK TASARIM) ---
  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#090d11', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
        <h2 style={{ color: '#2ecc71', marginBottom: '10px' }}>NEXTLOGI</h2>
        <p style={{ color: '#8b949e', marginBottom: '40px' }}>Müşteri Girişi</p>
        
        <div style={{ width: '100%', maxWidth: '350px' }}>
          <input 
            type="tel" 
            placeholder="Cep Numaranızı Giriniz"
            value={loginInput}
            onChange={(e) => setLoginInput(e.target.value)}
            style={{
              width: '100%', padding: '18px', backgroundColor: '#111418', border: '1px solid #1c2128',
              borderRadius: '12px', color: 'white', fontSize: '18px', marginBottom: '20px', textAlign: 'center', outline: 'none'
            }}
          />
          <button 
            onClick={handleLogin}
            style={{
              width: '100%', padding: '18px', backgroundColor: '#2ecc71', color: '#090d11',
              border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer'
            }}
          >
            GİRİŞ YAP
          </button>
        </div>
      </div>
    );
  }

  // --- SİPARİŞ EKRANI ---
  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ padding: '20px', borderBottom: '1px solid #161b22', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>NEXTLOGI</span>
          <div style={{ fontSize: '12px', color: '#8b949e' }}>No: {loginInput}</div>
        </div>
        <button onClick={() => setIsLoggedIn(false)} style={{ color: '#f85149', background: 'none', border: 'none' }}>Çıkış</button>
      </div>

      <div style={{ padding: '15px' }}>
        {fullInventory.map(p => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '15px', borderRadius: '12px', marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold' }}>{p.name}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button onClick={() => setQuantities({...quantities, [p.id]: Math.max(0, (quantities[p.id]||0)-1)})} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}>-</button>
              <span>{quantities[p.id] || 0}</span>
              <button onClick={() => setQuantities({...quantities, [p.id]: (quantities[p.id]||0)+1})} style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid #30363d', backgroundColor: '#0d1117', color: 'white' }}>+</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '20px', position: 'sticky', bottom: 0, backgroundColor: '#0d1117' }}>
        <button style={{ width: '100%', padding: '18px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>
          SİPARİŞİ GÖNDER
        </button>
      </div>
    </div>
  );
}