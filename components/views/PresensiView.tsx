import React from 'react';
import { ArrowLeft, Clock, MapPin, LogIn, LogOut } from 'lucide-react';
import { colors } from '@/lib/utils';

interface PresensiViewProps {
  onNav: (view: string) => void;
  currentTime: string;
  handleAddAttendance: () => void;
  isSubmittingAttendance: boolean;
}

export const PresensiView: React.FC<PresensiViewProps> = ({
  onNav, currentTime, handleAddAttendance, isSubmittingAttendance
}) => {
  return (
    <section className="h-full w-full flex flex-col relative z-40 animate-in slide-in-from-bottom-4 duration-300">
      <div className="px-6 py-6 flex items-center justify-between z-20">
        <button onClick={() => onNav('dashboard')} style={{ backgroundColor: colors.card, borderColor: colors.border }} className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-neutral-800 transition-colors shadow-lg">
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <h2 className="font-bold text-sm uppercase tracking-widest text-white">Presensi Pegawai</h2>
        <div className="w-10"></div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1/2 bg-neutral-900 overflow-hidden z-0 border-b border-[#C69C3D]/20">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, #C69C3D 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]"></div>
        
        <div className="absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
          <div className="w-40 h-40 border border-[#C69C3D]/30 rounded-full absolute"></div>
          <div className="w-24 h-24 bg-[#C69C3D]/20 rounded-full animate-radar absolute"></div>
          <div style={{ backgroundColor: colors.gold }} className="w-4 h-4 rounded-full border-2 border-black shadow-[0_0_15px_rgba(212,175,55,0.8)] relative z-10"></div>
          <div className="absolute top-8 bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl tracking-wider">
            Havia HQ
          </div>
        </div>
      </div>

      <div className="flex-1 z-10 flex flex-col justify-end">
        <div style={{ backgroundColor: colors.card }} className="rounded-t-[2.5rem] p-8 pb-12 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] border-t border-[#C69C3D]/20 relative">
          <div className="w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-8 absolute top-4 left-1/2 transform -translate-x-1/2"></div>
          
          <div className="text-center mb-10 mt-2">
            <h1 className="text-5xl font-light font-mono tracking-tighter text-white mb-2">{currentTime || '14:20:25'}</h1>
            <p className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">Senin, 2 Maret 2026</p>
            
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-1.5 bg-green-500/10 text-green-400 rounded-full text-[10px] font-bold border border-green-500/20 tracking-wider">
              <MapPin className="w-3 h-3" />
              <span>Dalam Radius Kantor</span>
            </div>
          </div>

          <div style={{ backgroundColor: colors.bg, borderColor: colors.border }} className="w-full p-4 rounded-2xl border flex items-center justify-between mb-2 shadow-lg">
            <div className="flex items-center gap-4">
               <div style={{ backgroundColor: '#F43F5E' }} className="w-12 h-12 rounded-xl flex items-center justify-center shadow-[0_4px_15px_rgba(244,63,94,0.3)]">
                 <Clock className="w-6 h-6 text-white" />
               </div>
               <div className="flex flex-col">
                 <span className="text-xs text-white font-medium tracking-wide">You are currently clocked out</span>
                 <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5">Silahkan Clock In</span>
               </div>
            </div>
            
            <button 
              onClick={handleAddAttendance} 
              disabled={isSubmittingAttendance}
              style={{ borderColor: '#F43F5E', color: '#F43F5E' }}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 bg-transparent border-[1.5px] rounded-lg transition-all active:scale-95 ${isSubmittingAttendance ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#F43F5E]/10'}`}
            >
              {isSubmittingAttendance ? (
                <div className="w-4 h-4 border-2 border-[#F43F5E] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <LogIn className="w-4 h-4 ml-[-2px]" />
              )}
              <span className="text-xs font-bold whitespace-nowrap tracking-wide">{isSubmittingAttendance ? 'PROSES' : 'Clock In'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <div style={{ backgroundColor: colors.bg, borderColor: colors.border }} className="p-4 rounded-xl border">
              <div className="flex items-center gap-2 mb-3 text-green-400">
                <LogIn className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Masuk</span>
              </div>
              <p className="text-xl font-bold text-white">07:55</p>
              <p className="text-[9px] text-neutral-500 uppercase tracking-widest mt-1">Tepat Waktu</p>
            </div>
            <div style={{ backgroundColor: colors.bg, borderColor: colors.border }} className="p-4 rounded-xl border opacity-50">
              <div className="flex items-center gap-2 mb-3 text-neutral-400">
                <LogOut className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Pulang</span>
              </div>
              <p className="text-xl font-bold text-neutral-500">--:--</p>
              <p className="text-[9px] text-neutral-600 uppercase tracking-widest mt-1">Belum Absen</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
