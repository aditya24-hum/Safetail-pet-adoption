import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { BrowsePets } from './components/BrowsePets';
import { WhatWeOffer } from './components/WhatWeOffer';
import { PetCareResources } from './components/PetCareResources';
import { FeedbackReviews } from './components/FeedbackReviews';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import type { FeedbackSubmission } from './types';
import type { User, AuthMode } from './types/auth';
import { getFeedbackList } from './utils/storage';
import { getCurrentUser, logoutUser } from './utils/auth';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [submissions, setSubmissions] = useState<FeedbackSubmission[]>([]);

  // Auth State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('login');

  // Initialize feedback and auth from localStorage
  useEffect(() => {
    const list = getFeedbackList();
    setSubmissions(list);

    const user = getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // Smooth navigation handler
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Auth Open Modal
  const handleOpenAuth = (mode: AuthMode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  // Logout Handler
  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
  };

  // Add submission handler
  const handleSubmissionAdded = (newSub: FeedbackSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  // Update submissions handler (e.g., status changes or deletes in admin dashboard)
  const handleSubmissionsUpdated = (updatedList: FeedbackSubmission[]) => {
    setSubmissions(updatedList);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-mint selection:text-mint-foreground">
      {/* Top Header Navigation */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        reviewCount={submissions.filter((s) => s.isPublicReview).length}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBrowsePets={() => handleNavigate('pets')}
          onExploreResources={() => handleNavigate('pet-care')}
          onViewReviews={() => handleNavigate('reviews')}
        />

        {/* How It Works (6 steps) */}
        <HowItWorks />

        {/* Browse Pets (with filters & profile modal) */}
        <BrowsePets currentUser={currentUser} />

        {/* What Safetail Offers */}
        <WhatWeOffer />

        {/* FEATURE 1: Pet-Care Resources (6 educational articles & Read More modal) */}
        <PetCareResources />

        {/* FEATURE 2A: Feedback, Reviews & Ratings System */}
        <FeedbackReviews
          submissions={submissions}
          onSubmissionAdded={handleSubmissionAdded}
          currentUser={currentUser}
        />

        {/* FEATURE 2B: Demo Admin Dashboard */}
        <AdminDashboard
          submissions={submissions}
          onSubmissionsUpdated={handleSubmissionsUpdated}
        />
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Login & Register Modal with Google & Local */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
};

export default App;
