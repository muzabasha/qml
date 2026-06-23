import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, Search, Sun, Moon, GraduationCap, BookOpen,
  ChevronRight, ChevronDown, CheckCircle2, Monitor, Grid3X3,
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MODULES, getModuleById, getAllTopics } from '../data/courseData'

export default function Layout() {
  const {
    darkMode, toggleDarkMode, sidebarOpen, toggleSidebar, setSidebarOpen,
    searchQuery, setSearchQuery, isTopicComplete, projectorMode, toggleProjectorMode,
  } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [expandedModules, setExpandedModules] = useState<string[]>(['module1'])
  const [showSearchResults, setShowSearchResults] = useState(false)

  const currentPath = location.pathname

  useEffect(() => {
    const match = currentPath.match(/\/topic\/(\w+)\/\w+/)
    if (match) {
      const modId = match[1]
      setExpandedModules(prev => prev.includes(modId) ? prev : [...prev, modId])
    }
  }, [currentPath])

  const toggleModule = (id: string) => {
    setExpandedModules(prev =>
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    )
  }

  const searchResults = searchQuery.trim()
    ? getAllTopics().filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 10)
    : []

  const handleSearch = (topicId: string, moduleId: string, topicIndex: number) => {
    setSearchQuery('')
    setShowSearchResults(false)
    const mod = getModuleById(moduleId)
    if (mod) {
      navigate(mod.topics[topicIndex].path)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a1a]">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 glass border-b border-slate-200 dark:border-slate-700/60">
        <div className="flex items-center gap-4 px-4 h-16">
          <button onClick={toggleSidebar} className="btn-secondary !p-2 !rounded-xl">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-quantum-600 flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="hidden sm:block text-base font-bold text-slate-900 dark:text-white">
              QML Workshop
            </span>
          </Link>

          {/* Search */}
          <div className="relative flex-1 max-w-md ml-auto mr-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={e => { setSearchQuery(e.target.value); setShowSearchResults(true) }}
              onFocus={() => setShowSearchResults(true)}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/30"
            />
            {showSearchResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-1 left-0 right-0 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg overflow-hidden z-50">
                {searchResults.map(t => (
                  <button
                    key={t.id}
                    onMouseDown={() => handleSearch(t.id, t.moduleId, MODULES.findIndex(m => m.id === t.moduleId))}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 border-b border-slate-100 dark:border-slate-700 last:border-0"
                  >
                    <span className="font-medium text-slate-700 dark:text-slate-300">{t.title}</span>
                    <span className="text-xs text-slate-400 ml-2">{t.moduleTitle}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button onClick={toggleProjectorMode} className={`btn-secondary !p-2 !rounded-xl ${projectorMode ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : ''}`} title="Projector Mode">
              <Monitor size={18} />
            </button>
            <button onClick={toggleDarkMode} className="btn-secondary !p-2 !rounded-xl" title="Toggle Dark Mode">
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.aside
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="flex-shrink-0 border-r border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-900/50 overflow-hidden"
            >
              <div className="w-80 h-[calc(100vh-4rem)] overflow-y-auto sidebar-scroll">
                <div className="p-4 space-y-1">
                  <Link
                    to="/"
                    className={`sidebar-link ${currentPath === '/' ? 'active' : ''}`}
                  >
                    <Grid3X3 size={16} />
                    Dashboard
                  </Link>

                  {MODULES.map(mod => {
                    const isExpanded = expandedModules.includes(mod.id)
                    const topicsForMod = mod.topics
                    const completedInMod = topicsForMod.filter(t => isTopicComplete(t.id)).length
                    return (
                      <div key={mod.id}>
                        <button
                          onClick={() => toggleModule(mod.id)}
                          className="w-full sidebar-link text-left"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${mod.color}`} />
                          <span className="flex-1 text-xs font-semibold truncate">{mod.shortTitle}</span>
                          <span className="text-[10px] text-slate-400">{completedInMod}/{topicsForMod.length}</span>
                          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                        </button>
                        {isExpanded && (
                          <div className="ml-4 space-y-0.5">
                            {topicsForMod.map(t => {
                              const active = currentPath === t.path
                              const complete = isTopicComplete(t.id)
                              return (
                                <Link
                                  key={t.id}
                                  to={t.path}
                                  className={`sidebar-link text-xs !py-2 ${active ? 'active' : ''}`}
                                >
                                  {complete ? (
                                    <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                                  ) : (
                                    <BookOpen size={12} className="text-slate-400 flex-shrink-0" />
                                  )}
                                  <span className="truncate">{t.title}</span>
                                </Link>
                              )
                            })}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
