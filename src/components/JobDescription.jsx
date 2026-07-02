import React from 'react';
import { FiBriefcase } from 'react-icons/fi';
import { useResume } from '../context/ResumeContext.jsx';

export default function JobDescription() {
  const { jobDescription, setJobDescription } = useResume();
  const count = jobDescription.trim().length;

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-lg font-semibold">
          <FiBriefcase className="text-moss-500" /> 2. Job description
        </h3>
        <span className={`font-mono text-xs ${count < 40 ? 'text-clay-500' : 'text-ink-400'}`}>
          {count} chars
        </span>
      </div>
      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        rows={10}
        placeholder="Paste the full job posting here — title, responsibilities, and requirements all help sharpen the match."
        className="w-full resize-y rounded-xl border border-ink-200 dark:border-white/15 bg-transparent p-4 text-sm leading-relaxed outline-none focus:border-moss-500"
        aria-label="Job description"
      />
    </div>
  );
}
