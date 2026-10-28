import React, { useState, useEffect } from 'react';
import { GameConfig, GameMode } from '@ts-learn/types';
import {
  Circle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Timer,
  Award
} from 'lucide-react';

interface GameTabProps {
  config?: GameConfig;
  onRewardXp: (xp: number) => void;
}

export const GameTab: React.FC<GameTabProps> = ({ config, onRewardXp }) => {
  if (!config) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <p className="text-sm text-gray-500">Exercises for this section are being prepared.</p>
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
  const [isFinished, setIsFinished] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // Boss State
  const boss = config.bossPhase;
  const [bossHp, setBossHp] = useState(boss?.bossHealth || 100);
  const [playerHp, setPlayerHp] = useState(100);
  const [bossChallengeIndex, setBossChallengeIndex] = useState(0);

  const resetGame = (mode = selectedMode, lvlIdx = currentLevelIndex) => {
    setSelectedMode(mode);
    setCurrentLevelIndex(lvlIdx);
    setCurrentItemIndex(0);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    setFeedback(null);
    setBossHp(boss?.bossHealth || 100);
    setPlayerHp(100);
    setBossChallengeIndex(0);
    setTimeLeft(config.levels[lvlIdx]?.timeLimitSeconds || 40);
  };

  // Timer for time-attack mode
  useEffect(() => {
    if (selectedMode !== 'time-attack' || isFinished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedMode, isFinished]);

  const handleAnswer = (selectedType: string) => {
    if (feedback || isFinished) return;

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
        message: currentItem.valueExplanation
      });

      setTimeout(() => {
        setFeedback(null);
        if (currentItemIndex + 1 < currentLevel.items.length) {
          setCurrentItemIndex((prev) => prev + 1);
        } else {
          setIsFinished(true);
          onRewardXp(150);
          saveScore(newScore);
        }
      }, 1500);
    } else {
      setStreak(0);
      setFeedback({
        isCorrect: false,
        message: `In TypeScript, '${currentItem.valueRepresentation}' belongs to '${currentItem.correctType}'. ${currentItem.valueExplanation}`
      });

      if (selectedMode === 'time-attack') {
        setTimeLeft((prev) => Math.max(0, prev - 5));
      }

      setTimeout(() => setFeedback(null), 2000);
    }
  };

  const handleBossAnswer = (choiceIndex: number) => {
    if (!boss || feedback || isFinished) return;

    const challenge = boss.challenges[bossChallengeIndex];
    const isCorrect = choiceIndex === challenge.correctIndex;

    if (isCorrect) {
      const damage = Math.ceil(boss.bossHealth / boss.challenges.length);
      const newBossHp = Math.max(0, bossHp - damage);
      setBossHp(newBossHp);
      setScore((prev) => prev + 250);

      setFeedback({
        isCorrect: true,
        message: challenge.explanation
      });

      setTimeout(() => {
        setFeedback(null);
        if (newBossHp <= 0 || bossChallengeIndex + 1 >= boss.challenges.length) {
          setIsFinished(true);
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
        message: challenge.explanation
      });

      if (newPlayerHp <= 0) {
        setIsFinished(true);
      }

      setTimeout(() => setFeedback(null), 2000);
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

  const currentChallenge = boss ? boss.challenges[bossChallengeIndex] : null;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Mode Selector */}
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-900">{config.title}</h2>

        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
          <button
            onClick={() => resetGame('practice', currentLevelIndex)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedMode === 'practice'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Practice
          </button>
          <button
            onClick={() => resetGame('time-attack', currentLevelIndex)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
              selectedMode === 'time-attack'
                ? 'bg-blue-600 text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Timer className="w-3 h-3" />
            Timed
          </button>
          {boss && (
            <button
              onClick={() => resetGame('boss-battle', currentLevelIndex)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                selectedMode === 'boss-battle'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Challenge
            </button>
          )}
        </div>
      </div>

      {/* Level Selector (not in challenge mode) */}
      {selectedMode !== 'boss-battle' && config.levels.length > 1 && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Level:</span>
          {config.levels.map((lvl, idx) => (
            <button
              key={lvl.levelNumber}
              onClick={() => resetGame(selectedMode, idx)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
                currentLevelIndex === idx
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {lvl.title.split(':')[0] || `Level ${lvl.levelNumber}`}
            </button>
          ))}
        </div>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Score</div>
          <div className="text-lg font-bold text-gray-900 font-mono">{score}</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Streak</div>
          <div className="text-lg font-bold text-blue-600 font-mono">{streak}x</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">
            {selectedMode === 'time-attack' ? 'Time' : 'Progress'}
          </div>
          <div className="text-lg font-bold text-gray-900 font-mono">
            {selectedMode === 'time-attack'
              ? `${timeLeft}s`
              : `${currentItemIndex + 1}/${currentLevel.items.length}`
            }
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 min-h-[280px] flex flex-col">
        {/* Finished / Results */}
        {isFinished && selectedMode !== 'boss-battle' && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Exercise Complete</h3>
              <p className="text-xs text-gray-500 mt-1">
                Score: {score} points • Final streak: {streak}x
              </p>
            </div>
            <div className="flex items-center gap-3">
              {currentLevelIndex < config.levels.length - 1 && (
                <button
                  onClick={() => resetGame(selectedMode, currentLevelIndex + 1)}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                >
                  Next Level
                </button>
              )}
              <button
                onClick={() => resetGame()}
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Boss Battle */}
        {selectedMode === 'boss-battle' && boss && currentChallenge && !isFinished && (
          <div className="space-y-5">
            {/* HP Bars */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-gray-700">{boss.bossName}</span>
                  <span className="font-mono text-gray-500">{bossHp}/{boss.bossHealth}</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full transition-all"
                    style={{ width: `${(bossHp / boss.bossHealth) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-gray-700">Your Health</span>
                  <span className="font-mono text-gray-500">{playerHp}/100</span>
                </div>
                <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all"
                    style={{ width: `${playerHp}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-900">{currentChallenge.prompt}</p>
              <pre className="bg-gray-950 p-3 rounded-lg text-rose-300 font-mono text-xs border border-gray-800">
                <code>{currentChallenge.brokenCode}</code>
              </pre>
            </div>

            {/* Answer Options */}
            <div className="space-y-2">
              {currentChallenge.fixedCodeOptions.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleBossAnswer(i)}
                  disabled={!!feedback}
                  className="w-full p-3 text-left rounded-lg bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 font-mono text-xs transition-all disabled:opacity-50"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Boss Battle Finished */}
        {selectedMode === 'boss-battle' && boss && isFinished && (
          <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 py-8">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              playerHp > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
            }`}>
              {playerHp > 0 ? <Award className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {playerHp > 0 ? 'Challenge Complete' : 'Challenge Failed'}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                Final score: {score}
              </p>
            </div>
            <button
              onClick={() => resetGame('boss-battle', currentLevelIndex)}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retry Challenge
            </button>
          </div>
        )}

        {/* Standard Question */}
        {currentItem && !isFinished && selectedMode !== 'boss-battle' && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <span className="text-xs text-gray-500 font-mono">
                Question {currentItemIndex + 1} of {currentLevel.items.length}
              </span>
              <p className="text-sm text-gray-700">
                What is the TypeScript primitive type for this value?
              </p>
              <div className="inline-block px-8 py-3 rounded-xl bg-gray-950 font-mono text-xl font-bold text-blue-300">
                {currentItem.valueRepresentation}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {typeOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => handleAnswer(t)}
                  disabled={!!feedback}
                  className="py-3 px-4 rounded-xl bg-gray-50 hover:bg-blue-600 hover:text-white border border-gray-200 hover:border-blue-500 text-gray-800 font-mono font-bold text-sm transition-all disabled:opacity-50"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Banner */}
        {feedback && (
          <div className={`mt-4 p-3 rounded-lg flex items-center gap-2.5 text-xs ${
            feedback.isCorrect
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {feedback.isCorrect ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};
