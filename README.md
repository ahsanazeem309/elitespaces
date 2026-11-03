# ELITE SPACES PK · Architectural Living & Bespoke Estates

> Award-level, scroll-driven web experience for **ELITE SPACES PK** — a premier luxury custom home builder and architectural atelier.

---

## ✦ Overview

**ELITE SPACES PK** is designed around a cinematic **"Scroll to Build"** core mechanic: as visitors scroll, structural architectural blueprints and raw timber/rebar framing dynamically assemble and transform into luxury finished living spaces via dual-layer wipe masks, laser scan lines, and synchronized architectural phase captions.

Every section on the page features deliberate, physics-modeled scroll orchestration with self-arranging layouts, fluid typography, and zero static elements.

---

## 🏛️ The 60-30-10 Luxury Pastel Design System

The design strictly follows the architectural **60-30-10 rule** with breathable daylight diffusion:

* **60% Primary Base**: **Alabaster Parchment** (`#FAF9F6`) — Warm, organic, non-clinical base surface.
* **30% Structure & Contrast**:
  * **Warm Chalk Linen** (`#F4F1EA`) — Secondary container surfaces and cards.
  * **Pale Greige** (`#E7E2DA`) — 1px structural CAD divider lines and framing grids.
  * **Deep Ink Navy** (`#0D1E36`) — Primary headings, logo brand tone, and essential text.
  * **Slate Taupe** (`#5C6470`) — Secondary body copy, specifications, and metadata.
* **10% Accents & Functional Colors**:
  * **Champagne Gold** (`#C5A059`) — Laser wipe scan lines, active tags, and accent buttons.
  * **Toasted Ochre** (`#A66E2E`) — Interactive hover states for gold elements.
  * **Laurel Olive** (`#5B7052`) — Verified engineering badges and direct WhatsApp CTAs.

---

## ✨ Signature Features

1. **Scroll-to-Build Transformation**:
   * Hero and 4 Process Chapters (The Culinary Atelier, Wellness Sanctuary, Living Lounge, Horizon Terrace).
   * Dual-layer image visualizer with synchronized clip-path reveals and a 2px glowing champagne gold scan line.
   * **Zero Percentages**: Replaced with architectural designations (**Phase I · Structural Framing**, **Phase II · Handcrafted Millwork**, **Phase III · Sanctuary Handover**).

2. **Smart Auto-Hiding Navigation**:
   * Fixed header smoothly slides up out of the viewport on scroll down, offering **100% unobstructed viewing** of all section headlines and visual transformations.
   * Instantly glides back into view when scrolling up, hovering near the top edge, or returning to the top of the page.

3. **Non-Colliding Stage Architecture**:
   * Pinned stages calibrated with generous top padding (`calc(var(--header-height) + 1.75rem)`) and bottom buffers.
   * GSAP ScrollTrigger manages stage pinning natively with zero CSS sticky layout conflicts.
   * CTA finale holds all metrics in place before releasing into the footer with clean separation.

4. **Self-Arranging Content Choreography**:
   * Social proof CAD matrix draws borders and counts up metrics on scroll.
   * Featured project commissions glide into position from alternate axes.
   * Master builder editorial story blocks assemble step-by-step.
   * Accordion items fly into the specification roster with single-open accessibility.

---

## 🛠️ Tech Stack (Mandatory & Zero Frameworks)

* **Vite** — Ultra-fast ES module development server and production bundler.
* **Vanilla JavaScript** (ES Modules) — Zero React or heavy UI frameworks.
* **Modern CSS** — Custom properties, CSS Grid, Flexbox, daylight diffusion shadows, fluid clamp typography.
* **GSAP 3 + ScrollTrigger** — Pinned scroll-scrub animations, multi-layer parallax, and timeline orchestration.
* **Lenis** — Smooth inertial scrolling synchronized to GSAP's central ticker (`lagSmoothing(0)`).
* **Typography**: *Cormorant Garamond* & *Playfair Display* (editorial serif) paired with *Plus Jakarta Sans*.

---

## 🚀 Quick Start

### Prerequisites
* **Node.js** (v18 or higher recommended)
* **npm**

### Installation

```bash
# Clone the repository
git clone https://github.com/ahsanazeem309/elitespaces.git

# Navigate into the project directory
cd elitespaces

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Compile and optimize production bundle into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
elitespaces/
├── public/
│   └── elite-spaces-logo.jpg      # Official brand crest and logo
├── js/
│   ├── main.js                    # Bootstrap, Lenis-ScrollTrigger bridge & ticker
│   ├── nav.js                     # Smart show/hide header, anchor scroll & drawer
│   ├── hero.js                    # Pinned Hero framing-to-finished transformation
│   ├── marquee.js                 # Infinite ticker animation
│   ├── proof.js                   # CAD matrix draw and counter animation
│   ├── projects.js                # Featured commissions responsive layout & assembly
│   ├── process.js                 # Signature 4-chapter Scroll-to-Build engine
│   ├── about.js                   # Master craftsman clip-path wipe & rotating seal
│   ├── reviews.js                 # Homeowner testimonials assembly
│   ├── faq.js                     # Accessible single-open specification roster
│   ├── cta.js                     # Finale consultation & assurance metrics
│   ├── images.js                  # Central curated high-res image registry
│   └── utils.js                   # Text splitter & reduced-motion helper
├── styles/
│   └── main.css                   # 60-30-10 design system, layout & animations
├── index.html                     # Semantic HTML5 single-page application
├── vite.config.js                 # Vite configuration
├── package.json                   # Project metadata and dependencies
└── README.md                      # Documentation
```

---

## 📄 License & Credits

© 2026 **ELITE SPACES PK**. Architectural Living & Bespoke Estates. All rights reserved.
