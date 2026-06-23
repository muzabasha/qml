import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, CheckCircle2, HelpCircle, AlertTriangle, Lightbulb, Star } from 'lucide-react';

interface Props {
  question: string;
  answer: string;
  type?: string;
  keyPoints?: string[];
  commonMistake?: string;
  tip?: string;
  marks?: number;
}

export default function QuizCard({ question, answer, type, keyPoints, commonMistake, tip, marks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
      >
        <div className="flex items-start gap-3 min-w-0">
          <HelpCircle size={18} className="text-primary-500 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            {type && (
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-1 block">
                {type} {marks && `• ${marks} marks`}
              </span>
            )}
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">{question}</p>
          </div>
        </div>
        {open ? <ChevronUp size={16} className="flex-shrink-0 mt-1 text-slate-400" /> : <ChevronDown size={16} className="flex-shrink-0 mt-1 text-slate-400" />}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-1 space-y-4 border-t border-slate-100 dark:border-slate-700">
              {/* Answer */}
              <div className="flex gap-3">
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-1" />
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{answer}</p>
              </div>

              {/* Key Points */}
              {keyPoints && keyPoints.length > 0 && (
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4">
                  <p className="text-xs font-bold text-primary-700 dark:text-primary-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Star size={12} /> Key Points
                  </p>
                  <ul className="space-y-1">
                    {keyPoints.map((kp, i) => (
                      <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                        <span className="text-primary-500 mt-0.5">→</span> {kp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Common Mistake */}
              {commonMistake && (
                <div className="flex gap-2 bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
                  <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mb-0.5">Common Mistake</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{commonMistake}</p>
                  </div>
                </div>
              )}

              {/* Tip */}
              {tip && (
                <div className="flex gap-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-3">
                  <Lightbulb size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-0.5">Memory Tip</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">{tip}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
