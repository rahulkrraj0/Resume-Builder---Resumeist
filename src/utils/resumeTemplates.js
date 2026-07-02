/**
 * Resume template catalogue. Each template controls layout (structural
 * skeleton) and theme (typography/color) but all of them share the same
 * non-negotiable rule: Name + Target Title + Contact line render in a fixed
 * header at the very top, never inline with body content.
 *
 * layout:
 *  - 'single'   : one column, header band, sections stacked top to bottom
 *  - 'sidebar'  : left sidebar (contact/skills/languages) + right main column
 *  - 'timeline' : single column with a vertical timeline treatment on Experience
 */
export const RESUME_TEMPLATES = [
  {
    id: 'classic-manuscript',
    number: 1,
    name: 'Classic Manuscript',
    description: 'Centered serif header, ruled paper texture, moss accent.',
    layout: 'single',
    theme: {
      swatch: ['#FAF8F3', '#1F8A70', '#14171F'],
      pageBg: 'bg-white',
      headerAlign: 'text-center',
      nameFont: 'font-display text-3xl font-semibold',
      titleFont: 'font-body text-sm uppercase tracking-[0.18em] text-moss-600',
      accent: 'text-moss-600',
      rule: 'border-ink-100',
      sectionHeading: 'font-display text-sm font-semibold uppercase tracking-[0.14em] text-moss-600',
      manuscriptTexture: true
    }
  },
  {
    id: 'modern-minimal',
    number: 2,
    name: 'Modern Minimal',
    description: 'Left-aligned header, hairline rules, quiet and dense.',
    layout: 'single',
    theme: {
      swatch: ['#FFFFFF', '#14171F', '#9AA1AE'],
      pageBg: 'bg-white',
      headerAlign: 'text-left',
      nameFont: 'font-body text-3xl font-bold tracking-tight text-ink-900',
      titleFont: 'font-body text-sm font-medium text-ink-500',
      accent: 'text-ink-900',
      rule: 'border-ink-200',
      sectionHeading: 'font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-900 border-b border-ink-200 pb-1',
      manuscriptTexture: false
    }
  },
  {
    id: 'executive-band',
    number: 3,
    name: 'Executive Band',
    description: 'Bold dark header band, confident and senior-level.',
    layout: 'single',
    theme: {
      swatch: ['#14171F', '#E8A33D', '#FAF8F3'],
      pageBg: 'bg-white',
      headerBand: true,
      headerAlign: 'text-left',
      nameFont: 'font-display text-3xl font-semibold text-white',
      titleFont: 'font-body text-sm font-medium text-amber-400',
      accent: 'text-amber-600',
      rule: 'border-ink-100',
      sectionHeading: 'font-display text-sm font-semibold uppercase tracking-[0.14em] text-ink-900 border-l-4 border-amber-500 pl-3',
      manuscriptTexture: false
    }
  },
  {
    id: 'sidebar-slate',
    number: 4,
    name: 'Sidebar Slate',
    description: 'Two-column layout — dark sidebar for contact & skills.',
    layout: 'sidebar',
    theme: {
      swatch: ['#1F222A', '#FAF8F3', '#2AA588'],
      pageBg: 'bg-white',
      sidebarBg: 'bg-ink-800',
      sidebarText: 'text-paper-100',
      nameFont: 'font-display text-2xl font-semibold text-white',
      titleFont: 'font-body text-sm text-moss-400',
      accent: 'text-moss-500',
      rule: 'border-ink-100',
      sectionHeading: 'font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-900',
      sidebarHeading: 'font-body text-xs font-bold uppercase tracking-[0.2em] text-moss-400',
      manuscriptTexture: false
    }
  },
  {
    id: 'ats-safe',
    number: 5,
    name: 'ATS-Safe Plain',
    description: 'Zero color, zero columns — maximum parser compatibility.',
    layout: 'single',
    theme: {
      swatch: ['#FFFFFF', '#000000', '#666666'],
      pageBg: 'bg-white',
      headerAlign: 'text-left',
      nameFont: 'font-body text-2xl font-bold text-black',
      titleFont: 'font-body text-sm text-ink-600',
      accent: 'text-black',
      rule: 'border-ink-300',
      sectionHeading: 'font-body text-sm font-bold uppercase text-black border-b border-ink-400 pb-1',
      manuscriptTexture: false,
      plain: true
    }
  },
  {
    id: 'creative-accent',
    number: 6,
    name: 'Creative Accent',
    description: 'Warm amber accent bar, friendly and design-forward.',
    layout: 'single',
    theme: {
      swatch: ['#FAF8F3', '#E8A33D', '#C1473A'],
      pageBg: 'bg-white',
      headerAlign: 'text-left',
      nameFont: 'font-display text-3xl font-semibold text-ink-900',
      titleFont: 'font-body text-sm font-semibold text-clay-500',
      accent: 'text-amber-600',
      rule: 'border-amber-200',
      sectionHeading: 'font-display text-sm font-semibold uppercase tracking-[0.1em] text-white bg-amber-500 inline-block px-3 py-1 rounded-full',
      manuscriptTexture: false
    }
  },
  {
    id: 'technical-mono',
    number: 7,
    name: 'Technical Mono',
    description: 'Monospace headings, terminal-style header bar for devs.',
    layout: 'single',
    theme: {
      swatch: ['#0C0E13', '#2AA588', '#FAF8F3'],
      pageBg: 'bg-white',
      headerBand: true,
      headerMono: true,
      headerAlign: 'text-left',
      nameFont: 'font-mono text-2xl font-semibold text-white',
      titleFont: 'font-mono text-xs text-moss-400',
      accent: 'text-moss-600',
      rule: 'border-ink-100',
      sectionHeading: 'font-mono text-xs font-semibold uppercase tracking-[0.14em] text-moss-600 before:content-["//"] before:mr-2 before:text-ink-300',
      manuscriptTexture: false
    }
  },
  {
    id: 'academic-cv',
    number: 8,
    name: 'Academic CV',
    description: 'Formal centered serif, traditional double rules.',
    layout: 'single',
    theme: {
      swatch: ['#FAF8F3', '#14171F', '#6B7280'],
      pageBg: 'bg-white',
      headerAlign: 'text-center',
      nameFont: 'font-display text-2xl font-semibold uppercase tracking-[0.08em] text-ink-900',
      titleFont: 'font-body text-sm italic text-ink-500',
      accent: 'text-ink-900',
      rule: 'border-double border-b-4 border-ink-300',
      sectionHeading: 'font-display text-sm font-semibold uppercase tracking-[0.16em] text-ink-900 text-center',
      manuscriptTexture: false,
      centeredSections: true
    }
  },
  {
    id: 'elegant-twotone',
    number: 9,
    name: 'Elegant Two-Tone',
    description: 'Paper background with a soft moss header block.',
    layout: 'single',
    theme: {
      swatch: ['#E9F6F1', '#1F8A70', '#14171F'],
      pageBg: 'bg-white',
      headerBand: true,
      headerBandSoft: true,
      headerAlign: 'text-left',
      nameFont: 'font-display text-3xl font-semibold text-ink-900',
      titleFont: 'font-body text-sm font-medium text-moss-600',
      accent: 'text-moss-600',
      rule: 'border-moss-100',
      sectionHeading: 'font-display text-sm font-semibold uppercase tracking-[0.14em] text-moss-700',
      manuscriptTexture: false
    }
  },
  {
    id: 'timeline-pro',
    number: 10,
    name: 'Timeline Pro',
    description: 'Vertical timeline styling for the Experience section.',
    layout: 'timeline',
    theme: {
      swatch: ['#FFFFFF', '#14171F', '#E8A33D'],
      pageBg: 'bg-white',
      headerAlign: 'text-left',
      nameFont: 'font-display text-3xl font-semibold text-ink-900',
      titleFont: 'font-body text-sm font-medium text-ink-500',
      accent: 'text-amber-600',
      rule: 'border-ink-100',
      sectionHeading: 'font-body text-xs font-bold uppercase tracking-[0.2em] text-ink-900 border-b border-ink-200 pb-1',
      manuscriptTexture: false
    }
  }
];

export function getTemplateById(id) {
  return RESUME_TEMPLATES.find((t) => t.id === id) || RESUME_TEMPLATES[0];
}
