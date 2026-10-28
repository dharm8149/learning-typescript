import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ExplanationTab } from './components/ExplanationTab';
import { VideoTab } from './components/VideoTab';
import { GameTab } from './components/GameTab';
import { ModuleMetadata, SectionMetadata, SectionContent, UserProgress } from '@ts-learn/types';
import { getAllModules, getSectionContent } from '@ts-learn/content';
import { getGameForSection } from '@ts-learn/games';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

export const App: React.FC = () => {
  const [modules, setModules] = useState<ModuleMetadata[]>([]);
  const [sections, setSections] = useState<SectionMetadata[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-01-primitive-types');
  const [currentTab, setCurrentTab] = useState<'explanation' | 'video' | 'exercises'>('explanation');
  const [currentContent, setCurrentContent] = useState<SectionContent | undefined>(undefined);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedSections: [],
    totalXp: 0,
    streakDays: 1,
    highScores: {}
  });

  const [unlockedOutro, setUnlockedOutro] = useState(false);

  useEffect(() => {
    const allMods = getAllModules();
    setModules(allMods);

    const initialContent = getSectionContent('section-01-primitive-types');
    if (initialContent) {
      setSections([initialContent.meta]);
      setCurrentContent(initialContent);
    }

    fetch('/api/progress')
      .then((res) => res.json())
      .then((data) => {
        setUserProgress(data);
        if (data.completedSections?.includes('section-01-primitive-types')) {
          setUnlockedOutro(true);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const content = getSectionContent(selectedSectionId);
    if (content) {
      setCurrentContent(content);
      setCurrentTab('explanation');
      if (userProgress.completedSections.includes(selectedSectionId)) {
        setUnlockedOutro(true);
      } else {
        setUnlockedOutro(false);
      }
    }
  }, [selectedSectionId, userProgress.completedSections]);

  const handleCompleteSection = () => {
    if (!currentContent) return;

    fetch('/api/progress/complete-section', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sectionId: selectedSectionId, xp: currentContent.meta.xp })
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProgress(data);
        setUnlockedOutro(true);
      })
      .catch(() => {
        setUserProgress((prev) => ({
          ...prev,
          completedSections: Array.from(new Set([...prev.completedSections, selectedSectionId])),
          totalXp: prev.totalXp + currentContent.meta.xp
        }));
        setUnlockedOutro(true);
      });
  };

  const handleGameVictory = (xp: number) => {
    handleCompleteSection();
    setUserProgress((prev) => ({ ...prev, totalXp: prev.totalXp + xp }));
    setUnlockedOutro(true);
  };

  const gameConfig = getGameForSection(selectedSectionId);
  const isCompleted = userProgress.completedSections.includes(selectedSectionId);

  // Find index of current section for prev/next navigation
  const sectionIndex = sections.findIndex((s) => s.id === selectedSectionId);
  const prevSection = sectionIndex > 0 ? sections[sectionIndex - 1] : null;
  const nextSection = sectionIndex < sections.length - 1 ? sections[sectionIndex + 1] : null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col font-sans">
      <Header progress={userProgress} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          modules={modules}
          sections={sections}
          selectedSectionId={selectedSectionId}
          completedSectionIds={userProgress.completedSections}
          onSelectSection={(id) => setSelectedSectionId(id)}
        />

        <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          {currentContent ? (
            <div className="p-6 max-w-4xl mx-auto w-full space-y-6">
              {/* Section Header */}
              <div className="pb-4 border-b border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500">
                    {currentContent.meta.title}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-500">
                    {currentContent.meta.difficulty}
                  </span>
                  {isCompleted && (
                    <span className="flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      <CheckCircle2 className="w-3 h-3" />
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Tab Bar */}
              <div className="flex items-center gap-1 border-b border-gray-200">
                <button
                  onClick={() => setCurrentTab('explanation')}
                  className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                    currentTab === 'explanation'
                      ? 'border-blue-600 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Lesson
                </button>
                {currentContent.videoConfig && (
                  <button
                    onClick={() => setCurrentTab('video')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                      currentTab === 'video'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Video
                  </button>
                )}
                {gameConfig && (
                  <button
                    onClick={() => setCurrentTab('exercises')}
                    className={`px-4 py-2.5 text-xs font-bold border-b-2 transition-all ${
                      currentTab === 'exercises'
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Exercises
                  </button>
                )}
              </div>

              {/* Tab Content */}
              <div className="pt-2">
                {currentTab === 'explanation' && (
                  <ExplanationTab
                    content={currentContent}
                    onCompleteSection={handleCompleteSection}
                    isCompleted={isCompleted}
                  />
                )}

                {currentTab === 'video' && currentContent.videoConfig && (
                  <VideoTab
                    config={currentContent.videoConfig}
                    onVideoEnd={() => {}}
                  />
                )}

                {currentTab === 'exercises' && gameConfig && (
                  <GameTab
                    config={gameConfig}
                    onRewardXp={handleGameVictory}
                  />
                )}
              </div>

              {/* Prev / Next Navigation */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={() => prevSection && setSelectedSectionId(prevSection.id)}
                  disabled={!prevSection}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    prevSection
                      ? 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 shadow-sm'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  {prevSection ? prevSection.title : 'Start'}
                </button>

                <button
                  onClick={() => nextSection && setSelectedSectionId(nextSection.id)}
                  disabled={!nextSection}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    nextSection
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                      : 'text-gray-300 cursor-not-allowed'
                  }`}
                >
                  {nextSection ? nextSection.title : 'Complete'}
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-20 text-center text-gray-400">
              Select a section from the sidebar to begin learning.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
