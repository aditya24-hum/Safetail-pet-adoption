export type Species = 'Dog' | 'Cat' | 'Rabbit';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  city: string;
  image: string;
  description: string;
  vaccinated: boolean;
  neutered: boolean;
  shelter: string;
  contact: string;
}

export interface ResourceArticle {
  id: string;
  title: string;
  category: string;
  readingTime: string;
  iconName: string;
  colorScheme: 'mint' | 'accent' | 'sky' | 'lilac' | 'sand' | 'blush';
  shortDescription: string;
  fullContent: {
    overview: string;
    keyPoints: string[];
    vetAdvice: string;
    checklist: string[];
  };
}

export type FeedbackCategory =
  | 'Adoption Experience'
  | 'Pet-Care Resources'
  | 'Shelter & Staff Support'
  | 'Website & Accessibility'
  | 'General Feedback';

export type FeedbackStatus = 'New' | 'Reviewed' | 'Resolved';

export interface FeedbackSubmission {
  id: string;
  name: string;
  email?: string;
  rating: number; // 1 to 5
  category: FeedbackCategory;
  title: string;
  message: string;
  createdAt: string;
  status: FeedbackStatus;
  isPublicReview: boolean;
}
