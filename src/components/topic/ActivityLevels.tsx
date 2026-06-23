import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, User, Monitor, UsersRound, CheckCircle2, Clock, Package, Target, BarChart2 } from 'lucide-react';
import type { ActivityLevel } from '../../types';

interface Props { levels: ActivityLevel[]; }

const levelConfig = [
  { icon: Monitor,     color: 'bg-blue-500',    label: 'Teacher Do',                 lightBg: 'bg-blue-50 dark:bg-blue-950/30',   border: 'border-blue-200 dark:border-blue-800', badge: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' },
  { icon: Users,       color: 'bg-emerald-500',  label: 'Teacher + Student Together',  lightBg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', badge: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' },
  { icon: UsersRound,  color: 'bg-violet-500',   label: 'All Students Do',             lightBg: 'bg-violet-50 dark:bg-violet-950/30',   border: 'border-violet-200 dark:border-violet-800', badge: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300' },
  { icon: User,        color: 'bg-amber-500',    label: 'Individual Student Do',       lightBg: 'bg-amber-50 dark:bg-amber-950/30',     border: 'border-amber-200 dark:border-amber-800', badge: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' },
];

export default function ActivityLevels({ levels }: Props) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {/* Level Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {levels.map((lv, i) => {
          const cfg = levelConfig[i];
          const LIcon = cfg.icon;
          return (
            <button
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all duration-200 ${active === i ? `${cfg.lightBg} ${cfg.border} shadow-sm` : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'}`}
            >
              <div className={`w-9 h-9 rounded-lg ${cfg.color} flex items-center justify-center`}>
                <LIcon size={18} className="text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Level {lv.level}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">{cfg.label}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Level Detail */}
      <AnimatePresence mode="wait">
        {active !== null && levels[active] && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className={`rounded-2xl border ${levelConfig[active].border} ${levelConfig[active].lightBg} p-6 space-y-5`}
          >
            {/* Title + Badge */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className={`section-tag text-xs mb-2 ${levelConfig[active].badge}`}>
                  Level {levels[active].level} — {levelConfig[active].label}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">{levels[active].title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{levels[active].objectives}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 flex-shrink-0">
                <Clock size={13} /> {levels[active].time}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Instructions */}
              <div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Target size={12} /> Instructions
                </p>
                <ol className="space-y-2">
                  {levels[active].instructions.map((ins, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                      <span className={`flex-shrink-0 w-6 h-6 rounded-full ${levelConfig[active].color} text-white flex items-center justify-center text-xs font-bold`}>{i + 1}</span>
                      {ins}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Meta */}
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2"><Package size={12} /> Materials</p>
                  <div className="flex flex-wrap gap-2">
                    {levels[active].materials.map((m, i) => (
                      <span key={i} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400">{m}</span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Input</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{levels[active].inputs}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800/50 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                    <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Output</p>
                    <p className="text-xs text-slate-700 dark:text-slate-300">{levels[active].outputs}</p>
                  </div>
                </div>

                {/* Rubrics */}
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2"><BarChart2 size={12} /> Assessment Rubrics</p>
                  <ul className="space-y-1.5">
                    {levels[active].rubrics.map((r, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" /> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Outcomes */}
            <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><CheckCircle2 size={12} className="text-emerald-500" /> Learning Outcome</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{levels[active].outcomes}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
