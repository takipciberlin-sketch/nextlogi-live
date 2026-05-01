{/* --- GÜNCELLENMİŞ ÜRÜN EKLEME POPUP --- */}
{isModalOpen && (
  <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
    <div className="w-[480px] bg-[#161b22] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-white">
          <Package className="text-[#2563eb]" size={24}/> Ürün Tanımla
        </h3>
        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-all">
          <X size={20} className="text-gray-500 hover:text-white" />
        </button>
      </div>

      <div className="space-y-8">
        {/* Ürün Adı */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Ürün İsmi</label>
          <div className="relative">
            <Tag className="absolute left-5 top-4 text-gray-600" size={18}/>
            <input 
              type="text" 
              placeholder="Örn: Dana Antrikot..." 
              className="w-full bg-black/30 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-[#2563eb]/50 transition-all text-white placeholder:text-gray-700"
            />
          </div>
        </div>

        {/* Kategori Seçimi + Yeni Ekle Butonu */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Kategori Alanı</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Layers className="absolute left-5 top-4 text-gray-600" size={18}/>
              <select className="w-full bg-black/30 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-[#2563eb]/50 appearance-none text-white cursor-pointer">
                {categories.map(cat => <option key={cat.id}>{cat.name}</option>)}
              </select>
            </div>
            {/* KATEGORİ YANINA YENİ EKLE BUTONU */}
            <button className="bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl transition-all group" title="Yeni Kategori Ekle">
              <Plus size={20} className="text-[#00df82] group-active:scale-90 transition-transform" />
            </button>
          </div>
        </div>

        {/* Birim Seçimi (CHECKBOX YAPISI) */}
        <div className="space-y-3">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Geçerli Birimler</label>
          <div className="flex items-center gap-6 bg-black/20 p-5 rounded-2xl border border-white/5">
            {["kg", "karton", "tane"].map((unit) => (
              <label key={unit} className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border border-white/20 rounded-md checked:bg-[#2563eb] checked:border-[#2563eb] transition-all"
                  />
                  <X size={12} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none rotate-45" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-white transition-colors">{unit}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Onay Butonu */}
        <button 
          onClick={() => setIsModalOpen(false)}
          className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.3em] shadow-[0_10px_20px_rgba(37,99,235,0.2)] mt-4 transition-all active:scale-[0.97]"
        >
          Sisteme Kaydet
        </button>
      </div>
    </div>
  </div>
)}