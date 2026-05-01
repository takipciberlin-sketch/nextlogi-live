import React, { useState } from 'react';
import { X, Plus, Package, Tag } from 'lucide-react';

const FinalApp = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); // Test için açık başlıyor

  return (
    <div className="flex h-screen bg-[#0d1117] items-center justify-center p-4 font-sans">
      
      {/* --- MODAL BAŞLIYOR --- */}
      {isModalOpen && (
        <div className="relative w-full max-w-[500px] bg-[#161b22] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black italic uppercase tracking-tighter flex items-center gap-3 text-white">
              <Package className="text-blue-500" size={24}/> YENİ ÜRÜN TANIMLA
            </h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
              <X size={24}/>
            </button>
          </div>

          <div className="space-y-8">
            {/* Ürün Adı */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">ÜRÜN ADI</label>
              <div className="relative">
                <Tag className="absolute left-5 top-4.5 text-gray-600" size={18}/>
                <input 
                  type="text" 
                  placeholder="Örn: Dana Bonfile..." 
                  className="w-full bg-black/20 border border-white/5 rounded-2xl py-4 pl-14 pr-6 text-sm outline-none focus:border-blue-500/50 transition-all text-white placeholder:text-gray-700"
                />
              </div>
            </div>

            {/* KATEGORİ ALANI VE O MEŞHUR BUTON */}
            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">KATEGORİ</label>
                
                {/* BURADA! Parlak yeşil ve çok net: */}
                <button 
                  className="flex items-center gap-2 px-3 py-1.5 bg-[#00df82]/10 border border-[#00df82]/30 rounded-xl text-[#00df82] hover:bg-[#00df82]/20 transition-all active:scale-95"
                  onClick={() => alert("Yeni Kategori Ekleme Aktif")}
                >
                  <Plus size={14} strokeWidth={3} />
                  <span className="text-[9px] font-black uppercase tracking-widest">YENİ EKLE</span>
                </button>
              </div>

              {/* Kategori Listesi (Görseldeki gibi geniş) */}
              <div className="bg-[#1c2128] border border-white/5 rounded-[2.2rem] p-2.5 max-h-[220px] overflow-y-auto shadow-inner">
                {["Rind/Bulle", "Hähnchen", "Kalb", "Lamm"].map((cat, index) => (
                  <div key={cat} className={`flex items-center justify-between px-6 py-4 rounded-[1.5rem] cursor-pointer mb-1.5 last:mb-0 ${index === 0 ? 'bg-[#2563eb] text-white' : 'hover:bg-white/5 text-gray-500'}`}>
                    <span className="text-[13px] font-bold">{cat}</span>
                    {index === 0 && <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center animate-in zoom-in"><X size={12} className="text-[#2563eb] rotate-45" /></div>}
                  </div>
                ))}
              </div>
            </div>

            {/* BİRİM (CHECKBOX) */}
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">BİRİM</label>
              <div className="grid grid-cols-3 gap-3">
                {["KG", "KARTON", "TANE"].map(u => (
                  <label key={u} className="flex items-center justify-center gap-2 p-4 bg-black/20 border border-white/5 rounded-2xl cursor-pointer hover:border-white/10 transition-all">
                    <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-transparent checked:bg-blue-600" />
                    <span className="text-[10px] font-black text-gray-400">{u}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Onay Butonu */}
            <button className="w-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white py-5 rounded-[1.8rem] font-black uppercase text-xs tracking-[0.3em] shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98] mt-4">
              ÜRÜNÜ LİSTEYE EKLE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinalApp;