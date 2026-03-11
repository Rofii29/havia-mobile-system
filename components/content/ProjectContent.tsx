import React from 'react';
import { Activity, Briefcase, User, Clock, Calendar } from 'lucide-react';
import { colors } from '@/lib/utils';

interface ProjectContentProps {
  isLoadingProjects: boolean;
  projects: any[];
  onProjectClick: (id: string, name: string) => void;
}

export const ProjectContent: React.FC<ProjectContentProps> = ({
  isLoadingProjects, projects, onProjectClick
}) => {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300 pb-32">
      <div className="px-1 space-y-4">
      {isLoadingProjects ? (
        <div className="flex flex-col items-center justify-center py-20 bg-[#2C2A29] rounded-3xl border border-neutral-800">
           <div className="w-16 h-16 rounded-full bg-[#C69C3D]/10 flex items-center justify-center mb-4">
               <Activity className="w-8 h-8 text-[#C69C3D] animate-pulse" />
           </div>
           <p className="text-xs text-neutral-400 uppercase tracking-widest font-bold">Sinkronisasi Project...</p>
        </div>
      ) : projects.length > 0 ? (
        projects.map((project: any, index: number) => {
           const totalPoints = parseFloat(project.total_points || "0");
           const completedPoints = parseFloat(project.completed_points || "0");
           const progress = project.progress ? parseInt(project.progress, 10) : (totalPoints > 0 ? Math.round((completedPoints / totalPoints) * 100) : 0);
           const isDone = progress === 100 || String(project.status).toLowerCase() === 'completed';
           let statusText = project.status_title || project.status || (isDone ? 'COMPLETED' : 'IN PROGRESS');
           statusText = String(statusText).toUpperCase();
           if (statusText === 'OPEN') statusText = 'AKTIF';
           if (statusText === 'COMPLETED') statusText = 'SELESAI';
           
            return (
            <div 
              key={project.id || index} 
              onClick={() => onProjectClick(project.id, project.title)}
              className="group relative rounded-[2.5rem] p-[1.5px] overflow-hidden active:scale-[0.98] transition-all duration-300 shadow-2xl"
              style={{ background: 'linear-gradient(145deg, rgba(198, 156, 61, 0.2), rgba(255, 255, 255, 0.05))' }}
            >
              {/* Inner Card Side */}
              <div className="bg-[#121212] rounded-[2.4rem] p-6 h-full relative overflow-hidden">
                {/* Decorative Glow */}
                <div className={`absolute -right-12 -top-12 w-32 h-32 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500 ${isDone ? 'bg-green-500' : 'bg-[#C69C3D]'}`}></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex gap-3 items-center min-w-0 flex-1">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-xl shrink-0 transition-transform group-hover:scale-110 duration-500 ${isDone ? 'bg-green-500/10 border-green-500/20' : 'bg-[#C69C3D]/10 border-[#C69C3D]/20 shadow-[#C69C3D]/5'}`}>
                        {isDone ? <Activity className="w-6 h-6 text-green-400" /> : <Briefcase className="w-6 h-6 text-[#C69C3D]" />}
                      </div>
                      <div className="flex flex-col gap-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                           <h4 className="font-extrabold text-white text-base tracking-tight leading-none group-hover:text-[#C69C3D] transition-colors truncate">{project.title || `Project ${project.id}`}</h4>
                           {project.userRole && (
                             <span className={`text-[7px] px-1.5 py-0.5 rounded-lg font-black uppercase tracking-wider border shrink-0 ${
                               project.userRole === 'PIC' 
                                 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' 
                                 : 'bg-white/5 text-neutral-500 border-white/5'
                             }`}>
                               {project.userRole}
                             </span>
                           )}
                        </div>
                        <p className="text-[10px] text-neutral-500 flex items-center gap-1 font-medium truncate">
                          <User className="w-3 h-3 text-neutral-600 shrink-0" /> {project.company_name || 'Client Internal'}
                        </p>
                      </div>
                    </div>
                    
                    <span className={`text-[7px] px-2.5 py-1.5 rounded-xl font-black uppercase tracking-[0.1em] border shrink-0 backdrop-blur-sm ${isDone ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-[#C69C3D]/10 text-[#C69C3D] border-[#C69C3D]/20'}`}>
                      {statusText}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-white/[0.03] p-3 rounded-2xl border border-white/5 group-hover:border-white/10 transition-colors">
                      <p className="text-[7px] text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">Mulai Proyek</p>
                      <div className="flex items-center gap-2">
                         <Clock className="w-3 h-3 text-[#C69C3D]" />
                         <p className="text-[11px] text-neutral-200 font-mono font-bold">{project.start_date || '-'}</p>
                      </div>
                    </div>
                    <div className="bg-red-500/[0.03] p-3 rounded-2xl border border-red-500/10 group-hover:border-red-500/20 transition-colors">
                      <p className="text-[7px] text-red-500/70 uppercase tracking-widest mb-1.5 font-bold">Batas Waktu</p>
                      <div className="flex items-center gap-2">
                         <Calendar className="w-3 h-3 text-red-500/80" />
                         <p className="text-[11px] text-red-100/90 font-mono font-bold">{project.deadline || '-'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-[9px] text-neutral-500 uppercase tracking-[0.2em] font-black">Progress Proyek</p>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-xl font-black font-mono leading-none ${isDone ? 'text-green-500' : 'text-[#C69C3D]'}`}>{progress}</span>
                        <span className="text-[10px] text-neutral-600 font-bold">%</span>
                      </div>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1.5px] border border-white/5">
                      <div 
                         style={{ width: `${progress}%` }} 
                         className={`h-full rounded-full relative transition-all duration-1000 ease-out ${isDone ? 'bg-green-500' : 'bg-[#C69C3D] shadow-[0_0_15px_rgba(198,156,61,0.5)]'}`}
                      >
                         <div className="absolute inset-0 bg-white/20 animate-pulse transition-opacity opacity-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
        })
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-[#2C2A29] rounded-3xl border border-neutral-800 border-dashed">
          <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center mb-4 border border-neutral-800">
             <Briefcase className="w-6 h-6 text-neutral-600" />
          </div>
          <p className="text-xs text-neutral-500 tracking-widest uppercase font-bold text-center px-8">Belum ada project<br/>yang ditugaskan</p>
        </div>
      )}
      </div>
    </div>
  );
};
