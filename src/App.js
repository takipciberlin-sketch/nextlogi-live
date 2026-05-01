// ÜRÜNLER & SİPARİŞ GÖRÜNÜMÜ (Eksik olan kısım)
{activeTab === 'Ürünler & Sipariş' && (
  <div className="space-y-6 animate-in fade-in duration-500">
    <div className="grid grid-cols-3 gap-6">
      {/* Stok Kartları */}
      {[
        { t: 'Karton Kutu', q: '1.240 Adet', c: 'text-orange-500' },
        { t: 'Palet', q: '85 Adet', c: 'text-blue-500' },
        { t: 'Streç Film', q: '12 Rulo', c: 'text-[#00df82]' }
      ].map((item, i) => (
        <div key={i} className="bg-[#121418] border border-white/5 p-6 rounded-[2rem]">
          <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-2">{item.t}</div>
          <div className={`text-2xl font-black italic ${item.c}`}>{item.q}</div>
        </div>
      ))}
    </div>
    
    <div className="bg-[#121418] border border-white/5 rounded-[2rem] overflow-hidden">
       <div className="p-6 border-b border-white/5 bg-white/[0.01]">
         <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Son Gelen Siparişler</h3>
       </div>
       <table className="w-full text-left border-collapse">
         <thead>
           <tr className="text-[10px] text-gray-600 uppercase border-b border-white/5">
             <th className="p-5">Ürün</th>
             <th className="p-5">Müşteri</th>
             <th className="p-5">Miktar</th>
             <th className="p-5 text-right">Durum</th>
           </tr>
         </thead>
         <tbody className="divide-y divide-white/5 text-sm font-bold">
            <tr className="hover:bg-white/[0.01]">
              <td className="p-5 text-white italic">Karton Kutu (L)</td>
              <td className="p-5 text-gray-500">LogiTech Berlin</td>
              <td className="p-5">500 Adet</td>
              <td className="p-5 text-right text-orange-500 uppercase text-[10px]">Hazırlanıyor</td>
            </tr>
         </tbody>
       </table>
    </div>
  </div>
)}

// MÜŞTERİLER GÖRÜNÜMÜ
{activeTab === 'Müşteriler' && (
  <div className="grid grid-cols-2 gap-6 animate-in slide-in-from-bottom-4 duration-500">
    {[
      { n: 'Volkswagen Group', a: 'Wolfsburg, DE', p: 'High Priority' },
      { n: 'DHL Express', a: 'Bonn, DE', p: 'Standard' }
    ].map((m, i) => (
      <div key={i} className="bg-[#121418] border border-white/5 p-8 rounded-[2.5rem] group hover:border-[#00df82]/40 transition-all cursor-pointer">
        <div className="flex justify-between items-start">
           <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#00df82] font-black text-xl">
             {m.n.charAt(0)}
           </div>
           <span className="text-[9px] font-black uppercase text-gray-700 tracking-tighter">Müşteri ID: #C-00{i+1}</span>
        </div>
        <div className="mt-6">
          <div className="text-xl font-black text-white italic uppercase tracking-tighter">{m.n}</div>
          <div className="text-xs text-gray-600 font-bold mt-1">{m.a}</div>
        </div>
        <div className="mt-8 flex items-center justify-between">
           <div className="text-[10px] font-black text-[#00df82] uppercase tracking-widest">{m.p}</div>
           <ChevronRight size={16} className="text-gray-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    ))}
  </div>
)}