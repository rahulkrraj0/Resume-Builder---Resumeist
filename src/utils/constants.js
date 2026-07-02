export const APP_NAME = 'Resumeist';

export const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Builder', to: '/builder' },
  { label: 'How it works', to: '/about' },
  { label: 'Privacy', to: '/privacy' }
];

export const FEATURES = [
  {
    title: 'Written for the job, not generic',
    description: 'The AI rewrites your resume against the exact job description you paste in — same facts, sharper framing.',
    icon: 'target'
  },
  {
    title: 'ATS-checked before you send it',
    description: 'Every generation is scored for keyword coverage, section completeness, and length against real ATS scanning logic.',
    icon: 'scan'
  },
  {
    title: 'Never invents experience',
    description: 'The rewrite improves wording and surfaces relevant keywords — it never fabricates roles, skills, or dates.',
    icon: 'shield'
  },
  {
    title: 'Upload almost anything',
    description: 'PDF, DOCX, or plain text — your resume is parsed in the browser in seconds, nothing uploaded to a server.',
    icon: 'upload'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'Bring your resume',
    description: 'Upload a PDF, DOCX, or TXT file, or paste your resume text directly. Extraction happens entirely in your browser.'
  },
  {
    title: 'Paste the job description',
    description: 'Copy the full listing from the job posting — the more complete it is, the better the keyword match will be.'
  },
  {
    title: 'Generate the tailored version',
    description: 'The AI rewrites wording and structure to fit the role, without inventing experience you do not have.'
  },
  {
    title: 'Review the ATS analysis',
    description: 'Check your match score, missing keywords, and suggestions, then copy the text or download as PDF via print.'
  }
];
