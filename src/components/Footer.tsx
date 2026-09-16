import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Mail, 
  Check, 
  Truck,
  ShieldCheck,
  RotateCcw,
  Package,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Linkedin,
  ArrowRight
} from 'lucide-react';
import newsletterWomanTransparent from '../assets/images/newsletter_woman_transparent.png';
import logoImg from '../assets/images/shophub_logo_trimmed.png';
import { ActionPrimaryButton } from './AnimatedButtons';

export const Footer: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  // Pre-footer newsletter banner state
  const [bannerEmail, setBannerEmail] = useState('');
  const [bannerSubmitted, setBannerSubmitted] = useState(false);
  const [bannerError, setBannerError] = useState('');


  const handleBannerSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bannerEmail.trim() || !bannerEmail.includes('@') || !bannerEmail.includes('.')) {
      setBannerError('Please enter a valid email address');
      return;
    }
    setBannerError('');
    setBannerSubmitted(true);
    setBannerEmail('');
    setTimeout(() => {
      setBannerSubmitted(false);
    }, 4500);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* UNIFIED PRE-FOOTER SECTION — ONLY ON HOME PAGE                           */}
      {/* ========================================================================= */}
      {isHome && (
      <section 
        id="pre-footer-unified-section"
        className="w-full bg-[#F5FAF8] pt-8 sm:pt-10 pb-10 sm:pb-14 border-t border-[#E1EFEA] select-none"
        aria-label="Newsletter Subscription and ShopHub Guarantees"
      >
        <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
          
          {/* ===================================================================== */}
          {/* PART 1: NEWSLETTER BANNER (PURE GIRL CUTOUT, NO BACKGROUND BOX)       */}
          {/* ===================================================================== */}
          <div>
            <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 md:gap-8 lg:gap-12">
              
              {/* Left Column: Heading, Subtitle & Subscription Input */}
              <div className="w-full md:w-[56%] lg:w-[52%] flex flex-col items-start z-10 py-2 sm:py-6">
                
                {/* Small Eyebrow Label */}
                <span className="text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-[#078F83] mb-2.5 inline-block">
                  Discount Artwork &amp; VIP Perks
                </span>

                {/* Big Bold Headline matching user reference */}
                <h2 className="text-[34px] sm:text-[44px] lg:text-[50px] font-black tracking-tight text-[#063D37] leading-[1.06] mb-3.5">
                  SUBSCRIBE TO THE <br />
                  <span className="text-[#078F83]">NEWS</span>
                </h2>

                {/* Subtitle Description with Wave Emoji */}
                <p className="text-[15px] sm:text-[16.5px] text-[#4A635E] font-medium leading-relaxed max-w-[490px] mb-6">
                  Be aware of all discounts and bargains! Don&apos;t miss your benefit! 👋
                </p>

                {/* Interactive Subscription Form */}
                <div className="w-full max-w-[460px]">
                  {bannerSubmitted ? (
                    <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EAF8F5] border border-[#7DD8CF] text-[#063D37] shadow-xs animate-fade-in">
                      <div className="w-8 h-8 rounded-full bg-[#078F83] text-white flex items-center justify-center shrink-0">
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#063D37]">You&apos;re on the VIP list!</p>
                        <p className="text-[12.5px] text-[#078F83]">Check your email for your exclusive welcome discount code.</p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBannerSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                      <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="h-4 w-4 text-[#798C87]" />
                        </div>
                        <input
                          type="email"
                          value={bannerEmail}
                          onChange={(e) => {
                            setBannerEmail(e.target.value);
                            if (bannerError) setBannerError('');
                          }}
                          placeholder="Enter your email address..."
                          className="w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl sm:rounded-full bg-white border border-[#D1EAE3] text-[14px] text-[#063D37] placeholder-[#798C87] shadow-2xs focus:outline-none focus:border-[#078F83] focus:ring-2 focus:ring-[#7DD8CF]/40 transition-all font-medium"
                          aria-label="Email Address for newsletter"
                        />
                      </div>

                      <ActionPrimaryButton
                        type="submit"
                        size="md"
                        className="shrink-0"
                      >
                        Subscribe
                      </ActionPrimaryButton>
                    </form>
                  )}

                  {bannerError && (
                    <p className="mt-2 text-[12.5px] text-red-600 font-medium pl-2">
                      {bannerError}
                    </p>
                  )}

                  <p className="mt-2.5 text-[12px] text-[#798C87] pl-1 font-medium">
                    No spam ever. Unsubscribe anytime in one click.
                  </p>
                </div>

              </div>

              {/* Right Column: Girl Image with ZERO BACKGROUND COLOR (100% Transparent Cutout & Larger) */}
              <div className="w-full md:w-[44%] lg:w-[48%] flex items-end justify-center md:justify-end self-end">
                <div className="relative flex items-end justify-center">
                  <img
                    src={newsletterWomanTransparent}
                    alt="Excited woman celebrating newsletter discounts and deals"
                    referrerPolicy="no-referrer"
                    className="w-auto h-[300px] sm:h-[370px] lg:h-[440px] xl:h-[470px] max-w-full object-contain filter drop-shadow-sm select-none pointer-events-none"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* ===================================================================== */}
          {/* PART 2: THE 3 VALUE GUARANTEE CARDS (SEAMLESSLY IN THE SAME SECTION)  */}
          {/* NO DIVIDING LINE (HALKA SA LINE REMOVED)                               */}
          {/* ===================================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 pt-6 sm:pt-8">
            
            {/* Card 1: Free Express Shipping */}
            <div className="bg-white rounded-[22px] py-7 px-6 border border-[#E2EFEA] border-b-[4px] border-b-[#078F83] shadow-[0_4px_18px_rgba(6,61,55,0.04)] hover:shadow-[0_12px_28px_rgba(6,61,55,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
              {/* Circular Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:bg-[#078F83] group-hover:text-white transition-all duration-300 shadow-2xs">
                <Truck className="w-6 h-6 stroke-[1.8]" />
              </div>

              {/* Title */}
              <h4 className="text-[16px] sm:text-[17px] font-black text-[#063D37] tracking-tight group-hover:text-[#078F83] transition-colors leading-tight">
                Free Express Shipping
              </h4>

              {/* Short Teal Divider Bar */}
              <div className="w-8 h-[3px] bg-[#078F83] rounded-full mx-auto my-2.5 group-hover:w-12 transition-all duration-300" />

              {/* Description */}
              <p className="text-[13px] font-medium text-[#64748B] leading-relaxed max-w-[240px]">
                On all tech orders over $99 worldwide
              </p>
            </div>

            {/* Card 2: 2-Year ShopHub Guarantee */}
            <div className="bg-white rounded-[22px] py-7 px-6 border border-[#E2EFEA] border-b-[4px] border-b-[#078F83] shadow-[0_4px_18px_rgba(6,61,55,0.04)] hover:shadow-[0_12px_28px_rgba(6,61,55,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
              {/* Circular Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:bg-[#078F83] group-hover:text-white transition-all duration-300 shadow-2xs">
                <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
              </div>

              {/* Title */}
              <h4 className="text-[16px] sm:text-[17px] font-black text-[#063D37] tracking-tight group-hover:text-[#078F83] transition-colors leading-tight">
                2-Year ShopHub Guarantee
              </h4>

              {/* Short Teal Divider Bar */}
              <div className="w-8 h-[3px] bg-[#078F83] rounded-full mx-auto my-2.5 group-hover:w-12 transition-all duration-300" />

              {/* Description */}
              <p className="text-[13px] font-medium text-[#64748B] leading-relaxed max-w-[240px]">
                100% certified genuine brand hardware
              </p>
            </div>

            {/* Card 3: 30-Day Hassle-Free Returns & Advisory */}
            <div className="bg-white rounded-[22px] py-7 px-6 border border-[#E2EFEA] border-b-[4px] border-b-[#078F83] shadow-[0_4px_18px_rgba(6,61,55,0.04)] hover:shadow-[0_12px_28px_rgba(6,61,55,0.08)] transition-all duration-300 hover:-translate-y-1 group flex flex-col items-center text-center justify-center">
              {/* Circular Icon Badge */}
              <div className="w-14 h-14 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] flex items-center justify-center mb-3.5 group-hover:scale-110 group-hover:bg-[#078F83] group-hover:text-white transition-all duration-300 shadow-2xs">
                <RotateCcw className="w-6 h-6 stroke-[1.8]" />
              </div>

              {/* Title */}
              <h4 className="text-[16px] sm:text-[17px] font-black text-[#063D37] tracking-tight group-hover:text-[#078F83] transition-colors leading-tight">
                30-Day Hassle-Free Returns
              </h4>

              {/* Short Teal Divider Bar */}
              <div className="w-8 h-[3px] bg-[#078F83] rounded-full mx-auto my-2.5 group-hover:w-12 transition-all duration-300" />

              {/* Description */}
              <p className="text-[13px] font-medium text-[#64748B] leading-relaxed max-w-[240px]">
                Instant return authorization &amp; 24/7 tech support
              </p>
            </div>

          </div>
        </div>
      </section>
      )}

      {/* ========================================================================= */}
      {/* MAIN LIGHT 4-COLUMN FOOTER                                                */}
      {/* ========================================================================= */}
      <footer 
        id="main-footer"
        className="relative w-full bg-gradient-to-b from-white to-[#F7FCFB] text-[#4A635E] pt-16 pb-0 border-t border-[#D5EFE8] select-none overflow-hidden"
        aria-label="Site Footer"
      >
        {/* Subtle Decorative Background Pattern */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#078F83 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">

          {/* 4-COLUMN GRID WITH EQUAL HEIGHTS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 items-stretch pb-10">
            
            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 1: Logo & Brand Mission Statement                           */}
            {/* ------------------------------------------------------------------- */}
            <div className="flex flex-col justify-between h-full min-h-[200px]">
              <div>
                {/* ShopHub Official Logo */}
                <Link to="/" className="inline-flex items-center mb-5 group focus:outline-none">
                  <img 
                    src={logoImg} 
                    alt="ShopHub - Shop More • Live Better" 
                    className="h-12 w-auto max-w-[170px] object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Mission / Tagline */}
                <p className="text-[14px] font-medium text-[#4A635E] leading-relaxed max-w-[270px]">
                  Premium electronics and technology products for modern needs. Certified genuine hardware guaranteed.
                </p>
              </div>

              {/* Customer Guarantee Note */}
              <div className="pt-4">
                <span className="inline-block px-3 py-1 bg-[#EAF8F5] border border-[#7DD8CF]/30 rounded-full text-[11.5px] font-bold text-[#078F83] tracking-wide uppercase">
                  Global shipping to 85+ countries
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 2: Shop Navigation Links                                     */}
            {/* ------------------------------------------------------------------- */}
            <div className="flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#063D37] mb-4">
                  Shop
                </h3>
                <ul className="flex flex-col gap-2.5 text-[13.5px] text-[#64748B]">
                  <li>
                    <Link to="/products" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link to="/wishlist" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Wishlist
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Cart
                    </Link>
                  </li>
                  <li>
                    <Link to="/checkout" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Checkout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 3: Account Navigation Links                                  */}
            {/* ------------------------------------------------------------------- */}
            <div className="flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#063D37] mb-4">
                  Account
                </h3>
                <ul className="flex flex-col gap-2.5 text-[13.5px] text-[#64748B]">
                  <li>
                    <Link to="/login" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/signup" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Register
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link to="/login" className="hover:text-[#078F83] hover:translate-x-1 inline-block transition-all">
                      Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* COLUMN 4: Social Media Links (Replaces redundant Stay Connected)   */}
            {/* ------------------------------------------------------------------- */}
            <div className="flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <h3 className="text-[16px] font-extrabold text-[#063D37] mb-4">
                  Social Media
                </h3>
                <p className="text-[13px] text-[#64748B] leading-relaxed mb-4">
                  Follow our social channels for behind-the-scenes drops, tech demos &amp; perks.
                </p>

                {/* Social Media Link Icons with Official Brand Colors */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {/* Facebook - Official Blue #1877F2 */}
                  <a 
                    href="#facebook" 
                    aria-label="Facebook" 
                    title="Follow on Facebook"
                    className="w-9 h-9 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs cursor-pointer"
                  >
                    <Facebook className="w-4 h-4 fill-white stroke-none" />
                  </a>

                  {/* Instagram - Official Signature Gradient */}
                  <a 
                    href="#instagram" 
                    aria-label="Instagram" 
                    title="Follow on Instagram"
                    className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#833AB4] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs cursor-pointer"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>

                  {/* Twitter / X - Official Black #000000 */}
                  <a 
                    href="#twitter" 
                    aria-label="Twitter / X" 
                    title="Follow on X / Twitter"
                    className="w-9 h-9 rounded-xl bg-[#000000] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs cursor-pointer"
                  >
                    <Twitter className="w-4 h-4 fill-white stroke-none" />
                  </a>

                  {/* YouTube - Official Red #FF0000 */}
                  <a 
                    href="#youtube" 
                    aria-label="YouTube" 
                    title="Watch on YouTube"
                    className="w-9 h-9 rounded-xl bg-[#FF0000] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs cursor-pointer"
                  >
                    <Youtube className="w-4 h-4 fill-white stroke-none" />
                  </a>

                  {/* LinkedIn - Official Blue #0A66C2 */}
                  <a 
                    href="#linkedin" 
                    aria-label="LinkedIn" 
                    title="Connect on LinkedIn"
                    className="w-9 h-9 rounded-xl bg-[#0A66C2] text-white flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all shadow-2xs cursor-pointer"
                  >
                    <Linkedin className="w-4 h-4 fill-white stroke-none" />
                  </a>
                </div>
              </div>

              {/* Support Contact Email */}
              <div className="pt-4">
                <a 
                  href="mailto:support@shophub.com"
                  className="inline-flex items-center gap-2 text-[13.5px] text-[#64748B] hover:text-[#078F83] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#64748B] group-hover:text-[#078F83] transition-colors" />
                  <span>support@shophub.com</span>
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* BOTTOM COPYRIGHT & LEGAL BAR WITH DARK BACKGROUND */}
        <div className="w-full bg-[#063D37] py-4 text-white mt-4">
          <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-3 text-center text-[13px] text-[#A3BFB8]">
            <span>© 2026 ShopHub. All rights reserved.</span>
            <span className="text-[#078F83]" aria-hidden="true">•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-[#078F83]" aria-hidden="true">•</span>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};
