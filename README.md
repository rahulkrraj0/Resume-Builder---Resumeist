# Resumeist — AI Resume Builder

A production-ready, backend-free AI resume builder. Upload a resume, paste a job
description, and get an ATS-optimized rewrite with a keyword match score —
entirely in the browser.

## Stack

- **React 18 + Vite** — app shell and build tooling
- **React Router 6** — client-side routing (Home, Builder, About, Privacy)
- **Tailwind CSS** — styling, dark mode via `class` strategy
- **Framer Motion** — page transitions, hover/scroll animations
- **pdfjs-dist** — extracts text from uploaded PDF resumes
- **mammoth** — extracts text from uploaded DOCX resumes
- **html2pdf.js** — exports the tailored resume as a downloadable PDF
- **react-hot-toast** — toast notifications
- **react-icons** — icon set
- **Puter.js** (`window.puter.ai`) — client-side AI calls, no API key or backend required

## Where to find things (quick reference)

If you want to change how the app behaves, this table tells you which single
file to open — no need to read the whole codebase.

| I want to change...                                            | File |
|------------------------------------------------------------------|------|
| **The AI prompt** — instructions the AI follows to rewrite the resume | `src/services/aiService.js` (the `SYSTEM_PROMPT` constant at the top) |
| **Which AI model is used / fallback order**                     | `src/services/aiService.js` (the `models` array inside `generateTailoredResume`) |
| **Resume templates** — the 10 visual styles (colors, fonts, single/sidebar/timeline layout) | `src/utils/resumeTemplates.js` (`RESUME_TEMPLATES` array) |
| **The template picker UI** (thumbnails/cards shown to the user) | `src/components/TemplateSelector.jsx` |
| **PDF download behavior** — page size, margins, page-break rules | `src/utils/pdfExport.js` |
| **Print behavior** (the "Print" button / `window.print()`, browser header/footer, print-only CSS) | `src/styles/index.css` (the `@media print` block at the bottom) |
| **How the resume preview is laid out** — header, sections, sidebar rendering | `src/components/ResumePreview.jsx` |
| **How raw Markdown from the AI is parsed into sections/HTML**   | `src/utils/markdownParser.js` |
| **ATS score / keyword matching logic**                          | `src/services/atsAnalyzer.js` |
| **File upload parsing** (PDF/DOCX text extraction)               | `src/services/fileParser.js` |
| **Download / Copy / Print / Regenerate buttons**                 | `src/components/DownloadButtons.jsx` |
| **Global colors, fonts, Tailwind design tokens**                 | `tailwind.config.js` + `src/styles/index.css` |
| **App-wide state** (resume text, job description, generated result, selected template) | `src/context/ResumeContext.jsx` |
| **Routes / pages** (Home, Builder, About, Privacy, 404)          | `src/pages/` and `src/App.jsx` |

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

### Build

```bash
npm run build
npm run preview   # optional local preview of the production build
```

Output is written to `dist/`.

## How it works

1. **Upload or paste a resume.** PDF and DOCX files are parsed entirely in the
   browser (`src/services/fileParser.js`); nothing is uploaded to a server.
2. **Paste a job description.**
3. **Generate.** `src/services/aiService.js` sends both texts to the AI via the
   Puter SDK with a strict system prompt: never invent experience, improve
   wording, increase ATS compatibility, return Markdown only.
4. **Review.** `src/services/atsAnalyzer.js` deterministically compares the job
   description against the generated resume to produce an ATS score, keyword
   match percentage, matched/missing keyword lists, strengths, and suggestions.
   This runs locally (no extra AI call) so scoring is fast and consistent.
5. **Export.** Download as PDF, copy the plain text, or print.

All resume/job description/output text is persisted to `localStorage` (see
`src/hooks/useLocalStorage.js`) so a refresh doesn't lose your work. Nothing is
sent to any server owned by this app — see the in-app Privacy page for details.

## Project structure

```
src/
  components/   Reusable UI (Navbar, Hero, UploadResume, ATSScore, ...)
  pages/        Route-level views (Home, Builder, About, Privacy, NotFound)
  hooks/        useTheme, useLocalStorage
  services/     aiService, fileParser, atsAnalyzer
  utils/        markdownParser, pdfExport, constants
  context/      ResumeContext (shared app state)
  styles/       Tailwind entry + custom CSS
```

## Deploying to Netlify

### Option A — Netlify CLI

```bash
npm install -g netlify-cli
netlify deploy --build --prod
```

### Option B — Netlify dashboard

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. In Netlify: **Add new site → Import an existing project**.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy.

`netlify.toml` is already configured with the build command, publish directory,
SPA redirect rule (so client-side routes like `/builder` work on refresh), and
basic security headers — no additional setup is required.

### Option C — Drag and drop

Run `npm run build` locally, then drag the generated `dist/` folder onto
Netlify's "Deploys" page for the site.

## Notes on the AI integration

This app uses [Puter.js](https://js.puter.com), loaded via a `<script>` tag in
`index.html`, which exposes `window.puter.ai.chat(...)` in the browser with no
API key, environment variable, or backend proxy needed. If you'd rather use
your own AI provider (OpenAI, Anthropic, etc.), replace the implementation in
`src/services/aiService.js` — the rest of the app only depends on
`generateTailoredResume(resumeText, jobDescription)` returning a Markdown
string.

## Accessibility

- Skip-to-content link on every page
- Visible focus rings (`:focus-visible`) throughout
- `aria-label`/`aria-live`/`aria-expanded` on interactive and dynamic elements
- Reduced-motion is respected via `prefers-reduced-motion`
- Semantic heading hierarchy (`h1` per page, `h2`/`h3` for sections)

## Error handling

Handled explicitly, with user-facing messages (via toasts and inline alerts):

- Unsupported file types
- Files over 8MB
- Encrypted/scanned PDFs with no extractable text
- Corrupted DOCX/PDF files
- Empty job description or resume (with a minimum length check)
- AI request failures or empty AI responses
- Clipboard copy failures
#
