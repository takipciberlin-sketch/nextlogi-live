import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase'den aldığın senin projene özel kimlik bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyAXZkJp1HA4NSbaWJZzjkWy2UTFCMKEn1I",
  authDomain: "nextlogi-v19.firebaseapp.com",
  projectId: "nextlogi-v19",
  storageBucket: "nextlogi-v19.firebasestorage.app",
  messagingSenderId: "69939460458",
  appId: "1:69939460458:web:7094f54f2789a608c94d13",
  measurementId: "G-F6E0D0QWE7",
  databaseURL: "https://nextlogi-v19-default-rtdb.europe-west1.firebasedatabase.app"
};

// Firebase uygulamasını başlatıyoruz
const app = initializeApp(firebaseConfig);

// Veritabanı referansını oluşturup diğer dosyaların kullanımına açıyoruz
export const db = getDatabase(app);