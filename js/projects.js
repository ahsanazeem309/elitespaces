/**
 * ELITE SPACES PK - Featured Projects Module
 * PINNED SCROLL-TO-BUILD ARCHITECTURAL EXHIBITION
 *
 * Pinned stage: Project cards glide from coordinates and assemble into their
 * 3-column matrix, with status badges igniting and inner images settling on scroll.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from './images.js';
import { prefersReducedMotion } from './utils.js';

export function initProjects() {
  const projectsWrapper = document.getElementById('projects');
  const projectsStage = document.getElementById('projects-stage');
  const grid = document.getElementById('projects-grid');
  if (!projectsWrapper || !projectsStage || !grid) return;

  // Render 6 Project Cards
  grid.innerHTML = images.projects.map((project, index) => {
    const directions = ['left', 'bottom', 'right'];
    const dir = directions[index % 3];
    const isCompleted = project.status.toLowerCase().includes('completed');
    const badgeClass = isCompleted ? 'completed' : 'construction';

    return `
      <article class="project-card" data-direction="${dir}" id="project-card-${project.id}">
        <div class="project-img-frame">
          <img 
            src="${project.url}" 
            alt="${project.alt}" 
            class="project-card-img" 
            width="${project.width}" 
            height="${project.height}"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="project-gradient-overlay"></div>
        
        <div class="project-badge ${badgeClass}">
          <span class="status-dot"></span>
          <span>${project.status}</span>
        </div>

        <div class="project-card-content">
          <h3 class="project-card-title">${project.title}</h3>
          <p class="project-card-meta">${project.location} · ${project.unitType}</p>
          <a href="#cta" class="btn-pill btn-gold btn-sm project-pill-btn" aria-label="Inquire about ${project.title}">
            <span>View project</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      </article>
    `;
  }).join('');

  const cards = grid.querySelectorAll('.project-card');

  if (prefersReducedMotion()) {
    gsap.set(cards, { opacity: 1, x: 0, y: 0 });
    return;
  }

  // Initial offscreen assembly positions
  cards.forEach((card) => {
    const dir = card.dataset.direction;
    const initialX = dir === 'left' ? -90 : dir === 'right' ? 90 : 0;
    const initialY = dir === 'bottom' ? 80 : 40;
    gsap.set(card, { opacity: 0, x: initialX, y: initialY, scale: 0.92 });
  });

  // Pinned Stage Scrub: Cards assemble into the grid by scroll
  const projectsScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: projectsWrapper,
      start: 'top top',
      end: '+=280%',
      pin: projectsStage,
      pinSpacing: true,
      scrub: 0.6,
      anticipatePin: 1
    }
  });

  // Cards assemble sequentially into the 3-column layout
  cards.forEach((card, index) => {
    projectsScrollTl.to(
      card,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        duration: 2.5,
        ease: 'power3.out'
      },
      index * 0.8
    );

    // Inner image settles into alignment
    const img = card.querySelector('.project-card-img');
    if (img) {
      projectsScrollTl.fromTo(
        img,
        { yPercent: -10, scale: 1.15 },
        { yPercent: 0, scale: 1.0, duration: 3.0, ease: 'none' },
        index * 0.8
      );
    }
  });
}
