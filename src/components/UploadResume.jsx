import React, { useCallback, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiFileText, FiX, FiEdit3 } from 'react-icons/fi';
import { extractTextFromFile } from '../services/fileParser';
import { useResume } from '../context/ResumeContext.jsx';
import Loader from './Loader';

export default function UploadResume() {
  const { resumeText, setResumeText, resumeFileName, setResumeFileName } = useResume();
  const [dragActive, setDragActive] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [mode, setMode] = useState('upload'); // upload | paste
  const inputRef = useRef(null);

  const handleFile = useCallback(
    async (file) => {
      if (!file) return;
      setParsing(true);
      try {
        const text = await extractTextFromFile(file);
        setResumeText(text);
        setResumeFileName(file.name);
        toast.success(`Extracted text from ${file.name}`);
      } catch (err) {
        toast.error(err.message || 'Could not read this file.');
      } finally {
        setParsing(false);
      }
    },
    [setResumeText, setResumeFileName]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const clearResume = () => {
    setResumeText('');
    setResumeFileName('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="card p-6 sm:p-8">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">1. Your resume</h3>
        <div className="flex rounded-full border border-ink-200 dark:border-white/15 p-1 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`rounded-full px-3 py-1.5 transition-colors ${mode === 'upload' ? 'bg-ink-900 text-white dark:bg-paper-100 dark:text-ink-900' : 'text-ink-500 dark:text-paper-200'}`}
          >
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('paste')}
            className={`rounded-full px-3 py-1.5 transition-colors ${mode === 'paste' ? 'bg-ink-900 text-white dark:bg-paper-100 dark:text-ink-900' : 'text-ink-500 dark:text-paper-200'}`}
          >
            Paste text
          </button>
        </div>
      </div>

      {mode === 'upload' && !resumeText && (
        <label
          htmlFor="resume-upload"
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={onDrop}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-12 text-center transition-colors ${
            dragActive ? 'border-moss-500 bg-moss-50 dark:bg-moss-500/10' : 'border-ink-200 dark:border-white/15 hover:border-moss-400'
          }`}
        >
          {parsing ? (
            <Loader label="Reading your file…" />
          ) : (
            <>
              <FiUploadCloud size={28} className="text-moss-500" />
              <p className="mt-3 text-sm font-medium">Drag &amp; drop your resume, or click to browse</p>
              <p className="mt-1 text-xs text-ink-400">PDF, DOCX, or TXT — up to 8MB</p>
            </>
          )}
          <input
            id="resume-upload"
            ref={inputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="sr-only"
            onChange={(e) => handleFile(e.target.files?.[0])}
            aria-describedby="resume-upload-hint"
          />
        </label>
      )}

      {mode === 'upload' && resumeText && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-xl border border-ink-100 dark:border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <FiFileText className="text-moss-500" />
              {resumeFileName || 'Pasted resume'}
            </div>
            <button
              type="button"
              onClick={clearResume}
              aria-label="Remove resume"
              className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 hover:bg-clay-500/10 hover:text-clay-500"
            >
              <FiX size={16} />
            </button>
          </div>
          <p className="mt-3 max-h-40 overflow-y-auto whitespace-pre-line text-xs leading-relaxed text-ink-500 dark:text-paper-200/70">
            {resumeText.slice(0, 800)}
            {resumeText.length > 800 ? '…' : ''}
          </p>
        </motion.div>
      )}

      {mode === 'paste' && (
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-ink-400">
            <FiEdit3 size={14} /> Paste your resume text below
          </div>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={8}
            placeholder="Paste your resume content here…"
            className="w-full resize-y rounded-xl border border-ink-200 dark:border-white/15 bg-transparent p-4 text-sm leading-relaxed outline-none focus:border-moss-500"
            aria-label="Paste resume text"
          />
        </div>
      )}
    </div>
  );
}
