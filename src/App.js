import React, { useState } from 'react';
import { 
  LayoutGrid, Users, Send, ShoppingBag, Fuel, CreditCard, 
  LogOut, Package, UserCheck, Crown, ChevronRight, X, 
  Search, Filter, MoreVertical, CheckCircle2, Calendar, MapPin, Mail, Lock
} from 'lucide-react';

const NextLogiProApp = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // Veri Setleri
  const [suruculer] = useState([
    { id: 1, isim: 'Thomas Klein', arac: 'Mercedes Sprinter', durum: 'Aktif', gorev: 'Q-031' },
    { id: 2, isim: 'Sara Hoffmann', arac: 'VW Crafter', durum: 'Mola', gorev: 'Q-032' },
    { id: 3, isim: 'Marc Weber', arac: 'Iveco Daily', durum: 'Aktif', gorev: 'Q-034' },
  ]);

  const gorevler = [
    { id: 'Q-031', adres: 'Berliner Str. 42, 10115', kisi: 'Thomas Klein', durum: 'Yolda', color: 'text-blue-400', dot: 'bg-blue-400' },
    { id: 'Q-032', adres: 'Hauptstraße 8, 10178', kisi: 'Sara Hoffmann', durum: 'Teslim', color: 'text-green-400', dot: 'bg-green-400' },
    { id: 'Q-033', adres: 'Unter den Linden 5', kisi: '—', durum: 'Beklemede', color: 'text-orange-400', dot: 'bg-orange-400' },
    { id: 'Q-034', adres: 'Kurfürstendamm 22', kisi: 'Marc Weber', durum: 'Beklemede', color: 'text-orange-400', dot: 'bg-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans leading-tight overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-[#0d0f12] shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter">NEXTLOGI</div>
          <div className="text-[10px] text-gray-600 font-bold tracking-[0.4em] mt-1 uppercase">Firma Paneli</div>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {/* Dashboard & Standart Menüler */}
          {[
            { n: 'Dashboard', i: <LayoutGrid size={20}/> },
            { n: 'Sürücüler', i: <Users size={20}/> },
            { n: 'Görev Atama', i: <Send size={20}/> },
            { n: 'Müşteriler', i: <Users size={20}/> },
          ].map((item) => (
            <div 
              key={item.n}
              onClick={() => setActiveTab(item.n)}
              className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all font-bold text-sm ${activeTab === item.n ? 'bg-[#162a22] text-[#00df82]' : 'text-gray-500 hover:bg-white/5'}`}
            >
              {item.i} {item.n}
            </div>
          ))}

          {/* image_58d764.png REFERANSLI ÖZEL BUTON */}
          <div 
            onClick={() => setActiveTab('Ürünler & Sipariş')}
            className={`mt-4 p-5 rounded-[1.5rem] flex items-center gap-4 cursor-pointer transition-all border ${activeTab === 'Ürünler & Sipariş' ? 'bg-[#11241a] border-[#00df82]/30' : 'bg-transparent border-transparent hover:bg-white/5'}`}
          >
            <div className="text-[#00df82]">
              <ShoppingBag size={26} strokeWidth={2.5} />
            </div>
            <span className="text-[#00df82] font-black text-lg tracking-tight">Ürünler & Sipariş</span>
          </div>

          {/* Diğer Menüler */}
          {[
            { n: 'Yakıt Raporu', i: <Fuel size={20}/>, count: 1 },
            { n: 'Ödeme', i: <CreditCard size={20}/> },
          ].map((item) => (
            <div 
              key={item.n}
              onClick={() => setActiveTab(item.n)}
              className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all font-bold text-sm ${activeTab === item.n ? 'bg-[#162a22] text-[#00df82]' : 'text-gray-500 hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-4">{item.i} {item.n}</div>
              {item.count && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black shadow-[0_0_10px_rgba(239,68,68,0.5)]">{item.count}</span>}
            </div>
          ))}
        </nav>

        {/* ALT PROFİL ALANI (image_59485d.png) */}
        <div className="p-6 space-y-4 border-t border-white/5">
          <div className="bg-[#1a1d23] p-5 rounded-[2rem] border border-white/5 shadow-xl">
            <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-1">Firma Sahibi</div>
            <div className="text-lg font-black text-white italic tracking-tighter">Klaus Müller</div>
            <div className="text-[11px] text-gray-500 font-bold mt-1 uppercase">Müller GmbH</div>
          </div>
          <button className="w-full flex items-center justify-center gap-3 text-gray-600 hover:text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all">
            <LogOut size={16} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-12 bg-[#0a0b0d]">
        
        {/* HEADER */}
        <header className="mb-12">
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">Müller GmbH</h1>
          <p className="text-gray-600 font-bold text-[11px] mt-3 uppercase tracking-[0.3em] italic">Firma Kontrol Merkezi / {activeTab}</p>
        </header>

        {activeTab === 'Dashboard' && (
          <div className="animate-in fade-in duration-700">
            {/* STATS (image_59485d.png) */}
            <div className="grid grid-cols-4 gap-6 mb-10">
              {[
                { l: 'GÖREV', v: '4', s: '1 teslim', i: <Package className="text-orange-500" />, b: 'bg-orange-500/10' },
                { l: 'AKTİF SÜRÜCÜ', v: '3', s: '4 toplam', i: <UserCheck className="text-blue-500" />, b: 'bg-blue-500/10' },
                { l: 'PLAN', v: '€1290', s: 'Pro Plan', i: <Crown className="text-yellow-500" />, b: 'bg-yellow-500/10' },
                { l: 'ÜRÜN MODÜLÜ', v: 'Açık', s: 'Aktif Modül', i: <Package className="text-green-500" />, b: 'bg-green-500/10' },
              ].map((s, idx) => (
                <div key={idx} className="bg-[#121418] border border-white/5 p-8 rounded-[2.5rem] hover:border-white/10 transition-all">
                  <div className={`${s.b} w-14 h-14 rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>{s.i}</div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{s.l}</div>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter italic">{s.v}</div>
                  <div className="text-[11px] font-bold text-[#00df82] uppercase italic">{s.s}</div>
                </div>
              ))}
            </div>

            {/* SON GÖREVLER TABLOSU */}
            <div className="bg-[#121418] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Son Operasyonel Hareketler</h3>
                <span className="text-[10px] font-black text-[#00df82] cursor-pointer hover:underline">Tümünü İndir</span>
              </div>
              <div className="divide-y divide-white/5">
                {gorevler.map((g, idx) => (
                  <div key={idx} className="flex items-center p-6 hover:bg-white/[0.02] transition-all group cursor-pointer">
                    <div className="w-20 text-[11px] font-black text-gray-600 uppercase tracking-widest">{g.id}</div>
                    <div className="flex-1 text-base font-bold text-gray-300 italic">{g.adres}</div>
                    <div className="w-48 text-sm font-bold text-gray-500 text-right">{g.kisi}</div>
                    <div className="w-40 flex justify-end items-center gap-3 pl-6">
                      <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/5 flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${g.dot} shadow-[0_0_10px_currentColor]`} />
                        <span className={`text-[11px] font-black uppercase italic ${g.color}`}>{g.durum}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ÜRÜNLER & SİPARİŞ PANELİ (image_58d764.png İÇERİĞİ) */}
        {activeTab === 'Ürünler & Sipariş' && (
          <div className="grid grid-cols-12 gap-8 animate-in slide-in-from-bottom-8 duration-500">
             <div className="col-span-12 bg-gradient-to-r from-[#11241a] to-[#0a0b0d] p-10 rounded-[3rem] border border-[#00df82]/10 relative overflow-hidden">
                <ShoppingBag size={120} className="absolute -right-10 -bottom-10 text-[#00df82]/5 rotate-12" />
                <div className="relative z-10">
                  <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-4">Ürün Yönetim Sistemi</h2>
                  <p className="text-gray-400 font-medium max-w-xl text-lg">Deponuzdaki tüm ambalaj, palet ve lojistik ürünlerini buradan yönetebilir, yeni siparişler oluşturabilirsiniz.</p>
                  <button className="mt-8 bg-[#00df82] text-black px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all">Stok Girişi Yap</button>
                </div>
             </div>
          </div>
        )}

        {/* Diğer Tablar İçin Yer Tutucu */}
        {activeTab !== 'Dashboard' && activeTab !== 'Ürünler & Sipariş' && (
          <div className="h-96 border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center text-gray-800 italic">
            <LayoutGrid size={64} className="mb-6 opacity-10" />
            <div className="text-2xl font-black uppercase tracking-[0.4em] opacity-10">{activeTab} Hazırlanıyor</div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NextLogiProApp;