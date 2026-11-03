/**
 * ELITE SPACES PK - Social Proof Module
 * PINNED SCROLL-TO-BUILD MATRIX
 *
 * Pinned stage: architectural dividers draw like CAD schematics,
 * stat chambers snap into their 4-column matrix, and numbers count up to lock.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLinesAndWords, prefersReducedMotion } from './utils.js';

export function initProof() {
  const proofWrapper = document.getElementById('proof');
  const proofStage = document.getElementById('proof-stage');
  const headline = document.getElementById('proof-headline');
  const eyebrow = proofWrapper.querySelector('.proof-eyebrow');
  const grid = document.getElementById('proof-grid');
  const cells = grid.querySelectorAll('.proof-cell');
  const counterElements = grid.querySelectorAll('.counter-val');

  if (!proofWrapper || !proofStage) return;

  const headlineLines = splitLinesAndWords(headline);

  gsap.set(eyebrow, { opacity: 0, y: 20 });
  gsap.set(headlineLines, { yPercent: 110, opacity: 0 });
  gsap.set(grid, { opacity: 0, scale: 0.85 });
  gsap.set(cells, { opacity: 0, y: 40 });

  if (prefersReducedMotion()) {
    gsap.to([eyebrow, headlineLines, grid, cells], {
      opacity: 1,
      y: 0,
      yPercent: 0,
      scale: 1,
      duration: 0.8
    });
    counterElements.forEach((el) => {
      el.textContent = el.dataset.target;
    });
    return;
  }

  // Pinned Stage Scrub Timeline: Content arranges itself through scroll
  const proofScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: proofWrapper,
      start: 'top top',
      end: '+=200%',
      pin: proofStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1
    }
  });

  // 1. Eyebrow and Headline lines assemble
  proofScrollTl.to(eyebrow, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 0);
  proofScrollTl.fromTo(
    eyebrow.querySelector('.eyebrow-line'),
    { scaleX: 0 },
    { scaleX: 1, duration: 1.2, ease: 'power3.out' },
    0.4
  );
  proofScrollTl.to(
    headlineLines,
    { yPercent: 0, opacity: 1, duration: 2.0, stagger: 0.3, ease: 'power3.out' },
    0.8
  );

  // 2. Matrix Grid draws and scales in
  proofScrollTl.to(
    grid,
    { opacity: 1, scale: 1, duration: 2.5, ease: 'power3.out' },
    2.2
  );

  // 3. Stat cells assemble into their quadrant positions
  proofScrollTl.to(
    cells,
    {
      opacity: 1,
      y: 0,
      duration: 2.5,
      stagger: 0.4,
      ease: 'power3.out'
    },
    3.2
  );

  // 4. Numbers count up to their locked values
  counterElements.forEach((counterEl, i) => {
    const targetVal = parseFloat(counterEl.dataset.target) || 0;
    const obj = { val: 0 };

    proofScrollTl.to(
      obj,
      {
        val: targetVal,
        duration: 3.0,
        ease: 'power2.out',
        onUpdate: () => {
          counterEl.textContent = Math.round(obj.val);
        }
      },
      4.0 + i * 0.3
    );
  });
}
