import React from 'react';
import { Clock, FileText, CalendarRange, Clock3, History } from 'lucide-react';
import { colors } from '@/lib/utils';

interface TimContentProps {
  onNav: (view: string, nav?: string | null, title?: string) => void;
  attendances: any[];
  isLoadingAttendances: boolean;
  leaves: any[];
}

export const TimContent: React.FC<TimContentProps> = ({ onNav, attendances, isLoadingAttendances, leaves }) => {
  // Filter only for today or last few records if needed, but here we show all as "Time Cards"
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-32">
      <div className="flex items-center justify-between pl-1">
        <h3 className="text-sm font-bold text-white tracking-wide">Tim & Kehadiran Saya</h3>
        <button onClick={() => onNav('subpage', null, 'Absensi')} className="text-[10px] font-bold text-[#C69C3D] uppercase tracking-widest flex items-center gap-1 group">
          <History className="w-3 h-3 transition-transform group-hover:rotate-[-20deg]" /> Full History
        </button>
      </div>
      
      {/* Quick Stats / Summary like Timecards in Brain */}
      <div className="space-y-3">
        {/* Full Width Total Jam */}
        <div className="bg-[#171717] border border-neutral-800 rounded-3xl p-5 flex flex-col items-center justify-center shadow-lg">
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-1 text-center">Total Jam Kerja</span>
          <span className="text-3xl font-black text-[#C69C3D] tabular-nums">
            {(() => {
              let totalMs = 0;
              attendances.forEach(att => {
                if (att.in_time && att.out_time && !att.out_time.startsWith('0000') && !att.out_time.startsWith('-0001')) {
                  const cin = new Date(att.in_time.replace(' ', 'T') + 'Z');
                  const cout = new Date(att.out_time.replace(' ', 'T') + 'Z');
                  if (!isNaN(cin.getTime()) && !isNaN(cout.getTime())) {
                    totalMs += (cout.getTime() - cin.getTime());
                  }
                }
              });
              const hours = Math.floor(totalMs / (1000 * 60 * 60));
              const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
              const seconds = Math.floor((totalMs / 1000) % 60);
              return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            })()}
          </span>
        </div>

        {/* Small Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#171717] border border-neutral-800 rounded-3xl p-4 flex flex-col items-center justify-center shadow-lg">
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mb-1 text-center">Total Hari</span>
            <span className="text-xl font-black text-white">{new Set(attendances.map(a => a.date || (a.in_time ? a.in_time.split(' ')[0] : null))).size}</span>
          </div>
          <div className="bg-[#171717] border border-neutral-800 rounded-3xl p-4 flex flex-col items-center justify-center shadow-lg">
            <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest mb-1 text-center">Izin / Cuti</span>
            <span className="text-xl font-black text-purple-400">{leaves.length}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center gap-3 p-4 bg-[#171717] border border-neutral-800 rounded-2xl hover:border-blue-500/30 transition-all group active:scale-95">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
            <FileText className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Request Izin</span>
        </button>
        <button className="flex items-center gap-3 p-4 bg-[#171717] border border-neutral-800 rounded-2xl hover:border-purple-500/30 transition-all group active:scale-95">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:bg-purple-500/20 transition-colors">
            <CalendarRange className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">Ajukan Cuti</span>
        </button>
      </div>

      {/* Time Cards Sections */}
      <div className="bg-[#121212] rounded-[2.5rem] border border-neutral-800/50 p-6 relative overflow-hidden shadow-2xl">
         <div className="flex items-center gap-3 mb-6">
           <div className="w-8 h-8 rounded-xl bg-[#C69C3D]/10 flex items-center justify-center border border-[#C69C3D]/20">
             <Clock3 className="w-4 h-4 text-[#C69C3D]" />
           </div>
           <h4 className="text-xs font-black text-white uppercase tracking-[0.2em]">Log Time Cards</h4>
         </div>

         {isLoadingAttendances ? (
           <div className="flex flex-col items-center justify-center py-10">
             <div className="w-6 h-6 border-2 border-[#C69C3D] border-t-transparent rounded-full animate-spin"></div>
           </div>
         ) : attendances.length > 0 ? (
           <div className="space-y-4">
             {attendances.slice(0, 10).map((att: any, idx: number) => {
               // Konversi UTC dari server ke Local untuk tampilan
               const formatLocalTime = (utcStr: string | null) => {
                 if (!utcStr || utcStr.startsWith('0000') || utcStr.startsWith('-0001')) return null;
                 const date = new Date(utcStr.replace(' ', 'T') + 'Z');
                 if (isNaN(date.getTime())) return utcStr;
                 return date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false });
               };

               const inTimeLocal = formatLocalTime(att.in_time);
               const outTimeLocal = formatLocalTime(att.out_time);
               
               const dateObj = new Date(att.in_time ? att.in_time.split(' ')[0] : (att.date || new Date()));
               const dayName = dateObj.toLocaleDateString('id-ID', { weekday: 'short' });
               const dayNum = dateObj.getDate();
               
               const isOutTimeEmpty = !att.out_time || 
                                      att.out_time.startsWith('0000') || 
                                      att.out_time.startsWith('-0001');
               const isClockedIn = att.status === 'incomplete' || (att.status === 'pending' && outTimeLocal === null && isOutTimeEmpty);

               // Calculate duration for the card
               let durationText = "";
               if (att.in_time && !isOutTimeEmpty) {
                  const cin = new Date(att.in_time.replace(' ', 'T') + 'Z');
                  const cout = new Date(att.out_time.replace(' ', 'T') + 'Z');
                  const diffMs = cout.getTime() - cin.getTime();
                  const totalSec = Math.floor(diffMs / 1000);
                  
                  if (totalSec < 60) {
                    durationText = `${totalSec}d`; // detik
                  } else if (totalSec < 3600) {
                    durationText = `${Math.floor(totalSec / 60)}m`; // menit
                  } else {
                    const h = Math.floor(totalSec / 3600);
                    const m = Math.floor((totalSec % 3600) / 60);
                    durationText = `${h}j ${m}m`; // jam menit
                  }
               }

               return (
                 <div key={att.id || idx} className="flex items-center gap-4 group">
                    {/* Date Bubble */}
                    <div className="flex flex-col items-center justify-center w-10 h-10 rounded-xl bg-white/5 border border-white/10 shrink-0">
                      <span className="text-[8px] font-bold text-neutral-500 uppercase leading-none mb-0.5">{dayName}</span>
                      <span className="text-xs font-black text-white leading-none">{dayNum}</span>
                    </div>

                    {/* Timeline Line */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-neutral-200">
                            {isClockedIn ? 'Sedang Bekerja' : 'Selesai Kerja'}
                          </span>
                          {!isClockedIn && durationText && (
                            <span className="text-[8px] text-[#C69C3D] font-bold uppercase tracking-tighter">Durasi: {durationText}</span>
                          )}
                        </div>
                        <span className="text-[9px] font-bold text-neutral-500 tabular-nums">
                          {inTimeLocal || '--:--'} - {outTimeLocal || 'Bekerja'}
                        </span>
                      </div>
                      
                      {/* Duration Bar Mock */}
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${isClockedIn ? 'bg-[#C69C3D] animate-pulse' : 'bg-green-500/30'}`} 
                          style={{ width: isClockedIn ? '100%' : '100%' }}
                        ></div>
                      </div>
                    </div>
                 </div>
               );
             })}
           </div>
         ) : (
           <div className="py-10 text-center">
             <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Belum ada log waktu.</p>
           </div>
         )}
      </div>
    </div>
  );
};
