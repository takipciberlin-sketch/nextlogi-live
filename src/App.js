/**
 * NEXTLOGI - MODÜL 4 (ŞOFÖR - iPAD EDİSYONU)
 * Mantık: iPad yatay/dikey ekranında maksimum ergonomi.
 * Durum: MÜHÜRLENDİ 🔒
 */
import React, { useState } from "react";

export default function NextLogi_iPad_Driver_Final() {
  const [tasks, setTasks] = useState([
    { id: 101, customer: "Özcan Et & Kasap", items: "5kg Dana Antrikot, 3 Koli Tavuk", status: "YOLDA" }
  ]);

  const handleDelivery = (id) => {
    // Gerçek sistemde bu buton basıldığında Firma Sahibi'ne bildirim gider.
    setTasks([]);
    alert("Teslimat Tamamlandı. Yeni iş bekleniyor...");
  };

  if (tasks.length === 0) {
    return (
      <div style={{ backgroundColor: '#090d11', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#2ecc71' }}>
        <div style={{ fontSize: '100px' }}>🚚</div>
        <h1 style={{ fontSize: '40px' }}>Yeni Sipariş Bekleniyor...</h1>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', color: 'white', fontFamily: 'sans-serif', padding: '40px' }}>
      
      {/* ÜST BAŞLIK */}
      <div style={{ borderBottom: '1px solid #1c2128', paddingBottom: '20px', marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '35px', color: '#2ecc71' }}>Şoför Teslimat Ekranı</h1>
        <div style={{ fontSize: '20px', color: '#8b949e' }}>iPad Modu Aktif</div>
      </div>

      {tasks.map(task => (
        <div key={task.id} style={{ 
          backgroundColor: '#111418', 
          borderRadius: '30px', 
          padding: '50px', 
          border: '2px solid #30363d',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
        }}>
          {/* MÜŞTERİ VE DURUM */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h2 style={{ fontSize: '60px', margin: '0 0 10px 0' }}>{task.customer}</h2>
              <p style={{ fontSize: '30px', color: '#8b949e' }}>{task.items}</p>
            </div>
            <div style={{ backgroundColor: '#9e6a03', padding: '15px 30px', borderRadius: '15px', fontSize: '24px', fontWeight: 'bold' }}>
              {task.status}
            </div>
          </div>

          {/* image_3071b6.png'deki O DEV BUTON */}
          <div style={{ marginTop: '80px' }}>
            <button 
              onClick={() => handleDelivery(task.id)}
              style={{ 
                width: '100%', 
                height: '200px', // iPad'de devasa duracak
                backgroundColor: '#2ecc71', 
                color: '#090d11', 
                border: 'none', 
                borderRadius: '25px', 
                fontSize: '50px', 
                fontWeight: '900',
                cursor: 'pointer',
                boxShadow: '0 15px 45px rgba(46, 204, 113, 0.4)'
              }}
            >
              TESLİM ETTİM
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}