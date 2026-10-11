import type { User } from '../types/auth';

const AUTH_STORAGE_KEY = 'safetail_auth_user_v1';
const REGISTERED_USERS_KEY = 'safetail_registered_users_v1';

// Get currently logged-in user from localStorage
export function getCurrentUser(): User | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch (error) {
    console.error('Failed to parse current user from storage:', error);
    return null;
  }
}

// Persist or remove logged-in user session
export function setCurrentUser(user: User | null): void {
  try {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Failed to persist auth session:', error);
  }
}

// Get mock registered users database
function getRegisteredUsers(): Array<{ user: User; passwordHash: string }> {
  try {
    const raw = localStorage.getItem(REGISTERED_USERS_KEY);
    if (!raw) {
      // Default mock users
      const initial = [
        {
          user: {
            id: 'usr-001',
            name: 'Pooja Sharma',
            email: 'pooja.sharma@example.com',
            provider: 'local' as const,
            role: 'adopter' as const,
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
          },
          passwordHash: 'password123',
        },
        {
          user: {
            id: 'usr-admin',
            name: 'Shelter Staff Admin',
            email: 'admin@safetail.org',
            provider: 'local' as const,
            role: 'shelter_staff' as const,
          },
          passwordHash: 'admin123',
        },
      ];
      localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Local email/password login
 * -------------------------------------------------------------
 * BACKEND INTEGRATION NOTE:
 * When connecting to your real backend, replace this implementation with:
 *
 * const res = await fetch('/api/v1/auth/login', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify({ email, password })
 * });
 * const data = await res.json();
 * return data.user;
 */
export async function loginWithLocal(email: string, password: string): Promise<User> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 600));

  const trimmedEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();
  const existing = users.find((u) => u.user.email.toLowerCase() === trimmedEmail);

  if (!existing) {
    // For convenience in mock mode: auto-create if not existing, or check password
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: trimmedEmail.split('@')[0].replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase()),
      email: trimmedEmail,
      provider: 'local',
      role: 'adopter',
      createdAt: new Date().toISOString(),
    };
    users.push({ user: newUser, passwordHash: password });
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
    setCurrentUser(newUser);
    return newUser;
  }

  if (existing.passwordHash !== password) {
    throw new Error('Invalid email or password. Please try again.');
  }

  setCurrentUser(existing.user);
  return existing.user;
}

/**
 * Local registration
 * -------------------------------------------------------------
 * BACKEND INTEGRATION NOTE:
 * Replace with:
 * const res = await fetch('/api/v1/auth/register', { ... });
 */
export async function registerWithLocal(
  name: string,
  email: string,
  password: string
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 600));

  const trimmedEmail = email.trim().toLowerCase();
  const users = getRegisteredUsers();

  if (users.some((u) => u.user.email.toLowerCase() === trimmedEmail)) {
    throw new Error('An account with this email already exists. Please log in.');
  }

  const newUser: User = {
    id: `usr-${Date.now()}`,
    name: name.trim(),
    email: trimmedEmail,
    provider: 'local',
    role: 'adopter',
    createdAt: new Date().toISOString(),
  };

  users.push({ user: newUser, passwordHash: password });
  localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  setCurrentUser(newUser);
  return newUser;
}

/**
 * Google OAuth sign-in
 * -------------------------------------------------------------
 * BACKEND INTEGRATION NOTE:
 * When connecting to your real backend, replace this mock with:
 *
 * // Example for Supabase:
 * const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
 *
 * // Or Google Identity Services:
 * window.google.accounts.id.prompt();
 */
export async function loginWithGoogle(): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 700));

  // Mock authenticated Google account
  const googleUser: User = {
    id: `goog-${Date.now()}`,
    name: 'Aditya Gupta',
    email: 'adityagupta32007@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
    provider: 'google',
    role: 'adopter',
    createdAt: new Date().toISOString(),
  };

  setCurrentUser(googleUser);
  return googleUser;
}

// Sign out
export function logoutUser(): void {
  setCurrentUser(null);
}
