{/* --- KATEGORİ ALANI VE SABİTLENMİŞ BUTON --- */}
<div className="space-y-3 px-2">
  <div className="flex justify-between items-center px-1">
    {/* Sol taraf: Başlık */}
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
      KATEGORİ
    </label>
    
    {/* Sağ taraf: İŞTE O BUTON (Görünür ve Aktif) */}
    <button 
      onClick={() => {/* Yeni kategori ekleme fonksiyonu buraya */}}
      className="flex items-center gap-2 px-3 py-1.5 bg-[#00df82]/10 border border-[#00df82]/20 rounded-xl text-[#00df82] hover:bg-[#00df82]/20 transition-all group scale-100 active:scale-95"
    >
      <Plus size={14} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
      <span className="text-[9px] font-black uppercase tracking-widest">YENİ KATEGORİ EKLE</span>
    </button>
  </div>

  {/* Kategori Listesi (image_4d1c9d.png Tasarımı) */}
  <div className="bg-[#1c2128] border border-white/5 rounded-[2.5rem] p-3 shadow-inner space-y-1.5">
    {[
      "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", 
      "Pute", "Geflügel", "Verarbeitet"
    ].map((cat, index) => (
      <div 
        key={cat} 
        className={`flex items-center justify-between px-6 py-4 rounded-[1.6rem] cursor-pointer transition-all ${
          index === 0 
          ? 'bg-[#2563eb] text-white shadow-lg' 
          : 'hover:bg-white/5 text-gray-500'
        }`}
      >
        <span className="text-[13px] font-bold">{cat}</span>
        {index === 0 && (
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center animate-in zoom-in">
             <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path d="M1 4L3.5 6.5L9 1" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
             </svg>
          </div>
        )}
      </div>
    ))}
  </div>
</div>