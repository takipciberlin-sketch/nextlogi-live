import React, { useState } from 'react';
import { 
  LayoutGrid, ShoppingBag, Search, ShoppingCart, 
  ArrowLeft, Package, UserCircle, Settings,
  ChevronLeft, X, Fuel, CreditCard, Plus, Minus
} from 'lucide-react';

// --- TASARIM SİSTEMİ (Style Guide) ---
// Görseldeki (image_578a00.png) değerlerin dondurulmuş hali
const THEME = {
  colors: {
    bgMain: '#0d1117',
    bgCard: '#161b22',
    primary: '#00df82', // Neon Yeşil
    secondary: '#f97316', // Turuncu
    textMain: '#e1e1e3',
    textMuted: '#484f58',
    danger: '#ef4444'
  },
  radius: {
    base: '12px',
    large: '20px',
    full: '9999px'
  }
};

const FinalLockedUI = () => {
  const [cart, setCart] = useState({ 5: 7 }); // Görseldeki gibi 7 adet Bullen-Bug

  const handleUpdate = (id, delta) => {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: THEME.colors.bgMain, color: THEME.colors.textMain }}>
      
      {/* SOL SIDEBAR: SABİT GENİŞLİK */}
      <aside className="w-[240px] border-r flex flex-col shrink-0" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="p-8">
          <div className="font-black text-2xl italic tracking-tighter uppercase" style={{ color: THEME.colors.primary }}>NEXTLOGI</div>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          {['Dashboard', 'Sürücüler', 'Görev Atama', 'Müşteriler'].map((item) => (
            <div key={item} className="flex items-center gap-4 px-4 py-3 font-bold text-[11px] transition-all cursor-pointer opacity-50 hover:opacity-100 group">
              <LayoutGrid size={16} className="group-hover:text-[#00df82]" /> {item}
            </div>
          ))}
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border" style={{ backgroundColor: 'rgba(0,223,130,0.05)', color: THEME.colors.primary, borderColor: 'rgba(0,223,130,0.1)' }}>
            <ShoppingBag size={18} /> <span className="font-black italic text-xs uppercase">Ürünler & Sipariş</span>
          </div>
        </nav>
      </aside>

      {/* MERKEZ PANEL: LİSTE ALANI */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-20 border-b flex items-center justify-between px-8" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
          <div className="bg-[#161b22] border border-white/[0.05] px-5 py-2 rounded-2xl flex items-center gap-4">
            <UserCircle className="text-blue-400" size={20}/>
            <span className="text-[12px] font-bold opacity-80">Max Bauer GmbH</span>
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 text-gray-600" size={14}/>
            <input type="text" placeholder="Ürün ara..." className="bg-[#161b22] border border-white/5 rounded-xl py-2 pl-10 pr-4 text-[11px] outline-none w-56 focus:border-[#00df82]/30 transition-all"/>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-2 custom-scrollbar">
          {/* Ürün satırı örneği - Bullen Bug (image_577ebd.jpg'deki gibi aktif) */}
          <div className="flex items-center justify-between p-4 px-8 rounded-xl border border-[#00df82]/20" style={{ backgroundColor: 'rgba(0,223,130,0.02)' }}>
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#00df82]" style={{ backgroundColor: THEME.colors.primary }}/>
              <span className="text-[11px] font-bold uppercase italic" style={{ color: THEME.colors.primary }}>BULLEN-BUG</span>
            </div>
            <div className="flex items-center bg-black/20 rounded-lg border border-white/5 p-1 h-10">
              <button onClick={() => handleUpdate(5, -1)} className="px-3 text-gray-500 hover:text-white"><Minus size={14}/></button>
              <span className="px-4 font-black text-xl italic" style={{ color: THEME.colors.primary }}>{cart[5] || 0}</span>
              <button onClick={() => handleUpdate(5, 1)} className="px-3 text-gray-500 hover:text-white"><Plus size={14}/></button>
            </div>
          </div>
          {/* Diğer ürünler pasif ve "Ürün Ekle" modunda */}
          {["Bullen-Keule", "Rinder-Nacken"].map((n, i) => (
             <div key={i} className="flex items-center justify-between p-4 px-8 rounded-xl border border-white/[0.02] bg-[#161b22]/40">
                <span className="text-[11px] font-bold uppercase opacity-30">{n}</span>
                <button className="text-gray-600 font-black text-[9px] border border-white/5 px-4 py-2 rounded-lg hover:bg-white/5">+ ÜRÜN EKLE</button>
             </div>
          ))}
        </div>
      </main>

      {/* SAĞ PANEL: SİPARİŞ ÖZETİ (image_578a00.png'ye göre mühürlendi) */}
      <aside className="w-[360px] border-l flex flex-col shrink-0" style={{ backgroundColor: THEME.colors.bgMain, borderColor: 'rgba(255,255,255,0.05)' }}>
        
        {/* Header */}
        <div className="p-6 pb-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} className="text-gray-400"/>
            <h2 className="text-[13px] font-black uppercase italic tracking-tight">Sipariş Özeti</h2>
          </div>
          <span className="text-[10px] font-bold px-3 py-1 rounded-full border" style={{ color: THEME.colors.primary, backgroundColor: 'rgba(0,223,130,0.05)', borderColor: 'rgba(0,223,130,0.1)' }}>1 kalem</span>
        </div>
        <div className="px-6 flex items-center gap-2 text-gray-600 mb-6">
          <UserCircle size={14}/>
          <span className="text-[11px] font-medium">Max Bauer GmbH</span>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-6 custom-scrollbar">
          {/* Kategori ve Ürün Kartı */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full shadow-[0_0_5px_rgba(249,115,22,0.5)]" style={{ backgroundColor: THEME.colors.secondary }}/>
              <span className="text-[10px] font-black uppercase italic tracking-widest" style={{ color: THEME.colors.secondary }}>RIND/BULLE</span>
              <div className="flex-1 h-[1px] bg-white/[0.05]"/>
              <span className="text-[10px] font-bold text-gray-600">4.0 kg</span>
            </div>

            <div className="bg-[#161b22] rounded-xl p-4 border border-white/[0.03] flex justify-between items-start shadow-xl">
              <div className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: THEME.colors.secondary }}/>
                <div>
                  <div className="text-[12px] font-bold text-gray-200 mb-1">Bullen-Bug</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-[14px] font-black" style={{ color: THEME.colors.primary }}>{cart[5]}</span>
                    <span className="text-[10px] font-bold text-gray-600 uppercase italic">kg</span>
                  </div>
                </div>
              </div>
              <button onClick={() => handleUpdate(5, -cart[5])} className="p-1.5 bg-red-500/5 rounded-lg text-red-500/30 hover:text-red-500 transition-colors">
                <X size={16}/>
              </button>
            </div>
          </div>

          {/* Not Alanı */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-black uppercase italic tracking-widest">
              📝 Teslimat Notu
            </div>
            <textarea 
              placeholder="Özel not..." 
              className="w-full bg-[#161b22]/50 border border-white/[0.05] rounded-xl p-4 text-[11px] min-h-[100px] outline-none text-gray-300 placeholder:text-gray-700 resize-none focus:border-white/10 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Toplam ve Buton: En alta yapışık */}
        <div className="p-6 space-y-4 bg-[#0d1117] border-t border-white/[0.02]">
          <div className="bg-[#161b22]/30 border p-5 rounded-2xl" style={{ borderColor: 'rgba(0,223,130,0.15)' }}>
            <div className="text-[9px] text-gray-600 font-bold uppercase mb-1 tracking-widest">Toplam</div>
            <div className="text-[18px] font-black italic" style={{ color: THEME.colors.primary }}>1 ürün • {cart[5]}.0 kg</div>
          </div>
          
          <button className="w-full py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] transition-all shadow-lg hover:brightness-110 active:scale-[0.98]" 
            style={{ backgroundColor: THEME.colors.primary, color: THEME.colors.bgMain }}>
            Siparişi Tamamla
          </button>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1a1d23; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default FinalLockedUI;