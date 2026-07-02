/**
 * Client-side ATS analysis. Rather than asking the AI to self-grade (which
 * is unreliable and non-deterministic), we compute keyword overlap between
 * the job description and the generated resume directly — the same
 * fundamental approach real ATS keyword scanners use.
 */

const STOPWORDS = new Set(
  `a about above after again against all am an and any are aren't as at be because been before
  being below between both but by can't cannot could couldn't did didn't do does doesn't doing don't
  down during each few for from further had hadn't has hasn't have haven't having he he'd he'll he's
  her here here's hers herself him himself his how how's i i'd i'll i'm i've if in into is isn't it
  it's its itself let's me more most mustn't my myself no nor not of off on once only or other ought
  our ours ourselves out over own same shan't she she'd she'll she's should shouldn't so some such than
  that that's the their theirs them themselves then there there's these they they'd they'll they're
  they've this those through to too under until up very was wasn't we we'd we'll we're we've were
  weren't what what's when when's where where's which while who who's whom why why's with won't would
  wouldn't you you'd you'll you're you've your yours yourself yourselves etc using use used strong
  ability able across including within experience years year work team role join us including preferred
  required requirements responsibilities qualifications job description company`
    .split(/\s+/)
    .filter(Boolean)
);

const GENERIC_SECTION_WORDS = new Set(['summary', 'skills', 'experience', 'projects', 'education', 'certifications', 'languages', 'achievements']);

function normalize(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9+#./\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text) {
  return normalize(text)
    .split(' ')
    .filter((w) => w.length > 2 && !STOPWORDS.has(w) && !/^\d+$/.test(w));
}

/** Extracts candidate multi-word phrases (2-3 tokens) alongside single keywords. */
function extractKeywordSet(text) {
  const words = tokenize(text);
  const single = new Set(words);

  const rawLines = normalize(text).split(/[,\n•·|]/);
  const phrases = new Set();
  rawLines.forEach((line) => {
    const trimmed = line.trim();
    const wordCount = trimmed.split(' ').filter(Boolean).length;
    if (trimmed.length > 2 && wordCount >= 2 && wordCount <= 4) {
      phrases.add(trimmed);
    }
  });

  return { single, phrases };
}

function topFrequent(words, limit) {
  const freq = new Map();
  words.forEach((w) => {
    if (GENERIC_SECTION_WORDS.has(w)) return;
    freq.set(w, (freq.get(w) || 0) + 1);
  });
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([word]) => word);
}

/**
 * Compares the job description against the generated resume and returns
 * a structured ATS analysis object.
 */
export function analyzeResume(resumeMarkdown, jobDescription) {
  const jdKeywords = extractKeywordSet(jobDescription);
  const resumeWords = new Set(tokenize(resumeMarkdown));
  const resumeNormalized = normalize(resumeMarkdown);

  const importantKeywords = topFrequent([...jdKeywords.single], 18);

  const matched = [];
  const missing = [];
  importantKeywords.forEach((word) => {
    if (resumeWords.has(word) || resumeNormalized.includes(word)) {
      matched.push(word);
    } else {
      missing.push(word);
    }
  });

  const matchPercent = importantKeywords.length
    ? Math.round((matched.length / importantKeywords.length) * 100)
    : 0;

  // Section completeness: does the resume actually contain the expected headings?
  const expectedSections = ['professional summary', 'skills', 'experience', 'education'];
  const sectionsPresent = expectedSections.filter((s) =>
    resumeNormalized.includes(s)
  ).length;
  const sectionScore = Math.round((sectionsPresent / expectedSections.length) * 100);

  // Length/detail score — very short resumes tend to score poorly on real ATS systems
  const wordCount = tokenize(resumeMarkdown).length;
  const lengthScore = Math.max(0, Math.min(100, Math.round((wordCount / 300) * 100)));

  const atsScore = Math.round(matchPercent * 0.6 + sectionScore * 0.25 + lengthScore * 0.15);

  const strengths = [];
  if (matchPercent >= 60) strengths.push('Strong overlap with the core keywords in the job description.');
  if (sectionsPresent === expectedSections.length) strengths.push('All essential resume sections are present and clearly labeled.');
  if (wordCount >= 250) strengths.push('Resume has enough detail for ATS parsers to extract meaningful content.');
  if (strengths.length === 0) strengths.push('Resume was successfully tailored and is ready for a first review pass.');

  const improvements = [];
  if (missing.length > 0) improvements.push(`Work in these missing keywords naturally: ${missing.slice(0, 5).join(', ')}.`);
  if (sectionsPresent < expectedSections.length) improvements.push('Add any missing standard sections (Summary, Skills, Experience, Education).');
  if (wordCount < 200) improvements.push('Add more specific detail to strengthen ATS parsing and recruiter context.');
  if (improvements.length === 0) improvements.push('Resume is well-optimized — consider a manual proofread before sending.');

  const suggestions = [
    missing.length > 0
      ? `Add ${missing.length} missing keyword${missing.length === 1 ? '' : 's'} where they are truthfully applicable, rather than in a keyword list.`
      : 'Keyword coverage looks strong — no major gaps found.',
    'Quantify achievements with numbers (%, $, time saved) wherever possible.',
    'Keep formatting simple — avoid tables, columns, or images that ATS parsers can misread.',
    'Mirror the exact phrasing of the job title and key requirements where truthful.'
  ];

  return {
    atsScore: Math.max(0, Math.min(100, atsScore)),
    matchPercent,
    matched,
    missing,
    importantKeywords,
    strengths,
    improvements,
    suggestions,
    wordCount
  };
}
