import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, 
  ArrowLeft, Package, UserCircle, Settings,
  ChevronLeft, X, Fuel, CreditCard, Plus, Minus
} from 'lucide-react';

const FinalOrderUI = () => {
  const [cart, setCart] = useState({ 5: 4 });

  const urunler = [
    { id: 1, n: "Bullen-Vorderviertel ohne Knochen" },
    { id: 2, n: "Bullen-Keule mit Knochen" },
    { id: 3, n: "Rinder-Nacken" },
    { id: 4, n: "Bullen-Kamm ohne Knochen" },
    { id: 5, n: "Bullen-Bug", active: true },
    { id: 6, n: "Bullen-Bug ohne Knochen" },
    { id: 7, n: "Bullen-Bug + Kamm ohne Knochen" }
  ];

  const handleUpdate = (id, delta) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  return (
    <div className="flex h-screen bg-[#0d1117] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SOL SIDEBAR (Mevcut yapı korundu) */}
      <aside className="w-[240px] bg-[#0d1117] border-r border-white/[0.05] flex flex-col shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter uppercase">NEXTLOGI</div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-[11px] hover:text-white cursor-pointer group">
              <LayoutGrid size={16} className="group-hover:text-[#00df82]" /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-4 bg-[#14261e] text-[#00df82] rounded-2xl border border-[#00df82]/10">
            <ShoppingBag size={18} /> <span className="font-black italic text-xs uppercase">Ürünler & Sipariş</span>
          </div>
        </nav>
      </aside>

      {/* MERKEZ PANEL */}
      <main className="flex-1 flex flex-col bg-[#0d1117]">
        <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-8">
          <div className="flex items-center gap-3">
             <div className="bg-[#161b22] border border-white/[0.05] px-5 py-2 rounded-2xl flex items-center gap-4">
              <UserCircle className="text-blue-400" size={20}/>
              <span className="text-[12px] font-bold text-white opacity-80">Max Bauer GmbH</span>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 text-gray-600" size={14}/>
            <input type="text" placeholder="Ürün ara..." className="bg-[#161b22] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[11px] outline-none w-56"/>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          {/* Ürün Satırları */}
          <div className="space-y-2">
            {urunler.map((u) => (
              <div key={u.id} className={`flex items-center justify-between p-4 px-8 bg-[#161b22]/40 rounded-xl border ${u.active ? 'border-[#00df82]/20' : 'border-white/[0.02]'}`}>
                <span className={`text-[11px] font-bold uppercase ${u.active ? 'text-[#00df82]' : 'text-gray-500'}`}>{u.n}</span>
                <div className="flex items-center gap-3">
                  {cart[u.id] > 0 ? (
                    <div className="flex items-center bg-black/20 rounded-lg border border-white/5 p-1">
                      <button onClick={() => handleUpdate(u.id, -1)} className="px-2 text-gray-500"><Minus size={12}/></button>
                      <span className="px-3 font-black text-[#00df82]">{cart[u.id]}</span>
                      <button onClick={() => handleUpdate(u.id, 1)} className="px-2 text-gray-500"><Plus size={12}/></button>
                    </div>
                  ) : (
                    <button onClick={() => handleUpdate(u.id, 1)} className="text-gray-600 font-black text-[9px] border border-white/5 px-4 py-2 rounded-lg hover:bg-white/5 transition-all">+ ÜRÜN EKLE</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SAĞ PANEL: image_5791a2.jpg REFERANSLI YENİ TASARIM */}
      <aside className="w-[360px] bg-[#0d1117] border-l border-white/[0.05] flex flex-col">
        
        {/* Üst Başlık Alanı */}
        <div className="p-6 pb-2 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} className="text-gray-400"/>
              <h2 className="text-[13px] font-black text-white">Sipariş Özeti</h2>
            </div>
            <span className="bg-[#14261e] text-[#00df82] text-[10px] font-bold px-3 py-1 rounded-full border border-[#00df82]/10">1 kalem</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <UserCircle size={14}/>
            <span className="text-[11px] font-medium">Max Bauer GmbH</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Kategori Ayırıcı */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_5px_rgba(249,115,22,0.5)]"/>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest italic">RIND/BULLE</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]"/>
              <span className="text-[10px] font-bold text-gray-600">4.0 kg</span>
            </div>

            {/* Ürün Kartı (Görseldeki gibi) */}
            {Object.entries(cart).map(([id, qty]) => qty > 0 && (
              <div key={id} className="bg-[#161b22] rounded-xl p-4 border border-white/[0.03] flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5"/>
                  <div>
                    <div className="text-[12px] font-bold text-gray-200 mb-1">{urunler.find(u => u.id === parseInt(id))?.n}</div>
                    <div className="flex items-center gap-1">
                       <span className="text-[13px] font-black text-[#00df82]">{qty}</span>
                       <span className="text-[10px] font-bold text-gray-600">kg</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleUpdate(parseInt(id), -qty)} className="p-1.5 bg-red-500/5 rounded-lg text-red-500/40 hover:text-red-500 transition-colors">
                  <X size={16}/>
                </button>
              </div>
            ))}
          </div>

          {/* Teslimat Notu */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-wider">
              📝 Teslimat Notu
            </div>
            <textarea 
              placeholder="Özel not..." 
              className="w-full bg-[#161b22]/50 border border-white/[0.05] rounded-xl p-4 text-[11px] min-h-[100px] outline-none text-gray-300 placeholder:text-gray-700 resize-none"
            />
          </div>
        </div>

        {/* Alt Toplam ve Buton Alanı */}
        <div className="p-6 space-y-4 bg-[#0d1117] border-t border-white/[0.02]">
           <div className="bg-[#161b22]/30 border border-[#00df82]/20 p-5 rounded-2xl">
              <div className="text-[10px] text-gray-500 font-bold uppercase mb-1">Toplam</div>
              <div className="text-[18px] font-black text-[#00df82] italic">1 ürün • 4.0 kg</div>
           </div>
           
           <button className="w-full bg-[#00df82] hover:bg-[#00c874] text-[#0d1117] py-5 rounded-2xl font-black uppercase text-[12px] tracking-widest shadow-[0_10px_30px_rgba(0,223,130,0.15)] transition-all">
              Siparişi Tamamla
           </button>
        </div>
      </aside>

    </div>
  );
};

export default FinalOrderUI;