import React, { useState } from "react";

export default function NextLogi_Admin_Final() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [registeredList, setRegisteredList] = useState([
    { id: 1, name: "Örnek Müşteri", phone: "12345" }
  ]);

  // TEST İÇİN: Müşteriden gelen hayali bir sipariş
  const [incomingOrders, setIncomingOrders] = useState([
    { id: 101, customer: "Örnek Müşteri", items: "2kg Dana, 1kg Tavuk", status: "Beklemede" }
  ]);

  const saveCustomer = () => {
    if(customerName && phone) {
      setRegisteredList([...registeredList, { id: Date.now(), name: customerName, phone: phone }]);
      setCustomerName(""); setPhone("");
    }
  };

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', color: 'white', padding: '20px', fontFamily: 'sans-serif' }}>
      
      <h2 style={{ color: '#2ecc71', textAlign: 'center', fontWeight: '300' }}>Firma Yönetim Paneli</h2>

      {/* image_3ad41c.png BURAYA GELİYOR */}
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <img src="image_3ad41c.png" alt="Divider" style={{ maxWidth: '300px', opacity: 0.6 }} />
      </div>

      {/* MÜŞTERİ KAYIT (Görseldeki Kutu) */}
      <div style={{ backgroundColor: '#111418', padding: '25px', borderRadius: '20px', border: '1px solid #1c2128', maxWidth: '500px', margin: '0 auto' }}>
        <h4 style={{ marginTop: 0, color: '#8b949e' }}>Yeni Müşteri Tanımla</h4>
        <input 
           type="text" placeholder="Müşteri Adı / İşletme Adı" value={customerName}
           onChange={(e) => setCustomerName(e.target.value)}
           style={{ width: '100%', padding: '15px', backgroundColor: '#090d11', border: '1px solid #1c2128', borderRadius: '10px', color: 'white', marginBottom: '15px' }}
        />
        <input 
           type="tel" placeholder="Cep Telefonu Numarası" value={phone}
           onChange={(e) => setPhone(e.target.value)}
           style={{ width: '100%', padding: '15px', backgroundColor: '#090d11', border: '1px solid #1c2128', borderRadius: '10px', color: 'white', marginBottom: '20px' }}
        />
        <button onClick={saveCustomer} style={{ width: '100%', padding: '18px', backgroundColor: '#2ecc71', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
          SİSTEME KAYDET
        </button>
      </div>

      {/* CANLI SİPARİŞLER (Yeni Eklenen Mantık) */}
      <div style={{ maxWidth: '500px', margin: '40px auto' }}>
        <h3 style={{ borderLeft: '4px solid #2ecc71', paddingLeft: '10px' }}>Gelen Siparişler</h3>
        {incomingOrders.map(order => (
          <div key={order.id} style={{ backgroundColor: '#161b22', padding: '15px', borderRadius: '12px', marginTop: '10px', border: '1px solid #30363d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: 'bold', color: '#2ecc71' }}>{order.customer}</span>
              <span style={{ fontSize: '12px', backgroundColor: '#238636', padding: '2px 8px', borderRadius: '10px' }}>{order.status}</span>
            </div>
            <div style={{ fontSize: '14px', marginTop: '5px', color: '#8b949e' }}>{order.items}</div>
            <button style={{ marginTop: '10px', width: '100%', padding: '8px', background: 'none', border: '1px solid #30363d', color: 'white', borderRadius: '5px', cursor: 'pointer' }}>Şoföre Ata</button>
          </div>
        ))}
      </div>

    </div>
  );
}