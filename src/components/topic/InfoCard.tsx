import React from 'react';
import { AlertTriangle, CheckCircle2, Info, Lightbulb, BookOpen, Zap, FlaskConical } from 'lucide-react';

type InfoCardType = 'definition' | 'insight' | 'warning' | 'success' | 'info' | 'tip' | 'lab';

interface Props {
  type?: InfoCardType;
  title?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const config: Record<InfoCardType, {
  bg: string; border: string; iconColor: string; Icon: React.ElementType;
}> = {
  definition: { bg: 'bg-blue-50 dark:bg-blue-950/30', border: 'border-blue-200 dark:border-blue-800', iconColor: 'text-blue-500', Icon: BookOpen },
  insight:    { bg: 'bg-cyan-50 dark:bg-cyan-950/30', border: 'border-cyan-200 dark:border-cyan-800', iconColor: 'text-cyan-500', Icon: Lightbulb },
  warning:    { bg: 'bg-amber-50 dark:bg-amber-950/30', border: 'border-amber-200 dark:border-amber-800', iconColor: 'text-amber-500', Icon: AlertTriangle },
  success:    { bg: 'bg-emerald-50 dark:bg-emerald-950/30', border: 'border-emerald-200 dark:border-emerald-800', iconColor: 'text-emerald-500', Icon: CheckCircle2 },
  info:       { bg: 'bg-slate-50 dark:bg-slate-800/40', border: 'border-slate-200 dark:border-slate-700', iconColor: 'text-slate-400', Icon: Info },
  tip:        { bg: 'bg-violet-50 dark:bg-violet-950/30', border: 'border-violet-200 dark:border-violet-800', iconColor: 'text-violet-500', Icon: Zap },
  lab:        { bg: 'bg-teal-50 dark:bg-teal-950/30', border: 'border-teal-200 dark:border-teal-800', iconColor: 'text-teal-500', Icon: FlaskConical },
};

export default function InfoCard({ type = 'info', title, children, icon }: Props) {
  const { bg, border, iconColor, Icon } = config[type];
  return (
    <div className={`rounded-2xl border ${bg} ${border} p-5 flex gap-4`}>
      <div className={`flex-shrink-0 mt-0.5 ${iconColor}`}>
        {icon ?? <Icon size={20} />}
      </div>
      <div className="min-w-0 flex-1">
        {title && (
          <p className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">{title}</p>
        )}
        <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{children}</div>
      </div>
    </div>
  );
}
