// MusteriApp.js içinde butonun altına veya üstüne ekle
import { db } from './FirebaseConfig';
import { ref, set } from "firebase/database";

const siparisVer = () => {
  set(ref(db, 'aktifSiparis/'), {
    musteri: "Özcan Et & Kasap",
    urunler: "10kg Kıyma, 5kg Kuşbaşı",
    durum: "Yolda"
  });
  alert("Sipariş Şoföre Işınlandı!");
};