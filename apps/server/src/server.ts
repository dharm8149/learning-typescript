import express, { Request, Response } from 'express';
import cors from 'cors';
import ts from 'typescript';
import { getAllModules, getSectionContent } from '@ts-learn/content';
import { getGameForSection } from '@ts-learn/games';
import { CompilerCheckRequest, CompilerCheckResult, UserProgress } from '@ts-learn/types';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// In-memory progress store for demo/development
const userProgress: UserProgress = {
  completedSections: [],
  totalXp: 0,
  streakDays: 1,
  highScores: {}
};

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'TypeScript Learning API', timestamp: new Date().toISOString() });
});

// Curriculum: All Modules
app.get('/api/modules', (req: Request, res: Response) => {
  res.json(getAllModules());
});

// Curriculum: Single Section Content & Video
app.get('/api/sections/:sectionId', (req: Request, res: Response) => {
  const content = getSectionContent(req.params.sectionId);
  if (!content) {
    return res.status(404).json({ error: `Section '${req.params.sectionId}' not found.` });
  }
  res.json(content);
});

// Game Configuration for a Section
app.get('/api/games/:sectionId', (req: Request, res: Response) => {
  const game = getGameForSection(req.params.sectionId);
  if (!game) {
    return res.status(404).json({ error: `No game configured for section '${req.params.sectionId}'.` });
  }
  res.json(game);
});

// Live TypeScript Compiler Sandbox API
app.post('/api/compiler/check', (req: Request, res: Response) => {
  const { code } = req.body as CompilerCheckRequest;

  if (typeof code !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid code property.' });
  }

  try {
    // 1. Transpile code to test syntax & emit JS
    const transpileResult = ts.transpileModule(code, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
        strict: true
      },
      reportDiagnostics: true
    });

    // 2. Extract compiler diagnostics
    const diagnostics = (transpileResult.diagnostics || []).map((diag) => {
      let line = 1;
      let character = 0;
      if (diag.file && diag.start !== undefined) {
        const pos = diag.file.getLineAndCharacterOfPosition(diag.start);
        line = pos.line + 1;
        character = pos.character + 1;
      }
      return {
        line,
        character,
        message: ts.flattenDiagnosticMessageText(diag.messageText, '\n'),
        code: diag.code
      };
    });

    const result: CompilerCheckResult = {
      success: diagnostics.length === 0,
      diagnostics,
      transpiledJs: transpileResult.outputText
    };

    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: 'Compiler evaluation failed', details: err?.message });
  }
});

// Progress: Get Current Progress
app.get('/api/progress', (req: Request, res: Response) => {
  res.json(userProgress);
});

// Progress: Record Section Completion & XP
app.post('/api/progress/complete-section', (req: Request, res: Response) => {
  const { sectionId, xp } = req.body;
  if (sectionId && !userProgress.completedSections.includes(sectionId)) {
    userProgress.completedSections.push(sectionId);
    userProgress.totalXp += Number(xp) || 100;
  }
  res.json(userProgress);
});

// Progress: Record Game Score
app.post('/api/progress/game-score', (req: Request, res: Response) => {
  const { gameId, score, xp } = req.body;
  if (gameId) {
    const currentHigh = userProgress.highScores[gameId] || 0;
    if (score > currentHigh) {
      userProgress.highScores[gameId] = score;
    }
    userProgress.totalXp += Number(xp) || 50;
  }
  res.json(userProgress);
});

app.listen(PORT, () => {
  console.log(`🚀 TypeScript Learning API server running at http://localhost:${PORT}`);
});
