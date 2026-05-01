// App.js içeriğini bununla değiştir Kaptan!
import React, { useState } from 'react';
import { Bell, Lock, CheckCircle, FileText, Smartphone, ShieldCheck, Download, Loader2 } from 'lucide-react';

export default function NextLogiUltimate() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Kritik Uyarı', text: 'Tüm PRO modüller aktif. Ödeme bekliyor.', type: 'warning' }
  ]);

  const modules = [
    { name: 'Lojistik Operasyon', price: 150 },
    { name: 'Sürücü Mobil App', price: 350 },
    { name: 'Finans Yönetimi', price: 245 },
    { name: 'Gelişmiş PDF Raporlama', price: 100 }
  ];

  const total = modules.reduce((acc, curr) => acc + curr.price, 0);

  const handleSealAction = () => {
    setIsGenerating(true);
    // Rapor üretme simülasyonu (2 saniye)
    setTimeout(() => {
      setIsGenerating(false);
      setIsSealed(true);
      setShowReport(true);
      setNotifications([
        { id: 2, title: 'Mühür Basıldı & Rapor Hazır', text: '€845.00 tahsil edildi. Rapor telefonunuza indirildi.', type: 'success' },
        ...notifications
      ]);
    }, 2000);
  };

  if (!isLoggedIn) {
    return (
      <div style={{ backgroundColor: '#0a0a0a', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ backgroundColor: '#111', padding: '40px', borderRadius: '20px', textAlign: 'center', width: '100%', maxWidth: '400px', border: '1px solid #333' }}>
          <div style={{ background: '#00d4ff', width: '60px', height: '60px', borderRadius: '15px', margin: '0 auto 20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ShieldCheck size={35} color="#000" />
          </div>
          <h1 style={{ fontSize: '24px', marginBottom: '10px' }}>NextLogi 3.0 PRO</h1>
          <p style={{ color: '#888', fontSize: '14px' }}>Güvenli Mobil Giriş Portalı</p>
          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <label style={{ fontSize: '12px', color: '#666' }}>KURUMSAL E-POSTA</label>
            <input type="email" readOnly value="ocak1970@hotmail.com" style={{ width: '100%', padding: '12px', marginTop: '5px', borderRadius: '8px', border: '1px solid #222', background: '#000', color: '#fff' }} />
          </div>
          <button onClick={() => setIsLoggedIn(true)} style={{ width: '100%', marginTop: '20px', padding: '15px', borderRadius: '10px', background: '#00d4ff', color: '#000', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Sistemi Başlat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', paddingBottom: '80px' }}>
      {/* Üst Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', borderBottom: '1px solid #222', position: 'sticky', top: 0, backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
        <span style={{ fontWeight: 'bold', letterSpacing: '2px' }}>NEXTLOGI <span style={{ color: '#00d4ff' }}>PRO</span></span>
        <div style={{ position: 'relative' }}>
          <Bell size={24} color={isSealed ? '#00ff88' : '#ff4d4d'} />
          <span style={{ position: 'absolute', top: -5, right: -5, background: isSealed ? '#00ff88' : '#ff4d4d', color: '#000', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>{notifications.length}</span>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {/* Durum Kartı */}
        <div style={{ background: 'linear-gradient(145deg, #111, #050505)', padding: '25px', borderRadius: '20px', border: '1px solid #222', marginBottom: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, color: '#888', fontSize: '14px' }}>AYLIK TAAHHÜT</h3>
              <h2 style={{ margin: '5px 0', fontSize: '32px' }}>€{total}.00</h2>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ padding: '5px 12px', borderRadius: '20px', background: isSealed ? '#00ff8822' : '#ff4d4d22', color: isSealed ? '#00ff88' : '#ff4d4d', fontSize: '12px', fontWeight: 'bold' }}>
                {isSealed ? 'MÜHÜRLENDİ' : 'ÖDEME BEKLİYOR'}
              </span>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            {modules.map(m => (
              <div key={m.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '8px 0', borderBottom: '1px solid #1a1a1a' }}>
                <span style={{ color: '#ccc' }}>{m.name}</span>
                <span style={{ color: '#00ff88' }}>● Aktif</span>
              </div>
            ))}
          </div>

          <button 
            onClick={handleSealAction}
            disabled={isSealed || isGenerating}
            style={{ width: '100%', marginTop: '25px', padding: '18px', borderRadius: '12px', background: isSealed ? '#222' : '#00ff88', color: '#000', border: 'none', fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {isGenerating ? <><Loader2 className="animate-spin" size={20} /> RAPOR ÜRETİLİYOR...</> : 
             isSealed ? <><CheckCircle size={20} /> İŞLEM TAMAMLANDI</> : 
             <><Lock size={20} /> SİSTEMİ MÜHÜRLE & RAPOR AL</>}
          </button>
        </div>

        {/* Dinamik Rapor Kartı (Sadece Mühürden Sonra Görünür) */}
        {showReport && (
          <div style={{ background: '#00d4ff11', border: '1px border #00d4ff', padding: '20px', borderRadius: '20px', animation: 'slideUp 0.5s ease' }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              <div style={{ background: '#00d4ff', padding: '10px', borderRadius: '10px' }}>
                <FileText color="#000" />
              </div>
              <div>
                <h4 style={{ margin: 0 }}>Operasyon Raporu.pdf</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#00d4ff' }}>Başarıyla indirildi (1.2 MB)</p>
              </div>
              <Download size={20} style={{ marginLeft: 'auto', color: '#00d4ff' }} />
            </div>
          </div>
        )}
      </div>

      {/* Alt Uyarı Barı */}
      {!isSealed && (
        <div style={{ position: 'fixed', bottom: 0, width: '100%', background: '#ff4d4d', color: '#fff', padding: '15px', textAlign: 'center', fontSize: '13px', fontWeight: 'bold' }}>
          ⚠️ SİSTEM KISITLANMAK ÜZERE: Lütfen mühürleme işlemini tamamlayın.
        </div>
      )}
    </div>
  );
}