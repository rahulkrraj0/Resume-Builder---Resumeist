import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerSrc from 'pdfjs-dist/build/pdf.worker.min.js?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerSrc;

export const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024; // 8MB
export const SUPPORTED_EXTENSIONS = ['pdf', 'docx', 'txt'];

function getExtension(file) {
  return file.name.split('.').pop()?.toLowerCase() || '';
}

function readAsArrayBuffer(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the file. It may be corrupted.'));
    reader.readAsArrayBuffer(file);
  });
}

function readAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Could not read the file. It may be corrupted.'));
    reader.readAsText(file);
  });
}

function normalizeExtractedText(text) {
  return (text || '')
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+$/gm, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function extractFromPdf(file) {
  const buffer = await readAsArrayBuffer(file);
  let pdf;
  try {
    pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
  } catch {
    throw new Error('This PDF could not be opened. It may be encrypted, scanned as an image, or corrupted.');
  }

  let text = '';
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    // eslint-disable-next-line no-await-in-loop
    const page = await pdf.getPage(pageNum);
    // eslint-disable-next-line no-await-in-loop
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(' ').trim();

    let annotationLinks = [];
    try {
      const annotations = await page.getAnnotations();
      annotationLinks = annotations
        .map((annotation) => annotation?.url || annotation?.action?.url || '')
        .filter(Boolean)
        .map((link) => link.trim());
    } catch {
      annotationLinks = [];
    }

    const uniqueLinks = [...new Set(annotationLinks)];
    const pageContent = [pageText, ...uniqueLinks].filter(Boolean).join('\n');
    text += `${pageContent}\n\n`;
  }

  const normalizedText = normalizeExtractedText(text);
  if (!normalizedText) {
    throw new Error('No selectable text was found in this PDF. If it is a scanned image, try pasting the text manually instead.');
  }
  return normalizedText;
}

async function extractFromDocx(file) {
  const mammoth = await import('mammoth');
  const buffer = await readAsArrayBuffer(file);
  let result;
  try {
    result = await mammoth.extractRawText({ arrayBuffer: buffer });
  } catch {
    throw new Error('This DOCX file could not be read. It may be corrupted or in an unsupported format.');
  }
  const text = normalizeExtractedText(result?.value);
  if (!text) {
    throw new Error('No text could be extracted from this document.');
  }
  return text;
}

async function extractFromTxt(file) {
  const text = normalizeExtractedText(await readAsText(file));
  if (!text) {
    throw new Error('This text file appears to be empty.');
  }
  return text;
}

/**
 * Extracts plain text from an uploaded resume file.
 * Throws a user-friendly Error on any failure.
 */
export async function extractTextFromFile(file) {
  if (!file) throw new Error('No file was selected.');

  if (file.size > MAX_FILE_SIZE_BYTES) {
    throw new Error('This file is too large. Please upload a resume under 8MB.');
  }

  const ext = getExtension(file);
  if (!SUPPORTED_EXTENSIONS.includes(ext)) {
    throw new Error('Unsupported format. Please upload a PDF, DOCX, or TXT file.');
  }

  if (ext === 'pdf') return extractFromPdf(file);
  if (ext === 'docx') return extractFromDocx(file);
  return extractFromTxt(file);
}
