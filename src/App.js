import React, { useState } from 'react';
import { 
  LayoutGrid, Users, Send, ShoppingBag, Fuel, CreditCard, 
  LogOut, Search, Plus, Minus, ShoppingCart, Trash2, 
  ArrowLeft, Package, UserCircle, Settings, ClipboardList
} from 'lucide-react';

const OrderMasterApp = () => {
  const [cart, setCart] = useState({ 4: 4 }); // Görseldeki gibi Bullen-Bug 4kg seçili
  const [activeTab, setActiveTab] = useState('Ürünler & Sipariş');

  const categories = [
    { n: 'Tümü', c: 62, color: 'bg-green-500' },
    { n: 'Rind/Bulle', c: 30, color: 'bg-orange-500' },
    { n: 'Hähnchen', c: 17, color: 'bg-yellow-500' },
    { n: 'Kalb', c: 5, color: 'bg-yellow-600' },
    { n: 'Lamm', c: 1, color: 'bg-green-600' }
  ];

  const urunler = [
    { id: 1, n: "Bullen-Vorderviertel ohne Knochen" },
    { id: 2, n: "Bullen-Keule mit Knochen" },
    { id: 3, n: "Rinder-Nacken" },
    { id: 4, n: "Bullen-Bug", special: true } // Görseldeki seçili ürün
  ];

  const updateCart = (id, val) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, val) }));
  };

  return (
    <div className="flex h-screen bg-[#0a0b0d] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SIDEBAR (image_5805a1.jpg) */}
      <aside className="w-64 border-r border-white/5 bg-[#0d0f12] flex flex-col shrink-0">
        <div className="p-6 mb-4 text-[#00df82] font-black text-xl italic tracking-tighter">NEXTLOGI</div>
        <nav className="flex-1 px-3 space-y-1">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map(t => (
            <div key={t} className="flex items-center gap-3 p-3 text-gray-500 font-bold text-xs hover:bg-white/5 rounded-xl cursor-pointer">
              <LayoutGrid size={18}/> {t}
            </div>
          ))}
          <div className="flex items-center gap-3 p-4 bg-[#11241a] text-[#00df82] rounded-[1.2rem] border border-[#00df82]/10 mt-2">
            <ShoppingBag size={20}/> <span className="font-black italic">Ürünler & Sipariş</span>
          </div>
        </nav>
        <div className="p-4 space-y-4">
           <div className="bg-[#1a1d23]/50 p-4 rounded-2xl border border-white/5 flex items-center gap-3">
              <Package size={16} className="text-orange-500"/>
              <span className="text-[10px] font-black text-white uppercase italic">Ürün Modülü Aktif</span>
           </div>
           <div className="bg-[#1a1d23] p-4 rounded-2xl border border-white/5">
              <div className="text-[9px] text-blue-500 font-black mb-1">FİRMA SAHİBİ</div>
              <div className="text-sm font-black italic">Klaus Müller</div>
           </div>
           <button className="w-full py-3 bg-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <ArrowLeft size={14}/> Çıkış Yap
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col bg-[#0f1115]">
        
        {/* HEADER BAR (image_5805a1.jpg) */}
        <header className="p-6 border-b border-white/5 flex items-center justify-between bg-[#121418]">
          <div className="flex items-center gap-4">
            <button className="bg-white/5 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 border border-white/10 hover:bg-white/10 transition-all">
              <ArrowLeft size={14}/> Müşteri Değiştir
            </button>
            <div className="bg-black/40 border border-white/5 px-5 py-2.5 rounded-2xl flex items-center gap-4">
              <UserCircle className="text-green-500" size={24}/>
              <div>
                <div className="text-xs font-black text-white italic">Max Bauer GmbH</div>
                <div className="text-[9px] text-gray-500 font-bold">Berliner Str. 42, 10115 Berlin</div>
              </div>
              <span className="bg-green-500/10 text-green-500 text-[9px] font-black px-2 py-1 rounded border border-green-500/20 ml-2">ADIM 2/2</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative"><Search className="absolute left-4 top-3 text-gray-600" size={16}/><input type="text" placeholder="Ürün ara..." className="bg-black/40 border border-white/5 rounded-xl py-2.5 pl-11 pr-4 text-xs outline-none w-48"/></div>
             <button className="bg-orange-500/10 text-orange-500 p-2.5 rounded-xl border border-orange-500/20"><Settings size={20}/></button>
          </div>
        </header>

        {/* CONTENT & SIDEBAR SPLIT */}
        <div className="flex-1 flex overflow-hidden">
          
          {/* PRODUCT LIST */}
          <section className="flex-1 overflow-y-auto p-8 space-y-6">
            <div className="flex gap-2 pb-4">
              {categories.map(c => (
                <button key={c.n} className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase flex items-center gap-2 transition-all ${c.n === 'Tümü' ? 'bg-green-500/10 border-green-500 text-green-500 shadow-lg shadow-green-500/10' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${c.color}`}/> {c.n} <span className="opacity-40">{c.c}</span>
                </button>
              ))}
            </div>

            <div className="space-y-2">
               <div className="text-orange-500 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 mb-4">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/> RIND/BULLE <span className="text-gray-700 ml-auto">30 ürün</span>
               </div>
               {urunler.map(u => (
                 <div key={u.id} className={`flex items-center justify-between p-5 bg-[#121418]/60 rounded-2xl border ${u.special ? 'border-green-500/30 bg-green-500/[0.02]' : 'border-white/5'} hover:border-white/10 transition-all`}>
                    <div className="flex items-center gap-4">
                      {u.special && <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e] animate-pulse"/>}
                      <span className={`text-xs font-bold uppercase tracking-tight ${u.special ? 'text-green-500' : 'text-gray-300'}`}>{u.n}</span>
                    </div>
                    <div className={`w-24 h-10 rounded-xl flex items-center justify-center font-black italic text-lg border ${u.special ? 'bg-[#11241a] text-green-500 border-green-500/20' : 'bg-black/20 text-gray-700 border-white/5'}`}>
                       {cart[u.id] || 0}
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* RIGHT SIDEBAR: ORDER SUMMARY (image_5805a1.jpg) */}
          <aside className="w-80 bg-[#0d0f12] border-l border-white/5 p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-black italic uppercase text-white flex items-center gap-2"><ShoppingCart size={18} className="text-green-500"/> Sipariş Özeti</h2>
              <span className="bg-green-500 text-black text-[9px] font-black px-2 py-0.5 rounded-md">1 kalem</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
               <UserCircle size={14}/> <span className="text-[10px] font-bold">Max Bauer GmbH</span>
            </div>

            {/* SELECTED ITEM CARD */}
            <div className="bg-[#121418] p-5 rounded-2xl border-l-4 border-orange-500 relative">
               <button className="absolute right-4 top-4 text-red-500/40 hover:text-red-500"><Trash2 size={16}/></button>
               <div className="text-[9px] font-black text-orange-500 uppercase mb-1">RIND/BULLE • 4.0 kg</div>
               <div className="text-xs font-black text-white uppercase italic">Bullen-Bug</div>
               <div className="text-[10px] text-green-500 font-bold mt-1">4 <span className="text-gray-600">kg</span></div>
            </div>

            {/* DELIVERY NOTE */}
            <div className="space-y-3">
               <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase"><ClipboardList size={14}/> Teslimat Notu</div>
               <textarea placeholder="Özel not..." className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-xs font-bold min-h-[100px] outline-none focus:border-[#00df82]/30"></textarea>
            </div>

            <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
               <div className="bg-black/60 p-5 rounded-2xl border border-white/5 flex justify-between items-center">
                  <div className="text-[10px] text-gray-500 font-black uppercase">Toplam</div>
                  <div className="text-lg font-black text-[#00df82] italic">1 ürün • 4.0 kg</div>
               </div>
               <button className="w-full bg-[#00df82] text-black py-4 rounded-[1.2rem] font-black uppercase text-xs tracking-widest hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#00df82]/10">
                  📦 Siparişi Tamamla
               </button>
               <p className="text-[9px] text-gray-600 font-bold text-center">→ Görev Atama'ya yönlendirileceksiniz</p>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
};

export default OrderMasterApp;