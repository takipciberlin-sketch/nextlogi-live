import { db } from "./firebaseConfig"; // Daha önce oluşturduğumuz config
import { ref, get, child } from "firebase/database";

const handleLogin = async (inputPhone) => {
  const dbRef = ref(db);
  
  try {
    // 1. Veritabanındaki whitelist'e bak
    const snapshot = await get(child(dbRef, `whitelist/${inputPhone}`));
    
    if (snapshot.exists()) {
      // 2. Müşteri beyaz listede var!
      const userData = snapshot.val();
      
      // Telefonun hafızasına mühürle (Beni Hatırla)
      localStorage.setItem("nextlogi_user", JSON.stringify({
        phone: inputPhone,
        name: userData.name,
        isVerified: true
      }));

      alert(`Hoş geldin ${userData.name}!`);
      window.location.reload(); // Uygulamayı sipariş ekranıyla yenile
    } else {
      // 3. Numara listede yok
      alert("HATA: Bu numara sisteme kayıtlı değil. Lütfen firma ile iletişime geçin.");
    }
  } catch (error) {
    console.error("Güvenlik kontrolü sırasında hata oluştu:", error);
    alert("Bir bağlantı sorunu oluştu.");
  }
};