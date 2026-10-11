import React, { useState, useEffect } from 'react';
import type { Pet } from '../types';
import type { User } from '../types/auth';
import { X, MapPin, CheckCircle2, Heart, Shield, Phone, Mail, Building2, Send } from 'lucide-react';

interface PetDetailsModalProps {
  pet: Pet | null;
  onClose: () => void;
  currentUser?: User | null;
}

export const PetDetailsModal: React.FC<PetDetailsModalProps> = ({ pet, onClose, currentUser }) => {
  const [showAdoptForm, setShowAdoptForm] = useState(false);
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [applicantEmail, setApplicantEmail] = useState(currentUser?.email || '');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [housingType, setHousingType] = useState('Apartment');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setApplicantName(currentUser.name);
      setApplicantEmail(currentUser.email);
    }
  }, [currentUser]);

  if (!pet) return null;

  const handleSubmitAdoption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) {
      alert('Please fill in all contact fields.');
      return;
    }
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pet-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-card rounded-3xl border border-border shadow-lift overflow-hidden max-h-[90vh] flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close Button */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-secondary">
          <img
            src={pet.image}
            alt={pet.name}
            className="size-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex size-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/80 transition-colors cursor-pointer"
            aria-label="Close Pet Details"
          >
            <X className="size-5" />
          </button>

          <div className="absolute bottom-4 left-4 flex gap-2">
            <span className="rounded-full bg-mint px-3.5 py-1 text-xs font-bold text-mint-foreground shadow-sm">
              {pet.species}
            </span>
            <span className="rounded-full bg-card/90 backdrop-blur-xs px-3.5 py-1 text-xs font-bold text-primary shadow-sm flex items-center gap-1">
              <MapPin className="size-3 text-accent" />
              {pet.city}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 id="pet-modal-title" className="font-display text-3xl text-primary">{pet.name}</h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                {pet.breed} · {pet.age} · {pet.gender}
              </p>
            </div>

            {!submitted && (
              <button
                onClick={() => setShowAdoptForm(!showAdoptForm)}
                className="inline-flex items-center gap-2 rounded-full font-semibold transition-all bg-accent text-accent-foreground shadow-soft hover:bg-accent/90 h-10 px-5 text-sm cursor-pointer"
              >
                <Heart className="size-4 fill-accent-foreground" />
                <span>{showAdoptForm ? 'Back to Profile' : 'Apply to Adopt'}</span>
              </button>
            )}
          </div>

          {submitted ? (
            /* Mock Submission Confirmation */
            <div className="rounded-2xl border border-mint bg-mint/30 p-6 text-center space-y-3">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-mint text-mint-foreground">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="font-display text-2xl text-primary">Adoption Request Received!</h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Thank you, <strong>{applicantName}</strong>! Your application for <strong>{pet.name}</strong> has been logged.
                The shelter representative from <strong>{pet.shelter}</strong> will contact you via email ({applicantEmail}) within 24–48 hours to arrange a meet-and-greet.
              </p>
              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="rounded-full bg-primary text-primary-foreground font-semibold px-6 py-2.5 text-xs hover:bg-primary/90 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : showAdoptForm ? (
            /* Interactive Adoption Form */
            <form onSubmit={handleSubmitAdoption} className="space-y-4 rounded-2xl border border-border bg-secondary/30 p-5">
              <h3 className="font-display text-xl text-primary">Adoption Application for {pet.name}</h3>
              <p className="text-xs text-muted-foreground">
                Please provide your contact details so the shelter team can review your profile.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="e.g. Tanvi Joshi"
                    className="w-full rounded-xl border border-input bg-card px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="e.g. tanvi@example.com"
                    className="w-full rounded-xl border border-input bg-card px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-input bg-card px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-primary mb-1">Housing Type</label>
                  <select
                    value={housingType}
                    onChange={(e) => setHousingType(e.target.value)}
                    className="w-full rounded-xl border border-input bg-card px-3.5 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value="Apartment">Apartment / Flat</option>
                    <option value="Independent House">Independent Villa / House</option>
                    <option value="Farmhouse">Farmhouse / Acreage</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdoptForm(false)}
                  className="rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground hover:bg-secondary cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground font-semibold px-5 py-2 text-xs shadow-soft hover:bg-accent/90 cursor-pointer"
                >
                  <Send className="size-3.5" />
                  <span>Submit Application</span>
                </button>
              </div>
            </form>
          ) : (
            /* Regular Profile Details */
            <>
              <div>
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">About {pet.name}</h4>
                <p className="mt-2 text-sm text-foreground/90 leading-relaxed">{pet.description}</p>
              </div>

              {/* Health Badges */}
              <div className="rounded-2xl border border-border bg-secondary/40 p-4">
                <h4 className="text-xs font-bold text-primary mb-2 flex items-center gap-1.5">
                  <Shield className="size-4 text-accent" />
                  Verified Medical History
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`size-4 ${pet.vaccinated ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                    <span>{pet.vaccinated ? 'Fully Vaccinated & Dewormed' : 'Vaccination in progress'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`size-4 ${pet.neutered ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                    <span>{pet.neutered ? 'Sterilized / Neutered' : 'Sterilization planned'}</span>
                  </div>
                </div>
              </div>

              {/* Shelter & Contact */}
              <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Caring Shelter & Location</h4>
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Building2 className="size-4 text-accent" />
                  <span>{pet.shelter}</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs text-muted-foreground pt-1">
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5" />
                    {pet.contact}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-3.5" />
                    +91 (020) 2567-8890
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
