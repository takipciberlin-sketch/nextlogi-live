/**
 * NEXTLOGI - MODÜL 4 (ŞOFÖR - ULTRA ERGONOMİK)
 * Mantık: Maksimum görünürlük, dev butonlar.
 */
import React, { useState } from "react";

export default function NextLogiDriverMegaButton() {
  const [tasks, setTasks] = useState([
    { id: 101, customer: "Örnek Müşteri", items: "2kg Dana, 1kg Tavuk", status: "Yolda" }
  ]);

  const completeJob = (id) => {
    setTasks(tasks.filter(t => t.id !== id)); // Teslim edileni listeden kaldır (ekran temiz kalsın)
    alert("Teslimat Tamamlandı!");
  };

  if (tasks.length === 0) {
    return (
      <div style={{ backgroundColor: '#090d11', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b949e' }}>
        <h2>Bekleyen İş Yok 👍</h2>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', color: 'white', padding: '10px', fontFamily: 'sans-serif' }}>
      
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ color: '#2ecc71', fontSize: '30px', margin: 0 }}>Şoför Paneli</h1>
        <p style={{ color: '#8b949e' }}>Bugünkü Teslimatların</p>
      </div>

      {tasks.map(task => (
        <div key={task.id} style={{ 
          backgroundColor: '#111418', 
          borderRadius: '25px', 
          padding: '30px', 
          border: '2px solid #1c2128',
          marginBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '60vh' // Ekranın %60'ını kaplasın
        }}>
          {/* ÜST BİLGİ ALANI */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <h2 style={{ fontSize: '36px', margin: 0 }}>{task.customer}</h2>
               <span style={{ backgroundColor: '#9e6a03', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>YOLDA</span>
            </div>
            <p style={{ fontSize: '24px', color: '#8b949e', marginTop: '20px' }}>{task.items}</p>
          </div>

          {/* İŞTE O ABARTILI BÜYÜK BUTON */}
          <button 
            onClick={() => completeJob(task.id)}
            style={{ 
              width: '100%', 
              height: '150px', // Devasa yükseklik
              backgroundColor: '#2ecc71', 
              color: '#090d11', 
              border: 'none', 
              borderRadius: '20px', 
              fontSize: '40px', // Devasa yazı
              fontWeight: '900',
              cursor: 'pointer',
              boxShadow: '0 10px 30px rgba(46, 204, 113, 0.3)',
              textTransform: 'uppercase'
            }}
          >
            TESLİM ETTİM
          </button>
        </div>
      ))}
    </div>
  );
}