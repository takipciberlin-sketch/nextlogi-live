import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, 
  UserCircle, X, Plus, Minus, Package, Tag, Layers
} from 'lucide-react';

const THEME = {
  colors: {
    bgMain: '#0d1117',
    bgCard: '#161b22',
    primary: '#00df82', 
    secondary: '#f97316',
    accentBlue: '#2563eb', 
    textMain: '#e1e1e3',
    textMuted: '#484f58'
  }
};

const FinalApp = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState({ 1: 6 }); 
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal Kontrolü

  // Ürün ve Birim Listesi
  const units = ["kg", "karton", "tane"];
  const [categories, setCategories] = useState([
    {
      id: "cat1",
      name: "RIND/BULLE",
      products: [
        { id: 1, name: "Bullen-Bug", unit: "kg" },
        { id: 2, name: "Bullen-Keule", unit: "kg" },
        { id: 3, name: "Rinder-Nacken", unit: "kg" }
      ]
    }
  ]);

  const handleUpdate = (id, delta) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const filteredProducts = categories[0].products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden font-sans relative" style={{ backgroundColor: THEME.colors.bgMain, color: THEME.colors.textMain }}>
      
      {/* --- YENİ ÜRÜN EKLEME POPUP (MODAL) --- */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[450px] bg-[#161b22] border border-white/10 rounded-[2rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-black italic uppercase tracking-tight flex items-center gap-3 text-white">
                <Package className="text-blue-500" size={20}/> Yeni Ürün Tanımla
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={20}/>
              </button>
            </div>

            <div className="space-y-6">
              {/* Ürün Adı */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Ürün Adı</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-3.5 text-gray-600" size={16}/>
                  <input type="text" placeholder="Örn: Dana Bonfile..." className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-blue-500/50 transition-all text-white"/>
                </div>
              </div>

              {/* Kategori Seçimi */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Kategori</label>
                <select className="w-full bg-black/20 border border-white/5 rounded-2xl py-3.5 px-4 text-sm outline-none focus:border-blue-500/50 appearance-none text-white cursor-pointer">
                  {categories.map(cat => <option key={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              {/* Birim Seçimi */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">Birim</label>
                <div className="grid grid-cols-3 gap-3">
                  {units.map(unit => (
                    <button key={unit} className="py-3 bg-black/20 border border-white/5 rounded-xl text-[11px] font-bold uppercase hover:border-blue-500/40 hover:bg-blue-500/5 transition-all">
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] shadow-lg mt-4 transition-all active:scale-95"
              >
                Ürünü Listeye Ekle
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- ANA ARAYÜZ --- */}
      <aside className="w-[240px] border-r flex flex-col shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="p-8"><div className="font-black text-2xl italic tracking-tighter uppercase text-[#00df82]">NEXTLOGI</div></div>
        <nav className="flex-1 px-4 space-y-2">
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border bg-[#14261e] text-[#00df82] border-[#00df82]/10"><ShoppingBag size={18} /><span className="font-black italic text-xs uppercase">Ürünler & Sipariş</span></div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b flex items-center justify-between px-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="bg-[#161b22] border border-white/5 px-5 py-2 rounded-2xl flex items-center gap-4"><UserCircle className="text-blue-400" size={20}/><span className="text-[12px] font-bold opacity-80">Max Bauer GmbH</span></div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 text-gray-500" size={14}/>
              <input type="text" placeholder="Ürün ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#161b22] border border-white/10 rounded-full py-2.5 pl-10 pr-6 text-[11px] outline-none w-64 focus:border-blue-500/50"/>
            </div>
            {/* MODAL'I AÇAN MAVİ BUTON */}
            <button onClick={() => setIsModalOpen(true)} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-5 py-2.5 rounded-full font-bold text-[11px] flex items-center gap-2 transition-all shadow-lg">
              <Plus size={14} /> Ürün Ekle
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-4">
          {filteredProducts.map((p) => (
            <div key={p.id} className={`flex items-center justify-between p-4 px-8 rounded-xl border transition-all ${cart[p.id] > 0 ? 'border-[#00df82]/30 bg-[#00df82]/5' : 'border-white/[0.03] bg-[#161b22]/40'}`}>
              <span className={`text-[11px] font-bold uppercase italic ${cart[p.id] > 0 ? 'text-[#00df82]' : 'opacity-30'}`}>{p.name}</span>
              {cart[p.id] > 0 ? (
                <div className="flex items-center bg-black/20 rounded-lg border border-white/5 p-1"><button onClick={() => handleUpdate(p.id, -1)} className="px-3 text-gray-500"><Minus size={14}/></button><span className="px-4 font-black text-xl italic text-[#00df82]">{cart[p.id]}</span><button onClick={() => handleUpdate(p.id, 1)} className="px-3 text-gray-500"><Plus size={14}/></button></div>
              ) : (
                <button onClick={() => handleUpdate(p.id, 1)} className="text-gray-600 font-black text-[9px] border border-white/5 px-4 py-2 rounded-lg hover:bg-white/5">+ ÜRÜN EKLE</button>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* SAĞ PANEL */}
      <aside className="w-[360px] border-l flex flex-col shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="p-6 pb-2 flex justify-between items-center"><div className="flex items-center gap-2"><ShoppingCart size={18} className="text-gray-400"/><h2 className="text-[13px] font-black uppercase italic">Sipariş Özeti</h2></div></div>
        <div className="flex-1 overflow-y-auto px-6 mt-4">
          <div className="flex items-center gap-3 mb-4"><div className="w-2 h-2 rounded-full bg-orange-500"/><span className="text-[10px] font-black uppercase italic tracking-widest text-orange-500">RIND/BULLE</span><div className="flex-1 h-[1px] bg-white/[0.05]"/></div>
          {categories[0].products.map(p => cart[p.id] > 0 && (
            <div key={p.id} className="bg-[#161b22] rounded-xl p-4 border border-white/[0.03] flex justify-between items-start mb-2">
              <div><div className="text-[12px] font-bold text-gray-200 mb-1">{p.name}</div><div className="text-[14px] font-black text-[#00df82]">{cart[p.id]} <span className="text-[9px] text-gray-600 font-bold uppercase italic">KG</span></div></div>
              <button onClick={() => handleUpdate(p.id, -cart[p.id])} className="text-red-500/30 hover:text-red-500"><X size={16}/></button>
            </div>
          ))}
        </div>
        <div className="p-6 bg-[#0d1117] border-t border-white/[0.02]"><button className="w-full bg-[#00df82] text-black py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-lg">Siparişi Tamamla</button></div>
      </aside>
    </div>
  );
};

export default FinalApp;