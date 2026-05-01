{/* --- KATEGORİ ALANI --- */}
<div className="space-y-4 px-2">
  <div className="flex justify-between items-center mb-1">
    {/* Kategori Başlığı: Daha ince ve net */}
    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 opacity-80">
      KATEGORİ
    </label>
    
    {/* Düzeltilmiş Buton: Anormallik giderildi */}
    <button 
      onClick={() => alert("Kategori Ekleme Paneli")}
      className="flex items-center gap-2 px-4 py-2 bg-[#00df82]/10 border border-[#00df82]/20 rounded-full text-[#00df82] hover:bg-[#00df82]/20 transition-all group active:scale-95 shadow-sm"
    >
      <Plus size={14} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
      <span className="text-[10px] font-black uppercase tracking-widest">YENİ EKLE</span>
    </button>
  </div>

  {/* Kategori Listesi: image_4d0d76.png'deki gibi yumuşak hatlı */}
  <div className="bg-[#1c2128]/60 border border-white/5 rounded-[2.8rem] p-3 shadow-inner">
    {["Rind/Bulle", "Hähnchen", "Kalb", "Lamm"].map((cat, index) => (
      <div 
        key={cat} 
        className={`flex items-center justify-between px-7 py-5 rounded-[1.8rem] cursor-pointer mb-2 last:mb-0 transition-all ${
          index === 0 
          ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-900/30' 
          : 'hover:bg-white/5 text-gray-500'
        }`}
      >
        <span className="text-[14px] font-bold tracking-tight">{cat}</span>
        {index === 0 && (
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center animate-in zoom-in">
             <Plus size={14} className="text-[#2563eb] rotate-45" strokeWidth={4} />
          </div>
        )}
      </div>
    ))}
  </div>
</div>