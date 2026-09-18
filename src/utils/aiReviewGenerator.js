// Smart AI Review Synthesis & Dynamic Feedback Intelligence Engine

/**
 * Infers category from business metadata (category, name, type, logo)
 */
export function inferCategoryFromBusiness(business) {
  if (!business) return 'general';
  
  const text = `${business.name || ''} ${business.type || ''} ${business.tagline || ''}`.toLowerCase();
  const logo = business.logo || '';

  // Gym / Fitness
  if (['🏋️', '🥊', '🧘', '🏃', '🏊'].includes(logo) || /\bgym\b|fitness|crossfit|workout|trainer|training|boxing|yoga|athletics/i.test(text)) {
    return 'gym';
  }
  // Cafe / Bakery / Coffee
  if (['☕', '🥐', '🥖', '🥯', '🍩'].includes(logo) || /\bcafe\b|coffee|bakery|roastery|espresso|brew|matcha|\btea\b/i.test(text)) {
    return 'cafe';
  }
  // Restaurant / Dining / Food
  if (['🍽️', '🍕', '🍔', '🍷', '🌮', '🍦', '🍜', '🍣', '🥩'].includes(logo) || /restaurant|bistro|kitchen|grill|pizza|burger|dining|\bfood\b|eatery|taco|steak|sushi|pasta/i.test(text)) {
    return 'restaurant';
  }
  // Salon / Spa / Beauty
  if (['💇', '💇‍♀️', '💆', '💅', '🌸', '💈', '💄'].includes(logo) || /salon|\bspa\b|\bhair\b|beauty|barber|nails|massage|\bskin\b|glow|aesthetic/i.test(text)) {
    return 'salon';
  }
  // Hotel / Resort / Hospitality
  if (['🏨', '🏖️', '🌴', '🛏️'].includes(logo) || /hotel|resort|suites|\binn\b|\bstay\b|lodge|motel|villa/i.test(text)) {
    return 'hotel';
  }
  // Automotive / Car Care
  if (['🚗', '🔧', '🏎️', '🛠️', '🏎'].includes(logo) || /\bauto\b|\bcars?\b|motors|garage|tire|mechanic|detailing|lube|wash|dealership/i.test(text)) {
    return 'automotive';
  }
  // Retail / Boutique / Store
  if (['🛍️', '👟', '💎', '👗', '👔', '👠'].includes(logo) || /boutique|\bstore\b|\bshop\b|retail|fashion|apparel|jewel|shoes|market/i.test(text)) {
    return 'retail';
  }
  // Pet Care / Veterinary
  if (['🐾', '🐕', '🐈', '🩺'].includes(logo) || /\bpet\b|\bvet\b|paws|veterinary|animal|hound|\bdog\b|\bcat\b/i.test(text)) {
    return 'pet';
  }
  // Healthcare / Dental
  if (['🦷', '🏥', '💊'].includes(logo) || /dental|dentist|clinic|doctor|\bdr\b|teeth|ortho|chiro|medical|health|care/i.test(text)) {
    return 'healthcare';
  }

  if (business.category) {
    const c = business.category.toLowerCase();
    if (c === 'dental') return 'healthcare';
    if (c === 'fitness') return 'gym';
    if (c === 'spa') return 'salon';
    if (c === 'hospitality') return 'hotel';
    return c;
  }

  return 'general';
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
/**
 * Generates natural, authentic review text deeply tailored to the business category, rating, and tone
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
  const category = inferCategoryFromBusiness(business);
  const staff = staffShoutout && !staffShoutout.includes("Skip") && !staffShoutout.includes("Prefer")
    ? staffShoutout
    : getStaffLabelForBusiness(business);
  
  const cleanHighlights = highlights
    .map(h => typeof h === 'string' ? h.replace(/^[^\w\s]+/, '').trim() : (h?.label || ''))
    .filter(Boolean);
  
  const itemsText = cleanHighlights.length > 0 
    ? cleanHighlights.slice(0, 3).join(", ") 
    : "";

  const randIndex = Math.floor((scanSeed ? getSeedRandom(scanSeed) : Math.random()) * 8);

  // Category-specific draft templates
  const categoryDrafts = {
    gym: {
      5: [
        `Hands down one of the best gyms I've ever trained at! ${bizName} is incredible. ${itemsText ? `What stood out today was ${itemsText}. ` : 'The equipment selection and workout floor are phenomenal. '}Huge props to ${staff} for keeping the energy high and motivating everyone. 10/10 recommend to anyone serious about their fitness goals! 🏋️‍♂️🔥`,
        `Amazing workout session at ${bizName}! ${itemsText ? `Really impressed by ${itemsText}. ` : 'Super clean facility, plenty of free weights, and top-tier machines. '}The atmosphere pushes you to hit new PRs and ${staff} are always welcoming. Deserves 5 solid stars! 🌟💪`,
        `Top notch fitness facility at ${bizName}! ${itemsText ? `The highlights were definitely ${itemsText}. ` : 'Spotless locker rooms, modern cardio and lifting gear, and a great community vibe. '}Will be a member for a long time! ⚡💯`,
        `Five stars for ${bizName}! ${itemsText ? `Loved ${itemsText}. ` : 'Great music, motivating trainers, and pristine equipment. '}Best gym experience in town! 🙌`
      ],
      4: [
        `Really solid gym experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Good equipment variety and clean workout stations. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} are helpful and courteous. ` : ''}Great spot for your daily workout! 👍`,
        `Great session at ${bizName} today. ${itemsText ? `Particularly liked ${itemsText}. ` : 'The workout space is well kept and spacious. '}Solid 4 stars and returning tomorrow.`
      ],
      3: [
        `Decent workout at ${bizName}. ${itemsText ? `Noticed ${itemsText}, but ` : ''}it gets quite busy during peak hours. Good gym with solid potential if machine wait times improve.`,
        `Average gym session at ${bizName}. Equipment is okay, but ${itemsText ? `${itemsText} could use some attention. ` : 'facility gets crowded during after-work rush.'}`
      ],
      2: [
        `Disappointing session at ${bizName}. Had issues with ${itemsText ? `${itemsText}. ` : 'machine maintenance and floor overcrowding.'} Needs improvement from management.`,
        `Not the best experience at ${bizName}. ${itemsText ? `Frustrated by ${itemsText}. ` : 'Several machines out of order and locker room needed cleaning.'}`
      ],
      1: [
        `Very poor experience at ${bizName}. Extremely disappointed with ${itemsText ? `${itemsText}. ` : 'the cleanliness and customer support.'} 1 star.`,
        `Unacceptable conditions at ${bizName}. Had major issues with ${itemsText ? `${itemsText}. ` : 'billing and staff attitude.'} Would not recommend.`
      ]
    },

    cafe: {
      5: [
        `My absolute favorite cafe! ${bizName} never disappoints. ${itemsText ? `Today's highlight was ${itemsText}. ` : 'The specialty espresso was rich and velvety, and the fresh pastries were warm and flaky! '}Shoutout to ${staff} for the warmest hospitality and incredible coffee craftsmanship. 5/5 stars! ☕🥐✨`,
        `Such a cozy and welcoming vibe at ${bizName}! ${itemsText ? `Was blown away by ${itemsText}. ` : 'The coffee drinks are crafted to perfection and the atmosphere is perfect for relaxing or getting work done. '}Can't wait for my next cup! ☕💫`,
        `Top tier coffee experience at ${bizName}! ${itemsText ? `Loved ${itemsText}. ` : 'Delicious brews, immaculate aesthetic, and super quick service. '}${staff ? `Big thanks to ${staff}! ` : ''}Highly recommended! ⭐⭐⭐⭐⭐`,
        `Five stars for ${bizName}! ${itemsText ? `Really enjoyed ${itemsText}. ` : 'Best artisan pastries and iced lattes around. '}A must-visit morning ritual! 🙌`
      ],
      4: [
        `Lovely coffee visit to ${bizName}. ${itemsText ? `Enjoyed ${itemsText}. ` : 'Great drink selection and cozy seating area. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were very friendly. ` : ''}Definitely coming back! ☕👍`,
        `Great cafe experience at ${bizName}. ${itemsText ? `Liked ${itemsText}. ` : 'Quality beans and good baked goods. '}Pleasant morning stop.`
      ],
      3: [
        `Decent cafe visit at ${bizName}. Coffee was okay, but ${itemsText ? `${itemsText} took a bit longer than expected. ` : 'the line moved a bit slowly.'} Nice ambience overall.`,
        `Average experience at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Good potential, but seating was tight and drink was lukewarm.'}`
      ],
      2: [
        `Disappointing visit at ${bizName}. Had issues with ${itemsText ? `${itemsText}. ` : 'long wait times and order mix-up.'} Expected better coffee quality.`,
        `Below expectations at ${bizName}. ${itemsText ? `Unhappy with ${itemsText}. ` : 'Coffee was bitter and pastries tasted dry.'}`
      ],
      1: [
        `Terrible experience at ${bizName}. ${itemsText ? `Extremely upset with ${itemsText}. ` : 'Wrong order served after a 20-minute wait and rude staff.'} 1 star.`,
        `Will not return to ${bizName}. ${itemsText ? `Major issue with ${itemsText}. ` : 'Poor coffee and dirty tables.'}`
      ]
    },

    restaurant: {
      5: [
        `An unforgettable dining experience at ${bizName}! Every single dish was packed with exquisite flavor and cooked to absolute perfection. ${itemsText ? `What made it extraordinary was ${itemsText}. ` : ''}Special compliments to ${staff} for impeccable table service and great recommendations. Easily 5/5 stars! 🍽️🍷✨`,
        `Outstanding meal at ${bizName} today! From the appetizers to the main course, everything tasted gourmet and fresh. ${itemsText ? `Particularly loved ${itemsText}. ` : ''}Wonderful lighting, cozy atmosphere, and attentive hospitality. 10/10 recommendation! ⭐⭐⭐⭐⭐`,
        `Cannot say enough good things about our dinner at ${bizName}! ${itemsText ? `The highlight of our evening was ${itemsText}. ` : 'The food presentation, portion sizes, and taste were top tier. '}Will definitely be bringing friends and family back soon! 🍝🥂`,
        `Five stars all the way for ${bizName}! ${itemsText ? `Super impressed by ${itemsText}. ` : 'Delicious menu, fast kitchen turnaround, and lovely ambiance. '}Thank you for an incredible dinner! 🙌`
      ],
      4: [
        `Very enjoyable dinner at ${bizName}. ${itemsText ? `Really appreciated ${itemsText}. ` : 'The food was delicious and well presented. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} took great care of our table. ` : ''}A solid 4-star dining experience! 👍`,
        `Great meal at ${bizName}. ${itemsText ? `Particularly liked ${itemsText}. ` : 'Flavorful dishes and pleasant dining vibe. '}Will happily return.`
      ],
      3: [
        `Average dining visit to ${bizName}. The food was decent, though ${itemsText ? `${itemsText} was a bit delayed. ` : 'the wait between courses was longer than expected. '}Good potential with minor service tuning.`,
        `Fair experience at ${bizName}. Some dishes were great, but ${itemsText ? `${itemsText} could be improved. ` : 'portion sizes were smaller than expected.'}`
      ],
      2: [
        `Disappointing meal at ${bizName}. We experienced issues with ${itemsText ? `${itemsText}. ` : 'lukewarm food and slow table service.'} Management needs to review kitchen pacing.`,
        `Below expectations at ${bizName}. ${itemsText ? `Unhappy with ${itemsText}. ` : 'Order arrived wrong and food lacked seasoning.'}`
      ],
      1: [
        `Very poor dining experience at ${bizName}. Extremely disappointed with ${itemsText ? `${itemsText}. ` : 'the food quality and dismissive service.'} 1 star.`,
        `Unacceptable dining at ${bizName}. ${itemsText ? `Major issue with ${itemsText}. ` : 'Over an hour wait, cold food, and indifferent staff.'} Never coming back.`
      ]
    },

    salon: {
      5: [
        `Obsessed with my results from ${bizName}! The styling, cut, and finish exceeded all my expectations. ${itemsText ? `What stood out most was ${itemsText}. ` : ''}Huge shoutout to ${staff} for their extraordinary talent, attention to detail, and gentle care. Leaving with so much confidence! 💇‍♀️✨💖`,
        `The absolute best salon and spa experience at ${bizName}! ${itemsText ? `Loved ${itemsText}. ` : 'Such a chic, spotless, and relaxing environment. '}They listened carefully to what I wanted and executed it flawlessly. 5 stars all the way! 🌸💫`,
        `Five stars for ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : 'Gentle wash, fabulous styling, and personalized tips for maintenance. '}I get compliments everywhere I go! 🌟`,
        `Top notch beauty experience at ${bizName}! ${itemsText ? `Highlight was definitely ${itemsText}. ` : 'Super talented stylists and luxurious pampering treatment. '}Already booked my next appointment! 🙌`
      ],
      4: [
        `Great appointment at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Left with a fresh, clean style and good service. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were polite and professional throughout. ` : ''}Solid 4 stars! 💇👍`,
        `Very pleased with my visit to ${bizName}. ${itemsText ? `Liked ${itemsText}. ` : 'Clean salon and good styling attention. '}Will be returning.`
      ],
      3: [
        `Okay appointment at ${bizName}. The final result was fine, but ${itemsText ? `${itemsText} felt a bit rushed. ` : 'had to wait past my appointment time. '}Decent salon overall.`,
        `Average visit at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Stylist was in a hurry, though the cut is okay.'}`
      ],
      2: [
        `Disappointing visit to ${bizName}. Not happy with ${itemsText ? `${itemsText}. ` : 'the cut and lack of attention to my requests.'} Needs better client consultation.`,
        `Below expectations at ${bizName}. ${itemsText ? `Frustrated with ${itemsText}. ` : 'Felt rushed and styling did not match reference.'}`
      ],
      1: [
        `Terrible experience at ${bizName}. ${itemsText ? `Ruined my hair with ${itemsText}. ` : 'Completely ignored my instructions and overcharged.'} 1 star.`,
        `Unprofessional salon experience at ${bizName}. ${itemsText ? `Major issue with ${itemsText}. ` : 'Rude attitude and awful haircut.'} Will never return.`
      ]
    },

    hotel: {
      5: [
        `Our stay at ${bizName} was nothing short of phenomenal! The suite was immaculate, the bed was ultra-comfortable, and the views were breathtaking. ${itemsText ? `A huge highlight was ${itemsText}. ` : ''}Special thanks to ${staff} for providing 5-star hospitality from check-in to check-out! 🏨🌴✨`,
        `Incredible hotel experience at ${bizName}! ${itemsText ? `So impressed by ${itemsText}. ` : 'Pristine room cleanliness, fantastic amenities, and peaceful environment. '}Felt completely recharged. 10/10 recommend to any traveler! ⭐⭐⭐⭐⭐`,
        `Five stars for ${bizName}! ${itemsText ? `Loved ${itemsText}. ` : 'Seamless express check-in, delicious breakfast, and prime location. '}Can't wait for my next vacation stay! 🛏️💫`,
        `Luxury and comfort at its finest at ${bizName}! ${itemsText ? `Highlight was definitely ${itemsText}. ` : 'Spotless facilities and top-tier guest care. '}Best hotel in the area! 🙌`
      ],
      4: [
        `Very good stay at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Clean room, comfortable bedding, and friendly front desk. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} made our check-in seamless. ` : ''}Solid 4-star experience! 👍`,
        `Pleasant stay at ${bizName}. ${itemsText ? `Particularly liked ${itemsText}. ` : 'Good amenities and quiet rooms. '}Would stay again.`
      ],
      3: [
        `Average stay at ${bizName}. The room was decent, but ${itemsText ? `${itemsText} could be improved. ` : 'check-in queue was rather slow and parking was limited. '}Decent place for a short stopover.`,
        `Fair hotel visit at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Room was clean but hallway noise was noticeable.'}`
      ],
      2: [
        `Disappointing stay at ${bizName}. Experienced issues with ${itemsText ? `${itemsText}. ` : 'room cleanliness and noisy air conditioning.'} Front desk was slow to address concerns.`,
        `Below expectations at ${bizName}. ${itemsText ? `Unhappy with ${itemsText}. ` : 'Key cards kept failing and housekeeping missed our room.'}`
      ],
      1: [
        `Awful stay at ${bizName}. ${itemsText ? `Unacceptable conditions with ${itemsText}. ` : 'Unclean bathroom, noisy environment, and unhelpful staff.'} 1 star.`,
        `Would never recommend ${bizName}. ${itemsText ? `Major issues with ${itemsText}. ` : 'Room smelled bad, no hot water, and rude management.'}`
      ]
    },

    automotive: {
      5: [
        `Exceptional automotive service at ${bizName}! My vehicle is running smoother than ever. ${itemsText ? `What impressed me most was ${itemsText}. ` : 'They diagnosed the issue quickly and provided a completely honest, transparent quote with zero hidden charges. '}Huge shoutout to ${staff} for their expert craftsmanship! 🚗🔧⭐`,
        `Top tier auto care at ${bizName}! ${itemsText ? `Super pleased with ${itemsText}. ` : 'Work was finished right on time and my car was returned spotless. '}Honest mechanics you can genuinely trust. Easily 5/5 stars! 🛠️✨`,
        `Five stars for ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : 'Fast turnaround, clear explanations of repairs, and fair pricing. '}I will be bringing all my family vehicles here! 🚘🙌`,
        `Best auto repair shop in town! ${bizName} delivered first-class service. ${itemsText ? `Highlight was ${itemsText}. ` : 'Professional diagnostics and great communication. '}Highly recommend! ⭐⭐⭐⭐⭐`
      ],
      4: [
        `Solid auto service at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Repairs were done well and vehicle is driving smoothly. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} kept me informed throughout. ` : ''}Great experience! 🚗👍`,
        `Good reliable repair work at ${bizName}. ${itemsText ? `Liked ${itemsText}. ` : 'Fair estimate and completed on schedule. '}Satisfied customer.`
      ],
      3: [
        `Decent vehicle service at ${bizName}. Work was completed, but ${itemsText ? `${itemsText} took longer than estimated. ` : 'turnaround took longer than promised. '}Fair pricing overall.`,
        `Average experience at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Car was fixed, but communication updates were sparse.'}`
      ],
      2: [
        `Disappointing service at ${bizName}. Had issues with ${itemsText ? `${itemsText}. ` : 'unexpected extra charges and delayed completion.'} Needs better customer communication.`,
        `Below expectations at ${bizName}. ${itemsText ? `Frustrated by ${itemsText}. ` : 'Car still had squeaking noise after repair was supposedly done.'}`
      ],
      1: [
        `Horrible mechanic service at ${bizName}. ${itemsText ? `Major problems with ${itemsText}. ` : 'Overcharged for shoddy work and vehicle had new issues.'} 1 star.`,
        `Do not bring your car to ${bizName}. ${itemsText ? `Unacceptable experience with ${itemsText}. ` : 'Untrustworthy quotes and rude service advisors.'}`
      ]
    },

    retail: {
      5: [
        `Fantastic shopping experience at ${bizName}! The selection is curated with such great style and high quality. ${itemsText ? `What made shopping here special was ${itemsText}. ` : ''}Special thanks to ${staff} for being so helpful and attentive without being pushy! 🛍️👗✨`,
        `My new go-to store! ${bizName} has amazing items, gorgeous displays, and spotless fitting rooms. ${itemsText ? `Loved ${itemsText}. ` : ''}Smooth checkout and great prices. 5 stars all the way! 💎🌟`,
        `Five stars for ${bizName}! ${itemsText ? `Super impressed by ${itemsText}. ` : 'Trendy collections, great sizing availability, and warm customer service. '}Will definitely be back soon! 🛍️🙌`
      ],
      4: [
        `Great store and shopping trip at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Found some lovely pieces and checkout was quick. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were very courteous. ` : ''}Solid 4 stars! 👍`,
        `Positive shopping experience at ${bizName}. ${itemsText ? `Liked ${itemsText}. ` : 'Good inventory and pleasant atmosphere. '}Definitely recommend.`
      ],
      3: [
        `Average shopping experience at ${bizName}. Some nice items, but ${itemsText ? `${itemsText} was limited. ` : 'popular sizes were out of stock. '}Decent boutique overall.`,
        `Fair visit at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Store was a bit crowded and only one register was open.'}`
      ],
      2: [
        `Disappointing visit to ${bizName}. Had issues with ${itemsText ? `${itemsText}. ` : 'unhelpful staff and return policy confusion.'} Needs better store management.`,
        `Below expectations at ${bizName}. ${itemsText ? `Frustrated by ${itemsText}. ` : 'Rude sales associate and cluttered racks.'}`
      ],
      1: [
        `Terrible retail service at ${bizName}. ${itemsText ? `Very upset by ${itemsText}. ` : 'Rude staff and refused a valid receipt return.'} 1 star.`,
        `Will not shop at ${bizName} again. ${itemsText ? `Major issue with ${itemsText}. ` : 'Misleading price tags and terrible customer service.'}`
      ]
    },

    pet: {
      5: [
        `The absolute best veterinary and pet care team! ${bizName} treated my furry companion like family. ${itemsText ? `What stood out was ${itemsText}. ` : 'The exam was gentle, calming, and completely stress-free. '}Heartfelt thanks to ${staff} for such compassionate care and clear advice! 🐾🐶🐱🩺`,
        `Five stars for ${bizName}! ${itemsText ? `Super impressed by ${itemsText}. ` : 'Spotless, odor-free clinic and the vets handle pets with immense patience and love. '}My pet wasn't anxious at all! 🌟🐾`,
        `Top tier pet care at ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : 'Thorough health checkup, clear treatment steps, and fair pricing. '}Highly recommend to all pet parents! 🙌🩺`
      ],
      4: [
        `Very good vet visit at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Caring staff and gentle handling of my pet. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were very attentive. ` : ''}Solid 4 stars! 🐕👍`,
        `Great experience at ${bizName}. ${itemsText ? `Liked ${itemsText}. ` : 'Knowledgeable team and clean clinic. '}Happy with my pet's care.`
      ],
      3: [
        `Decent veterinary visit at ${bizName}. The doctor was good, though ${itemsText ? `${itemsText} had some delay. ` : 'the waiting room time was rather long. '}Good pet clinic overall.`,
        `Average visit at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Care was fine but medication costs were higher than expected.'}`
      ],
      2: [
        `Disappointing visit to ${bizName}. Had issues with ${itemsText ? `${itemsText}. ` : 'rough handling and lack of clear treatment explanations.'} Expected more compassion for pets.`,
        `Below expectations at ${bizName}. ${itemsText ? `Unhappy with ${itemsText}. ` : 'Long wait in crowded lobby and rushed vet exam.'}`
      ],
      1: [
        `Very poor experience at ${bizName}. ${itemsText ? `Major concerns regarding ${itemsText}. ` : 'Careless handling of my pet and unexpected fees.'} 1 star.`,
        `Do not recommend ${bizName}. ${itemsText ? `Unacceptable care with ${itemsText}. ` : 'Vet was cold, rushed, and misdiagnosed symptoms.'}`
      ]
    },

    healthcare: {
      5: [
        `An absolute 5-star healthcare experience at ${bizName}! The entire procedure was gentle, completely painless, and handled with utmost professionalism. ${itemsText ? `What stood out most was ${itemsText}. ` : ''}Heartfelt thanks to ${staff} for their reassuring guidance and spotless clinic. 10/10 recommendation! 🦷✨🩺`,
        `Exceptional care at ${bizName}! ${itemsText ? `Super impressed by ${itemsText}. ` : 'Modern sterile technology, zero wait time, and a warm, welcoming environment. '}They explain every step clearly so you feel totally at ease. Deserves every bit of 5 stars! ⭐⭐⭐⭐⭐`,
        `Five stars for ${bizName}! ${itemsText ? `The highlights were definitely ${itemsText}. ` : 'Gentle treatment, honest treatment plans, and friendly staff. '}Best medical & dental practice in the area! 🙌`,
        `First-class patient care at ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : 'Compassionate doctors, modern clinic, and seamless check-in. '}Thank you for making my appointment stress-free! 🌟`
      ],
      4: [
        `Very positive appointment at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Gentle examination and thorough care. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were courteous and reassuring throughout. ` : ''}A solid 4-star visit! 👍`,
        `Great experience at ${bizName}. ${itemsText ? `Liked ${itemsText}. ` : 'Clean operatory and professional medical team. '}Will be returning for regular follow-ups.`
      ],
      3: [
        `Decent appointment at ${bizName}. The clinical care was fine, but ${itemsText ? `${itemsText} was slightly delayed. ` : 'waited in the lobby a bit longer than expected. '}Good medical practice overall.`,
        `Average visit at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'Procedure went well, but needed more clarity on aftercare.'}`
      ],
      2: [
        `Disappointing visit to ${bizName}. Had issues with ${itemsText ? `${itemsText}. ` : 'scheduling delays and confusing billing explanations.'} Front desk communication needs work.`,
        `Below expectations at ${bizName}. ${itemsText ? `Unhappy with ${itemsText}. ` : 'Doctor seemed rushed and didn\'t thoroughly answer my questions.'}`
      ],
      1: [
        `Very poor patient experience at ${bizName}. ${itemsText ? `Major issue with ${itemsText}. ` : 'Rude front desk, 45-minute delay, and painful procedure.'} 1 star.`,
        `Unacceptable care at ${bizName}. ${itemsText ? `Unprofessional handling of ${itemsText}. ` : 'Surprise charges and dismissive attitude from staff.'} Will not return.`
      ]
    },

    general: {
      5: [
        `Had an absolutely phenomenal 5-star experience at ${bizName}! ${itemsText ? `What stood out most was ${itemsText}. ` : 'Everything from start to finish was top quality. '}Special shoutout to ${staff} for such attentive and caring service! Easily 5/5 stars! 🌟✨`,
        `Outstanding visit to ${bizName} today! ${itemsText ? `I was particularly impressed by ${itemsText}. ` : 'Friendly team, spotless environment, and zero hassle. '}10/10 recommendation! ⭐⭐⭐⭐⭐`,
        `Cannot say enough good things about ${bizName}! ${itemsText ? `Highlight was definitely ${itemsText}. ` : 'Prompt, courteous, and very professional. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} made everything smooth and welcoming. ` : ''}Will definitely be returning! ✨`,
        `Five stars all the way for ${bizName}! ${itemsText ? `Really appreciated ${itemsText}. ` : 'Super easy, welcoming atmosphere and stellar customer care. '}Thank you for such a great visit! 🙌`
      ],
      4: [
        `Very good experience at ${bizName}. ${itemsText ? `Appreciated ${itemsText}. ` : 'Smooth and positive visit throughout. '}${staff ? `${staff.charAt(0).toUpperCase() + staff.slice(1)} were friendly and helpful. ` : ''}A solid 4-star visit and will be returning! 👍`,
        `Great visit overall at ${bizName}. ${itemsText ? `Loved ${itemsText}, ` : ''}and the team was courteous throughout. Smooth and pleasant experience.`
      ],
      3: [
        `Average visit to ${bizName}. Some parts were fine, but ${itemsText ? `${itemsText} could be improved for next time. ` : 'service could be a bit faster. '}Decent overall, hoping for a smoother experience next time.`,
        `Fair experience at ${bizName}. ${itemsText ? `Noticed ${itemsText}. ` : 'The team was okay, though things felt a bit rushed.'}`
      ],
      2: [
        `Disappointing visit at ${bizName}. We experienced issues with ${itemsText ? `${itemsText}. ` : 'the service.'} Management should look into this to improve customer satisfaction.`,
        `Below expectations at ${bizName}. ${itemsText ? `Not happy with ${itemsText}. ` : 'Turnaround was slower than promised.'}`
      ],
      1: [
        `Very poor experience at ${bizName}. Extremely disappointed with ${itemsText ? `${itemsText}. ` : 'the overall service.'} Did not meet basic expectations. 1 star.`,
        `Unacceptable service at ${bizName}. Had major issues with ${itemsText ? `${itemsText}. ` : 'the interaction.'} Will not be returning.`
      ]
    }
  };

  // Get active pool for inferred category or general
  const pool = categoryDrafts[category] || categoryDrafts.general;
  const ratingDrafts = pool[numRating] || pool[5] || categoryDrafts.general[5];
  
  // Base draft
  let draft = ratingDrafts[randIndex % ratingDrafts.length];

  // If user requested a concise tone, produce a punchy 2-sentence version
  if (tone === 'concise' && numRating >= 4) {
    const conciseDrafts = [
      `Excellent visit to ${bizName}! ${itemsText ? `Loved ${itemsText}. ` : 'Top tier quality and great service. '}Highly recommend! ⭐⭐⭐⭐⭐`,
      `5 stars for ${bizName}! ${itemsText ? `Appreciated ${itemsText}. ` : 'Fast, friendly, and exceptional quality. '}Will definitely be back! 🙌`,
      `Outstanding experience at ${bizName}. ${itemsText ? `Special mention for ${itemsText}. ` : 'Friendly team and great results. '}10/10! 🌟`
    ];
    draft = conciseDrafts[randIndex % conciseDrafts.length];
  } else if (tone === 'detailed' && numRating >= 4) {
    draft = `I recently visited ${bizName} and was very impressed. ${itemsText ? `Specific highlights included ${itemsText}. ` : 'The standards of cleanliness and professionalism were top-tier. '}The staff (${staff}) were attentive and courteous throughout. Highly recommend ${bizName} to anyone looking for premium quality and care! ⭐⭐⭐⭐⭐`;
  } else if (tone === 'casual' && numRating >= 4) {
    draft = `Such a great experience at ${bizName}! ${itemsText ? `Really loved ${itemsText}. ` : 'Super friendly vibes and everything went smoothly. '}${staff ? `Big thanks to ${staff}! ` : ''}Will definitely be back again soon 😊✨`;
  }

  return draft;
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

