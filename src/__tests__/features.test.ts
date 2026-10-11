import { describe, it, expect, beforeEach } from 'vitest';
import { RESOURCE_ARTICLES } from '../data/articlesData';
import {
  getFeedbackList,
  addFeedbackSubmission,
  updateFeedbackStatus,
  deleteFeedbackSubmission,
  resetDemoDataToDefault
} from '../utils/storage';

describe('Feature 1: Pet-Care Resources', () => {
  it('contains exactly six educational articles', () => {
    expect(RESOURCE_ARTICLES.length).toBe(6);
  });

  it('covers all six required core subjects', () => {
    const requiredTitles = [
      'Nutrition and Feeding',
      'Vaccination & Veterinary Care',
      'Grooming & Coat Hygiene',
      'Training & Behavioral Enrichment',
      'Preparing a Home for a Pet',
      'Responsible Adoption'
    ];

    requiredTitles.forEach((req) => {
      const found = RESOURCE_ARTICLES.some((article) => article.title.includes(req.split(' ')[0]));
      expect(found).toBe(true);
    });
  });

  it('each article has required fields: iconName, title, shortDescription, readingTime, fullContent', () => {
    RESOURCE_ARTICLES.forEach((article) => {
      expect(article.id).toBeDefined();
      expect(article.title.length).toBeGreaterThan(5);
      expect(article.shortDescription.length).toBeGreaterThan(15);
      expect(article.readingTime).toMatch(/\d+ min read/);
      expect(article.iconName).toBeDefined();
      expect(article.fullContent.overview.length).toBeGreaterThan(50);
      expect(article.fullContent.keyPoints.length).toBeGreaterThanOrEqual(3);
      expect(article.fullContent.checklist.length).toBeGreaterThanOrEqual(3);
      expect(article.fullContent.vetAdvice.length).toBeGreaterThan(20);
    });
  });
});

describe('Feature 2: Feedback, Reviews & Ratings System', () => {
  // Mock localStorage for node environment
  let mockStore: Record<string, string> = {};

  beforeEach(() => {
    mockStore = {};
    globalThis.localStorage = {
      getItem: (key: string) => mockStore[key] || null,
      setItem: (key: string, val: string) => {
        mockStore[key] = String(val);
      },
      removeItem: (key: string) => {
        delete mockStore[key];
      },
      clear: () => {
        mockStore = {};
      },
      length: 0,
      key: () => null,
    };
  });

  it('initializes default demo feedback if storage is empty', () => {
    const list = getFeedbackList();
    expect(list.length).toBeGreaterThan(0);
    expect(list.some((item) => item.status === 'New')).toBe(true);
    expect(list.some((item) => item.status === 'Resolved')).toBe(true);
  });

  it('adds a new feedback submission with default status "New" and stores in localStorage', () => {
    const newSub = addFeedbackSubmission({
      name: 'Simulated Adopter',
      email: 'adopter@test.com',
      rating: 5,
      category: 'Adoption Experience',
      title: 'Flawless experience',
      message: 'Adopted an indie pup smoothly and received great follow-up advice.',
      isPublicReview: true,
    });

    expect(newSub.id).toMatch(/^fb-/);
    expect(newSub.status).toBe('New');

    const retrieved = getFeedbackList();
    expect(retrieved[0].id).toBe(newSub.id);
    expect(retrieved[0].title).toBe('Flawless experience');
  });

  it('updates submission status between New, Reviewed, and Resolved', () => {
    const list = getFeedbackList();
    const targetId = list[0].id;

    const updated1 = updateFeedbackStatus(targetId, 'Reviewed');
    expect(updated1.find((item) => item.id === targetId)?.status).toBe('Reviewed');

    const updated2 = updateFeedbackStatus(targetId, 'Resolved');
    expect(updated2.find((item) => item.id === targetId)?.status).toBe('Resolved');
  });

  it('deletes feedback submission properly', () => {
    const list = getFeedbackList();
    const initialCount = list.length;
    const targetId = list[0].id;

    const updated = deleteFeedbackSubmission(targetId);
    expect(updated.length).toBe(initialCount - 1);
    expect(updated.find((item) => item.id === targetId)).toBeUndefined();
  });

  it('resets demo data to original defaults', () => {
    // Add custom item
    addFeedbackSubmission({
      name: 'Temporary',
      rating: 1,
      category: 'General Feedback',
      title: 'Temp',
      message: 'Temporary message for test.',
      isPublicReview: false,
    });

    const resetList = resetDemoDataToDefault();
    expect(resetList.some((item) => item.name === 'Temporary')).toBe(false);
  });

  it('respects privacy requirement: private reviews have isPublicReview = false', () => {
    const list = getFeedbackList();
    const privateReviews = list.filter((item) => !item.isPublicReview);
    expect(privateReviews.length).toBeGreaterThan(0);

    // Verify public reviews filter
    const publicOnly = list.filter((item) => item.isPublicReview);
    publicOnly.forEach((item) => {
      expect(item.isPublicReview).toBe(true);
    });
  });
});

import {
  getCurrentUser,
  loginWithLocal,
  registerWithLocal,
  loginWithGoogle,
  logoutUser
} from '../utils/auth';

describe('Feature 3: Authentication (Local & Google OAuth with Backend-Ready Hooks)', () => {
  it('returns null when no user session is stored', () => {
    logoutUser();
    expect(getCurrentUser()).toBeNull();
  });

  it('authenticates with Google and creates a user session', async () => {
    const googleUser = await loginWithGoogle();
    expect(googleUser.provider).toBe('google');
    expect(googleUser.email).toContain('@');
    expect(getCurrentUser()?.email).toBe(googleUser.email);
  });

  it('registers a new user locally with email and password', async () => {
    const newUser = await registerWithLocal('Test User', 'test.user@safetail.org', 'securePass123');
    expect(newUser.name).toBe('Test User');
    expect(newUser.provider).toBe('local');
    expect(getCurrentUser()?.email).toBe('test.user@safetail.org');
  });

  it('logs in an existing local user with correct credentials', async () => {
    const loggedIn = await loginWithLocal('test.user@safetail.org', 'securePass123');
    expect(loggedIn.email).toBe('test.user@safetail.org');
  });

  it('rejects local login with incorrect password', async () => {
    await expect(loginWithLocal('test.user@safetail.org', 'wrongPassword')).rejects.toThrow();
  });

  it('clears session on logout', () => {
    logoutUser();
    expect(getCurrentUser()).toBeNull();
  });
});

