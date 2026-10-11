import React from 'react';
import { UserPlus, PawPrint, Search, FileText, ShieldCheck, Home } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'User Registration & Login',
      description: 'Create a free profile to track applications and bookmark pets you adore.',
      icon: UserPlus,
      bg: 'bg-mint text-mint-foreground',
    },
    {
      step: 2,
      title: 'Browse Pets',
      description: 'Explore available dogs, cats, and rabbits with filters for age and city.',
      icon: PawPrint,
      bg: 'bg-secondary text-secondary-foreground',
    },
    {
      step: 3,
      title: 'View Pet Profile',
      description: 'Check medical records, sterilization status, personality traits, and shelter history.',
      icon: Search,
      bg: 'bg-lilac text-lilac-foreground',
    },
    {
      step: 4,
      title: 'Submit Adoption Request',
      description: 'Fill out the simple application form describing your home and daily schedule.',
      icon: FileText,
      bg: 'bg-sky text-sky-foreground',
    },
    {
      step: 5,
      title: 'Review & Approval',
      description: 'Our partner rescue coordinators verify requirements and schedule a meet & greet.',
      icon: ShieldCheck,
      bg: 'bg-sand text-sand-foreground',
    },
    {
      step: 6,
      title: 'Adoption Completed',
      description: 'Sign the adoption pledge and welcome your new furry family member home!',
      icon: Home,
      bg: 'bg-blush text-blush-foreground',
    },
  ];

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-5 py-16 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">Transparent & Gentle Process</span>
          <h2 className="mt-1 font-display text-3xl md:text-4xl text-primary">How adoption works</h2>
          <p className="mt-2 text-muted-foreground max-w-xl">
            Six simple, supportive steps from your initial search to welcoming your companion into their forever home.
          </p>
        </div>
      </div>

      <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((item) => {
          const Icon = item.icon;
          return (
            <li
              key={item.step}
              className="group rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="flex items-center justify-between">
                <span className={`flex size-12 items-center justify-center rounded-2xl ${item.bg} shadow-xs`}>
                  <Icon className="size-6" />
                </span>
                <span className="font-display text-sm font-bold text-muted-foreground/80 tracking-wide uppercase">
                  Step {item.step}
                </span>
              </div>
              <h3 className="mt-4 font-display text-lg text-primary group-hover:text-accent transition-colors">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
};
