/**
 * Exports a DOM node to a downloadable, full-length PDF using html2pdf.js.
 *
 * The live preview node sits inside animated (Framer Motion) wrappers and
 * below a sticky navbar. html2canvas can mis-measure elements like that —
 * transforms, sticky positioning, and mid-animation opacity can all cause
 * the capture to crop early. To avoid that entirely, we clone the node into
 * a plain, off-screen container with an explicit width and no ancestor
 * transforms, capture *that*, then remove it.
 */
export async function exportElementToPdf(element, filename = 'resume.pdf') {
  if (!element) throw new Error('Nothing to export yet — generate a resume first.');

  const html2pdf = (await import('html2pdf.js')).default;

  const width = element.offsetWidth || 794; // fallback ≈ A4 at 96dpi
  const clone = element.cloneNode(true);

  clone.style.transform = 'none';
  clone.style.opacity = '1';
  clone.style.width = `${width}px`;
  clone.style.maxWidth = 'none';
  clone.style.margin = '0';
  clone.style.padding = '0';
  clone.style.background = '#ffffff';

  const wrapper = document.createElement('div');
  wrapper.style.position = 'fixed';
  wrapper.style.top = '0';
  wrapper.style.left = '0';
  wrapper.style.transform = `translateX(-${width + 200}px)`;
  wrapper.style.width = `${width}px`;
  wrapper.style.zIndex = '-1';
  wrapper.style.pointerEvents = 'none';
  wrapper.appendChild(clone);
  document.body.appendChild(wrapper);

  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  const options = {
    margin: [8, 8, 8, 8],
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: width,
      width,
      scrollX: 0,
      scrollY: 0
    },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    await html2pdf().set(options).from(clone).save();
  } finally {
    document.body.removeChild(wrapper);
  }
}
