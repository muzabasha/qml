import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import mermaid from 'mermaid';
import { GitBranch, RefreshCw } from 'lucide-react';

interface Props {
  title: string;
  description?: string;
  chart: string;
}

let mermaidInitialized = false;

export default function InteractiveDiagram({ title, description, chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);
  const id = useRef(`mermaid-${Math.random().toString(36).slice(2)}`);

  useEffect(() => {
    if (!mermaidInitialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#4f46e5',
          primaryTextColor: '#f1f5f9',
          primaryBorderColor: '#6366f1',
          lineColor: '#818cf8',
          secondaryColor: '#7c3aed',
          tertiaryColor: '#0891b2',
          background: 'transparent',
          nodeBorder: '#6366f1',
          clusterBkg: '#1e1b4b',
          edgeLabelBackground: '#1e293b',
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
        },
        flowchart: { curve: 'basis', padding: 15 },
      });
      mermaidInitialized = true;
    }

    const render = async () => {
      if (!ref.current) return;
      try {
        const { svg } = await mermaid.render(id.current, chart.trim());
        if (ref.current) {
          ref.current.innerHTML = svg;
          setRendered(true);
          setError(null);
        }
      } catch (e) {
        setError('Diagram could not be rendered. Check the chart syntax.');
        console.error('Mermaid render error:', e);
      }
    };
    render();
  }, [chart]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="my-6 rounded-2xl border border-primary-200 dark:border-primary-800/50 overflow-hidden bg-white dark:bg-[#0f1629]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/30">
        <GitBranch size={16} className="text-primary-500" />
        <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{title}</span>
        {description && (
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1">— {description}</span>
        )}
        {!rendered && !error && (
          <RefreshCw size={14} className="ml-auto text-slate-400 animate-spin" />
        )}
      </div>

      {/* Diagram */}
      <div className="p-6 flex justify-center overflow-x-auto">
        {error ? (
          <div className="text-sm text-red-500 dark:text-red-400 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
            ⚠️ {error}
          </div>
        ) : (
          <div ref={ref} className="mermaid-container w-full" />
        )}
      </div>
    </motion.div>
  );
}
