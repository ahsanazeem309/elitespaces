/**
 * ELITE SPACES PK - Process Section Module
 * THE SIGNATURE SCROLL-TO-BUILD EXPERIENCE
 *
 * 4 chapters (Kitchen, Primary Bath, Lounge & Golf Sim, Backyard Pool).
 * Dual-layer framing vs finished transformation,
 * horizontal clipPath wipe, 2px gold glowing scan line, cinematic 1.12 to 1.0 scale,
 * 3 synchronized architectural phase captions per chapter (ZERO PERCENTAGES),
 * and bottom progress track.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { images } from './images.js';
import { preloadImages, prefersReducedMotion } from './utils.js';

/**
 * Initialize the signature Scroll-to-Build Process Section
 * @param {import('lenis').default} lenisInstance
 */
export async function initProcess(lenisInstance) {
  const container = document.getElementById('process-chapters-container');
  if (!container) return;

  const imageUrls = [];
  images.process.forEach((ch) => {
    imageUrls.push(ch.framing.url);
    imageUrls.push(ch.finished.url);
  });

  // Render 4 Chapter Stages (No percentages anywhere)
  container.innerHTML = images.process.map((ch, index) => {
    const isLastChapter = index === images.process.length - 1;
    const nextTargetId = isLastChapter ? '#cta' : `#chapter-${images.process[index + 1].id}`;
    const nextBtnText = isLastChapter ? 'Start your build' : 'Next room';

    return `
      <section class="chapter-wrapper" id="chapter-${ch.id}" data-chapter-index="${index}">
        <div class="chapter-stage" id="chapter-stage-${ch.id}">
          
          <!-- Cinematic Push-out Visual Layer -->
          <div class="chapter-visuals-container">
            <div class="chapter-zoom-layer" id="zoom-layer-${ch.id}">
              
              <!-- Bottom Layer: Framing / Construction + Blueprint Overlay -->
              <div class="chapter-layer chapter-layer-framing">
                <img 
                  src="${ch.framing.url}" 
                  alt="${ch.framing.alt}" 
                  width="${ch.framing.width}" 
                  height="${ch.framing.height}"
                  loading="eager"
                  decoding="async"
                />
                <div class="blueprint-overlay"></div>
                <div class="blueprint-schematic-lines"></div>
                <div class="blueprint-grid-canvas"></div>
                
                <!-- Architectural Dimension & Spec Tags -->
                <div class="blueprint-tag" style="top: 18%; left: 12%;">ELEV: +14' 6" · SPEC: KILN DRIED FIR</div>
                <div class="blueprint-tag" style="bottom: 22%; right: 15%;">ELITE SPACES PK ARCHITECTURAL SPEC 0${index + 1}-A</div>
              </div>

              <!-- Top Layer: Photographed Finished Space (Revealed via clip-path) -->
              <div class="chapter-layer chapter-layer-finished" id="finished-layer-${ch.id}">
                <img 
                  src="${ch.finished.url}" 
                  alt="${ch.finished.alt}" 
                  width="${ch.finished.width}" 
                  height="${ch.finished.height}"
                  loading="eager"
                  decoding="async"
                />
              </div>

            </div>

            <!-- Golden Laser Scan Line that tracks the reveal boundary -->
            <div class="chapter-scan-line" id="scan-line-${ch.id}"></div>

            <!-- Vignette shadow for readable UI -->
            <div class="chapter-stage-vignette"></div>
          </div>

          <!-- Chapter UI HUD Overlay -->
          <div class="chapter-ui-overlay">
            
            <!-- Top HUD Bar -->
            <div class="chapter-top-bar">
              <div class="chapter-indicator-badge">
                <span>${ch.chapterTitle}</span>
              </div>
              <div class="chapter-room-title">
                ${ch.roomName}
              </div>
            </div>

            <!-- Bottom HUD Bar -->
            <div class="chapter-bottom-bar">
              <!-- Synchronized Multi-Stage Captions Card (Architectural Phase Names) -->
              <div class="chapter-captions-card" id="caption-card-${ch.id}">
                <span class="chapter-stage-phase-tag" id="phase-tag-${ch.id}">${ch.captions[0].phase}</span>
                <h3 class="chapter-caption-heading font-serif" id="caption-heading-${ch.id}">
                  ${ch.captions[0].heading}
                </h3>
                <p class="chapter-caption-desc" id="caption-desc-${ch.id}">
                  ${ch.captions[0].description}
                </p>
              </div>

              <!-- Chapter Action Button -->
              <div class="chapter-actions">
                <a href="${nextTargetId}" class="btn-pill btn-gold btn-sm chapter-next-btn">
                  <span>${nextBtnText}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
            </div>

            <!-- Chapter Progress Track at Bottom -->
            <div class="chapter-progress-track">
              <div class="chapter-progress-fill" id="progress-fill-${ch.id}"></div>
            </div>

          </div>

        </div>
      </section>
    `;
  }).join('');

  await preloadImages(imageUrls);
  ScrollTrigger.refresh();

  if (prefersReducedMotion()) {
    images.process.forEach((ch) => {
      const finishedLayer = document.getElementById(`finished-layer-${ch.id}`);
      if (finishedLayer) finishedLayer.style.clipPath = 'none';
    });
    return;
  }

  const mm = gsap.matchMedia();

  images.process.forEach((ch) => {
    const wrapper = document.getElementById(`chapter-${ch.id}`);
    const stage = document.getElementById(`chapter-stage-${ch.id}`);
    const zoomLayer = document.getElementById(`zoom-layer-${ch.id}`);
    const finishedLayer = document.getElementById(`finished-layer-${ch.id}`);
    const scanLine = document.getElementById(`scan-line-${ch.id}`);
    const progressFill = document.getElementById(`progress-fill-${ch.id}`);
    const phaseTag = document.getElementById(`phase-tag-${ch.id}`);
    const captionHeading = document.getElementById(`caption-heading-${ch.id}`);
    const captionDesc = document.getElementById(`caption-desc-${ch.id}`);

    // Desktop and Tablet (>= 768px): 350% pin scroll length
    mm.add('(min-width: 768px)', () => {
      createChapterTimeline({
        wrapper, stage, zoomLayer, finishedLayer, scanLine,
        progressFill, phaseTag, captionHeading, captionDesc, ch,
        pinEnd: '+=350%', scrubDuration: 0.6
      });
    });

    // Mobile (< 768px): 250% pin scroll length
    mm.add('(max-width: 767px)', () => {
      createChapterTimeline({
        wrapper, stage, zoomLayer, finishedLayer, scanLine,
        progressFill, phaseTag, captionHeading, captionDesc, ch,
        pinEnd: '+=250%', scrubDuration: 0.4
      });
    });
  });

  container.querySelectorAll('.chapter-next-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('href');
      if (targetId && lenisInstance) {
        e.preventDefault();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          lenisInstance.scrollTo(targetEl, { offset: 0, duration: 1.4 });
        }
      }
    });
  });
}

