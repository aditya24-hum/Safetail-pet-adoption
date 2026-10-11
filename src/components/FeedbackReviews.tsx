import React, { useState, useMemo, useEffect } from 'react';
import type { FeedbackSubmission, FeedbackCategory } from '../types';
import type { User } from '../types/auth';
import { addFeedbackSubmission } from '../utils/storage';
import {
  Star,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  Lock,
  RotateCcw,
  SlidersHorizontal,
  ThumbsUp
} from 'lucide-react';

interface FeedbackReviewsProps {
  submissions: FeedbackSubmission[];
  onSubmissionAdded: (newSub: FeedbackSubmission) => void;
  currentUser?: User | null;
}

const CATEGORIES: FeedbackCategory[] = [
  'Adoption Experience',
  'Pet-Care Resources',
  'Shelter & Staff Support',
  'Website & Accessibility',
  'General Feedback',
];

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: '1 - Needs improvement',
  2: '2 - Fair experience',
  3: '3 - Satisfactory & helpful',
  4: '4 - Very good & caring',
  5: '5 - Exceptional experience!',
};

export const FeedbackReviews: React.FC<FeedbackReviewsProps> = ({
  submissions,
  onSubmissionAdded,
  currentUser,
}) => {
  // Form state
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [category, setCategory] = useState<FeedbackCategory>('Adoption Experience');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [isPublic, setIsPublic] = useState(true);

  // Sync with currentUser when logged in or switched
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  // Validation & alerts
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reviews list filter & sort
  const [sortBy, setSortBy] = useState<'newest' | 'highest'>('newest');
  const [starFilter, setStarFilter] = useState<number | 'all'>('all');

  // Filter only public reviews for the public review section
  const publicReviews = useMemo(() => {
    return submissions.filter((sub) => sub.isPublicReview);
  }, [submissions]);

  // Overall rating statistics
  const stats = useMemo(() => {
    if (publicReviews.length === 0) return { avg: 0, count: 0, breakdown: {} };
    const sum = publicReviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = sum / publicReviews.length;
    const breakdown: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    publicReviews.forEach((r) => {
      breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
    });
    return { avg, count: publicReviews.length, breakdown };
  }, [publicReviews]);

  // Sort and filter reviews
  const displayedReviews = useMemo(() => {
    let list = [...publicReviews];

    if (starFilter !== 'all') {
      list = list.filter((r) => r.rating === starFilter);
    }

    if (sortBy === 'newest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'highest') {
      list.sort((a, b) => b.rating - a.rating || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [publicReviews, starFilter, sortBy]);

  // Validate form
  const validateForm = (): boolean => {
    const errs: Record<string, string> = {};

    if (rating === 0) {
      errs.rating = 'Please click to select a rating from 1 to 5 stars.';
    }

    if (!title.trim()) {
      errs.title = 'Title is required. Please give your review a summary.';
    } else if (title.trim().length < 4) {
      errs.title = 'Title must be at least 4 characters.';
    }

    if (!message.trim()) {
      errs.message = 'Detailed message is required.';
    } else if (message.trim().length < 10) {
      errs.message = 'Please provide at least 10 characters in your message.';
    }

    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email.trim())) {
      errs.email = 'Please provide a valid email format (e.g., name@domain.com).';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newSub = addFeedbackSubmission({
        name: name.trim() || 'Verified Adopter',
        email: email.trim() || undefined,
        rating,
        category,
        title: title.trim(),
        message: message.trim(),
        isPublicReview: isPublic,
      });

      onSubmissionAdded(newSub);
      setIsSubmitting(false);
      setSuccessMessage(
        isPublic
          ? 'Thank you! Your review has been submitted and published below.'
          : 'Thank you! Your private feedback has been logged directly for shelter administration review.'
      );

      // Form reset
      setRating(5);
      setHoverRating(0);
      setCategory('Adoption Experience');
      setTitle('');
      setMessage('');
      setName('');
      setEmail('');
      setIsPublic(true);
      setErrors({});

      setTimeout(() => {
        setSuccessMessage(null);
      }, 6000);
    }, 300);
  };

  return (
    <section id="reviews" className="border-t border-border bg-secondary/30 py-16 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
            <MessageSquare className="size-3.5" />
            Adopter Voices & Feedback
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">
            Community Reviews & Ratings
          </h2>
          <p className="mt-2 text-muted-foreground">
            Share your adoption journey or suggest improvements. All submissions are stored locally in demo mode.
          </p>

          {/* Prominent Demo Notice */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-sand-foreground/20 bg-sand/60 px-4 py-1 text-xs font-bold text-sand-foreground">
            <span>⚡ Demo Content: Reviews and administrative submissions persist in browser localStorage.</span>
          </div>
        </div>

        {/* Main 2-Column Layout: Form & Stats/Reviews */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* Left Column (5 cols): Feedback Form */}
          <div className="lg:col-span-5 rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-soft">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div>
                <h3 className="font-display text-xl text-primary">Submit Your Feedback</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Your rating helps future pet parents adopt with confidence.
                </p>
              </div>
              <Sparkles className="size-5 text-accent" />
            </div>

            {/* Success Alert */}
            {successMessage && (
              <div className="mt-4 rounded-2xl border border-emerald-300 bg-mint/40 p-4 text-xs flex items-start gap-3 animate-in fade-in-0 duration-200">
                <CheckCircle2 className="size-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="text-emerald-950 font-medium leading-relaxed">
                  {successMessage}
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Interactive 1-5 Star Rating */}
              <div>
                <label className="block text-xs font-bold text-primary mb-1.5">
                  Your Rating *
                </label>
                <div className="flex items-center gap-1.5" role="group" aria-label="Rating from 1 to 5 stars">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const activeStar = hoverRating ? star <= hoverRating : star <= rating;
                    return (
                      <button
                        type="button"
                        key={star}
                        onClick={() => {
                          setRating(star);
                          if (errors.rating) {
                            setErrors((prev) => ({ ...prev, rating: '' }));
                          }
                        }}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        aria-label={`${star} Star${star > 1 ? 's' : ''}`}
                        className="p-1 cursor-pointer transition-transform hover:scale-120 focus:outline-none"
                      >
                        <Star
                          className={`size-7 transition-colors ${
                            activeStar
                              ? 'fill-amber-400 text-amber-500'
                              : 'text-muted-foreground/30 hover:text-muted-foreground/60'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-bold text-primary">
                    {RATING_DESCRIPTIONS[hoverRating || rating] || 'Select rating'}
                  </span>
                </div>
                {errors.rating && (
                  <p className="mt-1 text-xs text-destructive font-semibold flex items-center gap-1">
                    <AlertCircle className="size-3" /> {errors.rating}
                  </p>
                )}
              </div>

              {/* Category Dropdown */}
              <div>
                <label className="block text-xs font-bold text-primary mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as FeedbackCategory)}
                  className="w-full rounded-2xl border border-input bg-card px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div>
                <label className="block text-xs font-bold text-primary mb-1.5">
                  Review Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                  }}
                  placeholder="e.g. Incredibly supportive shelter team & seamless adoption"
                  className={`w-full rounded-2xl border bg-card px-3.5 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-ring ${
                    errors.title ? 'border-destructive' : 'border-input'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-destructive font-semibold flex items-center gap-1">
                    <AlertCircle className="size-3" /> {errors.title}
                  </p>
                )}
              </div>

              {/* Message Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-primary">
                    Detailed Message *
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    {message.length}/500
                  </span>
                </div>
                <textarea
                  rows={3}
                  maxLength={500}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                  }}
                  placeholder="Share details of your experience, staff interactions, or resource suggestions..."
                  className={`w-full rounded-2xl border bg-card p-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring ${
                    errors.message ? 'border-destructive' : 'border-input'
                  }`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive font-semibold flex items-center gap-1">
                    <AlertCircle className="size-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Optional Name & Email */}
              <div className="grid gap-3 sm:grid-cols-2 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Your Name <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya R."
                    className="w-full rounded-2xl border border-input bg-card px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-primary mb-1">
                    Email Address <span className="text-muted-foreground font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    placeholder="e.g. priya@example.com"
                    className={`w-full rounded-2xl border bg-card px-3.5 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring ${
                      errors.email ? 'border-destructive' : 'border-input'
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-[11px] text-destructive font-semibold">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Privacy Notice on Email */}
              <p className="text-[11px] text-muted-foreground flex items-center gap-1.5 bg-secondary/50 p-2.5 rounded-xl">
                <Lock className="size-3.5 text-accent shrink-0" />
                <span>
                  <strong>Privacy Guaranteed:</strong> Email addresses and private feedback are kept confidential and never displayed on public reviews.
                </span>
              </p>

              {/* Public Review Checkbox */}
              <label className="flex items-center gap-2.5 cursor-pointer pt-1 text-xs text-primary font-semibold">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="size-4 rounded accent-accent cursor-pointer"
                />
                <span>Publish as public community review</span>
              </label>

              {/* Form Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRating(5);
                    setTitle('');
                    setMessage('');
                    setName('');
                    setEmail('');
                    setErrors({});
                  }}
                  className="rounded-full border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground hover:bg-secondary cursor-pointer flex items-center gap-1"
                >
                  <RotateCcw className="size-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground font-semibold py-2.5 px-5 text-xs shadow-soft hover:bg-accent/90 cursor-pointer disabled:opacity-60"
                >
                  <Send className="size-3.5" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column (7 cols): Ratings Overview & Public Reviews List */}
          <div className="lg:col-span-7 space-y-6">
            {/* Rating Summary Card */}
            <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
              <div className="grid gap-6 sm:grid-cols-12 items-center">
                {/* Big Score */}
                <div className="sm:col-span-5 text-center sm:text-left sm:border-r sm:border-border/60 sm:pr-6">
                  <div className="font-display text-5xl font-black text-primary leading-none">
                    {stats.avg.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-1 my-2 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`size-4 ${
                          s <= Math.round(stats.avg) ? 'fill-current' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">
                    Based on {stats.count} community reviews
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-mint-foreground bg-mint px-2.5 py-1 rounded-full">
                    <ThumbsUp className="size-3" />
                    <span>98% Positive Adoption Rate</span>
                  </div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="sm:col-span-7 space-y-1.5 text-xs">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    const count = stats.breakdown[stars] || 0;
                    const pct = stats.count > 0 ? (count / stats.count) * 100 : 0;
                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="w-10 text-muted-foreground font-bold flex items-center gap-1">
                          {stars} <Star className="size-3 text-amber-500 fill-current" />
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-6 text-right text-muted-foreground font-medium text-[11px]">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Controls Bar: Sort & Filter */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-card p-3 rounded-2xl border border-border">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1">
                  <SlidersHorizontal className="size-3.5" />
                  Filter:
                </span>
                <button
                  onClick={() => setStarFilter('all')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold cursor-pointer transition-all ${
                    starFilter === 'all'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                  }`}
                >
                  All Stars
                </button>
                {[5, 4, 3].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStarFilter(s)}
                    className={`rounded-full px-3 py-1 text-xs font-semibold cursor-pointer transition-all ${
                      starFilter === s
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {s} ★
                  </button>
                ))}
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'highest')}
                  className="rounded-xl border border-input bg-card px-2.5 py-1 text-xs font-bold text-primary focus:outline-none cursor-pointer"
                >
                  <option value="newest">Newest First</option>
                  <option value="highest">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Reviews Cards List */}
            {displayedReviews.length === 0 ? (
              <div className="text-center rounded-3xl border border-dashed border-border p-8 bg-card">
                <p className="text-sm text-muted-foreground">
                  No public reviews match your selected filter.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {displayedReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="rounded-3xl border border-border bg-card p-5 sm:p-6 shadow-soft transition-all hover:shadow-md"
                  >
                    {/* Review Header */}
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display text-base font-bold text-primary">
                            {rev.name}
                          </h4>
                          <span className="rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-mint-foreground">
                            Verified Adopter
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          {new Date(rev.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>

                      {/* Stars & Category */}
                      <div className="text-right">
                        <div className="flex items-center gap-0.5 text-amber-500">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`size-3.5 ${
                                s <= rev.rating ? 'fill-current' : 'text-muted-foreground/30'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="inline-block mt-1 text-[11px] font-semibold text-accent">
                          {rev.category}
                        </span>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="mt-3">
                      <h5 className="font-bold text-primary text-sm leading-snug">
                        {rev.title}
                      </h5>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {rev.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
