import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, Trash2, 
  ArrowLeft, Package, UserCircle, Settings, ClipboardList,
  ChevronLeft, X, Fuel, CreditCard, Plus, Minus
} from 'lucide-react';

const OrderMasterClean = () => {
  const [cart, setCart] = useState({ 5: 4 });

  const categories = [
    { n: 'TÜMÜ', c: 62, active: true },
    { n: 'RIND/BULLE', c: 30 },
    { n: 'HÄHNCHEN', c: 17 },
    { n: 'KALB', c: 5 },
    { n: 'LAMM', c: 1 },
    { n: 'PUTE', c: 3 },
    { n: 'GEFLÜGEL', c: 3 },
    { n: 'VERARBEITET', c: 3 }
  ];

  const urunler = [
    { id: 1, n: "BULLEN-VORDERVIERTEL OHNE KNOCHEN" },
    { id: 2, n: "BULLEN-KEULE MIT KNOCHEN" },
    { id: 3, n: "RINDER-NACKEN" },
    { id: 4, n: "BULLEN-KAMM OHNE KNOCHEN" },
    { id: 5, n: "BULLEN-BUG", active: true },
    { id: 6, n: "BULLEN-BUG OHNE KNOCHEN" },
    { id: 7, n: "BULLEN-BUG + KAMM OHNE KNOCHEN" }
  ];

  const handleUpdate = (id, delta) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  return (
    <div className="flex h-screen bg-[#08090a] text-[#e1e1e3] font-sans overflow-hidden">
      
      {/* SOL SIDEBAR: DERLİ TOPLU LİSTE */}
      <aside className="w-[240px] bg-[#0a0b0d] border-r border-white/[0.03] flex flex-col shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter uppercase leading-none">NEXTLOGI</div>
          <div className="text-[9px] text-gray-600 font-bold tracking-[0.2em] mt-1 opacity-50">FİRMA PANELİ</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-[11px] hover:text-white transition-all cursor-pointer group">
              <LayoutGrid size={16} className="group-hover:text-[#00df82]" /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-4 bg-[#14261e] text-[#00df82] rounded-2xl border border-[#00df82]/10 mt-4 shadow-lg shadow-green-950/20">
            <ShoppingBag size={18} /> <span className="font-black italic text-xs uppercase">Ürünler & Sipariş</span>
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-[11px] hover:text-white cursor-pointer transition-all mt-2">
            <Fuel size={16}/> Yakıt Raporu
          </div>
          <div className="flex items-center gap-4 px-4 py-3 text-gray-500 font-bold text-[11px] hover:text-white cursor-pointer transition-all">
            <CreditCard size={16}/> Ödeme
          </div>
        </nav>

        <div className="p-5 space-y-3">
           <div className="bg-[#121418] p-4 rounded-2xl border border-white/5 flex items-center gap-4">
              <Package size={16} className="text-orange-500"/>
              <span className="text-[9px] font-black text-white uppercase italic tracking-wider">Ürün Modülü Aktif</span>
           </div>
           <div className="bg-[#121418] p-5 rounded-[1.5rem] border border-white/5">
              <div className="text-[8px] text-blue-500 font-black mb-1 uppercase tracking-widest">Firma Sahibi</div>
              <div className="text-sm font-black italic text-white truncate">Klaus Müller</div>
              <div className="text-[8px] text-gray-600 font-bold mt-1 uppercase">Müller GmbH</div>
           </div>
           <button className="w-full py-4 bg-[#121418]/50 hover:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all border border-white/[0.03]">
              <ChevronLeft size={14}/> Çıkış Yap
           </button>
        </div>
      </aside>

      {/* MERKEZ PANEL: HİZALANMIŞ ÜRÜN LİSTESİ */}
      <main className="flex-1 flex flex-col bg-[#08090a]">
        <header className="h-20 border-b border-white/[0.03] flex items-center justify-between px-8 bg-[#0a0b0d]/50">
          <div className="flex items-center gap-3">
            <button className="bg-[#121418] px-4 py-2.5 rounded-xl text-[9px] font-black uppercase flex items-center gap-2 border border-white/5">
              <ChevronLeft size={14}/> Müşteri Değiştir
            </button>
            <div className="bg-[#121418] border border-white/5 px-5 py-2.5 rounded-2xl flex items-center gap-4">
              <UserCircle className="text-green-500" size={20}/>
              <span className="text-[12px] font-black text-white italic tracking-tight">Max Bauer GmbH</span>
              <span className="bg-[#00df82]/10 text-[#00df82] text-[8px] font-black px-2 py-0.5 rounded border border-[#00df82]/20 ml-2 uppercase italic">Adım 2/2</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="relative">
                <Search className="absolute left-3.5 top-2.5 text-gray-600" size={14}/>
                <input type="text" placeholder="Ürün ara..." className="bg-[#121418] border border-white/5 rounded-xl py-2.5 pl-10 pr-4 text-[11px] outline-none w-56 focus:border-white/10 transition-all"/>
             </div>
             <button className="bg-orange-500/10 text-orange-500 p-2.5 rounded-xl border border-orange-500/20"><Settings size={18}/></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <div className="flex gap-2 pb-6 border-b border-white/[0.03] overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <button key={c.n} className={`whitespace-nowrap px-4 py-2 rounded-full border text-[9px] font-black uppercase flex items-center gap-2 transition-all ${c.active ? 'bg-[#00df82]/10 border-[#00df82] text-[#00df82]' : 'bg-[#121418] border-white/5 text-gray-500 hover:border-white/10'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${c.active ? 'bg-[#00df82]' : 'bg-gray-700'}`}/> {c.n} <span className="opacity-40">{c.c}</span>
              </button>
            ))}
          </div>

          <div className="space-y-2 max-w-5xl mx-auto">
            <div className="text-orange-500 font-black text-[9px] uppercase tracking-[0.2em] flex items-center gap-2 mb-4 px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-sm"/> RIND/BULLE <span className="text-gray-800 ml-auto tracking-normal lowercase">30 ürün</span>
            </div>
            {urunler.map((u) => (
              <div key={u.id} className={`flex items-center justify-between p-3.5 px-8 bg-[#121418]/20 rounded-2xl border transition-all ${u.active ? 'border-[#00df82]/30 bg-green-500/[0.02]' : 'border-white/[0.03]'}`}>
                <div className="flex items-center gap-4">
                   {u.active && <div className="w-1.5 h-1.5 rounded-full bg-[#00df82] shadow-[0_0_8px_#00df82]"/>}
                   <span className={`text-[11px] font-black tracking-tight uppercase italic ${u.active ? 'text-[#00df82]' : 'text-gray-500'}`}>{u.n}</span>
                </div>

                <div className="flex items-center gap-3">
                  {cart[u.id] > 0 ? (
                    <div className="flex items-center bg-black/40 rounded-xl border border-white/5 p-1 shadow-inner h-10">
                      <button onClick={() => handleUpdate(u.id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white"><Minus size={14}/></button>
                      <span className="w-10 text-center font-black italic text-[#00df82] text-[16px]">{cart[u.id]}</span>
                      <button onClick={() => handleUpdate(u.id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-white"><Plus size={14}/></button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => handleUpdate(u.id, 1)}
                      className="bg-[#121418]/50 hover:bg-[#1a2d24] text-gray-600 hover:text-[#00df82] border border-white/5 hover:border-[#00df82]/20 px-5 py-2 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all h-10"
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

      {/* SAĞ PANEL: SEPET DÜZENİ (image_57f27f.jpg Birebir) */}
      <aside className="w-[380px] bg-[#0a0b0d] border-l border-white/[0.03] p-8 flex flex-col gap-8 shadow-2xl relative">
        <div className="flex justify-between items-center px-1">
          <h2 className="text-sm font-black italic uppercase text-white flex items-center gap-3"><ShoppingCart size={20} className="text-[#00df82]"/> Sipariş Özeti</h2>
          <span className="bg-[#14261e] text-[#00df82] text-[9px] font-black px-2 py-0.5 rounded-md border border-[#00df82]/20 shadow-sm shadow-green-500/5">1 KALEM</span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600 -mt-6 px-1">
           <UserCircle size={12}/> <span className="text-[10px] font-bold">Max Bauer GmbH</span>
        </div>

        {/* SEPET KARTI */}
        <div className="space-y-4">
          {Object.entries(cart).map(([id, qty]) => qty > 0 && (
            <div key={id} className="bg-[#121418] p-5 rounded-[1.8rem] border-l-[5px] border-orange-500 relative shadow-xl overflow-hidden group">
               <button onClick={() => handleUpdate(parseInt(id), -qty)} className="absolute right-5 top-5 text-gray-700 hover:text-red-500 transition-colors">
                 <X size={16}/>
               </button>
               <div className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1 italic opacity-80">RIND/BULLE • {qty}.0 kg</div>
               <div className="text-[13px] font-black text-white uppercase italic tracking-tighter truncate pr-8 leading-tight">
                 {urunler.find(u => u.id === parseInt(id))?.n}
               </div>
               <div className="text-[14px] text-[#00df82] font-black mt-3 flex items-baseline gap-1">
                 {qty} <span className="text-gray-600 font-bold uppercase text-[9px] italic tracking-widest">kg</span>
               </div>
            </div>
          ))}
        </div>

        {/* TESLİMAT NOTU ALANI */}
        <div className="space-y-3 px-1 mt-2">
           <div className="flex items-center gap-2 text-gray-600 text-[9px] font-black uppercase tracking-widest italic opacity-70"><ClipboardList size={16}/> Teslimat Notu</div>
           <textarea placeholder="Özel not..." className="w-full bg-[#121418]/50 border border-white/5 rounded-[1.5rem] p-5 text-[11px] font-bold min-h-[140px] outline-none focus:border-[#00df82]/20 transition-all text-white placeholder:text-gray-800 shadow-inner resize-none"></textarea>
        </div>

        {/* FİNAL ALT BÖLÜM */}
        <div className="mt-auto space-y-4">
           <div className="bg-[#121418] p-6 rounded-[2rem] border border-white/5 flex justify-between items-end shadow-inner relative overflow-hidden group">
              <div className="text-[10px] text-gray-600 font-black uppercase tracking-[0.2em] relative z-10">TOPLAM</div>
              <div className="text-lg font-black text-[#00df82] italic tracking-tighter relative z-10">1 ÜRÜN • 4.0 KG</div>
           </div>
           
           <button className="w-full bg-[#00df82] text-black py-5 rounded-[1.8rem] font-black uppercase text-[11px] tracking-[0.2em] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-[0_15px_40px_rgba(0,223,130,0.1)] group">
              <Package size={18} className="group-hover:scale-110 transition-transform"/> SIPARIŞI TAMAMLA
           </button>
           
           <p className="text-[9px] text-gray-700 font-bold text-center italic tracking-wider opacity-60">→ Görev Atama'ya yönlendirileceksiniz</p>
        </div>
      </aside>

    </div>
  );
};

export default OrderMasterClean;