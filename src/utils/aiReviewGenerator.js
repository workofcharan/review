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
 * Synthesizes root-cause summary for internal manager resolution
 */
export function summarizeComplaint({ categories = [], drilldown = "", notes = "" }) {
  const parts = [];
  if (categories.length > 0) parts.push(`Primary Issue: ${categories.join(", ")}`);
  if (drilldown) parts.push(`Specific Area: ${drilldown}`);
  if (notes) parts.push(`Customer Statement: "${notes.trim()}"`);
  return parts.join(" | ");
}
