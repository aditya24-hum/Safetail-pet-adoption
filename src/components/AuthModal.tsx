import React, { useState } from 'react';
import type { User, AuthMode } from '../types/auth';
import { loginWithLocal, registerWithLocal, loginWithGoogle } from '../utils/auth';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, AlertCircle, CheckCircle2, PawPrint } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: AuthMode;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onAuthSuccess,
}) => {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLocalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
    }

    setLoading(true);

    try {
      let user: User;
      if (mode === 'login') {
        user = await loginWithLocal(email, password);
        setSuccessNotice(`Welcome back, ${user.name}!`);
      } else {
        user = await registerWithLocal(name, email, password);
        setSuccessNotice(`Account created successfully! Welcome to Safetail, ${user.name}!`);
      }

      setTimeout(() => {
        onAuthSuccess(user);
        onClose();
      }, 700);
    } catch (err: any) {
      setError(err?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSubmit = async () => {
    setError(null);
    setLoading(true);

    try {
      const user = await loginWithGoogle();
      setSuccessNotice(`Signed in with Google as ${user.name}!`);
      setTimeout(() => {
        onAuthSuccess(user);
        onClose();
      }, 700);
    } catch (err: any) {
      setError(err?.message || 'Google authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-card rounded-3xl border border-border shadow-lift overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Decorative Header */}
        <div className="bg-secondary/40 border-b border-border px-6 py-6 text-center relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-full text-muted-foreground hover:bg-card hover:text-primary transition-colors cursor-pointer"
            aria-label="Close Auth Modal"
          >
            <X className="size-5" />
          </button>

          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xs mb-3">
            <PawPrint className="size-6" />
          </div>

          <h2 id="auth-modal-title" className="font-display text-2xl text-primary font-bold">
            {mode === 'login' ? 'Welcome Back to Safetail' : 'Join the Safetail Family'}
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            {mode === 'login'
              ? 'Sign in to access your adoption applications and bookmarks.'
              : 'Create an account to browse, adopt, and connect with shelters.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="mt-4 flex rounded-full bg-secondary p-1 border border-border/60">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
              }}
              className={`flex-1 rounded-full py-1.5 text-xs font-bold transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-card text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('register');
                setError(null);
              }}
              className={`flex-1 rounded-full py-1.5 text-xs font-bold transition-all cursor-pointer ${
                mode === 'register'
                  ? 'bg-card text-primary shadow-xs'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Register
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-4">
          {/* Success Notice */}
          {successNotice && (
            <div className="rounded-2xl border border-emerald-300 bg-mint/40 p-3 text-xs flex items-center gap-2.5 text-emerald-950 font-medium">
              <CheckCircle2 className="size-4 text-emerald-700 shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}

          {/* Error Notice */}
          {error && (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/10 p-3 text-xs flex items-center gap-2.5 text-destructive font-medium">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* 1. Google OAuth Option */}
          <div>
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSubmit}
              className="w-full flex items-center justify-center gap-3 rounded-full border border-border bg-card py-2.5 px-4 text-xs font-bold text-primary shadow-xs hover:bg-secondary/70 transition-all cursor-pointer disabled:opacity-50"
            >
              {/* Google G Logo SVG */}
              <svg className="size-4.5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative bg-card px-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Or with email
              </span>
            </div>
          </div>

          {/* 2. Local Email/Password Form */}
          <form onSubmit={handleLocalSubmit} className="space-y-3.5">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-primary mb-1">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvi Joshi"
                    className="w-full rounded-2xl border border-input bg-card py-2 pl-10 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-primary mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-2xl border border-input bg-card py-2 pl-10 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-primary mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-input bg-card py-2 pl-10 pr-10 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-primary cursor-pointer p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-primary mb-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full rounded-2xl border border-input bg-card py-2 pl-10 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="size-3.5 rounded accent-accent cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to demo email.')}
                  className="font-bold text-accent hover:underline cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-accent text-accent-foreground font-bold py-2.5 px-4 text-xs shadow-soft hover:bg-accent/90 cursor-pointer disabled:opacity-60 transition-all mt-2"
            >
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In to Safetail'
                : 'Create Safetail Account'}
            </button>
          </form>

          {/* Backend Connection Notice */}
          <div className="pt-2 text-center border-t border-border/60">
            <p className="text-[11px] text-muted-foreground">
              ⚡ <strong>Ready for backend:</strong> Hooks in <code className="text-primary font-mono">src/utils/auth.ts</code> are prepared to wire into Supabase, Firebase, or your REST API.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
