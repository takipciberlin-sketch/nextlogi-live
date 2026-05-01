import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, 
  UserCircle, X, Plus, Minus
} from 'lucide-react';

const THEME = {
  colors: {
    bgMain: '#0d1117',
    bgCard: '#161b22',
    primary: '#00df82', 
    secondary: '#f97316',
    accentBlue: '#2563eb', // Yeni mavi buton rengi
    textMain: '#e1e1e3',
    textMuted: '#484f58'
  }
};

const FinalApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState({ 1: 6 }); 

  // Ürün listesi (Genişletilebilir)
  const [categories, setCategories] = useState([
    {
      id: "cat1",
      name: "RIND/BULLE",
      products: [
        { id: 1, name: "Bullen-Bug" },
        { id: 2, name: "Bullen-Keule" },
        { id: 3, name: "Rinder-Nacken" },
        { id: 4, name: "Bullen-Vorderviertel" },
        { id: 5, name: "Bullen-Kamm" }
      ]
    }
  ]);

  const handleUpdate = (id, delta) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  // CANLI ARAMA FİLTRESİ
  const filteredProducts = categories[0].products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalKg = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: THEME.colors.bgMain, color: THEME.colors.textMain }}>
      
      {/* SOL SIDEBAR */}
      <aside className="w-[240px] border-r flex flex-col shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="p-8">
          <div className="font-black text-2xl italic tracking-tighter uppercase" style={{ color: THEME.colors.primary }}>NEXTLOGI</div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 font-bold text-[11px] opacity-40 hover:opacity-100 cursor-pointer transition-all">
              <LayoutGrid size={16} /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border" style={{ backgroundColor: 'rgba(0,223,130,0.05)', color: THEME.colors.primary, borderColor: 'rgba(0,223,130,0.1)' }}>
            <ShoppingBag size={18} /> <span className="font-black italic text-xs uppercase">Ürünler & Sipariş</span>
          </div>
        </nav>
      </aside>

      {/* MERKEZ PANEL */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b flex items-center justify-between px-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="bg-[#161b22] border border-white/[0.05] px-5 py-2 rounded-2xl flex items-center gap-4">
            <UserCircle className="text-blue-400" size={20}/>
            <span className="text-[12px] font-bold opacity-80">Max Bauer GmbH</span>
          </div>

          {/* GÖRSELDEKİ ARAMA VE EKLEME BUTONU ALANI */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-gray-500" size={14}/>
              <input 
                type="text" 
                placeholder="Ürün ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#161b22] border border-white/10 rounded-full py-2.5 pl-10 pr-6 text-[11px] outline-none w-64 focus:border-[#2563eb]/50 transition-all placeholder:text-gray-600"
              />
            </div>
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-full font-bold text-[11px] flex items-center gap-2 transition-all shadow-lg active:scale-95">
              <Plus size={14} /> Ürün Ekle
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <div key={p.id} className={`flex items-center justify-between p-4 px-8 rounded-xl border transition-all ${cart[p.id] > 0 ? 'border-[#00df82]/30 bg-[#00df82]/5' : 'border-white/[0.03] bg-[#161b22]/40'}`}>
                <div className="flex items-center gap-3">
                  {cart[p.id] > 0 && <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#00df82]" style={{ backgroundColor: THEME.colors.primary }}/>}
                  <span className={`text-[11px] font-bold uppercase italic ${cart[p.id] > 0 ? 'text-[#00df82]' : 'opacity-30'}`}>{p.name}</span>
                </div>
                
                {cart[p.id] > 0 ? (
                  <div className="flex items-center bg-black/20 rounded-lg border border-white/5 p-1 h-10">
                    <button onClick={() => handleUpdate(p.id, -1)} className="px-3 text-gray-500"><Minus size={14}/></button>
                    <span className="px-4 font-black text-xl italic text-[#00df82]">{cart[p.id]}</span>
                    <button onClick={() => handleUpdate(p.id, 1)} className="px-3 text-gray-500"><Plus size={14}/></button>
                  </div>
                ) : (
                  <button onClick={() => handleUpdate(p.id, 1)} className="text-gray-600 font-black text-[9px] border border-white/5 px-4 py-2 rounded-lg hover:bg-white/5 transition-all">+ ÜRÜN EKLE</button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-20 opacity-20 italic">Aradığınız ürün bulunamadı...</div>
          )}
        </div>
      </main>

      {/* SAĞ PANEL (Sipariş Özeti) */}
      <aside className="w-[360px] border-l flex flex-col shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="p-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-gray-400"/>
            <h2 className="text-[13px] font-black uppercase italic">Sipariş Özeti</h2>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 rounded-full border" style={{ color: THEME.colors.primary, backgroundColor: 'rgba(0,223,130,0.05)', borderColor: 'rgba(0,223,130,0.1)' }}>{Object.keys(cart).filter(k => cart[k] > 0).length} kalem</span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 mt-4">
          {/* RIND/BULLE Kategorisi */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(249,115,22,0.5)]" style={{ backgroundColor: THEME.colors.secondary }}/>
              <span className="text-[10px] font-black uppercase italic tracking-widest" style={{ color: THEME.colors.secondary }}>RIND/BULLE</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]"/>
              <span className="text-[10px] font-bold text-gray-600">{totalKg.toFixed(1)} kg</span>
            </div>

            {categories[0].products.map(p => cart[p.id] > 0 && (
              <div key={p.id} className="bg-[#161b22] rounded-xl p-4 border border-white/[0.03] flex justify-between items-start animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: THEME.colors.secondary }}/>
                  <div>
                    <div className="text-[12px] font-bold text-gray-200 mb-1">{p.name}</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[14px] font-black text-[#00df82]">{cart[p.id]}</span>
                      <span className="text-[9px] font-bold text-gray-600 uppercase italic">KG</span>
                    </div>
                  </div>
                </div>
                <button onClick={() => handleUpdate(p.id, -cart[p.id])} className="p-1.5 bg-red-500/5 rounded-lg text-red-500/30 hover:text-red-500 transition-colors">
                  <X size={16}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ALT TOPLAM */}
        <div className="p-6 space-y-4 bg-[#0d1117] border-t border-white/[0.02]">
          <div className="bg-[#161b22]/30 border p-5 rounded-2xl" style={{ borderColor: 'rgba(0,223,130,0.15)' }}>
            <div className="text-[9px] text-gray-600 font-bold uppercase mb-1 tracking-widest">Toplam</div>
            <div className="text-[18px] font-black italic text-[#00df82]">{Object.keys(cart).filter(k => cart[k] > 0).length} ürün • {totalKg.toFixed(1)} kg</div>
          </div>
          
          <button className="w-full py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-lg hover:brightness-110 active:scale-95" 
            style={{ backgroundColor: THEME.colors.primary, color: THEME.colors.bgMain }}>
            Siparişi Tamamla
          </button>
        </div>
      </aside>
    </div>
  );
};

export default FinalApp;