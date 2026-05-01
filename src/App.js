import React, { useState } from 'react';
import { 
  LayoutGrid, Users, Send, ShoppingBag, Fuel, CreditCard, 
  LogOut, Package, UserCheck, Crown, ChevronRight, Clock, CheckCircle2
} from 'lucide-react';

const FirmaSahibiPaneli = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  const stats = [
    { label: 'GÖREV', val: '4', sub: '1 teslim', icon: <Package className="text-orange-500" size={20} />, bg: 'bg-orange-500/10' },
    { label: 'AKTİF SÜRÜCÜ', val: '3', sub: '4 toplam', icon: <UserCheck className="text-blue-500" size={20} />, bg: 'bg-blue-500/10' },
    { label: 'PLAN', val: '€1290', sub: 'Pro', icon: <Crown className="text-yellow-500" size={20} />, bg: 'bg-yellow-500/10' },
    { label: 'ÜRÜN MODÜLÜ', val: 'Açık', sub: '', icon: <Package className="text-green-500" size={20} />, bg: 'bg-green-500/10' },
  ];

  const gorevler = [
    { id: 'Q-031', adres: 'Berliner Str. 42, 10115', kisi: 'Thomas Klein', durum: 'Yolda', color: 'text-blue-400', dot: 'bg-blue-400' },
    { id: 'Q-032', adres: 'Hauptstraße 8, 10178', kisi: 'Sara Hoffmann', durum: 'Teslim', color: 'text-green-400', dot: 'bg-green-400' },
    { id: 'Q-033', adres: 'Unter den Linden 5', kisi: '—', durum: 'Beklemede', color: 'text-orange-400', dot: 'bg-orange-400' },
    { id: 'Q-034', adres: 'Kurfürstendamm 22', kisi: 'Marc Weber', durum: 'Beklemede', color: 'text-orange-400', dot: 'bg-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans leading-tight">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col bg-[#0d0f12]">
        <div className="p-6">
          <div className="text-[#00df82] font-black text-xl italic tracking-tighter">NEXTLOGI</div>
          <div className="text-[10px] text-gray-600 font-bold tracking-[0.3em] mt-1 uppercase">Firma Paneli</div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { n: 'Dashboard', i: <LayoutGrid size={18}/> },
            { n: 'Sürücüler', i: <Users size={18}/> },
            { n: 'Görev Atama', i: <Send size={18}/> },
            { n: 'Müşteriler', i: <Users size={18}/> },
            { n: 'Ürünler & Sipariş', i: <ShoppingBag size={18}/> },
            { n: 'Yakıt Raporu', i: <Fuel size={18}/>, count: 1 },
            { n: 'Ödeme', i: <CreditCard size={18}/> },
          ].map((item) => (
            <div 
              key={item.n}
              onClick={() => setActiveTab(item.n)}
              className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all font-bold text-sm ${activeTab === item.n ? 'bg-[#162a22] text-[#00df82] border border-[#00df82]/10' : 'text-gray-500 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-3">{item.i} {item.n}</div>
              {item.count && <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-black">{item.count}</span>}
            </div>
          ))}
        </nav>

        <div className="p-4 space-y-3 border-t border-white/5">
          <div className="bg-[#162a22] p-3 rounded-xl border border-[#00df82]/20 flex items-center gap-3">
             <Package size={16} className="text-[#00df82]" />
             <span className="text-[10px] font-black text-[#00df82] uppercase tracking-widest">Ürün Modülü Aktif</span>
          </div>
          <div className="bg-[#1a1d23] p-4 rounded-2xl border border-white/5">
            <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Firma Sahibi</div>
            <div className="text-sm font-black text-white leading-none">Klaus Müller</div>
            <div className="text-[10px] text-gray-500 mt-1">Müller GmbH</div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 text-gray-600 hover:text-white text-[10px] font-black transition-all py-2 uppercase tracking-widest">
            <LogOut size={14} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">Müller GmbH</h1>
          <p className="text-gray-600 font-bold text-xs mt-1 uppercase tracking-widest italic">Firma Paneli</p>
        </header>

        {/* STATS GRID */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-[#121418] border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-white/10 transition-all">
              <div className={`${s.bg} w-12 h-12 rounded-2xl flex items-center justify-center mb-6`}>
                {s.icon}
              </div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{s.label}</div>
              <div className="text-4xl font-black text-white mb-1 tracking-tighter">{s.val}</div>
              <div className="text-[10px] font-bold text-green-500 italic uppercase">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* SON GÖREVLER */}
        <div className="bg-[#121418] border border-white/5 rounded-[2rem] overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Son Görevler</h3>
            <button className="text-[10px] font-black text-gray-600 hover:text-white uppercase tracking-widest transition-all">Tümünü Gör</button>
          </div>
          <div className="divide-y divide-white/5">
            {gorevler.map((g, idx) => (
              <div key={idx} className="flex items-center p-5 hover:bg-white/[0.02] transition-all group">
                <div className="w-16 text-[10px] font-black text-gray-600 uppercase tracking-widest">{g.id}</div>
                <div className="flex-1 text-sm font-bold text-gray-300">{g.adres}</div>
                <div className="w-40 text-sm font-bold text-gray-500 text-right">{g.kisi}</div>
                <div className="w-32 flex justify-end items-center gap-2 pl-4">
                  <div className={`px-3 py-1 rounded-full bg-white/5 border border-white/5 flex items-center gap-2`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${g.dot}`} />
                    <span className={`text-[10px] font-black uppercase italic ${g.color}`}>{g.durum}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default FirmaSahibiPaneli;