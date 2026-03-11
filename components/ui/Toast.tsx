import { Sparkles } from 'lucide-react';
import { colors } from '@/lib/utils';

export const Toast = ({ msg }: { msg: string }) => {
  if (!msg) return null;
  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 bg-neutral-900/90 backdrop-blur-md border border-[#C69C3D]/30 text-white px-5 py-3 rounded-full shadow-[0_0_15px_rgba(212,175,55,0.2)] z-50 flex items-center gap-3 transition-all duration-300`}>
      <Sparkles style={{ color: colors.gold }} className="w-4 h-4" />
      <span className="text-xs font-bold tracking-wide">{msg}</span>
    </div>
  );
};
