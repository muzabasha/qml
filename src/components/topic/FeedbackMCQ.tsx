import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Trophy, ChevronRight } from 'lucide-react';
import type { MCQ } from '../../types';

interface Props {
  questions: MCQ[];
}

export default function FeedbackMCQ({ questions }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const q = questions[current];
  const score = Object.entries(answers).filter(
    ([id, ans]) => questions.find(q => q.id === id)?.correctAnswer === ans
  ).length;

  const reset = () => { setAnswers({}); setSubmitted(false); setCurrent(0); };
  const select = (label: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [q.id]: label }));
  };

  const diffColor = { Easy: 'text-emerald-600 dark:text-emerald-400', Medium: 'text-amber-600 dark:text-amber-400', Hard: 'text-red-600 dark:text-red-400' };

  if (submitted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
        {/* Score Card */}
        <div className={`rounded-2xl p-8 text-center ${pct >= 80 ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : pct >= 60 ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800' : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'}`}>
          <Trophy size={40} className={`mx-auto mb-3 ${pct >= 80 ? 'text-emerald-500' : pct >= 60 ? 'text-amber-500' : 'text-red-400'}`} />
          <p className="text-4xl font-black text-slate-900 dark:text-white">{score}/{questions.length}</p>
          <p className="text-lg font-semibold mt-1 text-slate-600 dark:text-slate-300">{pct}% — {pct >= 80 ? '🌟 Excellent!' : pct >= 60 ? '👍 Good Work!' : '📚 Keep Studying!'}</p>
        </div>

        {/* Review */}
        <div className="space-y-4">
          {questions.map((ques, i) => {
            const chosen = answers[ques.id];
            const correct = chosen === ques.correctAnswer;
            return (
              <div key={ques.id} className={`rounded-2xl border p-5 ${correct ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800' : 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800'}`}>
                <div className="flex items-start gap-3 mb-3">
                  {correct ? <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" /> : <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />}
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Q{i + 1}: {ques.question}</p>
                </div>
                <div className="ml-7 space-y-1 text-xs">
                  {!correct && <p className="text-red-600 dark:text-red-400">Your answer: <strong>{chosen || 'Not answered'}</strong></p>}
                  <p className="text-emerald-700 dark:text-emerald-300">Correct: <strong>{ques.correctAnswer}</strong></p>
                  <p className="text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">{ques.explanation}</p>
                </div>
              </div>
            );
          })}
        </div>

        <button onClick={reset} className="btn-secondary w-full flex items-center justify-center gap-2">
          <RotateCcw size={16} /> Retry Quiz
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-semibold text-slate-600 dark:text-slate-400">Question {current + 1} of {questions.length}</span>
        <span className={`text-xs font-bold ${diffColor[q.difficulty]}`}>{q.difficulty}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${((current + 1) / questions.length) * 100}%` }} />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={q.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
          <p className="text-base font-semibold text-slate-900 dark:text-white leading-relaxed">
            <HelpCircle size={16} className="inline text-primary-500 mr-2" />
            {q.question}
          </p>
          <div className="grid gap-3">
            {q.options.map(opt => {
              const selected = answers[q.id] === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => select(opt.label)}
                  className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${
                    selected
                      ? 'bg-primary-50 dark:bg-primary-900/30 border-primary-400 dark:border-primary-600 text-primary-800 dark:text-primary-200'
                      : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary-300 dark:hover:border-primary-700'
                  }`}
                >
                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${selected ? 'bg-primary-500 border-primary-500 text-white' : 'border-slate-300 dark:border-slate-600'}`}>
                    {opt.label}
                  </span>
                  {opt.text}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4">
        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} className="btn-secondary disabled:opacity-40 text-sm px-4 py-2">← Prev</button>
        {current < questions.length - 1 ? (
          <button onClick={() => setCurrent(c => c + 1)} disabled={!answers[q.id]} className="btn-primary flex items-center gap-2 text-sm px-4 py-2 disabled:opacity-40">
            Next <ChevronRight size={16} />
          </button>
        ) : (
          <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length} className="btn-quantum flex items-center gap-2 text-sm px-4 py-2 disabled:opacity-40">
            Submit Quiz <Trophy size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
