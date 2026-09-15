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
  const numRating = Number(rating) || 5;
  
  // Format items nicely
  const cleanHighlights = highlights.map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || '')).filter(Boolean);
  const itemsText = cleanHighlights.length > 0 
    ? cleanHighlights.slice(0, 3).join(", ") 
    : "the service and experience";
  
  const hasStaff = staffShoutout && !staffShoutout.includes("Skip") && !staffShoutout.includes("Prefer");

  if (numRating === 5) {
    return `Had an absolutely phenomenal 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : ''}${hasStaff ? `Special thanks to ${staffShoutout} for such attentive and caring service! ` : ''}Everything was top-notch and seamless. Easily 5/5 stars! 🌟`;
  } else if (numRating === 4) {
    return `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : ''}${hasStaff ? `Staff like ${staffShoutout} were friendly and helpful. ` : ''}A solid 4-star visit and will be returning!`;
  } else if (numRating === 3) {
    return `Average visit to ${bizName}. Some parts were fine, but ${itemsText ? `${itemsText} could be improved for next time. ` : ''}Decent overall, hoping for a smoother experience on my next visit.`;
  } else if (numRating === 2) {
    return `Fair to disappointing visit at ${bizName}. We experienced issues with ${itemsText ? `${itemsText}. ` : 'the service.'}Management should look into this to improve customer satisfaction.`;
  } else {
    return `Very poor experience at ${bizName}. Extremely disappointed with ${itemsText ? `${itemsText}. ` : 'the overall service.'}Did not meet basic expectations. 1 star.`;
  }
}

/**
 * Returns 3 distinct AI-crafted review options for ANY star rating (1, 2, 3, 4, 5)
 */
