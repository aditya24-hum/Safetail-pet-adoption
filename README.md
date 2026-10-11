# Safetail — Pet Adoption & Care Platform

An enhanced frontend implementation matching the **Safetail** pet adoption design system, featuring:
1. **Pet-Care Resources (6 Comprehensive Educational Guides + Interactive Checklists)**
2. **Feedback, Reviews & Ratings System (Interactive Star Ratings + Demo Public Reviews + Demo Admin Operations Portal)**
3. **Authentication System (Google OAuth + Local Email/Password with Backend-Ready Hooks)**

---

## 🚀 Live Demo & Running Instructions

The website is running locally at:
👉 **`http://localhost:4173/`**

To run in development mode with hot-reloading:
```bash
cd C:\Users\tanvi\.gemini\antigravity\scratch\safetail
npm run dev
```

To run test suites:
```bash
npm test
```

To create a production build:
```bash
npm run build
```

---

## 🔐 Authentication System (Google & Local)

Accessible by clicking **Log in** or **Register** in the header.

### Features:
* **Continue with Google**: Multi-colored Google branding button with one-click OAuth simulation and user session creation.
* **Local Email & Password**:
  - Tab switch between **Sign In** and **Register**.
  - Form validation for email structure and password length.
  - Password visibility toggle (show/hide eye button).
  - "Remember me" option and "Forgot password?" prompt.
* **Active User Session & Header Profile**:
  - Displays user avatar / initial badge and first name in the top navigation bar.
  - Interactive profile dropdown menu showing user email, auth provider (*via Google* or *via Email*), and a **Sign Out** button.
  - Automatically pre-populates adopter name & email into the **Pet Adoption Application** and the **Community Feedback Form**.
* **Seamless Backend Integration**:
  - The authentication architecture is abstracted in [`src/utils/auth.ts`](file:///C:/Users/tanvi/.gemini/antigravity/scratch/safetail/src/utils/auth.ts).
  - Contains explicit `TODO` and connection comments showing how to plug into **Supabase**, **Firebase**, or custom REST APIs.

---

## 🐾 Preserved Design System & Brand Identity

* **Typography**: Google Fonts `Baloo 2` (display font) & `Nunito Sans` (body font)
* **Color Palette**:
  - `primary`: deep forest green/slate (`oklch(33% 0.062 158)`)
  - `accent`: vibrant warm orange/terracotta (`oklch(71% 0.169 51)`)
  - `mint`, `sky`, `lilac`, `sand`, `blush` pastel accent system
* **Visual Theme**: `.paw-grid` radial dot canvas, soft rounded cards (`rounded-3xl`), shadows (`shadow-soft` & `shadow-lift`)
* **Original Pages & Features**:
  - **Header**: Navigation bar with logo, dynamic section jumping, user profile menu, and mobile drawer menu
  - **Hero Section**: Mission tagline, hero photo card ("Small steps, big impact"), quick stats
  - **How It Works**: 6-step adoption process cards
  - **Browse Pets**: 6 pets (Bruno, Mishti, Raja, Pixel, Coco, Moti) with interactive search, species/city filtering, and profile modal with mock adoption application form
  - **What Safetail Offers**: 6 feature benefit cards
  - **Footer**: Brand links, non-profit pledge, helpline

---

## 📚 Feature 1: Pet-Care Resources (`#pet-care`)

Responsive section with search & category filters:
1. **Nutrition and Feeding**: Calorie balance, life-stage nutrition, toxic foods list, and fresh water guidelines.
2. **Vaccination & Veterinary Care**: Puppy/kitten core schedule (Rabies, DHPP, FVRCP), preventative parasite control, and annual blood panels.
3. **Grooming & Coat Hygiene**: Brushing double coats, pH-balanced pet shampoos, safe claw clipping, and ear cleaning.
4. **Training & Behavioral Enrichment**: Positive reinforcement, clicker timing, mental puzzles (lick/snuffle mats), and safe harness selection.
5. **Preparing a Home for a Pet**: 3-3-3 decompression rule, pet-proofing electrical cords, removing toxic house plants, and setting up a quiet decompression zone.
6. **Responsible Adoption & Commitment**: 10–15 year commitment, annual budgeting, family consensus, and mandatory spaying/neutering.

### Each Article Features:
* Pastel color-coded category icon badge
* Title & short summary
* Reading time indicator (e.g. `5 min read`)
* **Functional "Read More" Modal** containing:
  - Deep-dive context and veterinarian principles
  - Expert veterinary advice callout alert
  - **Interactive Action Checklist** with real checkable boxes to track your home readiness
  - Bookmark & Share link actions

---

## ⭐ Feature 2: Feedback, Reviews & Ratings System (`#reviews` & `#admin`)

### Part A: Feedback Form & Public Community Reviews
* **Interactive 1–5 Star Rating**: Smooth hover animation with real-time text descriptions (*"1 - Needs improvement"* up to *"5 - Exceptional experience!"*).
* **Category Dropdown**: Adoption Experience, Pet-Care Resources, Shelter & Staff Support, Website & Accessibility, General Feedback.
* **Form Validation**: Required-field validation for rating, title, and minimum 10-character message, with clear error cues.
* **Privacy Controls**: Option to publish publicly or keep private for shelter staff. Email addresses and private submissions are strictly kept out of public reviews.
* **Review Sorting & Filtering**: Sort public reviews by **Newest First** or **Highest Rated**, and filter by star count.
* **Form Reset**: Automatically clears upon submission with a success alert message.

### Part B: Demo Admin Dashboard
* Clearly marked with **⚡ Demo Admin Content** banners.
* **KPI Metrics**: Total Submissions, Average Rating, Submissions Requiring Action, and Resolution Percentage.
* **Category Distribution**: Visual volume breakdown and percentage bars.
* **Status Management**: Switch any submission between **New**, **Reviewed**, and **Resolved** in real-time.
* **Inspection Modal**: View complete message, private submitter email, and timestamp.
* **Reset Demo Data Button**: 1-click restoration of initial demo reviews and sample submissions.
* **LocalStorage Persistence**: All additions, deletions, and status modifications persist across browser sessions.

---

## 🔌 How to Connect Your Backend (Later)

In [`src/utils/auth.ts`](file:///C:/Users/tanvi/.gemini/antigravity/scratch/safetail/src/utils/auth.ts), swap the mock functions with your real backend calls:

### Example: Supabase Auth
```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function loginWithGoogle() {
  return await supabase.auth.signInWithOAuth({ provider: 'google' });
}

export async function loginWithLocal(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}
```

### Example: Custom REST API (Node.js / Express / Python)
```typescript
export async function loginWithLocal(email: string, password: string) {
  const res = await fetch('/api/v1/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}
```
