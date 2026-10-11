import type { ResourceArticle } from '../types';

export const RESOURCE_ARTICLES: ResourceArticle[] = [
  {
    id: 'nutrition-and-feeding',
    title: 'Nutrition and Feeding: Crafting a Balanced Diet',
    category: 'Daily Health',
    readingTime: '5 min read',
    iconName: 'Utensils',
    colorScheme: 'mint',
    shortDescription: 'Essential guidelines on calorie balance, life-stage nutrition, proper portion control, and foods strictly toxic to pets.',
    fullContent: {
      overview: 'Proper nutrition is the cornerstone of lifelong wellness for both dogs and cats. From weaning puppies and kittens to supporting senior animals with joint supplements, nutritional requirements evolve dramatically throughout their lives. Quality proteins, digestible fats, fiber, vitamins, and minerals must be balanced accurately to prevent obesity, pancreatitis, and kidney strain.',
      keyPoints: [
        'Select AAFCO-compliant complete feeds tailored to life stage (growth, adult maintenance, senior).',
        'Measure every meal with a digital scale or measuring cup rather than free-feeding to curb canine and feline obesity.',
        'Never feed grapes, raisins, onions, garlic, chocolate, xylitol (birch sugar), or cooked poultry bones.',
        'Always ensure unrestricted access to clean, fresh water refreshed twice daily in clean stainless or ceramic bowls.'
      ],
      vetAdvice: 'Schedule an annual weight evaluation with your veterinarian. Even a 10% reduction in excess weight can significantly increase lifespan and postpone arthritis onset.',
      checklist: [
        'Establish fixed meal times morning and evening.',
        'Store dry kibble in airtight containers to preserve omega fatty acids.',
        'Gradually transition new diets over 7–10 days to avert gastrointestinal distress.',
        'Keep emergency toxic ingestion contact numbers saved on your phone.'
      ]
    }
  },
  {
    id: 'vaccination-and-veterinary-care',
    title: 'Vaccination & Veterinary Care: Preventative Milestones',
    category: 'Preventative Care',
    readingTime: '6 min read',
    iconName: 'ShieldCheck',
    colorScheme: 'sky',
    shortDescription: 'A complete roadmap for puppy/kitten core vaccines, annual boosters, parasite prevention, and routine wellness exams.',
    fullContent: {
      overview: 'Preventative veterinary care protects your pet from lethal contagious diseases and catches asymptomatic conditions like early renal failure or periodontal disease before irreversible damage occurs. Establishing a trusting relationship with a local veterinary clinic should begin in the first week of bringing your pet home.',
      keyPoints: [
        'Core canine vaccines: Rabies, DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza).',
        'Core feline vaccines: Rabies, FVRCP (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia).',
        'Monthly broad-spectrum flea, tick, and heartworm preventatives are non-negotiable throughout warm and humid seasons.',
        'Biannual dental checks reduce the incidence of systemic heart and kidney complications caused by oral bacteria.'
      ],
      vetAdvice: 'Never skip rabies booster intervals required by municipal law. Keep an organized physical vaccination passport and digital copies stored in cloud storage for boarding or emergency visits.',
      checklist: [
        'Complete the primary 8-week, 12-week, and 16-week puppy/kitten vaccine series.',
        'Administer deworming treatments every 3 to 6 months as recommended.',
        'Microchip your pet during sterilization and verify registry contact information annually.',
        'Perform annual blood panels for pets aged 7 years and older.'
      ]
    }
  },
  {
    id: 'grooming-and-coat-hygiene',
    title: 'Grooming & Coat Hygiene: Head-to-Tail Health',
    category: 'Hygiene & Comfort',
    readingTime: '4 min read',
    iconName: 'Sparkles',
    colorScheme: 'lilac',
    shortDescription: 'Brush routines, safe bathing techniques, nail clipping guidelines, ear cleaning, and preventing matting discomfort.',
    fullContent: {
      overview: 'Grooming is more than superficial aesthetic care; regular grooming sessions serve as a tactile health inspection where owners spot skin lumps, ticks, ear mites, or hot spots early. Regular brushing stimulates skin blood flow, distributes natural oils, and prevents painful hair matting that pulls tightly on delicate skin.',
      keyPoints: [
        'Brush short coats weekly; double coats (e.g. Labradors, Retrievers) and long-haired felines require daily deshedding brushing.',
        'Use only pH-balanced pet shampoos; human soap strips the natural protective sebum barrier and causes acute dermatitis.',
        'Trim nails every 3–4 weeks avoiding the sensitive quick (blood vessel); maintain styptic powder nearby during trimming.',
        'Inspect ears weekly for foul odor, dark coffee-ground wax, or redness indicative of yeast infections.'
      ],
      vetAdvice: 'Desensitize paws, ears, and teeth gently with reward treats from day one. Short, positive 2-minute grooming sessions build long-term trust without stress.',
      checklist: [
        'Slicker brush and undercoat rake appropriate for your pet’s coat type.',
        'Pet-safe claw clippers with safety guard.',
        'Alcohol-free veterinary ear wash and cotton rounds (never insert cotton swabs into ear canals).',
        'Enzyme-based pet toothpaste and finger toothbrush.'
      ]
    }
  },
  {
    id: 'training-and-behavioral-enrichment',
    title: 'Training & Behavioral Enrichment: Positive Reinforcement',
    category: 'Behavior & Training',
    readingTime: '7 min read',
    iconName: 'Brain',
    colorScheme: 'sand',
    shortDescription: 'Science-backed force-free training, crate acclimation, managing separation anxiety, and stimulating mental games.',
    fullContent: {
      overview: 'Modern behavioral science overwhelmingly validates positive reinforcement — rewarding desired actions with high-value treats, praise, or play — over punitive correction. Constructive mental enrichment burns as much energy as physical exercise, curbing boredom-induced chewing, barking, and destructive stress behaviors.',
      keyPoints: [
        'Mark desired actions within 1.5 seconds using a clicker or crisp verbal cue ("Yes!") followed immediately by a treat.',
        'Keep sessions brief and upbeat (5 to 10 minutes, 2–3 times a day) rather than long, frustrating marathons.',
        'Provide daily mental puzzles: lick mats, snuffle mats, frozen Kongs, and scent exploration games.',
        'Treat crate training as a tranquil personal den, never using the crate as a punitive time-out enclosure.'
      ],
      vetAdvice: 'If your rescue pet displays resource guarding or fear reactivity, consult an IAABC-certified behavior consultant early before patterns consolidate.',
      checklist: [
        'High-value pea-sized training treats (freeze-dried liver, chicken, cheese).',
        'Standard 6-foot flat leash (avoid dangerous retractable flexi-leads).',
        'Snuffle mat or puzzle feeder for mealtime enrichment.',
        'Comfortable Y-shaped no-pull harness that preserves shoulder biomechanics.'
      ]
    }
  },
  {
    id: 'preparing-a-home-for-a-pet',
    title: 'Preparing a Home for a Pet: Pet-Proofing & Setup',
    category: 'Home Preparation',
    readingTime: '5 min read',
    iconName: 'Home',
    colorScheme: 'blush',
    shortDescription: 'How to pet-proof rooms, set up safe sensory quiet zones, eliminate hazards, and welcome your adopted companion smoothly.',
    fullContent: {
      overview: 'Bringing a pet into a new living space can be overwhelming for them. Taking proactive steps to eliminate household hazards and setting up a dedicated "decompression sanctuary" ensures a peaceful first week and prevents preventable accidents, escapes, or accidental poisonings.',
      keyPoints: [
        'Secure electrical wires with protective cord channels and ensure window screens or balcony grilles are securely fastened.',
        'Remove toxic indoor house plants (lilies are lethal to cats, pothos, zz plants, dieffenbachia cause severe irritation).',
        'Lock trash bins and elevate cleaning chemicals, prescription medications, and essential oil diffusers.',
        'Prepare a dedicated quiet decompression corner equipped with their bed, water, food, and familiar blanket.'
      ],
      vetAdvice: 'Follow the proven 3-3-3 Rule: In the first 3 days your pet feels overwhelmed; in 3 weeks they begin settling into routine; by 3 months they feel secure and bonded.',
      checklist: [
        'Inspect floors from your pet’s eye-level for small objects, rubber bands, and dropped pills.',
        'Fasten baby gates or pet barriers if cordoning off unproofed zones.',
        'Set up litter box in a quiet, low-traffic spot with one box per cat plus one extra.',
        'Place food and water dishes away from the litter area.'
      ]
    }
  },
  {
    id: 'responsible-adoption-and-commitment',
    title: 'Responsible Adoption: Lifelong Commitment & Care',
    category: 'Adoption Guide',
    readingTime: '6 min read',
    iconName: 'HeartHandshake',
    colorScheme: 'accent',
    shortDescription: 'Understanding the 10-15 year promise, budgeting expenses, shelter compatibility assessments, and adopting with empathy.',
    fullContent: {
      overview: 'Adoption is not just a heartwarming rescue event; it is a profound multi-year promise to care for a living being through youth, prime years, medical ailments, and twilight seniority. Understanding your lifestyle constraints, financial requirements, and emotional patience ensures a mutually joyful lifelong bond.',
      keyPoints: [
        'Forecast realistic annual costs including premium food, medical insurance, vaccines, tick preventatives, grooming, and boarding.',
        'Select pets aligned with your activity level and living space rather than visual aesthetics alone.',
        'Commit to patient post-adoption decompression; rescue shelter animals often need weeks to reveal their authentic personalities.',
        'Ensure all household members, landlords, and family members are fully aligned and supportive prior to adoption.'
      ],
      vetAdvice: 'Always spay and neuter rescue companions. Desexing reduces roaming behaviors, aggression, testicular/ovarian cancers, and curbs the tragic cycle of stray animal overpopulation.',
      checklist: [
        'Draft an estimated annual pet budget including emergency medical funds.',
        'Verify residential pet permissions, lease agreements, and community rules.',
        'Schedule home visits or shelter meet-and-greets with all resident animals.',
        'Prepare your mindset for patience, consistency, and unconditional companionship.'
      ]
    }
  }
];
