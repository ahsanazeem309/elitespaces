/**
 * ELITE SPACES PK - Navigation Module
 * Handles header blur, active link tracking via ScrollTrigger,
 * mobile drawer with staggered reveals, progress bar, and back-to-top.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Initialize navigation and global chrome
 * @param {import('lenis').default} lenisInstance
 */
export function initNav(lenisInstance) {
  const header = document.getElementById('site-header');
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressBar = document.getElementById('scroll-progress-bar');
  const sections = ['hero', 'proof', 'projects', 'process', 'about', 'reviews', 'faq', 'cta'];

  // 1. Lenis smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        
        // If mobile overlay is open, close it
        if (mobileOverlay.classList.contains('active')) {
          closeMobileMenu();
        }

        if (lenisInstance) {
          lenisInstance.scrollTo(targetEl, { offset: -30, duration: 1.4, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // 2. Smart Show/Hide Header on Scroll Direction (Prevents header from covering section tops)
  let lastScrollY = 0;
  let isHeaderHidden = false;

  const updateHeaderVisibility = (currentScroll) => {
    // If at top of page, always show header in relaxed state
    if (currentScroll < 60) {
      if (isHeaderHidden) {
        header.classList.remove('header-hidden');
        isHeaderHidden = false;
      }
      header.classList.remove('scrolled');
      lastScrollY = currentScroll;
      return;
    }

    header.classList.add('scrolled');

    const diff = currentScroll - lastScrollY;

    // Scrolling down: hide header so section top content is 100% visible and unblocked
    if (diff > 8 && !isHeaderHidden && currentScroll > 120) {
      header.classList.add('header-hidden');
      isHeaderHidden = true;
    } 
    // Scrolling up: reveal header smoothly
    else if (diff < -6 && isHeaderHidden) {
      header.classList.remove('header-hidden');
      isHeaderHidden = false;
    }

    lastScrollY = currentScroll;
  };

  if (lenisInstance) {
    lenisInstance.on('scroll', ({ scroll }) => {
      updateHeaderVisibility(scroll);
    });
  } else {
    window.addEventListener('scroll', () => {
      updateHeaderVisibility(window.scrollY);
    }, { passive: true });
  }

  // Hover near top of viewport reveals header if hidden
  window.addEventListener('mousemove', (e) => {
    if (e.clientY <= 35 && isHeaderHidden) {
      header.classList.remove('header-hidden');
      isHeaderHidden = false;
    }
  });

  // 3. Viewport Bottom Scroll Progress Bar (Scrubbed to total document height)
  if (progressBar) {
    gsap.to(progressBar, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1
      }
    });
  }

  // 4. Back to top button visibility and click
  if (backToTopBtn) {
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top+=100',
      onEnter: () => backToTopBtn.classList.add('visible'),
      onLeaveBack: () => backToTopBtn.classList.remove('visible')
    });

    backToTopBtn.addEventListener('click', () => {
      if (lenisInstance) {
        lenisInstance.scrollTo(0, { duration: 1.6, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // 5. Active section indicator tracking via ScrollTrigger onToggle
  sections.forEach((sectionId) => {
    const sectionEl = document.getElementById(sectionId);
    if (!sectionEl) return;

    ScrollTrigger.create({
      trigger: sectionEl,
      start: 'top 55%',
      end: 'bottom 45%',
      onToggle: (self) => {
        if (self.isActive) {
          updateActiveLink(sectionId);
        }
      }
    });
  });

  function updateActiveLink(sectionId) {
    desktopLinks.forEach((link) => {
      if (link.dataset.section === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach((link) => {
      if (link.dataset.section === sectionId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // 6. Mobile Drawer toggle & keyboard handling
  let isMobileOpen = false;

  function openMobileMenu() {
    isMobileOpen = true;
    mobileBtn.classList.add('open');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileOverlay.classList.add('active');
    mobileOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Stagger in links
    gsap.fromTo(
      mobileLinks,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
    );
  }

  function closeMobileMenu() {
    isMobileOpen = false;
    mobileBtn.classList.remove('open');
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileOverlay.classList.remove('active');
    mobileOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mobileBtn.addEventListener('click', () => {
    if (isMobileOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  // Close mobile menu on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isMobileOpen) {
      closeMobileMenu();
    }
  });
}
