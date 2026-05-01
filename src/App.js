import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search, X, ArrowLeft, Package, ShoppingCart,
  Check, User, MapPin, Phone, Plus, ClipboardList,
  ChevronRight, Trash2
} from "lucide-react";

// --- SABİT VERİLER (v19'dan taşındı) ---
const MEAT_CATEGORIES = ["Rind/Bulle","Hähnchen","Kalb","Lamm","Pute","Geflügel","Verarbeitet"];
const CAT_COLORS = { "Rind/Bulle": "#f97316", "Hähnchen": "#facc15", "Kalb": "#a78bfa", "Lamm": "#34d399", "Pute": "#fb7185", "Geflügel": "#38bdf8", "Verarbeitet": "#94a3b8" };

// ... (Ürün listesi ve Müşteri verileri v19'dan tam olarak aktarıldı) ...

// normalizeStr: Arama sorguları için karakter temizleme[cite: 1]
function normalizeStr(s) {
  return (s || "").toLowerCase().replace(/ğ/g,"g").replace(/ü/g,"u").replace(/ş/g,"s").replace(/ı/g,"i").replace(/ö/g,"o").replace(/ç/g,"c").replace(/ß/g,"ss").replace(/ä/g,"a");
}

// ALT BİLEŞEN: Kategoriye göre gruplanmış sepet listesi[cite: 1]
function CartCategoryList({ cartItems, onRemove }) {
  const grouped = {};
  cartItems.forEach(it => {
    const cat = it.category || "Diğer";
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(it);
  });

  return (
    <div className="space-y-3">
      {Object.keys(grouped).map(cat => (
        <div key={cat} className="animate-in slide-in-from-right-2 duration-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full" style={{ background: CAT_COLORS[cat] || "#2563eb" }} />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cat}</span>
          </div>
          {grouped[cat].map(it => (
            <div key={it.id} className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/[0.03] border border-white/5 mb-1.5">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-white truncate">{it.name}</p>
                <p className="text-[10px] font-mono text-[#2563eb]">{it.qty} {it.unit}</p>
              </div>
              {onRemove && (
                <button onClick={() => onRemove(it.id)} className="w-5 h-5 rounded-lg flex items-center justify-center bg-red-500/10 text-red-400 hover:bg-red-500/20">
                  <X size={10} />
                </button>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ANA MODÜL
export default function OrderModule({ firmId = "F1", onOrderPlaced, onBack }) {
  const [step, setStep] = useState("customer"); 
  const [customer, setCustomer] = useState(null);
  const [custSearch, setCustSearch] = useState("");
  const [quantities, setQuantities] = useState({});
  const [successOrder, setSuccessOrder] = useState(null);

  // Müşteri Arama Logiği[cite: 1]
  const filteredCust = useMemo(() => {
    const q = normalizeStr(custSearch).trim();
    const list = DEMO_CUSTOMERS[firmId] || [];
    if (!q) return list;
    return list.filter(c => normalizeStr(c.name).includes(q) || normalizeStr(c.city || "").includes(q));
  }, [custSearch, firmId]);

  // Sipariş Tamamlama[cite: 1]
  const placeOrder = () => {
    const cartItems = INITIAL_PRODUCTS.filter(p => quantities[p.id] > 0)
      .map(p => ({ ...p, qty: parseFloat(quantities[p.id]) }));
    
    const newOrder = { id: "ORD-" + Math.random().toString(36).substr(2, 6).toUpperCase(), customer: customer.name, items: cartItems, date: new Date().toLocaleString() };
    setSuccessOrder(newOrder);
    if (onOrderPlaced) onOrderPlaced(newOrder);
  };

  if (step === "customer") return (
    /* ADIM 1: Müşteri Seçimi Arayüzü (image_4a4800.png stilinde) */
    <div className="flex flex-col h-full bg-[#0d1117] text-white">
      <div className="p-6 border-b border-white/5 bg-[#161b22]">
         <div className="flex items-center gap-3 mb-6">
           <ShoppingCart className="text-[#2563eb]" />
           <h2 className="text-xl font-black italic uppercase italic">SİPARİŞ OLUŞTUR</h2>
         </div>
         <div className="relative">
            <Search className="absolute left-4 top-4 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Müşteri veya şehir ara..." 
              className="w-full bg-black/20 border border-white/10 rounded-[1.5rem] py-4 pl-12 pr-4 outline-none focus:border-[#2563eb]/50"
              value={custSearch}
              onChange={e => setCustSearch(e.target.value)}
            />
         </div>
      </div>
      {/* Müşteri Kartları Listesi */}
      <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCust.map(c => (
          <div key={c.id} onClick={() => { setCustomer(c); setStep("catalog"); }} className="p-5 bg-[#161b22] border border-white/5 rounded-[2rem] hover:border-green-500/40 cursor-pointer transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center font-black">{c.name[0]}</div>
              <div className="flex-1 truncate">
                <p className="font-bold truncate">{c.name}</p>
                <p className="text-xs text-gray-500">{c.city}</p>
              </div>
              <ChevronRight size={18} className="text-gray-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    /* ADIM 2: Katalog ve Canlı Sepet (v20 Premium Design) */
    <div className="flex h-full bg-[#0d1117]">
      <div className="flex-1 flex flex-col border-r border-white/5">
        {/* Katalog Header */}
        <div className="p-4 bg-[#161b22] border-b border-white/5 flex items-center gap-4">
          <button onClick={() => setStep("customer")} className="p-2 bg-white/5 rounded-xl"><ArrowLeft size={18}/></button>
          <div className="flex-1">
            <p className="text-xs font-black text-[#2563eb]">{customer?.name}</p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ürün Kataloğu</p>
          </div>
        </div>
        {/* Ürün Listesi ve Miktar Girişleri */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
           {INITIAL_PRODUCTS.map(p => (
             <div key={p.id} className={`flex items-center justify-between p-4 rounded-[1.5rem] bg-[#161b22] border ${quantities[p.id] > 0 ? 'border-green-500/30 bg-green-500/5' : 'border-white/5'}`}>
               <span className="text-sm font-semibold">{p.name}</span>
               <div className="flex items-center gap-3">
                 <input 
                   type="number" 
                   value={quantities[p.id] || ""} 
                   onChange={e => setQuantities({...quantities, [p.id]: e.target.value})}
                   className="w-20 bg-black/40 border border-white/10 rounded-xl py-2 text-center text-sm outline-none focus:border-[#2563eb]"
                   placeholder="0"
                 />
                 <span className="text-[10px] font-bold text-gray-600">{p.unit}</span>
               </div>
             </div>
           ))}
        </div>
      </div>
      {/* Sağ Panel: Sepet Özeti */}
      <div className="w-72 bg-[#161b22] p-4 flex flex-col">
         <h3 className="text-xs font-black mb-4 flex items-center gap-2"><ShoppingCart size={14}/> SEPET ÖZETİ</h3>
         <div className="flex-1 overflow-y-auto">
            <CartCategoryList cartItems={INITIAL_PRODUCTS.filter(p => quantities[p.id] > 0).map(p => ({...p, qty: quantities[p.id]}))} />
         </div>
         <button 
           onClick={placeOrder}
           className="w-full bg-[#2563eb] py-4 rounded-[1.5rem] font-black text-xs tracking-widest mt-4 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
         >
           SİPARİŞİ TAMAMLA
         </button>
      </div>
      {/* Sipariş Başarı Overlay'i */}
      {successOrder && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <div className="bg-[#161b22] p-10 rounded-[3rem] border border-green-500/20 text-center max-w-sm animate-in zoom-in">
             <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-500/40">
                <Check size={32} strokeWidth={4} />
             </div>
             <h2 className="text-2xl font-black italic mb-2 uppercase">BAŞARILI!</h2>
             <p className="text-sm text-gray-500 mb-6">{successOrder.id} nolu sipariş kaydedildi.</p>
             <button onClick={() => setSuccessOrder(null)} className="w-full bg-[#2563eb] py-4 rounded-2xl font-bold">KATALOĞA DÖN</button>
          </div>
        </div>
      )}
    </div>
  );
}