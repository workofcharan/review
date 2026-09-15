# RevPulse AI — Multi-Business Smart QR Feedback & Review Acceleration Engine

> **The ultimate multi-tenant platform for businesses to accelerate authentic Google Reviews, capture real-time customer sentiment, and customize adaptive question flows across multiple locations and industries.**

---

## 📖 Admin Quick-Start & Navigation Guide

Welcome to the **RevPulse AI Admin Platform**. This guide explains everything you need to know about managing multiple business profiles, inspecting customer feedback, generating QR collateral, and configuring question flows.

```
                               ┌──────────────────────────────────────────────┐
                               │       Admin Multi-Business Master Hub        │
                               │   (Portfolio CSAT, Total Scans, Analytics)   │
                               └──────────────────────┬───────────────────────┘
                                                      │
               ┌──────────────────────────────────────┼──────────────────────────────────────┐
               ▼                                      ▼                                      ▼
    ┌──────────────────────┐               ┌──────────────────────┐               ┌──────────────────────┐
    │  B1: Dental Clinic   │               │   B2: Café/Dining    │               │  B3: Luxury Salon    │
    │ (Dr C Dental Clinic) │               │   (L'Aura Bistro)    │               │ (Glow & Glam Salon)  │
    └──────────┬───────────┘               └──────────┬───────────┘               └──────────┬───────────┘
               │                                      │                                      │
  ┌────────────┴────────────┐            ┌────────────┴────────────┐            ┌────────────┴────────────┐
  │ • Command Overview      │            │ • Command Overview      │            │ • Command Overview      │
  │ • Feedback & CRM        │            │ • Feedback & CRM        │            │ • Feedback & CRM        │
  │ • QR Code Studio        │            │ • QR Code Studio        │            │ • QR Code Studio        │
  │ • Question Flow Builder │            │ • Question Flow Builder │            │ • Question Flow Builder │
  │ • AI Intelligence Pulse │            │ • AI Intelligence Pulse │            │ • AI Intelligence Pulse │
  │ • Settings & Branding   │            │ • Settings & Branding   │            │ • Settings & Branding   │
  └─────────────────────────┘            └─────────────────────────┘            └─────────────────────────┘
```

---

## 🏢 1. Admin Multi-Business Master Hub (`/`)

When you open the application, you land directly on the **Admin Multi-Business Master Hub**:

### Key Features of the Admin Hub:
1. **Consolidated Portfolio Analytics**:
   - **Businesses Handled**: Total active business locations currently managed.
   - **Portfolio CSAT**: Real-time overall rating (out of 5.0★) across all businesses.
   - **Total Feedback Scans**: Aggregate customer QR scans and submissions.
   - **5★ Google Reviews Converted**: Total reviews accelerated to Google Maps.
   - **Shielded Issues**: Total critical feedback items monitored.
2. **Category Filters & Search Bar**:
   - Instantly filter by **Healthcare & Dental**, **Café & Restaurant**, **Salon & Spa**, or **All Businesses**.
   - Search by business name, keyword, or service type.
3. **Interactive Business Cards**:
   - Each card displays the business's live CSAT score, scan volume, category badge, and Google review link status.
   - **`Open Business Workspace`**: Enters that specific business's dedicated Command Center.
   - **`Customer QR`**: Launches the live mobile customer journey (`/b/[slug]`).
   - **`Print Studio`**: Directly opens printable table tents and collateral generator.
4. **`+ Register New Business` Button**:
   - Open the onboarding modal to add new locations with custom names, categories, colors, and Google Maps review links.

---

## 📊 2. Dedicated Business Workspace (`/dashboard`)

When you click **"Open Business Workspace"** on any business card, you enter its dedicated Command Center with its collapsible **Command Slide Bar** on the left:

### Slide Bar Navigation Tabs:

| Tab | Purpose & Features |
|---|---|
| 📊 **Command Overview** | Executive summary: Live CSAT score, 5★-to-1★ distribution bars, sentiment routing breakdown, latest live submissions, and dynamic business AI Pulse. |
| 💬 **Feedback & CRM** | Complete audit trail of guest submissions, contact details, AI review drafts, and manager follow-up notes. Filter by positive, neutral, or alerts. |
| 📱 **QR Code Studio** | Generate and export customized branded QR codes, A5 Table Tents, Acrylic Stands, and Mirror Stickers with live print preview (`window.print()`). |
| 🔀 **Question Flow Builder** | State-machine graph & node editor to customize questions, add chips/compliments, edit prompts, and test customer flows in real-time. |
| 🧠 **AI Intelligence** | Natural language praise drivers, top customer compliments, and root-cause bottleneck clustering tailored to that business. |
| ⚙️ **Settings & Branding** | Configure Google Maps Review URL, primary brand colors, logo/emoji icon, and minimum rating thresholds. |

