// Initial Seed Data for Multi-Tenant Smart QR Feedback Platform

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
    publicReviewUrl: "https://www.google.com/maps/place/Dr+C+Dental+Clinic/@17.5299467,78.4849175,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8598e40bf7a9:0x4bb0eed1ec7fc057!8m2!3d17.5299467!4d78.4874924!16s%2Fg%2F11wc8j_30z?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
    yelpUrl: "https://www.google.com/maps/place/Dr+C+Dental+Clinic/@17.5299467,78.4849175,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcb8598e40bf7a9:0x4bb0eed1ec7fc057!8m2!3d17.5299467!4d78.4874924!16s%2Fg%2F11wc8j_30z?entry=ttu&g_ep=EgoyMDI2MDkwOC4wIKXMDSoASAFQAw%3D%3D",
    tripAdvisorUrl: "",
    minPublicRating: 4,
    tableCount: 6,
    perkOffer: {
      title: "Complimentary Dental Care Kit & 15% Off Next Routine Cleaning",
      code: "DRC-SMILE15",
      validDays: 60
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        // Step 1: Rating
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your dental care experience at Dr C Dental Clinic?",
          subtitle: "Tap an emoji to rate your visit today (Step 1 of 3)",
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
          subtitle: "Select all that made your appointment comfortable (Step 2 of 3)",
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
            default: "ai_review_screen"
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
    perkOffer: {
      title: "Complimentary Chef's Dessert & 10% Off Next Visit",
      code: "LAURA-VIP10",
      validDays: 30
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your dining experience at L'Aura?",
          subtitle: "Tap an emoji to share your impression (Step 1 of 3)",
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
          subtitle: "Select all highlights that made your visit memorable (Step 2 of 3)",
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
            default: "ai_review_screen"
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
  },
  {
    id: "biz-2",
    slug: "grand-azure",
    name: "The Grand Azure Resort & Spa",
    category: "hotel",
    type: "Luxury Hospitality & Resort",
    tagline: "Oceanfront Serenity & Five-Star Wellness",
    logo: "🏨",
    brandColors: {
      primary: "#0284c7",
      accent: "#38bdf8",
      bgGradient: "from-sky-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://maps.google.com/?cid=987654321098765432",
    yelpUrl: "https://www.yelp.com/biz/grand-azure-resort",
    tripAdvisorUrl: "https://www.tripadvisor.com/Hotel_Review-grand-azure",
    minPublicRating: 4,
    tableCount: 140,
    perkOffer: {
      title: "$25 Spa Credit & Complimentary Sunset Cocktail",
      code: "AZURE-VIP25",
      validDays: 60
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How has your stay at The Grand Azure been?",
          subtitle: "Rate your overall resort experience (Step 1 of 3)",
          options: [
            { value: 1, label: "Unsatisfactory", emoji: "😞", sentiment: "negative" },
            { value: 2, label: "Below Standards", emoji: "😕", sentiment: "negative" },
            { value: 3, label: "Adequate", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Wonderful", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Unforgettable!", emoji: "🌟", sentiment: "positive" },
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
          title: "Which aspects exceeded your expectations?",
          subtitle: "Select all that made your stay luxurious (Step 2 of 3)",
          options: [
            "Ocean View Suite & Bed Comfort",
            "Infinity Pool & Cabana Service",
            "Azure Spa & Hydrotherapy",
            "Breakfast Buffet & Terrace Dining",
            "Valet & Concierge Assistance",
            "Spotless Housekeeping",
            "Private Beach Access"
          ],
          next: {
            default: "ai_review_screen"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Connect Directly with Resort Duty Manager",
          subtitle: "We will address this during your stay or arrange immediate compensation.",
          placeholder: "Please share your room number or contact details...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },
  {
    id: "biz-3",
    slug: "velvet-roast",
    name: "Velvet Roast Artisan Café",
    category: "cafe",
    type: "Specialty Coffee & Bakery",
    tagline: "Single-Origin Roasts & Handcrafted Pastries",
    logo: "☕",
    brandColors: {
      primary: "#d97706",
      accent: "#f59e0b",
      bgGradient: "from-amber-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://maps.google.com/?cid=554433221100998877",
    yelpUrl: "https://www.yelp.com/biz/velvet-roast",
    tripAdvisorUrl: "https://www.tripadvisor.com/Restaurant_Review-velvet-roast",
    minPublicRating: 4,
    tableCount: 16,
    perkOffer: {
      title: "Free Pastry with your next specialty brew",
      code: "VELVET-BEANS",
      validDays: 14
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your coffee break today?",
          subtitle: "Tap how Velvet Roast energized you (Step 1 of 3)",
          options: [
            { value: 1, label: "Poor", emoji: "☕👎", sentiment: "negative" },
            { value: 2, label: "Meh", emoji: "😕", sentiment: "negative" },
            { value: 3, label: "Decent", emoji: "☕", sentiment: "neutral" },
            { value: 4, label: "Great!", emoji: "✨☕", sentiment: "positive" },
            { value: 5, label: "Obsessed!", emoji: "🔥☕", sentiment: "positive" },
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
          title: "What hit the sweet spot?",
          subtitle: "Pick your favorites (Step 2 of 3)",
          options: [
            "Oat Milk Lavender Latte",
            "Single-Origin Ethiopian Pour-Over",
            "Warm Almond Croissant",
            "Super Fast Barista Speed",
            "Vibey Music & Cozy Seating",
            "Reliable Fast WiFi / Remote Work",
            "Seasonal Cold Brew"
          ],
          next: {
            default: "ai_review_screen"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Let Us Remake Your Drink or Send a Coffee Voucher",
          subtitle: "Our Café Manager receives your note instantly.",
          placeholder: "Tell us what happened so we can make it right next time...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },
  {
    id: "biz-4",
    slug: "moda-luxe",
    name: "Moda Luxe Boutique Flagship",
    category: "retail",
    type: "Designer Apparel & Accessories",
    tagline: "Contemporary Silhouette & Curated Luxury",
    logo: "✨",
    brandColors: {
      primary: "#8b5cf6",
      accent: "#a78bfa",
      bgGradient: "from-violet-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://maps.google.com/?cid=112233445566778899",
    yelpUrl: "https://www.yelp.com/biz/moda-luxe",
    tripAdvisorUrl: "https://www.tripadvisor.com/Attraction_Review-moda-luxe",
    minPublicRating: 4,
    tableCount: 8,
    perkOffer: {
      title: "15% Off Your Next Seasonal Collection Purchase",
      code: "MODA-LUXE15",
      validDays: 45
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your styling and shopping experience?",
          subtitle: "Rate your visit to Moda Luxe (Step 1 of 3)",
          options: [
            { value: 1, label: "Poor", emoji: "🛍️👎", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "😕", sentiment: "negative" },
            { value: 3, label: "Good", emoji: "🛍️", sentiment: "neutral" },
            { value: 4, label: "Stylishly Great", emoji: "👗✨", sentiment: "positive" },
            { value: 5, label: "Runway Perfection!", emoji: "💎✨", sentiment: "positive" },
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
          title: "What did you adore most about our boutique?",
          subtitle: "Select your highlights (Step 2 of 3)",
          options: [
            "Curated Seasonal Collection",
            "Knowledgeable Personal Stylist",
            "Spacious Fitting Rooms & Lighting",
            "Smooth Checkout & Gift Wrapping",
            "Quality of Fabrics & Tailoring",
            "Store Aesthetic & Music"
          ],
          next: {
            default: "ai_review_screen"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Store Director Message",
          subtitle: "Your message goes directly to our Store Director.",
          placeholder: "Share what happened so we can assist you right away...",
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
  },
  {
    id: "fb-drc-2",
    businessId: "biz-drc",
    businessSlug: "dr-c-dental-clinic",
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Consultation Suite",
    channel: "QR Scan (Discharge Slip)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Prompt Zero-Wait Time", "Thorough Scaling & Cleaning", "Affordable & Transparent Treatment Plan"]
    },
    generatedReview: {
      tone: "detailed",
      draft: "Exceptional standard of dental care at Dr C Dental Clinic. From prompt zero-wait time to thorough teeth cleaning, everything was handled with utmost professionalism. Transparent pricing and gentle staff!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "priya.reddy@outlook.com",
    managerNotes: ""
  }
];

// Pre-calculated intelligence insights
export const INITIAL_AI_INSIGHTS = {
  complaintClusters: [
    {
      topic: "Dental Appointment Spacing",
      count: 2,
      severity: "low",
      impact: "Patients requested 10-min buffer between complex crown appointments.",
      suggestedAction: "Add 10-minute turnaround buffer on calendar software."
    }
  ],
  praiseClusters: [
    {
      topic: "Dr. C Gentle & Painless Treatments",
      count: 48,
      positiveScore: 99,
      quote: "Completely painless procedure, Dr. C is patient, gentle, and explains every step."
    }
  ]
};
