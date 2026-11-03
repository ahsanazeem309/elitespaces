/**
 * ELITE SPACES PK - About Section Module
 * PINNED SCROLL-TO-BUILD ATELIER
 *
 * Pinned stage: Craftsman photo wipes in from left via clip-path,
 * rotating 'Since 2008' gold seal spins and locks into the corner,
 * and editorial story blocks arrange themselves step by step.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { splitLinesAndWords, prefersReducedMotion } from './utils.js';

export function initAbout() {
  const aboutWrapper = document.getElementById('about');
  const aboutStage = document.getElementById('about-stage');
  const imageWrapper = document.getElementById('about-image-wrapper');
  const image = document.getElementById('about-image');
  const badge = document.getElementById('about-badge');
  const eyebrow = aboutWrapper.querySelector('.about-text-col .eyebrow');
  const headline = document.getElementById('about-headline');
  const paragraphs = document.getElementById('about-paragraphs');

  if (!aboutWrapper || !aboutStage || !imageWrapper) return;

  const headlineLines = splitLinesAndWords(headline);

  gsap.set(imageWrapper, { clipPath: 'inset(0% 100% 0% 0%)' });
  gsap.set(image, { scale: 1.3, yPercent: -8 });
  gsap.set(badge, { scale: 0, rotation: -180, opacity: 0 });
  gsap.set(eyebrow, { opacity: 0, y: 20 });
  gsap.set(headlineLines, { yPercent: 110, opacity: 0 });
  gsap.set(paragraphs.children, { opacity: 0, y: 30 });

  if (prefersReducedMotion()) {
    gsap.set([imageWrapper, image, badge, eyebrow, headlineLines, paragraphs.children], {
      opacity: 1,
      clipPath: 'none',
      transform: 'none'
    });
    return;
  }

  // Pinned Stage Scrub Timeline: Content arranges itself through scroll
  const aboutScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: aboutWrapper,
      start: 'top top',
      end: '+=240%',
      pin: aboutStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1
    }
  });

  // 1. Image wipe & inner photo settle
  aboutScrollTl.to(
    imageWrapper,
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 4.0, ease: 'power2.inOut' },
    0
  );

  aboutScrollTl.to(
    image,
    { scale: 1.0, yPercent: 0, duration: 4.5, ease: 'none' },
    0.5
  );

  // 2. Gold seal badge spins and locks into the corner
  aboutScrollTl.to(
    badge,
    { scale: 1, rotation: 0, opacity: 1, duration: 2.5, ease: 'power3.out' },
    2.5
  );

  // 3. Eyebrow and Headline lines assemble
  aboutScrollTl.to(eyebrow, { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' }, 1.0);
  aboutScrollTl.fromTo(
    eyebrow.querySelector('.eyebrow-line'),
    { scaleX: 0 },
    { scaleX: 1, duration: 1.2, ease: 'power3.out' },
    1.4
  );

  aboutScrollTl.to(
    headlineLines,
    { yPercent: 0, opacity: 1, duration: 2.0, stagger: 0.3, ease: 'power3.out' },
    2.0
  );

  // 4. Paragraphs arrange into their layout
  aboutScrollTl.to(
    paragraphs.children,
    { opacity: 1, y: 0, duration: 2.5, stagger: 0.6, ease: 'power3.out' },
    3.5
  );
}
