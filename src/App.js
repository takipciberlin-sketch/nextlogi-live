// ... (Önceki kodun devamına Görev Atama görünümü eklendi)

        {/* GÖREV ATAMA GÖRÜNÜMÜ */}
        {activeTab === 'Görev Atama' && (
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* SOL: GÖREV LİSTESİ */}
            <div className="col-span-8 bg-[#121418] border border-white/5 rounded-[2rem] flex flex-col overflow-hidden">
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em]">Görev Havuzu</h3>
                <button className="bg-white/5 px-4 py-2 rounded-lg text-[10px] font-black uppercase text-gray-400 border border-white/5 hover:text-white transition-all">
                  + Yeni Rota Oluştur
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {gorevler.map((g, idx) => (
                  <div key={idx} className="bg-black/40 border border-white/5 p-5 rounded-2xl flex items-center justify-between group hover:border-[#00df82]/30 transition-all">
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black italic text-xs ${g.kisi === '—' ? 'bg-red-500/10 text-red-500' : 'bg-[#00df82]/10 text-[#00df82]'}`}>
                        {g.id}
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{g.adres}</div>
                        <div className="text-[10px] text-gray-600 font-bold uppercase mt-1">Son Güncelleme: 12:45</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {g.kisi === '—' ? (
                        <button className="bg-[#00df82] text-black px-4 py-2 rounded-lg text-[10px] font-black uppercase">Sürücü Ata</button>
                      ) : (
                        <div className="text-right mr-4">
                          <div className="text-[9px] text-gray-600 font-black uppercase">Atanan Sürücü</div>
                          <div className="text-white text-xs font-bold uppercase italic">{g.kisi}</div>
                        </div>
                      )}
                      <ChevronRight className="text-gray-700 group-hover:translate-x-1 transition-transform" size={18} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SAĞ: ÖZET VE HARİTA ÖNİZLEME */}
            <div className="col-span-4 space-y-6">
              <div className="bg-[#121418] border border-white/5 rounded-[2rem] p-6 h-1/2 relative overflow-hidden">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-4">Anlık Rota İzleme</div>
                <div className="absolute inset-6 mt-12 bg-black/60 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-[#00df82]/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                     <Send className="text-[#00df82]" size={24} />
                  </div>
                  <div className="text-xs font-black text-white uppercase italic">Canlı Harita Servisi</div>
                  <div className="text-[9px] text-gray-600 font-bold uppercase mt-2 tracking-tighter italic">GPS verileri bekleniyor...</div>
                </div>
              </div>

              <div className="bg-[#00df82] rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden h-[calc(50%-24px)]">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                  <Package size={80} strokeWidth={3} className="text-black" />
                </div>
                <div className="relative z-10">
                  <div className="text-black font-black text-2xl italic tracking-tighter leading-none">HIZLI<br/>RAPOR AL</div>
                  <p className="text-black/60 text-[10px] font-black uppercase mt-2">Günlük operasyon özeti</p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-black font-black text-xs uppercase tracking-widest">
                  DOSYAYI İNDİR <ChevronRight size={14} />
                </div>
              </div>
            </div>
          </div>
        )}