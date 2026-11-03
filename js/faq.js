/**
 * ELITE SPACES PK - FAQ Module
 * PINNED SCROLL-TO-BUILD SPECIFICATION ROSTER
 *
 * Pinned stage: 4 accordion items fly in and assemble sequentially from alternating
 * directions into an architectural roster on scroll, with accessible single-open accordion.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './utils.js';

export function initFAQ() {
  const faqWrapper = document.getElementById('faq');
  const faqStage = document.getElementById('faq-stage');
  const items = document.querySelectorAll('.faq-item');

  if (!faqWrapper || !faqStage || !items.length) return;

  if (prefersReducedMotion()) {
    gsap.set(items, { opacity: 1, x: 0 });
    initAccordionToggles(items);
    return;
  }

  // Initial offscreen positions
  items.forEach((item) => {
    const dir = item.dataset.direction;
    const initialX = dir === 'left' ? -70 : 70;
    gsap.set(item, { opacity: 0, x: initialX, y: 20 });
  });

  // Pinned Stage Scrub Timeline
  const faqScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: faqWrapper,
      start: 'top top',
      end: '+=220%',
      pin: faqStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1
    }
  });

  // Accordion items assemble one by one into the roster
  items.forEach((item, index) => {
    faqScrollTl.to(
      item,
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 2.2,
        ease: 'power3.out'
      },
      index * 0.9
    );
  });

  initAccordionToggles(items);
}

function initAccordionToggles(items) {
  items.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const inner = item.querySelector('.faq-inner');

    if (!trigger || !content || !inner) return;

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      items.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains('open')) {
          closeAccordionItem(otherItem);
        }
      });

      if (isOpen) {
        closeAccordionItem(item);
      } else {
        openAccordionItem(item);
      }
    });
  });

  function openAccordionItem(item) {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');
    const inner = item.querySelector('.faq-inner');

    item.classList.add('open');
    trigger.setAttribute('aria-expanded', 'true');

    gsap.to(content, {
      height: inner.offsetHeight,
      duration: 0.45,
      ease: 'power2.out',
      onComplete: () => {
        content.style.height = 'auto';
        ScrollTrigger.refresh();
      }
    });
  }

  function closeAccordionItem(item) {
    const trigger = item.querySelector('.faq-trigger');
    const content = item.querySelector('.faq-content');

    item.classList.remove('open');
    trigger.setAttribute('aria-expanded', 'false');

    gsap.to(content, {
      height: 0,
      duration: 0.35,
      ease: 'power2.inOut',
      onComplete: () => {
        ScrollTrigger.refresh();
      }
    });
  }
}