function createChapterTimeline({
  wrapper,
  stage,
  zoomLayer,
  finishedLayer,
  scanLine,
  progressFill,
  phaseTag,
  captionHeading,
  captionDesc,
  ch,
  pinEnd,
  scrubDuration
}) {
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: pinEnd,
      pin: stage,
      pinSpacing: true,
      scrub: scrubDuration,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const rawProgress = self.progress;

        if (progressFill) {
          gsap.set(progressFill, { scaleX: rawProgress });
        }

        // Calculate reveal progress between 8% and 88%
        let revealProgress = 0;
        if (rawProgress >= 0.08 && rawProgress <= 0.88) {
          revealProgress = (rawProgress - 0.08) / 0.80;
        } else if (rawProgress > 0.88) {
          revealProgress = 1;
        }

        // Scan Line position and visibility
        if (scanLine) {
          if (rawProgress > 0.08 && rawProgress < 0.88) {
            const xPercent = revealProgress * 100;
            gsap.set(scanLine, {
              left: `${xPercent}%`,
              opacity: 1
            });
          } else {
            gsap.set(scanLine, { opacity: 0 });
          }
        }
      }
    }
  });

  // 1. Slow cinematic push-out scale from 1.12 to 1.0 across the whole pin
  masterTimeline.fromTo(
    zoomLayer,
    { scale: 1.12 },
    { scale: 1.0, ease: 'none', duration: 10 },
    0
  );

  // 2. Horizontal clipPath wipe from inset(0 100% 0 0) to inset(0 0% 0 0)
  masterTimeline.fromTo(
    finishedLayer,
    { clipPath: 'inset(0% 100% 0% 0%)' },
    {
      clipPath: 'inset(0% 0% 0% 0%)',
      ease: 'power2.inOut',
      duration: 8
    },
    0.8
  );

  // 3. Three-Stage Captions Transition (Phase I ➔ Phase II ➔ Phase III)
  masterTimeline.addLabel('phase1', 0);
  masterTimeline.addLabel('transitionToPhase2', 2.8);

  masterTimeline.to(
    [captionHeading, captionDesc, phaseTag],
    {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        phaseTag.textContent = ch.captions[1].phase;
        captionHeading.textContent = ch.captions[1].heading;
        captionDesc.textContent = ch.captions[1].description;
      },
      onReverseComplete: () => {
        phaseTag.textContent = ch.captions[0].phase;
        captionHeading.textContent = ch.captions[0].heading;
        captionDesc.textContent = ch.captions[0].description;
      }
    },
    2.8
  );

  masterTimeline.fromTo(
    [captionHeading, captionDesc, phaseTag],
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    },
    3.2
  );

  masterTimeline.addLabel('phase2', 3.5);
  masterTimeline.addLabel('transitionToPhase3', 6.3);

  masterTimeline.to(
    [captionHeading, captionDesc, phaseTag],
    {
      opacity: 0,
      y: -15,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        phaseTag.textContent = ch.captions[2].phase;
        captionHeading.textContent = ch.captions[2].heading;
        captionDesc.textContent = ch.captions[2].description;
      },
      onReverseComplete: () => {
        phaseTag.textContent = ch.captions[1].phase;
        captionHeading.textContent = ch.captions[1].heading;
        captionDesc.textContent = ch.captions[1].description;
      }
    },
    6.3
  );

  masterTimeline.fromTo(
    [captionHeading, captionDesc, phaseTag],
    { opacity: 0, y: 15 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    },
    6.7
  );

  masterTimeline.addLabel('phase3', 7.0);

  return masterTimeline;
}
