// Smart AI Review Synthesis & Feedback Intelligence Engine

/**
 * Generates natural, authentic review text based on customer selections
 */
export function generateReviewDraft({
  business,
  rating = 5,
  highlights = [],
  staffShoutout = "",
  freeText = "",
  tone = "enthusiastic"
}) {
  const bizName = business?.name || "this establishment";
  const bizType = business?.type || "venue";
  
  // Format items nicely
  const itemsText = highlights.length > 0 
    ? highlights.slice(0, 3).join(", ") 
    : "";
  
  const hasStaff = staffShoutout && !staffShoutout.includes("Skip") && !staffShoutout.includes("Prefer");

  // Tone variations dictionary
  const templates = {
    enthusiastic: [
      `Had an absolutely phenomenal time at ${bizName}! ${itemsText ? `The ${itemsText} exceeded all expectations and made the visit truly memorable. ` : ''}${hasStaff ? `Huge thanks to ${staffShoutout} for such attentive and warm hospitality! ` : ''}${freeText ? `"${freeText.trim()}" ` : ''}Cannot recommend this place enough — easily 5/5 stars! 🌟`,
      `Outstanding experience at ${bizName}! From the moment we walked in, everything was top-notch. ${itemsText ? `Highlights for us were definitely the ${itemsText}. ` : ''}${hasStaff ? `Special praise to ${staffShoutout} who went above and beyond. ` : ''}${freeText ? `${freeText.trim()} ` : ''}Will definitely be returning soon!`,
      `Five stars all the way for ${bizName}! ${itemsText ? `We were blown away by the ${itemsText}. ` : ''}${hasStaff ? `Service by ${staffShoutout} was nothing short of perfection. ` : ''}${freeText ? `${freeText.trim()} ` : ''}If you are in the area, this is an absolute must-visit!`
    ],
    detailed: [
      `Visiting ${bizName} was a masterclass in great hospitality. ${itemsText ? `Every detail of the ${itemsText} was executed with impressive precision and quality. ` : ''}${hasStaff ? `We appreciated the thoughtful care from ${staffShoutout}, who made great recommendations. ` : ''}${freeText ? `${freeText.trim()} ` : ''}A truly polished, delightful experience that sets the benchmark for great dining and service.`,
      `My recent visit to ${bizName} was exceptional. ${itemsText ? `The standout elements were undeniably the ${itemsText}, each reflecting remarkable attention to craft. ` : ''}${hasStaff ? `Kudos to ${staffShoutout} for exceptional professionalism and knowledge. ` : ''}${freeText ? `${freeText.trim()} ` : ''}Highly deserving of top marks.`
    ],
    concise: [
      `Exceptional visit to ${bizName}. ${itemsText ? `The ${itemsText} were fantastic. ` : ''}${hasStaff ? `Great service from ${staffShoutout}. ` : ''}${freeText ? `${freeText.trim()} ` : ''}10/10, will be back!`,
      `Loved everything about ${bizName}! ${itemsText ? `Top tier ${itemsText}. ` : ''}${hasStaff ? `Shoutout to ${staffShoutout}. ` : ''}Highly recommended! ⭐⭐⭐⭐⭐`,
      `Outstanding quality and service at ${bizName}. ${itemsText ? `The ${itemsText} were delicious. ` : ''}${freeText ? `${freeText.trim()}` : ''} Will definitely return!`
    ],
    casual: [
      `So glad we stopped by ${bizName}! ${itemsText ? `Totally loved the ${itemsText} — so good. ` : ''}${hasStaff ? `${staffShoutout} took super good care of us too. ` : ''}${freeText ? `${freeText.trim()} ` : ''}Super chill vibe and great energy. Definitely check them out!`,
      `Such a good spot! ${bizName} delivered on all fronts. ${itemsText ? `Can't stop thinking about the ${itemsText}! ` : ''}${hasStaff ? `${staffShoutout} was awesome. ` : ''}${freeText ? `${freeText.trim()} ` : ''}Already planning my next trip back.`
    ]
  };

  const pool = templates[tone] || templates.enthusiastic;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}



