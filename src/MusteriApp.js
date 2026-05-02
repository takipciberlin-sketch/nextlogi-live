// MusteriApp.js içinde en üste ekle
import { db } from './FirebaseConfig';
import { ref, set } from "firebase/database";

// Fonksiyonu tanımla
const siparisVer = () => {
  set(ref(db, 'aktifSiparis'), {
    musteri: "Özcan Et & Kasap",
    urunler: "10kg Kıyma, 5kg Kuşbaşı",
    durum: "Hazırlanıyor",
    saat: new Date().toLocaleTimeString()
  }).then(() => alert("Sipariş Şoföre Gitti!"));
};

// Butonu güncelle
<button onClick={siparisVer} style={{/* senin stillerin */}}>
  UYGULAMAYA GİR VE SİPARİŞ VER
</button>