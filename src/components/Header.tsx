import React, { useState } from 'react';
import type { User } from '../types/auth';
import {
  PawPrint,
  Menu,
  X,
  Shield,
  BookOpen,
  MessageSquare,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  ChevronDown
} from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  reviewCount: number;
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  reviewCount,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'pets', label: 'Browse Pets' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'pet-care', label: 'Pet Care', icon: BookOpen, badge: 'New' },
    { id: 'reviews', label: 'Reviews & Feedback', icon: MessageSquare, badge: reviewCount ? `${reviewCount}` : undefined },
    { id: 'admin', label: 'Admin Demo', icon: LayoutDashboard, badge: 'Demo' },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5 py-3">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 cursor-pointer focus:outline-none shrink-0"
          aria-label="Safetail Home"
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105">
            <PawPrint className="size-5" />
          </span>
          <span className="font-display text-2xl leading-none font-bold text-primary tracking-tight">
            Safe<span className="text-accent">tail</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-secondary text-primary shadow-xs font-bold'
                    : 'text-muted-foreground hover:bg-secondary/60 hover:text-primary'
                }`}
              >
                {Icon && <Icon className="size-3.5 opacity-70" />}
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold uppercase ${
                      item.badge === 'Demo'
                        ? 'bg-sand text-sand-foreground'
                        : item.badge === 'New'
                        ? 'bg-mint text-mint-foreground'
                        : 'bg-accent/20 text-accent'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Auth Buttons & User Profile */}
        <div className="flex items-center gap-2">
          {currentUser ? (
            /* Logged In User Pill Dropdown */
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-bold text-primary shadow-xs hover:bg-secondary/60 transition-colors cursor-pointer"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="size-6 rounded-full object-cover border border-border"
                  />
                ) : (
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground text-[10px]">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="hidden sm:inline max-w-[100px] truncate">{currentUser.name}</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>

              {userDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card p-2 shadow-lift z-50 text-xs animate-in fade-in-0 duration-150"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-2 border-b border-border/60">
                    <p className="font-bold text-primary truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{currentUser.email}</p>
                    <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-mint-foreground">
                      <span>via {currentUser.provider === 'google' ? 'Google' : 'Email'}</span>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('pets');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-primary hover:bg-secondary flex items-center gap-2 cursor-pointer font-semibold"
                    >
                      <UserIcon className="size-3.5 text-accent" />
                      <span>My Adoption Requests</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-border/60">
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-destructive hover:bg-destructive/10 flex items-center gap-2 cursor-pointer font-bold"
                    >
                      <LogOut className="size-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out Buttons */
            <>
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:inline-flex items-center justify-center rounded-full font-semibold transition-all text-primary hover:bg-secondary h-9 px-4 text-xs cursor-pointer"
              >
                Log in
              </button>

              <button
                onClick={() => onOpenAuth('register')}
                className="inline-flex items-center justify-center gap-1.5 rounded-full font-semibold transition-all bg-accent text-accent-foreground shadow-soft hover:bg-accent/90 hover:shadow-lift h-9 px-4 text-xs cursor-pointer"
              >
                <Shield className="size-3.5" />
                <span>Register</span>
              </button>
            </>
          )}

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex size-10 items-center justify-center rounded-full text-primary hover:bg-secondary cursor-pointer ml-1"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-5 py-4 shadow-lg transition-all">
          {currentUser && (
            <div className="mb-3 p-3 rounded-2xl bg-secondary/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-xs text-primary">{currentUser.name}</p>
                <p className="text-[11px] text-muted-foreground">{currentUser.email}</p>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onLogout();
                }}
                className="text-xs font-bold text-destructive hover:underline cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-secondary text-primary font-bold'
                      : 'text-muted-foreground hover:bg-secondary/40 hover:text-primary'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {Icon && <Icon className="size-4" />}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                        item.badge === 'Demo'
                          ? 'bg-sand text-sand-foreground'
                          : 'bg-mint text-mint-foreground'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {!currentUser && (
              <div className="mt-3 pt-3 border-t border-border grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="rounded-full border border-border py-2 text-xs font-bold text-primary text-center hover:bg-secondary"
                >
                  Log in
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('register');
                  }}
                  className="rounded-full bg-accent text-accent-foreground py-2 text-xs font-bold text-center hover:bg-accent/90"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
