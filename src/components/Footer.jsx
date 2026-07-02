import React from 'react';
import { Link } from 'react-router-dom';
import { FiFeather, FiGithub, FiMail } from 'react-icons/fi';
import { APP_NAME } from '../utils/constants';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-100/70 dark:border-white/5 print:hidden">
      <div className="section-pad grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss-500 text-white">
              <FiFeather size={16} />
            </span>
            {APP_NAME}
          </div>
          <p className="mt-3 max-w-xs text-sm text-ink-500 dark:text-paper-200/70">
            Tailor your resume to any job description in minutes, with an ATS score you can trust.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="eyebrow mb-3">Navigate</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-ink-600 dark:text-paper-200 hover:text-moss-500">Home</Link></li>
            <li><Link to="/builder" className="text-ink-600 dark:text-paper-200 hover:text-moss-500">Resume Builder</Link></li>
            <li><Link to="/about" className="text-ink-600 dark:text-paper-200 hover:text-moss-500">How it works</Link></li>
            <li><Link to="/privacy" className="text-ink-600 dark:text-paper-200 hover:text-moss-500">Privacy</Link></li>
          </ul>
        </nav>

        <div>
          <p className="eyebrow mb-3">Built with</p>
          <p className="text-sm text-ink-600 dark:text-paper-200/80">
            React, Tailwind CSS, and Puter AI — no backend, everything runs in your browser.
          </p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-white/15 hover:border-moss-500 hover:text-moss-500"
            >
              <FiGithub size={16} />
            </a>
            <a
              href="mailto:hello@resumeist.app"
              aria-label="Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 dark:border-white/15 hover:border-moss-500 hover:text-moss-500"
            >
              <FiMail size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="section-pad border-t border-ink-100/70 dark:border-white/5 py-6 text-xs text-ink-400">
        © {new Date().getFullYear()} {APP_NAME}. All resume processing happens in your browser.
      </div>
    </footer>
  );
}
