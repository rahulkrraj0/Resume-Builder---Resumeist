import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu, FiX, FiFeather } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { APP_NAME, NAV_LINKS } from '../utils/constants';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-moss-500' : 'text-ink-600 dark:text-paper-200 hover:text-moss-500'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100/70 dark:border-white/5 glass print:hidden">
      <nav className="section-pad flex h-16 items-center justify-between" aria-label="Primary">
        <NavLink to="/" className="flex items-center gap-2 font-display text-lg font-semibold" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-moss-500 text-white">
            <FiFeather size={16} />
          </span>
          {APP_NAME}
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <NavLink to="/builder" className="btn-primary text-sm !px-5 !py-2.5">
            Try it free
          </NavLink>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-200 dark:border-white/15"
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-ink-100/70 dark:border-white/5 md:hidden"
          >
            <div className="section-pad flex flex-col gap-4 py-5">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} onClick={() => setOpen(false)} end={link.to === '/'}>
                  {link.label}
                </NavLink>
              ))}
              <NavLink to="/builder" onClick={() => setOpen(false)} className="btn-primary text-sm w-full">
                Try it free
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
