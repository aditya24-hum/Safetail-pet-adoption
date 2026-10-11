export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: 'local' | 'google';
  role?: 'adopter' | 'shelter_staff' | 'admin';
  createdAt?: string;
}

export type AuthMode = 'login' | 'register';
