import React, { useState } from 'react';
import { Truck, Users, PieChart, ShieldCheck, ChevronRight, LogOut, Bell } from 'lucide-react';

const NextLogiDashboard = () => {
  const [activePanel, setActivePanel] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const panels = [
    { id: 'lojistik', title: 'Lojistik Operasyon', icon: <Truck size={24} />, color: 'bg-blue-600', desc: 'Sevkiyat ve mühürleme yönetimi' },
    { id: 'surucu', title: 'Sürücü Mobil App', icon: <Users size={24} />, color: 'bg-emerald-600', desc: 'Sürücü takibi ve belge kontrolü' },
    { id: 'finans', title: 'Finans Yönetimi', icon: <PieChart size={24} />, color: 'bg-purple-600', desc: 'Taahhüt ve ödeme dengesi' }
  ];

  if (!isLoggedIn) return <div>Lütfen Giriş Yapın...</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Üst Bar */}
      <nav className="border-b border-gray-800 p-4 flex justify-between items-center bg-black sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePanel('dashboard')}>
          <div className="bg-cyan-500 p-1 rounded">
            <ShieldCheck size={20} className="text-black" />
          </div>
          <span className="font-bold text-xl tracking-tight text-cyan-400">NEXTLOGI <span className="text-white">PRO</span></span>
        </div>
        <div className="flex items-center gap-4">
          <Bell size={20} className="text-gray-400 hover:text-white cursor-pointer" />
          <div className="h-8 w-8 bg-gray-800 rounded-full flex items-center justify-center text-xs font-bold border border-gray-700">KP</div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {activePanel === 'dashboard' ? (
          <>
            <header className="mb-10">
              <h1 className="text-3xl font-bold mb-2">Hoş geldin, Kaptan 🫡</h1>
              <p className="text-gray-400">Yönetmek istediğin paneli seçerek operasyona başla.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {panels.map((panel) => (
                <div 
                  key={panel.id}
                  onClick={() => setActivePanel(panel.id)}
                  className="group bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-cyan-500/50 transition-all cursor-pointer hover:transform hover:-translate-y-1"
                >
                  <div className={`${panel.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {panel.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{panel.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{panel.desc}</p>
                  <div className="flex items-center text-cyan-400 text-sm font-medium">
                    Paneli Aç <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setActivePanel('dashboard')}
              className="mb-6 text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors"
            >
              ← Ana Menüye Dön
            </button>
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-12 text-center">
              <div className="inline-flex p-4 rounded-full bg-cyan-500/10 text-cyan-400 mb-6">
                {panels.find(p => p.id === activePanel)?.icon}
              </div>
              <h2 className="text-3xl font-bold mb-4">{panels.find(p => p.id === activePanel)?.title}</h2>
              <p className="text-gray-400 mb-8">Bu panel şu an canlı veri akışına hazırlanıyor...</p>
              <div className="inline-block px-6 py-2 bg-gray-800 rounded-full text-xs font-mono text-cyan-400 uppercase tracking-widest border border-cyan-500/20">
                Sistem Aktif • Veri Bekleniyor
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NextLogiDashboard;