{/* --- KATEGORİ ALANI VE YENİ EKLE BUTONU --- */}
<div className="space-y-3 px-2">
  <div className="flex justify-between items-center px-1">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
      Kategori
    </label>
    
    {/* İşte Burası: Kategori Başlığının Yanındaki Buton */}
    <button 
      onClick={() => {/* Yeni kategori ekleme mantığı */}}
      className="flex items-center gap-1.5 text-[#00df82] hover:opacity-80 transition-all group"
    >
      <Plus size={14} strokeWidth={3} className="group-active:scale-90 transition-transform" />
      <span className="text-[10px] font-black uppercase tracking-widest">YENİ EKLE</span>
    </button>
  </div>

  {/* image_4d1c9d.png'deki Geniş Seçim Alanı */}
  <div className="bg-[#1c2128] border border-white/5 rounded-[2rem] p-2 overflow-hidden shadow-inner">
    {[
      "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", 
      "Pute", "Geflügel", "Verarbeitet"
    ].map((cat, index) => (
      <div 
        key={cat} 
        className={`flex items-center justify-between px-6 py-4 rounded-[1.4rem] cursor-pointer transition-all mb-1 last:mb-0 ${
          index === 0 
          ? 'bg-[#2563eb] text-white shadow-lg' 
          : 'hover:bg-white/5 text-gray-400'
        }`}
      >
        <span className="text-[13px] font-bold">{cat}</span>
        {index === 0 && (
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    ))}
  </div>
</div>