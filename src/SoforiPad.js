// SoforiPad.js içindeki butonun son hali
<button 
  onClick={() => {
    if(window.confirm("Teslimatı onaylıyor musunuz?")) {
      set(ref(db, 'aktifSiparis/'), null); // Veriyi veritabanından siler
      alert("Teslimat tamamlandı, ekran temizlendi! ✅");
    }
  }}
  style={{ 
    marginTop: '30px', padding: '20px 40px', 
    backgroundColor: '#e74c3c', color: 'white', 
    border: 'none', borderRadius: '15px', 
    fontWeight: 'bold', fontSize: '20px', cursor: 'pointer' 
  }}
>
  TESLİM ETTİM
</button>