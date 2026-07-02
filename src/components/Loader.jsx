import React from 'react';
import { motion } from 'framer-motion';

export default function Loader({ label = 'Loading…', full = false }) {
  if (full) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16" role="status" aria-live="polite">
        <div className="relative h-14 w-14">
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-moss-100 dark:border-moss-500/20"
          />
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-moss-500"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
        <p className="font-mono text-sm text-ink-500 dark:text-paper-200/80">{label}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3" role="status" aria-live="polite">
      <span className="relative flex h-5 w-5">
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-moss-500"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      </span>
      <span className="text-sm text-ink-500 dark:text-paper-200/80">{label}</span>
    </div>
  );
}
