import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { HOW_IT_WORKS_STEPS } from '../utils/constants';

export default function About() {
  return (
    <div className="section-pad py-16">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">How it works</p>
        <h1 className="mt-2 text-4xl font-semibold">From raw resume to a targeted rewrite</h1>
        <p className="mt-4 text-ink-500 dark:text-paper-200/80">
          Resumeist runs almost entirely in your browser. File parsing, keyword analysis, and PDF export
          all happen on your device — only the resume text and job description are sent to the AI model
          to generate the rewrite.
        </p>

        <ol className="mt-12 space-y-8">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex gap-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-moss-500 font-mono text-sm font-semibold text-white">
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500 dark:text-paper-200/70">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <div className="card mt-14 p-6 sm:p-8">
          <h2 className="text-lg font-semibold">What the AI will and won&rsquo;t do</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-600 dark:text-paper-200/80">
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />Rewords and restructures your existing experience to fit the role.</li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />Surfaces relevant keywords from the job description, used naturally.</li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-moss-500" />Improves formatting and clarity for ATS parsers.</li>
            <li className="flex gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-clay-500" />Never invents job titles, employers, dates, or skills you didn&rsquo;t provide.</li>
          </ul>
        </div>

        <div className="mt-12 text-center">
          <Link to="/" className="btn-accent">
            Try it now <FiArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
