import React, { useState, useMemo } from "react";

// --- VERİLER ---
const CUSTOMERS = [
  { id: 1, name: "Berlin Grillhaus", city: "Berlin", code: "BER-001" },
  { id: 2, name: "Döner Point", city: "Hamburg", code: "HAM-042" },
  { id: 3, name: "Antalya Imbiss", city: "Berlin", code: "BER-099" }
];

const PRODUCTS = [
  { id: 101, name: "Kalb Döner 10kg", unit: "Spieß", cat: "Kalb", color: "#a78bfa" },
  { id: 102, name: "Hähnchen Döner 5kg", unit: "Spieß", cat: "Hähnchen", color: "#facc15" },
  { id: 103, name: "Sucuk (Kangal)", unit: "Kg", cat: "Verarbeitet", color: "#94a3b8" },
  { id: 104, name: "Lammkotelett", unit: "Kg", cat: "Lamm", color: "#34d399" }
];

// --- SVG IKONLAR (Kütüphane gerektirmez) ---
const IconSearch = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>;
const IconUser = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const IconCart = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>;

export default function NextLogiV20() {
  const [step, setStep] = useState("customer");
  const [selectedCust, setSelectedCust] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [orderDone, setOrderDone] = useState(false);

  const filteredCust = CUSTOMERS.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.city.toLowerCase().includes(search.toLowerCase()));

  // --- 1. ADIM: MÜŞTERİ SEÇİMİ ---
  if (step === "customer") {
    return (
      <div style={{ backgroundColor: '#0d1117', color: '#e6edf3', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px' }}>
              NEXTLOGI <span style={{ color: '#2f81f7' }}>v20</span>
            </h1>
            <p style={{ color: '#8b949e', marginTop: '8px' }}>Lütfen işlem yapmak istediğiniz müşteriyi seçin.</p>
          </div>

          <div style={{ position: 'relative', marginBottom: '24px' }}>
            <div style={{ position: 'absolute', left: '16px', top: '18px', color: '#8b949e' }}><IconSearch /></div>
            <input 
              style={{ width: '100%', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '16px', padding: '18px 18px 18px 48px', color: 'white', fontSize: '16px', outline: 'none', transition: '0.2s' }}
              placeholder="Müşteri adı veya şehir ile ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gap: '12px' }}>
            {filteredCust.map(c => (
              <div 
                key={c.id} 
                onClick={() => { setSelectedCust(c); setStep("order"); }}
                style={{ backgroundColor: '#161b22', padding: '20px', borderRadius: '20px', border: '1px solid #30363d', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '20px', transition: '0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.borderColor = '#2f81f7'}
                onMouseOut={(e) => e.currentTarget.style.borderColor = '#30363d'}
              >
                <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'linear-gradient(135deg, #2f81f7, #1a56db)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconUser />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{c.name}</div>
                  <div style={{ color: '#8b949e', fontSize: '13px', marginTop: '4px' }}>📍 {c.city} • {c.code}</div>
                </div>
                <div style={{ color: '#30363d' }}>➔</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- 2. ADIM: KATALOG VE SEPET ---
  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#0d1117', color: 'white', fontFamily: 'sans-serif' }}>
      {/* Sol Panel: Katalog */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #30363d' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button onClick={() => setStep("customer")} style={{ background: '#21262d', border: '1px solid #30363d', color: 'white', padding: '8px 15px', borderRadius: '10px', cursor: 'pointer' }}>←</button>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{selectedCust.name}</h2>
            <p style={{ fontSize: '12px', color: '#8b949e', margin: 0 }}>ÜRÜN KATALOĞU</p>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {PRODUCTS.map(p => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#161b22', borderRadius: '16px', marginBottom: '10px', border: '1px solid #30363d' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: p.color }}></div>
                <span style={{ fontWeight: '500' }}>{p.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input 
                  type="number" 
                  style={{ width: '70px', backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', padding: '8px', color: '#2f81f7', textAlign: 'center', fontWeight: 'bold' }}
                  onChange={(e) => setCart({...cart, [p.id]: e.target.value})}
                />
                <span style={{ fontSize: '11px', color: '#8b949e', width: '30px' }}>{p.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel: Sepet Özet */}
      <div style={{ width: '350px', backgroundColor: '#0d1117', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
          <IconCart />
          <h3 style={{ fontSize: '14px', fontWeight: '900', letterSpacing: '1px' }}>SEPET ÖZETİ</h3>
        </div>

        <div style={{ flex: 1 }}>
          {Object.entries(cart).map(([id, qty]) => {
            if (!qty || qty <= 0) return null;
            const item = PRODUCTS.find(p => p.id === parseInt(id));
            return (
              <div key={id} style={{ padding: '12px', backgroundColor: '#161b22', borderRadius: '12px', marginBottom: '8px', borderLeft: `4px solid ${item.color}` }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#2f81f7' }}>{qty} {item.unit}</div>
              </div>
            );
          })}
        </div>

        <button 
          onClick={() => setOrderDone(true)}
          style={{ width: '100%', padding: '20px', backgroundColor: '#238636', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', transition: '0.2s' }}
        >
          SİPARİŞİ TAMAMLA
        </button>
      </div>

      {/* Başarı Mesajı */}
      {orderDone && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', backdropBlur: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#161b22', padding: '50px', borderRadius: '32px', textAlign: 'center', border: '1px solid #30363d', maxWidth: '400px' }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '10px' }}>BAŞARILI!</h2>
            <p style={{ color: '#8b949e', marginBottom: '30px' }}>Sipariş başarıyla sisteme iletildi.</p>
            <button onClick={() => { setOrderDone(false); setStep("customer"); setCart({}); }} style={{ width: '100%', padding: '15px', backgroundColor: 'white', color: 'black', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>ANA SAYFAYA DÖN</button>
          </div>
        </div>
      )}
    </div>
  );
}