import React from 'react';

const SECTIONS = [
  {
    title: 'What stays on your device',
    body: 'Your uploaded resume file is parsed entirely in your browser using pdfjs-dist and mammoth. The raw file is never uploaded anywhere. Extracted text, the job description, and the generated resume are saved only in your browser\u2019s local storage, so you can leave and come back without retyping.'
  },
  {
    title: 'What is sent to the AI',
    body: 'When you click Generate, your resume text and the job description text are sent to the AI provider (via Puter.js) to produce the tailored rewrite. No file, name, or contact metadata is sent beyond what appears in the text you provide.'
  },
  {
    title: 'No accounts, no tracking',
    body: 'Resumeist does not require sign-up and does not use analytics or advertising trackers. There is no server-side database — clearing your browser storage removes all local data immediately.'
  },
  {
    title: 'Your control',
    body: 'You can clear your resume, job description, or generated output at any time from the Builder page, or by clearing your browser\u2019s site data for this app.'
  }
];

export default function Privacy() {
  return (
    <div className="section-pad py-16">
      <div className="mx-auto max-w-2xl">
        <p className="eyebrow">Privacy</p>
        <h1 className="mt-2 text-4xl font-semibold">Your resume stays yours</h1>
        <p className="mt-4 text-ink-500 dark:text-paper-200/80">
          A short, plain-language summary of what happens to your data when you use Resumeist.
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-paper-200/70">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-xs text-ink-400">
          Last updated {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}. Questions? Reach out at hello@resumeist.app.
        </p>
      </div>
    </div>
  );
}
