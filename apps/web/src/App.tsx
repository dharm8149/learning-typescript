import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ExplanationTab } from './components/ExplanationTab';
import { VideoTab } from './components/VideoTab';
import { GameTab } from './components/GameTab';
import { ModuleMetadata, SectionMetadata, SectionContent, UserProgress } from '@ts-learn/types';
import { getAllModules, getSectionContent } from '@ts-learn/content';
import { getGameForSection } from '@ts-learn/games';
import {
  AlertTriangle,
  BookOpen,
  Gamepad2,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Lock
} from 'lucide-react';

export type LearningPhase = 'intro-problem' | 'interactive-studio' | 'arcade-game' | 'outro-mastery';

export const App: React.FC = () => {
  const [modules, setModules] = useState<ModuleMetadata[]>([]);
  const [sections, setSections] = useState<SectionMetadata[]>([]);
  const [selectedSectionId, setSelectedSectionId] = useState<string>('section-01-primitive-types');
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('intro-problem');

  const [currentContent, setCurrentContent] = useState<SectionContent | undefined>(undefined);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedSections: [],
    totalXp: 0,
    streakDays: 1,
    highScores: {}
  });

  // Track if user unlocked the outro video
  const [unlockedOutro, setUnlockedOutro] = useState(false);

  // Initial Content Load
  useEffect(() => {
    const allMods = getAllModules();
    setModules(allMods);

    const initialContent = getSectionContent('section-01-primitive-types');
    if (initialContent) {
      setSections([initialContent.meta]);
      setCurrentContent(initialContent);
    }

    // Server progress fetch
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

  // Update content when selected section changes
  useEffect(() => {
    const content = getSectionContent(selectedSectionId);
    if (content) {
      setCurrentContent(content);
      setCurrentPhase('intro-problem'); // Always start with The Problem video
      if (userProgress.completedSections.includes(selectedSectionId)) {
        setUnlockedOutro(true);
      } else {
        setUnlockedOutro(false);
      }
    }
  }, [selectedSectionId, userProgress.completedSections]);

  // Mark Section Complete & Unlock Outro Video
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
    // Prompt to view the Outro video
    setUnlockedOutro(true);
  };

  const gameConfig = getGameForSection(selectedSectionId);
  const isCompleted = userProgress.completedSections.includes(selectedSectionId);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header progress={userProgress} />

      <div className="flex flex-1 overflow-hidden">
        {/* Dynamic Curriculum Sidebar */}
        <Sidebar
          modules={modules}
          sections={sections}
          selectedSectionId={selectedSectionId}
          completedSectionIds={userProgress.completedSections}
          onSelectSection={(id) => {
            setSelectedSectionId(id);
          }}
        />

        {/* Main Quest Canvas */}
        <main className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
          {currentContent ? (
            <div className="p-8 max-w-6xl mx-auto w-full space-y-6">
              {/* Section Header */}
              <div className="border-b border-slate-800 pb-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/40 px-2.5 py-0.5 rounded border border-blue-500/20">
                      Module 01 • Section 01
                    </span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{currentContent.meta.difficulty}</span>
                    {isCompleted && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        Mastered
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-black text-white tracking-tight">
                    {currentContent.meta.title}
                  </h1>
                  <p className="text-sm text-slate-400 mt-1">
                    {currentContent.meta.description}
                  </p>
                </div>

                {/* Next Step Shortcut Button */}
                {currentPhase === 'intro-problem' && (
                  <button
                    onClick={() => setCurrentPhase('interactive-studio')}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all group"
                  >
                    <span>Proceed to Interactive Studio</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                {currentPhase === 'interactive-studio' && (
                  <button
                    onClick={() => setCurrentPhase('arcade-game')}
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-600/30 transition-all group"
                  >
                    <span>Jump into The Arcade</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
                {currentPhase === 'arcade-game' && unlockedOutro && (
                  <button
                    onClick={() => setCurrentPhase('outro-mastery')}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all group animate-bounce"
                  >
                    <span>Watch Superpower Unlocked (Outro)</span>
                    <Sparkles className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* 4-PHASE PROGRESSION TIMELINE BAR */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-xl">
                {/* 1. The Problem (Intro Video) */}
                <button
                  onClick={() => setCurrentPhase('intro-problem')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    currentPhase === 'intro-problem'
                      ? 'bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-900/20'
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    currentPhase === 'intro-problem' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-rose-400'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Step 1 • Intro Video</div>
                    <div className="text-xs font-bold text-white line-clamp-1">The Problem (Audio)</div>
                  </div>
                </button>

                {/* 2. Interactive Studio */}
                <button
                  onClick={() => setCurrentPhase('interactive-studio')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    currentPhase === 'interactive-studio'
                      ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-900/20'
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    currentPhase === 'interactive-studio' ? 'bg-blue-500 text-white' : 'bg-slate-800 text-blue-400'
                  }`}>
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Step 2 • Hands-On</div>
                    <div className="text-xs font-bold text-white line-clamp-1">Interactive Studio</div>
                  </div>
                </button>

                {/* 3. The Arcade & Boss */}
                <button
                  onClick={() => setCurrentPhase('arcade-game')}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    currentPhase === 'arcade-game'
                      ? 'bg-amber-950/40 border-amber-500/60 shadow-lg shadow-amber-900/20'
                      : 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    currentPhase === 'arcade-game' ? 'bg-amber-500 text-white' : 'bg-slate-800 text-amber-400'
                  }`}>
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Step 3 • The Challenge</div>
                    <div className="text-xs font-bold text-white line-clamp-1">Arcade & Boss Fight</div>
                  </div>
                </button>

                {/* 4. Superpower Unlocked (Outro Video) */}
                <button
                  onClick={() => {
                    if (unlockedOutro || isCompleted) setCurrentPhase('outro-mastery');
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                    currentPhase === 'outro-mastery'
                      ? 'bg-emerald-950/40 border-emerald-500/60 shadow-lg shadow-emerald-900/20'
                      : unlockedOutro || isCompleted
                      ? 'bg-slate-950/40 border-slate-800/80 hover:bg-slate-900 cursor-pointer'
                      : 'opacity-50 cursor-not-allowed bg-slate-950/20 border-slate-900'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    currentPhase === 'outro-mastery'
                      ? 'bg-emerald-500 text-white'
                      : unlockedOutro || isCompleted
                      ? 'bg-slate-800 text-emerald-400'
                      : 'bg-slate-900 text-slate-600'
                  }`}>
                    {unlockedOutro || isCompleted ? <Trophy className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-[10px] font-mono uppercase font-bold text-slate-400">Step 4 • Outro Video</div>
                    <div className="text-xs font-bold text-white line-clamp-1">
                      {unlockedOutro || isCompleted ? 'Real-World Impact' : 'Locked (Finish Game)'}
                    </div>
                  </div>
                </button>
              </div>

              {/* CURRENT PHASE CONTENT */}
              <div className="pt-2">
                {/* 1. Prologue: The Problem Video (with Audio Narration) */}
                {currentPhase === 'intro-problem' && (
                  <div className="space-y-6">
                    <VideoTab
                      config={currentContent.introVideo || currentContent.videoConfig}
                      onVideoEnd={() => {}}
                    />
                    <div className="text-center pt-2">
                      <button
                        onClick={() => setCurrentPhase('interactive-studio')}
                        className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
                      >
                        <span>I understand the problem. Let's fix it in the Interactive Studio!</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Hands-On Interactive Studio */}
                {currentPhase === 'interactive-studio' && (
                  <ExplanationTab
                    content={currentContent}
                    onCompleteSection={handleCompleteSection}
                    isCompleted={isCompleted}
                  />
                )}

                {/* 3. The Arcade & Boss Battle */}
                {currentPhase === 'arcade-game' && (
                  <div className="space-y-6">
                    <GameTab
                      config={gameConfig}
                      onRewardXp={handleGameVictory}
                    />
                    {unlockedOutro && (
                      <div className="p-6 bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/40 rounded-2xl flex items-center justify-between shadow-2xl animate-fade-in">
                        <div className="flex items-center gap-3">
                          <Trophy className="w-7 h-7 text-emerald-400" />
                          <div>
                            <h4 className="font-bold text-sm text-white">Challenge Completed! Outro Video Unlocked</h4>
                            <p className="text-xs text-slate-300">Watch how high-scale production systems at Stripe rely on this exact knowledge.</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setCurrentPhase('outro-mastery')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
                        >
                          <span>Watch Outro Video</span>
                          <Sparkles className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. Epilogue: Superpower Unlocked (Outro Video with Proper Narration) */}
                {currentPhase === 'outro-mastery' && (
                  <div className="space-y-6">
                    <VideoTab
                      config={currentContent.outroVideo || currentContent.videoConfig}
                      onVideoEnd={() => {}}
                    />
                    <div className="p-8 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-950 border border-emerald-500/40 rounded-3xl text-center space-y-4 shadow-2xl">
                      <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <h3 className="text-2xl font-black text-white">Section Mastered & Verified!</h3>
                      <p className="text-slate-300 text-sm max-w-lg mx-auto leading-relaxed">
                        You have conquered the 7 primitive types, experienced the runtime problem, simulated the memory stack, and observed real-world enterprise applications.
                      </p>
                      <div className="pt-2 flex justify-center gap-4">
                        <button
                          onClick={() => setCurrentPhase('intro-problem')}
                          className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all"
                        >
                          Replay From Step 1
                        </button>
                        <button
                          onClick={() => setCurrentPhase('arcade-game')}
                          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all"
                        >
                          Play Again to Beat High Score
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-20 text-center text-slate-500">
              Select a section from the sidebar to begin learning.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
