// Initial Seed Data for Multi-Tenant Smart QR Feedback Platform

const DR_C_EXACT_REVIEW_URL = "https://g.page/r/CVfAf-zR7rBLEBE/review";

export const INITIAL_BUSINESSES = [
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
    minPublicRating: 4,
    tableCount: 6,
    questionFlow: {
      start: "overall_experience",
      questions: {
        // Step 1: Rating
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your dental care experience at Dr C Dental Clinic?",
          subtitle: "Tap an emoji to rate your visit today (Step 1 of 2)",
          options: [
            { value: 1, label: "Painful/Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Uncomfortable", emoji: "😕", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Gentle & Good", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Painless & Stellar!", emoji: "😁✨", sentiment: "positive" },
          ],
          next: {
            "5": "positive_highlights",
            "4": "positive_highlights",
            "3": "private_manager_alert",
            "2": "private_manager_alert",
            "1": "private_manager_alert",
          }
        },
        // Step 2: What delighted you about your treatment & visit?
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What delighted you about your treatment & visit?",
          subtitle: "Select all that made your appointment comfortable (Step 2 of 2)",
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
        // Private Interception for 1-3 stars
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
  {
    id: "biz-1",
    slug: "laura-bistro",
    name: "L'Aura Bistro & Wine Bar",
    category: "restaurant",
    type: "Fine Dining & Bar",
    tagline: "Modern French Gastronomy & Curated Cellar",
    logo: "🍷",
    brandColors: {
      primary: "#e11d48",
      accent: "#fb7185",
      bgGradient: "from-rose-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://maps.google.com/?cid=123456789012345678",
    yelpUrl: "https://www.yelp.com/biz/laura-bistro",
    tripAdvisorUrl: "https://www.tripadvisor.com/Restaurant_Review-laura-bistro",
    minPublicRating: 4,
    tableCount: 28,
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your dining experience at L'Aura?",
          subtitle: "Tap an emoji to share your impression (Step 1 of 2)",
          options: [
            { value: 1, label: "Disappointing", emoji: "😞", sentiment: "negative" },
            { value: 2, label: "Underwhelming", emoji: "😕", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Delightful", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Extraordinary!", emoji: "🤩", sentiment: "positive" },
          ],
          next: {
            "5": "positive_highlights",
            "4": "positive_highlights",
            "3": "private_manager_alert",
            "2": "private_manager_alert",
            "1": "private_manager_alert",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What delighted your palate and evening?",
          subtitle: "Select all highlights that made your visit memorable (Step 2 of 2)",
          options: [
            "Truffle Tagliatelle",
            "Dry-Aged Ribeye",
            "Sommelier Wine Pairing",
            "Warm & Attentive Service",
            "Romantic Ambiance & Jazz",
            "Signature Craft Cocktails",
            "Artisan Bread & Butter",
            "Decadent Chocolate Soufflé"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to General Manager",
          subtitle: "Your message goes directly to our General Manager's private dashboard for swift resolution.",
          placeholder: "Please describe what happened so we can investigate and invite you back for a better experience...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  }
];

// Pre-populated realistic feedback submissions
export const INITIAL_FEEDBACKS = [
  {
    id: "fb-drc-1",
    businessId: "biz-drc",
    businessSlug: "dr-c-dental-clinic",
    createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
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
  }
];

export const INITIAL_AI_INSIGHTS = {
  complaintClusters: [],
  praiseClusters: [
    {
      topic: "Dr. C Gentle & Painless Treatments",
      count: 48,
      positiveScore: 99,
      quote: "Completely painless procedure, Dr. C is patient, gentle, and explains every step."
    }
  ]
};
