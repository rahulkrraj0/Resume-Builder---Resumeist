import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiCheck, FiEdit3, FiMaximize2, FiX } from 'react-icons/fi';
import ResumePreview from '../components/ResumePreview';
import ATSScore from '../components/ATSScore';
import KeywordAnalysis from '../components/KeywordAnalysis';
import DownloadButtons from '../components/DownloadButtons';
import TemplateSelector from '../components/TemplateSelector';
import Loader from '../components/Loader';
import { useResume } from '../context/ResumeContext.jsx';
import { analyzeResume } from '../services/atsAnalyzer';
import { getTemplateById } from '../utils/resumeTemplates';

export default function Builder() {
  const {
    generatedResume,
    analysis,
    generate,
    status,
    resumeText,
    jobDescription,
    templateId,
    setTemplateId,
    setGeneratedResume,
    setAnalysis
  } = useResume();
  const previewRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [draftMarkdown, setDraftMarkdown] = useState(generatedResume || '');

  useEffect(() => {
    if (!isEditing) {
      setDraftMarkdown(generatedResume || '');
    }
  }, [generatedResume, isEditing]);

  const handleRegenerate = async () => {
    const result = await generate();
    if (result.ok) {
      toast.success('Resume regenerated');
    } else {
      toast.error(result.message);
    }
  };

  const hasSource = resumeText.trim().length >= 40 && jobDescription.trim().length >= 40;

  const handleStartEdit = () => {
    setDraftMarkdown(generatedResume || '');
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmed = draftMarkdown.trim();
    if (!trimmed) {
      toast.error('Resume content cannot be empty.');
      return;
    }

    setGeneratedResume(trimmed);
    setAnalysis(analyzeResume(trimmed, jobDescription));
    setStatus('success');
    setIsEditing(false);
    toast.success('Resume updated');
  };

  const handleCancelEdit = () => {
    setDraftMarkdown(generatedResume || '');
    setIsEditing(false);
  };

  if (!generatedResume && status !== 'loading') {
    return (
      <div className="section-pad py-24 text-center">
        <p className="eyebrow">Nothing generated yet</p>
        <h1 className="mt-3 text-3xl font-semibold">Let&rsquo;s build your resume first</h1>
        <p className="mx-auto mt-3 max-w-md text-sm text-ink-500 dark:text-paper-200/70">
          {hasSource
            ? 'Your resume and job description are saved — generate a tailored version to see it here.'
            : 'Upload a resume and paste a job description on the home page to get started.'}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          {hasSource ? (
            <button type="button" onClick={handleRegenerate} className="btn-accent">
              Generate resume
            </button>
          ) : (
            <Link to="/" className="btn-accent">
              Go to home <FiArrowLeft className="rotate-180" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  if (status === 'loading' && !generatedResume) {
    return <Loader full label="Tailoring your resume against the job description…" />;
  }

  const activeTemplate = getTemplateById(templateId);

  return (
    <div className="section-pad py-12 print:p-0">
      <div className="mx-auto max-w-6xl print:max-w-none">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 print:hidden">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-moss-500">
            <FiArrowLeft /> Back to home
          </Link>
          <p className="eyebrow">Your tailored resume</p>
        </div>

        {analysis && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8 print:hidden">
            <ATSScore score={analysis.atsScore} matchPercent={analysis.matchPercent} />
          </motion.div>
        )}

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mb-8 print:hidden">
          <TemplateSelector selectedId={templateId} onSelect={setTemplateId} />
        </motion.div>

        <div className={`grid items-start gap-8 print:block ${isEditing ? 'lg:grid-cols-1' : 'lg:grid-cols-[1.15fr_1fr]'}`}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 print:hidden">
              <DownloadButtons
                previewRef={previewRef}
                markdown={generatedResume}
                onRegenerate={handleRegenerate}
                regenerating={status === 'loading'}
                fileNamePrefix={activeTemplate.id}
              />
              <div className="flex flex-wrap gap-2">
                {!isEditing ? (
                  <button type="button" onClick={handleStartEdit} className="btn-secondary !px-4 !py-2.5 text-sm">
                    <FiEdit3 /> Edit resume
                  </button>
                ) : (
                  <>
                    <button type="button" onClick={handleSaveEdit} className="btn-accent !px-4 !py-2.5 text-sm">
                      <FiCheck /> Save
                    </button>
                    <button type="button" onClick={handleCancelEdit} className="btn-secondary !px-4 !py-2.5 text-sm">
                      <FiX /> Cancel
                    </button>
                  </>
                )}
                <button type="button" onClick={() => setIsFullscreen(true)} className="btn-secondary !px-4 !py-2.5 text-sm">
                  <FiMaximize2 /> Full screen
                </button>
              </div>
            </div>

            {isEditing ? (
              <div className="grid items-stretch gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="flex h-full flex-col rounded-2xl border border-ink-200/70 bg-paper p-4 shadow-sm dark:border-white/10 dark:bg-ink-800 print:hidden">
                  <p className="mb-3 text-sm font-semibold text-ink-700 dark:text-paper-100">Live preview</p>
                  <ResumePreview
                    ref={previewRef}
                    markdown={draftMarkdown}
                    matchedKeywords={analysis?.matched}
                    templateId={templateId}
                  />
                </div>
                <div className="flex h-full flex-col rounded-2xl border border-ink-200/70 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-ink-800 print:hidden">
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-ink-700 dark:text-paper-100">
                      Edit resume content
                    </label>
                    <button type="button" onClick={handleCancelEdit} className="text-sm text-ink-500 hover:text-moss-500 dark:text-paper-200">
                      <FiX /> Exit
                    </button>
                  </div>
                  <textarea
                    value={draftMarkdown}
                    onChange={(event) => setDraftMarkdown(event.target.value)}
                    className="mt-1 h-full min-h-[320px] flex-1 w-full rounded-xl border border-ink-200 bg-paper px-4 py-3 font-mono text-sm text-ink-800 outline-none ring-0 focus:border-moss-500 dark:border-white/10 dark:bg-ink-900 dark:text-paper-100"
                    spellCheck={false}
                  />
                </div>
              </div>
            ) : (
              <div className="mt-5 print:mt-0">
                <ResumePreview
                  ref={previewRef}
                  markdown={generatedResume}
                  matchedKeywords={analysis?.matched}
                  templateId={templateId}
                />
              </div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className={`print:hidden ${isEditing ? 'mt-6' : ''}`}>
            <h2 className="mb-5 text-lg font-semibold">ATS &amp; keyword analysis</h2>
            <KeywordAnalysis analysis={analysis} />
          </motion.div>
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-[200] overflow-auto bg-paper/95 p-4 backdrop-blur-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="eyebrow">Full screen preview</p>
            <button type="button" onClick={() => setIsFullscreen(false)} className="btn-secondary !px-4 !py-2.5 text-sm">
              <FiX /> Close
            </button>
          </div>
          <div className="mx-auto max-w-5xl rounded-3xl border border-ink-200/70 bg-white p-3 shadow-2xl sm:p-6 dark:border-white/10 dark:bg-ink-800">
            <ResumePreview
              ref={previewRef}
              markdown={isEditing ? draftMarkdown : generatedResume}
              matchedKeywords={analysis?.matched}
              templateId={templateId}
            />
          </div>
        </div>
      )}
    </div>
  );
}
