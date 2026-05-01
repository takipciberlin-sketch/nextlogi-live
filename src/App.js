import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, Plus, Minus, ShoppingCart, 
  Trash2, ArrowLeft, Package, UserCircle, Settings, ClipboardList,
  ChevronLeft, LogOut, Users, MapPin
} from 'lucide-react';

const NextLogiOrder = () => {
  const [cart, setCart] = useState({ 4: 4 });

  const urunler = [
    { id: 1, n: "BULLEN-VORDERVIERTEL OHNE KNOCHEN" },
    { id: 2, n: "BULLEN-KEULE MIT KNOCHEN" },
    { id: 3, n: "RINDER-NACKEN" },
    { id: 4, n: "BULLEN-BUG", active: true }
  ];

  return (
    <div className="flex h-screen bg-[#08090a] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SOL SIDEBAR (Birebir image_580525.png) */}
      <aside className="w-[280px] bg-[#0a0b0d] border-r border-white/[0.03] flex flex-col p-6">
        <div className="text-[#00df82] font-black text-2xl italic tracking-tighter mb-10 px-4 uppercase">Nextlogi</div>
        <nav className="flex-1 space-y-2">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 text-gray-600 font-bold text-xs hover:text-white transition-colors cursor-pointer">
              <LayoutGrid size={18} /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-6 py-4 bg-[#11241a]/40 text-[#00df82] rounded-[1.5rem] border border-[#00df82]/10 mt-4 shadow-lg shadow-green-500/5">
            <ShoppingBag size={20} /> <span className="font-black italic text-sm">Ürünler & Sipariş</span>
          </div>
        </nav>

        <div className="mt-auto space-y-4">
           <div className="bg-[#121418] p-5 rounded-[1.5rem] border border-white/[0.05] flex items-center gap-4">
              <div className="bg-orange-500/10 p-2 rounded-xl"><Package size={18} className="text-orange-500"/></div>
              <span className="text-[10px] font-black text-white uppercase italic leading-none">Ürün Modülü Aktif</span>
           </div>
           <div className="bg-[#121418] p-6 rounded-[1.8rem] border border-white/[0.05]">
              <div className="text-[9px] text-blue-500 font-black mb-2 uppercase tracking-widest">Firma Sahibi</div>
              <div className="text-lg font-black italic text-white leading-tight">Klaus Müller</div>
              <div className="text-[10px] text-gray-600 font-bold mt-1 uppercase">Müller GmbH</div>
           </div>
           <button className="w-full py-4 bg-[#121418] hover:bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all">
              <ChevronLeft size={16}/> Çıkış Yap
           </button>
        </div>
      </aside>

      {/* MERKEZ: ÜRÜN LİSTESİ */}
      <main className="flex-1 flex flex-col bg-[#0a0b0d]">
        {/* ÜST BAR */}
        <header className="h-[100px] border-b border-white/[0.03] flex items-center justify-between px-10">
          <div className="flex items-center gap-4">
            <button className="bg-[#121418] px-5 py-3 rounded-xl text-[10px] font-black uppercase flex items-center gap-3 border border-white/[0.05] hover:bg-white/5 transition-all">
              <ChevronLeft size={16}/> Müşteri Değiştir
            </button>
            <div className="bg-[#121418] border border-white/[0.05] px-6 py-3 rounded-2xl flex items-center gap-5">
              <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20">
                <UserCircle className="text-green-500" size={24}/>
              </div>
              <div>
                <div className="text-sm font-black text-white italic tracking-tight">Max Bauer GmbH</div>
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Berliner Str. 42, 10115 Berlin</div>
              </div>
              <span className="bg-green-500 text-black text-[9px] font-black px-3 py-1 rounded-md ml-4">ADIM 2/2</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-3.5 text-gray-600" size={16}/>
              <input type="text" placeholder="Ürün ara..." className="bg-[#121418] border border-white/[0.05] rounded-xl py-3.5 pl-12 pr-6 text-xs outline-none w-[300px] focus:border-white/20"/>
            </div>
            <button className="bg-orange-500/10 text-orange-500 p-3.5 rounded-xl border border-orange-500/20"><Settings size={20}/></button>
          </div>
        </header>

        {/* ÜRÜN KARTLARI */}
        <div className="flex-1 overflow-y-auto p-10 space-y-6">
          <div className="flex gap-3 mb-8">
            {['TÜMÜ 62', 'RIND/BULLE 30', 'HÄHNCHEN 17', 'KALB 5', 'LAMM 1'].map((cat, i) => (
              <button key={cat} className={`px-6 py-2.5 rounded-full border text-[10px] font-black uppercase transition-all ${i===0 ? 'bg-green-500/10 border-green-500 text-green-500 shadow-lg shadow-green-500/5' : 'bg-[#121418] border-white/[0.05] text-gray-500'}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
             <div className="text-orange-500 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mb-6">
               <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]"/> RIND/BULLE <span className="text-gray-700 ml-auto tracking-normal">30 ÜRÜN</span>
             </div>
             {urunler.map(u => (
               <div key={u.id} className={`flex items-center justify-between p-8 bg-[#121418]/40 rounded-[2rem] border transition-all ${u.active ? 'border-green-500/30' : 'border-white/[0.05]'}`}>
                  <div className="flex items-center gap-6">
                    {u.active && <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"/>}
                    <span className={`text-sm font-black uppercase tracking-tight italic ${u.active ? 'text-green-500' : 'text-gray-400'}`}>{u.n}</span>
                  </div>
                  <div className={`w-28 h-14 rounded-2xl flex items-center justify-center font-black italic text-2xl border transition-all ${u.active ? 'bg-[#11241a] text-green-500 border-green-500/20 shadow-inner' : 'bg-black/20 text-gray-700 border-white/[0.05]'}`}>
                     {cart[u.id] || 0}
                  </div>
               </div>
             ))}
          </div>
        </div>
      </main>

      {/* SAĞ TARAF: SİPARİŞ ÖZETİ (image_580525.png) */}
      <aside className="w-[420px] bg-[#0a0b0d] border-l border-white/[0.03] p-10 flex flex-col gap-10">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-black italic uppercase text-white flex items-center gap-3"><ShoppingCart size={24} className="text-green-500"/> Sipariş Özeti</h2>
          <span className="bg-green-500 text-black text-[10px] font-black px-3 py-1 rounded-md">1 kalem</span>
        </div>
        
        <div className="flex items-center gap-3 text-gray-500 -mt-6">
           <UserCircle size={16}/> <span className="text-[11px] font-bold">Max Bauer GmbH</span>
        </div>

        {/* TURUNCU ÇİZGİLİ SEPET KARTI */}
        <div className="bg-[#121418] p-6 rounded-[2rem] border-l-[6px] border-orange-500 relative shadow-2xl">
           <button className="absolute right-6 top-6 text-gray-700 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
           <div className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-2 italic">Rind/Bulle • 4.0 kg</div>
           <div className="text-md font-black text-white uppercase italic tracking-tight">Bullen-Bug</div>
           <div className="text-sm text-green-500 font-black mt-2">4 <span className="text-gray-600 font-bold">kg</span></div>
        </div>

        {/* TESLİMAT NOTU */}
        <div className="space-y-4">
           <div className="flex items-center gap-3 text-gray-500 text-[10px] font-black uppercase tracking-widest italic"><ClipboardList size={16}/> Teslimat Notu</div>
           <textarea placeholder="Özel not..." className="w-full bg-[#121418] border border-white/[0.05] rounded-[2rem] p-6 text-xs font-bold min-h-[150px] outline-none focus:border-green-500/30 transition-all text-white placeholder:text-gray-700"></textarea>
        </div>

        {/* ALT TOPLAM VE BUTON */}
        <div className="mt-auto space-y-6">
           <div className="bg-[#121418] p-8 rounded-[2.5rem] border border-white/[0.05] flex justify-between items-end shadow-inner">
              <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em]">Toplam</div>
              <div className="text-xl font-black text-[#00df82] italic tracking-tighter">1 ürün • 4.0 kg</div>
           </div>
           <button className="w-full bg-[#00df82] text-black py-6 rounded-[2rem] font-black uppercase text-sm tracking-[0.3em] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 shadow-[0_20px_50px_rgba(0,223,130,0.15)]">
              📦 Siparişi Tamamla
           </button>
           <p className="text-[10px] text-gray-700 font-bold text-center italic">→ Görev Atama'ya yönlendirileceksiniz</p>
        </div>
      </aside>

    </div>
  );
};

export default NextLogiOrder;