{/* --- GÜNCELLENMİŞ ÜRÜN EKLEME POPUP (Görsel Uyumlu) --- */}
{isModalOpen && (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md">
    <div className="w-[520px] bg-[#1c2128] border border-white/10 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 px-2">
        <h3 className="text-xl font-black italic uppercase tracking-tighter text-white">
          Ürün Tanımla
        </h3>
        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
          <X size={22} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-6">
        {/* Ürün İsmi */}
        <div className="space-y-2 px-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Ürün İsmi</label>
          <input 
            type="text" 
            placeholder="Ürün adını giriniz..." 
            className="w-full bg-black/40 border border-white/5 rounded-2xl py-4 px-6 text-sm outline-none focus:border-blue-500/50 transition-all text-white"
          />
        </div>

        {/* KATEGORİ LİSTESİ (image_575c80.png Tasarımı) */}
        <div className="space-y-2 px-2">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Kategori Seçimi</label>
            <button className="text-[#00df82] flex items-center gap-1 text-[10px] font-bold hover:opacity-80">
              <Plus size={12}/> YENİ EKLE
            </button>
          </div>
          
          {/* Görseldeki Liste Yapısı */}
          <div className="bg-[#2d333b]/50 border border-white/5 rounded-[2rem] p-2 max-h-[220px] overflow-y-auto custom-scrollbar">
            {[
              "Rind/Bulle", "Hähnchen", "Kalb", "Lamm", 
              "Pute", "Geflügel", "Verarbeitet"
            ].map((cat, index) => (
              <div 
                key={cat} 
                className={`flex items-center justify-between px-5 py-3.5 rounded-[1.4rem] cursor-pointer transition-all mb-1 last:mb-0 ${
                  index === 0 ? 'bg-[#2563eb] text-white' : 'hover:bg-white/5 text-gray-400'
                }`}
              >
                <span className="text-[13px] font-medium">{cat}</span>
                {index === 0 && <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2.5 h-[1.5px] bg-[#2563eb] rotate-45 translate-y-[1px] translate-x-[-2px]"/>
                  <div className="w-[1.5px] h-2.5 bg-[#2563eb] rotate-45 translate-y-[-1px] translate-x-[1px]"/>
                </div>}
              </div>
            ))}
          </div>
        </div>

        {/* Birim Seçimi (Checkbox) */}
        <div className="space-y-2 px-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Geçerli Birimler</label>
          <div className="flex items-center gap-8 bg-black/20 p-5 rounded-[1.8rem] border border-white/5">
            {["kg", "karton", "tane"].map((unit) => (
              <label key={unit} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="peer hidden" />
                <div className="w-5 h-5 border-2 border-white/20 rounded-md peer-checked:bg-[#2563eb] peer-checked:border-[#2563eb] transition-all flex items-center justify-center">
                   <div className="w-2 h-2 bg-white rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                </div>
                <span className="text-[11px] font-black uppercase text-gray-400 peer-checked:text-white">{unit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Kaydet Butonu */}
        <div className="px-2 pt-4">
          <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-5 rounded-[2rem] font-black uppercase text-xs tracking-[0.3em] shadow-xl transition-all active:scale-[0.98]">
            Sisteme Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
)}