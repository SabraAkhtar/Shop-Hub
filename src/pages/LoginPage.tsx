import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  User,
  ArrowRight,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import logoImg from '../assets/images/shophub_logo_trimmed.png';

type AuthTab = 'login' | 'register';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup } = useStore();

  const [activeTab, setActiveTab] = useState<AuthTab>('login');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectPath = (location.state as any)?.from || '/';

  // ── Login submit ──────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!loginEmail.trim()) { setError('Please enter your email'); return; }
    if (loginPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    const res = await login(loginEmail, loginPassword);
    setLoading(false);
    if (res.success) navigate(redirectPath);
    else setError(res.error || 'Login failed. Please check your credentials.');
  };

  // ── Register submit ───────────────────────────────────────
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!regName.trim()) { setError('Please enter your full name'); return; }
    if (!regEmail.includes('@')) { setError('Please enter a valid email'); return; }
    if (regPassword.length < 6) { setError('Password must be at least 6 characters'); return; }
    if (regPassword !== regConfirm) { setError('Passwords do not match'); return; }
    setLoading(true);
    const res = await signup(regName, regEmail, regPassword);
    setLoading(false);
    if (res.success) navigate('/products');
    else setError(res.error || 'Registration failed. Please try again.');
  };

  // ── Google demo login ─────────────────────────────────────
  const handleGoogle = async () => {
    setLoading(true);
    try {
      await login('demo@shophub.com', 'password123');
      navigate(redirectPath);
    } catch { navigate(redirectPath); }
    setLoading(false);
  };

  // ── Facebook demo ─────────────────────────────────────────
  const handleFacebook = async () => {
    setLoading(true);
    try {
      await login('demo@shophub.com', 'password123');
      navigate(redirectPath);
    } catch { navigate(redirectPath); }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#EAF8F5] flex items-center justify-center p-4 sm:p-6 lg:p-10 select-none">
      
      {/* ============================================================
          OUTER CARD — same max-width, rounded, shadow
      ============================================================ */}
      <div className="max-w-[920px] w-full rounded-[28px] overflow-hidden shadow-[0_24px_64px_rgba(6,61,55,0.18)] flex flex-col lg:flex-row min-h-[540px]">

        {/* ===========================================================
            LEFT PANEL — Deep teal with decorative arcs & social btns
        =========================================================== */}
        <div className="relative lg:w-[42%] bg-[#063D37] flex flex-col items-center justify-between py-12 px-8 overflow-hidden shrink-0">

          {/* ── Decorative concentric arcs (reference image circles) ── */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {/* Outermost arc */}
            <div className="absolute w-[460px] h-[460px] rounded-full border border-[#078F83]/20" />
            <div className="absolute w-[360px] h-[360px] rounded-full border border-[#078F83]/25" />
            <div className="absolute w-[260px] h-[260px] rounded-full border border-[#078F83]/30" />
            {/* Filled circle top-center (reference moon/planet) */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[220px] h-[220px] rounded-full bg-[#078F83]/25" />
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-[150px] h-[150px] rounded-full bg-[#078F83]/30" />
            {/* Bottom wave blob */}
            <div className="absolute -bottom-20 -left-20 w-[280px] h-[280px] rounded-full bg-[#0A9F91]/15" />
            <div className="absolute -bottom-10 -right-16 w-[200px] h-[200px] rounded-full bg-[#0A9F91]/10" />
          </div>

          {/* Dots pattern */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(#7DD8CF 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* ── Logo top ── */}
          <Link to="/" className="relative z-10 flex items-center justify-center mb-4">
            <img src={logoImg} alt="ShopHub" className="h-10 w-auto object-contain brightness-[10]" />
          </Link>

          {/* ── Centre content ── */}
          <div className="relative z-10 flex flex-col items-center text-center gap-7 flex-1 justify-center">
            <div>
              <p className="text-[#7DD8CF] text-[12px] font-bold tracking-widest uppercase mb-2">
                Welcome to ShopHub
              </p>
              <h2 className="text-white text-[28px] sm:text-[32px] font-extrabold tracking-tight leading-tight">
                Get Started
              </h2>
            </div>

            {/* Social buttons */}
            <div className="w-full flex flex-col gap-3 max-w-[240px]">
              <button
                type="button"
                onClick={handleGoogle}
                className="w-full h-11 rounded-[10px] border border-white/25 bg-white/10 hover:bg-white/20 text-white text-[13.5px] font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer backdrop-blur-sm"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                </svg>
                Sign in with Google
              </button>

              <button
                type="button"
                onClick={handleFacebook}
                className="w-full h-11 rounded-[10px] border border-white/25 bg-white/10 hover:bg-white/20 text-white text-[13.5px] font-semibold flex items-center justify-center gap-2.5 transition-all cursor-pointer backdrop-blur-sm"
              >
                {/* Facebook F icon */}
                <svg className="w-4 h-4 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24">
                  <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.03 4.388 11.026 10.125 11.927v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.1 24 18.104 24 12.073z"/>
                </svg>
                Sign in with Facebook
              </button>
            </div>
          </div>

          {/* ── Bottom tagline ── */}
          <p className="relative z-10 text-[#7DD8CF] text-[11px] font-medium mt-6">
            Shop More • Live Better
          </p>
        </div>

        {/* ===========================================================
            RIGHT PANEL — White, tab switcher + form
        =========================================================== */}
        <div className="flex-1 bg-white flex flex-col justify-center px-8 sm:px-12 py-10">

          {/* ── Tab switcher: Log In | Register ── */}
          <div className="flex items-center justify-end gap-2 mb-8">
            <button
              type="button"
              onClick={() => { setActiveTab('login'); setError(null); }}
              className={`text-[13.5px] font-semibold px-3 py-1 rounded-full transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'text-[#063D37]'
                  : 'text-[#9DB8B2] hover:text-[#063D37]'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('register'); setError(null); }}
              className={`text-[13.5px] font-semibold px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-[#0D7E73] text-white shadow-[0_4px_14px_rgba(13,126,115,0.25)]'
                  : 'bg-[#EAF8F5] text-[#078F83] hover:bg-[#D5EFE8]'
              }`}
            >
              Register
            </button>
          </div>

          {/* ── Heading ── */}
          <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#063D37] tracking-tight mb-6">
            {activeTab === 'login' ? 'Log In' : 'Create Account'}
          </h1>

          {/* ── Error banner ── */}
          {error && (
            <div className="mb-5 p-3 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-700 text-[13px] flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          {/* ============================================================
              LOGIN FORM
          ============================================================ */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">

              {/* Username / Email */}
              <div className="group">
                <label className="block text-[12px] font-bold text-[#9DB8B2] uppercase tracking-widest mb-2" htmlFor="li-email">
                  Username
                </label>
                <div className="relative flex items-center border-b-2 border-[#D5EFE8] focus-within:border-[#078F83] transition-colors pb-1">
                  <input
                    id="li-email"
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter here your name..."
                    className="w-full bg-transparent text-[14px] text-[#063D37] placeholder-[#C0D5D0] focus:outline-none font-medium pr-6"
                  />
                  <Mail className="absolute right-0 w-4 h-4 text-[#9DB8B2] pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <label className="block text-[12px] font-bold text-[#9DB8B2] uppercase tracking-widest mb-2" htmlFor="li-password">
                  Password
                </label>
                <div className="relative flex items-center border-b-2 border-[#D5EFE8] focus-within:border-[#078F83] transition-colors pb-1">
                  <input
                    id="li-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter here your password..."
                    className="w-full bg-transparent text-[14px] text-[#063D37] placeholder-[#C0D5D0] focus:outline-none font-medium pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 text-[#9DB8B2] hover:text-[#063D37] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Sign In button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-[12px] bg-[#0D7E73] hover:bg-[#063D37] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_18px_rgba(13,126,115,0.30)] hover:shadow-[0_6px_28px_rgba(13,126,115,0.38)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <span>Sign In</span>
                  }
                </button>
              </div>

              {/* Bottom links row */}
              <div className="flex items-center justify-between text-[12.5px] pt-1">
                <a
                  href="#forgot"
                  onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your email.'); }}
                  className="text-[#9DB8B2] hover:text-[#078F83] transition-colors"
                >
                  Forgot Password?
                </a>
                <span className="text-[#9DB8B2]">
                  Not a{' '}
                  <button
                    type="button"
                    onClick={() => { setActiveTab('register'); setError(null); }}
                    className="font-bold text-[#078F83] underline underline-offset-2 hover:text-[#063D37] transition-colors cursor-pointer"
                  >
                    Member
                  </button>
                  {' '}yet?
                </span>
              </div>
            </form>
          )}

          {/* ============================================================
              REGISTER FORM
          ============================================================ */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-[12px] font-bold text-[#9DB8B2] uppercase tracking-widest mb-2" htmlFor="reg-name">
                  Full Name
                </label>
                <div className="relative flex items-center border-b-2 border-[#D5EFE8] focus-within:border-[#078F83] transition-colors pb-1">
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter your full name..."
                    className="w-full bg-transparent text-[14px] text-[#063D37] placeholder-[#C0D5D0] focus:outline-none font-medium pr-6"
                  />
                  <User className="absolute right-0 w-4 h-4 text-[#9DB8B2] pointer-events-none" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[12px] font-bold text-[#9DB8B2] uppercase tracking-widest mb-2" htmlFor="reg-email">
                  Email Address
                </label>
                <div className="relative flex items-center border-b-2 border-[#D5EFE8] focus-within:border-[#078F83] transition-colors pb-1">
                  <input
                    id="reg-email"
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full bg-transparent text-[14px] text-[#063D37] placeholder-[#C0D5D0] focus:outline-none font-medium pr-6"
                  />
                  <Mail className="absolute right-0 w-4 h-4 text-[#9DB8B2] pointer-events-none" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[12px] font-bold text-[#9DB8B2] uppercase tracking-widest mb-2" htmlFor="reg-password">
                  Password
                </label>
                <div className="relative flex items-center border-b-2 border-[#D5EFE8] focus-within:border-[#078F83] transition-colors pb-1">
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full bg-transparent text-[14px] text-[#063D37] placeholder-[#C0D5D0] focus:outline-none font-medium pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 text-[#9DB8B2] hover:text-[#063D37] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[12px] font-bold text-[#9DB8B2] uppercase tracking-widest mb-2" htmlFor="reg-confirm">
                  Confirm Password
                </label>
                <div className="relative flex items-center border-b-2 border-[#D5EFE8] focus-within:border-[#078F83] transition-colors pb-1">
                  <input
                    id="reg-confirm"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={regConfirm}
                    onChange={(e) => setRegConfirm(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full bg-transparent text-[14px] text-[#063D37] placeholder-[#C0D5D0] focus:outline-none font-medium pr-6"
                  />
                  <Lock className="absolute right-0 w-4 h-4 text-[#9DB8B2] pointer-events-none" />
                </div>
              </div>

              {/* Create Account button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-[12px] bg-[#0D7E73] hover:bg-[#063D37] text-white font-bold text-[15px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_4px_18px_rgba(13,126,115,0.30)] hover:shadow-[0_6px_28px_rgba(13,126,115,0.38)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading
                    ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <>
                        <span>Create Account</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                  }
                </button>
              </div>

              <p className="text-center text-[12.5px] text-[#9DB8B2]">
                Already a member?{' '}
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setError(null); }}
                  className="font-bold text-[#078F83] underline underline-offset-2 hover:text-[#063D37] transition-colors cursor-pointer"
                >
                  Log In
                </button>
              </p>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
