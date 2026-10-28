import React, { useState } from 'react';
import { SectionContent } from '@ts-learn/types';
import {
  Check,
  AlertTriangle,
  Lightbulb,
  Terminal,
  Copy,
  Play,
  HelpCircle,
  Undo2,
  Database,
  ShieldCheck,
  BookOpen
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
  // --- Interactive Memory Simulator State ---
  interface StackFrame {
    id: string;
    varName: string;
    type: string;
    value: string;
    address: string;
  }

  const [stackFrames, setStackFrames] = useState<StackFrame[]>([
    { id: '1', varName: 'score', type: 'number', value: '42', address: '0x00A1' },
    { id: '2', varName: 'name', type: 'string', value: '"Ada"', address: '0x00A2' },
    { id: '3', varName: 'isActive', type: 'boolean', value: 'true', address: '0x00A3' }
  ]);
  const [memoryMessage, setMemoryMessage] = useState('Click any action below to simulate V8 stack memory allocation!');

  const allocateMemory = (varName: string, type: string, value: string) => {
    const randomAddr = '0x' + Math.floor(Math.random() * 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
    setStackFrames((prev) => [
      ...prev,
      { id: Date.now().toString(), varName, type, value, address: randomAddr }
    ]);
    setMemoryMessage(`Allocated primitive '${type}' on Call Stack at ${randomAddr}. Stored directly by value!`);
  };

  const clearMemory = () => {
    setStackFrames([]);
    setMemoryMessage('Stack memory flushed.');
  };

  // --- Interactive Code Diff Bug Cards State ---
  const [fixedCards, setFixedCards] = useState<Record<number, boolean>>({});

  const toggleFix = (index: number) => {
    setFixedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // --- Interactive Micro-Quiz State ---
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

  // --- Live Compiler Sandbox State ---
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

  const isAnswerCorrect = (qIdx: number, optIdx: number) => {
    const q = quizQuestions[qIdx];
    if (!q || quizScore === null) return 'neutral';
    const isSelected = selectedAnswers[qIdx] === optIdx;
    const isCorrectAnswer = optIdx === q.correct;
    if (isSelected && isCorrectAnswer) return 'correct';
    if (isSelected && !isCorrectAnswer) return 'wrong-selected';
    if (!isSelected && isCorrectAnswer) return 'show-correct';
    return 'neutral';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Hero Header */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950/40 to-indigo-950/50 border border-slate-800 p-8">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
              {content.meta.title}
            </span>
            <span className="text-xs text-slate-400">TypeScript 5.8</span>
          </div>

          <h2 className="text-3xl font-bold text-white tracking-tight">
            {content.explanation.title}
          </h2>

          <p className="text-slate-300 text-sm leading-relaxed">
            {content.explanation.summary}
          </p>

          <button
            onClick={onCompleteSection}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
            }`}
          >
            <Check className="w-4 h-4" />
            {isCompleted ? 'Completed' : 'Mark Section Complete'}
          </button>
        </div>
      </div>

      {/* Core Content Sections */}
      <div className="space-y-8">
        {content.explanation.sections.map((sec, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-200 rounded-2xl p-7 space-y-4 hover:border-gray-300 transition-colors shadow-sm"
          >
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs font-mono font-bold">
                0{idx + 1}
              </span>
              {sec.heading}
            </h3>

            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
              {sec.content}
            </div>

            {sec.codeSnippet && (
              <div className="relative group">
                <button
                  onClick={() => copyCode(sec.codeSnippet!, idx)}
                  className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity z-10 px-2 py-1 rounded-lg bg-gray-700 text-gray-300 text-xs flex items-center gap-1.5"
                >
                  <Copy className="w-3 h-3" />
                  {copiedIndex === idx ? 'Copied!' : 'Copy'}
                </button>
                <pre className="bg-gray-950 p-4 rounded-xl text-xs border border-gray-800 text-blue-300 overflow-x-auto leading-relaxed font-mono">
                  <code>{sec.codeSnippet}</code>
                </pre>
              </div>
            )}

            {sec.tip && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3 text-xs text-blue-800">
                <Lightbulb className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-700">TypeScript Insight: </span>
                  {sec.tip}
                </div>
              </div>
            )}

            {sec.warning && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-amber-700">JavaScript Quirk: </span>
                  {sec.warning}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Memory Model */}
      <div className="bg-white border border-gray-200 rounded-2xl p-7 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-500" />
              Memory Model Simulator
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Primitives in JavaScript/TypeScript are stored <strong>directly on the Execution Stack</strong> and are compared by value.
            </p>
          </div>
          <button
            onClick={clearMemory}
            className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-semibold flex items-center gap-1.5 border border-gray-200"
          >
            <Undo2 className="w-3.5 h-3.5" />
            Flush Stack
          </button>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider">
            Push Primitive to Call Stack:
          </span>
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => allocateMemory('token', 'string', '"Bearer_99"')}
              className="px-3.5 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 text-xs font-mono font-bold transition-all"
            >
              + string ('"Bearer_99"')
            </button>
            <button
              onClick={() => allocateMemory('userAge', 'number', '32')}
              className="px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-700 text-xs font-mono font-bold transition-all"
            >
              + number (32)
            </button>
            <button
              onClick={() => allocateMemory('isVerified', 'boolean', 'true')}
              className="px-3.5 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-mono font-bold transition-all"
            >
              + boolean (true)
            </button>
            <button
              onClick={() => allocateMemory('bigIntCounter', 'bigint', '9007199254740995n')}
              className="px-3.5 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-xs font-mono font-bold transition-all"
            >
              + bigint (9007...n)
            </button>
            <button
              onClick={() => allocateMemory('activeSession', 'null', 'null')}
              className="px-3.5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-700 text-xs font-mono font-bold transition-all"
            >
              + null
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 text-xs font-mono text-purple-300">
          ⚡ Status: {memoryMessage}
        </div>

        {/* Visual Stack Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Stack Memory Frames */}
          <div className="bg-gray-950 rounded-xl border border-gray-800 p-5 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold text-gray-400 pb-2 border-b border-gray-800">
              <span>Address</span>
              <span>Variable</span>
              <span>Value</span>
            </div>

            <div className="space-y-2 max-h-[260px] overflow-y-auto">
              {stackFrames.length === 0 ? (
                <div className="text-center py-10 text-gray-600 text-xs">
                  Stack is empty. Click an allocation button above!
                </div>
              ) : (
                stackFrames.map((frame) => (
                  <div
                    key={frame.id}
                    className="p-3 rounded-lg bg-gray-900 border border-purple-500/30 flex items-center justify-between text-xs font-mono shadow"
                  >
                    <span className="text-purple-400 font-bold">{frame.address}</span>
                    <div>
                      <span className="text-blue-300 font-bold">{frame.varName}</span>
                      <span className="text-gray-500">: </span>
                      <span className="text-emerald-400">{frame.type}</span>
                      <span className="text-gray-500"> = </span>
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

          {/* Memory Explanation */}
          <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4 text-xs text-gray-700 leading-relaxed">
            <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              Why Primitives Are Immutable
            </h4>
            <p>
              When a primitive is assigned or passed to a function, the <strong>exact value</strong> is copied — not a reference.
            </p>
            <p>
              <strong>Example:</strong> If `let a = 42; let b = a;` then modifying `b` does <em>not</em> affect `a` — they occupy separate stack slots.
            </p>
            <p className="text-gray-500">
              <strong>Reference types</strong> (objects, arrays) are different — they store a memory address, not the value itself. This is why object assignments create <em>shared references</em>, not copies.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Quiz */}
      <div className="bg-white border border-gray-200 rounded-2xl p-7 space-y-6 shadow-sm">
        <div className="flex items-center gap-2 border-b border-gray-200 pb-4">
          <HelpCircle className="w-5 h-5 text-emerald-500" />
          <h3 className="text-lg font-bold text-gray-900">Knowledge Check</h3>
          {quizScore !== null && (
            <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Score: {quizScore}/{quizQuestions.length}
            </span>
          )}
        </div>

        <div className="space-y-6">
          {quizQuestions.map((q, qIdx) => (
            <div key={qIdx} className="space-y-3">
              <p className="text-sm font-semibold text-gray-900">
                <span className="text-blue-600 font-mono mr-2">{qIdx + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2 ml-6">
                {q.options.map((opt, optIdx) => {
                  const status = isAnswerCorrect(qIdx, optIdx);
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(qIdx, optIdx)}
                      disabled={quizScore !== null}
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-mono border transition-all ${
                        status === 'correct'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : status === 'wrong-selected'
                          ? 'bg-red-50 border-red-300 text-red-700'
                          : status === 'show-correct'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                      } ${quizScore !== null ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <span className="flex items-center gap-2">
                        {status === 'correct' && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                        {status === 'wrong-selected' && <span className="w-3.5 h-3.5 rounded-full border-2 border-red-400" />}
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
              {(quizScore !== null || selectedAnswers[qIdx] !== undefined) && (
                <p className="text-xs text-gray-500 ml-6 bg-gray-50 p-3 rounded-lg">
                  💡 {q.explanation}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button
            onClick={evaluateQuiz}
            disabled={quizScore !== null || Object.keys(selectedAnswers).length === 0}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-gray-300 text-white text-xs font-bold transition-all"
          >
            {quizScore !== null ? 'Already Evaluated' : 'Evaluate Answers'}
          </button>
        </div>
      </div>

      {/* Live Compiler Playground */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-b border-gray-200">
          <div className="flex items-center gap-2.5">
            <Terminal className="w-5 h-5 text-blue-500" />
            <h3 className="font-bold text-sm text-gray-900">TypeScript Compiler Playground</h3>
          </div>
          <button
            onClick={handleRunCompiler}
            disabled={isCompiling}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white text-xs font-bold flex items-center gap-2 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            {isCompiling ? 'Checking...' : 'Run Type Checker'}
          </button>
        </div>

        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white">
          <div>
            <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              TypeScript Source:
            </label>
            <textarea
              value={sandboxCode}
              onChange={(e) => setSandboxCode(e.target.value)}
              rows={9}
              className="w-full bg-gray-950 text-slate-100 font-mono text-xs p-3.5 rounded-lg border border-gray-800 focus:outline-none focus:border-blue-500 leading-relaxed resize-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-gray-500 uppercase tracking-wider mb-2 block">
              Compiler Output:
            </label>
            <div className="h-[188px] bg-gray-950 rounded-lg border border-gray-800 p-3.5 overflow-y-auto font-mono text-xs">
              {!compilerResult ? (
                <div className="h-full flex items-center justify-center text-gray-500 text-center px-4">
                  Type your code on the left and click 'Run Type Checker' to evaluate syntax & type errors.
                </div>
              ) : compilerResult.success ? (
                <div className="space-y-3">
                  <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Check className="w-4 h-4" />
                    <span>0 Errors! Type check passed.</span>
                  </div>
                  <div className="text-gray-400 text-[11px]">
                    <span className="text-gray-300 font-semibold block mb-1">Transpiled JavaScript:</span>
                    <pre className="bg-gray-900 p-2.5 rounded border border-gray-800 text-gray-300">
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
                    <div key={i} className="text-rose-300 bg-rose-950/40 p-2.5 rounded border border-rose-500/30">
                      <span className="text-gray-400 font-semibold">Line {d.line}:{d.character}</span> — {d.message}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
