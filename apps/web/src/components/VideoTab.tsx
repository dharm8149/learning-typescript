import React, { useRef, useState, useEffect } from 'react';
import { Player, PlayerRef } from '@remotion/player';
import { VideoConfig } from '@ts-learn/types';
import { getComposition, PrimitivesExplainer } from '@ts-learn/remotion';
import { Play, Film, Pause, Volume2, VolumeX, SkipForward, SkipBack } from 'lucide-react';

interface VideoTabProps {
  config?: VideoConfig;
  onVideoEnd?: () => void;
}

export const VideoTab: React.FC<VideoTabProps> = ({ config, onVideoEnd }) => {
  const playerRef = useRef<PlayerRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentCueIndex, setCurrentCueIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [voiceNarration, setVoiceNarration] = useState(false);
  const [duration, setDuration] = useState(config?.durationInSeconds || 0);
  const [isSeeking, setIsSeeking] = useState(false);

  if (!config) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-4">
        <Film className="w-16 h-16 text-gray-400 mx-auto" />
        <h3 className="text-lg font-bold text-gray-600">Video Coming Soon</h3>
        <p className="text-sm text-gray-500">The video for this section is being prepared.</p>
      </div>
    );
  }

  const ActiveComponent = getComposition(config.compositionId) || PrimitivesExplainer;

  // Speak narration function
  const speakCue = (cueIndex: number) => {
    if (!voiceNarration || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const cue = config.cues[cueIndex];
    if (!cue) return;

    const textToSpeak = cue.narrationScript || `${cue.title}. ${cue.subtitle}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((v) => v.lang.startsWith('en'));
    if (englishVoice) utterance.voice = englishVoice;

    window.speechSynthesis.speak(utterance);
  };

  // Sync playback time and cues
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        const frame = playerRef.current.getCurrentFrame();
        const currentSeconds = frame / config.fps;
        const playing = playerRef.current.isPlaying();
        setIsPlaying(playing);
        setCurrentTime(currentSeconds);

        // Find which cue we are currently in
        const cueIdx = config.cues.findIndex((c, i) => {
          const nextCue = config.cues[i + 1];
          if (!nextCue) return true;
          return currentSeconds >= c.timeInSeconds && currentSeconds < nextCue.timeInSeconds;
        });

        if (cueIdx !== -1 && cueIdx !== currentCueIndex) {
          setCurrentCueIndex(cueIdx);
          if (voiceNarration) speakCue(cueIdx);
        }

        // Check if finished
        const totalFrames = config.durationInSeconds * config.fps;
        if (frame >= totalFrames - 2) {
          onVideoEnd?.();
        }
      }
    }, 250);

    return () => clearInterval(interval);
  }, [config.fps, config.cues, currentCueIndex, voiceNarration, onVideoEnd]);

  // Narration sync on play/pause
  useEffect(() => {
    if (!isPlaying) {
      window.speechSynthesis?.cancel();
    } else if (voiceNarration) {
      speakCue(currentCueIndex);
    }
  }, [isPlaying, voiceNarration]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
    }
  };

  const seekBy = (seconds: number) => {
    if (playerRef.current) {
      const currentFrame = playerRef.current.getCurrentFrame();
      const newFrame = Math.max(0, currentFrame + seconds * config.fps);
      playerRef.current.seekTo(newFrame);
    }
  };

  const seekToCue = (timeSeconds: number, index: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(timeSeconds * config.fps);
      if (!isPlaying) playerRef.current.play();
      setCurrentCueIndex(index);
    }
  };

  const currentCue = config.cues[currentCueIndex];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Video Player */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="relative aspect-video bg-black">
          <Player
            ref={playerRef}
            component={ActiveComponent}
            durationInFrames={config.durationInSeconds * config.fps}
            compositionWidth={config.width}
            compositionHeight={config.height}
            fps={config.fps}
            controls={false}
            autoPlay={false}
            loop={false}
            className="w-full h-full"
          />

          {/* Play/Pause Overlay */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                <Play className="w-6 h-6 text-gray-900 ml-1" />
              </div>
            </button>
          )}
        </div>

        {/* Controls Bar */}
        <div className="px-4 py-3 flex items-center gap-3 bg-gray-50 border-t border-gray-200">
          <button
            onClick={togglePlay}
            className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-700 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>

          <button onClick={() => seekBy(-10)} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 text-xs font-bold">
            -10s
          </button>
          <button onClick={() => seekBy(10)} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-500 text-xs font-bold">
            +10s
          </button>

          {/* Progress Bar */}
          <div className="flex-1 relative">
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
              <div
                className="h-full bg-blue-600 rounded-full transition-all"
                style={{ width: `${(currentTime / config.durationInSeconds) * 100}%` }}
              />
            </div>
          </div>

          <span className="text-xs font-mono text-gray-500">
            {formatTime(currentTime)} / {formatTime(config.durationInSeconds)}
          </span>

          <button
            onClick={() => {
              const next = !voiceNarration;
              setVoiceNarration(next);
              if (!next) window.speechSynthesis?.cancel();
            }}
            className={`p-1.5 rounded-lg transition-colors ${
              voiceNarration ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-200'
            }`}
            title={voiceNarration ? 'Disable narration' : 'Enable narration'}
          >
            {voiceNarration ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Current Scene Info */}
      {currentCue && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-start gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 animate-pulse" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-gray-400">
                Scene {currentCueIndex + 1} of {config.cues.length}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs font-mono text-gray-500">
                {formatTime(currentCue.timeInSeconds)}
              </span>
            </div>
            <h4 className="font-bold text-sm text-gray-900">{currentCue.title}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{currentCue.subtitle}</p>
          </div>
        </div>
      )}

      {/* Chapters */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-3">Video Chapters</h3>
        <div className="space-y-1">
          {config.cues.map((cue, idx) => {
            const isCurrent = currentCueIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => seekToCue(cue.timeInSeconds, idx)}
                className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${
                  isCurrent
                    ? 'bg-blue-50 border border-blue-200'
                    : 'hover:bg-gray-50 border border-transparent'
                }`}
              >
                <span className="w-16 text-xs font-mono text-gray-500 shrink-0">
                  {formatTime(cue.timeInSeconds)}
                </span>
                <div className="flex-1 min-w-0">
                  <span className={`text-xs font-bold ${isCurrent ? 'text-blue-700' : 'text-gray-700'}`}>
                    {cue.title}
                  </span>
                  <p className="text-[11px] text-gray-500 truncate">{cue.subtitle}</p>
                </div>
                {isCurrent && (
                  <div className="w-2 h-2 rounded-full bg-blue-600 shrink-0 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
