import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, CheckCircle2, BookOpen, Lightbulb,
  ChevronRight, GraduationCap, Target, BrainCircuit, ListChecks,
  MessageSquareQuote, FlaskConical, Play, Code2, Users, Sparkles,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { getModuleById } from '../data/courseData'
import { getTopicData } from '../data/topicData'
import SectionWrapper from '../components/topic/SectionWrapper'
import InfoCard from '../components/topic/InfoCard'
import FeedbackMCQ from '../components/topic/FeedbackMCQ'
import { MathBlock } from '../components/topic/MathBlock'
import InteractiveDiagram from '../components/topic/InteractiveDiagram'
import type { ContentItem, ActivityContent, ProjectContent, LabContent } from '../types'

function renderContentItem(item: ContentItem, idx: number) {
  switch (item.type) {
    case 'text':
      return (
        <p key={idx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
          {item.text}
        </p>
      )
    case 'math':
      return item.formula ? (
        <MathBlock
          key={idx}
          formula={item.formula}
          label={item.title}
          explanation={item.text}
        />
      ) : null
    case 'diagram':
      return item.chart ? (
        <InteractiveDiagram
          key={idx}
          title={item.title || 'Diagram'}
          description={item.text}
          chart={item.chart}
        />
      ) : null
    case 'code':
      return item.code ? (
        <div key={idx} className="lab-block !p-0 !overflow-hidden">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border-b border-cyan-200 dark:border-cyan-800">
            <Code2 size={14} className="text-cyan-600" />
            <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase">{item.code.language}</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">
            <code>{item.code.code}</code>
          </pre>
        </div>
      ) : null
    case 'list':
      return (
        <ul key={idx} className="space-y-2">
          {item.items?.map((li, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              {li}
            </li>
          ))}
        </ul>
      )
    case 'card':
      return item.cards ? (
        <div key={idx} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {item.cards.map((c, i) => (
            <div key={i} className="flip-card-container cursor-pointer group">
              <div className="flip-card-inner group-hover:flip-card-flipped">
                <div className="flip-card-front bg-primary-50 dark:bg-primary-950/30 border border-primary-200 dark:border-primary-800">
                  <Sparkles size={24} className="text-primary-500 mb-2" />
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{c.front}</p>
                </div>
                <div className="flip-card-back bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{c.back}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null
    default:
      return null
  }
}

function renderActivity(activity: ActivityContent) {
  return (
    <div className="activity-block space-y-5">
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{activity.description}</p>

      {activity.codetask && (
        <div className="!p-0 !overflow-hidden border border-emerald-200 dark:border-emerald-800 rounded-xl">
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/40 border-b border-emerald-200 dark:border-emerald-800">
            <Code2 size={14} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase">{activity.codetask.language}</span>
          </div>
          <pre className="p-4 text-sm overflow-x-auto font-mono text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900">
            <code>{activity.codetask.code}</code>
          </pre>
        </div>
      )}

      <div>
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Play size={12} /> Steps
        </p>
        <ol className="space-y-2">
          {activity.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {activity.discussionQuestions && activity.discussionQuestions.length > 0 && (
        <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-emerald-200 dark:border-emerald-800">
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
            <Users size={12} /> Discussion Questions
          </p>
          <ul className="space-y-1">
            {activity.discussionQuestions.map((q, i) => (
              <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <span className="text-emerald-500 font-bold">{i + 1}.</span> {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {activity.materials && activity.materials.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activity.materials.map((m, i) => (
            <span key={i} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400">
              {m}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function renderProject(project: ProjectContent) {
  return (
    <div className="project-block space-y-5">
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.description}</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-violet-200 dark:border-violet-800">
          <p className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2">Objectives</p>
          <ul className="space-y-1.5">
            {project.objectives.map((o, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <Target size={12} className="text-violet-500 flex-shrink-0 mt-1" /> {o}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-slate-800/40 rounded-xl p-4 border border-violet-200 dark:border-violet-800">
          <p className="text-xs font-bold text-violet-700 dark:text-violet-300 uppercase tracking-wider mb-2">Deliverables</p>
          <ul className="space-y-1.5">
            {project.deliverables.map((d, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0 mt-1" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {project.tools && project.tools.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Tools</p>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((t, i) => (
              <span key={i} className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2.5 py-1 rounded-full text-slate-600 dark:text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function renderLab(lab: LabContent) {
  return (
    <div className="lab-block space-y-5">
      <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{lab.description}</p>

      <div className="bg-white dark:bg-slate-800/40 rounded-xl px-4 py-3 border border-cyan-200 dark:border-cyan-800">
        <p className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider mb-1">Setup</p>
        <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">{lab.setup}</p>
      </div>

      <div>
        <p className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
          <Play size={12} /> Lab Steps
        </p>
        <ol className="space-y-2">
          {lab.steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      {lab.expectedOutput && (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl px-4 py-3 border border-emerald-200 dark:border-emerald-800">
          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 mb-1">Expected Output</p>
          <pre className="text-sm text-slate-700 dark:text-slate-300 font-mono">{lab.expectedOutput}</pre>
        </div>
      )}

      {lab.challenge && (
        <InfoCard type="warning" title="Challenge">
          {lab.challenge}
        </InfoCard>
      )}
    </div>
  )
}

export default function TopicPage() {
  const { moduleId, topicId } = useParams<{ moduleId: string; topicId: string }>()
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
      {data?.story && (
        <SectionWrapper
          id="story"
          title="The Story"
          icon={<MessageSquareQuote size={18} className="text-orange-500" />}
          accentColor="border-orange-500"
          badge="Motivation"
          badgeColor="bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300"
        >
          <div className="story-block">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {data.story}
            </p>
          </div>
        </SectionWrapper>
      )}

      {/* Core Content / Concepts */}
      {data?.concepts && data.concepts.length > 0 && (
        <SectionWrapper
          id="concepts"
          title="Core Concepts"
          icon={<BrainCircuit size={18} className="text-primary-500" />}
          accentColor="border-primary-500"
          badge="Learn"
          badgeColor="bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
        >
          <div className="space-y-5">
            {data.concepts.map((item, idx) => renderContentItem(item, idx))}
            {data.keyInsights && (
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {data.keyInsights.map((ki, i) => (
                  <InfoCard key={i} type="insight" title={`Insight ${i + 1}`}>
                    {ki}
                  </InfoCard>
                ))}
              </div>
            )}
          </div>
        </SectionWrapper>
      )}

      {/* Activity */}
      {data?.activity && (
        <SectionWrapper
          id="activity"
          title="Activity"
          icon={<Target size={18} className="text-emerald-500" />}
          accentColor="border-emerald-500"
          badge="Hands-On"
          badgeColor="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
          defaultOpen={false}
        >
          {renderActivity(data.activity)}
        </SectionWrapper>
      )}

      {/* Project */}
      {data?.project && (
        <SectionWrapper
          id="project"
          title="Mini-Project"
          icon={<FlaskConical size={18} className="text-violet-500" />}
          accentColor="border-violet-500"
          badge="Project"
          badgeColor="bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300"
          defaultOpen={false}
        >
          {renderProject(data.project)}
        </SectionWrapper>
      )}

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
      {data?.lab && (
        <SectionWrapper
          id="lab"
          title="Virtual Lab"
          icon={<FlaskConical size={18} className="text-teal-500" />}
          accentColor="border-teal-500"
          badge="Lab"
          badgeColor="bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300"
          defaultOpen={false}
        >
          {renderLab(data.lab)}
        </SectionWrapper>
      )}

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
