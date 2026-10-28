import React, { useState, useEffect } from 'react';
import { GameConfig, GameMode } from '@ts-learn/types';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  Timer,
  Trophy,
  Zap,
  RotateCcw,
  ShieldAlert,
  Swords,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface GameTabProps {
  config?: GameConfig;
  onRewardXp: (xp: number) => void;
}

export const GameTab: React.FC<GameTabProps> = ({ config, onRewardXp }) => {
  if (!config) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <Gamepad2 className="w-16 h-16 text-slate-600 mx-auto animate-bounce" />
        <h3 className="text-xl font-bold text-slate-300">Game In Development</h3>
        <p className="text-slate-500 text-sm">
          Interactive challenges for this section are being prepared.
        </p>
      </div>
    );
  }

  const [selectedMode, setSelectedMode] = useState<GameMode>('practice');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  // Standard Level State
  const currentLevel = config.levels[currentLevelIndex] || config.levels[0];
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(currentLevel?.timeLimitSeconds || 40);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isLevelWon, setIsLevelWon] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Boss Battle State
  const boss = config.bossPhase;
  const [bossHp, setBossHp] = useState(boss?.bossHealth || 100);
  const [playerHp, setPlayerHp] = useState(100);
  const [bossChallengeIndex, setBossChallengeIndex] = useState(0);

  // Reset Game
  const resetGame = (mode = selectedMode, lvlIdx = currentLevelIndex) => {
    setSelectedMode(mode);
    setCurrentLevelIndex(lvlIdx);
    setCurrentItemIndex(0);
    setScore(0);
    setStreak(0);
    setIsGameOver(false);
    setIsLevelWon(false);
    setFeedback(null);
    setBossHp(boss?.bossHealth || 100);
    setPlayerHp(100);
    setBossChallengeIndex(0);
    setTimeLeft(config.levels[lvlIdx]?.timeLimitSeconds || 40);
  };

  // Timer Effect for Time Attack
  useEffect(() => {
    if (selectedMode !== 'time-attack' || isGameOver || isLevelWon) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedMode, isGameOver, isLevelWon]);

  // Handle Type Match Option Selection
  const handleAnswer = (selectedType: string) => {
    if (feedback || isGameOver || isLevelWon) return;

    const currentItem = currentLevel.items[currentItemIndex];
    const isCorrect = selectedType === currentItem.correctType;

    if (isCorrect) {
      const addedScore = 100 + streak * 25;
      const newScore = score + addedScore;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      setFeedback({
        isCorrect: true,
        message: `Correct! ${currentItem.valueExplanation}`
      });

      setTimeout(() => {
        setFeedback(null);
        if (currentItemIndex + 1 < currentLevel.items.length) {
          setCurrentItemIndex((prev) => prev + 1);
        } else {
          // Completed Level!
          setIsLevelWon(true);
          confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
          onRewardXp(150);
          saveScore(newScore);
        }
      }, 1200);
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `Oops! In TypeScript, '${currentItem.valueRepresentation}' belongs to '${currentItem.correctType}'. ${currentItem.valueExplanation}`
      });

      if (selectedMode === 'time-attack') {
        // Penalty in time-attack
        setTimeLeft((prev) => Math.max(0, prev - 5));
      }

      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  // Handle Boss Challenge Answer
  const handleBossAnswer = (choiceIndex: number) => {
    if (!boss || feedback || isGameOver || isLevelWon) return;

    const challenge = boss.challenges[bossChallengeIndex];
    const isCorrect = choiceIndex === challenge.correctIndex;

    if (isCorrect) {
      const damage = Math.ceil(boss.bossHealth / boss.challenges.length);
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);
      setScore((prev) => prev + 250);

      setFeedback({
        isCorrect: true,
        message: `Critical Hit! ${challenge.explanation}`
      });

      setTimeout(() => {
        setFeedback(null);
        if (newBossHp <= 0 || bossChallengeIndex + 1 >= boss.challenges.length) {
          setIsLevelWon(true);
          confetti({ particleCount: 180, spread: 100, origin: { y: 0.5 } });
          onRewardXp(300);
          saveScore(score + 500);
        } else {
          setBossChallengeIndex((prev) => prev + 1);
        }
      }, 1500);
    } else {
      const newPlayerHp = Math.max(0, playerHp - 35);
      setPlayerHp(newPlayerHp);
      setFeedback({
        isCorrect: false,
        message: `Glitch attack blocked your move! ${challenge.explanation}`
      });

      if (newPlayerHp <= 0) {
        setIsGameOver(true);
      }

      setTimeout(() => {
        setFeedback(null);
      }, 2000);
    }
  };

  const saveScore = async (finalScore: number) => {
    try {
      await fetch('/api/progress/game-score', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId: config.gameId, score: finalScore, xp: 100 })
      });
    } catch {
      // offline fallback
    }
  };

  const currentItem = currentLevel?.items[currentItemIndex];
  const typeOptions = currentItem
    ? [currentItem.correctType, ...currentItem.distractorTypes].sort()
    : [];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16">
      {/* Game Header Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-amber-400" />
            <h2 className="font-bold text-lg text-white">{config.title}</h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{config.subtitle}</p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => resetGame('practice')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'practice'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => resetGame('time-attack')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedMode === 'time-attack'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Timer className="w-3 h-3" />
            Time Attack
          </button>
          {boss && (
            <button
              onClick={() => resetGame('boss-battle')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                selectedMode === 'boss-battle'
                  ? 'bg-rose-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Swords className="w-3 h-3" />
              Boss Battle
            </button>
          )}
        </div>
      </div>

      {/* Level Selectors (when not in Boss Battle) */}
      {selectedMode !== 'boss-battle' && (
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Levels:
          </span>
          {config.levels.map((lvl, idx) => (
            <button
              key={lvl.levelNumber}
              onClick={() => resetGame(selectedMode, idx)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                currentLevelIndex === idx
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              Lvl {lvl.levelNumber}: {lvl.title.split(':')[1] || lvl.title}
            </button>
          ))}
        </div>
      )}

      {/* Stats HUD */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <Trophy className="w-5 h-5 text-amber-400" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Score</div>
            <div className="text-xl font-bold font-mono text-white">{score}</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <Zap className="w-5 h-5 text-blue-400" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">Streak Combo</div>
            <div className="text-xl font-bold font-mono text-blue-400">{streak}x</div>
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <Timer className="w-5 h-5 text-purple-400" />
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-mono font-semibold">
              {selectedMode === 'time-attack' ? 'Countdown' : 'Target'}
            </div>
            <div className="text-xl font-bold font-mono text-purple-400">
              {selectedMode === 'time-attack' ? `${timeLeft}s` : `${currentLevel?.targetScore || 500} pts`}
            </div>
          </div>
        </div>
      </div>

      {/* Main Play Area */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl min-h-[380px] flex flex-col justify-center">
        {isLevelWon ? (
          /* Victory Screen */
          <div className="text-center space-y-4 py-8 animate-fade-in">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/40 shadow-lg">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Victory! Challenge Conquered!</h3>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You correctly solved the challenges with a score of{' '}
              <span className="text-amber-400 font-mono font-bold">{score}</span> and earned +150 XP!
            </p>
            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => resetGame(selectedMode, (currentLevelIndex + 1) % config.levels.length)}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-sm shadow-lg transition-all"
              >
                Next Challenge
              </button>
              <button
                onClick={() => resetGame()}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Play Again
              </button>
            </div>
          </div>
        ) : isGameOver ? (
          /* Game Over Screen */
          <div className="text-center space-y-4 py-8">
            <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto border border-rose-500/40">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Time Expired!</h3>
            <p className="text-slate-400 text-sm">
              Don't worry! Static typing takes practice to master.
            </p>
            <button
              onClick={() => resetGame()}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg transition-all"
            >
              Try Again
            </button>
          </div>
        ) : selectedMode === 'boss-battle' && boss ? (
          /* Boss Battle Play Area */
          <div className="space-y-6">
            {/* Boss & Player HP bars */}
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-800">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-rose-400 font-bold">{boss.bossName}</span>
                  <span className="font-mono text-rose-400">{bossHp} / {boss.bossHealth} HP</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-rose-950">
                  <div
                    className="h-full bg-rose-600 transition-all duration-300"
                    style={{ width: `${(bossHp / boss.bossHealth) * 100}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-emerald-400 font-bold">Your Health</span>
                  <span className="font-mono text-emerald-400">{playerHp} / 100 HP</span>
                </div>
                <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-emerald-950">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Boss Challenge Prompt */}
            <div className="space-y-3">
              <p className="text-slate-200 text-sm font-medium">
                {boss.challenges[bossChallengeIndex]?.prompt}
              </p>
              <pre className="bg-slate-950 p-4 rounded-xl border border-rose-500/30 text-rose-300 font-mono text-sm">
                <code>{boss.challenges[bossChallengeIndex]?.brokenCode}</code>
              </pre>
            </div>

            {/* Attack Options */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Select Type Fix to Strike Boss:
              </div>
              <div className="grid grid-cols-1 gap-2.5">
                {boss.challenges[bossChallengeIndex]?.fixedCodeOptions.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleBossAnswer(i)}
                    className="p-3 text-left rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-blue-500 text-slate-200 font-mono text-xs transition-all flex items-center justify-between group"
                  >
                    <span>{opt}</span>
                    <Swords className="w-4 h-4 text-slate-600 group-hover:text-amber-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Standard Type Matcher Play Area */
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400">
                Item {currentItemIndex + 1} of {currentLevel.items.length}
              </span>
              <div className="text-sm font-medium text-slate-300">
                What is the TypeScript primitive type for this runtime value?
              </div>
              <div className="inline-block py-4 px-8 rounded-2xl bg-slate-950 border-2 border-blue-500/40 shadow-2xl shadow-blue-900/30 font-mono text-3xl font-bold text-blue-300 tracking-wide mt-2">
                {currentItem?.valueRepresentation}
              </div>
            </div>

            {/* Choice Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
              {typeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => handleAnswer(t)}
                  className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-blue-600 border border-slate-700 hover:border-blue-400 text-slate-200 hover:text-white font-mono font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{t}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Live Answer Feedback Banner */}
        {feedback && (
          <div
            className={`mt-6 p-4 rounded-xl border flex items-center gap-3 text-sm animate-fade-in ${
              feedback.isCorrect
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}
          >
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
