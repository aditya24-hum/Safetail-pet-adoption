import React, { useState } from 'react';
import type { ResourceArticle } from '../types';
import {
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  Share2,
  Utensils,
  ShieldCheck,
  Sparkles,
  Brain,
  Home,
  HeartHandshake
} from 'lucide-react';

interface ArticleModalProps {
  article: ResourceArticle | null;
  onClose: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Utensils,
  ShieldCheck,
  Sparkles,
  Brain,
  Home,
  HeartHandshake,
};

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  const [completedChecklist, setCompletedChecklist] = useState<Record<number, boolean>>({});
  const [bookmarked, setBookmarked] = useState(false);
  const [copyNotice, setCopyNotice] = useState(false);

  if (!article) return null;

  const IconComponent = iconMap[article.iconName] || BookOpenIcon;

  function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
    return <Sparkles {...props} />;
  }

  const toggleCheck = (index: number) => {
    setCompletedChecklist((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyNotice(true);
    setTimeout(() => setCopyNotice(false), 2500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-card rounded-3xl border border-border shadow-lift overflow-hidden max-h-[90vh] flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="border-b border-border bg-secondary/30 p-6 sm:p-8 flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <span
              className={`flex size-14 shrink-0 items-center justify-center rounded-2xl shadow-xs ${
                article.colorScheme === 'mint'
                  ? 'bg-mint text-mint-foreground'
                  : article.colorScheme === 'sky'
                  ? 'bg-sky text-sky-foreground'
                  : article.colorScheme === 'lilac'
                  ? 'bg-lilac text-lilac-foreground'
                  : article.colorScheme === 'sand'
                  ? 'bg-sand text-sand-foreground'
                  : article.colorScheme === 'blush'
                  ? 'bg-blush text-blush-foreground'
                  : 'bg-accent/20 text-accent'
              }`}
            >
              <IconComponent className="size-7" />
            </span>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                  {article.category}
                </span>
                <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground">
                  <Clock className="size-3.5" />
                  {article.readingTime}
                </span>
              </div>

              <h2 id="article-modal-title" className="font-display text-2xl sm:text-3xl text-primary leading-tight">
                {article.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-primary transition-colors cursor-pointer"
            aria-label="Close Article"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Action Toolbar */}
          <div className="flex items-center justify-between pb-3 border-b border-border/60 text-xs">
            <span className="text-muted-foreground font-medium">
              Verified by Veterinary & Shelter Advisory Panel
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-semibold transition-colors cursor-pointer ${
                  bookmarked
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-primary hover:bg-secondary/80'
                }`}
              >
                <Bookmark className="size-3.5" />
                <span>{bookmarked ? 'Bookmarked' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 rounded-full bg-secondary text-primary px-3 py-1 font-semibold hover:bg-secondary/80 transition-colors cursor-pointer"
              >
                <Share2 className="size-3.5" />
                <span>{copyNotice ? 'Link Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>

          {/* Detailed Overview */}
          <div>
            <h3 className="font-display text-xl text-primary mb-2">Detailed Guide & Context</h3>
            <p className="text-sm leading-relaxed text-foreground/90">
              {article.fullContent.overview}
            </p>
          </div>

          {/* Key Points */}
          <div className="rounded-2xl border border-border bg-card p-5 space-y-3">
            <h4 className="font-display text-lg text-primary">Core Veterinary Principles</h4>
            <ul className="space-y-2.5">
              {article.fullContent.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2.5 text-sm text-foreground/90">
                  <CheckCircle2 className="size-4.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Vet Advice Callout */}
          <div className="rounded-2xl border border-amber-200 bg-sand/30 p-5 flex items-start gap-3.5">
            <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-amber-900 mb-1">Expert Veterinary Note</h4>
              <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed">
                {article.fullContent.vetAdvice}
              </p>
            </div>
          </div>

          {/* Interactive Checklist */}
          <div className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-display text-lg text-primary">Interactive Preparation Checklist</h4>
              <span className="text-xs font-semibold text-muted-foreground">
                Click to track your readiness
              </span>
            </div>

            <div className="space-y-2">
              {article.fullContent.checklist.map((item, index) => {
                const isChecked = !!completedChecklist[index];
                return (
                  <label
                    key={index}
                    onClick={() => toggleCheck(index)}
                    className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                      isChecked
                        ? 'border-mint bg-mint/30 text-primary line-through opacity-85'
                        : 'border-border bg-card text-foreground/90 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="size-4.5 rounded text-accent mt-0.5 cursor-pointer accent-accent"
                    />
                    <span className="text-sm font-medium">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-border bg-card px-6 py-4 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Have further questions? Consult a licensed vet.
          </p>
          <button
            onClick={onClose}
            className="rounded-full bg-primary text-primary-foreground font-semibold px-6 py-2.5 text-xs hover:bg-primary/90 cursor-pointer shadow-xs"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
