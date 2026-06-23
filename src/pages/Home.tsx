import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  GraduationCap, BookOpen, CheckCircle2, Clock, BarChart3,
  ArrowRight, Sparkles, Atom, Brain, Cpu,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MODULES, TOTAL_TOPICS } from '../data/courseData'

const moduleIcons = [GraduationCap, BookOpen, Atom, Brain, Cpu, Sparkles]

export default function Home() {
  const { completedTopics, completionPercent } = useApp()

  return (
    <div className="space-y-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6">
          <Sparkles size={16} />
          NEP 2020 Aligned • 20 Modules • {TOTAL_TOPICS} Topics
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4">
          Quantum Machine Learning:
          <br />
          <span className="bg-gradient-to-r from-primary-500 to-quantum-500 bg-clip-text text-transparent">
            A Hands-On Journey
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          From Classical Machine Learning to Quantum Intelligence — an interactive learning platform
          for Faculty, Research Scholars, and PG Students.
        </p>

        {/* Progress */}
        <div className="mt-8 max-w-md mx-auto">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="font-semibold text-slate-600 dark:text-slate-400">
              <CheckCircle2 size={14} className="inline mr-1 text-emerald-500" />
              {completedTopics.length} / {TOTAL_TOPICS} topics completed
            </span>
            <span className="font-bold text-primary-600 dark:text-primary-400">{completionPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercent}%` }} />
          </div>
        </div>
      </motion.section>

      {/* Module Cards */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <BookOpen size={24} className="text-primary-500" />
          Workshop Modules
        </h2>
        <div className="grid gap-4">
          {MODULES.map((mod, i) => {
            const completedInMod = mod.topics.filter(t => completedTopics.includes(t.id)).length
            const Icon = moduleIcons[i % moduleIcons.length]
            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={mod.topics[0]?.path || '/'}
                  className="card card-hover block"
                >
                  <div className="p-5 flex items-start gap-5">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${mod.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon size={22} className="text-white" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4 mb-1">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {mod.title}
                        </h3>
                        <ArrowRight size={18} className="text-slate-400 flex-shrink-0" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
                        {mod.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-500">
                        <span className="flex items-center gap-1">
                          <BookOpen size={12} />
                          {mod.topics.length} topics
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          {mod.estimatedHours}h
                        </span>
                        <span className="flex items-center gap-1">
                          <BarChart3 size={12} />
                          <div className="w-16 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary-500 to-quantum-500 rounded-full transition-all"
                              style={{ width: `${(completedInMod / mod.topics.length) * 100}%` }}
                            />
                          </div>
                          {completedInMod}/{mod.topics.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
