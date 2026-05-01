{activeTab === 'Ürünler & Sipariş' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-8">
    
    {/* ÜST BİLGİ KARTLARI - STOK DURUMU */}
    <div className="grid grid-cols-3 gap-6">
      {[
        { label: 'TOPLAM STOK', val: '4.250', unit: 'Parça', color: 'text-[#00df82]', bg: 'bg-[#00df82]/5' },
        { label: 'BEKLEYEN SİPARİŞ', val: '12', unit: 'Talep', color: 'text-orange-500', bg: 'bg-orange-500/5' },
        { label: 'KRİTİK SEVİYE', val: '2', unit: 'Ürün', color: 'text-red-500', bg: 'bg-red-500/5' },
      ].map((item, i) => (
        <div key={i} className={`p-8 rounded-[2.5rem] border border-white/5 bg-[#121418] relative overflow-hidden group`}>
          <div className="relative z-10">
            <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-2">{item.label}</div>
            <div className={`text-4xl font-black italic tracking-tighter ${item.color}`}>{item.val}</div>
            <div className="text-[11px] font-bold text-gray-600 uppercase mt-1">{item.unit}</div>
          </div>
          <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-10 blur-2xl ${item.bg}`} />
        </div>
      ))}
    </div>

    {/* ANA İÇERİK: STOK LİSTESİ VE AKSİYONLAR */}
    <div className="bg-[#121418] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <div>
          <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Depo Envanteri</h3>
          <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">Son güncelleme: Az önce</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-600" size={16} />
            <input type="text" placeholder="Ürün ara..." className="bg-black/40 border border-white/5 rounded-xl py-2.5 pl-12 pr-4 text-xs font-bold outline-none focus:border-[#00df82]/30 w-64 transition-all" />
          </div>
          <button className="bg-[#00df82] text-black px-6 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-widest hover:scale-105 transition-all">
            + YENİ ÜRÜN
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[10px] text-gray-600 uppercase tracking-widest border-b border-white/5 bg-white/[0.01]">
              <th className="p-6 font-black">Ürün Adı</th>
              <th className="p-6 font-black">Kategori</th>
              <th className="p-6 font-black text-center">Stok Miktarı</th>
              <th className="p-6 font-black text-center">Birim Fiyat</th>
              <th className="p-6 font-black text-right">Durum</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { n: 'Euro Palet (Standart)', k: 'Lojistik Ekipman', s: '120', p: '€12.50', d: 'Yeterli', c: 'text-green-500' },
              { n: 'Karton Kutu (60x40x40)', k: 'Paketleme', s: '2.400', p: '€0.85', d: 'Kritik', c: 'text-red-500' },
              { n: 'Streç Film (17 Micron)', k: 'Sarf Malzeme', s: '45', p: '€4.20', d: 'Azalıyor', c: 'text-orange-500' },
            ].map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-all group cursor-pointer">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Package className="text-gray-500 group-hover:text-[#00df82]" size={18} />
                    </div>
                    <span className="text-sm font-black text-white italic tracking-tight">{item.n}</span>
                  </div>
                </td>
                <td className="p-6 text-xs font-bold text-gray-500 uppercase">{item.k}</td>
                <td className="p-6 text-center text-sm font-black text-gray-300 italic">{item.s} Adet</td>
                <td className="p-6 text-center text-sm font-black text-gray-300 italic">{item.p}</td>
                <td className="p-6 text-right">
                  <span className={`text-[10px] font-black uppercase px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 ${item.c}`}>
                    {item.d}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}