import React, { useState } from 'react';
import { 
  Truck, Users, PieChart, ShieldCheck, ChevronRight, Bell, 
  ShoppingCart, Search, ArrowLeft, CheckCircle2
} from 'lucide-react';

const NextLogiPro = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState('dashboard');
  const [user, setUser] = useState({ username: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === 'admin' && user.password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Hatalı giriş!');
    }
  };

  // --- 1. GİRİŞ EKRANI ---
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white font-sans">
        <div className="max-w-md w-full bg-[#0a0f1a] border border-gray-800 rounded-2xl p-8 shadow-2xl text-center">
          <ShieldCheck className="text-cyan-400 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-8 italic text-white uppercase tracking-tighter">NEXTLOGI <span className="text-cyan-400 font-black">PRO</span></h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" placeholder="Kullanıcı Adı" 
              className="w-full bg-black border border-gray-800 rounded-xl p-3 outline-none focus:border-cyan-400 text-white"
              onChange={(e) => setUser({...user, username: e.target.value})} 
            />
            <input 
              type="password" placeholder="Şifre" 
              className="w-full bg-black border border-gray-800 rounded-xl p-3 outline-none focus:border-cyan-400 text-white"
              onChange={(e) => setUser({...user, password: e.target.value})} 
            />
            <button className="w-full bg-cyan-500 text-black font-black py-3 rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.4)]">SİSTEME GİRİŞ YAP</button>
          </form>
        </div>
      </div>
    );
  }

  // --- 2. LOJİSTİK DETAY PANELİ ---
  if (activePanel === 'lojistik') {
    return (
      <div className="min-h-screen bg-black text-white p-8 font-sans">
        <button onClick={() => setActivePanel('dashboard')} className="flex items-center gap-2 text-cyan-400 mb-8 font-black uppercase text-xs tracking-widest hover:text-white transition-colors">
          <ArrowLeft size={18} /> ANA MENÜYE DÖN
        </button>
        <div className="max-w-4xl mx-auto bg-[#0a0f1a] border border-gray-800 rounded-3xl p-10 shadow-2xl border-t-cyan-500/50">
          <h2 className="text-3xl font-black text-cyan-400 mb-2 italic uppercase tracking-wider">Lojistik Operasyon Merkezi</h2>
          <p className="text-gray-500 mb-8 italic border-b border-gray-800 pb-4">Anlık Sevkiyat ve Mühürleme Durumu</p>
          <div className="grid gap-4">
             {[
               { p: '34 LOG 1923', r: 'Berlin - İstanbul', s: 'Mühürlendi', c: 'text-emerald-400' },
               { p: '06 PRO 2024', r: 'Münih - Ankara', s: 'Yolda', c: 'text-cyan-400' },
               { p: '35 NXT 1010', r: 'Hamburg - İzmir', s: 'Beklemede', c: 'text-orange-400' }
             ].map((a, i) => (
               <div key={i} className="bg-black/40 border border-gray-800 p-5 rounded-2xl flex justify-between items-center hover:border-cyan-500/30 transition-all group">
                  <div>
                    <div className="font-black text-xl group-hover:text-white transition-colors">{a.p}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">{a.r}</div>
                  </div>
                  <div className={`text-[10px] font-black uppercase px-3 py-1 rounded border border-current shadow-[0_0_10px_rgba(0,0,0,0.5)] ${a.c}`}>{a.s}</div>
               </div>
             ))}
          </div>
          <div className="mt-10 flex items-center justify-center gap-2 text-cyan-400/50 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
            <CheckCircle2 size={14} /> Sistem Aktif • Veriler Senkronize
          </div>
        </div>
      </div>
    );
  }

  // --- 3. ANA DASHBOARD (4 KARTLI) ---
  const panels = [
    { id: 'lojistik', title: 'Lojistik Operasyon', icon: <Truck />, color: 'text-blue-400', desc: 'Sevkiyat ve mühürleme yönetimi' },
    { id: 'surucu', title: 'Sürücü Mobil App', icon: <Users />, color: 'text-emerald-400', desc: 'Sürücü takibi ve belge kontrolü' },
    { id: 'finans', title: 'Finans Yönetimi', icon: <PieChart />, color: 'text-purple-400', desc: 'Taahhüt ve ödeme dengesi' },
    { id: 'musteri', title: 'Müşteri Portalı', icon: <ShoppingCart />, color: 'text-orange-400', desc: 'Sipariş ve sepet yönetimi' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-5xl font-black italic mb-2 tracking-tighter">Hoş geldin, Kaptan 👋</h1>
        <p className="text-gray-500 font-medium italic">Tüm ekosistemi tek merkezden yönetin.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {panels.map((panel) => (
          <div 
            key={panel.id}
            onClick={() => panel.id === 'lojistik' ? setActivePanel('lojistik') : alert(panel.title + ' yakında aktif edilecek!')} 
            className="bg-[#0a0f1a] border border-gray-800 p-8 rounded-[2.5rem] hover:border-cyan-500/50 hover:scale-105 cursor-pointer group transition-all shadow-2xl relative overflow-hidden"
          >
            <div className={`mb-6 p-4 rounded-2xl bg-gray-900 w-fit group-hover:bg-cyan-500 group-hover:text-black transition-all ${panel.color}`}>
              {panel.icon}
            </div>
            <h3 className="text-xl font-black uppercase mb-2 group-hover:text-cyan-400 transition-colors tracking-tight">{panel.title}</h3>
            <p className="text-gray-500 text-[11px] font-bold italic mb-8 opacity-80 leading-relaxed">{panel.desc}</p>
            <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:translate-x-2 transition-transform">
              Paneli Aç <ChevronRight size={14} className="ml-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NextLogiPro;