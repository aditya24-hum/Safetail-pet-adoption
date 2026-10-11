import React, { useState, useMemo } from 'react';
import type { Pet } from '../types';
import type { User } from '../types/auth';
import { PETS_DATA } from '../data/petsData';
import { PetDetailsModal } from './PetDetailsModal';
import { Search, MapPin, ChevronDown, Filter, X } from 'lucide-react';

interface BrowsePetsProps {
  currentUser?: User | null;
}

export const BrowsePets: React.FC<BrowsePetsProps> = ({ currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);

  const cities = ['All', 'Pune', 'Mumbai', 'Nashik', 'Nagpur'];
  const speciesList = ['All', 'Dog', 'Cat', 'Rabbit'];

  const filteredPets = useMemo(() => {
    return PETS_DATA.filter((pet) => {
      const matchesSearch =
        searchQuery === '' ||
        pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pet.city.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecies =
        selectedSpecies === 'All' || pet.species.toLowerCase() === selectedSpecies.toLowerCase();

      const matchesCity = selectedCity === 'All' || pet.city.toLowerCase() === selectedCity.toLowerCase();

      return matchesSearch && matchesSpecies && matchesCity;
    });
  }, [searchQuery, selectedSpecies, selectedCity]);

  const hasActiveFilters = searchQuery !== '' || selectedSpecies !== 'All' || selectedCity !== 'All';

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSpecies('All');
    setSelectedCity('All');
  };

  return (
    <section id="pets" className="border-y border-border bg-secondary/40 py-16 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5">
        {/* Header & Meta */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Available Companions</span>
            <h2 className="mt-1 font-display text-3xl md:text-4xl text-primary">Pets looking for a home</h2>
            <p className="mt-2 text-muted-foreground">
              {filteredPets.length} of {PETS_DATA.length} pets match your current search.
            </p>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-accent hover:bg-card transition-colors cursor-pointer border border-accent/20"
            >
              <X className="size-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 grid gap-3 rounded-3xl border border-border bg-card p-4 sm:p-5 shadow-soft md:grid-cols-5">
          {/* Search Input */}
          <div className="relative md:col-span-2">
            <Search className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, breed or city"
              aria-label="Search pets"
              className="flex w-full border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-colors file:border-0 placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring h-11 rounded-full pl-10"
            />
          </div>

          {/* Species Dropdown */}
          <div className="relative">
            <select
              value={selectedSpecies}
              onChange={(e) => setSelectedSpecies(e.target.value)}
              aria-label="Filter by Species"
              className="w-full appearance-none border border-input bg-card px-4 py-2 text-sm shadow-xs rounded-full h-11 pr-10 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              <option value="All">All Species</option>
              <option value="Dog">Dogs 🐶</option>
              <option value="Cat">Cats 🐱</option>
              <option value="Rabbit">Rabbits 🐰</option>
            </select>
            <ChevronDown className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 pointer-events-none text-muted-foreground opacity-70" />
          </div>

          {/* City Dropdown */}
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              aria-label="Filter by City"
              className="w-full appearance-none border border-input bg-card px-4 py-2 text-sm shadow-xs rounded-full h-11 pr-10 focus:outline-none focus:ring-1 focus:ring-ring cursor-pointer"
            >
              <option value="All">All Cities</option>
              {cities.filter(c => c !== 'All').map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            <ChevronDown className="absolute top-1/2 right-3.5 size-4 -translate-y-1/2 pointer-events-none text-muted-foreground opacity-70" />
          </div>

          {/* Quick Species Pill Switcher */}
          <div className="flex items-center gap-1">
            {speciesList.map((sp) => (
              <button
                key={sp}
                onClick={() => setSelectedSpecies(sp)}
                className={`flex-1 rounded-full py-2 text-xs font-bold transition-all cursor-pointer text-center ${
                  selectedSpecies === sp
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-primary'
                }`}
              >
                {sp}
              </button>
            ))}
          </div>
        </div>

        {/* Pet Cards Grid */}
        {filteredPets.length === 0 ? (
          <div className="mt-12 text-center rounded-3xl border border-dashed border-border p-12 bg-card">
            <Filter className="mx-auto size-10 text-muted-foreground/50 mb-3" />
            <h3 className="font-display text-xl text-primary">No pets matched your filter</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search criteria or resetting filters to see all available pets.
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 rounded-full bg-accent text-accent-foreground font-semibold px-5 py-2 text-xs shadow-soft hover:bg-accent/90 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className="group overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift cursor-pointer flex flex-col"
              >
                {/* Image */}
                <div className="aspect-square overflow-hidden bg-secondary relative">
                  <img
                    src={pet.image}
                    alt={`${pet.name}, a ${pet.age} old ${pet.breed} available for adoption`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded-full bg-card/90 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-primary shadow-xs">
                    {pet.gender}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-display text-2xl text-primary group-hover:text-accent transition-colors">
                        {pet.name}
                      </h3>
                      <span className="rounded-full bg-mint px-3 py-1 text-xs font-bold text-mint-foreground">
                        {pet.species}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {pet.breed} · {pet.age}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      <MapPin className="size-4 shrink-0" />
                      <span>{pet.city}</span>
                    </p>

                    <span className="text-xs font-bold text-primary group-hover:underline">
                      View Profile &rarr;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pet Details Modal */}
      <PetDetailsModal
        pet={selectedPet}
        onClose={() => setSelectedPet(null)}
        currentUser={currentUser}
      />
    </section>
  );
};
