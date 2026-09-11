# RevPulse AI — Smart QR Feedback & AI Review Acceleration Platform

> **Convert happy guests into authentic 5-star Google Reviews with AI, while privately intercepting negative feedback before it hits public listings.**

[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📖 Table of Contents
- [Executive Overview](#-executive-overview)
- [The Problem & The Solution](#-the-problem--the-solution)
- [System Architecture & Tech Stack](#-system-architecture--tech-stack)
- [Key Features](#-key-features)
  - [1. Mobile-First Customer QR Experience](#1-mobile-first-customer-qr-experience-bslug)
  - [2. AI Review Drafter & Google Conversion Engine](#2-ai-review-drafter--google-conversion-engine)
  - [3. Private Negative Feedback Shield](#3-private-negative-feedback-shield)
  - [4. Business Command Center & CRM](#4-business-command-center--crm)
  - [5. QR Code Studio & Collateral Generator](#5-qr-code-studio--collateral-generator)
  - [6. Visual Question Flow Builder & Graph Topology](#6-visual-question-flow-builder--graph-topology)
  - [7. AI Sentiment Intelligence & Complaint Clustering](#7-ai-sentiment-intelligence--complaint-clustering)
  - [8. Dual-Screen Live Interactive Simulator](#8-dual-screen-live-interactive-simulator)
- [Pre-Configured Industry Archetypes](#-pre-configured-industry-archetypes)
- [State-Machine JSON Specification](#-state-machine-json-specification)
- [Local Development Setup](#-local-development-setup)
- [Vercel Deployment Guide](#-vercel-deployment-guide)
- [File Structure](#-file-structure)

---

## 🎯 Executive Overview

**RevPulse AI** is a multi-tenant customer feedback and reputation acceleration SaaS platform. It eliminates the friction of traditional feedback forms by using **adaptive QR state machines**. 

When a guest scans a table tent or receipt QR code:
1. **Happy Guests (4–5 Stars)** are prompted for specific compliments and dishes, and our AI instantly drafts an authentic, high-impact Google Review ready for 1-click posting.
2. **Dissatisfied Guests (1–3 Stars)** are routed away from public directories into a **Private General Manager Escalation Form**, shielding the business from reputation damage and enabling immediate guest recovery.

---

## 💡 The Problem & The Solution

| The Traditional Problem | The RevPulse AI Solution |
|---|---|
| **Vocal Minority Bias**: Disgruntled guests write 1-star Google reviews in frustration, while thousands of happy customers leave without reviewing. | **Frictionless QR Capture**: &lt;28-second completion time at the table captures sentiment in the moment of delight. |
| **Blank Canvas Friction**: Happy customers want to leave a review but don't know what to write. | **AI Review Synthesis**: Turns selected compliment chips into natural, human-sounding reviews tailored by tone. |
| **Public Blindsides**: Managers only learn about service bottlenecks after a devastating 1-star public review goes live. | **Private GM Escalation Shield**: Intercepts negative feedback directly into the manager's CRM with contact info for immediate recovery. |

---

## 🏗️ System Architecture & Tech Stack

- **Frontend Core**: React 18 with modern functional hooks and Context API.
- **Build Engine**: [Vite 6](https://vitejs.dev/) with hot module replacement and optimized production rollup bundling.
- **Styling & UI**: Tailwind CSS v4 with custom enterprise design system, subtle dot grids, and clean white card styling.
- **Icons**: [Lucide React](https://lucide.dev/) (lightweight SVG icons).
- **QR Generation**: Client-side SVG and Canvas PNG rendering via `qrcode`.
- **Celebration Animations**: `canvas-confetti` particle physics engine.
- **Routing**: Client-side hash router with SPA fallback (`vercel.json`).
- **State Management & Persistence**: Reactive React Context with automatic `localStorage` synchronization and seed restoration.

---

## ⚡ Key Features

### 1. Mobile-First Customer QR Experience (`/b/[slug]`)
- Accessible on any mobile browser without app downloads or logins.
- Dynamic question renderer that walks the business's JSON state machine graph.
- Supports 5-point emoji scales, single-select chips, multi-select tags, sliders, and free text inputs.
- Step-by-step progress indicator, back-navigation history, and table/seat tagging.

### 2. AI Review Drafter & Google Conversion Engine
- Analyzes positive selections (e.g. *Truffle Tagliatelle*, *Maya Sommelier*, *Jazz Ambiance*) and synthesizes authentic Google review drafts.
- **4 Selectable Review Tones**:
  - 🤩 *Enthusiastic*: Energetic, glowing praise.
  - 🍷 *Detailed & Foodie*: Sophisticated gastronomic notes.
  - ⚡ *Short & Sweet*: Punchy 2-sentence recommendations.
  - 😎 *Casual & Friendly*: Relaxed, natural wording.
- **1-Click Copy & Google Review Redirect**: Copies text to clipboard and launches the business's Google Maps review modal in a new tab.
- **VIP Perk Voucher Modal**: Rewards the customer with a digital promo coupon (e.g. `LAURA-VIP10`) with validity countdown.

### 3. Private Negative Feedback Shield
- Automatically triggered if rating $\le 3$ stars.
- Pinpoints root causes (Kitchen delays, temperature, staff attitude, noise level).
- Direct-to-General-Manager escalation form with optional guest email/phone.
- **100% Private Guarantee**: Never posted to public review websites.

### 4. Business Command Center & CRM (`/dashboard`)
- **Executive KPI Cards**: Real-time CSAT (average rating), Google Review volume, shielded complaints count, and conversion rates.
- **Sentiment Routing Breakdown**: Proportional live bar showing positive vs. neutral vs. intercepted breakdown.
- **Audit Feed CRM**: Filterable list of all submissions (Positive, Neutral, Alert, Resolved) with manager resolution notes.

### 5. QR Code Studio & Collateral Generator
- Real-time QR generator pointing directly to `/b/[slug]`.
- **Template Formats**: A5 Table Tent (Foldable), Acrylic Stand (Square), Coaster Disc (Circular), Bill Insert (Compact).
- **Tabletop Scene Mockups**: Preview cards on Clean Studio, White Marble, or Dark Walnut table textures.
- **Export Options**: Download PNG image, copy SVG vector, or print table flyers directly via `window.print()`.

### 6. Visual Question Flow Builder & Graph Topology
- **Dual Modes**: Node Inspector Editor and Interactive Visual Flow Graph topology.
- Add, edit, reorder question nodes, customize chip options, and modify conditional branch logic.
- Instant "Save & Deploy" that reflects on live customer links.

### 7. AI Sentiment Intelligence & Complaint Clustering
- Unsupervised clustering of customer qualitative feedback.
- Identifies top praise drivers (e.g. *Truffle Tagliatelle driving 98% CSAT*) and top operational bottlenecks (e.g. *Friday night main course delay*).
- Actionable AI-recommended mitigation steps.

### 8. Dual-Screen Live Interactive Simulator (`/preview`)
- Side-by-side split screen with real-time reactive sync.
- Submit feedback on the simulated iPhone frame on the right and watch the manager dashboard on the left update immediately.

---

## 🏢 Pre-Configured Industry Archetypes

| Business Name | Category | Primary Focus | Default Slug |
|---|---|---|---|
| **L'Aura Bistro & Wine Bar** | Restaurant / Fine Dining | Food temperature, wine pairings, kitchen pacing | `laura-bistro` |
| **The Grand Azure Resort & Spa** | Luxury Hospitality | Check-in speed, suite comfort, concierge, spa | `grand-azure` |
| **Velvet Roast Artisan Café** | Specialty Coffee & Bakery | Brew quality, barista speed, seating, WiFi | `velvet-roast` |
| **Moda Luxe Boutique Flagship** | Designer Apparel & Retail | Fitting rooms, styling service, checkout speed | `moda-luxe` |

---

## 📐 State-Machine JSON Specification

The customer question flow is modeled as a declarative state machine graph in JSON:

```json
{
  "start": "overall_experience",
  "questions": {
    "overall_experience": {
      "id": "overall_experience",
      "type": "emoji_scale",
      "title": "How was your experience today?",
      "subtitle": "Tap an emoji to rate",
      "next": {
        "positive": "positive_highlights",
        "neutral": "neutral_categories",
        "negative": "negative_categories"
      }
    },
    "positive_highlights": {
      "id": "positive_highlights",
      "type": "chips_multiselect",
      "title": "What delighted you most?",
      "options": ["Quality", "Service", "Atmosphere", "Staff"],
      "next": {
        "default": "positive_free_text"
      }
    },
    "negative_categories": {
      "id": "negative_categories",
      "type": "chips_multiselect",
      "title": "What fell short of expectations?",
      "options": ["Wait Times", "Temperature", "Staff Attitude"],
      "next": {
        "Wait Times": "wait_time_drilldown",
        "default": "private_manager_alert"
      }
    }
  }
}
```

---

## 💻 Local Development Setup

### Prerequisites
- Node.js version `v18+` or `v20+` or `v24+`
- npm version `v9+` or `v11+`

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/workofcharan/review.git
cd review
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle is output to the `dist/` directory.

---

## 🚀 Vercel Deployment Guide

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Deploy RevPulse AI platform"
   git push origin main
   ```
2. Import the project in [Vercel Dashboard](https://vercel.com/new).
3. **Framework Preset**: Vite
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. `vercel.json` is pre-configured with SPA rewrites to ensure deep routing works out of the box.

---

## 📂 File Structure

```
review/
├── README.md                         # Detailed platform documentation
├── vercel.json                       # Vercel SPA rewrite routing rules
├── package.json                      # NPM dependencies and scripts
├── vite.config.js                    # Vite configuration
├── index.html                        # HTML entry with Google fonts
├── src/
│   ├── main.jsx                      # React DOM root entry
│   ├── App.jsx                       # Master route switcher and layout
│   ├── index.css                     # Global styles, Tailwind, card utilities
│   ├── context/
│   │   └── AppContext.jsx            # Multi-tenant state and feedback lifecycle
│   ├── data/
│   │   └── initialData.js            # Seed data and state machine flows
│   ├── utils/
│   │   ├── aiReviewGenerator.js      # Natural language review synthesis engine
│   │   └── qrHelper.js               # QRCode PNG/SVG generator
│   ├── components/
│   │   ├── Header.jsx                # Enterprise SaaS navigation bar
│   │   ├── customer/
│   │   │   ├── QuestionFlowEngine.jsx # State-machine dynamic renderer
│   │   │   ├── EmojiScale.jsx        # 5-point sentiment emoji buttons
│   │   │   ├── ChipsQuestion.jsx     # Multi and single select tags
│   │   │   ├── TextQuestion.jsx      # Free text note input
│   │   │   ├── PositiveReviewScreen.jsx # AI Review Drafter studio
│   │   │   ├── PrivateRecoveryScreen.jsx# GM private escalation shield
│   │   │   └── RewardModal.jsx       # VIP perk digital voucher
│   │   └── dashboard/
│   │       ├── OverviewTab.jsx       # Executive KPI cards & funnel
│   │       ├── FeedbackInboxTab.jsx  # Audit log & manager resolution CRM
│   │       ├── QrStudioTab.jsx       # Print collateral & tabletop designer
│   │       ├── FlowBuilderTab.jsx    # Visual graph & question editor
│   │       ├── AiIntelligenceTab.jsx # Sentiment clustering & diagnostics
│   │       └── SettingsTab.jsx       # Brand colors, review links & thresholds
│   └── views/
│       ├── LandingView.jsx           # Product tour, ROI calculator & sandbox
│       ├── DashboardView.jsx         # Command center container
│       ├── CustomerFeedbackView.jsx  # Branded standalone guest flow
│       └── SplitScreenView.jsx       # Real-time dual simulator
```

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
