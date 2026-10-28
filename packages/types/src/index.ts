// Curriculum Types
export interface ModuleMetadata {
  id: string;
  order: number;
  title: string;
  description: string;
  icon: string; // e.g. "Boxes", "Binary", "Cpu", "Code"
  badge: string;
}

export interface SectionMetadata {
  id: string;
  moduleId: string;
  order: number;
  title: string;
  slug: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  xp: number;
  durationMinutes: number;
  status: 'draft' | 'published';
  features: {
    hasExplanation: boolean;
    hasVideo: boolean;
    hasGame: boolean;
    hasIntroVideo?: boolean;
    hasOutroVideo?: boolean;
  };
}

export interface SectionContent {
  meta: SectionMetadata;
  introVideo?: VideoConfig;   // The Problem / Why We Need This (Before section starts)
  outroVideo?: VideoConfig;   // Real-World Application & Superpower Unlocked (After section ends)
  explanation: {
    title: string;
    summary: string;
    sections: {
      heading: string;
      content: string;
      codeSnippet?: string;
      tip?: string;
      warning?: string;
    }[];
  };
  videoConfig?: VideoConfig;  // Backward compatibility
  gameConfig?: GameConfig;
}

// Remotion Video Types
export interface RemotionCue {
  timeInSeconds: number;
  title: string;
  subtitle: string;
  narrationScript: string;   // Spoken narration audio text
  highlightLine?: number;
  codeSnippet?: string;
  visualTag?: 'disaster' | 'fix' | 'production' | 'memory';
}

export interface VideoConfig {
  compositionId: string;
  type: 'intro-problem' | 'outro-mastery' | 'explainer';
  title: string;
  subtitle: string;
  durationInSeconds: number;
  fps: number;
  width: number;
  height: number;
  cues: RemotionCue[];
}

// Game System Types
export type GameMode = 'practice' | 'time-attack' | 'boss-battle';

export interface TypeMatchItem {
  id: string;
  valueRepresentation: string; // e.g. '"Hello World"', '42', 'true', 'null', '100n'
  valueExplanation: string;
  correctType: string;        // e.g. 'string', 'number', 'boolean', 'null', 'bigint'
  distractorTypes: string[];  // e.g. ['number', 'any', 'object']
}

export interface GameLevel {
  levelNumber: number;
  title: string;
  description: string;
  timeLimitSeconds?: number;
  targetScore: number;
  items: TypeMatchItem[];
}

export interface BossPhase {
  bossName: string;
  bossHealth: number;
  timeLimitSeconds: number;
  attackIntervalMs: number;
  challenges: {
    prompt: string;
    brokenCode: string;
    fixedCodeOptions: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface GameConfig {
  gameId: string;
  title: string;
  subtitle: string;
  modes: GameMode[];
  levels: GameLevel[];
  bossPhase?: BossPhase;
}

export interface GameResult {
  sectionId: string;
  mode: GameMode;
  level: number;
  score: number;
  accuracy: number;
  completedAt: string;
  earnedXp: number;
}

// API and Compiler Types
export interface CompilerCheckRequest {
  code: string;
  expectedType?: string;
}

export interface CompilerDiagnostic {
  line: number;
  character: number;
  message: string;
  code: number;
}

export interface CompilerCheckResult {
  success: boolean;
  diagnostics: CompilerDiagnostic[];
  transpiledJs?: string;
}

export interface UserProgress {
  completedSections: string[];
  totalXp: number;
  streakDays: number;
  highScores: Record<string, number>;
}
