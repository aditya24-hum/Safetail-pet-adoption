import React, { useState, useMemo } from 'react';
import type { ResourceArticle } from '../types';
import { RESOURCE_ARTICLES } from '../data/articlesData';
import { ArticleModal } from './ArticleModal';
import {
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Sparkles,
  Utensils,
  ShieldCheck,
  Brain,
  Home,
  HeartHandshake
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
  Utensils,
  ShieldCheck,
  Sparkles,
  Brain,
  Home,
  HeartHandshake,
};

export const PetCareResources: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<ResourceArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Daily Health',
    'Preventative Care',
    'Hygiene & Comfort',
    'Behavior & Training',
    'Home Preparation',
    'Adoption Guide',
  ];

  const filteredArticles = useMemo(() => {
    return RESOURCE_ARTICLES.filter((article) => {
      const matchesSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <section id="pet-care" className="mx-auto max-w-6xl px-5 py-16 scroll-mt-20">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-accent bg-accent/10 px-3 py-1 rounded-full">
            <BookOpen className="size-3.5" />
            Educational Library
          </span>
          <h2 className="mt-2 font-display text-3xl md:text-4xl text-primary">
            Pet-Care Resources & Guides
          </h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Six comprehensive, veterinary-reviewed educational guides to support first-time and seasoned pet parents throughout their adoption journey.
          </p>
        </div>

        {/* Article Search Box */}
        <div className="relative w-full md:w-72">
          <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search pet care topics..."
            aria-label="Search pet care articles"
            className="w-full rounded-full border border-input bg-card px-4 py-2 pl-10 text-sm shadow-xs focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="mt-6 flex flex-wrap gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-card border border-border text-muted-foreground hover:bg-secondary hover:text-primary'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 6 Educational Articles Grid */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map((article) => {
          const IconComponent = iconMap[article.iconName] || Sparkles;
          return (
            <article
              key={article.id}
              className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift flex flex-col justify-between"
            >
              <div>
                {/* Icon & Reading Time Header */}
                <div className="flex items-center justify-between">
                  <span
                    className={`flex size-13 items-center justify-center rounded-2xl shadow-xs transition-transform duration-300 group-hover:scale-105 ${
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
                        : 'bg-accent/15 text-accent'
                    }`}
                  >
                    <IconComponent className="size-6" />
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-muted-foreground bg-secondary/80 px-3 py-1 rounded-full">
                    <Clock className="size-3.5" />
                    <span>{article.readingTime}</span>
                  </div>
                </div>

                {/* Category Pill */}
                <div className="mt-4">
                  <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-1 font-display text-xl text-primary group-hover:text-accent transition-colors leading-snug">
                  {article.title}
                </h3>

                {/* Short Description */}
                <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {article.shortDescription}
                </p>
              </div>

              {/* Functional Read More Button */}
              <div className="mt-6 pt-4 border-t border-border/60">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-primary/25 bg-card py-2.5 px-4 text-xs font-bold text-primary transition-all duration-200 hover:border-primary/60 hover:bg-secondary group-hover:bg-primary group-hover:text-primary-foreground cursor-pointer shadow-xs"
                >
                  <span>Read More</span>
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Read More Modal */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
};
