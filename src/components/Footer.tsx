import React from 'react';
import { PawPrint, Heart, BookOpen, MessageSquare, LayoutDashboard } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-8 border-b border-primary-foreground/15">
          {/* Column 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <PawPrint className="size-5" />
              </span>
              <span className="font-display text-2xl font-bold tracking-tight">
                Safe<span className="text-accent">tail</span>
              </span>
            </div>
            <p className="text-xs text-primary-foreground/75 leading-relaxed">
              Safetail connects loving homes with stray and shelter animals in India. Ethical, transparent, and non-profit pet adoptions.
            </p>
            <p className="text-xs text-accent font-semibold flex items-center gap-1">
              <Heart className="size-3.5 fill-accent" /> Adopt · Care · Better tomorrow
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-3 uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('pets')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  Browse Available Pets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-accent transition-colors cursor-pointer text-left"
                >
                  How Adoption Works (6 Steps)
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Features */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-3 uppercase tracking-wider">
              Features
            </h4>
            <ul className="space-y-2 text-xs text-primary-foreground/80">
              <li>
                <button
                  onClick={() => onNavigate('pet-care')}
                  className="hover:text-accent transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <BookOpen className="size-3" />
                  <span>Pet-Care Educational Library</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-accent transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <MessageSquare className="size-3" />
                  <span>Adopter Reviews & Ratings</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('admin')}
                  className="hover:text-accent transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <LayoutDashboard className="size-3" />
                  <span>Admin Demo Portal</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Shelter Partners & Hours */}
          <div>
            <h4 className="font-display text-sm font-bold text-primary-foreground mb-3 uppercase tracking-wider">
              Partner Shelters
            </h4>
            <p className="text-xs text-primary-foreground/75 leading-relaxed">
              Operating across Pune, Mumbai, Nashik & Nagpur. Verified non-profit animal rescue centers.
            </p>
            <div className="mt-3 text-xs text-primary-foreground/60">
              Emergency Helpline: +91 1800-SAFE-PET
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Safetail — Pet Adoption & Care Platform.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('pet-care')}
              className="hover:underline cursor-pointer"
            >
              Veterinary Resources
            </button>
            <button
              onClick={() => onNavigate('reviews')}
              className="hover:underline cursor-pointer"
            >
              Feedback System
            </button>
            <button
              onClick={() => onNavigate('admin')}
              className="hover:underline cursor-pointer"
            >
              Admin Controls
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
