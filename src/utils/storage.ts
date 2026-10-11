import type { FeedbackSubmission, FeedbackStatus } from '../types';
import { INITIAL_FEEDBACK_DATA } from '../data/reviewsData';

const STORAGE_KEY = 'safetail_demo_feedback_v1';

export function getFeedbackList(): FeedbackSubmission[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_FEEDBACK_DATA));
      return INITIAL_FEEDBACK_DATA;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_FEEDBACK_DATA;
  } catch (error) {
    console.error('Error accessing localStorage:', error);
    return INITIAL_FEEDBACK_DATA;
  }
}

export function saveFeedbackList(data: FeedbackSubmission[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

export function addFeedbackSubmission(
  item: Omit<FeedbackSubmission, 'id' | 'createdAt' | 'status'>
): FeedbackSubmission {
  const current = getFeedbackList();
  const newSubmission: FeedbackSubmission = {
    ...item,
    id: `fb-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'New',
  };

  const updated = [newSubmission, ...current];
  saveFeedbackList(updated);
  return newSubmission;
}

export function updateFeedbackStatus(id: string, newStatus: FeedbackStatus): FeedbackSubmission[] {
  const current = getFeedbackList();
  const updated = current.map((item) => (item.id === id ? { ...item, status: newStatus } : item));
  saveFeedbackList(updated);
  return updated;
}

export function deleteFeedbackSubmission(id: string): FeedbackSubmission[] {
  const current = getFeedbackList();
  const updated = current.filter((item) => item.id !== id);
  saveFeedbackList(updated);
  return updated;
}

export function resetDemoDataToDefault(): FeedbackSubmission[] {
  saveFeedbackList(INITIAL_FEEDBACK_DATA);
  return INITIAL_FEEDBACK_DATA;
}
