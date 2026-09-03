const PDFMAKE_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js";
const PDFMAKE_FONTS_URL = "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.min.js";

let pdfMakePromise = null;

const loadScript = (src) => new Promise((resolve, reject) => {
  const existing = document.querySelector(`script[src="${src}"]`);

  if (existing?.dataset.loaded === "true") {
    resolve();
    return;
  }

  const script = existing || document.createElement("script");
  script.src = src;
  script.async = true;
  script.onload = () => {
    script.dataset.loaded = "true";
    resolve();
  };
  script.onerror = () => reject(new Error(`Unable to load ${src}`));

  if (!existing) document.head.appendChild(script);
});

export const loadPdfMake = () => {
  if (window.pdfMake?.createPdf && window.pdfMake?.vfs) {
    return Promise.resolve(window.pdfMake);
  }

  if (!pdfMakePromise) {
    pdfMakePromise = loadScript(PDFMAKE_URL)
      .then(() => loadScript(PDFMAKE_FONTS_URL))
      .then(() => window.pdfMake)
      .catch((error) => {
        pdfMakePromise = null;
        throw error;
      });
  }

  return pdfMakePromise;
};
