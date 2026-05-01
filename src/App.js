{/* --- KATEGORİ ALANI --- */}
<div className="space-y-4 px-2">
  <div className="flex justify-between items-center">
    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
      KATEGORİ
    </label>
    
    {/* YENİ EKLE BUTONU: Görseldeki o "lamba" benzeri tuhaflık kaldırıldı, temizlendi */}
    <button className="flex items-center gap-2 px-3 py-1.5 bg-[#00df82]/10 border border-[#00df82]/30 rounded-full text-[#00df82] hover:bg-[#00df82]/20 transition-all">
      <Plus size={14} strokeWidth={3} />
      <span className="text-[10px] font-black uppercase tracking-widest">YENİ EKLE</span>
    </button>
  </div>

  {/* Kategori Listesi: image_4ca8b8.png'deki gibi modern ve ferah */}
  <div className="bg-[#1c2128]/40 border border-white/5 rounded-[2.5rem] p-2 shadow-inner">
    {["Rind/Bulle", "Hähnchen", "Kalb", "Lamm"].map((cat, index) => (
      <div 
        key={cat} 
        className={`flex items-center justify-between px-6 py-5 rounded-[1.8rem] cursor-pointer mb-2 last:mb-0 transition-all ${
          index === 0 
          ? 'bg-[#2563eb] text-white' 
          : 'hover:bg-white/5 text-gray-500'
        }`}
      >
        <span className="text-[14px] font-bold tracking-tight">{cat}</span>
        
        {/* Seçili öğe ikonu: Karışıklığı önlemek için temiz beyaz check/daire */}
        {index === 0 && (
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
             <div className="w-2.5 h-2.5 bg-[#2563eb] rounded-full" /> 
          </div>
        )}
      </div>
    ))}
  </div>

  {/* BİRİM ALANI: Checkbox yapısı görseldeki gibi daire içine alındı */}
  <div className="pt-4 space-y-4">
    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">BİRİM</label>
    <div className="grid grid-cols-3 gap-4">
      {["KG", "KARTON", "TANE"].map((unit) => (
        <label key={unit} className="flex items-center justify-center gap-3 bg-[#1c2128]/40 border border-white/5 p-5 rounded-[2rem] cursor-pointer hover:bg-white/5 transition-all">
          <input type="checkbox" className="hidden peer" />
          {/* Checkbox dairesi */}
          <div className="w-6 h-6 border-2 border-white/20 rounded-full peer-checked:bg-white peer-checked:border-white transition-all flex items-center justify-center">
            <div className="w-2 h-2 bg-[#2563eb] rounded-full opacity-0 peer-checked:opacity-100" />
          </div>
          <span className="text-[11px] font-black text-gray-400 peer-checked:text-white uppercase">{unit}</span>
        </label>
      ))}
    </div>
  </div>
</div>