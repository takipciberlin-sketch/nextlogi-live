import React, { useState, useMemo } from "react";
import {
  Search, X, ArrowLeft, ShoppingCart,
  Check, ChevronRight, Trash2, Package
} from "lucide-react";

// ==========================================
// 1. DATA (v19'dan Tam Liste)
// ==========================================
const MEAT_CATEGORIES = ["Rind/Bulle", "Hähnchen", "Kalb", "Lamm", "Pute", "Geflügel", "Verarbeitet"];

const CAT_COLORS = {
  "Rind/Bulle": "#f97316",
  "Hähnchen": "#facc15",
  "Kalb": "#a78bfa",
  "Lamm": "#34d399",
  "Pute": "#fb7185",
  "Geflügel": "#38bdf8",
  "Verarbeitet": "#94a3b8"
};

const INITIAL_PRODUCTS = [
  { id: 1, name: "Kalb Döner 10kg", category: "Kalb", unit: "Spieß" },
  { id: 2, name: "Hähnchen Döner 5kg", category: "Hähnchen", unit: "Spieß" },
  { id: 3, name: "Rinderhackfleisch", category: "Rind/Bulle", unit: "Kg" },
  { id: 4, name: "Lammkotelett", category: "Lamm", unit: "Kg" },
  { id: 5, name: "Putenbrust", category: "Pute", unit: "Kg" },
  { id: 6, name: "Chicken Nuggets", category: "Geflügel", unit: "Koli" },
  { id: 7, name: "Sucuk (Kangal)", category: "Verarbeitet", unit: "Kg" },
];

const DEMO_CUSTOMERS = {
  "F1": [
    { id: "C1", name: "Berlin Grillhaus", city: "Berlin", phone: "+49 30 123456" },
    { id: "C2", name: "Döner Point", city: "Hamburg", phone: "+49 40 654321" },
    { id: "C3", name: "Antalya Imbiss", city: "Berlin", phone: "+49 30 998877" },
    { id: "C4", name: "Efendi Restaurant", city: "München", phone: "+49 89 112233" }
  ]
};

// ==========================================
// 2. HELPER FUNCTIONS
// ==========================================
function normalizeStr(s) {
  return (s || "").toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/ß/g, "ss").replace(/ä/g, "a");
}

// ==========================================
// 3. COMPONENTS
// ==========================================

