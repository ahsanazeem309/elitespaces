/**
 * ELITE SPACES PK - Main Application Entry
 * GSAP 3 + ScrollTrigger + Lenis Smooth Scroll Integration
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import { prefersReducedMotion } from './utils.js';
import { initNav } from './nav.js';
import { initHero } from './hero.js';
import { initMarquee } from './marquee.js';
import { initProof } from './proof.js';
import { initProjects } from './projects.js';
import { initProcess } from './process.js';
import { initAbout } from './about.js';
import { initReviews } from './reviews.js';
import { initFAQ } from './faq.js';
import { initCTA } from './cta.js';

// 1. Register ScrollTrigger ONCE globally
gsap.registerPlugin(ScrollTrigger);

// Ensure proper scroll restoration on refresh
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

/**
 * Main application bootstrapper
 */
async function bootstrap() {
  const isReducedMotion = prefersReducedMotion();
  let lenisInstance = null;

  // 2. Setup Lenis Smooth Scrolling (Disabled if reduced motion is requested)
  if (!isReducedMotion) {
    lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.8
    });

    // Synchronize Lenis scroll position with GSAP ScrollTrigger
    lenisInstance.on('scroll', ScrollTrigger.update);

    // Bind Lenis animation frame to GSAP's central ticker
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });

    // Turn off GSAP lag smoothing to maintain lock-step synchronization
    gsap.ticker.lagSmoothing(0);
  }

  // Set current year in footer
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 3. Initialize section modules
  initNav(lenisInstance);
  const heroIntroTimeline = initHero();
  initMarquee(lenisInstance);
  initProof();
  initProjects();
  await initProcess(lenisInstance);
  initAbout();
  initReviews();
  initFAQ();
  initCTA();

  // 4. Preloader Sequence (1.2s line draw, lift away, trigger hero intro)
  runPreloader(() => {
    if (heroIntroTimeline) {
      heroIntroTimeline.play();
    }
    // Refresh ScrollTrigger calculations after DOM is fully painted
    ScrollTrigger.refresh();
  });

  // 5. Clean resize handling
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);
  });
}

/**
 * Preloader animation sequence
 * @param {Function} onCompleteCallback
 */
function runPreloader(onCompleteCallback) {
  const preloader = document.getElementById('preloader');
  const bar = document.getElementById('preloader-bar');

  if (!preloader || !bar) {
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  if (prefersReducedMotion()) {
    preloader.style.display = 'none';
    if (onCompleteCallback) onCompleteCallback();
    return;
  }

  const preloaderTl = gsap.timeline({
    onComplete: () => {
      preloader.style.display = 'none';
      if (onCompleteCallback) onCompleteCallback();
    }
  });

  preloaderTl
    // Gold line draws across in ~1.1s
    .to(bar, {
      scaleX: 1,
      duration: 1.1,
      ease: 'power2.inOut'
    })
    // Screen lifts away
    .to(preloader, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power3.inOut'
    }, '+=0.1');
}

// Kick off when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
