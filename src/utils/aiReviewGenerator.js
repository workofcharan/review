// Smart AI Review Synthesis & Dynamic Feedback Intelligence Engine

/**
 * Infers category from business metadata (category, name, type, logo)
 */
export function inferCategoryFromBusiness(business) {
  if (!business) return 'general';
  if (business.category && business.category !== 'healthcare') {
    return business.category;
  }
  
  const text = `${business.name || ''} ${business.type || ''} ${business.tagline || ''}`.toLowerCase();
  const logo = business.logo || '';

  // Gym / Fitness
  if (['🏋️', '🥊', '🧘', '🏃', '🏊'].includes(logo) || /gym|fitness|crossfit|workout|trainer|training|boxing|yoga|athletics|apex/.test(text)) {
    return 'gym';
  }
  // Cafe / Bakery / Coffee
  if (['☕', '🥐', '🥖', '🥯', '🍩'].includes(logo) || /cafe|coffee|bakery|roastery|espresso|brew|matcha|tea/.test(text)) {
    return 'cafe';
  }
  // Restaurant / Dining / Food
  if (['🍽️', '🍕', '🍔', '🍷', '🌮', '🍦', '🍜', '🍣', '🥩'].includes(logo) || /restaurant|bistro|kitchen|grill|pizza|burger|dining|food|eatery|taco|steak|sushi|pasta/.test(text)) {
    return 'restaurant';
  }
  // Salon / Spa / Beauty
  if (['💇', '💇‍♀️', '💆', '💅', '🌸', '💈', '💄'].includes(logo) || /salon|spa|hair|beauty|barber|nails|massage|skin|glow|aesthetic/.test(text)) {
    return 'salon';
  }
  // Hotel / Resort / Hospitality
  if (['🏨', '🏖️', '🌴', '🛏️'].includes(logo) || /hotel|resort|suites|inn|stay|lodge|motel|villa|grand/.test(text)) {
    return 'hotel';
  }
  // Automotive / Car Care
  if (['🚗', '🔧', '🏎️', '🛠️', '🏎'].includes(logo) || /auto|car|motors|garage|tire|mechanic|detailing|lube|wash/.test(text)) {
    return 'automotive';
  }
  // Retail / Boutique / Store
  if (['🛍️', '👟', '💎', '👗', '👔', '👠'].includes(logo) || /boutique|store|shop|retail|fashion|apparel|jewel|shoes|market/.test(text)) {
    return 'retail';
  }
  // Pet Care / Veterinary
  if (['🐾', '🐕', '🐈', '🩺'].includes(logo) || /pet|vet|paws|veterinary|animal|hound|dog|cat/.test(text)) {
    return 'pet';
  }
  // Healthcare / Dental
  if (['🦷', '🏥', '💊'].includes(logo) || /dental|dentist|clinic|doctor|dr\.|teeth|ortho|chiro|medical|health/.test(text)) {
    return 'healthcare';
  }

  return business.category || 'general';
}

/**
 * Returns a natural staff role/label based on business category & name
 */
export function getStaffLabelForBusiness(business) {
  if (!business) return 'the team';
  if (business.name && (business.name.includes('Dr C') || business.name.toLowerCase().includes('dr.'))) {
    return business.name.includes('Dr C') ? 'Dr. C & the care team' : 'the doctor & staff';
  }
  const cat = inferCategoryFromBusiness(business);
  switch (cat) {
    case 'gym':
    case 'fitness':
      return 'the coaches & trainers';
    case 'cafe':
      return 'the baristas & staff';
    case 'restaurant':
      return 'the servers & culinary team';
    case 'salon':
    case 'spa':
      return 'the stylists & therapists';
    case 'hotel':
      return 'the concierge & front desk team';
    case 'automotive':
      return 'the technicians & service advisors';
    case 'retail':
      return 'the store associates';
    case 'pet':
      return 'the veterinary care team';
    case 'healthcare':
      return 'the doctors & medical staff';
    default:
      return 'the staff & team';
  }
}

