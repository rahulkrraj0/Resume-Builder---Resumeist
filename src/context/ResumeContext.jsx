import React, { createContext, useContext, useState, useCallback } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateTailoredResume } from '../services/aiService';
import { analyzeResume } from '../services/atsAnalyzer';

const ResumeContext = createContext(null);

export function ResumeProvider({ children }) {
  const [resumeText, setResumeText] = useLocalStorage('resumeist-source-resume', '');
  const [resumeFileName, setResumeFileName] = useLocalStorage('resumeist-source-filename', '');
  const [jobDescription, setJobDescription] = useLocalStorage('resumeist-jd', '');
  const [generatedResume, setGeneratedResume] = useLocalStorage('resumeist-output', '');
  const [analysis, setAnalysis] = useLocalStorage('resumeist-analysis', null);
  const [templateId, setTemplateId] = useLocalStorage('resumeist-template', 'classic-manuscript');

  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [error, setError] = useState('');

  const reset = useCallback(() => {
    setGeneratedResume('');
    setAnalysis(null);
    setStatus('idle');
    setError('');
  }, [setGeneratedResume, setAnalysis]);

  const generate = useCallback(async () => {
    setError('');

    if (!resumeText || resumeText.trim().length < 40) {
      const message = 'Add your resume first — upload a file or paste the text so there is something to tailor.';
      setError(message);
      setStatus('error');
      return { ok: false, message };
    }
    if (!jobDescription || jobDescription.trim().length < 40) {
      const message = 'Paste the job description — a few sentences are not enough to match keywords against.';
      setError(message);
      setStatus('error');
      return { ok: false, message };
    }

    setStatus('loading');
    try {
      const markdown = await generateTailoredResume(resumeText, jobDescription);
      const computedAnalysis = analyzeResume(markdown, jobDescription);
      setGeneratedResume(markdown);
      setAnalysis(computedAnalysis);
      setStatus('success');
      return { ok: true };
    } catch (err) {
      const message = err?.message || 'The AI request failed. Please try again in a moment.';
      setError(message);
      setStatus('error');
      return { ok: false, message };
    }
  }, [resumeText, jobDescription, setGeneratedResume, setAnalysis]);

  const value = {
    resumeText,
    setResumeText,
    resumeFileName,
    setResumeFileName,
    jobDescription,
    setJobDescription,
    generatedResume,
    analysis,
    templateId,
    setTemplateId,
    status,
    setStatus,
    error,
    setError,
    generate,
    reset
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within a ResumeProvider');
  return ctx;
}
