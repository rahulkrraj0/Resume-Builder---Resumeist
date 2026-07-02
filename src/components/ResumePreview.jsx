import React, { forwardRef, useMemo } from 'react';
import {
  parseResumeSections,
  parseResumeHeader,
  markdownToHtml,
  inlineMarkdown,
  RESUME_SECTION_ORDER
} from '../utils/markdownParser';
import { getTemplateById } from '../utils/resumeTemplates';

const SIDEBAR_SECTIONS = ['Skills', 'Languages', 'Certifications'];

function SectionBlock({ title, html, headingClass, centered }) {
  return (
    <section className={`resume-section mb-6 break-inside-avoid last:mb-0 ${centered ? 'text-center' : 'text-justify'}`}>
      <h3 className={`mb-2.5 break-inside-avoid ${headingClass}`}>{title}</h3>
      <div
        className="space-y-2 text-[13.5px] leading-relaxed text-justify text-ink-700 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:mb-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
}

const ResumePreview = forwardRef(function ResumePreview(
  { markdown, matchedKeywords = [], showHighlights = false, templateId = 'classic-manuscript' },
  ref
) {
  const template = getTemplateById(templateId);
  const theme = template.theme;

  const sections = useMemo(() => parseResumeSections(markdown), [markdown]);
  const header = useMemo(() => parseResumeHeader(sections.Header), [sections]);

  const orderedKeys = useMemo(() => {
    const known = RESUME_SECTION_ORDER.filter((key) => sections[key]);
    const extra = Object.keys(sections).filter((key) => key !== 'Header' && !RESUME_SECTION_ORDER.includes(key));
    return [...known, ...extra];
  }, [sections]);

  const buildHtml = (key) => markdownToHtml(sections[key]);

  const isSidebar = template.layout === 'sidebar';
  const sidebarKeys = isSidebar ? orderedKeys.filter((k) => SIDEBAR_SECTIONS.includes(k)) : [];
  const mainKeys = isSidebar ? orderedKeys.filter((k) => !SIDEBAR_SECTIONS.includes(k)) : orderedKeys;

  const headerBlock = (
    <div className={theme.headerAlign}>
      {header.name && <h1 className={theme.nameFont}>{header.name}</h1>}
      {header.title && <p className={`mt-1 ${theme.titleFont}`}>{header.title}</p>}
      {header.contacts?.length > 0 && (
        <div
          className={`mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-ink-500 ${
            theme.headerAlign === 'text-center' ? 'justify-center' : ''
          } ${theme.headerBand ? 'text-paper-200/80' : ''}`}
        >
          {header.contacts.map((c) => (
            <span key={c} dangerouslySetInnerHTML={{ __html: inlineMarkdown(c) }} />
          ))}
        </div>
      )}
    </div>
  );

  const wrapperTone = theme.headerBand
    ? theme.headerBandSoft
      ? 'bg-moss-50'
      : 'bg-ink-900'
    : '';

  return (
    <div
      ref={ref}
      className={`${theme.manuscriptTexture ? 'manuscript' : ''} ${theme.pageBg} h-fit self-start rounded-2xl text-ink-900 shadow-card`}
      id="resume-preview-content"
    >
      {/* Header — always pinned to the very top, never mixed into body content */}
      <div className={`rounded-t-2xl px-8 py-8 sm:px-12 ${wrapperTone} ${theme.headerBand ? '' : `border-b ${theme.rule}`} ${theme.headerMono ? 'font-mono' : ''}`}>
        {headerBlock}
      </div>

      <div className={`rounded-b-2xl px-8 py-8 sm:px-12 ${isSidebar ? 'grid gap-8 sm:grid-cols-[1fr_2fr]' : ''}`}>
        {isSidebar && (
          <aside className={`break-inside-avoid rounded-xl p-5 ${theme.sidebarBg} ${theme.sidebarText}`}>
            {sidebarKeys.length === 0 && <p className="text-xs opacity-60">No sidebar content</p>}
            {sidebarKeys.map((key) => (
              <div key={key} className="mb-6 break-inside-avoid last:mb-0">
                <h3 className={`mb-2 ${theme.sidebarHeading}`}>{key}</h3>
                <div
                  className="space-y-1.5 text-[13px] leading-relaxed text-justify opacity-90 [&_ul]:list-disc [&_ul]:pl-4 [&_li]:mb-1"
                  dangerouslySetInnerHTML={{ __html: buildHtml(key) }}
                />
              </div>
            ))}
          </aside>
        )}

        <div>
          {orderedKeys.length === 0 && (
            <p className="text-sm text-ink-400">Your tailored resume will appear here once generated.</p>
          )}

          {mainKeys.map((key) => {
            const isExperience = key === 'Experience' && template.layout === 'timeline';
            return (
              <div key={key} className={isExperience ? 'relative border-l-2 border-ink-100 pl-5' : ''}>
                {isExperience && (
                  <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-amber-500" />
                )}
                <SectionBlock
                  title={key}
                  html={buildHtml(key)}
                  headingClass={theme.sectionHeading}
                  centered={theme.centeredSections}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default ResumePreview;