/**
 * Returns 3 distinct AI-crafted review options for the customer to choose from
 */
export function generateReviewOptions({
  business,
  rating = 5,
  highlights = [],
  staffShoutout = "Dr. C",
  freeText = ""
}) {
  const bizName = business?.name || "Dr C Dental Clinic";
  const cleanHighlights = highlights.map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || '')).filter(Boolean);
  const itemsText = cleanHighlights.length > 0 ? cleanHighlights.slice(0, 3).join(", ") : "the gentle care and professional treatment";
  
  if (rating >= 5) {
    return [
      {
        id: "detailed",
        title: "Option 1: Detailed & Enthusiastic",
        badge: "Most Popular",
        text: `Had an exceptional 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : ''}The entire visit was comfortable and seamless. Cannot recommend ${bizName} enough! 🌟`
      },
      {
        id: "concise",
        title: "Option 2: Short & Direct",
        badge: "Quick",
        text: `Outstanding experience at ${bizName}. ${itemsText ? `Loved ${itemsText}. ` : ''}10/10 quality and service — will definitely be returning! ⭐⭐⭐⭐⭐`
      },
      {
        id: "warm",
        title: "Option 3: Warm & Friendly",
        badge: "Personal",
        text: `So grateful for the fantastic care at ${bizName}! The team made everything easy and reassuring, especially ${itemsText}. Truly a wonderful visit!`
      }
    ];
  } else if (rating === 4) {
    return [
      {
        id: "detailed",
        title: "Option 1: Detailed Review",
        badge: "Recommended",
        text: `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : ''}Great professionalism and overall pleasant visit. Definitely recommend!`
      },
      {
        id: "concise",
        title: "Option 2: Short & Sweet",
        badge: "Quick",
        text: `Great service and friendly team at ${bizName}. ${itemsText ? `Very satisfied with ${itemsText}. ` : ''}Solid 4 stars!`
      },
      {
        id: "warm",
        title: "Option 3: Positive & Balanced",
        badge: "Balanced",
        text: `Had a very positive visit to ${bizName}. ${itemsText ? `Highlight was ${itemsText}. ` : ''}Thanks for taking good care of us today!`
      }
    ];
  }

  return [
    {
      id: "general",
      title: "Option 1: Standard Review",
      badge: "General",
      text: `Visited ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : ''}Thank you for your service.`
    }
  ];
}

/**
 * Returns exactly 3 tailored options for ANY star rating (1, 2, 3, 4, 5)
 */
