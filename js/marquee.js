/**
 * ELITE SPACES PK - Marquee Section Module
 * Infinite outlined typography strip with scroll scrubbing,
 * direction switching on reverse scroll, and Lenis velocity-driven liquid skew.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

/**
 * Initialize marquee animation
 * @param {import('lenis').default} lenisInstance
 */
export function initMarquee(lenisInstance) {
  const marqueeSection = document.getElementById('marquee');
  const marqueeTrack = document.getElementById('marquee-track');

  if (!marqueeSection || !marqueeTrack) return;
  if (prefersReducedMotion()) return;

  let currentX = 0;
  let targetSkew = 0;
  let currentSkew = 0;
  let scrollDirection = 1;

  // Set initial position
  gsap.set(marqueeTrack, { x: 0 });

  // 1. Scroll-driven movement: 0.3px per px scrolled + direction switching
  ScrollTrigger.create({
    trigger: marqueeSection,
    start: 'top bottom',
    end: 'bottom top',
    onUpdate: (self) => {
      // Direction: 1 for scrolling down, -1 for scrolling up
      scrollDirection = self.direction === -1 ? -1 : 1;
      
      // Move track by ~0.3px per scroll delta
      const delta = self.getVelocity() * 0.003;
      currentX -= (0.45 * scrollDirection) + delta;

      // Wrap infinitely
      const halfWidth = marqueeTrack.scrollWidth / 2;
      if (Math.abs(currentX) >= halfWidth) {
        currentX = 0;
      }

      gsap.set(marqueeTrack, { x: currentX });
    }
  });

  // 2. Velocity-responsive liquid skewX (clamped to ±6°)
  if (lenisInstance) {
    lenisInstance.on('scroll', ({ velocity }) => {
      // Clamp skew to max ±6 deg
      targetSkew = gsap.utils.clamp(-6, 6, velocity * 0.04);
    });

    // Smooth return to 0 deg with ticker
    gsap.ticker.add(() => {
      currentSkew += (targetSkew - currentSkew) * 0.1;
      // Decay target skew toward 0 when scrolling stops
      targetSkew *= 0.92;
      gsap.set(marqueeTrack, { skewX: currentSkew });
    });
  } else {
    // Fallback ScrollTrigger velocity tracking
    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const vel = self.getVelocity() * 0.004;
        const skew = gsap.utils.clamp(-6, 6, vel);
        gsap.to(marqueeTrack, {
          skewX: skew,
          duration: 0.3,
          ease: 'power1.out',
          overwrite: 'auto'
        });
      }
    });
  }
}
