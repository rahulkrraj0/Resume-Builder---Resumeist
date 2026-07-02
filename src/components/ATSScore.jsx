import React from 'react';
import { motion } from 'framer-motion';

function scoreColor(score) {
  if (score >= 75) return { ring: '#1F8A70', text: 'text-moss-500', label: 'Strong match' };
  if (score >= 50) return { ring: '#E8A33D', text: 'text-amber-600', label: 'Good, needs work' };
  return { ring: '#C1473A', text: 'text-clay-500', label: 'Needs improvement' };
}

export default function ATSScore({ score = 0, matchPercent = 0 }) {
  const { ring, text, label } = scoreColor(score);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="card flex flex-col items-center gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="10" className="text-ink-100 dark:text-white/10" />
            <motion.circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={ring}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold">{score}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">ats score</span>
          </div>
        </div>

        <div>
          <p className={`eyebrow ${text}`}>{label}</p>
          <h3 className="mt-1 text-xl font-semibold">Overall ATS compatibility</h3>
          <p className="mt-1 text-sm text-ink-500 dark:text-paper-200/70">
            Based on keyword overlap, section completeness, and resume depth.
          </p>
        </div>
      </div>

      <div className="w-full max-w-[180px] sm:w-auto">
        <div className="flex items-center justify-between text-xs text-ink-400">
          <span>Keyword match</span>
          <span className="font-mono">{matchPercent}%</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-ink-100 dark:bg-white/10">
          <motion.div
            className="h-full rounded-full bg-moss-500"
            initial={{ width: 0 }}
            animate={{ width: `${matchPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>
    </div>
  );
}
