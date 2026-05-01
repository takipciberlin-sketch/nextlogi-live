import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, Trash2, 
  ArrowLeft, Package, UserCircle, Settings, ClipboardList,
  ChevronLeft, X, Fuel, CreditCard, Plus, Minus
} from 'lucide-react';

const OrderAppWithAddButton = () => {
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
    setCart(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta)
    }));
  };

  return (
    <div className="flex h-screen bg-[#0b0c10] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SIDEBAR (image_57f27f.jpg Referanslı) */}
      <aside className="w-[260px] bg-[#0b0c10] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter uppercase">Nextlogi</div>
          <div className="text-[10px] text-gray-600 font-bold tracking-widest mt-1 uppercase">Firma Paneli</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-xs hover:text-white transition-colors cursor-pointer group">
              <LayoutGrid size={18} className="group-hover:text-[#00df82]" /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-4 bg-[#14261e] text-[#00df82] rounded-2xl border border-[#00df82]/10 mt-3">
            <ShoppingBag size={20} /> <span className="font-black italic text-sm">Ürünler & Sipariş</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-xs hover:text-white mt-2 cursor-pointer"><Fuel size={18}/> Yakıt Raporu</div>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-xs hover:text-white cursor-pointer"><CreditCard size={18}/> Ödeme</div>
        </nav>

        <div className="p-6 space-y-3">
           <div className="bg-[#121418] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <Package size={18} className="text-orange-500"/>
              <span className="text-[10px] font-black text-white uppercase italic">Ürün Modülü Aktif</span>
           </div>
           <div className="bg-[#121418] p-5 rounded-[1.8rem] border border-white/5">
              <div className="text-[8px] text-blue-500 font-black mb-1 uppercase">Firma Sahibi</div>
              <div className="text-base font-black italic">Klaus Müller</div>
           </div>
           <button className="w-full py-4 bg-[#121418] border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3">
              <ArrowLeft size={16}/> Çıkış Yap
           </button>
        </div>
      </aside>

      {/* MERKEZ PANEL */}
      <main className="flex-1 flex flex-col bg-[#0b0c10]">
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <button className="bg-[#121418] px-5 py-3 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-white/5">
              <ChevronLeft size={16}/> Müşteri Değiştir
            </button>
            <div className="bg-[#121418] border border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 font-black italic">
              <UserCircle className="text-green-500" size={24}/> Max Bauer GmbH
              <span className="bg-[#00df82]/10 text-[#00df82] text-[9px] px-3 py-1 rounded border border-[#00df82]/20 ml-4 uppercase tracking-tighter italic">Adım 2/2</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative"><Search className="absolute left-4 top-3.5 text-gray-600" size={16}/><input type="text" placeholder="Ürün ara..." className="bg-[#121418] border border-white/5 rounded-xl py-3.5 pl-12 pr-6 text-xs outline-none w-64"/></div>
             <button className="bg-orange-500/10 text-orange-500 p-3.5 rounded-xl border border-orange-500/20"><Settings size={20}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 space-y-6">
          <div className="flex gap-2.5 pb-6">
            {categories.map((c) => (
              <button key={c.n} className={`px-5 py-2.5 rounded-full border text-[10px] font-black uppercase flex items-center gap-2 ${c.active ? 'bg-[#00df82]/10 border-[#00df82] text-[#00df82]' : 'bg-[#121418] border-white/5 text-gray-500'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${c.active ? 'bg-[#00df82]' : 'bg-gray-700'}`}/> {c.n} <span className="opacity-40">{c.c}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2">
            {urunler.map((u) => (
              <div key={u.id} className={`flex items-center justify-between p-4 px-8 bg-[#121418]/30 rounded-2xl border transition-all ${u.active ? 'border-[#00df82]/30 bg-green-500/[0.02]' : 'border-white/[0.03]'}`}>
                <div className="flex items-center gap-5">
                   {u.active && <div className="w-2 h-2 rounded-full bg-[#00df82] shadow-[0_0_8px_#00df82]"/>}
                   <span className={`text-[12px] font-black tracking-tight uppercase italic ${u.active ? 'text-[#00df82]' : 'text-gray-400'}`}>{u.n}</span>
                </div>

                {/* ÜRÜN EKLE / MİKTAR BUTONU */}
                <div className="flex items-center gap-3">
                  {cart[u.id] > 0 ? (
                    <div className="flex items-center bg-black/40 rounded-xl border border-white/5 p-1">
                      <button onClick={() => handleUpdate(u.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"><Minus size={14}/></button>
                      <span className="w-12 text-center font-black italic text-[#00df82] text-lg">{cart[u.id]}</span>
                      <button onClick={() => handleUpdate(u.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white transition-colors"><Plus size={14}/></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleUpdate(u.id, 1)}
                      className="bg-[#121418] hover:bg-[#1a2d24] text-gray-500 hover:text-[#00df82] border border-white/5 hover:border-[#00df82]/20 px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 group"
                    >
                      <Plus size={14} className="group-hover:scale-125 transition-transform"/> Ürün Ekle
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SAĞ TARAF: SİPARİŞ ÖZETİ (image_57f71c.png Birebir) */}
      <aside className="w-[420px] bg-[#0b0c10] border-l border-white/5 p-8 flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <h2 className="text-base font-black italic uppercase text-white flex items-center gap-3"><ShoppingCart size={24} className="text-[#00df82]"/> Sipariş Özeti</h2>
          <span className="bg-[#14261e] text-[#00df82] text-[10px] font-black px-3 py-1 rounded-lg border border-[#00df82]/20">1 kalem</span>
        </div>
        
        {/* AKTİF ÜRÜN KARTI */}
        {Object.entries(cart).map(([id, qty]) => qty > 0 && (
          <div key={id} className="bg-[#121418] p-6 rounded-[2rem] border-l-[6px] border-orange-500 relative shadow-2xl">
             <button onClick={() => handleUpdate(id, -qty)} className="absolute right-6 top-6 text-gray-700 hover:text-red-500 transition-colors"><X size={18}/></button>
             <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 italic">RIND/BULLE • {qty}.0 kg</div>
             <div className="text-base font-black text-white uppercase italic tracking-tighter">
               {urunler.find(u => u.id === parseInt(id))?.n}
             </div>
             <div className="text-[13px] text-[#00df82] font-black mt-3">{qty} <span className="text-gray-600 font-bold ml-1">kg</span></div>
          </div>
        ))}

        {/* ALT BÖLÜM */}
        <div className="mt-auto space-y-4">
           <div className="bg-[#121418] p-6 rounded-[2rem] border border-white/5 flex justify-between items-end">
              <span className="text-[10px] text-gray-600 font-black uppercase tracking-widest">Toplam</span>
              <span className="text-xl font-black text-[#00df82] italic leading-none">1 ürün • 4.0 kg</span>
           </div>
           <button className="w-full bg-[#00df82] text-black py-6 rounded-[2rem] font-black uppercase text-sm tracking-[0.2em] shadow-lg shadow-green-500/10 flex items-center justify-center gap-3">
              <Package size={20}/> Siparişi Tamamla
           </button>
        </div>
      </aside>

    </div>
  );
};

export default OrderAppWithAddButton;