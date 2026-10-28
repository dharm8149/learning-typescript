import React, { useRef, useState, useEffect } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { VideoConfig } from '@ts-learn/types';
import { getComposition, PrimitivesExplainer } from '@ts-learn/remotion';
import {
  Play,
  Film,
  Sparkles,
  Clock,
  Volume2,
  Mic,
  AlertTriangle,
  Trophy,
  BookOpen,
  VolumeX,
  PlayCircle
} from 'lucide-react';

interface VideoTabProps {
  config?: VideoConfig;
  onVideoEnd?: () => void;
}

export const VideoTab: React.FC<VideoTabProps> = ({ config, onVideoEnd }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [voiceNarration, setVoiceNarration] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCueIndex, setCurrentCueIndex] = useState(0);
  const [spokenText, setSpokenText] = useState<string>('');

  if (!config) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <Film className="w-16 h-16 text-slate-600 mx-auto animate-pulse" />
        <h3 className="text-xl font-bold text-slate-300">Remotion Video Coming Soon</h3>
        <p className="text-slate-500 text-sm">
          The video animation for this section is currently being composed.
        </p>
      </div>
    );
  }

  // Get active composition dynamically
  const ActiveComponent = getComposition(config.compositionId) || PrimitivesExplainer;

  // Speak narration function
  const speakCue = (cueIndex: number) => {
    if (!voiceNarration || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cue = config.cues[cueIndex];
    if (!cue) return;

    const textToSpeak = cue.narrationScript || `${cue.title}. ${cue.subtitle}`;
    setSpokenText(textToSpeak);

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.98; // Natural, clear conversational pacing
    utterance.pitch = 1.0;

    // Pick English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Sync speech with playback
  useEffect(() => {
    if (!isPlaying) {
      window.speechSynthesis?.cancel();
    } else {
      speakCue(currentCueIndex);
    }
  }, [currentCueIndex, isPlaying, voiceNarration]);

  // Frame synchronization loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const frame = playerRef.current.getCurrentFrame();
        const currentSeconds = frame / config.fps;
        const playing = playerRef.current.isPlaying();
        setIsPlaying(playing);

        // Find which cue we are currently in
        const cueIdx = config.cues.findIndex((c, i) => {
          const nextCue = config.cues[i + 1];
          if (!nextCue) return true;
          return currentSeconds >= c.timeInSeconds && currentSeconds < nextCue.timeInSeconds;
        });

        if (cueIdx !== -1 && cueIdx !== currentCueIndex) {
          setCurrentCueIndex(cueIdx);
        }

        // Check if finished
        const totalFrames = config.durationInSeconds * config.fps;
        if (frame >= totalFrames - 2 && !playing) {
          onVideoEnd?.();
        }
      }
    }, 150);

    return () => clearInterval(interval);
  }, [config.fps, config.cues, currentCueIndex, config.durationInSeconds, onVideoEnd]);

  const seekToCue = (seconds: number, index: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(seconds * config.fps);
      playerRef.current.play();
      setCurrentCueIndex(index);
    }
  };

  const currentCue = config.cues[currentCueIndex];
  const isIntro = config.type === 'intro-problem';
  const isOutro = config.type === 'outro-mastery';

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-fade-in">
      {/* Dynamic Video Arc Banner */}
      <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 shadow-xl ${
        isIntro
          ? 'bg-gradient-to-r from-rose-950/50 via-slate-900 to-amber-950/30 border-rose-500/40 text-rose-200'
          : isOutro
          ? 'bg-gradient-to-r from-emerald-950/50 via-slate-900 to-blue-950/30 border-emerald-500/40 text-emerald-200'
          : 'bg-gradient-to-r from-blue-950/50 via-slate-900 to-purple-950/30 border-blue-500/40 text-blue-200'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 border ${
            isIntro
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : isOutro
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
              : 'bg-blue-500/20 border-blue-500/40 text-blue-300'
          }`}>
            {isIntro ? <AlertTriangle className="w-5 h-5 text-rose-400" /> : isOutro ? <Trophy className="w-5 h-5 text-emerald-400" /> : <BookOpen className="w-5 h-5 text-blue-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isIntro
                  ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                  : isOutro
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
              }`}>
                {isIntro ? '🚨 Phase 1: The Problem & The Why' : isOutro ? '🏆 Phase 4: Production Superpower' : '🧠 Phase 2: In-Depth Explainer'}
              </span>
              <span className="text-xs text-slate-400 font-mono">{config.durationInSeconds}s @ {config.fps}fps</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-0.5">{config.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">{config.subtitle}</p>
          </div>
        </div>

        {/* Audio Narration Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const next = !voiceNarration;
              setVoiceNarration(next);
              if (!next) window.speechSynthesis?.cancel();
              else speakCue(currentCueIndex);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
              voiceNarration
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border-purple-400'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
            }`}
          >
            {voiceNarration ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{voiceNarration ? 'Voice Narration: ON' : 'Voice Narration: OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main Video Theater Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-2xl overflow-hidden">
        <div className="rounded-2xl overflow-hidden border border-slate-800 bg-black aspect-video shadow-inner relative">
          <Player
            ref={playerRef}
            component={ActiveComponent}
            durationInFrames={config.durationInSeconds * config.fps}
            compositionWidth={config.width}
            compositionHeight={config.height}
            fps={config.fps}
            controls
            autoPlay={false}
            loop
            style={{
              width: '100%',
              height: '100%'
            }}
          />
        </div>

        {/* Live Synchronized Subtitle & Narration Prompter */}
        {currentCue && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-950 border border-purple-500/30 flex items-start gap-3.5 shadow-lg">
            <Volume2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 animate-pulse" />
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-300 font-mono flex items-center gap-2">
                  <span>NOW SPEAKING • SCENE 0{currentCueIndex + 1}</span>
                  <span className="text-[10px] text-purple-400 bg-purple-950/80 px-2 py-0.2 rounded border border-purple-500/30">
                    0:{currentCue.timeInSeconds.toString().padStart(2, '0')}
                  </span>
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  {isPlaying ? '▶ Narration playing' : '⏸ Press Play in video to listen'}
                </span>
              </div>
              <p className="text-sm font-medium text-white leading-relaxed font-sans bg-purple-950/20 p-2.5 rounded-xl border border-purple-500/20">
                "{currentCue.narrationScript || currentCue.subtitle}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Chapter Moments */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="font-bold text-sm text-white">Story Chapters (Click to Jump)</h3>
          </div>
          <span className="text-xs text-slate-500">Jump directly to any story beat with synchronized voice & graphics</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {config.cues.map((cue, idx) => {
            const isCurrent = currentCueIndex === idx;

            return (
              <button
                key={idx}
                onClick={() => seekToCue(cue.timeInSeconds, idx)}
                className={`text-left p-3.5 rounded-xl border transition-all group flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-purple-950/40 border-purple-500/60 shadow-lg shadow-purple-900/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-purple-400 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20">
                      0:{cue.timeInSeconds.toString().padStart(2, '0')}
                    </span>
                    <Play className={`w-3 h-3 transition-all ${isCurrent ? 'text-purple-400 scale-110' : 'text-slate-500 group-hover:text-purple-400'}`} />
                  </div>
                  <h4 className="font-bold text-xs text-slate-200 group-hover:text-white line-clamp-1">
                    {cue.title}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {cue.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
