/**
 * ELITE SPACES PK - Utilities
 * Text splitting, counter tweens, and image preloading.
 */

/**
 * Robust line and word text splitter for GSAP mask reveals.
 * Splits text into lines and inner spans wrapped in overflow:hidden containers.
 * Preserves inner HTML such as <em class="accent-gold">...</em>.
 *
 * @param {HTMLElement|string} target - Element or selector
 * @returns {Array<HTMLElement>} Array of inner line spans ready for translateY animations
 */
export function splitLinesAndWords(target) {
  const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target];
  const allLineInners = [];

  elements.forEach((el) => {
    if (!el || el.dataset.splitDone) return;
    el.dataset.splitDone = "true";

    // Split by explicit line breaks or sentences/lines
    const rawHTML = el.innerHTML.trim();
    
    // Check if the element contains <br> or multiple lines
    const parts = rawHTML.split(/<br\s*\/?>/i);

    el.innerHTML = '';
    parts.forEach((part) => {
      const lineMask = document.createElement('span');
      lineMask.className = 'line-mask';
      lineMask.style.display = 'block';
      lineMask.style.overflow = 'hidden';
      lineMask.style.lineHeight = 'inherit';

      const lineInner = document.createElement('span');
      lineInner.className = 'line-inner';
      lineInner.style.display = 'block';
      lineInner.style.willChange = 'transform';
      lineInner.innerHTML = part.trim();

      lineMask.appendChild(lineInner);
      el.appendChild(lineMask);
      allLineInners.push(lineInner);
    });
  });

  return allLineInners;
}

/**
 * Preload an array of image URLs
 * @param {Array<string>} urls
 * @returns {Promise<void>}
 */
export function preloadImages(urls) {
  const uniqueUrls = [...new Set(urls.filter(Boolean))];
  const promises = uniqueUrls.map((url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ url, status: 'ok' });
      img.onerror = () => resolve({ url, status: 'error' });
      img.src = url;
    });
  });
  return Promise.all(promises);
}

/**
 * Format number with commas
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  return Math.round(num).toLocaleString('en-US');
}

/**
 * Check if the user prefers reduced motion
 * @returns {boolean}
 */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
