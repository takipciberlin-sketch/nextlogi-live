import React, { useState } from 'react';
import { 
  Truck, Users, PieChart, ShieldCheck, ChevronRight, Bell, 
  ShoppingCart, Search, LogIn, Lock, User, ArrowLeft, CheckCircle2
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

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white font-sans">
        <div className="max-w-md w-full bg-[#0a0f1a] border border-gray-800 rounded-2xl p-8 shadow-2xl text-center">
          <ShieldCheck className="text-cyan-400 mx-auto mb-4" size={48} />
          <h1 className="text-2xl font-bold mb-8 italic">NEXTLOGI <span className="text-cyan-400 font-black">PRO</span></h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" placeholder="Kullanıcı" 
              className="w-full bg-black border border-gray-800 rounded-xl p-3 outline-none focus:border-cyan-400"
              onChange={(e) => setUser({...user, username: e.target.value})} 
            />
            <input 
              type="password" placeholder="Şifre" 
              className="w-full bg-black border border-gray-800 rounded-xl p-3 outline-none focus:border-cyan-400"
              onChange={(e) => setUser({...user, password: e.target.value})} 
            />
            <button className="w-full bg-cyan-500 text-black font-black py-3 rounded-xl hover:bg-cyan-400 transition-all uppercase tracking-widest">SİSTEME GİRİŞ YAP</button>
          </form>
        </div>
      </div>
    );
  }

  if (activePanel === 'lojistik') {
    return (
      <div className="min-h-screen bg-black text-white p-8 font-sans">
        <button onClick={() => setActivePanel('dashboard')} className="flex items-center gap-2 text-cyan-400 mb-8 font-black uppercase text-xs tracking-widest">
          <ArrowLeft size={18} /> ANA MENÜYE DÖN
        </button>
        <div className="max-w-4xl mx-auto bg-[#0a0f1a] border border-gray-800 rounded-3xl p-10 shadow-2xl relative overflow-hidden">
          <h2 className="text-3xl font-black text-cyan-400 mb-2 italic uppercase">Lojistik Operasyon Merkezi</h2>
          <p className="text-gray-500 mb-8 italic border-b border-gray-800 pb-4">Anlık Sevkiyat ve Mühürleme Durumu</p>
          <div className="grid gap-4">
             {[
               { p: '34 LOG 1923', r: 'Berlin - İstanbul', s: 'Mühürlendi', c: 'text-emerald-400' },
               { p: '06 PRO 2024', r: 'Münih - Ankara', s: 'Yolda', c: 'text-cyan-400' }
             ].map((a, i) => (
               <div key={i} className="bg-black/40 border border-gray-800 p-5 rounded-2xl flex justify-between items-center hover:border-cyan-500/30 transition-all">
                  <div>
                    <div className="font-black text-xl">{a.p}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase">{a.r}</div>
                  </div>
                  <div className={`text-[10px] font-black uppercase px-3 py-1 rounded border border-current ${a.c}`}>{a.s}</div>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-5xl font-black italic mb-2 tracking-tighter">Hoş geldin, Kaptan 👋</h1>
        <p className="text-gray-500 font-medium italic">Tüm ekosistemi tek merkezden yönetin.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div 
          onClick={() => setActivePanel('lojistik')} 
          className="bg-[#0a0f1a] border border-gray-800 p-8 rounded-[2.5rem] hover:border-cyan-500/50 hover:scale-105 cursor-pointer group transition-all shadow-2xl"
        >
          <Truck className="text-blue-400 mb-6 group-hover:text-cyan-400 transition-colors" size={32} />
          <h3 className="text-xl font-black uppercase mb-2">Lojistik Operasyon</h3>
          <p className="text-gray-500 text-xs font-bold italic mb-6">Sevkiyat ve mühürleme yönetimi</p>
          <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-cyan-400">Paneli Aç <ChevronRight size={14} className="ml-1" /></div>
        </div>
      </div>
    </div>
  );
};

export default NextLogiPro;