> **Top Breadcrumb**: Click **`← Admin Multi-Business Hub`** at the top of the workspace at any time to return to the master business portfolio.

---

## 📱 3. Customer QR Experience & Review Acceleration (`/b/[slug]`)

When a customer scans the QR code at the business (e.g. table tent, reception counter, styling mirror):

### Step 1: Emoji Rating Selection
- Customer taps an emoji scale from **1★ (Poor 😣)** to **5★ (Excellent 🤩)**.

### Step 2: Tailored Highlights & AI Review Options
For **EVERY rating (1★, 2★, 3★, 4★, 5★)**, the customer is presented with:
1. **3 Relevant Highlights / Feedback Chips**:
   - *Dental Clinic (5★)*: Painless Procedure, Dr. C's Reassuring Guidance, Spotless Clinic.
   - *Café (5★)*: Specialty Coffee, Artisan Pastries, Aesthetic Ambiance.
   - *Salon (5★)*: Flawless Haircut, Balayage Color, Relaxing Scalp Massage.
   - *Ratings 1–3*: Tailored options for wait times, pricing clarity, or treatment/service concerns.
2. **3 Selectable AI Review Drafts**:
   - **Option 1**: Detailed & Enthusiastic / Constructive
   - **Option 2**: Short & Direct
   - **Option 3**: Warm & Personal / Balanced
3. **1-Tap Direct Google Review Redirection**:
   - Tapping **`Copy Review & Open Google Maps`** copies the selected review draft to the clipboard and automatically opens the business's Google Maps review page so the guest can simply paste and submit!

---

## 📁 Pre-Configured Seed Businesses

The platform comes pre-configured with 3 representative business archetypes:

| Code | Business Name | Category | Primary Focus | Direct Review Link |
|---|---|---|---|---|
| **B1** | **Dr C Dental Clinic** | Healthcare & Dental | Orthodontics, Painless Care & Smile Design | `https://g.page/r/CVfAf-zR7rBLEBE/review` |
| **B2** | **L'Aura Bistro & Artisan Café** | Café & Dining | Single-Origin Brews, Pastries & Brunch | Google Maps Review URL |
| **B3** | **Glow & Glam Luxury Salon & Spa** | Salon & Wellness | Couture Hair, Balayage & Rejuvenating Facials | Google Maps Review URL |

---

## 💻 Technical Setup & Commands

### Prerequisites
- Node.js (v18 or higher)
- npm

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production build in the `/dist` directory.

### 4. Deploy to Vercel
The project includes a ready `vercel.json` SPA rewrite configuration. Deploy directly with:
```bash
npx vercel
```

---

## 🗂️ Project Structure

```
review/
├── src/
│   ├── components/
│   │   ├── customer/            # Customer mobile feedback engine (EmojiScale, QuestionFlowEngine)
│   │   ├── dashboard/           # Business Workspace tabs (Overview, CRM, QRStudio, FlowBuilder, AI, Settings)
│   │   └── Header.jsx           # Clean header with RevPulse AI branding
│   ├── context/
│   │   └── AppContext.jsx       # Multi-tenant state management & local persistence
│   ├── data/
│   │   └── initialData.js       # Seed businesses (Dental, Cafe, Salon), feedbacks, and question flows
│   ├── utils/
│   │   ├── aiReviewGenerator.js # 3-option AI review draft synthesis for all 5 star ratings
│   │   ├── mobileRedirectHelper.js # Clipboard copy & Google Maps redirection helpers
│   │   └── qrHelper.js          # QR code generation utilities
│   ├── views/
│   │   ├── AdminBusinessesHubView.jsx # Admin Master Hub (All Businesses Overview)
│   │   ├── DashboardView.jsx    # Dedicated Business Command Center
│   │   └── CustomerFeedbackView.jsx # Live customer QR feedback view (/b/[slug])
│   ├── App.jsx                  # Main application routing
│   └── index.css                # Tailwind CSS styling and theme
├── package.json
├── vercel.json                  # Single-Page-App routing config
└── vite.config.js
```

---

## 🛡️ Best Practices for Admins

1. **Deploying QR Collateral**: Go to **QR Code Studio** inside any business to generate printable table tents or billing counter stands.
2. **Reviewing Feedbacks**: Check **Feedback & CRM** daily to monitor incoming feedback, copy customer contacts for follow-up, and track staff praise.
3. **Updating Review Links**: In **Settings & Branding**, update the Google Review URL whenever you open a new branch or update your Google Business Profile.
4. **Customizing Questions**: Use the **Question Flow Builder** to adjust questions seasonally (e.g. promoting new seasonal dishes or holiday treatments).
