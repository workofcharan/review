// Smart AI Review Synthesis & Dynamic Feedback Intelligence Engine

/**
 * Deterministic pseudo-random helper or random helper using a seed
 */
function getSeedRandom(seed) {
  if (!seed) return Math.random();
  const num = typeof seed === 'number' ? seed : String(seed).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const x = Math.sin(num) * 10000;
  return x - Math.floor(x);
}

/**
 * Shuffles an array with an optional seed or pure random
 */
function shuffleArray(array, seed = null) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const r = seed !== null ? getSeedRandom(seed + i * 17) : Math.random();
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
  
  const cleanHighlights = highlights.map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || '')).filter(Boolean);
  const itemsText = cleanHighlights.length > 0 
    ? cleanHighlights.slice(0, 3).join(", ") 
    : "the service and experience";
  
  const hasStaff = staffShoutout && !staffShoutout.includes("Skip") && !staffShoutout.includes("Prefer");

  const randIndex = Math.floor((scanSeed ? getSeedRandom(scanSeed) : Math.random()) * 5);

  if (numRating === 5) {
    const drafts = [
      `Had an absolutely phenomenal 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : ''}${hasStaff ? `Special thanks to ${staffShoutout} for such attentive and caring service! ` : ''}Everything was top-notch and seamless. Easily 5/5 stars! 🌟`,
      `Outstanding visit to ${bizName} today. From start to finish, ${itemsText ? `I was impressed by ${itemsText}. ` : 'the service was immaculate.'} Friendly staff, spotless environment, and zero stress. 10/10 recommendation! ⭐⭐⭐⭐⭐`,
      `Cannot say enough good things about ${bizName}! ${itemsText ? `Highlight was definitely ${itemsText}. ` : ''}The team is so warm, professional, and thorough. Will definitely be returning and recommending to all my friends! ✨`,
      `Five stars all the way for ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : ''}Super easy, welcoming atmosphere and stellar customer care. Thank you for such a great visit! 🙌`,
      `First-class care and experience at ${bizName}! ${itemsText ? `The attention to detail in ${itemsText} made all the difference. ` : ''}Prompt, courteous, and very reassuring. Deserves every bit of 5 stars! ⭐`
    ];
    return drafts[randIndex % drafts.length];
  } else if (numRating === 4) {
    const drafts = [
      `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : ''}${hasStaff ? `Staff like ${staffShoutout} were friendly and helpful. ` : ''}A solid 4-star visit and will be returning! 👍`,
      `Great visit overall at ${bizName}. ${itemsText ? `Loved ${itemsText}, ` : ''}and the staff was courteous throughout. Smooth and pleasant experience.`,
      `Really positive visit to ${bizName}. ${itemsText ? `Particularly pleased with ${itemsText}. ` : ''}Professional team and good atmosphere. Definitely recommend!`,
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
      `Disappointing visit at ${bizName}. We experienced issues with ${itemsText ? `${itemsText}. ` : 'the service.'}Management should look into this to improve customer satisfaction.`,
      `Below expectations at ${bizName}. Not happy with ${itemsText ? `${itemsText}. ` : 'the turnaround.'}Needs notable improvement.`
    ];
    return drafts[randIndex % drafts.length];
  } else {
    const drafts = [
      `Very poor experience at ${bizName}. Extremely disappointed with ${itemsText ? `${itemsText}. ` : 'the overall service.'}Did not meet basic expectations. 1 star.`,
      `Unacceptable service at ${bizName}. Had major issues with ${itemsText ? `${itemsText}. ` : 'the staff interaction.'}Will not be returning.`
    ];
    return drafts[randIndex % drafts.length];
  }
}

/**
 * Returns 3 distinct AI-crafted review options that dynamically change for every scan
 */
