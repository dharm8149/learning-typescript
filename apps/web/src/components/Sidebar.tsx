import React from 'react';
import { ModuleMetadata, SectionMetadata } from '@ts-learn/types';
import { BookOpen, Video, Gamepad2, CheckCircle2, ChevronRight, Layers } from 'lucide-react';

interface SidebarProps {
  modules: ModuleMetadata[];
  sections: SectionMetadata[];
  selectedSectionId: string;
  completedSectionIds: string[];
  onSelectSection: (sectionId: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  modules,
  sections,
  selectedSectionId,
  completedSectionIds,
  onSelectSection
}) => {
  return (
    <aside className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="p-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>Curriculum Modules</span>
        </div>
      </div>

      <div className="p-3 space-y-6 flex-1">
        {modules.map((mod) => {
          const modSections = sections.filter((s) => s.moduleId === mod.id);

          return (
            <div key={mod.id} className="space-y-2">
              <div className="px-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {mod.title}
                  </h3>
                  <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded font-mono">
                    {modSections.length} Sections
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{mod.description}</p>
              </div>

              <div className="space-y-1">
                {modSections.map((sec) => {
                  const isSelected = sec.id === selectedSectionId;
                  const isCompleted = completedSectionIds.includes(sec.id);

                  return (
                    <button
                      key={sec.id}
                      onClick={() => onSelectSection(sec.id)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex flex-col gap-1.5 border ${
                        isSelected
                          ? 'bg-blue-600/15 border-blue-500/40 text-blue-200 shadow-md shadow-blue-900/20'
                          : 'bg-slate-900/40 border-slate-800/60 hover:bg-slate-800/60 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-blue-400 animate-pulse' : 'bg-slate-600'}`} />
                          )}
                          <span className="font-semibold text-sm line-clamp-1">{sec.title}</span>
                        </div>
                        <ChevronRight className={`w-4 h-4 text-slate-500 transition-transform ${isSelected ? 'rotate-90 text-blue-400' : ''}`} />
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-slate-400 ml-4">
                        <span className="flex items-center gap-1 text-slate-400">
                          <BookOpen className="w-3 h-3 text-blue-400" />
                          Docs
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Video className="w-3 h-3 text-purple-400" />
                          Video
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Gamepad2 className="w-3 h-3 text-amber-400" />
                          Game
                        </span>
                        <span className="ml-auto font-mono text-[10px] text-amber-400/90 font-bold">
                          +{sec.xp} XP
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
