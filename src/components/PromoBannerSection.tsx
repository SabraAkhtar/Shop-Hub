import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap, ShieldCheck, Clock, Check, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { FEATURED_PRODUCTS } from '../data/mockData';
import { ActionPrimaryButton, ActionSecondaryButton } from './AnimatedButtons';

interface PromoBannerSectionProps {
  onShopClick?: () => void;
}

export const PromoBannerSection: React.FC<PromoBannerSectionProps> = ({ onShopClick }) => {
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const [justClaimed, setJustClaimed] = useState(false);

  // Live countdown timer for the Flash Sale (e.g. 2 Days, 14 Hours, 38 Mins, 45 Secs)
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 38,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        }
        if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        }
        if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaimDeal = () => {
    // Find the promo headphone product from catalog
    const headphone = FEATURED_PRODUCTS.find((p) => p.id === 'prod-6') || FEATURED_PRODUCTS[0];
    addToCart(headphone, 1);
    setJustClaimed(true);
    setTimeout(() => setJustClaimed(false), 2000);
  };

  const handleBrowseCatalog = () => {
    if (onShopClick) {
      onShopClick();
    } else {
      navigate('/products');
    }
  };

  return (
    <section 
      id="promo-banner-section" 
      className="w-full bg-[#F7FCFB] py-10 sm:py-14 lg:py-18 overflow-hidden select-none"
      aria-label="Promotional Flash Sale Tech Banner"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* Banner Card Container - Light Modern ShopHub Aesthetic */}
        <div className="relative w-full rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-[#EAF8F5] via-[#F4FAF8] to-[#E3F5F0] text-[#063D37] p-6 sm:p-10 lg:p-12 shadow-[0_20px_50px_rgba(7,143,131,0.08)] border border-[#C6EBE2] overflow-hidden">
          
          {/* Subtle Ambient Glows & Tech Grid Background */}
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-[#7DD8CF]/30 blur-3xl pointer-events-none" />
          <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#078F83]/15 blur-3xl pointer-events-none" />
          <div className="absolute right-12 bottom-6 w-72 h-72 rounded-full border-[18px] border-[#078F83]/5 pointer-events-none" />
          <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full border border-[#078F83]/10 pointer-events-none" />

          {/* Grid Layout: Left Typography & Timer | Center Floating Clean Studio Product | Right Details & Claim Button */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
            
            {/* ================================================================= */}
            {/* LEFT COLUMN: 20% OFF, BOLD HEADLINE, LIVE COUNTDOWN TIMER        */}
            {/* ================================================================= */}
            <div className="lg:col-span-4 flex flex-col justify-center text-left">
              
              {/* Sale Tag & Flash Badge */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#7DD8CF] text-[11.5px] font-extrabold tracking-[0.18em] text-[#078F83] uppercase shadow-2xs">
                  <Zap className="w-3.5 h-3.5 fill-[#078F83] text-[#078F83]" />
                  <span>20% OFF SALE</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600">
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>Limited Batch</span>
                </span>
              </div>

              {/* Giant Bold Text matching Image 1: 'FINE SOUND' in Crisp Brand Colors */}
              <h2 className="text-[42px] sm:text-[52px] lg:text-[58px] font-black tracking-tight leading-[0.92] text-[#063D37] uppercase mb-3">
                FINE <br />
                <span className="text-[#078F83]">SOUND</span>
              </h2>

              {/* Validity / Date Subtitle */}
              <p className="text-[12.5px] sm:text-[13px] font-medium text-[#66727A] tracking-wide mb-4">
                15 Nov To 7 Dec &bull; Enterprise Certified Hardware
              </p>

              {/* LIVE COUNTDOWN TIMER in Light Card */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D5EFE8] max-w-xs shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#078F83] uppercase tracking-wider">
                    <Clock className="w-3 h-3 text-[#078F83]" />
                    <span>Flash Sale Ends In</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                </div>

                {/* 4 Digit Boxes: Days : Hours : Mins : Secs */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 text-center">
                  <div className="bg-[#F4FAF8] rounded-lg py-1.5 px-1 border border-[#D5EFE8]">
                    <span className="block text-[18px] sm:text-[20px] font-black font-mono text-[#063D37] leading-tight">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] font-semibold text-[#66727A] uppercase">Days</span>
                  </div>
                  <div className="bg-[#F4FAF8] rounded-lg py-1.5 px-1 border border-[#D5EFE8]">
                    <span className="block text-[18px] sm:text-[20px] font-black font-mono text-[#063D37] leading-tight">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] font-semibold text-[#66727A] uppercase">Hours</span>
                  </div>
                  <div className="bg-[#F4FAF8] rounded-lg py-1.5 px-1 border border-[#D5EFE8]">
                    <span className="block text-[18px] sm:text-[20px] font-black font-mono text-[#063D37] leading-tight">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] font-semibold text-[#66727A] uppercase">Mins</span>
                  </div>
                  <div className="bg-[#EAF8F5] rounded-lg py-1.5 px-1 border border-[#7DD8CF]/60">
                    <span className="block text-[18px] sm:text-[20px] font-black font-mono text-[#078F83] leading-tight">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] font-semibold text-[#078F83] uppercase">Secs</span>
                  </div>
                </div>
              </div>

            </div>

            {/* ================================================================= */}
            {/* CENTER COLUMN: SEAMLESS STUDIO DISPLAY STAGE                      */}
            {/* ================================================================= */}
            <div className="lg:col-span-4 flex items-center justify-center relative my-4 lg:my-0">
              
              {/* Radial Halo Glow Behind Pedestal */}
              <div className="absolute inset-0 bg-[#7DD8CF]/35 rounded-full filter blur-3xl transform scale-125 pointer-events-none" />
              
              {/* Sleek Circular Display Pod with Soft Gradient Edge & Floating Specs */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-white p-3 border-2 border-[#96E2D7] shadow-[0_20px_45px_rgba(7,143,131,0.12)] flex items-center justify-center group overflow-visible">
                
                {/* Concentric Sound Wave Rings */}
                <div className="absolute inset-3 rounded-full border border-[#D5EFE8] pointer-events-none" />
                <div className="absolute inset-8 rounded-full border border-[#7DD8CF]/30 pointer-events-none" />

                {/* Studio Headphones Product Image - Clean, High-Contrast & Professional */}
                <div className="relative w-56 sm:w-64 h-56 sm:h-64 rounded-full overflow-hidden shadow-md flex items-center justify-center transform transition-transform duration-500 group-hover:scale-105 bg-[#F7FCFB]">
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=85"
                    alt="SonicPro Spatial ANC Studio Wireless Headphones"
                    className="w-full h-full object-cover rounded-full drop-shadow-[0_12px_24px_rgba(6,61,55,0.18)]"
                  />
                  {/* Subtle inner ring overlay */}
                  <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-[#078F83]/10 pointer-events-none" />
                </div>

                {/* Floating Spec Chip 1: Beryllium Drivers */}
                <div className="absolute top-4 -right-3 bg-white/95 backdrop-blur-md border border-[#C8ECE3] px-3.5 py-1.5 rounded-full text-[11.5px] font-bold text-[#063D37] shadow-md flex items-center gap-1.5 z-20">
                  <Sparkles className="w-3.5 h-3.5 text-[#078F83]" />
                  <span>Beryllium Drivers</span>
                </div>

                {/* Floating Spec Chip 2: 40h Battery */}
                <div className="absolute bottom-4 -left-3 bg-white/95 backdrop-blur-md border border-[#C8ECE3] px-3.5 py-1.5 rounded-full text-[11.5px] font-bold text-[#063D37] shadow-md flex items-center gap-1.5 z-20">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#078F83]" />
                  <span>40h ANC Battery</span>
                </div>
              </div>

            </div>

            {/* ================================================================= */}
            {/* RIGHT COLUMN: SALE TITLE, PRICE COMPARISON, STOCK & ACTION BUTTON  */}
            {/* ================================================================= */}
            <div className="lg:col-span-4 flex flex-col justify-center lg:items-end text-left lg:text-right">
              
              {/* Product Subtitle / Brand Model */}
              <span className="text-[13px] font-bold text-[#078F83] tracking-wide mb-1 uppercase">
                SonicPro Spatial Air Pro
              </span>

              {/* Title: 'Summer Sale' */}
              <h3 className="text-[32px] sm:text-[38px] lg:text-[42px] font-black text-[#063D37] leading-tight mb-2">
                Summer Sale
              </h3>

              {/* Real Sale Pricing Comparison */}
              <div className="flex items-baseline gap-2.5 mb-3 lg:justify-end">
                <span className="text-[28px] sm:text-[32px] font-black text-[#078F83] leading-none">
                  $199.00
                </span>
                <span className="text-[17px] text-[#8C9B97] line-through font-semibold">
                  $249.00
                </span>
                <span className="px-2 py-0.5 rounded-md bg-[#EAF8F5] text-[#078F83] border border-[#7DD8CF]/50 text-[11px] font-black uppercase">
                  Save $50
                </span>
              </div>

              {/* Description text */}
              <p className="text-[13px] sm:text-[13.5px] text-[#66727A] max-w-sm leading-relaxed mb-4 lg:ml-auto">
                Certified enterprise-grade acoustics with active hybrid noise cancellation, 40-hour battery life, and 2-year warranty.
              </p>

              {/* Stock Urgency Indicator */}
              <div className="flex items-center gap-2 mb-6 lg:justify-end text-[12px] font-medium text-[#66727A]">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Only <strong className="text-[#063D37]">8 units remaining</strong> in enterprise stock</span>
              </div>

              {/* Action Buttons: Claim Deal (Direct Add to Cart) + Browse Full Catalog */}
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                
                {/* Secondary Pill Button (Left) */}
                <ActionSecondaryButton
                  onClick={handleBrowseCatalog}
                  size="md"
                >
                  View All Deals
                </ActionSecondaryButton>

                {/* Primary Action Button (Right) */}
                <ActionPrimaryButton
                  onClick={handleClaimDeal}
                  size="md"
                  icon={justClaimed ? <Check className="w-4 h-4 text-white" /> : undefined}
                >
                  {justClaimed ? 'Added to Cart!' : 'Shop Now'}
                </ActionPrimaryButton>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
