/**
 * ELITE SPACES PK - Testimonials / Reviews Module
 * PINNED SCROLL-TO-BUILD CLIENT TESTIMONIALS
 *
 * Pinned stage: 3 review cards glide from coordinates and assemble
 * into their 3-column row, with gold star clusters igniting on scroll.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

export function initReviews() {
  const reviewsWrapper = document.getElementById('reviews');
  const reviewsStage = document.getElementById('reviews-stage');
  const cards = document.querySelectorAll('.review-card');

  if (!reviewsWrapper || !reviewsStage || !cards.length) return;

  if (prefersReducedMotion()) {
    gsap.set(cards, { opacity: 1, x: 0, y: 0 });
    return;
  }

  // Initial offscreen positions
  cards.forEach((card) => {
    const dir = card.dataset.direction;
    const fromX = dir === 'left' ? -80 : dir === 'right' ? 80 : 0;
    const fromY = dir === 'center' ? 70 : 30;
    gsap.set(card, { opacity: 0, x: fromX, y: fromY, scale: 0.94 });
  });

  // Pinned Stage Scrub Timeline
  const reviewsScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: reviewsWrapper,
      start: 'top top',
      end: '+=220%',
      pin: reviewsStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1
    }
  });

  // Cards arrange into their 3-column layout sequentially
  cards.forEach((card, i) => {
    reviewsScrollTl.to(
      card,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 2.5,
        ease: 'power3.out'
      },
      i * 1.0
    );

    // Stars illuminate
    const stars = card.querySelectorAll('.review-stars svg');
    if (stars.length) {
      reviewsScrollTl.fromTo(
        stars,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, stagger: 0.1, ease: 'back.out(2)' },
        i * 1.0 + 0.8
      );
    }
  });
}
