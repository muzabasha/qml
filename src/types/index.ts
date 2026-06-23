// ─── Course & Module Types ────────────────────────────────────────────────────

export interface TopicMeta {
  id: string;
  title: string;
  path: string;
  duration?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags?: string[];
}

export interface ModuleMeta {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  color: string;
  topics: TopicMeta[];
  estimatedHours?: number;
}

// ─── Topic Data Types ─────────────────────────────────────────────────────────

export interface MCQOption {
  label: string;
  text: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: MCQOption[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  topic?: string;
}

export interface SkillMapping {
  skill: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  nep2020Competency?: string;
}

export interface DependencyNode {
  topicId: string;
  title: string;
  prerequisites: string[];
  enables: string[];
}

export interface TopicData {
  topicId: string;
  prerequisites: string[];
  dependents: string[];
  nextTopicPlan: string[];
  mcqs: MCQ[];
  recap: string[];
  skillMapping: SkillMapping[];
  keyInsights?: string[];
}

// ─── Activity Types ───────────────────────────────────────────────────────────

export interface ActivityLevel {
  level: 1 | 2 | 3 | 4;
  title: string;
  objectives: string;
  instructions: string[];
  inputs: string;
  outputs: string;
  rubrics: string[];
  outcomes: string;
  time: string;
  materials: string[];
}

// ─── Project Types ────────────────────────────────────────────────────────────

export interface ProjectData {
  id: string;
  title: string;
  module: number;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  teamSize: string;
  duration: string;
  description: string;
  objectives: string[];
  methodology: string[];
  deliverables: string[];
  rubrics: { criterion: string; marks: number; descriptor: string }[];
  trlLevel: number;
  tools: string[];
}

// ─── Question Bank Types ──────────────────────────────────────────────────────

export interface CriticalThinkingQuestion {
  id: string;
  unit: number;
  topicsCovered: string[];
  question: string;
  marks: number;
  schemeOfEvaluation: { point: string; marks: number }[];
  detailedAnswer: string;
  keywords: string[];
  bloomsLevel: 'Knowledge' | 'Comprehension' | 'Application' | 'Analysis' | 'Synthesis' | 'Evaluation';
}

// ─── App State Types ──────────────────────────────────────────────────────────

export interface AppState {
  darkMode: boolean;
  projectorMode: boolean;
  projectorScale: 'normal' | 'large' | 'huge';
  sidebarOpen: boolean;
  searchQuery: string;
  completedTopics: string[];
  activeModule: string | null;
}

// ─── Virtual Lab Types ────────────────────────────────────────────────────────

export interface LabChallenge {
  id: string;
  quest: string;
  target: string;
  isCompleted: boolean;
}

export interface NotebookEntry {
  task: string;
  question: string;
  hint: string;
}

// ─── Navigation ───────────────────────────────────────────────────────────────

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  description?: string;
}
