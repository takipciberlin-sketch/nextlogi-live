import React, { useState, useEffect } from "react";

export default function NextLogi_PWA_Customer() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [phone, setPhone] = useState("");

  // 1. ADIM: Uygulama açıldığında hafızayı kontrol et (Beni Hatırla)
  useEffect(() => {
    const savedPhone = localStorage.getItem("nextlogi_user");
    if (savedPhone) {
      setPhone(savedPhone);
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (phone.length > 3) {
      // Hafızaya mühürle
      localStorage.setItem("nextlogi_user", phone);
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("nextlogi_user");
    setIsLoggedIn(false);
    setPhone("");
  };

  if (!isLoggedIn) {
    return (
      <div className="pwa-container" style={styles.authBg}>
        <h1 style={styles.logo}>NEXTLOGI</h1>
        <p style={styles.subtitle}>Müşteri Girişi</p>
        <input 
          type="tel" 
          placeholder="Numaranızı Girin" 
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleLogin} style={styles.btn}>UYGULAMAYA GİR</button>
      </div>
    );
  }

  // Sipariş Ekranı (Daha önce mühürlediğimiz liste buraya gelecek)
  return (
    <div style={styles.appBg}>
       <div style={styles.header}>
         <span>Hoş geldin, {phone}</span>
         <button onClick={handleLogout} style={styles.logoutBtn}>Çıkış</button>
       </div>
       <div style={{padding: '20px', textAlign: 'center'}}>
          <p>Sipariş listesi yükleniyor...</p>
       </div>
    </div>
  );
}

const styles = {
  authBg: { backgroundColor: '#090d11', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  appBg: { backgroundColor: '#090d11', minHeight: '100vh', color: 'white' },
  logo: { color: '#2ecc71', fontSize: '40px', marginBottom: '5px' },
  subtitle: { color: '#8b949e', marginBottom: '30px' },
  input: { width: '80%', padding: '18px', backgroundColor: '#111418', border: '1px solid #1c2128', borderRadius: '12px', color: 'white', fontSize: '18px', textAlign: 'center' },
  btn: { width: '80%', marginTop: '20px', padding: '18px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px' },
  header: { padding: '15px', borderBottom: '1px solid #1c2128', display: 'flex', justifyContent: 'space-between', color: '#8b949e', fontSize: '12px' },
  logoutBtn: { background: 'none', border: 'none', color: '#f85149', cursor: 'pointer' }
};