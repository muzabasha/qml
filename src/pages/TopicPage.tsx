import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, CheckCircle2, BookOpen, Lightbulb, AlertTriangle,
  ChevronRight, GraduationCap, Target, BrainCircuit, ListChecks,
  MessageSquareQuote, FlaskConical,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MODULES, getModuleById } from '../data/courseData'
import { getTopicData } from '../data/topicData'
import SectionWrapper from '../components/topic/SectionWrapper'
import InfoCard from '../components/topic/InfoCard'
import FeedbackMCQ from '../components/topic/FeedbackMCQ'

export default function TopicPage() {
  const { moduleId, topicId } = useParams<{ moduleId: string; topicId: string }>()
  const navigate = useNavigate()
  const { markTopicComplete, isTopicComplete } = useApp()

  const mod = getModuleById(moduleId || '')
  const topicIndex = mod?.topics.findIndex(t => t.id === `${moduleId}-${topicId}`) ?? -1
  const topic = mod?.topics[topicIndex]
  const topicIdFull = `${moduleId}-${topicId}`
  const data = getTopicData(topicIdFull)

  if (!mod || !topic) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Topic Not Found</h2>
        <p className="text-slate-500 mb-6">The topic you're looking for doesn't exist yet.</p>
        <Link to="/" className="btn-primary">Back to Dashboard</Link>
      </div>
    )
  }

  const prevTopic = topicIndex > 0 ? mod.topics[topicIndex - 1] : null
  const nextTopic = topicIndex < mod.topics.length - 1 ? mod.topics[topicIndex + 1] : null
  const isComplete = isTopicComplete(topicIdFull)
  const prevModuleIdx = MODULES.findIndex(m => m.id === moduleId) - 1
  const nextModuleIdx = MODULES.findIndex(m => m.id === moduleId) + 1

  return (
    <div className="space-y-8">
      {/* Back + Breadcrumb */}
      <div className="flex items-center gap-3 text-sm">
        <Link to="/" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex items-center gap-1">
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <ChevronRight size={12} className="text-slate-400" />
        <span className="text-slate-600 dark:text-slate-400 font-medium">{mod.shortTitle}</span>
        <ChevronRight size={12} className="text-slate-400" />
        <span className="text-primary-600 dark:text-primary-400 font-semibold">{topic.title}</span>
      </div>

      {/* Topic Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className={`section-tag text-xs ${topic.difficulty === 'Beginner' ? 'tag-concept' : topic.difficulty === 'Intermediate' ? 'tag-activity' : 'tag-project'}`}>
              {topic.difficulty || 'Beginner'}
            </span>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mt-3">{topic.title}</h1>
            {topic.duration && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Duration: {topic.duration}
              </p>
            )}
          </div>
          <button
            onClick={() => markTopicComplete(topicIdFull)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all ${
              isComplete
                ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-300 dark:hover:border-emerald-700'
            }`}
          >
            <CheckCircle2 size={16} />
            {isComplete ? 'Completed' : 'Mark Complete'}
          </button>
        </div>

        {/* Tags */}
        {topic.tags && (
          <div className="flex flex-wrap gap-2">
            {topic.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Prerequisites */}
      {data?.prerequisites && data.prerequisites.length > 0 && (
        <SectionWrapper
          id="prerequisites"
          title="Prerequisites"
          icon={<GraduationCap size={18} className="text-amber-500" />}
          accentColor="border-amber-500"
          badge="Before You Start"
          badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
          defaultOpen={!isComplete}
        >
          <ul className="space-y-3">
            {data.prerequisites.map((pr, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                {pr}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Story / Motivation */}
      <SectionWrapper
        id="story"
        title="The Story"
        icon={<MessageSquareQuote size={18} className="text-orange-500" />}
        accentColor="border-orange-500"
        badge="Motivation"
        badgeColor="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"
      >
        <div className="story-block">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Coming soon — a narrative that connects this topic to real-world problems and quantum possibilities.
          </p>
        </div>
      </SectionWrapper>

      {/* Core Content / Concepts */}
      <SectionWrapper
        id="concepts"
        title="Core Concepts"
        icon={<BrainCircuit size={18} className="text-primary-500" />}
        accentColor="border-primary-500"
        badge="Learn"
        badgeColor="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
      >
        <div className="space-y-4">
          <p className="text-slate-600 dark:text-slate-400">
            Content for this topic is being developed. Please check back or explore the MCQs and recap below.
          </p>
          {data?.keyInsights && (
            <div className="grid sm:grid-cols-2 gap-3">
              {data.keyInsights.map((ki, i) => (
                <InfoCard key={i} type="insight" title={`Insight ${i + 1}`}>
                  {ki}
                </InfoCard>
              ))}
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Activity */}
      <SectionWrapper
        id="activity"
        title="Activity"
        icon={<Target size={18} className="text-emerald-500" />}
        accentColor="border-emerald-500"
        badge="Hands-On"
        badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
        defaultOpen={false}
      >
        <div className="activity-block">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Interactive activity coming soon. This section will include guided exercises, coding tasks, and group discussions.
          </p>
        </div>
      </SectionWrapper>

      {/* Project */}
      <SectionWrapper
        id="project"
        title="Mini-Project"
        icon={<FlaskConical size={18} className="text-violet-500" />}
        accentColor="border-violet-500"
        badge="Project"
        badgeColor="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
        defaultOpen={false}
      >
        <div className="project-block">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Mini-project coming soon. Apply the concepts learned in this topic to solve a real-world inspired problem.
          </p>
        </div>
      </SectionWrapper>

      {/* MCQ Quiz */}
      {data?.mcqs && data.mcqs.length > 0 && (
        <SectionWrapper
          id="quiz"
          title="Knowledge Check"
          icon={<ListChecks size={18} className="text-cyan-500" />}
          accentColor="border-cyan-500"
          badge="Quiz"
          badgeColor="bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300"
          defaultOpen={true}
        >
          <FeedbackMCQ questions={data.mcqs} />
        </SectionWrapper>
      )}

      {/* Virtual Lab */}
      <SectionWrapper
        id="lab"
        title="Virtual Lab"
        icon={<FlaskConical size={18} className="text-teal-500" />}
        accentColor="border-teal-500"
        badge="Lab"
        badgeColor="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
        defaultOpen={false}
      >
        <div className="lab-block">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Virtual lab coming soon. Run Qiskit experiments directly in your browser with pre-configured notebooks.
          </p>
        </div>
      </SectionWrapper>

      {/* Recap */}
      {data?.recap && data.recap.length > 0 && (
        <SectionWrapper
          id="recap"
          title="Recap"
          icon={<BookOpen size={18} className="text-indigo-500" />}
          accentColor="border-indigo-500"
          badge="Summary"
          badgeColor="bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
          defaultOpen={true}
        >
          <ul className="space-y-3">
            {data.recap.map((point, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                {point}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Skill Mapping */}
      {data?.skillMapping && data.skillMapping.length > 0 && (
        <SectionWrapper
          id="skills"
          title="Skill Mapping"
          icon={<Lightbulb size={18} className="text-amber-500" />}
          accentColor="border-amber-500"
          badge="NEP 2020"
          badgeColor="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
          defaultOpen={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Skill</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">Level</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700">NEP 2020 Competency</th>
                </tr>
              </thead>
              <tbody>
                {data.skillMapping.map((sk, i) => (
                  <tr key={i} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">{sk.skill}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        sk.level === 'Beginner' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' :
                        sk.level === 'Intermediate' ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300' :
                        'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                      }`}>
                        {sk.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{sk.nep2020Competency || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionWrapper>
      )}

      {/* Dependents */}
      {data?.dependents && data.dependents.length > 0 && (
        <SectionWrapper
          id="dependents"
          title="What This Enables"
          icon={<Target size={18} className="text-blue-500" />}
          accentColor="border-blue-500"
          badge="Next Steps"
          badgeColor="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
          defaultOpen={false}
        >
          <ul className="space-y-3">
            {data.dependents.map((dep, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                <ChevronRight size={16} className="text-primary-500 flex-shrink-0 mt-0.5" />
                {dep}
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-slate-700">
        <div>
          {prevTopic && (
            <Link
              to={prevTopic.path}
              className="btn-secondary flex items-center gap-2 text-sm"
            >
              <ArrowLeft size={16} /> {prevTopic.title}
            </Link>
          )}
        </div>
        <div className="text-right">
          {nextTopic && (
            <Link
              to={nextTopic.path}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              {nextTopic.title} <ChevronRight size={16} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
