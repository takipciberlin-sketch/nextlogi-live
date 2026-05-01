import React, { useState } from 'react';
import { 
  LayoutGrid, BarChart3, Box, AlertTriangle, Settings, LogOut, Plus, 
  X, Mail, MapPin, Calendar, Building2
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('firma');
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState({ username: '', password: '' });

  // Firma Listesi State'i
  const [firmalar, setFirmalar] = useState([
    { id: 1, ad: 'Müller GmbH', sehir: 'Berlin', email: 'owner@mullergmbh.de', demo: 30, durum: 'Aktif' }
  ]);

  // Yeni Firma State'i
  const [yeniFirma, setYeniFirma] = useState({ ad: '', sehir: '', email: '', demo: 30 });

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === 'admin' && user.password === '1234') setIsLoggedIn(true);
    else alert('Hatalı giriş!');
  };

  const firmaEkle = (e) => {
    e.preventDefault();
    const eklenecek = { ...yeniFirma, id: Date.now(), durum: 'Aktif' };
    setFirmalar([eklenecek, ...firmalar]);
    setShowModal(false);
    setYeniFirma({ ad: '', sehir: '', email: '', demo: 30 });
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0f1115] border border-white/5 rounded-3xl p-10 shadow-2xl">
          <div className="text-[#00df82] font-black text-3xl italic tracking-tighter mb-10 text-center text-white uppercase">NEXTLOGI <span className="text-[#00df82]">PRO</span></div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="text" placeholder="Kullanıcı" className="w-full bg-[#1a1d23] border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50 transition-all" onChange={(e) => setUser({...user, username: e.target.value})} />
            <input type="password" placeholder="Şifre" className="w-full bg-[#1a1d23] border border-white/5 rounded-xl p-4 text-white outline-none focus:border-[#00df82]/50 transition-all" onChange={(e) => setUser({...user, password: e.target.value})} />
            <button className="w-full bg-[#00df82] text-black font-black py-4 rounded-xl hover:brightness-110 uppercase text-sm tracking-widest shadow-lg shadow-[#00df82]/10">Sistemi Başlat</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 bg-[#0d0f12]">
        <div className="mb-10 text-[#00df82] font-black text-2xl italic tracking-tighter">NEXTLOGI</div>
        <nav className="flex-1 space-y-2">
          <div onClick={() => setActiveTab('firma')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold ${activeTab === 'firma' ? 'bg-[#162a22] text-[#00df82] border border-[#00df82]/20' : 'text-gray-500 hover:bg-white/5'}`}>
            <LayoutGrid size={18} /> Firma Yönetimi
          </div>
          <div onClick={() => setActiveTab('finans')} className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer font-bold ${activeTab === 'finans' ? 'bg-white/10 text-white' : 'text-gray-500 hover:bg-white/5'}`}>
            <BarChart3 size={18} /> Finansal Dashboard
          </div>
        </nav>
        <button onClick={() => setIsLoggedIn(false)} className="mt-auto flex items-center gap-2 text-gray-600 hover:text-red-400 text-xs font-black"><LogOut size={14} /> ÇIKIŞ YAP</button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black text-white mb-2">Firma Yönetimi</h1>
            <p className="text-gray-500 text-sm italic font-medium">{firmalar.length} firma listeleniyor</p>
          </div>
          <button onClick={() => setShowModal(true)} className="bg-[#00df82] text-black px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,223,130,0.3)]">
            <Plus size={18} strokeWidth={3} /> Yeni Firma
          </button>
        </header>

        {/* FIRMA TABLOSU */}
        <div className="bg-[#121418] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-white/[0.02]">
              <tr>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">Firma & Şehir</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-center">Demo Durumu</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest">E-Posta</th>
                <th className="p-6 text-[10px] font-black text-gray-500 uppercase tracking-widest text-right">Durum</th>
              </tr>
            </thead>
            <tbody>
              {firmalar.map((f) => (
                <tr key={f.id} className="border-t border-white/5 hover:bg-white/[0.01] transition-all group">
                  <td className="p-6 flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#00df82]/10 text-[#00df82] rounded-full flex items-center justify-center font-black border border-[#00df82]/20">{f.ad.substring(0,2).toUpperCase()}</div>
                    <div><div className="text-sm font-bold text-white group-hover:text-[#00df82] transition-colors">{f.ad}</div><div className="text-[10px] text-gray-500 font-bold uppercase">{f.sehir}</div></div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="bg-[#00df82] text-black text-[10px] px-3 py-1.5 rounded-lg font-black shadow-lg shadow-[#00df82]/10 italic">{f.demo} GÜN AKTİF</span>
                  </td>
                  <td className="p-6 text-xs font-bold text-gray-400">{f.email}</td>
                  <td className="p-6 text-right">
                    <span className="text-[#00df82] bg-[#00df82]/5 px-3 py-1 rounded-full text-[10px] font-black uppercase italic border border-[#00df82]/10 tracking-widest">● {f.durum}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* YENİ FİRMA MODAL (FORM İÇİ ARTIK DOLU) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1115] border border-white/10 w-full max-w-lg rounded-3xl p-10 shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={24}/></button>
            <h2 className="text-2xl font-black text-white mb-2 uppercase italic tracking-wider">Firma Kayıt Paneli</h2>
            <p className="text-gray-500 text-xs mb-8 font-bold italic tracking-wide">Yeni firmayı ekosisteme dahil edin.</p>
            
            <form onSubmit={firmaEkle} className="space-y-4">
              <div className="relative">
                <Building2 className="absolute left-4 top-4 text-gray-600" size={18} />
                <input required type="text" placeholder="Firma Adı" className="w-full bg-black border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50 transition-all" value={yeniFirma.ad} onChange={(e) => setYeniFirma({...yeniFirma, ad: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-600" size={18} />
                  <input required type="text" placeholder="Şehir" className="w-full bg-black border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50 transition-all" value={yeniFirma.sehir} onChange={(e) => setYeniFirma({...yeniFirma, sehir: e.target.value})} />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-gray-600" size={18} />
                  <input required type="number" placeholder="Demo (Gün)" className="w-full bg-black border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50 transition-all" value={yeniFirma.demo} onChange={(e) => setYeniFirma({...yeniFirma, demo: e.target.value})} />
                </div>
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-600" size={18} />
                <input required type="email" placeholder="Yetkili E-Posta" className="w-full bg-black border border-white/5 rounded-xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50 transition-all" value={yeniFirma.email} onChange={(e) => setYeniFirma({...yeniFirma, email: e.target.value})} />
              </div>
              <button type="submit" className="w-full bg-[#00df82] text-black font-black py-4 rounded-xl uppercase tracking-[0.2em] text-sm mt-6 hover:scale-[1.02] transition-all shadow-xl shadow-[#00df82]/10">Kaydı Tamamla & Yayınla</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;