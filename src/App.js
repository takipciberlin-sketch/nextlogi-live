import React, { useState } from 'react';
import { 
  LayoutGrid, Users, Send, ShoppingBag, Fuel, CreditCard, 
  LogOut, Package, UserCheck, Crown, ChevronRight, X, 
  Search, Filter, MoreVertical, Plus, ArrowUpRight
} from 'lucide-react';

const NextLogiApp = () => {
  const [activeTab, setActiveTab] = useState('Ürünler & Sipariş');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Ürün Verileri
  const stoklar = [
    { id: 'STK-01', isim: 'Euro Palet', kat: 'Lojistik', miktar: 120, durum: 'Yeterli', renk: 'text-green-500' },
    { id: 'STK-02', isim: 'Karton Kutu (L)', kat: 'Ambalaj', miktar: 2400, durum: 'Kritik', renk: 'text-red-500' },
    { id: 'STK-03', isim: 'Streç Film', kat: 'Sarf', miktar: 45, durum: 'Azalıyor', renk: 'text-orange-500' },
    { id: 'STK-04', isim: 'Yükleme Kayışı', kat: 'Ekipman', miktar: 15, durum: 'Yeterli', renk: 'text-green-500' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-[#e1e1e3] flex font-sans overflow-hidden">
      
      {/* SIDEBAR (image_595d2c.png Referanslı) */}
      <aside className="w-72 border-r border-white/5 flex flex-col bg-[#0d0f12] shrink-0">
        <div className="p-8">
          <div className="text-[#00df82] font-black text-2xl italic tracking-tighter">NEXTLOGI</div>
          <div className="text-[10px] text-gray-600 font-bold tracking-[0.4em] mt-1 uppercase text-nowrap">Firma Paneli</div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {[
            { n: 'Dashboard', i: <LayoutGrid size={20}/> },
            { n: 'Sürücüler', i: <Users size={20}/> },
            { n: 'Görev Atama', i: <Send size={20}/> },
            { n: 'Müşteriler', i: <Users size={20}/> },
          ].map((item) => (
            <div key={item.n} onClick={() => setActiveTab(item.n)} className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all font-bold text-sm ${activeTab === item.n ? 'bg-[#162a22] text-[#00df82]' : 'text-gray-500 hover:bg-white/5'}`}>
              {item.i} {item.n}
            </div>
          ))}

          {/* ÖZEL ÜRÜN BUTONU */}
          <div onClick={() => setActiveTab('Ürünler & Sipariş')} className={`mt-4 p-5 rounded-[1.5rem] flex items-center gap-4 cursor-pointer border ${activeTab === 'Ürünler & Sipariş' ? 'bg-[#11241a] border-[#00df82]/30 shadow-lg shadow-[#00df82]/5' : 'bg-transparent border-transparent'}`}>
            <div className="text-[#00df82]"><ShoppingBag size={24} strokeWidth={2.5} /></div>
            <span className="text-[#00df82] font-black text-lg tracking-tight italic text-nowrap">Ürünler & Sipariş</span>
          </div>

          <div onClick={() => setActiveTab('Yakıt Raporu')} className="flex items-center justify-between p-4 mt-2 text-gray-500 font-bold text-sm hover:bg-white/5 rounded-2xl cursor-pointer">
            <div className="flex items-center gap-4"><Fuel size={20}/> Yakıt Raporu</div>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-black">1</span>
          </div>
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="bg-[#1a1d23] p-5 rounded-[2rem] border border-white/5">
            <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Firma Sahibi</div>
            <div className="text-lg font-black text-white italic">Klaus Müller</div>
            <div className="text-[10px] text-gray-500 font-bold mt-1 uppercase">Müller GmbH</div>
          </div>
          <button className="w-full mt-4 flex items-center justify-center gap-2 text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest"><LogOut size={14}/> Çıkış Yap</button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto p-12 bg-[#0a0b0d]">
        <header className="mb-10">
          <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">MÜLLER GMBH</h1>
          <p className="text-gray-600 font-bold text-[10px] mt-3 uppercase tracking-[0.3em] italic">Firma Kontrol Merkezi / {activeTab}</p>
        </header>

        {activeTab === 'Ürünler & Sipariş' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* GÖRSELDEKİ YEŞİL KART (image_595d2c.png) */}
            <div className="bg-gradient-to-br from-[#11241a] to-[#0a0b0d] p-10 rounded-[2.5rem] border border-[#00df82]/20 relative overflow-hidden">
               <div className="relative z-10 max-w-2xl">
                 <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter mb-4">ÜRÜN YÖNETİM SİSTEMİ</h2>
                 <p className="text-gray-400 font-bold leading-relaxed mb-8">Deponuzdaki tüm ambalaj, palet ve lojistik ürünlerini buradan yönetebilir, yeni siparişler oluşturabilirsiniz.</p>
                 <button className="bg-[#00df82] text-black px-10 py-4 rounded-2xl font-black uppercase text-sm tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#00df82]/20">STOK GİRİŞİ YAP</button>
               </div>
               <ShoppingBag size={180} className="absolute -right-10 -bottom-10 text-[#00df82]/5 -rotate-12" />
            </div>

            {/* YENİ EKLENEN VERİ TABLOSU (BOŞLUĞU DOLDURAN KISIM) */}
            <div className="bg-[#121418] border border-white/5 rounded-[2.5rem] overflow-hidden">
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest italic">Güncel Stok Durumu</h3>
                <div className="flex gap-4">
                   <div className="relative"><Search size={16} className="absolute left-4 top-3 text-gray-600"/><input type="text" placeholder="Ara..." className="bg-black/40 border border-white/5 rounded-xl py-2 pl-12 pr-4 text-xs outline-none"/></div>
                   <button className="p-2 bg-white/5 rounded-xl text-gray-400 border border-white/5"><Filter size={18}/></button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] text-gray-600 uppercase tracking-widest border-b border-white/5">
                      <th className="p-6 font-black">Ürün / ID</th>
                      <th className="p-6 font-black text-center">Kategori</th>
                      <th className="p-6 font-black text-center">Miktar</th>
                      <th className="p-6 font-black text-right">Durum</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {stoklar.map((item) => (
                      <tr key={item.id} className="hover:bg-white/[0.01] group cursor-pointer transition-colors">
                        <td className="p-6">
                          <div className="font-black text-white italic uppercase tracking-tighter text-lg">{item.isim}</div>
                          <div className="text-[10px] text-gray-600 font-bold tracking-widest">{item.id}</div>
                        </td>
                        <td className="p-6 text-center text-xs font-bold text-gray-500 uppercase italic">{item.kat}</td>
                        <td className="p-6 text-center text-xl font-black text-gray-300 italic">{item.miktar} <span className="text-[10px] uppercase text-gray-600">Adet</span></td>
                        <td className="p-6 text-right">
                          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 border border-white/5">
                            <div className={`w-1.5 h-1.5 rounded-full bg-current ${item.renk}`} />
                            <span className={`text-[10px] font-black uppercase italic ${item.renk}`}>{item.durum}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default NextLogiApp;