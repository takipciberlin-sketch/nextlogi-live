import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSy...", // Buraya kendi key'ini ileride koyabilirsin
  authDomain: "nextlogi-live.firebaseapp.com",
  databaseURL: "https://nextlogi-live-default-rtdb.firebaseio.com",
  projectId: "nextlogi-live",
  storageBucket: "nextlogi-live.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);