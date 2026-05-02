// FirebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Burayı Firebase Console -> Proje Ayarları -> Web Uygulaması kısmından almalısın
  apiKey: "SENIN_API_KEYIN",
  databaseURL: "https://PROJE_ID-default-rtdb.firebaseio.com",
  projectId: "PROJE_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);