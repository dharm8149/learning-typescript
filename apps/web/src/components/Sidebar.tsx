import React, { useState } from 'react';
import { ModuleMetadata, SectionMetadata } from '@ts-learn/types';
import { ChevronDown, ChevronRight, CheckCircle2, BookOpen, Gamepad2, Film } from 'lucide-react';

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
  onSelectSection,
}) => {
  // Track which module groups are expanded
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    modules.forEach((mod) => {
      init[mod.id] = sections.some((s) => s.moduleId === mod.id);
    });
    return init;
  });

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const completedCount = completedSectionIds.length;
  const totalSections = sections.length;
  const progressPercent = totalSections > 0 ? Math.round((completedCount / totalSections) * 100) : 0;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="px-4 pt-5 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">TS</span>
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm leading-tight">TypeScript Learning</h1>
            <p className="text-[11px] text-gray-500">{completedCount}/{totalSections} sections</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {progressPercent > 0 && (
            <p className="text-[10px] text-gray-400 mt-1">{progressPercent}% complete</p>
          )}
        </div>
      </div>

      {/* Module list */}
      <nav className="flex-1 overflow-y-auto py-2">
        {modules.map((mod) => {
          const modSections = sections.filter((s) => s.moduleId === mod.id);
          if (modSections.length === 0) return null;
          const isExpanded = expandedModules[mod.id];
          const modCompleted = modSections.filter((s) => completedSectionIds.includes(s.id)).length;

          return (
            <div key={mod.id} className="mb-1">
              {/* Module header */}
              <button
                onClick={() => toggleModule(mod.id)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-400 shrink-0">
                  {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                </span>
                <span className="font-semibold text-xs text-gray-700 truncate">{mod.title}</span>
                {modCompleted > 0 && (
                  <span className="ml-auto text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full font-medium shrink-0">
                    {modCompleted}/{modSections.length}
                  </span>
                )}
              </button>

              {/* Section list */}
              {isExpanded && (
                <div className="ml-4 border-l border-gray-100 pl-1">
                  {modSections.map((sec) => {
                    const isSelected = sec.id === selectedSectionId;
                    const isCompleted = completedSectionIds.includes(sec.id);

                    return (
                      <button
                        key={sec.id}
                        onClick={() => onSelectSection(sec.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs transition-colors border-l-2 ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 text-blue-700'
                            : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        ) : (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-gray-300 shrink-0" />
                        )}
                        <span className="truncate">{sec.title}</span>
                        <span className="ml-auto flex gap-1 shrink-0">
                          {sec.features.hasVideo && (
                            <Film className="w-2.5 h-2.5 text-gray-400" aria-label="Video" />
                          )}
                          {sec.features.hasGame && (
                            <Gamepad2 className="w-2.5 h-2.5 text-gray-400" aria-label="Exercise" />
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
};
