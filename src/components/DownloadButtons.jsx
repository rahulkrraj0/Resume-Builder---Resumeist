import React from 'react';
import toast from 'react-hot-toast';
import { FiCopy, FiDownload, FiRefreshCw } from 'react-icons/fi';
import { markdownToPlainText } from '../utils/markdownParser';

export default function DownloadButtons({ previewRef, markdown, onRegenerate, regenerating }) {

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdownToPlainText(markdown));
      toast.success('Resume copied to clipboard');
    } catch {
      toast.error('Could not copy — try selecting the text manually.');
    }
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-3 print:hidden">
      <button type="button" onClick={handleCopy} className="btn-secondary">
        <FiCopy /> Copy resume
      </button>
      <button type="button" onClick={handleDownload} className="btn-secondary">
        <FiDownload /> Download
      </button>
      <button type="button" onClick={onRegenerate} disabled={regenerating} className="btn-secondary ml-auto">
        <FiRefreshCw className={regenerating ? 'animate-spin' : ''} /> Generate again
      </button>
    </div>
  );
}