export function getThreeOptionsForRating(business, rating = 5) {
  const numRating = Number(rating) || 5;
  const category = business?.category || 'healthcare';
  const bizName = business?.name || 'Dr C Dental Clinic';

  if (category === 'healthcare' || bizName.toLowerCase().includes('dental') || bizName.toLowerCase().includes('clinic') || bizName.toLowerCase().includes('dr')) {
    switch (numRating) {
      case 5:
        return {
          title: "What made your 5-Star visit exceptional?",
          subtitle: "Select your top highlights from today's visit",
          options: [
            { id: "opt_5_1", label: "Painless & Gentle Procedure", emoji: "🦷", desc: "Completely comfortable and painless treatment" },
            { id: "opt_5_2", label: "Dr. C's Reassuring Guidance", emoji: "✨", desc: "Clear explanations and kind patient care" },
            { id: "opt_5_3", label: "Spotless & Modern Sterile Clinic", emoji: "🏥", desc: "State-of-the-art equipment and ultra-clean operatory" }
          ]
        };
      case 4:
        return {
          title: "What did you like about your visit?",
          subtitle: "Select what went well today",
          options: [
            { id: "opt_4_1", label: "Friendly & Attentive Staff", emoji: "👨‍⚕️", desc: "Courteous, helpful, and welcoming team" },
            { id: "opt_4_2", label: "Thorough Cleaning & Examination", emoji: "🪥", desc: "Detailed inspection and gentle dental cleaning" },
            { id: "opt_4_3", label: "Comfortable Clinic Environment", emoji: "🛋️", desc: "Pleasant ambiance and relaxed atmosphere" }
          ]
        };
      case 3:
        return {
          title: "How can we improve your experience?",
          subtitle: "Select what could be better for next time",
          options: [
            { id: "opt_3_1", label: "Appointment Wait Time", emoji: "⏱️", desc: "Waited longer than expected before treatment" },
            { id: "opt_3_2", label: "Treatment Cost & Pricing Clarity", emoji: "💬", desc: "Needed more clarity on fees or treatment plan" },
            { id: "opt_3_3", label: "Scheduling & Communication", emoji: "📞", desc: "Follow-up or appointment reminder process" }
          ]
        };
      case 2:
        return {
          title: "We apologize for the discomfort. What happened?",
          subtitle: "Select your main concern for management escalation",
          options: [
            { id: "opt_2_1", label: "Pain or Discomfort During Care", emoji: "⚠️", desc: "Treatment felt uncomfortable or painful" },
            { id: "opt_2_2", label: "Extended Wait Time at Clinic", emoji: "⏳", desc: "Significant delay past scheduled time" },
            { id: "opt_2_3", label: "Communication or Staff Care", emoji: "👤", desc: "Felt rushed or inadequately supported" }
          ]
        };
      case 1:
      default:
        return {
          title: "We take this seriously. What was the main issue?",
          subtitle: "Select the primary issue for direct manager escalation",
          options: [
            { id: "opt_1_1", label: "Unsatisfactory Treatment Outcome", emoji: "❌", desc: "Procedure or treatment did not meet expectations" },
            { id: "opt_1_2", label: "Unexpected Billing or Fee Issue", emoji: "💳", desc: "Billing discrepancy or unclear charges" },
            { id: "opt_1_3", label: "Unprofessional Staff Interaction", emoji: "🛑", desc: "Unpleasant customer service interaction" }
          ]
        };
    }
  }

  // Restaurant / Dining Category
  if (category === 'restaurant' || category === 'cafe') {
    switch (numRating) {
      case 5:
        return {
          title: "What made your dining exceptional?",
          subtitle: "Select what delighted your palate and evening",
          options: [
            { id: "opt_5_1", label: "Exquisite Food & Wine Pairing", emoji: "🍷", desc: "Flavors and pairings exceeded expectations" },
            { id: "opt_5_2", label: "Warm & Attentive Hospitality", emoji: "👨‍🍳", desc: "Outstanding table service and care" },
            { id: "opt_5_3", label: "Romantic & Elegant Ambiance", emoji: "🕯️", desc: "Perfect atmosphere, music, and decor" }
          ]
        };
      case 4:
        return {
          title: "What did you enjoy most today?",
          subtitle: "Select what stood out during your meal",
          options: [
            { id: "opt_4_1", label: "Delicious Dishes & Drinks", emoji: "🍽️", desc: "High quality food and great taste" },
            { id: "opt_4_2", label: "Pleasant Dining Atmosphere", emoji: "🥂", desc: "Comfortable seating and great vibe" },
            { id: "opt_4_3", label: "Prompt & Courteous Service", emoji: "⚡", desc: "Friendly servers and timely orders" }
          ]
        };
      case 3:
        return {
          title: "How can we make your next visit better?",
          subtitle: "Select what we can improve",
          options: [
            { id: "opt_3_1", label: "Order / Kitchen Wait Time", emoji: "⏱️", desc: "Food took longer than anticipated" },
            { id: "opt_3_2", label: "Pricing / Portion Value", emoji: "💵", desc: "Portion size or menu pricing balance" },
            { id: "opt_3_3", label: "Table Comfort & Noise Level", emoji: "🔊", desc: "Seating location or acoustic level" }
          ]
        };
      case 2:
        return {
          title: "We are sorry your meal wasn't ideal. What happened?",
          subtitle: "Select the primary issue for the General Manager",
          options: [
            { id: "opt_2_1", label: "Food Quality / Temperature Issue", emoji: "🥘", desc: "Dish was cold or not prepared properly" },
            { id: "opt_2_2", label: "Slow or Inattentive Service", emoji: "⏳", desc: "Long gaps between server visits" },
            { id: "opt_2_3", label: "Order Mistake or Billing Issue", emoji: "🧾", desc: "Incorrect items or bill discrepancy" }
          ]
        };
      case 1:
      default:
        return {
          title: "We apologize sincerely. What was your main concern?",
          subtitle: "Sent straight to the General Manager for resolution",
          options: [
            { id: "opt_1_1", label: "Disappointing Meal Quality", emoji: "❌", desc: "Food was unsatisfactory or inedible" },
            { id: "opt_1_2", label: "Unacceptable Service Experience", emoji: "🚫", desc: "Unhelpful or rude staff interaction" },
            { id: "opt_1_3", label: "Reservation or Billing Dispute", emoji: "⚠️", desc: "Major booking or payment issue" }
          ]
        };
    }
  }

  // Default Fallback Category
  switch (numRating) {
    case 5:
      return {
        title: "What made your 5-Star experience great?",
        subtitle: "Select the highlights from your experience",
        options: [
          { id: "opt_5_1", label: "Outstanding Service Quality", emoji: "⭐", desc: "Top-notch experience from start to finish" },
          { id: "opt_5_2", label: "Friendly & Attentive Team", emoji: "🤝", desc: "Welcoming and helpful staff" },
          { id: "opt_5_3", label: "Clean & Inviting Space", emoji: "🏢", desc: "Well organized, spotless, and comfortable" }
        ]
      };
    case 4:
      return {
        title: "What did you like about your visit?",
        subtitle: "Select what went well today",
        options: [
          { id: "opt_4_1", label: "Good Overall Experience", emoji: "👍", desc: "Smooth and positive visit" },
          { id: "opt_4_2", label: "Helpful Customer Support", emoji: "💬", desc: "Supportive staff and clear help" },
          { id: "opt_4_3", label: "Clean & Well Maintained", emoji: "✨", desc: "Pleasant environment and facility" }
        ]
      };
    case 3:
      return {
        title: "How can we improve your experience?",
        subtitle: "Select what we could do better",
        options: [
          { id: "opt_3_1", label: "Service Speed & Wait Time", emoji: "⏱️", desc: "Faster turnaround and less waiting" },
          { id: "opt_3_2", label: "Pricing & Value Clarity", emoji: "💲", desc: "Clearer pricing or better value" },
          { id: "opt_3_3", label: "Communication & Follow-up", emoji: "📞", desc: "More responsive updates" }
        ]
      };
    case 2:
      return {
        title: "We apologize for the inconvenience. What happened?",
        subtitle: "Select your main concern for management",
        options: [
          { id: "opt_2_1", label: "Service Delay or Quality Issue", emoji: "⚠️", desc: "Service did not meet expectations" },
          { id: "opt_2_2", label: "Staff Attention & Responsiveness", emoji: "⏳", desc: "Lack of attention from staff" },
          { id: "opt_2_3", label: "Facility or Product Issue", emoji: "📋", desc: "Problem with facility or service item" }
        ]
      };
    case 1:
    default:
      return {
        title: "We take this seriously. What was the main issue?",
        subtitle: "Select the primary issue for direct escalation",
        options: [
          { id: "opt_1_1", label: "Unsatisfactory Quality", emoji: "❌", desc: "Experience fell far short of standards" },
          { id: "opt_1_2", label: "Billing or Payment Issue", emoji: "💳", desc: "Unexpected charges or billing error" },
          { id: "opt_1_3", label: "Unprofessional Service", emoji: "🛑", desc: "Unpleasant customer service interaction" }
        ]
      };
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