export function generateReviewOptions({
  business,
  rating = 5,
  highlights = [],
  staffShoutout = "Dr. C",
  freeText = "",
  scanSeed = null
}) {
  const bizName = business?.name || "Dr C Dental Clinic";
  const numRating = Number(rating) || 5;
  const cleanHighlights = highlights.map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || '')).filter(Boolean);
  const itemsText = cleanHighlights.length > 0 ? cleanHighlights.slice(0, 3).join(", ") : "the service and team";

  // Base seed number
  const seedNum = typeof scanSeed === 'number' 
    ? scanSeed 
    : scanSeed 
      ? String(scanSeed).split('').reduce((a, c) => a + c.charCodeAt(0), 0) 
      : Date.now();

  // 5 STARS (Excellent 🤩) — Rich dynamic catalog rotating across varied templates
  if (numRating === 5) {
    const pool = [
      {
        id: "opt_detailed_a",
        title: "Option 1: Detailed & Enthusiastic",
        badge: "Most Popular",
        text: `Had an exceptional 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : ''}The entire visit was comfortable, prompt, and spotless. Cannot recommend ${bizName} enough! 🌟`
      },
      {
        id: "opt_detailed_b",
        title: "Option 1: Comprehensive & Glowing",
        badge: "Top Rated",
        text: `Hands down the best visit I've had at ${bizName}. ${itemsText ? `Really impressed by ${itemsText}. ` : ''}Super professional, clean environment, and caring team throughout. 5/5 stars! ⭐⭐⭐⭐⭐`
      },
      {
        id: "opt_concise_a",
        title: "Option 2: Short & Direct",
        badge: "Quick",
        text: `Outstanding experience at ${bizName}. ${itemsText ? `Loved ${itemsText}. ` : ''}10/10 quality and service — will definitely be returning! ⭐⭐⭐⭐⭐`
      },
      {
        id: "opt_concise_b",
        title: "Option 2: Punchy & Direct",
        badge: "Fast & Sweet",
        text: `Top-notch experience from start to finish at ${bizName}! ${itemsText ? `Special mention for ${itemsText}. ` : ''}Seamless visit and wonderful staff! 🙌`
      },
      {
        id: "opt_warm_a",
        title: "Option 3: Warm & Personal",
        badge: "Personal",
        text: `So grateful for the fantastic care at ${bizName}! The team made everything easy and reassuring, especially ${itemsText}. Truly a wonderful visit!`
      },
      {
        id: "opt_warm_b",
        title: "Option 3: Friendly Recommendation",
        badge: "Genuine",
        text: `Such a welcoming and pleasant atmosphere at ${bizName}. ${itemsText ? `Appreciated ${itemsText} so much. ` : ''}Already recommending to my friends and family! ✨`
      },
      {
        id: "opt_pro_a",
        title: "Option 3: Professional Excellence",
        badge: "Verified Guest",
        text: `Incredibly thorough and gentle care at ${bizName}. ${itemsText ? `Highlights include ${itemsText}. ` : ''}Always a pleasure coming here!`
      }
    ];

    // Pick 3 diverse options dynamically based on scan seed
    const shuffled = shuffleArray(pool, seedNum);
    return [
      { ...shuffled[0], title: `Option 1: ${shuffled[0].badge}` },
      { ...shuffled[1], title: `Option 2: ${shuffled[1].badge}` },
      { ...shuffled[2], title: `Option 3: ${shuffled[2].badge}` }
    ];
  }

  // 4 STARS (Good 😊)
  if (numRating === 4) {
    const pool = [
      {
        id: "opt_4_a",
        title: "Option 1: Detailed & Positive",
        badge: "Recommended",
        text: `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : ''}Great professionalism and overall pleasant visit. Definitely recommend! 👍`
      },
      {
        id: "opt_4_b",
        title: "Option 1: Thorough & Positive",
        badge: "Solid Choice",
        text: `Really pleased with our visit to ${bizName}. ${itemsText ? `The team did great with ${itemsText}. ` : ''}Smooth, prompt, and friendly care.`
      },
      {
        id: "opt_4_c",
        title: "Option 2: Short & Sweet",
        badge: "Quick",
        text: `Great service and friendly team at ${bizName}. ${itemsText ? `Very satisfied with ${itemsText}. ` : ''}Solid 4 stars!`
      },
      {
        id: "opt_4_d",
        title: "Option 3: Positive & Balanced",
        badge: "Balanced",
        text: `Had a very positive visit to ${bizName}. ${itemsText ? `Highlight was ${itemsText}. ` : ''}Thanks for taking good care of us today!`
      }
    ];

    const shuffled = shuffleArray(pool, seedNum);
    return [
      { ...shuffled[0], title: `Option 1: ${shuffled[0].badge}` },
      { ...shuffled[1], title: `Option 2: ${shuffled[1].badge}` },
      { ...shuffled[2], title: `Option 3: ${shuffled[2].badge}` }
    ];
  }

  // 3 STARS (Average 😐)
  if (numRating === 3) {
    const pool = [
      {
        id: "opt_3_a",
        title: "Option 1: Balanced & Constructive",
        badge: "Constructive",
        text: `Decent visit to ${bizName}. The overall service was okay, but ${itemsText ? `${itemsText} could use some attention. ` : ''}A fair 3-star experience.`
      },
      {
        id: "opt_3_b",
        title: "Option 2: Short & Honest",
        badge: "Honest",
        text: `Average experience at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : ''}Good potential, but room for improvement.`
      },
      {
        id: "opt_3_c",
        title: "Option 3: Fair & Balanced",
        badge: "Balanced",
        text: `Fair visit to ${bizName}. Some parts went well, though ${itemsText ? `${itemsText} was a bit mixed. ` : ''}Hoping for a smoother visit next time.`
      }
    ];

    const shuffled = shuffleArray(pool, seedNum);
    return shuffled.slice(0, 3);
  }

  // 2 STARS (Fair / Needs Work 🙁)
  if (numRating === 2) {
    const pool = [
      {
        id: "opt_2_a",
        title: "Option 1: Detailed Feedback",
        badge: "Detailed",
        text: `Had a disappointing visit to ${bizName}. We ran into issues with ${itemsText ? `${itemsText}, ` : ''}and the experience did not meet expectations. Needs improvement.`
      },
      {
        id: "opt_2_b",
        title: "Option 2: Direct & Frank",
        badge: "Direct",
        text: `Below average experience at ${bizName}. Frustrated with ${itemsText ? `${itemsText}. ` : 'the service.'}Hope management takes steps to fix this.`
      },
      {
        id: "opt_2_c",
        title: "Option 3: Concise Issue Report",
        badge: "Concise",
        text: `Not satisfied with my visit to ${bizName}. The main drawback was ${itemsText ? `${itemsText}. ` : 'the overall care.'}2 stars.`
      }
    ];

    const shuffled = shuffleArray(pool, seedNum);
    return shuffled.slice(0, 3);
  }

  // 1 STAR (Poor 😣)
  const pool = [
    {
      id: "opt_1_a",
      title: "Option 1: Critical & Detailed",
      badge: "Detailed",
      text: `Very poor experience at ${bizName}. Had major problems with ${itemsText ? `${itemsText}, ` : ''}and the customer service was disappointing. Very unsatisfied.`
    },
    {
      id: "opt_1_b",
      title: "Option 2: Direct & Unhappy",
      badge: "Direct",
      text: `Terrible experience at ${bizName}. ${itemsText ? `${itemsText} was completely unacceptable. ` : ''}Definitely not returning.`
    },
    {
      id: "opt_1_c",
      title: "Option 3: Concise Warning",
      badge: "Warning",
      text: `Extremely disappointed with ${bizName}. Unhappy with ${itemsText ? `${itemsText}. ` : 'the service.'}1 star.`
    }
  ];

  const shuffled = shuffleArray(pool, seedNum);
  return shuffled.slice(0, 3);
}

