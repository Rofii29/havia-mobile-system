import React from 'react';
import { Sparkles, Calendar, MapPin, Activity, Clock, Plus, Tag, ChevronRight } from 'lucide-react';
import { colors } from '@/lib/utils';

interface JadwalContentProps {
  isLoadingEvents: boolean;
  events: any[];
  onEventClick: (event: any) => void;
  onCreateEvent: () => void;
}

export const JadwalContent: React.FC<JadwalContentProps> = ({
  isLoadingEvents, events, onEventClick, onCreateEvent
}) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-32">
    <div className="flex items-center justify-between pl-1">
      <h3 className="text-sm font-bold text-white tracking-wide">Jadwal Mendatang</h3>
      <button onClick={onCreateEvent} className="bg-[#C69C3D]/10 border border-[#C69C3D]/30 p-2 rounded-xl active:scale-90 transition-all">
        <Plus className="w-5 h-5 text-[#C69C3D]" />
      </button>
    </div>

    {isLoadingEvents ? (
      <div className="flex flex-col items-center justify-center py-20">
         <Activity className="w-8 h-8 text-[#C69C3D] animate-pulse mb-3" />
         <p className="text-xs text-neutral-500 uppercase tracking-widest">Sinkronisasi Jadwal...</p>
      </div>
    ) : events.length > 0 ? (
      <div className="space-y-5">
        {events.map((event, index) => (
          <div key={event.id || index} onClick={() => onEventClick(event)} style={{ backgroundColor: colors.card, borderColor: colors.border }} className="p-5 rounded-[2.5rem] border group active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden shadow-xl hover:border-[#C69C3D]/30">
            <div className="flex gap-4 relative z-10">
              <div className="flex flex-col items-center justify-center w-14 h-14 rounded-2xl bg-neutral-900 border border-neutral-800 shrink-0">
                <span style={{ color: colors.gold }} className="text-xs font-bold uppercase">{new Date(event.start_date || '').toLocaleDateString('id-ID', { month: 'short' })}</span>
                <span className="text-xl font-bold text-white leading-none mt-1">{new Date(event.start_date || '').getDate()}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-base text-white mb-2 leading-tight group-hover:text-[#C69C3D] transition-colors">{event.title}</h4>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-neutral-500" />
                    <span className="text-[11px] text-neutral-400 font-medium">{event.start_time || '08:00'}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                      <span className="text-[11px] text-neutral-400 font-medium truncate max-w-[120px]">{event.location}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center text-neutral-600 group-hover:text-[#C69C3D] transition-colors">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center py-20 bg-[#2C2A29] rounded-3xl border border-neutral-800 border-dashed">
        <Calendar className="w-12 h-12 text-neutral-600 mb-4" />
        <p className="text-xs text-neutral-500 tracking-widest uppercase font-bold text-center px-8">Tidak ada jadwal<br/>saat ini</p>
      </div>
    )}
  </div>
);

interface EventDetailContentProps {
  selectedEvent: any;
  onBack: () => void;
}

export const EventDetailContent: React.FC<EventDetailContentProps> = ({ selectedEvent, onBack }) => {
  if (!selectedEvent) return null;
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-32">
      <div style={{ backgroundColor: selectedEvent.color || colors.gold }} className="w-full h-32 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
        <div className="absolute bottom-4 left-6">
           <h3 className="text-2xl font-bold text-white drop-shadow-lg">{selectedEvent.title}</h3>
        </div>
      </div>

      <div className="space-y-4 px-1">
        <div className="grid grid-cols-2 gap-3">
          <div style={{ backgroundColor: colors.card, borderColor: colors.border }} className="p-4 rounded-2xl border">
             <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">Waktu Mulai</p>
             <div className="flex items-center gap-2">
               <Clock style={{ color: colors.gold }} className="w-4 h-4" />
               <p className="text-sm font-bold text-white">{selectedEvent.start_time || '08:00'}</p>
             </div>
          </div>
          <div style={{ backgroundColor: colors.card, borderColor: colors.border }} className="p-4 rounded-2xl border">
             <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-2">Waktu Selesai</p>
             <div className="flex items-center gap-2">
               <Clock className="w-4 h-4 text-neutral-500" />
               <p className="text-sm font-bold text-white">{selectedEvent.end_time || '17:00'}</p>
             </div>
          </div>
        </div>

        <div style={{ backgroundColor: colors.card, borderColor: colors.border }} className="p-5 rounded-2xl border">
           <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-3">Detail Lokasi</p>
           <div className="flex items-start gap-3">
              <MapPin style={{ color: colors.gold }} className="w-5 h-5 mt-0.5" />
              <p className="text-sm text-neutral-300 leading-relaxed font-medium">{selectedEvent.location || 'Lokasi belum ditentukan'}</p>
           </div>
        </div>

        {selectedEvent.description && (
          <div style={{ backgroundColor: colors.card, borderColor: colors.border }} className="p-5 rounded-2xl border">
             <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-3">Deskripsi</p>
             <p className="text-sm text-neutral-300 leading-relaxed font-medium">{selectedEvent.description.replace(/(<([^>]+)>)/gi, "")}</p>
          </div>
        )}

        <button onClick={onBack} className="w-full py-4 mt-4 bg-neutral-900 border border-neutral-800 rounded-2xl text-neutral-400 font-bold uppercase tracking-widest text-xs active:scale-[0.98] transition-all hover:border-neutral-700 shadow-lg">
          Kembali ke Jadwal
        </button>
      </div>
    </div>
  );
};