/**
 * High-entropy pseudo-random generator supporting numeric or string seeds
 */
function getSeedRandom(seed) {
  if (seed === null || seed === undefined) return Math.random();
  let t = typeof seed === 'number' 
    ? (seed >>> 0) 
    : String(seed).split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

/**
 * Shuffles an array dynamically for each scan session
 */
function shuffleArray(array, seed = null) {
  const arr = [...array];
  let currentSeed = seed !== null 
    ? (typeof seed === 'number' ? seed : String(seed).split('').reduce((a, c) => a + c.charCodeAt(0), 0))
    : Math.floor(Math.random() * 1000000);
  
  for (let i = arr.length - 1; i > 0; i--) {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    const r = Math.abs(currentSeed) / 4294967296;
    const j = Math.floor(r * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates natural, authentic review text based on customer selections
 */
export function generateReviewDraft({
  business,
  rating = 5,
  highlights = [],
  staffShoutout = "",
  freeText = "",
  tone = "enthusiastic",
  scanSeed = null
}) {
  const bizName = business?.name || "this establishment";
  const numRating = Number(rating) || 5;
  const staff = staffShoutout && !staffShoutout.includes("Skip") && !staffShoutout.includes("Prefer")
    ? staffShoutout
    : getStaffLabelForBusiness(business);
  
  const cleanHighlights = highlights.map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || '')).filter(Boolean);
  const itemsText = cleanHighlights.length > 0 
    ? cleanHighlights.slice(0, 3).join(", ") 
    : "the exceptional service";

  const randIndex = Math.floor((scanSeed ? getSeedRandom(scanSeed) : Math.random()) * 5);

  if (numRating === 5) {
    const drafts = [
      `Had an absolutely phenomenal 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : ''}Special shoutout to ${staff} for such attentive and caring service! Everything was top-notch. Easily 5/5 stars! 🌟`,
      `Outstanding visit to ${bizName} today. From start to finish, ${itemsText ? `I was impressed by ${itemsText}. ` : 'the service was immaculate.'} Friendly team, spotless environment, and zero stress. 10/10 recommendation! ⭐⭐⭐⭐⭐`,
      `Cannot say enough good things about ${bizName}! ${itemsText ? `Highlight was definitely ${itemsText}. ` : ''}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} made everything smooth and welcoming. ` : ''}Will definitely be returning and recommending to everyone! ✨`,
      `Five stars all the way for ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : ''}Super easy, welcoming atmosphere and stellar customer care. Thank you for such a great visit! 🙌`,
      `First-class experience at ${bizName}! ${itemsText ? `The attention to detail in ${itemsText} made all the difference. ` : ''}Prompt, courteous, and very professional. Deserves every bit of 5 stars! ⭐`
    ];
    return drafts[randIndex % drafts.length];
  } else if (numRating === 4) {
    const drafts = [
      `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : ''}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were friendly and helpful throughout. ` : ''}A solid 4-star visit and will be returning! 👍`,
      `Great visit overall at ${bizName}. ${itemsText ? `Loved ${itemsText}, ` : ''}and the team was courteous throughout. Smooth and pleasant experience.`,
      `Really positive visit to ${bizName}. ${itemsText ? `Particularly pleased with ${itemsText}. ` : ''}Professional staff and good atmosphere. Definitely recommend!`,
      `Solid 4 stars for ${bizName}! ${itemsText ? `Noticed great quality in ${itemsText}. ` : ''}Friendly service and good pacing. Happy with today's visit.`
    ];
    return drafts[randIndex % drafts.length];
  } else if (numRating === 3) {
    const drafts = [
      `Average visit to ${bizName}. Some parts were fine, but ${itemsText ? `${itemsText} could be improved for next time. ` : ''}Decent overall, hoping for a smoother experience on my next visit.`,
      `Fair experience at ${bizName}. The team was okay, though ${itemsText ? `${itemsText} felt a bit rushed. ` : ''}Has good potential with a few minor tweaks.`,
      `Moderate 3-star visit. Some aspects went well, but ${itemsText ? `${itemsText} needed slightly more attention. ` : ''}Hoping for a better turnaround next time.`
    ];
    return drafts[randIndex % drafts.length];
  } else if (numRating === 2) {
    const drafts = [
      `Disappointing visit at ${bizName}. We experienced issues with ${itemsText ? `${itemsText}. ` : 'the service.'} Management should look into this to improve customer satisfaction.`,
      `Below expectations at ${bizName}. Not happy with ${itemsText ? `${itemsText}. ` : 'the turnaround.'} Needs notable improvement.`
    ];
    return drafts[randIndex % drafts.length];
  } else {
    const drafts = [
      `Very poor experience at ${bizName}. Extremely disappointed with ${itemsText ? `${itemsText}. ` : 'the overall service.'} Did not meet basic expectations. 1 star.`,
      `Unacceptable service at ${bizName}. Had major issues with ${itemsText ? `${itemsText}. ` : 'the interaction.'} Will not be returning.`
    ];
    return drafts[randIndex % drafts.length];
  }
}

