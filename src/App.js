import React, { useState } from "react";

/**
 * NEXTLOGI - MODÜL 4 (ŞOFÖR)
 * Mantık: Firma sahibinden gelen işi gör ve "Teslim Edildi" olarak işaretle.
 */
export default function NextLogiDriverApp() {
  // Firma sahibinden "Şoföre Ata" denilince buraya düşen hayali veri
  const [myTasks, setMyTasks] = useState([
    { id: 101, customer: "Örnek Müşteri", items: "2kg Dana, 1kg Tavuk", status: "Yolda" }
  ]);

  const handleDelivery = (id) => {
    setMyTasks(myTasks.map(task => 
      task.id === id ? { ...task, status: "Teslim Edildi" } : task
    ));
    alert("Sipariş başarıyla teslim edildi! Firma sahibine bilgi verildi.");
  };

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2ecc71', textAlign: 'center' }}>Şoför Paneli</h2>
      
      <p style={{ color: '#8b949e', textAlign: 'center', fontSize: '14px' }}>Bugünkü Teslimatların</p>

      {myTasks.map(task => (
        <div key={task.id} style={{ 
          backgroundColor: '#161b22', 
          padding: '20px', 
          borderRadius: '15px', 
          marginTop: '20px', 
          borderLeft: task.status === "Teslim Edildi" ? '5px solid #2ecc71' : '5px solid #f1c40f' 
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '18px' }}>{task.customer}</span>
            <span style={{ 
              fontSize: '12px', 
              padding: '4px 8px', 
              borderRadius: '5px', 
              backgroundColor: task.status === "Teslim Edildi" ? '#238636' : '#9e6a03' 
            }}>
              {task.status}
            </span>
          </div>
          
          <div style={{ color: '#8b949e', marginBottom: '20px' }}>
            {task.items}
          </div>

          {task.status !== "Teslim Edildi" && (
            <button 
              onClick={() => handleDelivery(task.id)}
              style={{ 
                width: '100%', 
                padding: '15px', 
                backgroundColor: '#2ecc71', 
                color: '#090d11', 
                border: 'none', 
                borderRadius: '10px', 
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            >
              TESLİM ETTİM
            </button>
          )}
        </div>
      ))}

      {myTasks.filter(t => t.status === "Teslim Edildi").length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '30px', color: '#8b949e', fontSize: '12px' }}>
          ✓ Tamamlanan teslimatlar arşive taşındı.
        </div>
      )}
    </div>
  );
}