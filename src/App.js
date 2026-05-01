import React, { useState } from 'react';
import { 
  LayoutGrid, BarChart3, Box, AlertTriangle, Settings, LogOut, Plus, 
  Search, Eye, ShieldCheck, CheckCircle2, Globe, Mail
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
        <div className="max-w-md w-full bg-[#0f1115] border border-white/5 rounded-3xl p-10 shadow-2xl">
          <div className="text-center mb-10">
            <div className="text-[#00df82] font-black text-3xl italic tracking-tighter mb-2">NEXTLOGI</div>
            <div className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Süper Admin Girişi</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" placeholder="Kullanıcı" 
              className="w-full bg-[#1a1d23] border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50 transition-all"
              onChange={(e) => setUser({...user, username: e.target.value})} 
            />
            <input 
              type="password" placeholder="Şifre" 
              className="w-full bg-[#1a1d23] border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50 transition-all"
              onChange={(e) => setUser({...user, password: e.target.value})} 
            />
            <button className="w-full bg-[#00df82] text-black font-black py-4 rounded-xl hover:brightness-110 transition-all uppercase tracking-widest text-sm">Sistemi Başlat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans">
      {/* SOL SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 bg-[#0d0f12]">
        <div className="mb-10">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter leading-none">NEXTLOGI</div>
          <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">Süper Admin</div>
        </div>

        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 bg-[#162a22] text-[#00df82] p-3 rounded-xl border border-[#00df82]/20 cursor-pointer">
            <LayoutGrid size={18} /> <span className="text-sm font-bold">Firma Yönetimi</span>
          </div>
          {[
            { icon: <BarChart3 size={18} />, label: 'Finansal Dashboard' },
            { icon: <Box size={18} />, label: 'Abonelik & Modül' },
            { icon: <AlertTriangle size={18} />, label: 'Gecikmiş Ödemeler', badge: '2' },
            { icon: <Settings size={18} />, label: 'Sistem Ayarları' }
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 text-gray-500 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-all">
              <div className="flex items-center gap-3 text-sm font-bold">{item.icon} {item.label}</div>
              {item.badge && <span className="bg-red-500/20 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-black">{item.badge}</span>}
            </div>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <div className="bg-[#1a1d23] p-4 rounded-2xl mb-4">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Süper Admin</div>
            <div className="text-sm font-black italic">NEXTLOGI Admin</div>
          </div>
          <button className="flex items-center gap-2 text-gray-500 hover:text-white text-xs font-bold transition-all">
            <LogOut size={14} /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Firma Yönetimi</h1>
            <p className="text-gray-500 text-sm font-medium italic">5 firma · 2 gecikmiş</p>
          </div>
          <button className="bg-[#00df82] text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:brightness-110 transition-all">
            <Plus size={18} strokeWidth={3} /> Yeni Firma
          </button>
        </header>

        {/* UYARI MESAJI */}
        <div className="bg-red-500/5 border border-red-500/20 p-5 rounded-2xl flex items-center gap-4 mb-8 text-red-500">
          <AlertTriangle size={20} />
          <span className="text-sm font-bold italic tracking-wide">2 firmada gecikmiş ödeme — €3.560</span>
        </div>

        {/* TABLO KONTEYNERI */}
        <div className="bg-[#121418] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Firma</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Şehir</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Demo Yönetimi</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Giriş/Şifre</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Durum</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Ürün Mod.</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-6 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 text-[#00df82] rounded-full flex items-center justify-center text-[10px] font-black border border-[#00df82]/20 shadow-lg shadow-emerald-500/10">MÜ</div>
                  <div>
                    <div className="text-sm font-black text-white group-hover:text-[#00df82] transition-colors leading-none mb-1">Müller GmbH</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">#F1</div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="text-xs font-bold text-gray-400">Berlin</div>
                </td>
                <td className="p-6">
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-[10px] font-black text-[#00df82] uppercase italic">30 GÜN AKTİF</div>
                    <div className="flex gap-1">
                      <div className="bg-emerald-500 text-black text-[10px] font-black px-3 py-2 rounded-lg border border-white/10 shadow-lg shadow-emerald-500/20 italic">30 GÜN</div>
                      <div className="bg-red-500/10 text-red-500 text-[10px] font-black px-3 py-2 rounded-lg border border-red-500/30 italic">+7 GÜN</div>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                    <span>owner@mullergmbh.de</span>
                    <Eye size={12} className="text-gray-600" />
                  </div>
                  <div className="text-gray-700 mt-1">••••••••</div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-500 text-[9px] font-black px-3 py-1 rounded-full border border-emerald-500/20 w-fit uppercase italic tracking-widest">
                    <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" /> Aktif
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-6 bg-[#00df82] rounded-full relative p-1 shadow-lg shadow-emerald-500/20">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm" />
                    </div>
                    <span className="text-[10px] font-black text-gray-500 uppercase italic">Açık</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default SuperAdminDashboard;