export function generateReviewOptions({
  business,
  rating = 5,
  highlights = [],
  staffShoutout = "Dr. C",
  freeText = ""
}) {
  const bizName = business?.name || "Dr C Dental Clinic";
  const numRating = Number(rating) || 5;
  const cleanHighlights = highlights.map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || '')).filter(Boolean);
  const itemsText = cleanHighlights.length > 0 ? cleanHighlights.slice(0, 3).join(", ") : "the service and team";

  // 5 STARS (Excellent 🤩)
  if (numRating === 5) {
    return [
      {
        id: "detailed_5",
        title: "Option 1: Detailed & Enthusiastic",
        badge: "Most Popular",
        text: `Had an exceptional 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : ''}The entire visit was comfortable, prompt, and spotless. Cannot recommend ${bizName} enough! 🌟`
      },
      {
        id: "concise_5",
        title: "Option 2: Short & Direct",
        badge: "Quick",
        text: `Outstanding experience at ${bizName}. ${itemsText ? `Loved ${itemsText}. ` : ''}10/10 quality and service — will definitely be returning! ⭐⭐⭐⭐⭐`
      },
      {
        id: "warm_5",
        title: "Option 3: Warm & Personal",
        badge: "Personal",
        text: `So grateful for the fantastic care at ${bizName}! The team made everything easy and reassuring, especially ${itemsText}. Truly a wonderful visit!`
      }
    ];
  }

  // 4 STARS (Good 😊)
  if (numRating === 4) {
    return [
      {
        id: "detailed_4",
        title: "Option 1: Detailed & Positive",
        badge: "Recommended",
        text: `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : ''}Great professionalism and overall pleasant visit. Definitely recommend!`
      },
      {
        id: "concise_4",
        title: "Option 2: Short & Sweet",
        badge: "Quick",
        text: `Great service and friendly team at ${bizName}. ${itemsText ? `Very satisfied with ${itemsText}. ` : ''}Solid 4 stars!`
      },
      {
        id: "warm_4",
        title: "Option 3: Positive & Balanced",
        badge: "Balanced",
        text: `Had a very positive visit to ${bizName}. ${itemsText ? `Highlight was ${itemsText}. ` : ''}Thanks for taking good care of us today!`
      }
    ];
  }

  // 3 STARS (Average 😐)
  if (numRating === 3) {
    return [
      {
        id: "detailed_3",
        title: "Option 1: Balanced & Constructive",
        badge: "Constructive",
        text: `Decent visit to ${bizName}. The overall service was okay, but ${itemsText ? `${itemsText} could use some attention. ` : ''}A fair 3-star experience.`
      },
      {
        id: "concise_3",
        title: "Option 2: Short & Honest",
        badge: "Honest",
        text: `Average experience at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : ''}Good potential, but room for improvement.`
      },
      {
        id: "warm_3",
        title: "Option 3: Fair & Balanced",
        badge: "Balanced",
        text: `Fair visit to ${bizName}. Some parts went well, though ${itemsText ? `${itemsText} was a bit mixed. ` : ''}Hoping for a smoother visit next time.`
      }
    ];
  }

  // 2 STARS (Fair / Needs Work 🙁)
  if (numRating === 2) {
    return [
      {
        id: "detailed_2",
        title: "Option 1: Detailed Feedback",
        badge: "Detailed",
        text: `Had a disappointing visit to ${bizName}. We ran into issues with ${itemsText ? `${itemsText}, ` : ''}and the experience did not meet expectations. Needs improvement.`
      },
      {
        id: "concise_2",
        title: "Option 2: Direct & Frank",
        badge: "Direct",
        text: `Below average experience at ${bizName}. Frustrated with ${itemsText ? `${itemsText}. ` : 'the service.'}Hope management takes steps to fix this.`
      },
      {
        id: "warm_2",
        title: "Option 3: Concise Issue Report",
        badge: "Concise",
        text: `Not satisfied with my visit to ${bizName}. The main drawback was ${itemsText ? `${itemsText}. ` : 'the overall care.'}2 stars.`
      }
    ];
  }

  // 1 STAR (Poor 😣)
  return [
    {
      id: "detailed_1",
      title: "Option 1: Critical & Detailed",
      badge: "Detailed",
      text: `Very poor experience at ${bizName}. Had major problems with ${itemsText ? `${itemsText}, ` : ''}and the customer service was disappointing. Very unsatisfied.`
    },
    {
      id: "concise_1",
      title: "Option 2: Direct & Unhappy",
      badge: "Direct",
      text: `Terrible experience at ${bizName}. ${itemsText ? `${itemsText} was completely unacceptable. ` : ''}Definitely not returning.`
    },
    {
      id: "warm_1",
      title: "Option 3: Concise Warning",
      badge: "Warning",
      text: `Extremely disappointed with ${bizName}. Unhappy with ${itemsText ? `${itemsText}. ` : 'the service.'}1 star.`
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

  // Healthcare & Dental Category
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
          title: "What was your impression of today's visit?",
          subtitle: "Select the main aspect of your appointment",
          options: [
            { id: "opt_3_1", label: "Appointment Wait Time", emoji: "⏱️", desc: "Waited longer than expected before treatment" },
            { id: "opt_3_2", label: "Treatment Cost & Pricing Clarity", emoji: "💬", desc: "Needed more clarity on fees or treatment plan" },
            { id: "opt_3_3", label: "Routine Scaling & Standard Care", emoji: "📋", desc: "Standard dental checkup and routine procedure" }
          ]
        };
      case 2:
        return {
          title: "What was the main issue during your visit?",
          subtitle: "Select your primary concern",
          options: [
            { id: "opt_2_1", label: "Discomfort During Treatment", emoji: "⚠️", desc: "Treatment felt uncomfortable or sensitive" },
            { id: "opt_2_2", label: "Extended Waiting Room Delay", emoji: "⏳", desc: "Significant delay past scheduled appointment" },
            { id: "opt_2_3", label: "Rushed Consultation & Communication", emoji: "👤", desc: "Felt rushed or needed more explanation" }
          ]
        };
      case 1:
      default:
        return {
          title: "What was the primary issue with your visit?",
          subtitle: "Select your main concern",
          options: [
            { id: "opt_1_1", label: "Unsatisfactory Treatment Outcome", emoji: "❌", desc: "Procedure or treatment did not meet expectations" },
            { id: "opt_1_2", label: "Unexpected Billing or Fee Issue", emoji: "💳", desc: "Billing discrepancy or unclear charges" },
            { id: "opt_1_3", label: "Unprofessional Customer Care", emoji: "🛑", desc: "Unpleasant customer service interaction" }
          ]
        };
    }
  }

  // Salon & Spa Category
  if (category === 'salon' || category === 'spa' || bizName.toLowerCase().includes('salon') || bizName.toLowerCase().includes('spa') || bizName.toLowerCase().includes('glow')) {
    switch (numRating) {
      case 5:
        return {
          title: "What made your salon & spa visit exceptional?",
          subtitle: "Select your top highlights from today's styling",
          options: [
            { id: "opt_5_1", label: "Flawless Haircut & Expert Styling", emoji: "💇‍♀️", desc: "Stunning transformation matching your vision" },
            { id: "opt_5_2", label: "Vibrant Color & Seamless Balayage", emoji: "✨", desc: "Rich color and expert application" },
            { id: "opt_5_3", label: "Spotless, Chic & Luxurious Vibe", emoji: "🌸", desc: "Relaxing ambiance and pampering treatment" }
          ]
        };
      case 4:
        return {
          title: "What did you like about your session today?",
          subtitle: "Select what went well today",
          options: [
            { id: "opt_4_1", label: "Friendly & Attentive Stylist", emoji: "💅", desc: "Welcoming and professional consultation" },
            { id: "opt_4_2", label: "Relaxing Scalp & Hair Treatment", emoji: "💆‍♀️", desc: "Comfortable wash basin and scalp massage" },
            { id: "opt_4_3", label: "Clean & Modern Salon Studio", emoji: "🪞", desc: "Pleasant environment and good music" }
          ]
        };
      case 3:
        return {
          title: "What was your impression of today's appointment?",
          subtitle: "Select the main aspect of your service",
          options: [
            { id: "opt_3_1", label: "Appointment Timing & Pacing", emoji: "⏱️", desc: "Waited a bit between washing and styling" },
            { id: "opt_3_2", label: "Styling & Finish Consultation", emoji: "💬", desc: "Standard haircut, needed slightly more tailoring" },
            { id: "opt_3_3", label: "Product & Treatment Pricing", emoji: "🏷️", desc: "Package or service pricing clarity" }
          ]
        };
      case 2:
        return {
          title: "What was the main issue with your salon visit?",
          subtitle: "Select your primary concern",
          options: [
            { id: "opt_2_1", label: "Cut or Color Not Matching Request", emoji: "⚠️", desc: "Haircut length or shade didn't match discussion" },
            { id: "opt_2_2", label: "Significant Appointment Delay", emoji: "⏳", desc: "Long wait past scheduled booking time" },
            { id: "opt_2_3", label: "Inattentive Stylist Care", emoji: "👤", desc: "Felt rushed through the treatment" }
          ]
        };
      case 1:
      default:
        return {
          title: "What was the primary issue with your appointment?",
          subtitle: "Select your main concern",
          options: [
            { id: "opt_1_1", label: "Unsatisfactory Hair / Skin Result", emoji: "❌", desc: "Haircut, color, or spa treatment went wrong" },
            { id: "opt_1_2", label: "Unexpected Extra Billing Charges", emoji: "💳", desc: "Charges differed from initial quote" },
            { id: "opt_1_3", label: "Rude or Unprofessional Behavior", emoji: "🛑", desc: "Disrespectful staff interaction" }
          ]
        };
    }
  }

  // Restaurant / Dining / Café Category
  if (category === 'restaurant' || category === 'cafe' || bizName.toLowerCase().includes('cafe') || bizName.toLowerCase().includes('bistro') || bizName.toLowerCase().includes('restaurant')) {
    switch (numRating) {
      case 5:
        return {
          title: "What made your visit exceptional?",
          subtitle: "Select what delighted your palate and evening",
          options: [
            { id: "opt_5_1", label: "Specialty Coffee & Artisan Pastries", emoji: "☕", desc: "Exceptional brews, fresh flavors, and taste" },
            { id: "opt_5_2", label: "Warm & Attentive Hospitality", emoji: "👨‍🍳", desc: "Outstanding table service and friendly care" },
            { id: "opt_5_3", label: "Aesthetic & Cozy Ambiance", emoji: "🕯️", desc: "Perfect atmosphere, music, and relaxed vibe" }
          ]
        };
      case 4:
        return {
          title: "What did you enjoy most today?",
          subtitle: "Select what stood out during your visit",
          options: [
            { id: "opt_4_1", label: "Delicious Food & Drinks", emoji: "🍽️", desc: "High quality flavors and great taste" },
            { id: "opt_4_2", label: "Pleasant Dining Atmosphere", emoji: "🥂", desc: "Comfortable seating and great vibe" },
            { id: "opt_4_3", label: "Prompt & Courteous Service", emoji: "⚡", desc: "Friendly servers and timely orders" }
          ]
        };
      case 3:
        return {
          title: "What was your impression of today's visit?",
          subtitle: "Select the main aspect of your experience",
          options: [
            { id: "opt_3_1", label: "Kitchen / Drink Wait Time", emoji: "⏱️", desc: "Order took a bit longer than anticipated" },
            { id: "opt_3_2", label: "Menu Pricing & Portion Size", emoji: "💵", desc: "Portion size or pricing balance" },
            { id: "opt_3_3", label: "Seating Comfort & Table Noise", emoji: "🔊", desc: "Seating location or acoustic level" }
          ]
        };
      case 2:
        return {
          title: "What was the main issue with your order?",
          subtitle: "Select your primary concern",
          options: [
            { id: "opt_2_1", label: "Food Temperature or Quality Issue", emoji: "🥘", desc: "Dish was cold or not prepared properly" },
            { id: "opt_2_2", label: "Slow or Inattentive Service", emoji: "⏳", desc: "Long gaps between server visits" },
            { id: "opt_2_3", label: "Order Mistake or Billing Error", emoji: "🧾", desc: "Incorrect items or bill discrepancy" }
          ]
        };
      case 1:
      default:
        return {
          title: "What was the primary issue with your visit?",
          subtitle: "Select your main concern",
          options: [
            { id: "opt_1_1", label: "Disappointing Quality / Taste", emoji: "❌", desc: "Order was unsatisfactory or inedible" },
            { id: "opt_1_2", label: "Unacceptable Customer Service", emoji: "🚫", desc: "Unhelpful or rude staff interaction" },
            { id: "opt_1_3", label: "Billing or Order Dispute", emoji: "⚠️", desc: "Major payment or order issue" }
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
        title: "What was your impression of today's visit?",
        subtitle: "Select what stood out",
        options: [
          { id: "opt_3_1", label: "Service Speed & Wait Time", emoji: "⏱️", desc: "Faster turnaround and less waiting" },
          { id: "opt_3_2", label: "Pricing & Value Clarity", emoji: "💲", desc: "Clearer pricing or better value" },
          { id: "opt_3_3", label: "Standard Routine Service", emoji: "📋", desc: "Routine experience with room for polish" }
        ]
      };
    case 2:
      return {
        title: "What was the main issue during your visit?",
        subtitle: "Select your primary concern",
        options: [
          { id: "opt_2_1", label: "Service Delay or Quality Issue", emoji: "⚠️", desc: "Service did not meet expectations" },
          { id: "opt_2_2", label: "Staff Attention & Responsiveness", emoji: "⏳", desc: "Lack of attention from staff" },
          { id: "opt_2_3", label: "Facility or Product Issue", emoji: "📋", desc: "Problem with facility or service item" }
        ]
      };
    case 1:
    default:
      return {
        title: "What was the primary issue with your visit?",
        subtitle: "Select your main concern",
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
