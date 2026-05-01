import React, { useState } from 'react';
import { 
  LayoutGrid, Users, Send, ShoppingBag, Fuel, CreditCard, 
  LogOut, Package, Search, Plus, ArrowLeft, ShoppingCart, 
  ToggleRight, CheckCircle2
} from 'lucide-react';

const NextLogiPro = () => {
  const [activeTab, setActiveTab] = useState('Ürün Yönetimi');
  const [selectedCat, setSelectedCat] = useState('Tümü');

  // image_5863b8.png Veri Seti
  const categories = [
    { n: 'Tümü', c: 62, color: 'bg-blue-500' },
    { n: 'Rind/Bulle', c: 30, color: 'bg-orange-500' },
    { n: 'Hähnchen', c: 17, color: 'bg-yellow-500' },
    { n: 'Kalb', c: 5, color: 'bg-yellow-600' },
    { n: 'Lamm', c: 1, color: 'bg-green-500' },
    { n: 'Pute', c: 3, color: 'bg-pink-500' },
    { n: 'Geflügel', c: 3, color: 'bg-blue-400' },
    { n: 'Verarbeitet', c: 3, color: 'bg-gray-500' },
  ];

  const tumUrunler = [
    { n: "Bullen-Vorderviertel ohne Knochen", k: "Rind/Bulle", s: true },
    { n: "Bullen-Keule mit Knochen", k: "Rind/Bulle", s: true },
    { n: "Rinder-Nacken", k: "Rind/Bulle", s: true },
    { n: "Bullen-Kamm ohne Knochen", k: "Rind/Bulle", s: true },
    { n: "Bullen-Bug", k: "Rind/Bulle", s: true },
    { n: "Bullen-Bug ohne Knochen", k: "Rind/Bulle", s: true },
    { n: "Bullen-Bug + Kamm ohne Knochen", k: "Rind/Bulle", s: true },
    { n: "Bullen-Kugel", k: "Rind/Bulle", s: true },
    { n: "Bullen-Haxe", k: "Rind/Bulle", s: true },
    { n: "Bullen-Oberschale", k: "Rind/Bulle", s: true },
    { n: "Bullen-Unterschale", k: "Rind/Bulle", s: true },
    { n: "Bullen-Rib-Eye", k: "Rind/Bulle", s: true },
    { n: "Hähnchenbrust", k: "Hähnchen", s: true },
    { n: "Putenbrust", k: "Pute", s: true }
  ];

  const filtrelenmişÜrünler = selectedCat === 'Tümü' 
    ? tumUrunler 
    : tumUrunler.filter(u => u.k === selectedCat);

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-[#0d0f12] shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter uppercase">NEXTLOGI</div>
          <div className="text-[10px] text-gray-600 font-bold tracking-[0.4em] mt-1 uppercase">Firma Paneli</div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          {['Dashboard', 'Sürücüler', 'Görev Atama'].map(t => (
            <div key={t} onClick={() => setActiveTab(t)} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer font-bold text-sm ${activeTab === t ? 'bg-[#162a22] text-[#00df82]' : 'text-gray-500 hover:bg-white/5'}`}>
              <LayoutGrid size={20}/> {t}
            </div>
          ))}
          <div onClick={() => setActiveTab('Ürün Yönetimi')} className={`mt-4 p-5 rounded-[2.5rem] flex items-center gap-4 cursor-pointer border ${activeTab === 'Ürün Yönetimi' ? 'bg-[#11241a] border-[#00df82]/30 shadow-lg shadow-[#00df82]/5' : 'bg-transparent border-transparent'}`}>
            <ShoppingBag size={24} className="text-[#00df82]" />
            <span className="text-[#00df82] font-black text-lg italic uppercase">Ürün Yönetimi</span>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto bg-[#0f1115]">
        {activeTab === 'Ürün Yönetimi' && (
          <div className="p-10 space-y-8 animate-in fade-in duration-500">
            
            {/* TOP ACTIONS (image_5863b8.png) */}
            <div className="flex items-center justify-between bg-black/20 p-6 rounded-[2rem] border border-white/5 shadow-2xl">
              <div className="flex items-center gap-6">
                <button className="p-3 bg-white/5 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-all"><ArrowLeft size={20}/></button>
                <div>
                  <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">📦 Ürün Yönetimi</h1>
                    <span className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest shadow-[0_0_15px_rgba(37,99,235,0.4)]">Patron Modu</span>
                  </div>
                  <p className="text-[10px] text-gray-500 font-bold mt-2 uppercase tracking-[0.2em]">62 AKTİF ÜRÜN • 0 PASİF</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-3.5 text-gray-600" size={18} />
                  <input type="text" placeholder="Ürün ara..." className="bg-black/40 border border-white/10 rounded-2xl py-3.5 pl-12 pr-6 text-xs font-bold outline-none w-72 focus:border-[#00df82]/30 transition-all shadow-inner" />
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 flex items-center gap-2">
                  <Plus size={18}/> Ürün Ekle
                </button>
                <button className="bg-[#162a22] hover:bg-[#1c352b] text-[#00df82] px-8 rounded-2xl font-black text-[11px] uppercase tracking-widest border border-[#00df82]/20 transition-all flex items-center gap-2">
                  <ShoppingCart size={18}/> Sipariş Moduna Geç
                </button>
              </div>
            </div>

            {/* CATEGORY BAR (image_5863b8.png) */}
            <div className="flex flex-wrap gap-3 pb-2 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button 
                  key={cat.n}
                  onClick={() => setSelectedCat(cat.n)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all text-[11px] font-black uppercase tracking-tighter ${selectedCat === cat.n ? 'bg-blue-600/10 border-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/20 hover:text-gray-300'}`}
                >
                  <div className={`w-2.5 h-2.5 rounded-full ${cat.color} shadow-[0_0_8px_currentColor]`} />
                  {cat.n} <span className="opacity-30 ml-1">{cat.c}</span>
                </button>
              ))}
            </div>

            {/* PRODUCT LIST GRID */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-orange-500 font-black text-[11px] uppercase tracking-[0.3em] px-2">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_#f97316]" /> {selectedCat.toUpperCase()}
                </div>
                <span className="text-gray-700 italic">{filtrelenmişÜrünler.length} Ürün Listeleniyor</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                {filtrelenmişÜrünler.map((u, i) => (
                  <div key={i} className="group flex items-center justify-between p-6 bg-black/20 rounded-3xl border border-white/5 hover:border-white/10 hover:bg-white/[0.03] transition-all cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                        <Package className="text-gray-600 group-hover:text-[#00df82]" size={20}/>
                      </div>
                      <div>
                        <span className="text-base font-bold text-gray-200 group-hover:text-white transition-colors uppercase tracking-tight italic">{u.n}</span>
                        <div className="text-[9px] text-gray-600 font-black tracking-widest mt-1">KAT: {u.k}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                      <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                        <CheckCircle2 size={12} className="text-green-500" />
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest italic">Aktif</span>
                      </div>
                      <div className="w-12 h-6 bg-[#162a22] rounded-full relative border border-[#00df82]/30 p-1 shadow-inner">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-[#00df82] rounded-full shadow-[0_0_10px_#00df82]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default NextLogiPro;