// Kategoriye Göre Gruplanmış Sepet Listesi
const CartCategoryList = ({ cartItems, onRemove }) => {
  const grouped = {};
  cartItems.forEach(it => {
    const cat = it.category || "Diğer";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(it);
  });

  return (
    <div className="space-y-4">
      {Object.keys(grouped).map(cat => (
        <div key={cat} className="animate-in slide-in-from-right-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-4 rounded-full" style={{ background: CAT_COLORS[cat] || "#2563eb" }} />
            <span className="text-[10px] font-black uppercase tracking-tighter text-gray-400">{cat}</span>
          </div>
          {grouped[cat].map(it => (
            <div key={it.id} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/5 mb-1">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-white truncate">{it.name}</p>
                <p className="text-[10px] font-mono text-blue-400">{it.qty} {it.unit}</p>
              </div>
              <button onClick={() => onRemove(it.id)} className="text-gray-600 hover:text-red-400 p-1">
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

// ANA MODÜL
export default function OrderModuleV20({ firmId = "F1", onOrderPlaced }) {
  const [step, setStep] = useState("customer"); 
  const [customer, setCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [success, setSuccess] = useState(null);

  // Filtreleme Logiği
  const filteredItems = useMemo(() => {
    const q = normalizeStr(search);
    if (step === "customer") {
      return (DEMO_CUSTOMERS[firmId] || []).filter(c => 
        normalizeStr(c.name).includes(q) || normalizeStr(c.city).includes(q)
      );
    }
    return INITIAL_PRODUCTS.filter(p => normalizeStr(p.name).includes(q));
  }, [search, step, firmId]);

  const activeCart = INITIAL_PRODUCTS.filter(p => quantities[p.id] > 0)
    .map(p => ({ ...p, qty: quantities[p.id] }));

  const totalQty = activeCart.reduce((sum, item) => sum + parseFloat(item.qty || 0), 0);

  const handlePlaceOrder = () => {
    if (activeCart.length === 0) return alert("Sepet boş!");
    const orderData = {
      id: "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      customer: customer.name,
      items: activeCart,
      total: totalQty,
      timestamp: new Date().toISOString()
    };
    setSuccess(orderData);
  };

  // --- RENDERS ---

  // 1. ADIM: MÜŞTERİ SEÇİMİ
  if (step === "customer") {
    return (
      <div className="flex flex-col h-screen bg-[#0d1117] text-gray-200 font-sans">
        <div className="p-6 border-b border-white/5 bg-[#161b22]">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-black italic tracking-tighter text-white uppercase">NEXTLOGI <span className="text-blue-500">v20</span></h1>
            <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-[10px] font-bold">YENİ SİPARİŞ</div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-blue-500/50 transition-all placeholder:text-gray-600"
              placeholder="Müşteri adı veya şehir yazın..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredItems.map(c => (
            <div 
              key={c.id} 
              onClick={() => { setCustomer(c); setStep("catalog"); setSearch(""); }}
              className="group p-4 bg-[#161b22] border border-white/5 rounded-[1.5rem] hover:border-blue-500/40 cursor-pointer transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-black">{c.name[0]}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-white truncate">{c.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1"><MapPin size={10}/> {c.city}</p>
                </div>
                <ChevronRight size={16} className="text-gray-700 group-hover:text-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. ADIM: KATALOG VE SEPET
  return (
    <div className="flex h-screen bg-[#0d1117] text-gray-200 overflow-hidden">
      {/* Sol: Ürün Listesi */}
      <div className="flex-1 flex flex-col border-r border-white/5">
        <div className="p-4 bg-[#161b22] border-b border-white/5 flex items-center gap-4">
          <button onClick={() => setStep("customer")} className="p-2 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-black text-white leading-none uppercase">{customer?.name}</h2>
            <p className="text-[10px] text-gray-500 mt-1 tracking-widest uppercase font-bold">Katalog / {customer?.city}</p>
          </div>
          <div className="ml-auto relative w-48">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={14} />
             <input 
               className="w-full bg-black/30 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-500/30"
               placeholder="Ürün ara..."
               value={search}
               onChange={(e) => setSearch(e.target.value)}
             />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {filteredItems.map(p => (
            <div key={p.id} className={`flex items-center justify-between p-4 rounded-2xl transition-all border ${quantities[p.id] > 0 ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#161b22] border-white/5'}`}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full" style={{ background: CAT_COLORS[p.category] }} />
                <span className="text-sm font-semibold">{p.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  value={quantities[p.id] || ""} 
                  onChange={(e) => setQuantities({...quantities, [p.id]: e.target.value})}
                  className="w-16 bg-black/40 border border-white/10 rounded-lg py-2 text-center text-sm font-bold text-blue-400 outline-none focus:border-blue-500"
                  placeholder="0"
                />
                <span className="text-[10px] font-black text-gray-600 w-8">{p.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sağ: Sepet Özeti */}
      <div className="w-80 bg-[#0d1117] p-6 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-blue-500" size={20} />
            <h3 className="font-black text-xs uppercase tracking-tighter">SİPARİŞ ÖZETİ</h3>
          </div>
          <div className="bg-blue-500 text-white text-[10px] font-black px-2 py-1 rounded-md">{activeCart.length} ÜRÜN</div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {activeCart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-20 italic">
              <Package size={48} className="mb-2" />
              <p className="text-xs">Henüz ürün seçilmedi</p>
            </div>
          ) : (
            <CartCategoryList 
              cartItems={activeCart} 
              onRemove={(id) => {
                const newQtys = {...quantities};
                delete newQtys[id];
                setQuantities(newQtys);
              }} 
            />
          )}
        </div>

        <div className="mt-6 pt-6 border-t border-white/5 space-y-4">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-gray-500 uppercase">Toplam Miktar</span>
              <span className="text-2xl font-black text-white italic">{totalQty} <span className="text-[10px] text-blue-500 not-italic uppercase">Birim</span></span>
           </div>
           <button 
             onClick={handlePlaceOrder}
             disabled={activeCart.length === 0}
             className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 py-4 rounded-2xl font-black text-xs tracking-[0.2em] transition-all shadow-lg shadow-blue-900/20"
           >
             SİPARİŞİ ONAYLA
           </button>
        </div>
      </div>

      {/* BAŞARI EKRANI (Overlay) */}
      {success && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-6">
          <div className="bg-[#161b22] border border-green-500/30 p-10 rounded-[3rem] text-center max-w-sm w-full animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,197,94,0.4)]">
              <Check size={40} className="text-white" strokeWidth={4} />
            </div>
            <h2 className="text-3xl font-black italic text-white mb-2 uppercase tracking-tighter">MÜKEMMEL!</h2>
            <p className="text-gray-400 text-sm mb-8">Sipariş başarıyla sisteme aktarıldı.<br/><span className="text-blue-400 font-mono mt-2 block">Kod: {success.id}</span></p>
            <button 
              onClick={() => { setSuccess(null); setQuantities({}); setStep("customer"); }}
              className="w-full bg-white text-black py-4 rounded-2xl font-black text-xs tracking-widest hover:bg-gray-200 transition-colors"
            >
              YENİ SİPARİŞ OLUŞTUR
            </button>
          </div>
        </div>
      )}
    </div>
  );
}