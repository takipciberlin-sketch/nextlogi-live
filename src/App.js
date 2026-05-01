// 1. ADIM: Durum Kontrolü (State) ekle
const [showSuccess, setShowSuccess] = useState(false);
const [orderId, setOrderId] = useState("");

// 2. ADIM: Tamamlama Fonksiyonunu Güncelle
const handleComplete = () => {
  const randomId = "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  setOrderId(randomId);
  setShowSuccess(true); // Sonuç ekranını tetikler
};

// 3. ADIM: Siparişi Tamamla Butonuna Fonksiyonu Bağla
<button onClick={handleComplete}>SİPARİŞİ TAMAMLA</button>

// 4. ADIM: Sonuç Ekranı Tasarımı (Render sonuna ekle)[cite: 1]
{showSuccess && (
  <div style={{
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.95)', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
    backdropFilter: 'blur(15px)'
  }}>
    <div style={{
      backgroundColor: '#161b22', padding: '60px', borderRadius: '40px', 
      textAlign: 'center', border: '1px solid #238636', boxShadow: '0 0 50px rgba(35,134,54,0.2)'
    }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ fontSize: '2.5rem', fontWeight: '900', color: 'white' }}>İŞLEM TAMAM!</h2>
      <p style={{ color: '#8b949e', fontSize: '1.1rem', margin: '15px 0' }}>Siparişiniz başarıyla işlendi.</p>
      <div style={{ backgroundColor: '#0d1117', padding: '10px 20px', borderRadius: '10px', color: '#2f81f7', fontWeight: 'bold', display: 'inline-block', marginBottom: '40px' }}>
        KAYIT NO: {orderId}
      </div>
      <br/>
      <button 
        onClick={() => { setShowSuccess(false); setQuantities({}); setStep("customer"); }}
        style={{ padding: '18px 50px', backgroundColor: 'white', color: 'black', borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
      >
        YENİ SİPARİŞ OLUŞTUR
      </button>
    </div>
  </div>
)}