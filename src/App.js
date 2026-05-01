import React, { useState } from 'react';
import { 
  LayoutGrid, BarChart3, Box, AlertTriangle, Settings, LogOut, Plus, 
  Eye, X, ChevronRight
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('firma');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === 'admin' && user.password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Hatalı giriş!');
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0f1115] border border-white/5 rounded-3xl p-10 shadow-2xl text-center">
          <div className="text-[#00df82] font-black text-3xl italic tracking-tighter mb-10">NEXTLOGI</div>
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <input type="text" placeholder="Kullanıcı" className="w-full bg-[#1a1d23] border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50" onChange={(e) => setUser({...user, username: e.target.value})} />
            <input type="password" placeholder="Şifre" className="w-full bg-[#1a1d23] border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50" onChange={(e) => setUser({...user, password: e.target.value})} />
            <button className="w-full bg-[#00df82] text-black font-black py-4 rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-sm">Sistemi Başlat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans">
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 bg-[#0d0f12]">
        <div className="mb-10 text-[#00df82] font-black text-2xl italic tracking-tighter">NEXTLOGI</div>
        <nav className="flex-1 space-y-2 text-gray-500">
          <div onClick={() => setActiveTab('firma')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold ${activeTab === 'firma' ? 'bg-[#162a22] text-[#00df82] border border-[#00df82]/20' : 'hover:bg-white/5'}`}>
            <LayoutGrid size={18} /> Firma Yönetimi
          </div>
          <div onClick={() => setActiveTab('finans')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold ${activeTab === 'finans' ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>
            <BarChart3 size={18} /> Finansal Dashboard
          </div>
          <div onClick={() => setActiveTab('gecikmis')} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer font-bold ${activeTab === 'gecikmis' ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>
            <div className="flex items-center gap-3"><AlertTriangle size={18} /> Gecikmişler</div>
            <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-black">2</span>
          </div>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-2 text-gray-600 hover:text-red-400 text-xs font-black transition-all">
          <LogOut size={14} /> ÇIKIŞ YAP
        </button>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {activeTab === 'firma' ? (
          <>
            <header className="flex justify-between items-start mb-10">
              <div><h1 className="text-4xl font-black text-white mb-2">Firma Yönetimi</h1><p className="text-gray-500 text-sm">5 firma · 2 gecikmiş</p></div>
              <button onClick={() => setShowModal(true)} className="bg-[#00df82] text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,223,130,0.3)]"><Plus size={18} strokeWidth={3} /> Yeni Firma</button>
            </header>
            <div className="bg-[#121418] border border-white/5 rounded-3xl overflow-hidden shadow-2xl p-6">
               <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  <span>Firma Bilgisi</span><span>Demo / Durum</span>
               </div>
               <div className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-4 rounded-2xl transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#00df82]/10 text-[#00df82] rounded-full flex items-center justify-center font-black border border-[#00df82]/20">MÜ</div>
                    <div><div className="text-sm font-bold text-white">Müller GmbH</div><div className="text-[10px] text-gray-500">Berlin</div></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="flex gap-1"><span className="bg-[#00df82] text-black text-[10px] px-3 py-1.5 rounded-lg font-black italic shadow-lg shadow-[#00df82]/20">30 GÜN</span></div>
                    <div className="flex items-center gap-2 text-[#00df82] bg-[#00df82]/10 px-3 py-1.5 rounded-full text-[10px] font-black border border-[#00df82]/20 uppercase italic tracking-widest">● Aktif</div>
                  </div>
               </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-600 italic">
            <Settings size={48} className="mb-4 opacity-10 animate-spin-slow" />
            <p className="text-xl font-black uppercase tracking-[0.2em]">{activeTab} MODÜLÜ HAZIRLANIYOR</p>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1115] border border-white/10 w-full max-w-md rounded-3xl p-10 shadow-2xl">
            <h2 className="text-2xl font-black text-white mb-6 uppercase italic">Yeni Firma Kaydı</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Firma Adı" className="w-full bg-black border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50" />
              <button onClick={() => setShowModal(false)} className="w-full bg-[#00df82] text-black font-black py-4 rounded-xl uppercase tracking-widest mt-4">KAYDET VE KAPAT</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;