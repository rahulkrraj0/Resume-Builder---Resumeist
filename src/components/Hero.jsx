import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

export default function Hero({ onStart }) {
  return (
    <section className="relative overflow-hidden section-pad pt-16 pb-20 md:pt-24 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_20%_0%,rgba(31,138,112,0.14),transparent),radial-gradient(50%_40%_at_90%_10%,rgba(232,163,61,0.14),transparent)]"
      />

      <motion.div variants={container} initial="hidden" animate="show" className="mx-auto max-w-3xl text-center">
        <motion.p variants={item} className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-moss-100 dark:border-moss-500/30 bg-moss-50 dark:bg-moss-500/10 px-4 py-1.5">
          Same facts. Sharper resume.
        </motion.p>

        <motion.h1 variants={item} className="text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl">
          Rewrite your resume for
          <span className="italic text-moss-500"> this job</span>, not every job
        </motion.h1>

        <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-balance text-base text-ink-500 dark:text-paper-200/80 sm:text-lg">
          Upload your resume, paste the job description, and get a factually accurate,
          ATS-optimized rewrite — plus a keyword match score — in under a minute.
        </motion.p>

        <motion.div variants={item} className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button type="button" onClick={onStart} className="btn-accent text-base">
            Build my resume <FiArrowRight />
          </button>
          <div className="flex items-center gap-2 text-sm text-ink-500 dark:text-paper-200/70">
            <FiCheckCircle className="text-moss-500" />
            No sign-up · Nothing leaves your browser
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="card mx-auto mt-16 max-w-3xl overflow-hidden"
      >
        <div className="flex items-center gap-2 border-b border-ink-100 dark:border-white/5 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-clay-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-moss-500/70" />
          <span className="ml-3 font-mono text-xs text-ink-400">ats_match.json</span>
        </div>
        <div className="grid gap-6 p-6 sm:grid-cols-3 sm:p-8">
          {[
            ['ATS Match', '92%'],
            ['Keywords added', '14'],
            ['Rewrite time', '38s']
          ].map(([label, value]) => (
            <div key={label} className="text-left">
              <p className="eyebrow">{label}</p>
              <p className="mt-1 font-display text-3xl font-semibold text-ink-900 dark:text-paper-50">{value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
