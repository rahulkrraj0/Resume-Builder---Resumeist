import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import { RESUME_TEMPLATES } from '../utils/resumeTemplates';

export default function TemplateSelector({ selectedId, onSelect }) {
  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Choose a template</h3>
        <span className="font-mono text-xs text-ink-400">{RESUME_TEMPLATES.length} styles</span>
      </div>

      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-5"
        role="radiogroup"
        aria-label="Resume template"
      >
        {RESUME_TEMPLATES.map((template) => {
          const active = template.id === selectedId;
          return (
            <motion.button
              key={template.id}
              type="button"
              role="radio"
              aria-checked={active}
              whileHover={{ y: -3 }}
              onClick={() => onSelect(template.id)}
              className={`relative flex flex-col items-start gap-2 rounded-xl border p-3 text-left transition-colors ${
                active
                  ? 'border-moss-500 bg-moss-50 dark:bg-moss-500/10'
                  : 'border-ink-200 dark:border-white/10 hover:border-moss-400'
              }`}
            >
              <div className="flex w-full items-center justify-between">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900 dark:bg-paper-100 font-mono text-[11px] font-semibold text-white dark:text-ink-900">
                  {template.number}
                </span>
                {active && <FiCheck className="text-moss-500" size={16} />}
              </div>

              <div className="flex gap-1">
                {template.theme.swatch.map((color, i) => (
                  <span
                    key={`${template.id}-${i}`}
                    className="h-3.5 w-3.5 rounded-full border border-black/5"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <p className="text-xs font-semibold leading-tight">{template.name}</p>
              <p className="text-[11px] leading-snug text-ink-400">{template.description}</p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
