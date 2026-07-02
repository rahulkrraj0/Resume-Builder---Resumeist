import React from 'react';
import { FiCheck, FiAlertTriangle, FiTrendingUp, FiThumbsUp, FiTarget } from 'react-icons/fi';

function Pill({ children, tone = 'moss' }) {
  const tones = {
    moss: 'bg-moss-50 dark:bg-moss-500/10 text-moss-600 dark:text-moss-400 border-moss-100 dark:border-moss-500/20',
    clay: 'bg-clay-500/5 text-clay-500 border-clay-500/20'
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${tones[tone]}`}>
      {children}
    </span>
  );
}

function InfoCard({ icon: Icon, title, items, tone }) {
  return (
    <div className="card p-6">
      <div className="mb-4 flex items-center gap-2">
        <Icon className={tone === 'clay' ? 'text-clay-500' : 'text-moss-500'} size={18} />
        <h4 className="font-semibold">{title}</h4>
      </div>
      <ul className="space-y-2.5 text-sm text-ink-600 dark:text-paper-200/80">
        {items.map((text) => (
          <li key={text} className="flex gap-2">
            <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${tone === 'clay' ? 'bg-clay-500' : 'bg-moss-500'}`} />
            {text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function KeywordAnalysis({ analysis }) {
  if (!analysis) return null;
  const { matched, missing, strengths, improvements, suggestions } = analysis;

  return (
    <div className="space-y-6">
      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <FiCheck className="text-moss-500" size={18} />
          <h4 className="font-semibold">Matched keywords ({matched.length})</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {matched.length > 0 ? (
            matched.map((kw) => <Pill key={kw}>{kw}</Pill>)
          ) : (
            <p className="text-sm text-ink-400">No strong keyword overlaps found yet.</p>
          )}
        </div>
      </div>

      <div className="card p-6">
        <div className="mb-4 flex items-center gap-2">
          <FiAlertTriangle className="text-clay-500" size={18} />
          <h4 className="font-semibold">Missing keywords ({missing.length})</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {missing.length > 0 ? (
            missing.map((kw) => (
              <Pill key={kw} tone="clay">{kw}</Pill>
            ))
          ) : (
            <p className="text-sm text-ink-400">Great coverage — nothing important is missing.</p>
          )}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <InfoCard icon={FiThumbsUp} title="Strengths" items={strengths} tone="moss" />
        <InfoCard icon={FiTarget} title="Areas for improvement" items={improvements} tone="clay" />
      </div>

      <InfoCard icon={FiTrendingUp} title="Suggestions" items={suggestions} tone="moss" />
    </div>
  );
}
