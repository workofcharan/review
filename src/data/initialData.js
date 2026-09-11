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
        overall_experience: {
          id: "overall_experience",
          type: "emoji_scale",
          title: "How was your dental care experience at Dr C Dental Clinic?",
          subtitle: "Tap an emoji to rate your visit today",
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
            "3": "neutral_categories",
            "2": "negative_categories",
            "1": "negative_categories",
          }
        },
        positive_highlights: {
          id: "positive_highlights",
          type: "chips_multiselect",
          title: "What delighted you about your treatment & visit?",
          subtitle: "Select all highlights that made your appointment comfortable",
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
            default: "staff_shoutout"
          }
        },
        staff_shoutout: {
          id: "staff_shoutout",
          type: "chips_single",
          title: "Would you like to give a shoutout to our clinic staff?",
          subtitle: "Your kind words brighten our team's day!",
          options: [
            "Dr. C (Lead Dental Surgeon)",
            "Dental Hygienist & Assistant",
            "Front Desk Coordinator",
            "The Entire Clinic Staff",
            "Prefer to skip"
          ],
          next: {
            default: "positive_free_text"
          }
        },
        positive_free_text: {
          id: "positive_free_text",
          type: "free_text",
          title: "Any specific treatment or doctor compliment to share?",
          subtitle: "Optional: Our AI will turn your praise into a ready-to-post 5-star Google review for Dr C Dental Clinic!",
          placeholder: "e.g., Dr. C made my root canal completely painless and explained every step with patience. The clinic is spotless and highly professional...",
          next: {
            default: "ai_review_screen"
          }
        },
        neutral_categories: {
          id: "neutral_categories",
          type: "chips_multiselect",
          title: "What could make your next visit even more seamless?",
          subtitle: "Help our clinic director optimize your patient care",
          options: [
            "Faster Appointment Booking",
            "Post-Treatment Care Instructions",
            "Waiting Room Seating",
            "More Flexible Evening Slots",
            "Payment & Insurance Options"
          ],
          next: {
            default: "private_manager_alert"
          }
        },
        negative_categories: {
          id: "negative_categories",
          type: "chips_multiselect",
          title: "We sincerely apologize. What fell short of expectations?",
          subtitle: "Dr. C and our clinical director review all concerns immediately to ensure patient comfort",
          options: [
            "Treatment Discomfort or Sensitivity",
            "Long Wait Time Past Appointment",
            "Billing or Fee Clarification",
            "Staff Interaction or Communication",
            "Post-Care Follow-up Delay"
          ],
          next: {
            default: "private_manager_alert"
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
      positive_highlights: ["Painless & Gentle Procedure", "Dr. C's Clear & Reassuring Guidance", "Spotless & Modern Sterile Equipment"],
      staff_shoutout: "Dr. C (Lead Dental Surgeon)",
      positive_free_text: "Dr. C is truly a magician! I was terrified of dental procedures, but my root canal and scaling were completely painless. Highly recommend to everyone in the area!"
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Had the most incredible experience at Dr C Dental Clinic! The treatment was completely painless, and Dr. C explained every step with such kindness and clarity. The clinic is ultra-clean and modern. 5/5 stars all the way!",
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
      positive_highlights: ["Prompt Zero-Wait Time", "Thorough Scaling & Cleaning", "Affordable & Transparent Treatment Plan"],
      staff_shoutout: "Dental Hygienist & Assistant",
      positive_free_text: "Very professional staff and transparent pricing. Best dental clinic in the neighborhood."
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
  },
  {
    id: "fb-101",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    rating: 5,
    sentiment: "positive",
    tableOrLocation: "Table 14 (Patio)",
    channel: "QR Scan (Table Tent)",
    answers: {
      overall_experience: 5,
      positive_highlights: ["Truffle Tagliatelle", "Sommelier Wine Pairing", "Warm & Attentive Service"],
      staff_shoutout: "Maya (Master Sommelier)",
      positive_free_text: "The wine pairing suggestion by Maya made our anniversary dinner absolutely unforgettable."
    },
    generatedReview: {
      tone: "enthusiastic",
      draft: "Had an extraordinary dining experience at L'Aura Bistro! The Truffle Tagliatelle was sublime and the sommelier wine pairings were spot-on. Special shoutout to Maya for phenomenal service.",
      wasPublishedPublicly: true,
      platform: "Google Reviews"
    },
    recoveryStatus: "none_needed",
    customerContact: "clara.v@gmail.com",
    managerNotes: ""
  },
  {
    id: "fb-103",
    businessId: "biz-1",
    businessSlug: "laura-bistro",
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    rating: 2,
    sentiment: "negative",
    tableOrLocation: "Table 22",
    channel: "QR Scan (Bill Folder)",
    answers: {
      overall_experience: 2,
      negative_categories: ["Service Delay & Wait Times"],
      private_manager_alert: "We had a reservation at 7:30 PM but waited 40 minutes for mains."
    },
    generatedReview: null,
    recoveryStatus: "pending_review",
    customerContact: "david.h@techfirm.co",
    managerNotes: "Comped $50 dining credit."
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
    },
    {
      topic: "Truffle Tagliatelle & Fresh Pasta",
      count: 34,
      positiveScore: 99,
      quote: "Best homemade pasta in the entire city, perfectly rich sauce."
    }
  ]
};
