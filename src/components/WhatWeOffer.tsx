import React from 'react';
import { PawPrint, Search, FileText, Heart, Smartphone, Building2 } from 'lucide-react';

export const WhatWeOffer: React.FC = () => {
  const features = [
    { title: 'Pet listing & browsing', icon: PawPrint },
    { title: 'Search & filtering', icon: Search },
    { title: 'Pet profile & details', icon: FileText },
    { title: 'Adoption request', icon: Heart },
    { title: 'Responsive interface', icon: Smartphone },
    { title: 'Shelter & pet information', icon: Building2 },
  ];

  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold uppercase tracking-wider text-accent">Empowering Companionship</span>
        <h2 className="mt-1 font-display text-3xl md:text-4xl text-primary">What Safetail offers</h2>
        <p className="mt-2 text-muted-foreground">
          Everything designed for seamless, ethical adoptions from verified local sanctuaries.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all duration-300 hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon className="size-5" />
              </span>
              <p className="font-semibold text-primary">{feature.title}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
