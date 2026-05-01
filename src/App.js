{/* --- KATEGORİ EKLEME BUTONLU MODAL --- */}
<div className="space-y-2 px-2">
  <div className="flex justify-between items-end mb-2">
    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
      Kategori Alanı
    </label>
    
    {/* İŞTE O KRİTİK BUTON: image_4d1c9d.png stiliyle */}
    <button 
      onClick={() => {/* Yeni kategori inputunu tetikle */}}
      className="flex items-center gap-1.5 text-[#00df82] hover:text-[#00ff94] transition-colors group"
    >
      <div className="p-1 bg-[#00df82]/10 rounded-lg group-hover:bg-[#00df82]/20 transition-all">
        <Plus size={14} strokeWidth={3} />
      </div>
      <span className="text-[10px] font-black uppercase tracking-widest">Yeni Kategori</span>
    </button>
  </div>
  
  {/* image_4d1c9d.png Tasarımı: Geniş Liste */}
  <div className="bg-[#2d333b]/40 border border-white/5 rounded-[2.2rem] p-2.5 max-h-[240px] overflow-y-auto custom-scrollbar shadow-inner">
    {[
      "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", 
      "Pute", "Geflügel", "Verarbeitet"
    ].map((cat, index) => (
      <div 
        key={cat} 
        className={`flex items-center justify-between px-6 py-4 rounded-[1.6rem] cursor-pointer transition-all mb-1.5 last:mb-0 ${
          index === 0 
          ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-900/20' 
          : 'hover:bg-white/5 text-gray-400'
        }`}
      >
        <span className="text-[13px] font-bold tracking-tight">{cat}</span>
        
        {/* Seçili olanın yanındaki Tik (Check) İkonu */}
        {index === 0 && (
          <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center animate-in zoom-in duration-200">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4L3.5 6.5L9 1" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
    ))}
  </div>
</div>