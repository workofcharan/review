// Initial Seed Data for Multi-Tenant Smart QR Feedback Platform

const DR_C_EXACT_REVIEW_URL = "https://g.page/r/CVfAf-zR7rBLEBE/review";

export const INITIAL_BUSINESSES = [
  // B1: Dental Clinic
  {
    id: "biz-drc",
    slug: "dr-c-dental-clinic",
    name: "Dr C Dental Clinic",
    category: "healthcare",
    type: "Advanced Dental Care & Orthodontics",
    tagline: "Gentle, State-of-the-Art Dentistry & Beautiful Smiles",
    logo: "🦷",
    brandColors: {
      primary: "#0284c7", // Medical Sky Blue
      accent: "#0ea5e9",
      bgGradient: "from-sky-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: DR_C_EXACT_REVIEW_URL,
    yelpUrl: DR_C_EXACT_REVIEW_URL,
    tripAdvisorUrl: "",
    minPublicRating: 1,
    tableCount: 6,
    aiPraise: {
      topic: "Dr. C's Gentle & Painless Care",
      quote: "Completely painless procedure, Dr. C is patient, gentle, and explains every step with clarity."
    },
    aiBottleneck: {
      topic: "Peak Hour Waiting Room Delays",
      quote: "Occasional 15+ min wait during Saturday morning emergency walk-ins."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your dental care experience at Dr C Dental Clinic?",
          subtitle: "Tap an emoji to rate your visit today",
          options: [
            { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Good", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Excellent!", emoji: "🤩", sentiment: "positive" },
          ],
          next: {
            "5": "positive_highlights",
            "4": "positive_highlights",
            "3": "positive_highlights",
            "2": "positive_highlights",
            "1": "positive_highlights",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What delighted you about your treatment & visit?",
          subtitle: "Select all that made your appointment comfortable",
          options: [
            "Painless & Gentle Procedure",
            "Dr. C's Clear & Reassuring Guidance",
            "Spotless & Modern Sterile Equipment",
            "Prompt Zero-Wait Time",
            "Friendly Front Desk Team",
            "Thorough Scaling & Cleaning",
            "Affordable & Transparent Treatment Plan",
            "Comfortable Treatment Chair & Ambiance"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to Clinic Director & Dr. C",
          subtitle: "Your message is sent confidentially to our Lead Dental Surgeon for prompt follow-up and patient care resolution.",
          placeholder: "Please describe what happened so Dr. C can review your chart and follow up with you directly...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },

  // B2: Ebin tech (Permanent Business Seed)
  {
    id: "biz-ebintech",
    slug: "ebin-tech",
    name: "Ebin tech",
    category: "marketing",
    type: "Marketing agency in Hyderabad, Telangana",
    tagline: "Ebintech, a digital marketing agency in Kompally, Hyderabad, empowers startups, small businesses, and enterprises to thrive in the online world. We offer comprehensive digital solutions including SEO, Social Media Marketing, Web Design, Branding, and AI Review Acceleration.",
    logo: "💻",
    brandColors: {
      primary: "#0284c7",
      accent: "#4f46e5",
      bgGradient: "from-slate-950 via-sky-950 to-slate-950"
    },
    publicReviewUrl: DR_C_EXACT_REVIEW_URL,
    yelpUrl: "",
    tripAdvisorUrl: "",
    minPublicRating: 1,
    tableCount: 4,
    aiPraise: {
      topic: "Measurable ROI & Growth Strategies",
      quote: "Ebin tech transformed our online presence and boosted qualified inquiries within weeks."
    },
    aiBottleneck: {
      topic: "High Demand Onboarding Queues",
      quote: "Occasional queue for new client kickoff slots during peak quarter launches."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your project & service experience with Ebin tech?",
          subtitle: "Tap an emoji to rate your experience with our team",
          options: [
            { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Good", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Excellent!", emoji: "🤩", sentiment: "positive" },
          ],
          next: {
            "5": "positive_highlights",
            "4": "positive_highlights",
            "3": "positive_highlights",
            "2": "positive_highlights",
            "1": "positive_highlights",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What delighted you most about our marketing & strategy?",
          subtitle: "Select all that contributed to your great experience",
          options: [
            "Measurable Lead & ROI Growth",
            "Creative Branding & Content",
            "Prompt & Responsive Communication",
            "High-Converting Website Design",
            "Transparent Analytics & Reporting",
            "Strategic SEO Optimization",
            "Expert AI Growth Tactics",
            "Dedicated Account Management"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to Ebin tech Leadership",
          subtitle: "Your feedback reaches our Managing Director confidentially for immediate review and resolution.",
          placeholder: "Please describe what happened so our leadership team can assist you directly...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  }
];

// Pre-populated realistic feedback submissions across businesses
export const INITIAL_FEEDBACKS = [
  // Dr C Dental Clinic
  {
    id: "fb-drc-1",
    businessId: "biz-drc",
    businessSlug: "dr-c-dental-clinic",
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Operatory 2 (Dr. C)",
    channel: "QR Scan (Clinic Reception Tent)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Painless & Gentle Procedure", "Dr. C's Clear & Reassuring Guidance", "Spotless & Modern Sterile Equipment"]
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Had an incredible experience at Dr C Dental Clinic! The treatment was completely painless, and Dr. C explained every step with such kindness and clarity. The clinic is ultra-clean and modern. 5/5 stars all the way!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "rahul.sharma@gmail.com",
    managerNotes: ""
  },
  {
    id: "fb-drc-2",
    businessId: "biz-drc",
    businessSlug: "dr-c-dental-clinic",
    createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Operatory 1",
    channel: "QR Scan (Billing Counter)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Prompt Zero-Wait Time", "Friendly Front Desk Team", "Thorough Scaling & Cleaning"]
    },
    generatedReview: {
      tone: "professional",
      draft: "Very prompt and professional dental cleaning at Dr C Dental Clinic. Front desk team was super polite and zero wait time.",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "priya.nair@outlook.com",
    managerNotes: ""
  },

  // Ebin tech (Permanent Feedbacks: 2 Scans, 5.0 CSAT, 2 Google Converted)
  {
    id: "fb-ebin-1",
    businessId: "biz-ebintech",
    businessSlug: "ebin-tech",
    createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Client Strategy Desk",
    channel: "QR Scan (Client Welcome Kit)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Measurable Lead & ROI Growth", "Creative Branding & Content", "Prompt & Responsive Communication"]
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Ebin tech in Kompally, Hyderabad provided phenomenal digital marketing and branding results for our business. Inquiries jumped significantly and the team is super professional!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "vikram.reddy@startup.in",
    managerNotes: ""
  },
  {
    id: "fb-ebin-2",
    businessId: "biz-ebintech",
    businessSlug: "ebin-tech",
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Executive Meeting Room",
    channel: "QR Scan (Proposal Deck)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["High-Converting Website Design", "Strategic SEO Optimization", "Dedicated Account Management"]
    },
    generatedReview: {
      tone: "professional",
      draft: "Outstanding web development and SEO strategy by Ebin tech. Delivered our project on time with spotless execution.",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "ananya.rao@enterprise.co",
    managerNotes: ""
  }
];

export const INITIAL_AI_INSIGHTS = {
  complaintClusters: [
    {
      topic: "Peak Hour Service Wait Times",
      count: 2,
      impact: "Customers reporting slight wait times during busiest weekend peak hours.",
      suggestedAction: "Implement automated SMS queue notifications to smoothen peak arrivals."
    }
  ],
  praiseClusters: [
    {
      topic: "Exceptional Staff Attention & High-Quality Care",
      count: 54,
      positiveScore: 98,
      quote: "Friendly, gentle, expert service with pristine modern environment and zero friction."
    }
  ]
};
