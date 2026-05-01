import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, Trash2, 
  ArrowLeft, Package, UserCircle, Settings, ClipboardList,
  ChevronLeft, X, Truck, Users, MapPin, Fuel, CreditCard
} from 'lucide-react';

const NextLogiFinal = () => {
  const [cart, setCart] = useState({ 4: 4 });

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
    { id: 1, n: "Bullen-Vorderviertel ohne Knochen", q: 0 },
    { id: 2, n: "Bullen-Keule mit Knochen", q: 0 },
    { id: 3, n: "Rinder-Nacken", q: 0 },
    { id: 4, n: "Bullen-Kamm ohne Knochen", q: 0 },
    { id: 5, n: "Bullen-Bug", q: 4, active: true },
    { id: 6, n: "Bullen-Bug ohne Knochen", q: 0 },
    { id: 7, n: "Bullen-Bug + Kamm ohne Knochen", q: 0 }
  ];

  return (
    <div className="flex h-screen bg-[#0d1117] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SOL SIDEBAR (Birebir Görseldeki Renk ve İkonlar) */}
      <aside className="w-[240px] bg-[#0d1117] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-6">
          <div className="text-[#00df82] font-black text-xl italic tracking-tighter uppercase">Nextlogi</div>
          <div className="text-[9px] text-gray-500 font-bold tracking-widest mt-1">FİRMA PANELİ</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-3 p-3 text-gray-400 font-bold text-xs hover:bg-white/5 rounded-xl cursor-pointer">
              <LayoutGrid size={16} /> {item}
            </div>
          ))}
          <div className="flex items-center gap-3 p-3 bg-[#1a2d24] text-[#00df82] rounded-xl border border-[#00df82]/10 mt-2">
            <ShoppingBag size={18} /> <span className="font-bold italic">Ürünler & Sipariş</span>
          </div>
          {['Yakıt Raporu', 'Ödeme'].map((item) => (
             <div key={item} className="flex items-center gap-3 p-3 text-gray-400 font-bold text-xs hover:bg-white/5 rounded-xl cursor-pointer">
                {item === 'Yakıt Raporu' ? <Fuel size={16}/> : <CreditCard size={16}/>} {item}
             </div>
          ))}
        </nav>

        <div className="p-4 space-y-3">
           <div className="bg-[#161b22] p-3 rounded-xl border border-white/5 flex items-center gap-3">
              <Package size={16} className="text-orange-500"/>
              <span className="text-[9px] font-black text-white uppercase italic">Ürün Modülü Aktif</span>
           </div>
           <div className="bg-[#161b22] p-4 rounded-xl border border-white/5">
              <div className="text-[8px] text-blue-500 font-black mb-1 uppercase">Firma Sahibi</div>
              <div className="text-sm font-black italic">Klaus Müller</div>
              <div className="text-[9px] text-gray-600 font-bold">Müller GmbH</div>
           </div>
           <button className="w-full py-3 bg-[#161b22] hover:bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all">
              <ArrowLeft size={14}/> Çıkış Yap
           </button>
        </div>
      </aside>

      {/* MERKEZ: ÜRÜN LİSTESİ */}
      <main className="flex-1 flex flex-col bg-[#0d1117]">
        {/* HEADER BAR */}
        <header className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="bg-[#161b22] px-4 py-2 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 border border-white/5">
              <ChevronLeft size={14}/> Müşteri Değiştir
            </button>
            <div className="bg-[#161b22] border border-white/5 px-4 py-2 rounded-xl flex items-center gap-3">
              <UserCircle className="text-green-500" size={20}/>
              <div>
                <div className="text-[11px] font-black text-white italic">Max Bauer GmbH</div>
                <div className="text-[8px] text-gray-500 font-bold">Berliner Str. 42, 10115 Berlin</div>
              </div>
              <span className="bg-green-500/10 text-green-500 text-[8px] font-black px-2 py-0.5 rounded border border-green-500/20 ml-2 uppercase">Adım 2/2</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-600" size={14}/>
                <input type="text" placeholder="Ürün ara..." className="bg-[#161b22] border border-white/5 rounded-xl py-2 pl-9 pr-4 text-[11px] outline-none w-48"/>
             </div>
             <button className="bg-orange-500/10 text-orange-500 p-2 rounded-xl border border-orange-500/20"><Settings size={18}/></button>
          </div>
        </header>

        {/* KATEGORİLER VE LİSTE */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex gap-2 pb-4 border-b border-white/5">
            {categories.map((c) => (
              <button key={c.n} className={`px-3 py-1.5 rounded-full border text-[9px] font-black uppercase flex items-center gap-2 ${c.active ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-[#161b22] border-white/5 text-gray-500'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${c.active ? 'bg-green-500' : 'bg-gray-700'}`}/> {c.n} <span className="opacity-40">{c.c}</span>
              </button>
            ))}
          </div>

          <div className="text-orange-500 font-black text-[9px] uppercase tracking-widest flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm"/> RIND/BULLE <span className="text-gray-700 ml-auto tracking-normal lowercase">30 ürün</span>
          </div>

          <div className="space-y-1">
            {urunler.map((u) => (
              <div key={u.id} className={`flex items-center justify-between p-3.5 bg-[#161b22]/40 rounded-xl border transition-all ${u.active ? 'border-green-500/40 bg-green-500/[0.03]' : 'border-white/5'}`}>
                <div className="flex items-center gap-3">
                   {u.active && <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_#22c55e]"/>}
                   <span className={`text-[11px] font-bold ${u.active ? 'text-green-500 italic' : 'text-gray-400'}`}>{u.n}</span>
                </div>
                <div className={`w-20 h-9 rounded-lg flex items-center justify-center font-black italic text-sm border ${u.active ? 'bg-[#1a2d24] text-green-500 border-green-500/20' : 'bg-black/20 text-gray-700 border-white/5'}`}>
                  {u.q}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* SAĞ TARAF: SİPARİŞ ÖZETİ (image_580525.png) */}
      <aside className="w-72 bg-[#0d1117] border-l border-white/5 p-5 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black italic uppercase text-white flex items-center gap-2"><ShoppingCart size={16} className="text-green-500"/> Sipariş Özeti</h2>
          <span className="bg-[#1a2d24] text-[#00df82] text-[8px] font-black px-2 py-0.5 rounded border border-[#00df82]/20">1 kalem</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-500 -mt-3">
           <UserCircle size={12}/> <span className="text-[9px] font-bold">Max Bauer GmbH</span>
        </div>

        {/* SEPET KARTI (image_580525.png'deki gibi turuncu detaylı) */}
        <div className="bg-[#161b22] p-4 rounded-xl border-l-[3px] border-orange-500 relative">
           <button className="absolute right-3 top-3 bg-red-500/10 p-1 rounded-md text-red-500/60 hover:text-red-500"><X size={12}/></button>
           <div className="text-[8px] font-black text-orange-500 uppercase italic mb-1">RIND/BULLE • 4.0 kg</div>
           <div className="text-[10px] font-black text-white uppercase italic">Bullen-Bug</div>
           <div className="text-[10px] text-green-500 font-bold mt-1">4 <span className="text-gray-600">kg</span></div>
        </div>

        {/* TESLİMAT NOTU */}
        <div className="space-y-2">
           <div className="flex items-center gap-2 text-gray-500 text-[9px] font-black uppercase italic"><ClipboardList size={14}/> Teslimat Notu</div>
           <textarea placeholder="Özel not..." className="w-full bg-[#161b22] border border-white/5 rounded-xl p-3 text-[10px] font-bold min-h-[100px] outline-none focus:border-[#00df82]/30 transition-all"></textarea>
        </div>

        {/* ALT BİLGİ VE BUTON */}
        <div className="mt-auto space-y-3">
           <div className="bg-[#161b22] p-4 rounded-xl border border-white/5 flex justify-between items-center">
              <div className="text-[9px] text-gray-500 font-black uppercase tracking-widest">Toplam</div>
              <div className="text-sm font-black text-[#00df82] italic">1 ürün • 4.0 kg</div>
           </div>
           <button className="w-full bg-[#00df82] text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-500/5">
              <Package size={16}/> Siparişi Tamamla
           </button>
           <div className="text-[8px] text-gray-600 font-bold text-center italic">→ Görev Atama'ya yönlendirileceksiniz</div>
        </div>
      </aside>

    </div>
  );
};

export default NextLogiFinal;