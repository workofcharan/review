// Initial Seed Data for Multi-Tenant Smart QR Feedback Platform

export const INITIAL_BUSINESSES = [
  {
    id: "biz-1",
    slug: "laura-bistro",
    name: "L'Aura Bistro & Wine Bar",
    category: "restaurant",
    type: "Fine Dining & Bar",
    tagline: "Modern French Gastronomy & Curated Cellar",
    logo: "🍷",
    brandColors: {
      primary: "#e11d48", // Rose/Crimson
      accent: "#fb7185",
      bgGradient: "from-rose-950 via-slate-900 to-slate-950"
    },
    publicReviewUrl: "https://maps.google.com/?cid=123456789012345678",
    yelpUrl: "https://www.yelp.com/biz/laura-bistro",
    tripAdvisorUrl: "https://www.tripadvisor.com/Restaurant_Review-laura-bistro",
    minPublicRating: 4, // 4 or 5 stars routed to Google Review
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
          subtitle: "Tap an emoji to share your initial impression",
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
            "3": "neutral_categories",
            "2": "negative_categories",
            "1": "negative_categories",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What delighted your palate and evening?",
          subtitle: "Select all highlights that made your visit memorable",
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
            default: "staff_shoutout"
          }
        },
        staff_shoutout: {
          id: "staff_shoutout",
          type: "chips_single",
          title: "Would you like to shout out a team member?",
          subtitle: "We pass your praise directly to our staff!",
          options: [
            "Alex (Lead Server)",
            "Chef Marco (Kitchen)",
            "Maya (Master Sommelier)",
            "Front Desk Host",
            "The Entire Kitchen Team",
            "Prefer to skip"
          ],
          next: {
            default: "positive_free_text"
          }
        },
        positive_free_text: {
          id: "positive_free_text",
          type: "free_text",
          title: "Any special note or dish review to highlight?",
          subtitle: "Optional: Our AI will turn your feedback into a ready-to-post 5-star draft!",
          placeholder: "e.g., The wine pairing with the duck confit was absolute perfection, and Alex was so knowledgeable...",
          next: {
            default: "ai_review_screen"
          }
        },
        neutral_categories: {
          id: "neutral_categories",
          type: "chips_multiselect",
          title: "What could take your experience from okay to exceptional?",
          subtitle: "Your candid feedback helps our kitchen & floor team refine every detail",
          options: [
            "Faster Service Pace",
            "Portion Sizes",
            "Acoustics / Noise Level",
            "More Vegetarian Options",
            "Table Spacing & Privacy",
            "Cocktail Balance",
            "Dessert Variety"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        negative_categories: {
          id: "negative_categories",
          type: "chips_multiselect",
          title: "We are truly sorry. What fell short of expectations?",
          subtitle: "Please let us know so management can make this right immediately",
          options: [
            "Food Temperature / Quality",
            "Service Delay & Wait Times",
            "Server Inattentiveness",
            "Billing or Reservation Issue",
            "Noise / Table Atmosphere",
            "Dietary Request Overlooked"
          ],
          next: {
            "Service Delay & Wait Times": "wait_time_drilldown",
            "Food Temperature / Quality": "food_drilldown",
            default: "private_manager_alert"
          }
        },
        wait_time_drilldown: {
          id: "wait_time_drilldown",
          type: "chips_single",
          title: "Where did the delay occur?",
          subtitle: "Pinpointing delays helps our floor manager optimize kitchen pace",
          options: [
            "Wait to be seated (with reservation)",
            "Long wait for drink orders",
            "Gap between appetizer and mains (>35 min)",
            "Waiting for bill / check",
            "General slow pacing"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        food_drilldown: {
          id: "food_drilldown",
          type: "chips_single",
          title: "Which item needed improvement?",
          subtitle: "Our executive chef reviews every comment directly",
          options: [
            "Main course arrived lukewarm",
            "Steak was not cooked to requested temp",
            "Over-seasoned / too salty",
            "Special allergy/request missed",
            "Drinks were watered down"
          ],
          next: {
            default: "private_manager_alert"
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
      primary: "#0284c7", // Sky/Ocean blue
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
          subtitle: "Rate your overall resort & hospitality experience",
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
            "3": "neutral_categories",
            "2": "negative_categories",
            "1": "negative_categories",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "Which aspects exceeded your expectations?",
          subtitle: "Select all that made your stay luxurious",
          options: [
            "Ocean View Suite & Bed Comfort",
            "Infinity Pool & Cabana Service",
            "Azure Spa & Hydrotherapy",
            "Breakfast Buffet & Terrace Dining",
            "Valet & Concierge Assistance",
            "Spotless Housekeeping",
            "Private Beach Access",
            "Kids Club / Family Amenities"
          ],
          next: {
            default: "positive_free_text"
          }
        },
        positive_free_text: {
          id: "positive_free_text",
          type: "free_text",
          title: "Any memorable moments or staff member you'd like to highlight?",
          subtitle: "We'll draft your glowing review ready for Google & TripAdvisor!",
          placeholder: "e.g., The sunset from the infinity pool was breathtaking and Elena at concierge booked us prime dinner reservations...",
          next: {
            default: "ai_review_screen"
          }
        },
        neutral_categories: {
          id: "neutral_categories",
          type: "chips_multiselect",
          title: "What could elevate your future stay?",
          subtitle: "Let our Guest Experience Director know",
          options: [
            "Faster Check-in / Mobile Key",
            "Gym Equipment Selection",
            "Room Service Speed",
            "Pool Chair Availability",
            "Soundproofing between rooms",
            "Late Checkout Flexibility"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        negative_categories: {
          id: "negative_categories",
          type: "chips_multiselect",
          title: "We are deeply sorry. What caused dissatisfaction?",
          subtitle: "Our Duty Manager is notified in real time",
          options: [
            "Room Cleanliness / Maintenance",
            "AC or Plumbing Issue",
            "Noise Disruption during sleep",
            "Unhelpful Staff / Check-in Delay",
            "Billing or Deposit Discrepancy",
            "Spa / Pool Reservation Issue"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        private_manager_alert: {
          id: "private_manager_alert",
          type: "private_resolution",
          title: "Connect Directly with Resort Duty Manager",
          subtitle: "We will address this during your stay or arrange immediate compensation.",
          placeholder: "Please share your room number or contact details so we can resolve this right now...",
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
      primary: "#d97706", // Amber / Warm caramel
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
          subtitle: "Tap how Velvet Roast energized you",
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
            "3": "neutral_categories",
            "2": "negative_categories",
            "1": "negative_categories",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What hit the sweet spot?",
          subtitle: "Pick your favorites",
          options: [
            "Oat Milk Lavender Latte",
            "Single-Origin Ethiopian Pour-Over",
            "Warm Almond Croissant",
            "Super Fast Barista Speed",
            "Vibey Music & Cozy Seating",
            "Reliable Fast WiFi / Remote Work",
            "Friendly Barista Banter",
            "Seasonal Cold Brew"
          ],
          next: {
            default: "positive_free_text"
          }
        },
        positive_free_text: {
          id: "positive_free_text",
          type: "free_text",
          title: "Any favorite roast or shoutout to your barista?",
          subtitle: "AI will draft your review for Google Maps!",
          placeholder: "e.g., Best flat white in the neighborhood, the foam art was gorgeous!",
          next: {
            default: "ai_review_screen"
          }
        },
        neutral_categories: {
          id: "neutral_categories",
          type: "chips_multiselect",
          title: "How can we make your next coffee run better?",
          subtitle: "Help us brew perfection",
          options: [
            "More seating / outlets",
            "Wider vegan/gluten-free pastry selection",
            "Faster queue management",
            "More syrup / milk alternatives",
            "Temperature of drink"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        negative_categories: {
          id: "negative_categories",
          type: "chips_multiselect",
          title: "Sorry about that! What went wrong?",
          subtitle: "Let our café lead fix it on the spot",
          options: [
            "Drink made incorrectly (wrong milk/syrup)",
            "Coffee tasted burnt or sour",
            "Pastry was stale / cold",
            "Long wait time (>15 min for coffee)",
            "Unfriendly barista service",
            "Dirty tables / trash full"
          ],
          next: {
            default: "private_manager_alert"
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
      primary: "#8b5cf6", // Violet / Luxury purple
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
          subtitle: "Rate your visit to Moda Luxe",
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
            "3": "neutral_categories",
            "2": "negative_categories",
            "1": "negative_categories",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What did you adore most about our boutique?",
          subtitle: "Select your highlights",
          options: [
            "Curated Seasonal Collection",
            "Knowledgeable Personal Stylist",
            "Spacious Fitting Rooms & Lighting",
            "Smooth Checkout & Gift Wrapping",
            "Quality of Fabrics & Tailoring",
            "Store Aesthetic & Music"
          ],
          next: {
            default: "positive_free_text"
          }
        },
        positive_free_text: {
          id: "positive_free_text",
          type: "free_text",
          title: "Any special shoutout or item you loved?",
          subtitle: "AI will draft your recommendation for Google Reviews!",
          placeholder: "e.g., The stylist found the perfect evening jacket and the fitting room mirrors are so flattering...",
          next: {
            default: "ai_review_screen"
          }
        },
        neutral_categories: {
          id: "neutral_categories",
          type: "chips_multiselect",
          title: "What would enhance your shopping journey?",
          subtitle: "We value your boutique styling insights",
          options: [
            "More Size Inclusivity (XS/XL)",
            "Expanded Shoe or Accessory selection",
            "Faster fitting room assistance",
            "Clearer Price Tagging",
            "Loyalty Program Perks"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        negative_categories: {
          id: "negative_categories",
          type: "chips_multiselect",
          title: "We sincerely apologize. What went wrong?",
          subtitle: "Our Store Director will review your feedback immediately",
          options: [
            "Staff was unwelcoming or dismissive",
            "Fitting room was messy / occupied too long",
            "Size out of stock with no online ordering help",
            "Return / Exchange friction",
            "Billing or promo code issue"
          ],
          next: {
            default: "private_manager_alert"
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
    id: "fb-101",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Table 14 (Patio)",
    channel: "QR Scan (Table Tent)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Truffle Tagliatelle", "Sommelier Wine Pairing", "Warm & Attentive Service"],
      staff_shoutout: "Maya (Master Sommelier)",
      positive_free_text: "The wine pairing suggestion by Maya made our anniversary dinner absolutely unforgettable. The handmade pasta melted in our mouth!"
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Had the most extraordinary dining experience at L'Aura Bistro! The Truffle Tagliatelle was sublime and the sommelier wine pairings were spot-on. Special shoutout to Maya for phenomenal service. Can't wait to return!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "clara.v@gmail.com",
    managerNotes: ""
  },
  {
    id: "fb-102",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Table 6 (Main Dining)",
    channel: "QR Scan (Table Tent)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Dry-Aged Ribeye", "Signature Craft Cocktails", "Romantic Ambiance & Jazz"],
      staff_shoutout: "Alex (Lead Server)",
      positive_free_text: "Alex was so prompt and the smoked rosemary bourbon cocktail was world-class."
    },
    generatedReview: {
      tone: "detailed",
      draft: "L'Aura Bistro delivers a truly world-class dining experience. The Dry-Aged Ribeye was seared to perfection and the craft cocktails with live jazz created the best atmosphere in town. Alex provided stellar service!",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "marcus.k@outlook.com",
    managerNotes: ""
  },
  {
    id: "fb-103",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(), // 1.8 hrs ago
    rating: 2,
    sentiment: "negative",
    tableOrLocation: "Table 22 (Corner Booth)",
    channel: "QR Scan (Bill Folder)",
    answers: {
      overall_experience: 2,
      negative_categories: ["Service Delay & Wait Times"],
      wait_time_drilldown: "Gap between appetizer and mains (>35 min)",
      private_manager_alert: "We had reservation at 7:30 PM. We waited 40 minutes after our salad for the steaks to arrive. The server apologized but nobody checked on our empty drinks. We love the food normally, but tonight was rough."
    },
    generatedReview: null, // Intercepted! Did NOT reach Google
    recoveryStatus: "pending_review", // Intercepted private feedback
    customerContact: "david.h@techfirm.co | (555) 234-8890",
    managerNotes: "Spoke with chef regarding ticket bottleneck around 8:15 PM. Prepared $50 comp dining credit."
  },
  {
    id: "fb-104",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hrs ago
    rating: 4,
    sentiment: "positive",
    tableOrLocation: "Bar Stool 3",
    channel: "QR Scan (Bar Coaster)",
    answers: {
      overall_experience: 4,
      positive_highlights: ["Signature Craft Cocktails", "Artisan Bread & Butter"],
      staff_shoutout: "The Entire Kitchen Team",
      positive_free_text: "Great atmosphere and lovely drink menu."
    },
    generatedReview: {
      tone: "concise",
      draft: "Wonderful experience at L'Aura Bistro! Delightful artisan bread and top-notch signature craft cocktails. Highly recommended.",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "",
    managerNotes: ""
  },
  {
    id: "fb-105",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hrs ago
    rating: 1,
    sentiment: "negative",
    tableOrLocation: "Table 11",
    channel: "QR Scan (Table Tent)",
    answers: {
      overall_experience: 1,
      negative_categories: ["Food Temperature / Quality"],
      food_drilldown: "Special allergy/request missed",
      private_manager_alert: "Informed server of severe dairy allergy, but truffle pasta came with shaved parmesan. Could have been dangerous. We had to send it back."
    },
    generatedReview: null, // Intercepted!
    recoveryStatus: "resolved",
    customerContact: "sarah.jenkins@gmail.com",
    managerNotes: "Manager Chris personally called guest within 20 minutes, comped meal, and held allergy protocol refresher with kitchen staff."
  },
  {
    id: "fb-106",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), // 12 hrs ago
    rating: 3,
    sentiment: "neutral",
    tableOrLocation: "Table 8",
    channel: "QR Scan (Receipt)",
    answers: {
      overall_experience: 3,
      neutral_categories: ["Acoustics / Noise Level", "Table Spacing & Privacy"],
      private_manager_alert: "The food was tasty, but the background music was so loud we could barely converse across a 2-person table."
    },
    generatedReview: null,
    recoveryStatus: "reviewed",
    customerContact: "rachel.m@me.com",
    managerNotes: "Adjusted patio & dining room decibel caps on sound system."
  }
];

// Pre-calculated intelligence insights
export const INITIAL_AI_INSIGHTS = {
  complaintClusters: [
    {
      topic: "Weekend Main Course Delay",
      count: 7,
      severity: "high",
      impact: "Accounts for 62% of negative ratings between 7:30 PM - 9:00 PM on Fri/Sat.",
      suggestedAction: "Implement kitchen expediter staging during peak rush hours."
    },
    {
      topic: "Dining Room Sound Level",
      count: 4,
      severity: "medium",
      impact: "Mentioned by romantic dinner couples in main dining hall.",
      suggestedAction: "Lower speaker zone 2 volume by 15% after 8:00 PM."
    },
    {
      topic: "Gluten-Free & Dairy Labeling",
      count: 3,
      severity: "high",
      impact: "Guests requesting clearer menu icons for allergies.",
      suggestedAction: "Add allergen symbol legend to physical and digital dessert menus."
    }
  ],
  praiseClusters: [
    {
      topic: "Truffle Tagliatelle & Fresh Pasta",
      count: 34,
      positiveScore: 99,
      quote: "Best homemade pasta in the entire city, perfectly rich sauce."
    },
    {
      topic: "Maya (Sommelier) Wine Pairings",
      count: 22,
      positiveScore: 98,
      quote: "Knowledgeable, passionate, and introduced us to incredible small-producer French wines."
    },
    {
      topic: "Cocktail Artistry & Ambiance",
      count: 19,
      positiveScore: 95,
      quote: "Warm lighting, mellow jazz, and cocktails crafted with artisanal ice."
    }
  ]
};
