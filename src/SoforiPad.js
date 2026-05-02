// SoforiPad.js içinde
useEffect(() => {
    // 'aktifSiparis' yolunu dinliyoruz (Müşteri buraya gönderiyor)
    const siparisRef = ref(db, 'aktifSiparis/'); 
    
    onValue(siparisRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Buluttan gelen veri:", data); // Veri gelince konsolda gör
      if (data) {
        setSiparis(data);
      }
    });
  }, []);