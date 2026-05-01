// ... (İlgili kısımlara eklenecek Yakıt ve Ödeme görünümleri)

        {/* YAKIT RAPORU GÖRÜNÜMÜ */}
        {activeTab === 'Yakıt Raporu' && (
          <div className="space-y-6">
            <div className="bg-[#121418] border border-white/5 rounded-[2rem] p-8 relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Onay Bekleyen Fişler</h3>
                  <p className="text-xs text-gray-600 font-bold mt-1">Sürücülerden gelen anlık yakıt girişleri</p>
                </div>
                <div className="bg-red-500/20 text-red-500 px-4 py-2 rounded-xl text-[10px] font-black uppercase border border-red-500/10">
                  1 Yeni Bildirim
                </div>
              </div>
              
              <div className="mt-8 bg-black/40 border border-white/5 p-6 rounded-3xl flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5">
                    <Fuel className="text-orange-500" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-black italic">Shell - Berlin South</div>
                    <div className="text-[10px] text-gray-600 font-black uppercase mt-1">Sürücü: Thomas Klein • 45 Litre Diesel</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="bg-white/5 hover:bg-white/10 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all">Reddet</button>
                  <button className="bg-[#00df82] text-black px-6 py-3 rounded-xl text-[10px] font-black uppercase transition-all shadow-[0_0_15px_rgba(0,223,130,0.2)]">Onayla</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-[#121418] border border-white/5 rounded-[2rem] p-6">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Haftalık Yakıt Tüketimi</div>
                <div className="h-32 flex items-end gap-2 px-2">
                   {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                     <div key={i} style={{height: `${h}%`}} className={`flex-1 rounded-t-lg transition-all hover:brightness-125 ${i === 3 ? 'bg-[#00df82]' : 'bg-white/5'}`} />
                   ))}
                </div>
              </div>
              <div className="bg-[#121418] border border-white/5 rounded-[2rem] p-6 flex flex-col justify-center text-center">
                 <div className="text-4xl font-black text-white italic tracking-tighter">€4.250,00</div>
                 <div className="text-[10px] font-black text-gray-600 uppercase mt-2">Bu Ayki Toplam Gider</div>
              </div>
            </div>
          </div>
        )}

        {/* ÖDEME GÖRÜNÜMÜ */}
        {activeTab === 'Ödeme' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-br from-[#162a22] to-[#0a0b0d] border border-[#00df82]/20 rounded-[2.5rem] p-10 relative overflow-hidden">
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00df82]/10 blur-[80px]" />
               <div className="relative z-10">
                 <div className="bg-[#00df82] text-black w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase italic mb-6">Aktif Abonelik: PRO</div>
                 <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2">€1.290,00</h2>
                 <p className="text-gray-400 font-bold text-sm">Bir sonraki fatura tarihi: <span className="text-white">15 Mayıs 2026</span></p>
                 
                 <div className="mt-10 flex gap-4">
                   <button className="flex-1 bg-[#00df82] text-black py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl shadow-[#00df82]/10 transition-all hover:scale-[1.02]">Faturayı İndir</button>
                   <button className="flex-1 bg-white/5 border border-white/10 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/10">Planı Değiştir</button>
                 </div>
               </div>
            </div>
          </div>
        )}