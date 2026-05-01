import React, { useState } from 'react';
import { 
  LayoutGrid, BarChart3, Box, AlertTriangle, Settings, LogOut, Plus, 
  X, Mail, MapPin, Calendar, Building2, Lock, Shield, CheckCircle2
} from 'lucide-react';

const SuperAdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [firmalar, setFirmalar] = useState([
    { id: 1, ad: 'Müller GmbH', sehir: 'Berlin', email: 'owner@mullergmbh.de', demo: 30, durum: 'Aktif', moduller: ['Lojistik', 'Finans'] }
  ]);

  // Tam Teşekküllü Yeni Firma State'i
  const [yeniFirma, setYeniFirma] = useState({ 
    ad: '', sehir: '', email: '', sifre: '', demo: 30, 
    modulLojistik: true, modulFinans: false, modulMusteri: false 
  });

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const firmaEkle = (e) => {
    e.preventDefault();
    const moduller = [];
    if(yeniFirma.modulLojistik) moduller.push('Lojistik');
    if(yeniFirma.modulFinans) moduller.push('Finans');
    
    const eklenecek = { 
      id: Date.now(), 
      ad: yeniFirma.ad, 
      sehir: yeniFirma.sehir, 
      email: yeniFirma.email, 
      demo: yeniFirma.demo, 
      durum: 'Aktif',
      moduller: moduller
    };
    setFirmalar([eklenecek, ...firmalar]);
    setShowModal(false);
    setYeniFirma({ ad: '', sehir: '', email: '', sifre: '', demo: 30, modulLojistik: true, modulFinans: false, modulMusteri: false });
  };

  if (!isLoggedIn) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <button onClick={() => setIsLoggedIn(true)} className="bg-[#00df82] p-4 rounded-xl font-black">SİSTEME GİRİŞ YAP</button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans">
      {/* SIDEBAR (Sabit) */}
      <aside className="w-64 border-r border-white/5 flex flex-col p-6 bg-[#0d0f12]">
        <div className="mb-10 text-[#00df82] font-black text-2xl italic tracking-tighter uppercase">NEXTLOGI <span className="text-white">PRO</span></div>
        <nav className="flex-1 space-y-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#162a22] text-[#00df82] border border-[#00df82]/20 font-bold cursor-pointer">
            <LayoutGrid size={18} /> Firma Yönetimi
          </div>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter">Firma Yönetimi</h1>
          <button onClick={() => setShowModal(true)} className="bg-[#00df82] text-black px-8 py-3 rounded-xl font-black flex items-center gap-2 hover:scale-105 transition-all">
            <Plus size={20} strokeWidth={3} /> YENİ FİRMA EKLE
          </button>
        </header>

        {/* TABLO */}
        <div className="bg-[#121418] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
              <tr>
                <th className="p-6">Firma Bilgisi</th>
                <th className="p-6 text-center">Modüller</th>
                <th className="p-6 text-center">Demo</th>
                <th className="p-6 text-right">Durum</th>
              </tr>
            </thead>
            <tbody>
              {firmalar.map((f) => (
                <tr key={f.id} className="border-t border-white/5 hover:bg-white/[0.01]">
                  <td className="p-6">
                    <div className="font-bold text-white">{f.ad}</div>
                    <div className="text-[10px] text-gray-500 uppercase font-bold">{f.sehir} • {f.email}</div>
                  </td>
                  <td className="p-6 text-center">
                    <div className="flex justify-center gap-1">
                      {f.moduller.map((m, i) => (
                        <span key={i} className="text-[9px] bg-white/5 border border-white/10 px-2 py-1 rounded text-gray-400 font-bold uppercase">{m}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-6 text-center">
                    <span className="bg-[#00df82] text-black text-[10px] px-3 py-1 rounded-md font-black italic">{f.demo} GÜN</span>
                  </td>
                  <td className="p-6 text-right">
                    <span className="text-[#00df82] text-[10px] font-black border border-[#00df82]/30 px-3 py-1 rounded-full uppercase italic">● {f.durum}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* YENİ FİRMA MODAL (EKSİKSİZ VERSİYON) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f1115] border border-white/10 w-full max-w-xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
            {/* Arkaplan Süsü */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#00df82]/10 blur-[80px]" />
            
            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-500 hover:text-white"><X size={24}/></button>
            <h2 className="text-3xl font-black text-white mb-1 uppercase italic tracking-tighter">Firma Kayıt Paneli</h2>
            <p className="text-gray-500 text-xs mb-8 font-bold italic border-b border-white/5 pb-4">Sisteme yeni bir kurumsal kimlik tanımlayın.</p>
            
            <form onSubmit={firmaEkle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Building2 className="absolute left-4 top-4 text-gray-600" size={18} />
                  <input required type="text" placeholder="Firma Adı" className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50" value={yeniFirma.ad} onChange={(e) => setYeniFirma({...yeniFirma, ad: e.target.value})} />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-600" size={18} />
                  <input required type="text" placeholder="Şehir" className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50" value={yeniFirma.sehir} onChange={(e) => setYeniFirma({...yeniFirma, sehir: e.target.value})} />
                </div>
              </div>

              <div className="relative">
                <Mail className="absolute left-4 top-4 text-gray-600" size={18} />
                <input required type="email" placeholder="Yetkili E-Posta" className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50" value={yeniFirma.email} onChange={(e) => setYeniFirma({...yeniFirma, email: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Lock className="absolute left-4 top-4 text-gray-600" size={18} />
                  <input required type="password" placeholder="Yönetici Şifresi" className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50" value={yeniFirma.sifre} onChange={(e) => setYeniFirma({...yeniFirma, sifre: e.target.value})} />
                </div>
                <div className="relative">
                  <Calendar className="absolute left-4 top-4 text-gray-600" size={18} />
                  <input required type="number" placeholder="Demo Gün" className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-white outline-none focus:border-[#00df82]/50" value={yeniFirma.demo} onChange={(e) => setYeniFirma({...yeniFirma, demo: e.target.value})} />
                </div>
              </div>

              {/* MODÜL SEÇİMİ (EKSİK OLAN KISIM) */}
              <div className="p-4 bg-black/50 border border-white/5 rounded-2xl">
                <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-3">Aktif Edilecek Modüller</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={yeniFirma.modulLojistik} onChange={(e) => setYeniFirma({...yeniFirma, modulLojistik: e.target.checked})} className="hidden" />
                    <div className={`w-5 h-5 rounded border ${yeniFirma.modulLojistik ? 'bg-[#00df82] border-[#00df82]' : 'border-gray-700'} flex items-center justify-center`}><CheckCircle2 size={12} className={yeniFirma.modulLojistik ? 'text-black' : 'text-transparent'} /></div>
                    <span className="text-xs font-bold uppercase group-hover:text-white transition-colors">Lojistik</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" checked={yeniFirma.modulFinans} onChange={(e) => setYeniFirma({...yeniFirma, modulFinans: e.target.checked})} className="hidden" />
                    <div className={`w-5 h-5 rounded border ${yeniFirma.modulFinans ? 'bg-[#00df82] border-[#00df82]' : 'border-gray-700'} flex items-center justify-center`}><CheckCircle2 size={12} className={yeniFirma.modulFinans ? 'text-black' : 'text-transparent'} /></div>
                    <span className="text-xs font-bold uppercase group-hover:text-white transition-colors">Finans</span>
                  </label>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#00df82] text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] text-sm mt-4 hover:brightness-110 shadow-xl shadow-[#00df82]/20 transition-all flex items-center justify-center gap-2">
                <Shield size={18} /> KAYDI TAMAMLA & YAYINLA
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;