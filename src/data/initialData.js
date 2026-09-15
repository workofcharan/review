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
    minPublicRating: 4,
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
            "3": "private_manager_alert",
            "2": "private_manager_alert",
            "1": "private_manager_alert",
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

  // B2: Cafe / Restaurant
  {
    id: "biz-cafe",
    slug: "laura-bistro-cafe",
    name: "L'Aura Bistro & Artisan Café",
    category: "cafe",
    type: "Specialty Coffee, Brunch & Pastry",
    tagline: "Single-Origin Brews, Artisan Pastries & Cozy Ambiance",
    logo: "☕",
    brandColors: {
      primary: "#d97706",
      accent: "#f59e0b",
      bgGradient: "from-amber-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://g.page/r/CVfAf-zR7rBLEBE/review",
    yelpUrl: "https://www.yelp.com/biz/laura-bistro-cafe",
    tripAdvisorUrl: "",
    minPublicRating: 4,
    tableCount: 16,
    aiPraise: {
      topic: "Signature Pour-Over & Pistachio Croissant",
      quote: "The artisan pistachio croissants and Ethiopian pour-overs are legendary!"
    },
    aiBottleneck: {
      topic: "Sunday Brunch Seating Bottleneck",
      quote: "Patrons experiencing 20+ min wait for outdoor patio seating on Sundays."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your café experience at L'Aura?",
          subtitle: "Tap an emoji to share your impression",
          options: [
            { value: 1, label: "Poor", emoji: "😞", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "😕", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Good", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Superb!", emoji: "🤩", sentiment: "positive" },
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
          title: "What did you enjoy most about your visit?",
          subtitle: "Select all that made your coffee break special",
          options: [
            "Signature Specialty Coffee & Latte Art",
            "Fresh Flaky Artisanal Pastries",
            "Warm & Welcoming Barista Team",
            "Relaxing Music & Aesthetic Ambiance",
            "Fast Wi-Fi & Laptop-Friendly Workspaces",
            "Delicious Avocado Toast & Brunch",
            "Quick Service & Prompt Order Delivery"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to Head Barista & Manager",
          subtitle: "Your message goes directly to our Café Manager for immediate review and resolution.",
          placeholder: "Please tell us what went wrong so we can make it right on your next cup...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },

  // B3: Salon & Spa
  {
    id: "biz-salon",
    slug: "glow-glam-salon",
    name: "Glow & Glam Luxury Salon & Spa",
    category: "salon",
    type: "Hair Styling, Esthetics & Wellness Spa",
    tagline: "Couture Hair, Rejuvenating Facials & Radiant Transformations",
    logo: "💇‍♀️",
    brandColors: {
      primary: "#db2777",
      accent: "#f472b6",
      bgGradient: "from-pink-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://g.page/r/CVfAf-zR7rBLEBE/review",
    yelpUrl: "https://www.yelp.com/biz/glow-glam-salon",
    tripAdvisorUrl: "",
    minPublicRating: 4,
    tableCount: 12,
    aiPraise: {
      topic: "Balayage Color & Hydrating Scalp Ritual",
      quote: "Stylists provide attentive consultations and breathtaking hair transformations."
    },
    aiBottleneck: {
      topic: "Weekend Appointment Scheduling Crossover",
      quote: "Slight 10 min lag between washing basin and blow-dry chair during peak weekend afternoons."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your styling & spa experience at Glow & Glam?",
          subtitle: "Tap an emoji to rate your salon session",
          options: [
            { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Loved it!", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Stunning!", emoji: "💖✨", sentiment: "positive" },
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
          title: "What did you love about your treatment today?",
          subtitle: "Select all that made your salon appointment wonderful",
          options: [
            "Flawless Haircut & Expert Styling",
            "Vibrant Color & Seamless Balayage",
            "Relaxing Scalp Massage & Treatment",
            "Knowledgeable & Attentive Stylist",
            "Spotless, Chic & Luxurious Salon Vibe",
            "Zero Waiting Time & Prompt Appointment",
            "Premium Hair & Skin Care Products Used"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to Salon Director",
          subtitle: "Your message is sent privately to our Creative Director for prompt resolution and guarantee.",
          placeholder: "Please describe your experience so our Director can reach out and ensure you are 100% delighted...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },

  // B4: Gym & Fitness Club
  {
    id: "biz-gym",
    slug: "apex-fitness-gym",
    name: "Apex Elite Fitness & Gym",
    category: "gym",
    type: "Modern Fitness Club & Personal Training",
    tagline: "State-of-the-Art Equipment, Inspiring Coaches & Peak Energy",
    logo: "🏋️",
    brandColors: {
      primary: "#8b5cf6",
      accent: "#a78bfa",
      bgGradient: "from-purple-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://g.page/r/CVfAf-zR7rBLEBE/review",
    yelpUrl: "https://www.yelp.com/biz/apex-fitness-gym",
    tripAdvisorUrl: "",
    minPublicRating: 4,
    tableCount: 14,
    aiPraise: {
      topic: "State-of-the-Art Equipment & Cleanliness",
      quote: "Members praise the pristine locker rooms, high-energy coaching staff, and modern powerlifting rigs."
    },
    aiBottleneck: {
      topic: "6 PM Peak Hour Squat Rack Demand",
      quote: "Occasional queue for free-weight benches between 5:45 PM and 7:00 PM on weekdays."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your workout session at Apex Elite Fitness?",
          subtitle: "Tap an emoji to rate your gym experience today",
          options: [
            { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Great Workout!", emoji: "💪", sentiment: "positive" },
            { value: 5, label: "Peak Energy!", emoji: "🔥⚡", sentiment: "positive" },
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
          title: "What powered your workout today?",
          subtitle: "Select all highlights that made your session great",
          options: [
            "State-of-the-Art Gym Equipment",
            "Motivating & Expert Personal Trainers",
            "Spotless Facility & Locker Rooms",
            "High-Energy Workout Atmosphere",
            "Dynamic Group Fitness Classes",
            "Smooth Check-in & Welcoming Staff",
            "Clean Showers & Recovery Sauna"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to General Manager & Head Coach",
          subtitle: "Your feedback goes straight to Club Management for immediate floor resolution.",
          placeholder: "Please describe what we can improve to make your gym session 5-star next time...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },

  // B5: Hotel & Resort
  {
    id: "biz-hotel",
    slug: "grand-horizon-hotel",
    name: "The Grand Horizon Hotel & Suites",
    category: "hotel",
    type: "Boutique Hotel & Luxury Suites",
    tagline: "Exceptional Comfort, World-Class Concierge & Unforgettable Stays",
    logo: "🏨",
    brandColors: {
      primary: "#0d9488",
      accent: "#14b8a6",
      bgGradient: "from-teal-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://g.page/r/CVfAf-zR7rBLEBE/review",
    yelpUrl: "https://www.yelp.com/biz/grand-horizon-hotel",
    tripAdvisorUrl: "https://www.tripadvisor.com/grand-horizon",
    minPublicRating: 4,
    tableCount: 24,
    aiPraise: {
      topic: "Immaculate Suites & World-Class Concierge",
      quote: "Guests consistently celebrate the plush bedding, rooftop sunset deck, and attentive concierge."
    },
    aiBottleneck: {
      topic: "Weekend Valet Peak Retrieval Wait",
      quote: "10-15 minute wait time for valet car retrieval during Sunday noon checkout rush."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your stay at The Grand Horizon Hotel?",
          subtitle: "Tap an emoji to rate your hospitality experience",
          options: [
            { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Loved it!", emoji: "😊", sentiment: "positive" },
            { value: 5, label: "Exceptional!", emoji: "🌟✨", sentiment: "positive" },
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
          title: "What made your stay special?",
          subtitle: "Select all highlights from your stay",
          options: [
            "Immaculate Room & Luxury Bedding",
            "Exceptional Concierge & Front Desk",
            "Stunning Views & Pool / Spa Amenities",
            "Delicious Breakfast & Room Dining",
            "Seamless Express Check-in",
            "Quiet & Peaceful Suite Acoustics"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to Hotel Duty Manager",
          subtitle: "Your message goes directly to our Executive Guest Relations Team for rapid resolution.",
          placeholder: "Please share what occurred so we can immediately make it right during your stay...",
          next: {
            default: "completion_screen"
          }
        }
      }
    }
  },

  // B6: Auto & Detailing
  {
    id: "biz-auto",
    slug: "precision-auto-care",
    name: "Precision Auto Care & Detailing",
    category: "automotive",
    type: "Certified Auto Care & Ceramic Detailing",
    tagline: "Master Technicians, Transparent Pricing & Fast Turnaround",
    logo: "🚗",
    brandColors: {
      primary: "#ea580c",
      accent: "#f97316",
      bgGradient: "from-orange-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://g.page/r/CVfAf-zR7rBLEBE/review",
    yelpUrl: "https://www.yelp.com/biz/precision-auto-care",
    tripAdvisorUrl: "",
    minPublicRating: 4,
    tableCount: 8,
    aiPraise: {
      topic: "Honest Diagnostics & Mirror-Gloss Finish",
      quote: "Customers praise the crystal clear quote transparency and stunning ceramic coating results."
    },
    aiBottleneck: {
      topic: "Saturday Brake Diagnostic Queues",
      quote: "High walk-in demand on Saturday mornings."
    },
    questionFlow: {
      start: "overall_experience",
      questions: {
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your service at Precision Auto Care?",
          subtitle: "Tap an emoji to rate your vehicle service",
          options: [
            { value: 1, label: "Poor", emoji: "😣", sentiment: "negative" },
            { value: 2, label: "Fair", emoji: "🙁", sentiment: "negative" },
            { value: 3, label: "Average", emoji: "😐", sentiment: "neutral" },
            { value: 4, label: "Great Work!", emoji: "👍", sentiment: "positive" },
            { value: 5, label: "Flawless Service!", emoji: "🚘✨", sentiment: "positive" },
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
          title: "What did you appreciate most about your service?",
          subtitle: "Select all that made your visit smooth",
          options: [
            "Fast Diagnostic & Expert Repair",
            "Transparent & Honest Quote",
            "Spotless Ceramic Coating & Wash Finish",
            "On-Time Vehicle Delivery",
            "Helpful & Polite Service Advisor",
            "Comfortable Waiting Lounge with Coffee"
          ],
          next: {
            default: "direct_submit"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Direct Escalation to Master Service Director",
          subtitle: "Your message goes directly to our Shop Owner & Lead Technician.",
          placeholder: "Please let us know how we can address any service or invoice concerns...",
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

  // L'Aura Cafe
  {
    id: "fb-cafe-1",
    businessId: "biz-cafe",
    businessSlug: "laura-bistro-cafe",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Table 4 (Patio)",
    channel: "QR Scan (Table Wooden Tent)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Signature Specialty Coffee & Latte Art", "Fresh Flaky Artisanal Pastries", "Relaxing Music & Aesthetic Ambiance"]
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Best specialty coffee and pastries in town! The pistachio croissant was crispy and warm, and the vibe is calm and cozy.",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "alex.m@gmail.com",
    managerNotes: ""
  },
  {
    id: "fb-cafe-2",
    businessId: "biz-cafe",
    businessSlug: "laura-bistro-cafe",
    createdAt: new Date(Date.now() - 1000 * 60 * 140).toISOString(),
    rating: 3,
    sentiment: "neutral",
    tableOrLocation: "Table 12",
    channel: "QR Scan (Table Acrylic Stand)",
    answers: {
      overall_experience: 3,
      private_manager_alert: "Coffee was delicious but we waited 20 minutes for our brunch order because the kitchen was crowded."
    },
    generatedReview: null,
    recoveryStatus: "pending_review",
    customerContact: "sam.w@yahoo.com",
    managerNotes: "Manager to follow up with a complimentary pastry voucher on next visit."
  },

  // Glow & Glam Salon
  {
    id: "fb-salon-1",
    businessId: "biz-salon",
    businessSlug: "glow-glam-salon",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Station 3 (Stylist Elena)",
    channel: "QR Scan (Mirror QR Sticker)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Flawless Haircut & Expert Styling", "Knowledgeable & Attentive Stylist", "Spotless, Chic & Luxurious Salon Vibe"]
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Absolutely thrilled with my haircut and styling at Glow & Glam! Elena is an artist, understood exactly what I wanted, and the salon is gorgeous!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "sophia.t@gmail.com",
    managerNotes: ""
  },

  // Apex Elite Fitness & Gym
  {
    id: "fb-gym-1",
    businessId: "biz-gym",
    businessSlug: "apex-fitness-gym",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Free Weight Zone QR Stand",
    channel: "QR Scan (Locker Area / Water Station)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["State-of-the-Art Gym Equipment", "Motivating & Expert Personal Trainers", "High-Energy Workout Atmosphere"]
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Had an amazing workout at Apex Elite Fitness! The equipment is brand new and top-of-the-line, coaches are encouraging and knowledgeable, and the energy in here is unmatched. 5/5 stars! 🔥",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "marcus.k@gmail.com",
    managerNotes: ""
  },
  {
    id: "fb-gym-2",
    businessId: "biz-gym",
    businessSlug: "apex-fitness-gym",
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    rating: 3,
    sentiment: "neutral",
    tableOrLocation: "Reception Desk Tent",
    channel: "QR Scan (Front Desk Tent)",
    answers: {
      overall_experience: 3,
      private_manager_alert: "Love the facility and coaches, but squat racks were all occupied during 6 PM rush. Would love an extra power rack."
    },
    generatedReview: null,
    recoveryStatus: "in_progress",
    customerContact: "david.lee@outlook.com",
    managerNotes: "Spoke with head trainer, looking into adding auxiliary rack in turf zone."
  },

  // Grand Horizon Hotel
  {
    id: "fb-hotel-1",
    businessId: "biz-hotel",
    businessSlug: "grand-horizon-hotel",
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Suite 504",
    channel: "QR Scan (In-Room Welcome Key Card)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Immaculate Room & Luxury Bedding", "Exceptional Concierge & Front Desk", "Stunning Views & Pool / Spa Amenities"]
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Our weekend stay at The Grand Horizon Hotel was unforgettable! The suite was spotless and breathtaking, concierge went above and beyond, and the rooftop pool deck was spectacular.",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "claire.bennett@gmail.com",
    managerNotes: ""
  },

  // Precision Auto Care
  {
    id: "fb-auto-1",
    businessId: "biz-auto",
    businessSlug: "precision-auto-care",
    createdAt: new Date(Date.now() - 1000 * 60 * 80).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Bay 2 (Service Advisor Mark)",
    channel: "QR Scan (Customer Lounge Acrylic)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Fast Diagnostic & Expert Repair", "Transparent & Honest Quote", "Spotless Ceramic Coating & Wash Finish"]
    },
    generatedReview: {
      tone: "professional",
      draft: "Super impressed with Precision Auto Care. They diagnosed my suspension issue quickly, provided an honest upfront quote, and returned the car looking showroom clean. Highly recommended!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "robert.t@yahoo.com",
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
