/**
 * ELITE SPACES PK - Final CTA Module
 * PINNED SCROLL-TO-BUILD FINALE
 *
 * Pinned stage: Final architectural grid draws, headline scales and locks,
 * consultation button assembles with desktop magnetic hover, and assurance metrics snap into place.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

export function initCTA() {
  const ctaWrapper = document.getElementById('cta');
  const ctaStage = document.getElementById('cta-stage');
  const ctaGrid = document.getElementById('cta-grid');
  const headline = document.getElementById('cta-headline');
  const eyebrow = document.getElementById('cta-eyebrow');
  const magneticWrap = document.getElementById('cta-magnetic-wrap');
  const button = document.getElementById('cta-btn');
  const metrics = document.getElementById('cta-metrics');

  if (!ctaWrapper || !ctaStage || !headline) return;

  if (prefersReducedMotion()) {
    gsap.set([eyebrow, headline, magneticWrap, metrics.children], {
      opacity: 1,
      scale: 1,
      y: 0
    });
    return;
  }

  // Initial States
  gsap.set(eyebrow, { opacity: 0, y: 20 });
  gsap.set(headline, { opacity: 0, scale: 0.85 });
  gsap.set(magneticWrap, { opacity: 0, y: 35 });
  gsap.set(metrics.children, { opacity: 0, y: 35 });

  // Pinned Stage Scrub Timeline: Content arranges itself on scroll
  const ctaScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: ctaWrapper,
      start: 'top top',
      end: '+=220%',
      pin: ctaStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1
    }
  });

  // 1. Grid Parallax & Eyebrow
  ctaScrollTl.to(
    ctaGrid,
    { y: () => window.innerHeight * 0.15, duration: 6.0, ease: 'none' },
    0
  );

  ctaScrollTl.to(
    eyebrow,
    { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out' },
    0.3
  );

  // 2. Headline scales in and locks
  ctaScrollTl.to(
    headline,
    { opacity: 1, scale: 1, duration: 2.5, ease: 'power3.out' },
    1.2
  );

  // 3. Consultation Button glides into position
  ctaScrollTl.to(
    magneticWrap,
    { opacity: 1, y: 0, duration: 2.2, ease: 'power3.out' },
    2.4
  );

  // 4. Assurance metrics snap into baseline
  ctaScrollTl.to(
    metrics.children,
    { opacity: 1, y: 0, duration: 2.2, stagger: 0.5, ease: 'power3.out' },
    3.2
  );

  // Desktop Magnetic Hover Button
  if (window.matchMedia('(hover: hover) and (min-width: 1024px)').matches && magneticWrap && button) {
    const strength = 18;

    magneticWrap.addEventListener('mousemove', (e) => {
      const rect = magneticWrap.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;

      gsap.to(button, {
        x: (relX / (rect.width / 2)) * strength,
        y: (relY / (rect.height / 2)) * strength,
        duration: 0.35,
        ease: 'power2.out'
      });
    });

    magneticWrap.addEventListener('mouseleave', () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  }
}
