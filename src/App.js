import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, Trash2, 
  ArrowLeft, Package, UserCircle, Settings, ClipboardList,
  ChevronLeft, X, Fuel, CreditCard, Plus, Minus
} from 'lucide-react';

const OrderAppClean = () => {
  // Sepet durumu: id: miktar şeklinde tutulur
  const [cart, setCart] = useState({ 5: 4 });

  const categories = [
    { n: 'Tümü', c: 62, active: true },
    { n: 'Rind/Bulle', c: 30 },
    { n: 'Hähnchen', c: 17 },
    { n: 'Kalb', c: 5 },
    { n: 'Lamm', c: 1 },
    { n: 'Pute', c: 3 },
    { n: 'Geflügel', c: 3 },
    { n: 'Verarbeitet', c: 3 }
  ];

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
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  // Toplam hesaplamaları
  const totalQty = Object.values(cart).reduce((a, b) => a + b, 0);
  const totalItems = Object.values(cart).filter(v => v > 0).length;

  return (
    <div className="flex h-screen bg-[#0b0c10] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-[#0b0c10] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter uppercase">Nextlogi</div>
          <div className="text-[10px] text-gray-600 font-bold tracking-widest mt-1 uppercase italic">Firma Paneli</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-xs hover:text-white transition-colors cursor-pointer group">
              <LayoutGrid size={18} className="group-hover:text-[#00df82]" /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-4 bg-[#14261e] text-[#00df82] rounded-2xl border border-[#00df82]/10 mt-3 shadow-lg shadow-green-950/20">
            <ShoppingBag size={20} /> <span className="font-black italic text-sm">Ürünler & Sipariş</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-xs hover:text-white mt-2 cursor-pointer transition-all">
            <Fuel size={18}/> Yakıt Raporu
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-xs hover:text-white cursor-pointer transition-all">
            <CreditCard size={18}/> Ödeme
          </div>
        </nav>

        <div className="p-6 space-y-3">
           <div className="bg-[#121418] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <Package size={18} className="text-orange-500 shadow-orange-500/20"/>
              <span className="text-[10px] font-black text-white uppercase italic tracking-wider leading-none">Ürün Modülü Aktif</span>
           </div>
           <div className="bg-[#121418] p-5 rounded-[1.8rem] border border-white/5">
              <div className="text-[9px] text-blue-500 font-black mb-1 uppercase tracking-tighter">Firma Sahibi</div>
              <div className="text-base font-black italic text-white tracking-tight leading-none mb-1">Klaus Müller</div>
              <div className="text-[9px] text-gray-600 font-bold uppercase tracking-widest">Müller GmbH</div>
           </div>
           <button className="w-full py-4 bg-[#121418] border border-white/5 hover:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all">
              <ChevronLeft size={16}/> Çıkış Yap
           </button>
        </div>
      </aside>

      {/* MERKEZ PANEL */}
      <main className="flex-1 flex flex-col bg-[#0b0c10]">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <button className="bg-[#121418] px-5 py-3 rounded-xl text-[10px] font-black uppercase flex items-center gap-3 border border-white/5">
              <ChevronLeft size={16}/> Müşteri Değiştir
            </button>
            <div className="bg-[#121418] border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-inner">
              <UserCircle className="text-green-500" size={24}/>
              <span className="text-sm font-black text-white italic tracking-tighter">Max Bauer GmbH</span>
              <span className="bg-[#00df82]/10 text-[#00df82] text-[9px] font-black px-3 py-1 rounded border border-[#00df82]/20 ml-4 italic uppercase">Adım 2/2</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative">
                <Search className="absolute left-4 top-3.5 text-gray-600" size={16}/>
                <input type="text" placeholder="Ürün ara..." className="bg-[#121418] border border-white/5 rounded-xl py-3.5 pl-12 pr-6 text-xs outline-none w-64 focus:border-white/20 transition-all"/>
             </div>
             <button className="bg-orange-500/10 text-orange-500 p-3.5 rounded-xl border border-orange-500/20 hover:brightness-125 transition-all"><Settings size={20}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-6">
          <div className="flex gap-2.5 pb-6 border-b border-white/[0.03]">
            {categories.map((c) => (
              <button key={c.n} className={`px-5 py-2.5 rounded-full border text-[10px] font-black uppercase flex items-center gap-2.5 transition-all ${c.active ? 'bg-[#00df82]/10 border-[#00df82] text-[#00df82] shadow-lg shadow-green-500/5' : 'bg-[#121418] border-white/5 text-gray-500 hover:border-white/10'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${c.active ? 'bg-[#00df82] shadow-[0_0_8px_#00df82]' : 'bg-gray-700'}`}/> {c.n} <span className="opacity-40">{c.c}</span>
              </button>
            ))}
          </div>

          <div className="space-y-1.5">
            {urunler.map((u) => (
              <div key={u.id} className={`flex items-center justify-between p-4 px-8 bg-[#121418]/30 rounded-2xl border transition-all ${u.active ? 'border-[#00df82]/30 bg-green-500/[0.02]' : 'border-white/[0.03] hover:bg-white/[0.02]'}`}>
                <div className="flex items-center gap-5">
                   {u.active && <div className="w-2 h-2 rounded-full bg-[#00df82] shadow-[0_0_8px_#00df82] animate-pulse"/>}
                   <span className={`text-[12px] font-black tracking-tight uppercase italic ${u.active ? 'text-[#00df82]' : 'text-gray-400'}`}>{u.n}</span>
                </div>

                <div className="flex items-center gap-4">
                  {cart[u.id] > 0 ? (
                    <div className="flex items-center bg-black/40 rounded-xl border border-white/5 p-1 shadow-inner">
                      <button onClick={() => handleUpdate(u.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-all"><Minus size={14}/></button>
                      <span className="w-12 text-center font-black italic text-[#00df82] text-xl tracking-tighter">{cart[u.id]}</span>
                      <button onClick={() => handleUpdate(u.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-all"><Plus size={14}/></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleUpdate(u.id, 1)}
                      className="bg-[#121418] hover:bg-[#1a2d24] text-gray-600 hover:text-[#00df82] border border-white/5 hover:border-[#00df82]/30 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                    >
                      + ÜRÜN EKLE
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SEPET PANELİ */}
      <aside className="w-[420px] bg-[#0b0c10] border-l border-white/5 p-8 flex flex-col gap-8 shadow-[-20px_0_40px_rgba(0,0,0,0.4)]">
        <div className="flex justify-between items-center px-2">
          <h2 className="text-base font-black italic uppercase text-white flex items-center gap-3"><ShoppingCart size={24} className="text-[#00df82]"/> Sipariş Özeti</h2>
          <span className="bg-[#14261e] text-[#00df82] text-[10px] font-black px-3 py-1 rounded-lg border border-[#00df82]/20 shadow-lg shadow-green-500/5">{totalItems} kalem</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-500 -mt-6 px-2">
           <UserCircle size={14}/> <span className="text-[11px] font-bold">Max Bauer GmbH</span>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 px-1 custom-scrollbar">
          {Object.entries(cart).map(([id, qty]) => qty > 0 && (
            <div key={id} className="bg-[#121418] p-6 rounded-[2.2rem] border-l-[6px] border-orange-500 relative shadow-2xl animate-in slide-in-from-right duration-300">
               <button onClick={() => handleUpdate(parseInt(id), -qty)} className="absolute right-6 top-6 bg-red-500/10 p-2 rounded-xl text-red-500/40 hover:text-red-500 transition-all border border-red-500/5">
                 <X size={16}/>
               </button>
               <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 italic">RIND/BULLE • {qty}.0 kg</div>
               <div className="text-base font-black text-white uppercase italic tracking-tighter truncate pr-10">
                 {urunler.find(u => u.id === parseInt(id))?.n}
               </div>
               <div className="text-[14px] text-[#00df82] font-black mt-3">{qty} <span className="text-gray-600 font-bold ml-1 italic uppercase text-[10px]">kg</span></div>
            </div>
          ))}
          {totalItems === 0 && (
            <div className="h-40 border-2 border-dashed border-white/5 rounded-[2rem] flex items-center justify-center text-gray-700 font-black italic uppercase text-[11px] tracking-widest">Henüz ürün eklenmedi</div>
          )}
        </div>

        <div className="mt-auto space-y-6">
           <div className="bg-[#121418] p-8 rounded-[2.5rem] border border-white/5 flex justify-between items-end shadow-inner relative overflow-hidden">
              <div className="text-[11px] text-gray-600 font-black uppercase tracking-[0.3em]">Toplam</div>
              <div className="text-2xl font-black text-[#00df82] italic tracking-tighter leading-none">{totalItems} ürün • {totalQty}.0 kg</div>
           </div>
           
           <button className="w-full bg-[#00df82] text-black py-7 rounded-[2.2rem] font-black uppercase text-sm tracking-[0.3em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,223,130,0.15)] group">
              <Package size={22} className="group-hover:scale-110 transition-transform"/> 
              Siparişi Tamamla
           </button>
           
           <p className="text-[10px] text-gray-700 font-bold text-center italic tracking-wide">→ Görev Atama'ya yönlendirileceksiniz</p>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1d23; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default OrderAppClean;