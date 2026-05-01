import React, { useState } from "react";

/**
 * NEXTLOGI - MODÜL 3 (FİRMA SAHİBİ / ADMIN)
 * Fonksiyon: Müşteri numarasını sisteme kaydetme ve yönetme
 */
export default function NextLogiAdminPanel() {
  const [newCustomerPhone, setNewCustomerPhone] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [registeredList, setRegisteredList] = useState([
    { id: 1, name: "Örnek Müşteri", phone: "12345" }
  ]);

  const handleAddCustomer = () => {
    if (newCustomerPhone && customerName) {
      const newEntry = {
        id: Date.now(),
        name: customerName,
        phone: newCustomerPhone
      };
      setRegisteredList([...registeredList, newEntry]);
      setCustomerName("");
      setNewCustomerPhone("");
      alert("Müşteri başarıyla sisteme tanımlandı!");
    } else {
      alert("Lütfen tüm alanları doldurun.");
    }
  };

  const removeCustomer = (id) => {
    setRegisteredList(registeredList.filter(c => c.id !== id));
  };

  return (
    <div style={{ backgroundColor: '#090d11', minHeight: '100vh', color: 'white', padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#2ecc71', textAlign: 'center' }}>Firma Yönetim Paneli</h1>
      
      {/* ŞIK AYIRICI GÖRSELİ (DIVIDER) */}
      <div style={{ textAlign: 'center', margin: '30px 0' }}>
        <img 
          src="https://i.imgur.com/your-high-quality-divider.png" // İstediğin kaliteli görsel buraya gelecek
          alt="Divider" 
          style={{ maxWidth: '100%', height: 'auto', opacity: 0.8 }} 
        />
      </div>

      {/* MÜŞTERİ EKLEME ALANI */}
      <div style={{ backgroundColor: '#161b22', padding: '30px', borderRadius: '15px', maxWidth: '600px', margin: '0 auto', border: '1px solid #30363d' }}>
        <h3 style={{ marginBottom: '20px' }}>Yeni Müşteri Tanımla</h3>
        <input 
          type="text" 
          placeholder="Müşteri Adı / İşletme Adı" 
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          style={{ width: '100%', padding: '15px', marginBottom: '15px', backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: 'white' }}
        />
        <input 
          type="tel" 
          placeholder="Cep Telefonu Numarası" 
          value={newCustomerPhone}
          onChange={(e) => setNewCustomerPhone(e.target.value)}
          style={{ width: '100%', padding: '15px', marginBottom: '20px', backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: 'white' }}
        />
        <button 
          onClick={handleAddCustomer}
          style={{ width: '100%', padding: '15px', backgroundColor: '#2ecc71', color: '#090d11', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          SİSTEME KAYDET
        </button>
      </div>

      {/* KAYITLI MÜŞTERİLER LİSTESİ */}
      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <h3>Kayıtlı Müşteriler ({registeredList.length})</h3>
        {registeredList.map(customer => (
          <div key={customer.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#0d1117', padding: '15px', borderRadius: '10px', marginTop: '10px', border: '1px solid #161b22' }}>
            <div>
              <div style={{ fontWeight: 'bold' }}>{customer.name}</div>
              <div style={{ fontSize: '13px', color: '#8b949e' }}>{customer.phone}</div>
            </div>
            <button onClick={() => removeCustomer(customer.id)} style={{ color: '#f85149', background: 'none', border: '1px solid #f85149', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}