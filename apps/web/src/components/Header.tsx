import React from 'react';
import { Zap, Flame } from 'lucide-react';
import { UserProgress } from '@ts-learn/types';

interface HeaderProps {
  progress: UserProgress;
}

export const Header: React.FC<HeaderProps> = ({ progress }) => {
  return (
    <header className="px-6 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-gray-500 font-medium">Current Module:</span>
        <span className="text-xs font-semibold text-gray-900">Foundations of the Type System</span>
      </div>

      <div className="flex items-center gap-5">
        {/* Streak */}
        <div className="flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400" />
          <span className="text-xs font-medium text-gray-600">{progress.streakDays} day streak</span>
        </div>

        {/* XP */}
        <div className="flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span className="text-xs font-medium text-gray-600">{progress.totalXp} XP</span>
        </div>
      </div>
    </header>
  );
};
