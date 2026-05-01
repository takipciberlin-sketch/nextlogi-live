import React, { useState } from 'react';
import { 
  Truck, Users, PieChart, ShieldCheck, ChevronRight, Bell, 
  ShoppingCart, Search, LogIn, Lock, User, ArrowLeft, CheckCircle2
} from 'lucide-react';

const NextLogiPro = () => {
  // Sistem Durum Kontrolleri
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePanel, setActivePanel] = useState('dashboard');
  const [user, setUser] = useState({ username: '', password: '' });

  // Giriş Mekanizması
  const handleLogin = (e) => {
    e.preventDefault();
    if (user.username === 'admin' && user.password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Hatalı giriş! Lütfen bilgileri kontrol edin.');
    }
  };

  // 1. EKRAN: GİRİŞ (LOGIN) - image_652927.png aşaması için koruma
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-white">
        <div className="max-w-md w-full bg-[#0a0f1a] border border-gray-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="bg-cyan-500/20 p-4 rounded-full mb-4 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck size={32} />
            </div>
            <h1 className="text-2xl font-bold tracking-tighter">NEXTLOGI <span className="text-cyan-400 font-black">PRO</span></h1>
            <p className="text-gray-500 text-sm mt-2 italic font-medium">Uçtan Uca Mühürlü Veri Sistemi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Kullanıcı</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 text-gray-600" size={18} />
                <input 
                  type="text" 
                  placeholder="admin" 
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:border-cyan-500 outline-none transition-all text-white"
                  onChange={(e) => setUser({...user, username: e.target.value})} 
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-500 text-xs font-bold uppercase mb-2 ml-1">Şifre</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 text-gray-600" size={18} />
                <input 
                  type="password" 
                  placeholder="1234" 
                  className="w-full bg-black border border-gray-800 rounded-xl py-3 pl-10 pr-4 focus:border-cyan-500 outline-none transition-all text-white"
                  onChange={(e) => setUser({...user, password: e.target.value})} 
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all uppercase tracking-widest">
              SİSTEME GİRİŞ YAP
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. EKRAN: LOJİSTİK OPERASYON DETAYI (Tıklandığında açılacak bölüm)
  if (activePanel === 'lojistik') {
    return (
      <div className="min-h-screen bg-black text-white p-6 font-sans animate-in fade-in duration-500">
        <button onClick={() => setActivePanel('dashboard')} className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8 transition-colors font-bold uppercase text-xs tracking-widest">
          <ArrowLeft size={20} /> Ana Menüye Dön
        </button>
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#0a0f1a] border border-gray-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden border-t-cyan-500/50">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-cyan-400"><Truck size={150} /></div>
            <h2 className="text-3xl font-black italic mb-2 text-cyan-400 uppercase tracking-widest">Lojistik Operasyon Merkezi</h2>
            <p className="text-gray-400 mb-8 font-medium italic border-b border-gray-800 pb-4">Anlık Sevkiyat ve Mühürleme Durumu</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { plaka: '34 LOG 1923', rota: 'Berlin - İstanbul', durum: 'Mühürlendi', color: 'text-emerald-400', bg: 'border-emerald-500/20' },
                { plaka: '06 PRO 2024', rota: 'Münih - Ankara', durum: 'Yükleniyor', color: 'text-orange-400', bg: 'border-orange-500/20' },
                { plaka: '35 NXT 1010', rota: 'Hamburg - İzmir', durum: 'Yolda', color: 'text-cyan-400', bg: 'border-cyan-500/20' },
                { plaka: '41 LOG 0001', rota: 'Varşova - Kocaeli', durum: 'Gümrükte', color: 'text-purple-400', bg: 'border-purple-500/20' }
              ].map((araç, i) => (
                <div key={i} className={`bg-black/40 border ${araç.bg} p-5 rounded-2xl flex justify-between items-center hover:scale-[1.02] transition-all cursor-default`}>
                  <div>
                    <div className="font-black text-xl tracking-tight">{araç.plaka}</div>
                    <div className="text-xs text-gray-500 font-bold uppercase">{araç.rota}</div>
                  </div>
                  <div className={`text-[10px] font-black uppercase px-3 py-1 rounded-md border border-current shadow-[0_0_10px_rgba(0,0,0,0.5)] ${araç.color}`}>
                    {araç.durum}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-gray-800 flex justify-center">
              <div className="flex items-center gap-2 text-cyan-400 text-[10px] font-black tracking-[0.2em] animate-pulse uppercase">
                <CheckCircle2 size={16} /> Sistem Aktif • Veriler Senkronize
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. EKRAN: ANA DASHBOARD (image_652584.png görüntüsü)
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
      <nav className="border-b border-gray-900 p-4 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActivePanel('dashboard')}>
          <div className="bg-cyan-500 p-1 rounded shadow-[0_0_15px_rgba(6,182,212,0.5)]">
            <ShieldCheck className="text-black" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter italic">NEXTLOGI <span className="text-cyan-400 underline decoration-2 decoration-cyan-900">PRO</span></span>
        </div>
        <div className="flex gap-4 items-center">
          <Search size={20} className="text-gray-600 hidden md:block" />
          <Bell size={20} className="text-gray-500 hover:text-white transition-colors cursor-pointer" />
          <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-black font-black text-xs border-2 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">KP</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 animate-in slide-in-from-bottom-4 duration-700">
        <header className="mb-12">
          <h1 className="text-5xl font-black italic tracking-tighter mb-2">Hoş geldin, Kaptan 👋</h1>
          <p className="text-gray-500 font-medium italic text-lg">Tüm ekosistemi tek merkezden yönetin.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { id: 'lojistik', title: 'Lojistik Operasyon', icon: <Truck />, color: 'text-blue-400', desc: 'Sevkiyat ve mühürleme yönetimi' },
            { id: 'surucu', title: 'Sürücü Mobil App', icon: <Users />, color: 'text-emerald-400', desc: 'Sürücü takibi ve belge kontrolü' },
            { id: 'finans', title: 'Finans Yönetimi', icon: <PieChart />, color: 'text-purple-400', desc: 'Taahhüt ve ödeme dengesi' },
            { id: 'musteri', title: 'Müşteri Sipariş Portalı', icon: <ShoppingCart />, color: 'text-orange-400', desc: 'Müşteri sepeti ve sipariş girişi' }
          ].map((panel) => (
            <div 
              key={panel.id} 
              onClick={() => setActivePanel(panel.id)} 
              className="bg-[#0a0f1a] border border-gray-800 p-7 rounded-[2.5rem] hover:border-cyan-500/50 hover:scale-105 transition-all cursor-pointer group shadow-2xl relative overflow-hidden"
            >
              <div className={`mb-6 p-4 rounded-2xl bg-gray-900 w-fit group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300 ${panel.color}`}>
                {panel.icon}
              </div>
              <h3 className="text-xl font-black mb-2 group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{panel.title}</h3>
              <p className="text-gray-500 text-xs font-bold leading-relaxed italic opacity-80">{panel.desc}</p>
              <div className="mt-8 flex items-center text-[10px] font-black uppercase tracking-widest text-cyan-400 group-hover:translate-x-2 transition-transform">
                Paneli Aç <ChevronRight size={14} className="ml-1" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default NextLogiPro;