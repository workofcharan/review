# Smart QR Feedback Platform — Technical Plan

## 1. Tech Stack Recommendation

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js (React, App Router) | Dynamic routing per business slug (`/b/[slug]`), SSR for fast first paint on mobile, easy to deploy on Vercel |
| Styling | Tailwind CSS | Fast to theme per-business (CSS variables for brand colors/logo) |
| Backend | Next.js API routes or a separate Node/Express service | Start with API routes for MVP simplicity; split out later if the dashboard/analytics grow complex |
| Database | PostgreSQL | Relational fits the business → question-flow → feedback → answers structure well; strong JSON support (jsonb) for flexible question configs |
| BaaS shortcut | Supabase | Bundles Postgres + Auth + Storage (for logos/QR images) + row-level security — cuts a lot of MVP backend work |
| Auth | Supabase Auth or Clerk | Business owner/staff login for the dashboard |
| QR generation | `qrcode` npm package | Generates PNG/SVG QR codes server-side, pointing to `/b/{slug}` |
| AI review drafting | Claude API (Sonnet) | Turn structured answers into a natural-language draft review; also useful for clustering/summarizing complaints later |
| Hosting | Vercel (frontend/API) + Supabase (DB/auth/storage) | Minimal ops for a solo/small team building an MVP |
| Analytics (later) | PostHog or custom queries | Track completion rate, drop-off points in the feedback flow |

Reasonable to swap Supabase for a plain Postgres + self-rolled auth later — the schema below works either way.

## 2. Data Model

**Core entities:**

- **Business** — id, name, slug, type (restaurant/hotel/retail/custom), logo_url, brand_colors (jsonb), public_review_url (e.g. Google review link), created_at
- **QuestionFlow** — id, business_id, version, config (jsonb — the full question graph, see §4), is_active
- **FeedbackSession** — id, business_id, question_flow_id, started_at, completed_at, device/session metadata
- **Answer** — id, session_id, question_key, answer_value (jsonb — handles scale/chip/text answers uniformly), created_at
- **GeneratedReview** — id, session_id, draft_text, edited_text, was_published_publicly (bool), published_at
- **Tag/Category** (optional, for analytics) — extracted from answers, used to power "most common complaints" style reporting

**Why jsonb for the question flow and answers:** the question graph varies a lot per business and will change shape as you add business types — modeling every possible question/option as rigid relational tables would slow down iteration. Keep `Answer.answer_value` as jsonb too so you don't need a schema migration every time you add a new question type (scale, multi-select chips, free text).

## 3. MVP Scope & Prioritization

**Phase 1 — Core loop (ship first)**
- Business signup/login + profile (name, type selection from presets)
- Auto-generated QR code on signup, downloadable
- 2–3 default question-flow templates (restaurant, hotel, retail) — not yet customizable, just good defaults
- Customer flow: overall rating → adaptive category questions → optional free text
- AI-generated review draft (editable) at the end
- Minimal dashboard: list of submissions, average rating, basic category breakdown

**Phase 2 — Configurability & differentiation**
- Dashboard question/category builder (add/edit/reorder questions and branches)
- Branding customization (logo, colors) reflected live on the feedback page
- Public/private routing: happy customers nudged to the business's public review link; unhappy customers routed to a private detailed-feedback form
- Richer analytics: trends over time, most-mentioned dishes/services (simple keyword extraction), completion rate funnel

**Phase 3 — Scale & polish**
- Multi-language support
- Team roles/permissions (owner, staff, manager views)
- Notification integrations (email/WhatsApp alert on negative feedback)
- AI-assisted complaint clustering ("slow service" mentioned 14 times this month)

Building it in this order means you get a working, demoable product (Phase 1) before investing in the configurability that makes it a real multi-tenant SaaS product (Phase 2).

## 4. Adaptive UI/UX Flow Logic

For the MVP, model each question flow as a **simple state machine stored as JSON** rather than reaching for a general rules engine or real-time AI branching — it's much easier to build, debug, and let non-technical business owners eventually edit.

```json
{
  "start": "overall_experience",
  "questions": {
    "overall_experience": {
      "type": "emoji_scale",
      "text": "How was your experience today?",
      "next": {
        "positive": "positive_highlights",
        "neutral": "general_categories",
        "negative": "negative_categories"
      }
    },
    "negative_categories": {
      "type": "chips_multiselect",
      "text": "What could we improve?",
      "options": ["Food quality", "Service speed", "Cleanliness", "Pricing"],
      "next": {
        "Service speed": "service_followup",
        "default": "free_text"
      }
    },
    "service_followup": {
      "type": "chips_single",
      "text": "Tell us more about the service",
      "options": ["Slow to be seated", "Slow to order", "Slow food delivery", "Staff attitude"],
      "next": { "default": "free_text" }
    }
  }
}
```

- Each node declares its `type` (emoji_scale, chips_single, chips_multiselect, slider, free_text)
- `next` maps the answer to the next node — branches naturally without hardcoding logic in the frontend
- The frontend is a generic renderer that walks this graph, so adding a new question or business type is a config change, not a code change
- Session answers accumulate client-side and get POSTed at the end (or incrementally) to build the `Answer` records

**Key UI components:** emoji/star scale, single- and multi-select chip groups, occasional slider (e.g. wait time), progress bar, and a final "Here's your review" screen with the AI-drafted text in an editable textarea plus a "Publish publicly" vs "Send privately" choice.

---

This is meant as a working plan, not a spec set in stone — happy to go deeper on any one piece (e.g. write the actual Postgres schema/migrations, prototype the feedback flow UI, or draft the AI review-generation prompt).
