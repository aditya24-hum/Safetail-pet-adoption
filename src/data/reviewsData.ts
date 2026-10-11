import type { FeedbackSubmission } from '../types';

export const INITIAL_FEEDBACK_DATA: FeedbackSubmission[] = [
  {
    id: 'fb-001',
    name: 'Pooja Sharma',
    email: 'pooja.sharma@example.com',
    rating: 5,
    category: 'Adoption Experience',
    title: 'Found our sweet puppy Bruno through Safetail!',
    message: 'The adoption coordinator connected us directly with the shelter in Pune. The medical records, initial vaccination stamps, and temperament notes were completely transparent. Bruno is thriving in our home!',
    createdAt: '2026-10-09T10:30:00Z',
    status: 'Resolved',
    isPublicReview: true
  },
  {
    id: 'fb-002',
    name: 'Arjun Verma',
    email: 'arjun.v@example.com',
    rating: 5,
    category: 'Pet-Care Resources',
    title: 'The Home Preparation checklist saved our living room!',
    message: 'Before adopting Mishti, we read the preparing a home guide. Removing toxic indoor plants and securing cord lines prevented so many rookie mistakes. Invaluable educational resources for first-time adopters.',
    createdAt: '2026-10-08T15:45:00Z',
    status: 'Reviewed',
    isPublicReview: true
  },
  {
    id: 'fb-003',
    name: 'Meera Iyer',
    email: 'meera.iyer@example.com',
    rating: 4,
    category: 'Shelter & Staff Support',
    title: 'Wonderful guidance and empathetic shelter volunteers',
    message: 'The staff took time to walk us through Raja’s rescue history and routine. Very compassionate people who genuinely prioritize the welfare of rescue animals over fast transactions.',
    createdAt: '2026-10-06T09:15:00Z',
    status: 'Resolved',
    isPublicReview: true
  },
  {
    id: 'fb-004',
    name: 'Rohan Kulkarni',
    email: 'rohan.k@example.com',
    rating: 5,
    category: 'Website & Accessibility',
    title: 'Intuitive filter options and rapid adoption request flow',
    message: 'The interface is exceptionally clean, responsive on mobile phones, and simple to navigate. We filtered by species and city in seconds without annoying popups or clutter.',
    createdAt: '2026-10-05T18:20:00Z',
    status: 'Reviewed',
    isPublicReview: true
  },
  {
    id: 'fb-005',
    name: 'Ananya Deshmukh',
    email: 'ananya.d@example.com',
    rating: 4,
    category: 'General Feedback',
    title: 'High quality experience promoting adoption awareness',
    message: 'Safetail makes adopting feel dignified and secure. The educational articles on nutrition and training offer sound vet-backed principles.',
    createdAt: '2026-10-03T11:00:00Z',
    status: 'New',
    isPublicReview: true
  },
  {
    id: 'fb-006',
    name: 'Kabir Patel',
    email: 'kabir.private@example.com',
    rating: 3,
    category: 'Shelter & Staff Support',
    title: 'Suggesting faster weekend response windows for shelter calls',
    message: 'During busy Sunday afternoons it took our family a few hours to hear back from the shelter coordinator. Would love automated SMS updates for scheduled visiting slots.',
    createdAt: '2026-10-02T14:10:00Z',
    status: 'New',
    isPublicReview: false // Private internal feedback kept out of public reviews
  }
];
