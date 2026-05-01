// Ürünler Sayfası İçin Yeni Veri Seti
const lojistikEnvanter = [
  { id: 'STK-001', isim: 'Euro Palet (Ahşap)', kat: 'Depo Ekipman', miktar: 150, birim: 'Adet', durum: 'Yeterli', renk: 'text-[#00df82]' },
  { id: 'STK-002', isim: 'Streç Film (50cm)', kat: 'Sarf Malzeme', miktar: 12, birim: 'Rulo', durum: 'Kritik', renk: 'text-red-500' },
  { id: 'STK-003', isim: 'Koli Bandı (Gümüş)', kat: 'Sarf Malzeme', miktar: 85, birim: 'Adet', durum: 'Yeterli', renk: 'text-[#00df82]' },
  { id: 'STK-004', isim: 'Plastik Kasa (M)', kat: 'Taşıma Ünitesi', miktar: 40, birim: 'Adet', durum: 'Azalıyor', renk: 'text-orange-500' },
  { id: 'STK-005', isim: 'Çelik Çember Takımı', kat: 'Bağlama Ekipman', miktar: 5, birim: 'Set', durum: 'Kritik', renk: 'text-red-500' },
  { id: 'STK-006', isim: 'Yükleme Rampası', kat: 'Depo Ekipman', miktar: 2, birim: 'Adet', durum: 'Yeterli', renk: 'text-[#00df82]' },
];

// ... (Tablo render kısmı)
<div className="bg-[#121418] border border-white/5 rounded-[2.5rem] overflow-hidden mt-8 shadow-2xl">
  <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
    <h3 className="text-sm font-black text-white uppercase tracking-widest italic">Kategorize Edilmiş Envanter</h3>
    <div className="flex gap-2 text-[10px] font-black uppercase text-gray-600">
      <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">Tüm Kategoriler</span>
      <span className="px-3 py-1 hover:bg-[#00df82]/10 hover:text-[#00df82] cursor-pointer rounded-lg transition-all">Sarf Malzeme</span>
      <span className="px-3 py-1 hover:bg-[#00df82]/10 hover:text-[#00df82] cursor-pointer rounded-lg transition-all">Ekipman</span>
    </div>
  </div>
  
  <table className="w-full text-left">
    <thead>
      <tr className="text-[10px] text-gray-700 uppercase tracking-[0.2em] border-b border-white/5 bg-black/20">
        <th className="p-6">Ürün Tanımı / ID</th>
        <th className="p-6">Kategori</th>
        <th className="p-6 text-center">Mevcut Stok</th>
        <th className="p-6 text-right">Durum Analizi</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-white/5">
      {lojistikEnvanter.map((urun) => (
        <tr key={urun.id} className="hover:bg-[#00df82]/[0.02] group transition-all">
          <td className="p-6">
            <div className="text-white font-black italic uppercase text-base tracking-tight group-hover:translate-x-1 transition-transform">{urun.isim}</div>
            <div className="text-[9px] text-gray-600 font-bold tracking-widest mt-1">SERİ NO: {urun.id}</div>
          </td>
          <td className="p-6">
             <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black text-gray-400 uppercase italic">
               {urun.kat}
             </span>
          </td>
          <td className="p-6 text-center">
            <div className="text-xl font-black text-gray-200 italic">{urun.miktar}</div>
            <div className="text-[9px] text-gray-600 font-bold uppercase">{urun.birim}</div>
          </td>
          <td className="p-6 text-right">
             <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-black/60 border border-white/5 ${urun.renk}`}>
                <div className="w-1 h-1 rounded-full bg-current shadow-[0_0_8px_currentColor]" />
                <span className="text-[10px] font-black uppercase tracking-tighter italic">{urun.durum}</span>
             </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>