/**
 * Returns tailored review options for ANY star rating (1, 2, 3, 4, 5)
 * Dynamically selects & shuffles from an extensive pool for every scan session!
 */
export function getThreeOptionsForRating(business, rating = 5, scanSeed = null) {
  const numRating = Number(rating) || 5;
  const category = inferCategoryFromBusiness(business);
  const bizName = business?.name || 'this business';
  const seedNum = typeof scanSeed === 'number' 
    ? scanSeed 
    : scanSeed 
      ? String(scanSeed).split('').reduce((a, c) => a + c.charCodeAt(0), 0) 
      : Date.now();

  // Helper to pick 3 dynamic options from a larger pool
  const pickThree = (title, subtitle, pool) => {
    const shuffled = shuffleArray(pool, seedNum);
    return {
      title,
      subtitle,
      options: shuffled.slice(0, 3)
    };
  };

  // If business has custom question flow highlights and rating is positive (4 or 5)
  const customHighlights = business?.questionFlow?.questions?.positive_highlights?.options;
  if (numRating >= 4 && Array.isArray(customHighlights) && customHighlights.length >= 3) {
    const categoryEmojiMap = {
      gym: '🏋️',
      cafe: '☕',
      restaurant: '🍽️',
      salon: '💇',
      hotel: '🏨',
      automotive: '🚗',
      retail: '🛍️',
      pet: '🐾',
      healthcare: '🦷',
      general: '✨'
    };
    const defaultEmoji = categoryEmojiMap[category] || '✨';

    const mappedPool = customHighlights.map((opt, idx) => {
      if (typeof opt === 'string') {
        return {
          id: `custom_opt_${idx}`,
          label: opt,
          emoji: defaultEmoji,
          desc: `Exceptional experience with ${opt.toLowerCase()}`
        };
      }
      return {
        id: opt.id || `custom_opt_${idx}`,
        label: opt.label || opt.name || String(opt),
        emoji: opt.emoji || defaultEmoji,
        desc: opt.desc || `Top quality ${opt.label || opt}`
      };
    });

    const title = numRating === 5 
      ? `What made your 5-Star visit to ${bizName} exceptional?`
      : `What did you like about your visit to ${bizName}?`;
    const subtitle = numRating === 5 
      ? "Select your top highlights from today's visit" 
      : "Select what went well today";

    return pickThree(title, subtitle, mappedPool);
  }

  // Gym & Fitness Category
  if (category === 'gym' || category === 'fitness') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your workout at ${bizName} exceptional?`,
          "Select your top highlights from today's session",
          [
            { id: "opt_gym_5_1", label: "State-of-the-Art Gym Equipment", emoji: "🏋️", desc: "Modern, clean, and top-tier workout machines" },
            { id: "opt_gym_5_2", label: "Motivating & Expert Personal Trainers", emoji: "🔥", desc: "Knowledgeable, encouraging coaches and form correction" },
            { id: "opt_gym_5_3", label: "Spotless Facility & Locker Rooms", emoji: "✨", desc: "Ultra-clean workout floor, showers, and saunas" },
            { id: "opt_gym_5_4", label: "High-Energy Workout Atmosphere", emoji: "⚡", desc: "Great playlist, inspiring vibe, and community" },
            { id: "opt_gym_5_5", label: "Dynamic Group Fitness Classes", emoji: "🥊", desc: "Intense, fun, and well-structured group workouts" },
            { id: "opt_gym_5_6", label: "Smooth Check-in & Welcoming Staff", emoji: "🤝", desc: "Friendly front desk and seamless entry" }
          ]
        );
      case 4:
        return pickThree(
          `What did you like about your visit to ${bizName}?`,
          "Select what went well today",
          [
            { id: "opt_gym_4_1", label: "Well Maintained Equipment", emoji: "💪", desc: "Good variety of weights and cardio machines" },
            { id: "opt_gym_4_2", label: "Helpful Floor Staff & Trainers", emoji: "👥", desc: "Supportive and polite gym team" },
            { id: "opt_gym_4_3", label: "Clean Workout Environment", emoji: "🧼", desc: "Sanitized weights and tidy floor" },
            { id: "opt_gym_4_4", label: "Great Overall Value", emoji: "⭐", desc: "Solid facilities for membership price" }
          ]
        );
      case 3:
        return pickThree(
          "What was your impression of today's workout?",
          "Select the main aspect of your session",
          [
            { id: "opt_gym_3_1", label: "Peak Hour Machine Waiting", emoji: "⏱️", desc: "Waited for popular squat racks or benches" },
            { id: "opt_gym_3_2", label: "Locker Room Rush & Cleanliness", emoji: "🚿", desc: "Locker room busy during peak hours" },
            { id: "opt_gym_3_3", label: "Music Volume & Sound System", emoji: "🔊", desc: "Sound volume or playlist balance" },
            { id: "opt_gym_3_4", label: "Class Booking Availability", emoji: "📅", desc: "Popular class slots fill up quickly" }
          ]
        );
      case 2:
        return pickThree(
          "What was the main issue during your workout?",
          "Select your primary concern",
          [
            { id: "opt_gym_2_1", label: "Broken or Out-of-Order Equipment", emoji: "⚠️", desc: "Machines waiting on repair" },
            { id: "opt_gym_2_2", label: "Severe Floor Overcrowding", emoji: "⏳", desc: "Too crowded to complete full routine" },
            { id: "opt_gym_2_3", label: "Locker Room Hygiene Issue", emoji: "🚫", desc: "Restroom or shower cleanliness concern" },
            { id: "opt_gym_2_4", label: "Unresponsive Front Desk Staff", emoji: "👤", desc: "Unhelpful member support" }
          ]
        );
      case 1:
      default:
        return pickThree(
          "What was the primary issue with your gym experience?",
          "Select your main concern",
          [
            { id: "opt_gym_1_1", label: "Membership / Billing Dispute", emoji: "❌", desc: "Unexpected charges or cancellation barrier" },
            { id: "opt_gym_1_2", label: "Unsanitary Workout Environment", emoji: "🛑", desc: "Poor facility hygiene standards" },
            { id: "opt_gym_1_3", label: "Unprofessional Staff Interaction", emoji: "⚠️", desc: "Rude or dismissive staff behavior" }
          ]
        );
    }
  }

  // Cafe & Bakery Category
  if (category === 'cafe') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your cafe visit to ${bizName} exceptional?`,
          "Select what delighted your taste and morning",
          [
            { id: "opt_cafe_5_1", label: "Specialty Coffee & Artisan Brews", emoji: "☕", desc: "Exceptional espresso, rich crema, and flavor" },
            { id: "opt_cafe_5_2", label: "Fresh & Flaky Artisan Pastries", emoji: "🥐", desc: "Warm, buttery, and freshly baked in-house" },
            { id: "opt_cafe_5_3", label: "Fast & Super Friendly Baristas", emoji: "✨", desc: "Warm greeting and expert coffee craftsmanship" },
            { id: "opt_cafe_5_4", label: "Cozy Aesthetic & Chill Ambience", emoji: "🕯️", desc: "Perfect music, seating, and work atmosphere" },
            { id: "opt_cafe_5_5", label: "Quick Service & Smooth Ordering", emoji: "⚡", desc: "Fast pickup with zero wait time" }
          ]
        );
      case 4:
        return pickThree(
          `What did you like about ${bizName}?`,
          "Select what went well today",
          [
            { id: "opt_cafe_4_1", label: "Great Tasting Coffee & Drinks", emoji: "☕", desc: "Quality brews and well-crafted drinks" },
            { id: "opt_cafe_4_2", label: "Courteous Barista Staff", emoji: "🤝", desc: "Polite and helpful order taking" },
            { id: "opt_cafe_4_3", label: "Comfortable Seating Space", emoji: "🛋️", desc: "Pleasant environment to sit and relax" }
          ]
        );
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What was your impression of today's visit?",
          "Select the main aspect of your experience",
          [
            { id: "opt_cafe_1_1", label: "Drink Wait Time & Queue", emoji: "⏱️", desc: "Order took longer than anticipated" },
            { id: "opt_cafe_1_2", label: "Beverage Temperature or Taste", emoji: "☕", desc: "Coffee flavor, heat, or milk texture" },
            { id: "opt_cafe_1_3", label: "Seating Availability & Space", emoji: "🪑", desc: "Seating rush or table cleanliness" }
          ]
        );
    }
  }

  // Restaurant & Dining Category
  if (category === 'restaurant') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your dining at ${bizName} exceptional?`,
          "Select what delighted your palate and evening",
          [
            { id: "opt_rest_5_1", label: "Delicious & Exquisite Flavors", emoji: "🍝", desc: "Mouthwatering dishes and high quality ingredients" },
            { id: "opt_rest_5_2", label: "Attentive & Friendly Table Service", emoji: "👨‍🍳", desc: "Warm hospitality and great recommendations" },
            { id: "opt_rest_5_3", label: "Cozy & Stylish Dining Ambience", emoji: "🕯️", desc: "Wonderful atmosphere, lighting, and vibe" },
            { id: "opt_rest_5_4", label: "Prompt Kitchen Turnaround", emoji: "⚡", desc: "Hot food served without unnecessary delay" },
            { id: "opt_rest_5_5", label: "Craft Cocktails & Beverage Pairings", emoji: "🍷", desc: "Refreshing drinks and great wine list" }
          ]
        );
      case 4:
        return pickThree(
          `What did you enjoy about ${bizName}?`,
          "Select what stood out during your visit",
          [
            { id: "opt_rest_4_1", label: "Delicious Food & Drinks", emoji: "🍽️", desc: "High quality flavors and generous portions" },
            { id: "opt_rest_4_2", label: "Pleasant Dining Atmosphere", emoji: "🥂", desc: "Comfortable seating and great vibe" },
            { id: "opt_rest_4_3", label: "Prompt & Courteous Service", emoji: "⚡", desc: "Friendly servers and timely orders" }
          ]
        );
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What was the main issue during your dining visit?",
          "Select your primary concern",
          [
            { id: "opt_rest_1_1", label: "Kitchen / Table Wait Time", emoji: "⏱️", desc: "Order took longer than anticipated" },
            { id: "opt_rest_1_2", label: "Food Temperature or Order Accuracy", emoji: "🥘", desc: "Dish preparation or temperature issue" },
            { id: "opt_rest_1_3", label: "Server Attention & Follow-up", emoji: "👥", desc: "Table check-in or billing turnaround" }
          ]
        );
    }
  }

  // Salon & Spa Category
  if (category === 'salon' || category === 'spa') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your visit to ${bizName} exceptional?`,
          "Select your top styling & care highlights",
          [
            { id: "opt_sal_5_1", label: "Flawless Haircut & Expert Styling", emoji: "💇‍♀️", desc: "Stunning transformation matching your vision" },
            { id: "opt_sal_5_2", label: "Vibrant Color & Seamless Balayage", emoji: "✨", desc: "Rich color and expert application" },
            { id: "opt_sal_5_3", label: "Spotless, Chic & Luxurious Vibe", emoji: "🌸", desc: "Relaxing ambiance and pampering treatment" },
            { id: "opt_sal_5_4", label: "Gentle Scalp Massage & Wash", emoji: "💆", desc: "Deeply relaxing wash basin experience" },
            { id: "opt_sal_5_5", label: "Personalized Product Advice", emoji: "🧴", desc: "Tailored haircare and maintenance tips" }
          ]
        );
      case 4:
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What did you notice about your salon appointment?",
          "Select your primary observation",
          [
            { id: "opt_sal_1_1", label: "Stylist Consultation & Attention", emoji: "💅", desc: "Discussion of look and desired finish" },
            { id: "opt_sal_1_2", label: "Appointment Timing & Pacing", emoji: "⏱️", desc: "Promptness and chair transition" },
            { id: "opt_sal_1_3", label: "Ambiance & Salon Cleanliness", emoji: "🪞", desc: "Studio vibe, music, and station hygiene" }
          ]
        );
    }
  }

  // Hotel & Resort Category
  if (category === 'hotel' || category === 'hospitality') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your stay at ${bizName} exceptional?`,
          "Select your top highlights from your stay",
          [
            { id: "opt_hot_5_1", label: "Immaculate Room & Luxury Bedding", emoji: "🛏️", desc: "Pristine, quiet, and ultra-comfortable suite" },
            { id: "opt_hot_5_2", label: "Exceptional Concierge & Front Desk", emoji: "🏨", desc: "Warm, attentive, and helpful service" },
            { id: "opt_hot_5_3", label: "Stunning Views & Pool / Spa Amenities", emoji: "🌴", desc: "Breathtaking views and resort-style relaxation" },
            { id: "opt_hot_5_4", label: "Delicious Breakfast & Room Dining", emoji: "🍳", desc: "Gourmet buffet and prompt room service" },
            { id: "opt_hot_5_5", label: "Seamless Express Check-in", emoji: "⚡", desc: "Zero wait time and instant room access" }
          ]
        );
      case 4:
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What was your impression of your stay?",
          "Select your primary takeaway",
          [
            { id: "opt_hot_1_1", label: "Room Comfort & Housekeeping", emoji: "✨", desc: "Cleanliness and room amenities" },
            { id: "opt_hot_1_2", label: "Front Desk & Check-in Speed", emoji: "⏳", desc: "Arrival and key delivery speed" },
            { id: "opt_hot_1_3", label: "Facility Amenities & Location", emoji: "📍", desc: "Property access and surrounding area" }
          ]
        );
    }
  }

  // Automotive Category
  if (category === 'automotive') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your service at ${bizName} exceptional?`,
          "Select what stood out during your visit",
          [
            { id: "opt_auto_5_1", label: "Fast Diagnostic & Expert Repair", emoji: "🔧", desc: "Precise troubleshooting and smooth driving result" },
            { id: "opt_auto_5_2", label: "Transparent & Honest Quote", emoji: "📋", desc: "Clear explanations with no surprise fees" },
            { id: "opt_auto_5_3", label: "Spotless Detailing & Wash Finish", emoji: "✨", desc: "Car returned clean and sparkling" },
            { id: "opt_auto_5_4", label: "On-Time Vehicle Delivery", emoji: "⚡", desc: "Completed exactly when promised" }
          ]
        );
      case 4:
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What did you notice about your vehicle service?",
          "Select your primary observation",
          [
            { id: "opt_auto_1_1", label: "Turnaround Time & Service Speed", emoji: "⏱️", desc: "Repair timeline and turnaround" },
            { id: "opt_auto_1_2", label: "Estimate Clarity & Pricing", emoji: "💵", desc: "Clear breakdown of labor and parts" },
            { id: "opt_auto_1_3", label: "Customer Communication Updates", emoji: "📱", desc: "Timely status updates on progress" }
          ]
        );
    }
  }

  // Retail & Boutique Category
  if (category === 'retail') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your shopping at ${bizName} exceptional?`,
          "Select your top shopping highlights",
          [
            { id: "opt_ret_5_1", label: "Curated & Trendy Fashion Selection", emoji: "👗", desc: "High quality, unique, and stylish pieces" },
            { id: "opt_ret_5_2", label: "Attentive & Helpful Styling Staff", emoji: "🛍️", desc: "Friendly recommendations without being pushy" },
            { id: "opt_ret_5_3", label: "Clean, Spacious Fitting Rooms", emoji: "✨", desc: "Comfortable mirrors and good lighting" },
            { id: "opt_ret_5_4", label: "Fast & Effortless Checkout", emoji: "⚡", desc: "Quick payment and lovely packaging" }
          ]
        );
      case 4:
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What was your impression of your shopping visit?",
          "Select your primary takeaway",
          [
            { id: "opt_ret_1_1", label: "Product Sizing & Stock Availability", emoji: "🏷️", desc: "Availability of sizes or desired items" },
            { id: "opt_ret_1_2", label: "Staff Assistance & Helpfulness", emoji: "🤝", desc: "Assistance on the sales floor" },
            { id: "opt_ret_1_3", label: "Pricing & Promotion Clarity", emoji: "💳", desc: "Discount and tag pricing clarity" }
          ]
        );
    }
  }

  // Pet Care Category
  if (category === 'pet') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your pet's visit to ${bizName} exceptional?`,
          "Select what made your pet comfortable",
          [
            { id: "opt_pet_5_1", label: "Gentle & Compassionate Veterinarians", emoji: "🩺", desc: "Super kind and reassuring care with my pet" },
            { id: "opt_pet_5_2", label: "Stress-Free & Calming Handling", emoji: "🐾", desc: "Pet felt safe and relaxed the entire time" },
            { id: "opt_pet_5_3", label: "Spotless & Odor-Free Clinic", emoji: "✨", desc: "Pristine exam rooms and waiting area" },
            { id: "opt_pet_5_4", label: "Clear Treatment & Medication Advice", emoji: "📋", desc: "Thorough explanation of wellness plan" }
          ]
        );
      case 4:
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What was your impression of the veterinary visit?",
          "Select your primary takeaway",
          [
            { id: "opt_pet_1_1", label: "Appointment Wait Time", emoji: "⏱️", desc: "Time spent in waiting area" },
            { id: "opt_pet_1_2", label: "Treatment Cost Transparency", emoji: "💵", desc: "Clarity on medication and exam fees" },
            { id: "opt_pet_1_3", label: "Gentle Handling & Care", emoji: "🐕", desc: "Comfort level for the pet during exam" }
          ]
        );
    }
  }

  // Healthcare & Dental Category
  if (category === 'healthcare') {
    switch (numRating) {
      case 5:
        return pickThree(
          `What made your care at ${bizName} exceptional?`,
          "Select your top highlights from today's visit",
          [
            { id: "opt_hc_5_1", label: "Painless & Gentle Procedure", emoji: "🦷", desc: "Completely comfortable and painless treatment" },
            { id: "opt_hc_5_2", label: "Clear Guidance & Caring Doctors", emoji: "✨", desc: "Clear explanations and reassuring patient care" },
            { id: "opt_hc_5_3", label: "Spotless & Modern Sterile Clinic", emoji: "🏥", desc: "State-of-the-art equipment and ultra-clean operatory" },
            { id: "opt_hc_5_4", label: "Warm, Welcoming Front Desk", emoji: "🤝", desc: "Prompt check-in and friendly greeting" },
            { id: "opt_hc_5_5", label: "Quick & Zero Wait Appointment", emoji: "⚡", desc: "Taken back right on time without delays" },
            { id: "opt_hc_5_6", label: "Transparent & Honest Treatment Plan", emoji: "📋", desc: "Detailed discussion with fair pricing" }
          ]
        );
      case 4:
        return pickThree(
          `What did you like about your visit to ${bizName}?`,
          "Select what went well today",
          [
            { id: "opt_hc_4_1", label: "Friendly & Attentive Staff", emoji: "👨‍⚕️", desc: "Courteous, helpful, and welcoming team" },
            { id: "opt_hc_4_2", label: "Thorough Cleaning & Examination", emoji: "🪥", desc: "Detailed inspection and gentle dental cleaning" },
            { id: "opt_hc_4_3", label: "Comfortable Clinic Environment", emoji: "🛋️", desc: "Pleasant ambiance and relaxed atmosphere" },
            { id: "opt_hc_4_4", label: "Clear Aftercare Instructions", emoji: "💡", desc: "Helpful guidance on home care" }
          ]
        );
      case 3:
      case 2:
      case 1:
      default:
        return pickThree(
          "What was the main aspect of your appointment?",
          "Select your primary takeaway",
          [
            { id: "opt_hc_1_1", label: "Appointment Wait Time", emoji: "⏱️", desc: "Waited longer than expected before treatment" },
            { id: "opt_hc_1_2", label: "Treatment Cost & Pricing Clarity", emoji: "💬", desc: "Needed more clarity on fees or treatment plan" },
            { id: "opt_hc_1_3", label: "Communication During Procedure", emoji: "🗣️", desc: "Would prefer more step-by-step updates" }
          ]
        );
    }
  }

  // Default / General Category
  switch (numRating) {
    case 5:
      return pickThree(
        `What made your experience at ${bizName} exceptional?`,
        "Select the highlights from your visit",
        [
          { id: "opt_gen_5_1", label: "Outstanding Service Quality", emoji: "⭐", desc: "Top-notch experience from start to finish" },
          { id: "opt_gen_5_2", label: "Friendly & Attentive Team", emoji: "🤝", desc: "Welcoming, courteous, and helpful staff" },
          { id: "opt_gen_5_3", label: "Clean & Inviting Space", emoji: "✨", desc: "Well organized, spotless, and comfortable" },
          { id: "opt_gen_5_4", label: "Fast & Seamless Turnaround", emoji: "⚡", desc: "Prompt service with zero hassle" }
        ]
      );
    case 4:
      return pickThree(
        `What did you like about your visit to ${bizName}?`,
        "Select what went well today",
        [
          { id: "opt_gen_4_1", label: "Good Overall Experience", emoji: "👍", desc: "Smooth and positive visit" },
          { id: "opt_gen_4_2", label: "Helpful Customer Support", emoji: "💬", desc: "Supportive staff and clear help" },
          { id: "opt_gen_4_3", label: "Clean & Well Maintained", emoji: "✨", desc: "Pleasant environment and facility" }
        ]
      );
    case 3:
    case 2:
    case 1:
    default:
      return pickThree(
        "What was your impression of today's visit?",
        "Select what stood out",
        [
          { id: "opt_gen_1_1", label: "Service Speed & Wait Time", emoji: "⏱️", desc: "Faster turnaround and less waiting" },
          { id: "opt_gen_1_2", label: "Pricing & Value Clarity", emoji: "💲", desc: "Clearer pricing or better value" },
          { id: "opt_gen_1_3", label: "Customer Service Interaction", emoji: "👥", desc: "Staff communication and support" }
        ]
      );
  }
}

/**
 * Synthesizes root-cause summary for internal manager resolution
 */
export function summarizeComplaint({ categories = [], drilldown = "", notes = "" }) {
  const parts = [];
  if (categories.length > 0) parts.push(`Primary Issue: ${categories.join(", ")}`);
  if (drilldown) parts.push(`Specific Area: ${drilldown}`);
  if (notes) parts.push(`Customer Statement: "${notes.trim()}"`);
  return parts.join(" | ");
}

