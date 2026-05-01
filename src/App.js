import React, { useState } from 'react';
import { 
  ShoppingBag, Search, Plus, Minus, ShoppingCart, 
  Trash2, ArrowRight, CheckCircle2, Package
} from 'lucide-react';

const OrderSystem = () => {
  const [isOrderMode, setIsOrderMode] = useState(false);
  const [cart, setCart] = useState({});

  const urunler = [
    { id: 1, n: "BULLEN-VORDERVIERTEL OHNE KNOCHEN", k: "Rind/Bulle" },
    { id: 2, n: "BULLEN-KEULE MIT KNOCHEN", k: "Rind/Bulle" },
    { id: 3, n: "RINDER-NACKEN", k: "Rind/Bulle" },
    { id: 4, n: "BULLEN-KAMM OHNE KNOCHEN", k: "Rind/Bulle" }
  ];

  const updateCart = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const cartItems = urunler.filter(u => cart[u.id] > 0);
  const totalItems = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="flex h-screen bg-[#0a0b0d] text-[#e1e1e3] font-sans">
      <main className="flex-1 overflow-y-auto p-10 space-y-8">
        {/* HEADER AREA */}
        <div className="flex justify-between items-center bg-[#121418] p-8 rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="flex items-center gap-6">
             <div className="bg-[#00df82]/10 p-4 rounded-2xl border border-[#00df82]/20">
                <ShoppingBag className="text-[#00df82]" size={32} />
             </div>
             <div>
                <h1 className="text-3xl font-black italic uppercase tracking-tighter">Sipariş Merkezi</h1>
                <p className="text-[10px] text-gray-500 font-bold tracking-widest mt-1 uppercase">
                   {isOrderMode ? 'Sipariş Oluşturuluyor' : 'Ürün Envanteri'} • {urunler.length} Kalem
                </p>
             </div>
          </div>

          <button 
            onClick={() => setIsOrderMode(!isOrderMode)}
            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center gap-3 ${isOrderMode ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-[#162a22] text-[#00df82] border border-[#00df82]/20 shadow-lg shadow-[#00df82]/5'}`}
          >
            <ShoppingCart size={18} />
            {isOrderMode ? 'Siparişi İptal Et' : 'Sipariş Moduna Geç'}
          </button>
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 gap-3">
          {urunler.map((u) => (
            <div key={u.id} className="group flex items-center justify-between p-6 bg-[#121418]/50 rounded-[2rem] border border-white/5 hover:border-[#00df82]/20 transition-all">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                   <Package className="text-gray-600 group-hover:text-[#00df82]" size={20} />
                </div>
                <div>
                  <span className="text-base font-black text-gray-200 uppercase tracking-tight italic">{u.n}</span>
                  <div className="text-[9px] text-gray-600 font-black tracking-widest mt-1">KAT: {u.k}</div>
                </div>
              </div>

              {isOrderMode ? (
                <div className="flex items-center gap-4 bg-black/40 p-2 rounded-2xl border border-white/5">
                  <button onClick={() => updateCart(u.id, -1)} className="p-2 hover:text-red-500 transition-colors"><Minus size={16}/></button>
                  <span className="w-12 text-center font-black text-lg text-[#00df82] italic">{cart[u.id] || 0}</span>
                  <button onClick={() => updateCart(u.id, 1)} className="p-2 hover:text-[#00df82] transition-colors"><Plus size={16}/></button>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <CheckCircle2 size={14} className="text-green-500" />
                  <span className="text-[10px] font-black text-green-500 uppercase italic">Stokta Var</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* SHOPPING CART SIDEBAR (Sadece Sipariş Modunda Görünür) */}
      {isOrderMode && (
        <aside className="w-96 bg-[#0d0f12] border-l border-white/5 p-8 flex flex-col animate-in slide-in-from-right duration-500">
          <h2 className="text-xl font-black italic uppercase tracking-tighter mb-8 flex items-center gap-3">
             <ShoppingCart className="text-[#00df82]" /> Sipariş Özeti
          </h2>
          
          <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2rem] text-gray-700 italic font-bold">
                 Sepetiniz Boş
              </div>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex justify-between items-center">
                  <div>
                    <div className="text-[11px] font-black uppercase text-gray-300 truncate w-40 italic">{item.n}</div>
                    <div className="text-[10px] text-[#00df82] font-bold">{cart[item.id]} Adet</div>
                  </div>
                  <button onClick={() => updateCart(item.id, -cart[item.id])} className="text-gray-600 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-gray-500 font-black text-[10px] uppercase">Toplam Ürün</span>
              <span className="text-3xl font-black italic text-white">{totalItems}</span>
            </div>
            <button className="w-full bg-[#00df82] text-black py-5 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#00df82]/10">
               Siparişi Tamamla <ArrowRight size={18} />
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default OrderSystem;