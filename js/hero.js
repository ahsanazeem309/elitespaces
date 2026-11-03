/**
 * ELITE SPACES PK - Hero Section Module
 * PINNED SCROLL-TO-BUILD TRANSFORMATION
 *
 * Pinned 100dvh stage: bare architectural drafting blueprint & framing transforms
 * into finished luxury twilight estate via clipPath wipe and gold laser scan line.
 * As the user scrolls, headline, narrative, and action buttons arrange themselves into place.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLinesAndWords, prefersReducedMotion } from './utils.js';

export function initHero() {
  const heroWrapper = document.getElementById('hero');
  const heroStage = document.getElementById('hero-stage');
  const heroVisualLayer = document.getElementById('hero-visual-layer');
  const finishedLayer = document.getElementById('hero-finished-layer');
  const scanLine = document.getElementById('hero-scan-line');
  const eyebrow = document.getElementById('hero-eyebrow');
  const headline = document.getElementById('hero-headline');
  const paragraph = document.getElementById('hero-paragraph');
  const actions = document.getElementById('hero-actions');
  const scrollCue = document.getElementById('hero-scroll-cue');

  if (!heroWrapper || !heroStage) return null;

  const headlineLines = splitLinesAndWords(headline);

  // Initial States
  gsap.set(finishedLayer, { clipPath: 'inset(0% 100% 0% 0%)' });
  gsap.set(eyebrow, { opacity: 0, y: 30 });
  gsap.set(headlineLines, { yPercent: 110, opacity: 0 });
  gsap.set(paragraph, { opacity: 0, y: 30 });
  gsap.set(actions.children, { opacity: 0, y: 25 });
  gsap.set(scrollCue, { opacity: 0 });

  if (prefersReducedMotion()) {
    gsap.set(finishedLayer, { clipPath: 'none' });
    gsap.to([eyebrow, headlineLines, paragraph, actions.children, scrollCue], {
      opacity: 1,
      y: 0,
      yPercent: 0,
      duration: 0.8,
      stagger: 0.1
    });
    return null;
  }

  // Preloader kick-off timeline (initial entrance before scroll begins)
  const initialEntranceTl = gsap.timeline({ paused: true });
  initialEntranceTl
    .to(eyebrow, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
    .fromTo(
      eyebrow.querySelector('.eyebrow-line'),
      { scaleX: 0 },
      { scaleX: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )
    .to(headlineLines, { yPercent: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: 'power3.out' }, '-=0.4')
    .to(scrollCue, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.3');

  // Pinned Scroll-to-Build Timeline: Content arranges itself as visitor scrolls
  const heroScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroWrapper,
      start: 'top top',
      end: '+=240%',
      pin: heroStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        // Laser scan line position across the wipe
        if (p > 0.08 && p < 0.88) {
          const norm = (p - 0.08) / 0.80;
          gsap.set(scanLine, { left: `${norm * 100}%`, opacity: 1 });
        } else {
          gsap.set(scanLine, { opacity: 0 });
        }
      }
    }
  });

  // 1. Slow camera push-out
  heroScrollTl.fromTo(
    heroVisualLayer,
    { scale: 1.15 },
    { scale: 1.0, ease: 'none', duration: 10 },
    0
  );

  // 2. Blueprint to Finished Photographic Transformation
  heroScrollTl.fromTo(
    finishedLayer,
    { clipPath: 'inset(0% 100% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.inOut', duration: 7.5 },
    0.8
  );

  // 3. Narrative paragraph & Action buttons glide in and lock into place
  heroScrollTl.to(
    scrollCue,
    { opacity: 0, duration: 1, ease: 'power1.out' },
    1.0
  );

  heroScrollTl.fromTo(
    paragraph,
    { opacity: 0, y: 35 },
    { opacity: 1, y: 0, duration: 2.5, ease: 'power3.out' },
    3.0
  );

  heroScrollTl.fromTo(
    actions.children,
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 2.5, stagger: 0.4, ease: 'power3.out' },
    4.5
  );

  return initialEntranceTl;
}
