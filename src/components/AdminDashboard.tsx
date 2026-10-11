import React, { useState, useMemo } from 'react';
import type { FeedbackSubmission, FeedbackStatus, FeedbackCategory } from '../types';
import {
  updateFeedbackStatus,
  deleteFeedbackSubmission,
  resetDemoDataToDefault
} from '../utils/storage';
import {
  LayoutDashboard,
  RotateCcw,
  Star,
  Search,
  Filter,
  Trash2,
  Eye,
  Mail,
  Lock,
  Globe,
  X
} from 'lucide-react';

interface AdminDashboardProps {
  submissions: FeedbackSubmission[];
  onSubmissionsUpdated: (newSubmissions: FeedbackSubmission[]) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  submissions,
  onSubmissionsUpdated,
}) => {
  const [statusFilter, setStatusFilter] = useState<'All' | FeedbackStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectModalSub, setInspectModalSub] = useState<FeedbackSubmission | null>(null);

  // Status Metrics
  const metrics = useMemo(() => {
    const total = submissions.length;
    const avgRating = total > 0 ? (submissions.reduce((a, b) => a + b.rating, 0) / total).toFixed(1) : '0.0';
    const newCount = submissions.filter((s) => s.status === 'New').length;
    const reviewedCount = submissions.filter((s) => s.status === 'Reviewed').length;
    const resolvedCount = submissions.filter((s) => s.status === 'Resolved').length;
    const publicCount = submissions.filter((s) => s.isPublicReview).length;
    const privateCount = total - publicCount;

    // Category breakdown
    const catCounts: Record<FeedbackCategory, number> = {
      'Adoption Experience': 0,
      'Pet-Care Resources': 0,
      'Shelter & Staff Support': 0,
      'Website & Accessibility': 0,
      'General Feedback': 0,
    };

    submissions.forEach((s) => {
      if (catCounts[s.category] !== undefined) {
        catCounts[s.category]++;
      }
    });

    return { total, avgRating, newCount, reviewedCount, resolvedCount, publicCount, privateCount, catCounts };
  }, [submissions]);

  // Filtered Submissions List
  const filteredList = useMemo(() => {
    return submissions.filter((item) => {
      const matchStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchCategory = categoryFilter === 'All' || item.category === categoryFilter;
      const matchSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.email && item.email.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchStatus && matchCategory && matchSearch;
    });
  }, [submissions, statusFilter, categoryFilter, searchQuery]);

  // Change Status
  const handleStatusChange = (id: string, newStatus: FeedbackStatus) => {
    const updated = updateFeedbackStatus(id, newStatus);
    onSubmissionsUpdated(updated);
    if (inspectModalSub && inspectModalSub.id === id) {
      setInspectModalSub({ ...inspectModalSub, status: newStatus });
    }
  };

  // Delete
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this feedback submission from demo storage?')) {
      const updated = deleteFeedbackSubmission(id);
      onSubmissionsUpdated(updated);
      if (inspectModalSub?.id === id) {
        setInspectModalSub(null);
      }
    }
  };

  // Reset to default
  const handleResetData = () => {
    if (window.confirm('Reset all demo reviews and feedback to initial defaults?')) {
      const reset = resetDemoDataToDefault();
      onSubmissionsUpdated(reset);
    }
  };

  return (
    <section id="admin" className="mx-auto max-w-6xl px-5 py-16 scroll-mt-20">
      {/* Demo Notice Banner */}
      <div className="rounded-3xl border-2 border-dashed border-amber-300 bg-sand/30 p-5 sm:p-6 mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-800">
            <LayoutDashboard className="size-5" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-amber-500 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider">
                Demo Admin Content
              </span>
              <h3 className="font-display text-lg font-bold text-primary">
                Shelter Operations & Feedback Portal
              </h3>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Simulates shelter staff review controls, status changes, and private feedback handling. All changes persist in your browser's localStorage.
            </p>
          </div>
        </div>

        <button
          onClick={handleResetData}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-400 bg-card px-4 py-2 text-xs font-bold text-amber-900 shadow-xs hover:bg-sand/60 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="size-3.5" />
          <span>Reset Demo Defaults</span>
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Submissions */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Total Submissions
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-black text-primary">
              {metrics.total}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">
              {metrics.publicCount} Public · {metrics.privateCount} Private
            </span>
          </div>
        </div>

        {/* Average Rating */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Average Adopter Rating
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-black text-primary flex items-center gap-1.5">
              {metrics.avgRating}
              <Star className="size-5 fill-amber-400 text-amber-500" />
            </span>
            <span className="text-xs font-bold text-mint-foreground bg-mint px-2 py-0.5 rounded-full">
              Satisfied
            </span>
          </div>
        </div>

        {/* Needs Review */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            New Submissions
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-black text-amber-600">
              {metrics.newCount}
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-100 px-2.5 py-0.5 rounded-full">
              Requires Action
            </span>
          </div>
        </div>

        {/* Resolution Rate */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Processed & Resolved
          </p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="font-display text-3xl font-black text-emerald-700">
              {metrics.reviewedCount + metrics.resolvedCount}
            </span>
            <span className="text-xs font-semibold text-emerald-800 bg-mint px-2 py-0.5 rounded-full">
              {metrics.total > 0 ? Math.round(((metrics.reviewedCount + metrics.resolvedCount) / metrics.total) * 100) : 0}% Complete
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Widget */}
      <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h4 className="font-display text-base font-bold text-primary mb-3">
          Category Distribution & Volume
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs">
          {Object.entries(metrics.catCounts).map(([cat, count]) => {
            const pct = metrics.total > 0 ? Math.round((count / metrics.total) * 100) : 0;
            return (
              <div key={cat} className="rounded-2xl border border-border/80 bg-secondary/30 p-3.5 space-y-2">
                <div className="flex items-center justify-between font-bold text-primary">
                  <span className="truncate pr-1">{cat}</span>
                  <span>{count}</span>
                </div>
                <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-accent rounded-full transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">{pct}% of submissions</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="mt-8 rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center gap-1">
              <Filter className="size-3.5" /> Status:
            </span>
            {(['All', 'New', 'Reviewed', 'Resolved'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  statusFilter === st
                    ? st === 'New'
                      ? 'bg-amber-500 text-white'
                      : st === 'Reviewed'
                      ? 'bg-sky-600 text-white'
                      : st === 'Resolved'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {st}
                {st === 'New' && metrics.newCount > 0 && ` (${metrics.newCount})`}
              </button>
            ))}
          </div>

          {/* Category Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted-foreground font-semibold">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs font-semibold text-primary focus:outline-none cursor-pointer"
            >
              <option value="All">All Categories</option>
              {Object.keys(metrics.catCounts).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative mt-3">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by keywords, author name, or email..."
            aria-label="Search feedback submissions"
            className="w-full rounded-full border border-input bg-card py-2 pl-10 pr-4 text-xs shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Submissions Management List */}
      <div className="mt-6 space-y-3">
        {filteredList.length === 0 ? (
          <div className="text-center rounded-3xl border border-dashed border-border p-10 bg-card">
            <p className="text-sm text-muted-foreground">
              No feedback submissions match your current filters.
            </p>
          </div>
        ) : (
          filteredList.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-border bg-card p-5 shadow-soft transition-all hover:border-primary/40 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display text-base font-bold text-primary">
                      {item.title}
                    </span>

                    {/* Status Pill */}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        item.status === 'New'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : item.status === 'Reviewed'
                          ? 'bg-sky-100 text-sky-800 border border-sky-300'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      }`}
                    >
                      {item.status}
                    </span>

                    {/* Public or Private Indicator */}
                    {item.isPublicReview ? (
                      <span className="flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-primary">
                        <Globe className="size-3 text-accent" /> Public Review
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-blush px-2 py-0.5 text-[10px] font-semibold text-blush-foreground">
                        <Lock className="size-3" /> Private Internal Feedback
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <span className="font-semibold text-foreground">{item.name}</span>
                    {item.email && (
                      <span className="flex items-center gap-1 text-primary">
                        <Mail className="size-3 text-accent" />
                        {item.email}
                      </span>
                    )}
                    <span>·</span>
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>
                      {new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>

                {/* Rating & Actions */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`size-3.5 ${
                          s <= item.rating ? 'fill-current' : 'text-muted-foreground/30'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Status Change Selector */}
                  <div className="relative">
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value as FeedbackStatus)}
                      aria-label="Change status"
                      className="rounded-xl border border-input bg-card px-2.5 py-1 text-xs font-bold text-primary focus:outline-none cursor-pointer pr-6"
                    >
                      <option value="New">Status: New</option>
                      <option value="Reviewed">Status: Reviewed</option>
                      <option value="Resolved">Status: Resolved</option>
                    </select>
                  </div>

                  {/* Action buttons */}
                  <button
                    onClick={() => setInspectModalSub(item)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
                    title="Inspect Feedback"
                    aria-label="Inspect feedback details"
                  >
                    <Eye className="size-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                    title="Delete Submission"
                    aria-label="Delete submission"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>

              {/* Message Preview */}
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-3 rounded-2xl">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Inspect Feedback Modal */}
      {inspectModalSub && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="inspect-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200"
          onClick={() => setInspectModalSub(null)}
        >
          <div
            className="w-full max-w-xl bg-card rounded-3xl border border-border shadow-lift p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-border pb-3">
              <div>
                <span className="rounded-full bg-sand px-3 py-0.5 text-[10px] font-bold text-sand-foreground uppercase">
                  Feedback Inspection
                </span>
                <h3 id="inspect-modal-title" className="font-display text-xl text-primary mt-1">
                  {inspectModalSub.title}
                </h3>
              </div>
              <button
                onClick={() => setInspectModalSub(null)}
                className="p-1 rounded-full text-muted-foreground hover:bg-secondary cursor-pointer"
                aria-label="Close modal"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-secondary/40 p-3.5 rounded-2xl">
                <div>
                  <span className="text-muted-foreground block font-bold">Author:</span>
                  <span className="font-semibold text-primary">{inspectModalSub.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-bold">Email (Admin View):</span>
                  <span className="font-semibold text-primary">{inspectModalSub.email || 'Not provided'}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-bold">Category:</span>
                  <span className="font-semibold text-primary">{inspectModalSub.category}</span>
                </div>
                <div>
                  <span className="text-muted-foreground block font-bold">Submitted Date:</span>
                  <span className="font-semibold text-primary">{new Date(inspectModalSub.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div>
                <span className="text-muted-foreground block font-bold mb-1">Detailed Message:</span>
                <p className="text-sm text-foreground/90 leading-relaxed bg-card p-4 rounded-2xl border border-border">
                  {inspectModalSub.message}
                </p>
              </div>

              {/* Status Update In Modal */}
              <div className="pt-2 flex items-center justify-between border-t border-border">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-primary">Current Status:</span>
                  <select
                    value={inspectModalSub.status}
                    onChange={(e) => handleStatusChange(inspectModalSub.id, e.target.value as FeedbackStatus)}
                    className="rounded-xl border border-input bg-card px-3 py-1.5 text-xs font-bold text-primary focus:outline-none cursor-pointer"
                  >
                    <option value="New">New</option>
                    <option value="Reviewed">Reviewed</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>

                <button
                  onClick={() => setInspectModalSub(null)}
                  className="rounded-full bg-primary text-primary-foreground font-semibold px-5 py-2 text-xs hover:bg-primary/90 cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
