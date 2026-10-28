import React from 'react';
import { Award, Zap, Flame, Code2 } from 'lucide-react';
import { UserProgress } from '@ts-learn/types';

interface HeaderProps {
  progress: UserProgress;
}

export const Header: React.FC<HeaderProps> = ({ progress }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30">
          <Code2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-lg text-white tracking-tight">TypeScript Interactive</h1>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
              v5.8 Master
            </span>
          </div>
          <p className="text-xs text-slate-400">Deep Theory • Remotion Videos • Interactive Games</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-950/30 border border-orange-500/30 text-orange-400 text-sm font-medium">
          <Flame className="w-4 h-4 fill-orange-400" />
          <span>{progress.streakDays} Day Streak</span>
        </div>

        {/* Total XP */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-amber-300 text-sm font-semibold">
          <Zap className="w-4 h-4 fill-amber-300" />
          <span>{progress.totalXp} XP</span>
        </div>

        {/* Completed Sections */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 text-sm font-medium">
          <Award className="w-4 h-4" />
          <span>{progress.completedSections.length} Completed</span>
        </div>
      </div>
    </header>
  );
};
