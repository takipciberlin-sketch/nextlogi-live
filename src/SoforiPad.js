<button 
  onClick={() => {
    // 1. Şoföre onay soralım
    if(window.confirm("Teslimatın tamamlandığını onaylıyor musunuz?")) {
      
      // 2. Firebase'deki aktif siparişi sil (null yaparak)
      set(ref(db, 'aktifSiparis/'), null)
        .then(() => {
          // 3. Başarılı olursa şoföre bilgi ver ve yerel durumu temizle
          setSiparis(null);
          alert("Teslimat başarıyla sisteme işlendi. ✅");
        })
        .catch((error) => {
          alert("Hata oluştu: " + error.message);
        });
    }
  }}
  style={{ 
    marginTop: '30px', 
    padding: '20px 40px', 
    backgroundColor: '#e74c3c', // Kırmızı/Turuncu buton
    color: 'white', 
    border: 'none', 
    borderRadius: '15px', 
    fontWeight: 'bold', 
    fontSize: '20px', 
    cursor: 'pointer',
    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.4)'
  }}
>
  TESLİM ETTİM
</button>