// 1. Durum Tanımı (En üste ekle)
const [showSuccess, setShowSuccess] = useState(false);
const [orderId, setOrderId] = useState("");

// 2. Sipariş Tamamlama Fonksiyonu
const handleOrderComplete = () => {
  const newId = "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  setOrderId(newId);
  setShowSuccess(true); // Başarı ekranını açar
};

// 3. Başarı Ekranı Tasarımı (Render kısmının en altına, ana div içine ekle)
{showSuccess && (
  <div style={{
    position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.9)', 
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
    backdropFilter: 'blur(10px)'
  }}>
    <div style={{
      backgroundColor: '#161b22', padding: '50px', borderRadius: '40px', 
      textAlign: 'center', border: '1px solid #238636', maxWidth: '400px', width: '90%'
    }}>
      <div style={{ fontSize: '60px', marginBottom: '20px' }}>✅</div>
      <h2 style={{ fontSize: '2rem', fontWeight: '900', color: 'white', marginBottom: '10px' }}>SİPARİŞ ALINDI!</h2>
      <p style={{ color: '#8b949e', marginBottom: '10px' }}>Siparişiniz başarıyla sisteme kaydedildi.</p>
      <div style={{ fontSize: '14px', color: '#2563eb', fontWeight: 'bold', marginBottom: '30px' }}>KOD: {orderId}</div>
      
      <button 
        onClick={() => { setShowSuccess(false); setStep("customer"); setQuantities({}); }}
        style={{ 
          width: '100%', padding: '15px', backgroundColor: 'white', color: 'black', 
          borderRadius: '15px', fontWeight: 'bold', cursor: 'pointer', border: 'none' 
        }}
      >
        YENİ SİPARİŞE BAŞLA
      </button>
    </div>
  </div>
)}