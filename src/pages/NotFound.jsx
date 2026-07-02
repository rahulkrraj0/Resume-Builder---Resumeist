import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="section-pad flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mono text-sm text-moss-500">404</p>
      <h1 className="mt-2 text-3xl font-semibold">This page doesn&rsquo;t exist</h1>
      <p className="mt-2 text-sm text-ink-500 dark:text-paper-200/70">
        The page you&rsquo;re looking for was moved or never existed.
      </p>
      <Link to="/" className="btn-accent mt-8">
        Back to home
      </Link>
    </div>
  );
}
