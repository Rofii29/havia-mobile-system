import React from 'react';
import { ClipboardList, Briefcase, Activity, Calendar, Clock } from 'lucide-react';
import { colors } from '@/lib/utils';

// Shared Task List component
export const TaskList: React.FC<{
  tasks: any[];
  isLoading: boolean;
  projects?: any[];
  projectName?: string;
}> = ({ tasks, isLoading, projects, projectName }) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
         <Activity className="w-8 h-8 text-[#C69C3D] animate-pulse mb-3" />
         <p className="text-xs text-neutral-500 uppercase tracking-widest">Memuat Tugas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-[#2C2A29] rounded-3xl border border-neutral-800 border-dashed">
        <ClipboardList className="w-12 h-12 text-neutral-600 mb-4" />
        <p className="text-xs text-neutral-500 tracking-widest uppercase font-bold text-center px-8">Tidak ada task<br/>untuk saat ini</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task: any, index: number) => {
        const isDone = String(task.status).toLowerCase() === 'done' || String(task.status).toLowerCase() === 'completed';
        const proj = projects?.find(p => String(p.id) === String(task.project_id));
        const projName = projectName || (proj ? proj.title : `Project ${task.project_id}`);
        
        return (
          <div key={task.id || index} style={{ backgroundColor: colors.card, borderColor: isDone ? 'rgba(34,197,94,0.3)' : colors.border }} 
            className="p-5 rounded-[2rem] border relative overflow-hidden group shadow-xl">
            <div className="flex gap-4 items-start relative z-10">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shrink-0 shadow-inner ${isDone ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}`}>
                <ClipboardList className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold text-base mb-2 truncate ${isDone ? 'text-green-400/90 line-through' : 'text-white'}`}>{task.title}</h4>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1A1818]/60 rounded-lg border border-white/5 text-[9px] font-bold uppercase tracking-widest text-[#C69C3D]">
                    <Briefcase className="w-3 h-3" /> {projName}
                  </span>
                  {task.userRole && (
                    <span className={`text-[8px] px-1.5 py-1 rounded-lg font-bold uppercase tracking-widest border ${
                      task.userRole === 'PIC' 
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                        : 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
                    }`}>
                      {task.userRole}
                    </span>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-neutral-400 line-clamp-2 mb-4">
                  {task.description?.replace(/(<([^>]+)>)/gi, "") || 'Tidak ada deskripsi rinci.'}
                </p>
                
                <div className="flex flex-wrap items-center justify-between gap-y-4 pt-4 border-t border-white/5">
                  <div className="flex gap-6">
                    {task.start_date && (
                      <div>
                        <p className="text-[8px] text-neutral-500 uppercase tracking-[0.2em] mb-1 font-bold">Mulai</p>
                        <p className="text-[10px] text-neutral-300 font-medium font-mono">{task.start_date.split(' ')[0]}</p>
                      </div>
                    )}
                    {task.deadline && (
                      <div>
                        <p className="text-[8px] text-red-500/90 uppercase tracking-[0.2em] mb-1 font-bold">Deadline</p>
                        <p className="text-[10px] text-red-200 font-medium font-mono">{task.deadline.split(' ')[0]}</p>
                      </div>
                    )}
                  </div>
                  <div className="ml-auto">
                    <span className={`text-[8px] px-3 py-1.5 rounded-lg font-bold uppercase tracking-[0.15em] border whitespace-nowrap shadow-sm ${isDone ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-blue-500/10 text-blue-400 border-blue-500/30'}`}>
                      {String(task.status_title || task.status || 'Aktif').toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