/**
 * Returns tailored review options for ANY star rating (1, 2, 3, 4, 5)
 * Dynamically selects & shuffles from an extensive pool for every scan session!
 */
export function getThreeOptionsForRating(business, rating = 5, scanSeed = null) {
  const numRating = Number(rating) || 5;
  const category = business?.category || 'healthcare';
  const bizName = business?.name || 'Dr C Dental Clinic';
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

  // Healthcare & Dental Category
  if (category === 'healthcare' || bizName.toLowerCase().includes('dental') || bizName.toLowerCase().includes('clinic') || bizName.toLowerCase().includes('dr')) {
    switch (numRating) {
      case 5:
        return pickThree(
          "What made your 5-Star visit exceptional?",
          "Select your top highlights from today's visit",
          [
            { id: "opt_5_1", label: "Painless & Gentle Procedure", emoji: "🦷", desc: "Completely comfortable and painless treatment" },
            { id: "opt_5_2", label: "Dr. C's Reassuring Guidance", emoji: "✨", desc: "Clear explanations and kind patient care" },
            { id: "opt_5_3", label: "Spotless & Modern Sterile Clinic", emoji: "🏥", desc: "State-of-the-art equipment and ultra-clean operatory" },
            { id: "opt_5_4", label: "Warm, Welcoming Front Desk", emoji: "🤝", desc: "Prompt check-in and friendly greeting" },
            { id: "opt_5_5", label: "Quick & Zero Wait Appointment", emoji: "⚡", desc: "Taken back right on time without delays" },
            { id: "opt_5_6", label: "Transparent & Honest Treatment Plan", emoji: "📋", desc: "Detailed discussion with fair pricing" }
          ]
        );
      case 4:
        return pickThree(
          "What did you like about your visit?",
          "Select what went well today",
          [
            { id: "opt_4_1", label: "Friendly & Attentive Staff", emoji: "👨‍⚕️", desc: "Courteous, helpful, and welcoming team" },
            { id: "opt_4_2", label: "Thorough Cleaning & Examination", emoji: "🪥", desc: "Detailed inspection and gentle dental cleaning" },
            { id: "opt_4_3", label: "Comfortable Clinic Environment", emoji: "🛋️", desc: "Pleasant ambiance and relaxed atmosphere" },
            { id: "opt_4_4", label: "Clear Aftercare Instructions", emoji: "💡", desc: "Helpful guidance on home dental care" },
            { id: "opt_4_5", label: "Easy Scheduling & Reminders", emoji: "📅", desc: "Convenient booking and timely alerts" }
          ]
        );
      case 3:
        return pickThree(
          "What was your impression of today's visit?",
          "Select the main aspect of your appointment",
          [
            { id: "opt_3_1", label: "Appointment Wait Time", emoji: "⏱️", desc: "Waited longer than expected before treatment" },
            { id: "opt_3_2", label: "Treatment Cost & Pricing Clarity", emoji: "💬", desc: "Needed more clarity on fees or treatment plan" },
            { id: "opt_3_3", label: "Routine Scaling & Standard Care", emoji: "📋", desc: "Standard dental checkup and routine procedure" },
            { id: "opt_3_4", label: "Communication During Procedure", emoji: "🗣️", desc: "Would prefer more step-by-step updates" }
          ]
        );
      case 2:
        return pickThree(
          "What was the main issue during your visit?",
          "Select your primary concern",
          [
            { id: "opt_2_1", label: "Discomfort During Treatment", emoji: "⚠️", desc: "Treatment felt uncomfortable or sensitive" },
            { id: "opt_2_2", label: "Extended Waiting Room Delay", emoji: "⏳", desc: "Significant delay past scheduled appointment" },
            { id: "opt_2_3", label: "Rushed Consultation & Communication", emoji: "👤", desc: "Felt rushed or needed more explanation" },
            { id: "opt_2_4", label: "Follow-up Scheduling Confusion", emoji: "📆", desc: "Unclear next steps or appointment difficulty" }
          ]
        );
      case 1:
      default:
        return pickThree(
          "What was the primary issue with your visit?",
          "Select your main concern",
          [
            { id: "opt_1_1", label: "Unsatisfactory Treatment Outcome", emoji: "❌", desc: "Procedure or treatment did not meet expectations" },
            { id: "opt_1_2", label: "Unexpected Billing or Fee Issue", emoji: "💳", desc: "Billing discrepancy or unclear charges" },
            { id: "opt_1_3", label: "Unprofessional Customer Care", emoji: "🛑", desc: "Unpleasant customer service interaction" }
          ]
        );
    }
  }

  // Salon & Spa Category
  if (category === 'salon' || category === 'spa' || bizName.toLowerCase().includes('salon') || bizName.toLowerCase().includes('spa') || bizName.toLowerCase().includes('glow')) {
    switch (numRating) {
      case 5:
        return pickThree(
          "What made your salon & spa visit exceptional?",
          "Select your top highlights from today's styling",
          [
            { id: "opt_5_1", label: "Flawless Haircut & Expert Styling", emoji: "💇‍♀️", desc: "Stunning transformation matching your vision" },
            { id: "opt_5_2", label: "Vibrant Color & Seamless Balayage", emoji: "✨", desc: "Rich color and expert application" },
            { id: "opt_5_3", label: "Spotless, Chic & Luxurious Vibe", emoji: "🌸", desc: "Relaxing ambiance and pampering treatment" },
            { id: "opt_5_4", label: "Gentle Scalp Massage & Wash", emoji: "💆", desc: "Deeply relaxing wash basin experience" },
            { id: "opt_5_5", label: "Personalized Product Advice", emoji: "🧴", desc: "Tailored haircare and maintenance tips" }
          ]
        );
      case 4:
        return pickThree(
          "What did you like about your session today?",
          "Select what went well today",
          [
            { id: "opt_4_1", label: "Friendly & Attentive Stylist", emoji: "💅", desc: "Welcoming and professional consultation" },
            { id: "opt_4_2", label: "Relaxing Scalp & Hair Treatment", emoji: "💆‍♀️", desc: "Comfortable wash basin and scalp massage" },
            { id: "opt_4_3", label: "Clean & Modern Salon Studio", emoji: "🪞", desc: "Pleasant environment and good music" }
          ]
        );
      case 3:
        return pickThree(
          "What was your impression of today's appointment?",
          "Select the main aspect of your service",
          [
            { id: "opt_3_1", label: "Appointment Timing & Pacing", emoji: "⏱️", desc: "Waited a bit between washing and styling" },
            { id: "opt_3_2", label: "Styling & Finish Consultation", emoji: "💬", desc: "Standard haircut, needed slightly more tailoring" },
            { id: "opt_3_3", label: "Product & Treatment Pricing", emoji: "🏷️", desc: "Package or service pricing clarity" }
          ]
        );
      case 2:
        return pickThree(
          "What was the main issue with your salon visit?",
          "Select your primary concern",
          [
            { id: "opt_2_1", label: "Cut or Color Not Matching Request", emoji: "⚠️", desc: "Haircut length or shade didn't match discussion" },
            { id: "opt_2_2", label: "Significant Appointment Delay", emoji: "⏳", desc: "Long wait past scheduled booking time" },
            { id: "opt_2_3", label: "Inattentive Stylist Care", emoji: "👤", desc: "Felt rushed through the treatment" }
          ]
        );
      case 1:
      default:
        return pickThree(
          "What was the primary issue with your appointment?",
          "Select your main concern",
          [
            { id: "opt_1_1", label: "Unsatisfactory Hair / Skin Result", emoji: "❌", desc: "Haircut, color, or spa treatment went wrong" },
            { id: "opt_1_2", label: "Unexpected Extra Billing Charges", emoji: "💳", desc: "Charges differed from initial quote" },
            { id: "opt_1_3", label: "Rude or Unprofessional Behavior", emoji: "🛑", desc: "Disrespectful staff interaction" }
          ]
        );
    }
  }

  // Restaurant / Dining / Café Category
  if (category === 'restaurant' || category === 'cafe' || bizName.toLowerCase().includes('cafe') || bizName.toLowerCase().includes('bistro') || bizName.toLowerCase().includes('restaurant')) {
    switch (numRating) {
      case 5:
        return pickThree(
          "What made your visit exceptional?",
          "Select what delighted your palate and evening",
          [
            { id: "opt_5_1", label: "Specialty Coffee & Artisan Pastries", emoji: "☕", desc: "Exceptional brews, fresh flavors, and taste" },
            { id: "opt_5_2", label: "Warm & Attentive Hospitality", emoji: "👨‍🍳", desc: "Outstanding table service and friendly care" },
            { id: "opt_5_3", label: "Aesthetic & Cozy Ambiance", emoji: "🕯️", desc: "Perfect atmosphere, music, and relaxed vibe" },
            { id: "opt_5_4", label: "Signature Gourmet Dishes", emoji: "🍝", desc: "Mouthwatering flavors and fresh ingredients" },
            { id: "opt_5_5", label: "Fast & Flawless Kitchen Service", emoji: "⚡", desc: "Prompt hot food served without delay" }
          ]
        );
      case 4:
        return pickThree(
          "What did you enjoy most today?",
          "Select what stood out during your visit",
          [
            { id: "opt_4_1", label: "Delicious Food & Drinks", emoji: "🍽️", desc: "High quality flavors and great taste" },
            { id: "opt_4_2", label: "Pleasant Dining Atmosphere", emoji: "🥂", desc: "Comfortable seating and great vibe" },
            { id: "opt_4_3", label: "Prompt & Courteous Service", emoji: "⚡", desc: "Friendly servers and timely orders" }
          ]
        );
      case 3:
        return pickThree(
          "What was your impression of today's visit?",
          "Select the main aspect of your experience",
          [
            { id: "opt_3_1", label: "Kitchen / Drink Wait Time", emoji: "⏱️", desc: "Order took a bit longer than anticipated" },
            { id: "opt_3_2", label: "Menu Pricing & Portion Size", emoji: "💵", desc: "Portion size or pricing balance" },
            { id: "opt_3_3", label: "Seating Comfort & Table Noise", emoji: "🔊", desc: "Seating location or acoustic level" }
          ]
        );
      case 2:
        return pickThree(
          "What was the main issue with your order?",
          "Select your primary concern",
          [
            { id: "opt_2_1", label: "Food Temperature or Quality Issue", emoji: "🥘", desc: "Dish was cold or not prepared properly" },
            { id: "opt_2_2", label: "Slow or Inattentive Service", emoji: "⏳", desc: "Long gaps between server visits" },
            { id: "opt_2_3", label: "Order Mistake or Billing Error", emoji: "🧾", desc: "Incorrect items or bill discrepancy" }
          ]
        );
      case 1:
      default:
        return pickThree(
          "What was the primary issue with your visit?",
          "Select your main concern",
          [
            { id: "opt_1_1", label: "Disappointing Quality / Taste", emoji: "❌", desc: "Order was unsatisfactory or inedible" },
            { id: "opt_1_2", label: "Unacceptable Customer Service", emoji: "🚫", desc: "Unhelpful or rude staff interaction" },
            { id: "opt_1_3", label: "Billing or Order Dispute", emoji: "⚠️", desc: "Major payment or order issue" }
          ]
        );
    }
  }

  // Default Fallback Category
  switch (numRating) {
    case 5:
      return pickThree(
        "What made your 5-Star experience great?",
        "Select the highlights from your experience",
        [
          { id: "opt_5_1", label: "Outstanding Service Quality", emoji: "⭐", desc: "Top-notch experience from start to finish" },
          { id: "opt_5_2", label: "Friendly & Attentive Team", emoji: "🤝", desc: "Welcoming and helpful staff" },
          { id: "opt_5_3", label: "Clean & Inviting Space", emoji: "🏢", desc: "Well organized, spotless, and comfortable" },
          { id: "opt_5_4", label: "Fast & Seamless Turnaround", emoji: "⚡", desc: "Prompt service with zero hassle" }
        ]
      );
    case 4:
      return pickThree(
        "What did you like about your visit?",
        "Select what went well today",
        [
          { id: "opt_4_1", label: "Good Overall Experience", emoji: "👍", desc: "Smooth and positive visit" },
          { id: "opt_4_2", label: "Helpful Customer Support", emoji: "💬", desc: "Supportive staff and clear help" },
          { id: "opt_4_3", label: "Clean & Well Maintained", emoji: "✨", desc: "Pleasant environment and facility" }
        ]
      );
    case 3:
      return pickThree(
        "What was your impression of today's visit?",
        "Select what stood out",
        [
          { id: "opt_3_1", label: "Service Speed & Wait Time", emoji: "⏱️", desc: "Faster turnaround and less waiting" },
          { id: "opt_3_2", label: "Pricing & Value Clarity", emoji: "💲", desc: "Clearer pricing or better value" },
          { id: "opt_3_3", label: "Standard Routine Service", emoji: "📋", desc: "Routine experience with room for polish" }
        ]
      );
    case 2:
      return pickThree(
        "What was the main issue during your visit?",
        "Select your primary concern",
        [
          { id: "opt_2_1", label: "Service Delay or Quality Issue", emoji: "⚠️", desc: "Service did not meet expectations" },
          { id: "opt_2_2", label: "Staff Attention & Responsiveness", emoji: "⏳", desc: "Lack of attention from staff" },
          { id: "opt_2_3", label: "Facility or Product Issue", emoji: "📋", desc: "Problem with facility or service item" }
        ]
      );
    case 1:
    default:
      return pickThree(
        "What was the primary issue with your visit?",
        "Select your main concern",
        [
          { id: "opt_1_1", label: "Unsatisfactory Quality", emoji: "❌", desc: "Experience fell far short of standards" },
          { id: "opt_1_2", label: "Billing or Payment Issue", emoji: "💳", desc: "Unexpected charges or billing error" },
          { id: "opt_1_3", label: "Unprofessional Service", emoji: "🛑", desc: "Unpleasant customer service interaction" }
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
