import React from 'react';
import { PawPrint, Heart, BookOpen, Star, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBrowsePets: () => void;
  onExploreResources: () => void;
  onViewReviews: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onBrowsePets,
  onExploreResources,
  onViewReviews,
}) => {
  return (
    <section className="paw-grid border-b border-border relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-2 md:py-24">
        {/* Left Column: Mission & CTA */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-mint px-4 py-1.5 text-xs font-bold tracking-wide text-mint-foreground uppercase shadow-xs">
            <PawPrint className="size-3.5" />
            Adopt · Care · Better tomorrow
          </span>

          <h1 className="mt-5 font-display text-5xl leading-[1.08] text-primary md:text-6xl tracking-tight">
            Adopt, don't shop.
            <span className="block text-accent">Find your best friend.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg text-muted-foreground leading-relaxed">
            Safetail brings stray and shelter pets together with people ready to give them a loving home —
            browse, read their verified story, study practical care guides, and apply in minutes.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={onBrowsePets}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all bg-accent text-accent-foreground shadow-soft hover:bg-accent/90 hover:shadow-lift h-13 px-8 text-base cursor-pointer"
            >
              <span>Browse pets</span>
              <ArrowRight className="size-4" />
            </button>

            <button
              onClick={onExploreResources}
              className="inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all border-2 border-primary/20 bg-card text-primary hover:border-primary/60 hover:bg-secondary h-13 px-6 text-base cursor-pointer"
            >
              <BookOpen className="size-4 text-accent" />
              <span>Pet-Care Guides</span>
            </button>
          </div>

          {/* Social Proof & Metrics */}
          <div className="mt-10 pt-6 border-t border-border/80 flex items-center gap-6">
            <button
              onClick={onViewReviews}
              className="flex items-center gap-2 text-left group cursor-pointer"
            >
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80"
                  alt="Reviewer 1"
                  className="size-9 rounded-full border-2 border-card object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80"
                  alt="Reviewer 2"
                  className="size-9 rounded-full border-2 border-card object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80"
                  alt="Reviewer 3"
                  className="size-9 rounded-full border-2 border-card object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="size-3.5 fill-current" />
                  <span className="text-xs font-bold text-primary">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-muted-foreground group-hover:text-accent transition-colors font-medium">
                  Verified Adopter Reviews &rarr;
                </p>
              </div>
            </button>

            <div className="h-8 w-px bg-border hidden sm:block" />

            <div className="hidden sm:block">
              <p className="text-sm font-bold text-primary">100% Non-Profit</p>
              <p className="text-xs text-muted-foreground">Certified Local Shelters</p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div className="relative">
          <div className="overflow-hidden rounded-[2.5rem] border-4 border-card shadow-lift bg-secondary/30">
            <img
              src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80"
              alt="Golden retriever puppy and a kitten resting together peacefully"
              className="size-full object-cover aspect-[4/3] hover:scale-102 transition-transform duration-700"
            />
          </div>

          {/* Floating Hero Badge */}
          <div className="absolute -bottom-5 left-6 rounded-2xl bg-card border border-border/80 px-5 py-3 shadow-soft flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-full bg-accent/15 text-accent">
              <Heart className="size-4.5 fill-accent" />
            </span>
            <div>
              <p className="font-display text-lg text-primary leading-none">Small steps, big impact</p>
              <p className="text-xs text-muted-foreground mt-0.5">Over 520+ companion lives transformed</p>
            </div>
          </div>

          {/* Floating Pill */}
          <div className="absolute -top-3 right-6 rounded-full bg-mint border border-mint-foreground/20 px-3.5 py-1 shadow-sm text-xs font-bold text-mint-foreground">
            🐾 100% Ethical Adoption
          </div>
        </div>
      </div>
    </section>
  );
};
