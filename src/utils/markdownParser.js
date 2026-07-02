export const RESUME_SECTION_ORDER = [
  'Professional Summary',
  'Skills',
  'Experience',
  'Projects',
  'Education',
  'Certifications',
  'Languages',
  'Achievements'
];

/** Splits a Markdown resume into an ordered map of { heading: content }, keyed by ## headings only. */
export function parseResumeSections(markdown) {
  if (!markdown) return {};
  const lines = markdown.split('\n');
  const sections = {};
  let current = 'Header';
  let buffer = [];

  const flush = () => {
    const content = buffer.join('\n').trim();
    if (content) {
      sections[current] = sections[current] ? `${sections[current]}\n${content}` : content;
    }
    buffer = [];
  };

  lines.forEach((line) => {
    const headingMatch = line.match(/^##\s+(.*)$/);
    if (headingMatch) {
      flush();
      current = headingMatch[1].trim();
    } else {
      buffer.push(line);
    }
  });
  flush();

  return sections;
}

/**
 * Parses the top-of-resume header block into { name, title, contacts[] }.
 * Expected shape (as instructed to the AI):
 *   # Full Name
 *   Target Job Title
 *   Email | Phone | Location | Link
 * Falls back gracefully if the AI didn't follow the format exactly.
 */
function normalizeContactSegment(segment) {
  const trimmed = segment.trim();
  if (!trimmed) return null;

  const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
  const urlPattern = /(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+[a-z]{2,}(?:\/[^\s|]+)?/i;
  const profileKeywordPattern = /\b(linkedin|github|portfolio|behance|medium|dribbble|dev\.to|kaggle|leetcode|imbase|x\.com)\b/i;

  if (emailPattern.test(trimmed)) {
    return trimmed;
  }

  if (urlPattern.test(trimmed)) {
    const match = trimmed.match(urlPattern);
    return match ? match[0] : trimmed;
  }

  if (profileKeywordPattern.test(trimmed)) {
    return trimmed;
  }

  return trimmed;
}

export function parseResumeHeader(headerBlock) {
  const result = { name: '', title: '', contacts: [] };
  if (!headerBlock) return result;

  const lines = headerBlock
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  if (lines.length === 0) return result;

  const nameLine = lines[0].match(/^#\s+(.*)$/);
  result.name = nameLine ? nameLine[1].trim() : lines[0].replace(/^#+\s*/, '').trim();

  const rest = lines.slice(1);
  const looksLikeContact = (line) =>
    /@/.test(line) || /https?:\/\//.test(line) || /\|/.test(line) || /\d{3}[\s.-]?\d{3,4}/.test(line) || /(?:https?:\/\/)?(?:www\.)?(?:[a-z0-9-]+\.)+[a-z]{2,}/i.test(line) || /\b(linkedin|github|portfolio|behance|medium|dribbble|dev\.to|kaggle|leetcode|imbase|x\.com)\b/i.test(line);

  if (rest.length > 0 && !looksLikeContact(rest[0])) {
    [result.title] = rest;
    result.contacts = rest
      .slice(1)
      .flatMap((l) => l.split('|').map(normalizeContactSegment).filter(Boolean));
  } else {
    result.contacts = rest.flatMap((l) => l.split('|').map(normalizeContactSegment).filter(Boolean));
  }

  return result;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function normalizeLinkUrl(url) {
  if (!url) return url;
  if (/^www\./i.test(url)) return `https://${url}`;
  return url;
}

export function inlineMarkdown(text) {
  let escaped = escapeHtml(text || '');
  escaped = escaped.replace(/\[([^\]]+)\]\((https?:\/\/|mailto:|tel:|www\.)[^)]+\)/gi, (_match, label, protocol) => {
    const href = normalizeLinkUrl(protocol ? _match.match(/\(([^)]+)\)/)?.[1] : '');
    return `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });
  escaped = escaped.replace(/\b([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,})\b/gi, '<a href="mailto:$1" target="_blank" rel="noopener noreferrer">$1</a>');
  escaped = escaped.replace(/(^|[\s(])((https?:\/\/|mailto:|tel:|www\.)[^\s)<>]+)/gi, (_match, prefix, url) => {
    const href = normalizeLinkUrl(url);
    return `${prefix}<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(url)}</a>`;
  });
  escaped = escaped.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/(?<!\*)\*(?!\*)(.+?)\*(?!\*)/g, '<em>$1</em>');
  escaped = escaped.replace(/`(.+?)`/g, '<code>$1</code>');
  return escaped;
}

/**
 * Converts a small, safe subset of Markdown (bold, italics, bullet/numbered
 * lists, paragraphs) into sanitized HTML for rendering resume section bodies.
 */
export function markdownToHtml(markdown) {
  if (!markdown) return '';
  const lines = markdown.split('\n');
  let html = '';
  let listOpen = false;
  let listType = null;

  const closeList = () => {
    if (listOpen) {
      html += listType === 'ol' ? '</ol>' : '</ul>';
      listOpen = false;
      listType = null;
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      closeList();
      return;
    }

    const bulletMatch = line.match(/^[-*•]\s+(.*)$/);
    const numberedMatch = line.match(/^\d+[.)]\s+(.*)$/);

    if (bulletMatch) {
      if (!listOpen || listType !== 'ul') {
        closeList();
        html += '<ul>';
        listOpen = true;
        listType = 'ul';
      }
      html += `<li>${inlineMarkdown(bulletMatch[1])}</li>`;
    } else if (numberedMatch) {
      if (!listOpen || listType !== 'ol') {
        closeList();
        html += '<ol>';
        listOpen = true;
        listType = 'ol';
      }
      html += `<li>${inlineMarkdown(numberedMatch[1])}</li>`;
    } else {
      closeList();
      const boldLineMatch = line.match(/^\*\*(.+?)\*\*\s*(.*)$/);
      if (boldLineMatch) {
        html += `<p><strong>${inlineMarkdown(boldLineMatch[1])}</strong> ${inlineMarkdown(boldLineMatch[2])}</p>`;
      } else {
        html += `<p>${inlineMarkdown(line)}</p>`;
      }
    }
  });
  closeList();

  return html;
}

/** Strips Markdown syntax down to plain text (used for copy-to-clipboard fallback). */
export function markdownToPlainText(markdown) {
  return (markdown || '')
    .replace(/^#{1,3}\s+/gm, '')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/\*(.+?)\*/g, '$1')
    .replace(/^[-*•]\s+/gm, '• ')
    .trim();
}
