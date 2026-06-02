import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';

export function LoginPage() {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    if (mode === 'login') {
      const { error } = await signIn(email, password);
      if (error) setError(error);
    } else {
      const { error } = await signUp(email, password);
      if (error) setError(error);
      else setSuccess('Account created! You can now sign in.');
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #0c1724 0%, #111e2d 45%, #0a1a28 100%)' }}
    >
      {/* Ambient glow elements */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(109,204,194,0.12) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%',
          left: '-8%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(230,109,56,0.10) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '40%',
          left: '20%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(53,85,116,0.18) 0%, transparent 70%)',
        }}
      />

      {/* Grid overlay for texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="w-full max-w-[400px] relative z-10">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-10">
          {/* Logo icon */}
          <div className="relative w-14 h-14 mb-5">
            <span
              className="absolute top-1 left-1 w-8 h-8 rounded-full"
              style={{ background: '#e66d38', filter: 'blur(1px)', opacity: 0.9 }}
            />
            <span
              className="absolute bottom-1 right-1 w-8 h-8 rounded-full"
              style={{ background: '#6dccc2', filter: 'blur(1px)', opacity: 0.9 }}
            />
          </div>
          <h1
            className="font-bold tracking-tight leading-none"
            style={{ fontSize: '42px', color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            moja
          </h1>
          <p
            className="mt-2 text-[10px] font-bold uppercase"
            style={{ color: 'rgba(255,255,255,0.3)', letterSpacing: '0.22em' }}
          >
            Behavioral Services
          </p>
          <div
            className="mt-4 px-3 py-1 rounded-full text-[11px] font-semibold"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.4)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            Scheduler — Admin Portal
          </div>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            boxShadow: '0 32px 64px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset',
          }}
        >
          {/* Tab switcher */}
          <div
            className="flex rounded-xl p-1 mb-7"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            {(['login', 'signup'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="flex-1 py-2 text-[13px] font-semibold rounded-lg transition-all duration-200"
                style={
                  mode === m
                    ? {
                        background: 'rgba(255,255,255,0.10)',
                        color: 'rgba(255,255,255,0.92)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                      }
                    : { color: 'rgba(255,255,255,0.35)' }
                }
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                className="block text-[12px] font-bold uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}
              >
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@mojaaba.com"
                className="w-full px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 outline-none"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.9)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(109,204,194,0.5)';
                  e.currentTarget.style.background = 'rgba(109,204,194,0.06)';
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(109,204,194,0.1)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Password */}
            <div>
              <label
                className="block text-[12px] font-bold uppercase mb-2"
                style={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em' }}
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm font-medium transition-all duration-150 outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'rgba(255,255,255,0.9)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(109,204,194,0.5)';
                    e.currentTarget.style.background = 'rgba(109,204,194,0.06)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(109,204,194,0.1)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Feedback */}
            {error && (
              <div
                className="px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: '#fca5a5',
                }}
              >
                {error}
              </div>
            )}
            {success && (
              <div
                className="px-4 py-3 rounded-xl text-sm font-medium"
                style={{
                  background: 'rgba(109,204,194,0.1)',
                  border: '1px solid rgba(109,204,194,0.2)',
                  color: '#6dccc2',
                }}
              >
                {success}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 disabled:opacity-50"
              style={{
                background: loading
                  ? 'rgba(230,109,56,0.7)'
                  : 'linear-gradient(135deg, #e66d38 0%, #c95a28 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 16px rgba(230,109,56,0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>
        </div>

        <p
          className="text-center mt-6 text-[11px]"
          style={{ color: 'rgba(255,255,255,0.18)' }}
        >
          Moja Behavioral Services &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
