import { useState } from 'react';
import { motion } from 'framer-motion';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { ChevronDown, ChevronUp, Hash, Calculator, Info, Sigma } from 'lucide-react';

interface TermEntry { term: string; name: string; meaning: string; range?: string; example?: string; }
interface NumericalExample { setup: string; steps: string[]; result: string; }

interface Props {
  formula: string;
  label?: string;
  accent?: 'blue' | 'violet' | 'emerald' | 'amber' | 'red' | 'cyan';
  explanation?: string;
  interpretation?: string;
  motivation?: string;
  terms?: TermEntry[];
  numericalExample?: NumericalExample;
}

const accentMap = {
  blue:    { ring: 'border-blue-300 dark:border-blue-700', bg: 'bg-blue-50 dark:bg-blue-950/30', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
  violet:  { ring: 'border-violet-300 dark:border-violet-700', bg: 'bg-violet-50 dark:bg-violet-950/30', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300' },
  emerald: { ring: 'border-emerald-300 dark:border-emerald-700', bg: 'bg-emerald-50 dark:bg-emerald-950/30', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
  amber:   { ring: 'border-amber-300 dark:border-amber-700', bg: 'bg-amber-50 dark:bg-amber-950/30', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
  red:     { ring: 'border-red-300 dark:border-red-700', bg: 'bg-red-50 dark:bg-red-950/30', badge: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300' },
  cyan:    { ring: 'border-cyan-300 dark:border-cyan-700', bg: 'bg-cyan-50 dark:bg-cyan-950/30', badge: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300' },
};

export function MathBlock({ formula, label, accent = 'blue', explanation, interpretation, motivation, terms, numericalExample }: Props) {
  const [showTerms, setShowTerms] = useState(false);
  const [showNumerical, setShowNumerical] = useState(false);
  const col = accentMap[accent];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`my-6 rounded-2xl border ${col.ring} overflow-hidden`}>
      {/* Label */}
      {label && (
        <div className={`flex items-center gap-2 px-5 py-2.5 ${col.bg} border-b ${col.ring}`}>
          <Sigma size={14} className="opacity-70" />
          <span className="text-xs font-bold tracking-wide uppercase opacity-80">{label}</span>
        </div>
      )}

      {/* Equation */}
      <div className="math-block py-8 flex items-center justify-center overflow-x-auto bg-white dark:bg-[#0d1117]">
        <span dangerouslySetInnerHTML={{ __html: katex.renderToString(formula, { displayMode: true, throwOnError: false }) }} />
      </div>

      {/* Explanation Band */}
      {(explanation || motivation || interpretation) && (
        <div className={`px-5 py-4 space-y-2 ${col.bg} border-t ${col.ring}`}>
          {explanation && (
            <div className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
              <Info size={15} className="flex-shrink-0 mt-0.5 opacity-60" />
              <p>{explanation}</p>
            </div>
          )}
          {interpretation && (
            <div className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Calculator size={15} className="flex-shrink-0 mt-0.5 opacity-60" />
              <p><strong className="text-slate-700 dark:text-slate-300">Interpretation:</strong> {interpretation}</p>
            </div>
          )}
          {motivation && (
            <div className="flex gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Hash size={15} className="flex-shrink-0 mt-0.5 opacity-60" />
              <p><strong className="text-slate-700 dark:text-slate-300">Why needed:</strong> {motivation}</p>
            </div>
          )}
        </div>
      )}

      {/* Symbol Table Toggle */}
      {terms && terms.length > 0 && (
        <div className="border-t border-slate-100 dark:border-slate-700">
          <button onClick={() => setShowTerms(t => !t)} className="w-full flex items-center justify-between px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <span className="flex items-center gap-2"><Sigma size={13} /> Symbol Table ({terms.length} terms)</span>
            {showTerms ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showTerms && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <th className="px-4 py-2 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Symbol</th>
                      <th className="px-4 py-2 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Name</th>
                      <th className="px-4 py-2 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Meaning</th>
                      <th className="px-4 py-2 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Range</th>
                      <th className="px-4 py-2 text-left font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Example</th>
                    </tr>
                  </thead>
                  <tbody>
                    {terms.map((t, i) => (
                      <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                        <td className="px-4 py-2 font-mono font-bold text-primary-600 dark:text-primary-400">
                          <span dangerouslySetInnerHTML={{ __html: katex.renderToString(t.term, { throwOnError: false }) }} />
                        </td>
                        <td className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300">{t.name}</td>
                        <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{t.meaning}</td>
                        <td className="px-4 py-2 text-slate-500 dark:text-slate-500 font-mono">
                          {t.range ? <span dangerouslySetInnerHTML={{ __html: katex.renderToString(t.range, { throwOnError: false }) }} /> : '—'}
                        </td>
                        <td className="px-4 py-2 text-slate-500 dark:text-slate-500">{t.example ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Numerical Example Toggle */}
      {numericalExample && (
        <div className="border-t border-slate-100 dark:border-slate-700">
          <button onClick={() => setShowNumerical(n => !n)} className="w-full flex items-center justify-between px-5 py-3 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
            <span className="flex items-center gap-2"><Calculator size={13} /> Numerical Example</span>
            {showNumerical ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          {showNumerical && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="overflow-hidden">
              <div className="px-5 pb-5 pt-2 space-y-3">
                <p className="text-xs text-slate-600 dark:text-slate-400"><strong className="text-slate-700 dark:text-slate-300">Setup:</strong> {numericalExample.setup}</p>
                <ol className="space-y-1">
                  {numericalExample.steps.map((step, i) => (
                    <li key={i} className="text-xs text-slate-600 dark:text-slate-400 flex gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 flex-shrink-0 flex items-center justify-center font-bold text-[10px]">{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                  ✓ Result: {numericalExample.result}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
}

// Inline symbol explanation
export function SymbolTable({ terms }: { terms: TermEntry[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300">
            <th className="px-4 py-2 text-left border-b border-slate-200 dark:border-slate-700">Symbol</th>
            <th className="px-4 py-2 text-left border-b border-slate-200 dark:border-slate-700">Name</th>
            <th className="px-4 py-2 text-left border-b border-slate-200 dark:border-slate-700">Meaning</th>
          </tr>
        </thead>
        <tbody>
          {terms.map((t, i) => (
            <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
              <td className="px-4 py-2 font-mono text-primary-600 dark:text-primary-400"><span dangerouslySetInnerHTML={{ __html: katex.renderToString(t.term, { throwOnError: false }) }} /></td>
              <td className="px-4 py-2 font-semibold text-slate-700 dark:text-slate-300">{t.name}</td>
              <td className="px-4 py-2 text-slate-600 dark:text-slate-400">{t.meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
