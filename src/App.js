{/* --- KATEGORİ ALANI --- */}
<div className="space-y-3 px-2">
  <div className="flex justify-between items-center px-1">
    {/* Kategori Başlığı */}
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
      Kategori
    </label>
    
    {/* İŞTE O BUTON: Etiketin tam karşısında, yeşil vurgulu */}
    <button 
      onClick={() => alert("Yeni kategori ekleme alanı açılıyor...")}
      className="flex items-center gap-1.5 px-3 py-1 bg-[#00df82]/5 border border-[#00df82]/20 rounded-lg text-[#00df82] hover:bg-[#00df82]/10 transition-all group"
    >
      <Plus size={12} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-200" />
      <span className="text-[9px] font-extrabold uppercase tracking-widest">Yeni Ekle</span>
    </button>
  </div>

  {/* Kategori Listesi (image_4d1c9d.png stili) */}
  <div className="bg-[#1c2128] border border-white/5 rounded-[2.5rem] p-2.5 shadow-inner">
    {[
      "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", 
      "Pute", "Geflügel", "Verarbeitet"
    ].map((cat, index) => (
      <div 
        key={cat} 
        className={`flex items-center justify-between px-6 py-4 rounded-[1.6rem] cursor-pointer transition-all mb-1.5 last:mb-0 ${
          index === 0 
          ? 'bg-[#2563eb] text-white' 
          : 'hover:bg-white/5 text-gray-400'
        }`}
      >
        <span className="text-[13px] font-bold tracking-tight">{cat}</span>
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