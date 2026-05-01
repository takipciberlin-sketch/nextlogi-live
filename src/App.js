import React, { useState } from 'react';
import { Truck, Users, PieChart, ShieldCheck, ChevronRight, Bell, ShoppingCart, PackagePlus, Search } from 'lucide-react';

// Tailwind CSS'i doğrudan CDN üzerinden bağlayarak görsel hatayı çözüyoruz
const TailwindLink = () => (
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
);

const NextLogiProApp = () => {
  const [activePanel, setActivePanel] = useState('dashboard');

  const panels = [
    { id: 'lojistik', title: 'Lojistik Operasyon', icon: <Truck size={24} />, color: 'bg-blue-600', desc: 'Sevkiyat ve mühürleme yönetimi' },
    { id: 'surucu', title: 'Sürücü Mobil App', icon: <Users size={24} />, color: 'bg-emerald-600', desc: 'Sürücü takibi ve belge kontrolü' },
    { id: 'finans', title: 'Finans Yönetimi', icon: <PieChart size={24} />, color: 'bg-purple-600', desc: 'Taahhüt ve ödeme dengesi' },
    { id: 'musteri', title: 'Müşteri Sipariş Portalı', icon: <ShoppingCart size={24} />, color: 'bg-orange-600', desc: 'Müşteri sepeti ve sipariş girişi' }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans antialiased">
      <TailwindLink />
      
      {/* Üst Navigasyon */}
      <nav className="border-b border-gray-800 p-4 flex justify-between items-center bg-black sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePanel('dashboard')}>
          <div className="bg-cyan-500 p-1 rounded">
            <ShieldCheck size={20} className="text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight text-cyan-400">NEXTLOGI <span className="text-white">PRO</span></span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex bg-gray-900 border border-gray-800 rounded-lg px-3 py-1 items-center gap-2">
            <Search size={14} className="text-gray-500" />
            <input type="text" placeholder="Hızlı Ara..." className="bg-transparent border-none text-xs focus:outline-none" />
          </div>
          <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold border border-gray-700">KP</div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {activePanel === 'dashboard' ? (
          <>
            <header className="mb-10 animate-in fade-in duration-700">
              <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Hoş geldin, Kaptan 🫡</h1>
              <p className="text-gray-400 text-lg">Tüm ekosistemi tek merkezden yönetin.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {panels.map((panel) => (
                <div 
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  className="group bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-[0_0_20px_rgba(6,182,212,0.1)] active:scale-95"
                >
                  <div className={`${panel.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    {panel.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">{panel.title}</h3>
                  <p className="text-sm text-gray-500 mb-4 h-10">{panel.desc}</p>
                  <div className="flex items-center text-cyan-400 text-sm font-medium border-t border-gray-800 pt-4">
                    Paneli Aç <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* İstatistik Özeti (Görselliği Tamamlar) */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-gray-800 pt-8">
               <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-bold">Aktif Sevkiyat</p>
                  <p className="text-2xl font-mono text-blue-400">12</p>
               </div>
               <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-bold">Bekleyen Sipariş</p>
                  <p className="text-2xl font-mono text-orange-400">08</p>
               </div>
               <div className="bg-gray-900/50 p-4 rounded-xl border border-gray-800">
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1 font-bold">Günlük Ciro</p>
                  <p className="text-2xl font-mono text-emerald-400">€ 4,250</p>
               </div>
            </div>
          </>
        ) : (
          <div className="animate-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setActivePanel('dashboard')}
              className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors group"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span> Ana Menüye Dön
            </button>
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center shadow-2xl">
              <div className={`inline-flex p-5 rounded-2xl ${panels.find(p => p.id === activePanel)?.color} text-white mb-6 shadow-xl`}>
                {panels.find(p => p.id === activePanel)?.icon}
              </div>
              <h2 className="text-3xl font-bold mb-4">{panels.find(p => p.id === activePanel)?.title}</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">Bu modül şu an canlı veri akışına ve mühürleme işlemlerine hazırlanıyor...</p>
              
              {activePanel === 'musteri' && (
                <div className="mb-8 p-4 bg-black/40 rounded-xl border border-orange-500/20 max-w-sm mx-auto">
                   <p className="text-orange-400 text-sm font-bold flex items-center justify-center gap-2">
                     <PackagePlus size={18} /> Müşteri Girişi Simüle Ediliyor
                   </p>
                </div>
              )}

              <div className="inline-block px-8 py-3 bg-gray-800 rounded-full text-xs font-mono text-cyan-400 uppercase tracking-[0.2em] border border-cyan-500/20">
                Sistem Aktif • Veri Senkronize Ediliyor
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextLogiProApp;