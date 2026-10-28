import React, { useState } from 'react';
import { SectionContent } from '@ts-learn/types';
import {
  Play,
  Check,
  AlertTriangle,
  Lightbulb,
  Terminal,
  Copy,
  Layers,
  Cpu,
  Eye,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Database,
  Binary,
  ShieldCheck,
  Undo2
} from 'lucide-react';

interface ExplanationTabProps {
  content: SectionContent;
  onCompleteSection: () => void;
  isCompleted: boolean;
}

export const ExplanationTab: React.FC<ExplanationTabProps> = ({
  content,
  onCompleteSection,
  isCompleted
}) => {
  // Navigation within the explanation page
  const [activeSubTab, setActiveSubTab] = useState<'theory' | 'memory-visualizer' | 'space-inspector' | 'code-diffs' | 'quiz'>('theory');

  // --- 1. Interactive Memory Simulator State ---
  interface StackFrame {
    id: string;
    varName: string;
    type: string;
    value: string;
    address: string;
    isImmutable: boolean;
  }

  const [stackFrames, setStackFrames] = useState<StackFrame[]>([
    { id: '1', varName: 'score', type: 'number', value: '42', address: '0x00A1', isImmutable: true },
    { id: '2', varName: 'name', type: 'string', value: '"Ada"', address: '0x00A2', isImmutable: true },
    { id: '3', varName: 'isActive', type: 'boolean', value: 'true', address: '0x00A3', isImmutable: true }
  ]);
  const [memoryMessage, setMemoryMessage] = useState('Click any action below to simulate V8 stack memory allocation!');

  const allocateMemory = (varName: string, type: string, value: string) => {
    const randomAddr = '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    setStackFrames((prev) => [
      ...prev,
      { id: Date.now().toString(), varName, type, value, address: randomAddr, isImmutable: true }
    ]);
    setMemoryMessage(`Allocated primitive '${type}' on Call Stack at ${randomAddr}. Stored directly by value!`);
  };

  const clearMemory = () => {
    setStackFrames([]);
    setMemoryMessage('Stack memory flushed.');
  };

  // --- 2. Type Space vs Value Space Inspector State ---
  const [viewMode, setViewMode] = useState<'typescript' | 'javascript'>('typescript');

  // --- 3. Interactive Code Diff Bug Cards State ---
  const [fixedCards, setFixedCards] = useState<Record<number, boolean>>({});

  const toggleFix = (index: number) => {
    setFixedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // --- 4. Interactive Micro-Quiz State ---
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const quizQuestions = [
    {
      question: "Which of the following is NOT one of the 7 primitive types in JavaScript/TypeScript?",
      options: ["symbol", "bigint", "object", "undefined"],
      correct: 2,
      explanation: "Objects (including arrays, functions, and plain objects) are reference types stored in Heap memory, not primitives."
    },
    {
      question: "What is the runtime result of `typeof null` in JavaScript?",
      options: ["'null'", "'undefined'", "'object'", "'void'"],
      correct: 2,
      explanation: "`typeof null === 'object'` is a legacy bug dating back to JavaScript's first release in 1995. TypeScript models `null` as its own distinct type."
    },
    {
      question: "What happens to TypeScript type annotations during the compilation build step?",
      options: [
        "They are converted to runtime `assert()` statements",
        "They are completely erased, leaving standard JavaScript (Type Erasure)",
        "They are stored in a hidden `.types` metadata object",
        "They throw runtime errors if types do not match"
      ],
      correct: 1,
      explanation: "TypeScript performs zero-overhead Type Erasure. Types vanish at compile time and incur zero runtime bundle size or CPU penalty."
    }
  ];

  const handleSelectAnswer = (qIdx: number, optIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const evaluateQuiz = () => {
    let correctCount = 0;
    quizQuestions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct) correctCount++;
    });
    setQuizScore(correctCount);
  };

  // --- 5. Live Compiler Sandbox State ---
  const [sandboxCode, setSandboxCode] = useState(
    `// 1. Primitive declarations\nconst greeting: string = "Hello World";\nlet count: number = 42;\n\n// 2. Uncomment to test compiler diagnostics:\n// count = "forty-two";\n\nconsole.log(\`\${greeting}, count is \${count}\`);`
  );
  const [compilerResult, setCompilerResult] = useState<any>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleRunCompiler = async () => {
    setIsCompiling(true);
    try {
      const res = await fetch('/api/compiler/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: sandboxCode })
      });
      const data = await res.json();
      setCompilerResult(data);
    } catch {
      setCompilerResult({
        success: false,
        diagnostics: [{ line: 1, character: 1, message: 'Could not connect to compiler API' }]
      });
    } finally {
      setIsCompiling(false);
    }
  };

  const copyCode = (snippet: string, idx: number) => {
    navigator.clipboard.writeText(snippet);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-indigo-950/50 border border-blue-500/30 p-8 shadow-2xl">
        <div className="absolute -right-16 -top-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-12 bottom-6 opacity-10 pointer-events-none">
          <Binary className="w-48 h-48 text-blue-400" />
        </div>

        <div className="relative z-10 space-y-4 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              Module 01 • Interactive Theory
            </span>
            <span className="text-xs text-slate-400">TypeScript 5.8 Static Engine</span>
          </div>

          <h2 className="text-3xl font-black text-white tracking-tight">
            {content.explanation.title}
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            {content.explanation.summary}
          </p>

          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={onCompleteSection}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
              }`}
            >
              <Check className="w-4 h-4" />
              {isCompleted ? 'Completed (+150 XP)' : 'Mark Section Complete (+150 XP)'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Sub-Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 shadow-xl backdrop-blur sticky top-20 z-40">
        <button
          onClick={() => setActiveSubTab('theory')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'theory'
              ? 'bg-blue-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Core Theory</span>
        </button>

        <button
          onClick={() => setActiveSubTab('memory-visualizer')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'memory-visualizer'
              ? 'bg-purple-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Database className="w-3.5 h-3.5 text-purple-400" />
          <span>Interactive Memory Model</span>
          <span className="text-[10px] bg-purple-500/20 text-purple-300 px-1.5 py-0.2 rounded font-mono">Sim</span>
        </button>

        <button
          onClick={() => setActiveSubTab('space-inspector')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'space-inspector'
              ? 'bg-indigo-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-indigo-400" />
          <span>Type vs Value Space</span>
        </button>

        <button
          onClick={() => setActiveSubTab('code-diffs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'code-diffs'
              ? 'bg-amber-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Spot the Bug (Interactive Diffs)</span>
        </button>

        <button
          onClick={() => setActiveSubTab('quiz')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeSubTab === 'quiz'
              ? 'bg-emerald-600 text-white shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
          <span>Knowledge Check</span>
        </button>
      </div>

      {/* SUB-TAB 1: CORE THEORY */}
      {activeSubTab === 'theory' && (
        <div className="space-y-8 animate-fade-in">
          {content.explanation.sections.map((sec, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-3xl p-7 space-y-5 hover:border-slate-700/80 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center justify-center text-xs font-mono font-bold">
                    0{idx + 1}
                  </span>
                  {sec.heading}
                </h3>
              </div>

              <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">
                {sec.content}
              </div>

              {sec.codeSnippet && (
                <div className="relative group">
                  <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => copyCode(sec.codeSnippet!, idx)}
                      className="p-1.5 rounded-lg bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700 text-xs flex items-center gap-1.5 shadow"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      {copiedIndex === idx ? 'Copied!' : 'Copy Code'}
                    </button>
                  </div>
                  <pre className="bg-slate-950 p-5 rounded-2xl text-xs border border-slate-800 text-blue-300 overflow-x-auto leading-relaxed font-mono shadow-inner">
                    <code>{sec.codeSnippet}</code>
                  </pre>
                </div>
              )}

              {sec.tip && (
                <div className="bg-gradient-to-r from-blue-950/40 to-slate-900 border border-blue-500/30 rounded-2xl p-4 flex gap-3.5 text-xs text-blue-200">
                  <Lightbulb className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-blue-300 uppercase tracking-wide">TypeScript Insight: </span>
                    {sec.tip}
                  </div>
                </div>
              )}

              {sec.warning && (
                <div className="bg-gradient-to-r from-rose-950/40 to-slate-900 border border-rose-500/30 rounded-2xl p-4 flex gap-3.5 text-xs text-rose-200">
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-rose-300 uppercase tracking-wide">JavaScript Quirk: </span>
                    {sec.warning}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Integrated Live Compiler Playground */}
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800/90 px-6 py-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-2.5">
                <Terminal className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-sm text-white">Live TypeScript Compiler Playground</h3>
              </div>
              <button
                onClick={handleRunCompiler}
                disabled={isCompiling}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                {isCompiling ? 'Checking...' : 'Run Type Checker'}
              </button>
            </div>

            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-950">
              <div>
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  TypeScript Source Code:
                </label>
                <textarea
                  value={sandboxCode}
                  onChange={(e) => setSandboxCode(e.target.value)}
                  rows={9}
                  className="w-full bg-slate-900 text-slate-100 font-mono text-xs p-3.5 rounded-xl border border-slate-800 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
                />
              </div>

              <div>
                <label className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Compiler Diagnostics:
                </label>
                <div className="h-[188px] bg-slate-900 rounded-xl border border-slate-800 p-3.5 overflow-y-auto font-mono text-xs">
                  {!compilerResult ? (
                    <div className="h-full flex items-center justify-center text-slate-500 text-center px-4">
                      Type your code on the left and click 'Run Type Checker' to evaluate syntax & type errors.
                    </div>
                  ) : compilerResult.success ? (
                    <div className="space-y-3">
                      <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                        <Check className="w-4 h-4" />
                        <span>0 Errors! Type check passed.</span>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        <span className="text-slate-300 font-semibold block mb-1">Transpiled JavaScript Output:</span>
                        <pre className="bg-slate-950 p-2.5 rounded border border-slate-800 text-slate-300">
                          {compilerResult.transpiledJs}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-rose-400 font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Compiler Diagnostics ({compilerResult.diagnostics.length}):</span>
                      </div>
                      {compilerResult.diagnostics.map((d: any, i: number) => (
                        <div key={i} className="text-rose-300 bg-rose-950/40 p-2.5 rounded-lg border border-rose-500/30">
                          <span className="text-slate-400 font-semibold">Line {d.line}:{d.character}</span> — {d.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: INTERACTIVE MEMORY MODEL (STACK VS HEAP SIMULATOR) */}
      {activeSubTab === 'memory-visualizer' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900/80 border border-purple-500/30 rounded-3xl p-7 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-purple-400" />
                  <span>Interactive Call Stack Memory Simulator</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Primitives in JavaScript/TypeScript are stored <strong>directly on the Execution Stack</strong> and are compared by value.
                </p>
              </div>
              <button
                onClick={clearMemory}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700"
              >
                <Undo2 className="w-3.5 h-3.5" />
                Flush Stack
              </button>
            </div>

            {/* Action Bar */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Click to Push Primitive to Call Stack:
              </span>
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => allocateMemory('token', 'string', '"Bearer_99"')}
                  className="px-3.5 py-2 rounded-xl bg-blue-950/40 hover:bg-blue-600/30 border border-blue-500/40 text-blue-200 text-xs font-mono font-bold transition-all"
                >
                  + Alloc string ('"Bearer_99"')
                </button>
                <button
                  onClick={() => allocateMemory('userAge', 'number', '32')}
                  className="px-3.5 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-600/30 border border-amber-500/40 text-amber-200 text-xs font-mono font-bold transition-all"
                >
                  + Alloc number (32)
                </button>
                <button
                  onClick={() => allocateMemory('isVerified', 'boolean', 'true')}
                  className="px-3.5 py-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-mono font-bold transition-all"
                >
                  + Alloc boolean (true)
                </button>
                <button
                  onClick={() => allocateMemory('bigIntCounter', 'bigint', '9007199254740995n')}
                  className="px-3.5 py-2 rounded-xl bg-purple-950/40 hover:bg-purple-600/30 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold transition-all"
                >
                  + Alloc bigint (9007...n)
                </button>
                <button
                  onClick={() => allocateMemory('activeSession', 'null', 'null')}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 text-xs font-mono font-bold transition-all"
                >
                  + Alloc null
                </button>
              </div>
            </div>

            {/* Simulator Output Box */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-purple-300">
              ⚡ Status: {memoryMessage}
            </div>

            {/* Visual Stack Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stack Memory Frames */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 pb-2 border-b border-slate-800">
                  <span>Stack Frame (Address)</span>
                  <span>Identifier & Value</span>
                  <span>Immutability</span>
                </div>

                <div className="space-y-2 max-h-[260px] overflow-y-auto">
                  {stackFrames.length === 0 ? (
                    <div className="text-center py-10 text-slate-600 text-xs">
                      Stack is empty. Click an allocation button above!
                    </div>
                  ) : (
                    stackFrames.map((frame) => (
                      <div
                        key={frame.id}
                        className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 flex items-center justify-between text-xs font-mono shadow animate-fade-in"
                      >
                        <span className="text-purple-400 font-bold">{frame.address}</span>
                        <div>
                          <span className="text-blue-300 font-bold">{frame.varName}</span>
                          <span className="text-slate-500">: </span>
                          <span className="text-emerald-400">{frame.type}</span>
                          <span className="text-slate-500"> = </span>
                          <span className="text-amber-300">{frame.value}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                          Immutable
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Memory Explanation Card */}
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4 text-xs text-slate-300 leading-relaxed">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Why Primitives Are Immutable</span>
                </h4>
                <p>
                  When you assign <code className="text-blue-300">let x = 10; x = 20;</code>, JavaScript does <strong>not</strong> change the number 10 into 20. Instead, it creates a new value <code className="text-amber-300">20</code> at a new memory slot and updates the reference address of <code className="text-blue-300">x</code>.
                </p>
                <div className="p-3 bg-purple-950/30 border border-purple-500/30 rounded-xl space-y-1">
                  <span className="font-bold text-purple-300 block">Stack vs Heap Rule:</span>
                  <span>
                    - <strong>Primitives</strong> (string, number, boolean, symbol, bigint, null, undefined) live on the fast Execution Stack.
                    <br />
                    - <strong>Objects & Arrays</strong> live in the dynamic Heap and are passed by pointer reference.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TYPE SPACE VS VALUE SPACE INSPECTOR */}
      {activeSubTab === 'space-inspector' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900/80 border border-indigo-500/30 rounded-3xl p-7 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-indigo-400" />
                  <span>Type Space vs Value Space Erasure Inspector</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Toggle between TypeScript (Compile Time) and Transpiled JavaScript (Runtime) to see type erasure in action.
                </p>
              </div>

              {/* View Switcher */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                <button
                  onClick={() => setViewMode('typescript')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'typescript'
                      ? 'bg-blue-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  TypeScript (Compile Time)
                </button>
                <button
                  onClick={() => setViewMode('javascript')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    viewMode === 'javascript'
                      ? 'bg-amber-600 text-white shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  JavaScript (Runtime Output)
                </button>
              </div>
            </div>

            {/* Code Comparison Card */}
            <div className="relative">
              {viewMode === 'typescript' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span>TYPE SPACE & VALUE SPACE ACTIVE (TypeScript AST)</span>
                  </div>
                  <pre className="bg-slate-950 p-5 rounded-2xl border-2 border-blue-500/40 text-blue-300 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                    <code>{`// Type annotations exist strictly in "Type Space"
type UserID = string | number;

interface UserProfile {
  id: UserID;
  name: string;
  isOnline: boolean;
}

// "Value Space" implementation
function printUser(user: UserProfile): void {
  console.log("User: " + user.name + " (" + user.id + ")");
}`}</code>
                  </pre>
                  <p className="text-xs text-slate-400">
                    All <code className="text-blue-300">type</code>, <code className="text-blue-300">interface</code>, and parameter annotations <code className="text-blue-300">: UserProfile</code> exist exclusively in the compiler's memory.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>VALUE SPACE ONLY (Zero Types at Runtime)</span>
                  </div>
                  <pre className="bg-slate-950 p-5 rounded-2xl border-2 border-amber-500/40 text-amber-300 font-mono text-xs leading-relaxed overflow-x-auto shadow-inner">
                    <code>{`// Notice: All types have vanished completely!
function printUser(user) {
  console.log("User: " + user.name + " (" + user.id + ")");
}`}</code>
                  </pre>
                  <p className="text-xs text-slate-400">
                    Notice how <code className="text-amber-300">type UserID</code> and <code className="text-amber-300">interface UserProfile</code> produce <strong>zero bytes</strong> in the final JavaScript bundle.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: SPOT THE BUG (INTERACTIVE CODE DIFF CARDS) */}
      {activeSubTab === 'code-diffs' && (
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Interactive Bug Spotter & Auto-Fix Challenges</span>
            </h3>
            <p className="text-xs text-slate-400">
              Click <strong>"Apply TypeScript Fix"</strong> on each card to watch how static types prevent runtime catastrophes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {/* Card 1 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Bug 01: Silent Type Coercion in Financial Calculations
                </span>
                <button
                  onClick={() => toggleFix(1)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    fixedCards[1]
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {fixedCards[1] ? 'Show Buggy Code' : 'Apply TypeScript Fix'}
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
                <code>
                  {fixedCards[1]
                    ? `// Fixed: TypeScript prevents string assignment to numerical price!\nlet productPrice: number = 49.99;\n// productPrice = "$49.99"; // ❌ TS2322: Type 'string' is not assignable to type 'number'`
                    : `// Buggy JavaScript:\nlet productPrice = 49.99;\nproductPrice = "$49.99"; // Reassigned to string silently!\nconsole.log(productPrice * 2); // ❌ Runtime NaN in production!`}
                </code>
              </pre>

              <div className="text-xs text-slate-400">
                {fixedCards[1]
                  ? "✅ Safe! The static type annotation : number turns a silent runtime disaster into an instant red squiggle at edit-time."
                  : "⚠️ In vanilla JavaScript, the multiplication prints NaN (Not a Number) to the customer with zero warning during development."}
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Bug 02: BigInt & Number Mixing Error
                </span>
                <button
                  onClick={() => toggleFix(2)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    fixedCards[2]
                      ? 'bg-emerald-600 text-white shadow'
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {fixedCards[2] ? 'Show Buggy Code' : 'Apply TypeScript Fix'}
                </button>
              </div>

              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs text-slate-200">
                <code>
                  {fixedCards[2]
                    ? `// Fixed: Match primitive types explicitly\nconst gasLimit: bigint = 21000n;\nconst gasPrice: bigint = 50n;\nconst totalCost: bigint = gasLimit * gasPrice; // ✅ Safe BigInt math`
                    : `// Buggy Code:\nconst gasLimit = 21000n;\nconst gasPrice = 50;\nconst totalCost = gasLimit * gasPrice; // ❌ Uncaught TypeError: Cannot mix BigInt and other types`}
                </code>
              </pre>

              <div className="text-xs text-slate-400">
                {fixedCards[2]
                  ? "✅ TypeScript forces you to keep numerical representations uniform (both bigint or both number)."
                  : "⚠️ Mixing BigInt with standard Number throws a fatal TypeError at runtime in the browser engine."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: INTERACTIVE KNOWLEDGE CHECK QUIZ */}
      {activeSubTab === 'quiz' && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-slate-900 border border-emerald-500/30 rounded-3xl p-7 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-400" />
                  <span>Knowledge Check: Primitive Mastery</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Answer the questions below to test your understanding before jumping into the games.
                </p>
              </div>
              {quizScore !== null && (
                <div className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/40">
                  Score: {quizScore} / {quizQuestions.length} Correct
                </div>
              )}
            </div>

            <div className="space-y-6">
              {quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white">
                    {qIdx + 1}. {q.question}
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-2">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = selectedAnswers[qIdx] === optIdx;
                      const isCorrect = q.correct === optIdx;
                      const hasEvaluated = quizScore !== null;

                      let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (isSelected) {
                        btnStyle = 'bg-blue-600/30 border-blue-500 text-blue-200';
                      }
                      if (hasEvaluated) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {hasEvaluated && isCorrect && <Check className="w-4 h-4 text-emerald-400" />}
                        </button>
                      );
                    })}
                  </div>

                  {quizScore !== null && (
                    <div className="mt-2 text-xs text-slate-400 p-2.5 bg-slate-900/60 rounded-lg border border-slate-800/80">
                      💡 <span className="font-semibold text-slate-300">Explanation:</span> {q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={evaluateQuiz}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <span>Submit & Check Answers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
