import React from 'react';
import { 
  Laptop, 
  Smartphone, 
  Headphones, 
  Watch, 
  Gamepad2, 
  Sparkles, 
  ArrowRight, 
  ArrowUpRight 
} from 'lucide-react';
import { ActionPrimaryButton, ActionSecondaryButton } from './AnimatedButtons';

interface SmartDigitalLifeSectionProps {
  onShopClick?: () => void;
  onExploreClick?: () => void;
  onCategoryClick?: (category: string) => void;
}

export const SmartDigitalLifeSection: React.FC<SmartDigitalLifeSectionProps> = ({
  onShopClick,
  onExploreClick,
  onCategoryClick,
}) => {
  const categoriesPills = [
    { label: 'Laptops', icon: Laptop },
    { label: 'Smartphones', icon: Smartphone },
    { label: 'Audio', icon: Headphones },
    { label: 'Wearables', icon: Watch },
    { label: 'Gaming', icon: Gamepad2 },
    { label: 'Accessories', icon: Sparkles },
  ];

  const threeCards = [
    {
      id: 'laptops-card',
      bgClass: 'bg-[#EAF8F5] border-[#D4EDE6]',
      eyebrow: 'COMPUTING ESSENTIALS',
      eyebrowColor: 'text-[#078F83]',
      heading: 'Laptops & Computers',
      description: 'Reliable computing devices for work, study, productivity, and everyday tasks.',
      cta: 'Explore Laptops',
      ctaCategory: 'laptops',
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=500&q=80',
      alt: 'Laptops & Computing Essentials',
    },
    {
      id: 'beauty-card',
      bgClass: 'bg-[#FDF4F6] border-[#F8E1E7]',
      eyebrow: 'BEAUTY & WELLNESS',
      eyebrowColor: 'text-[#D81B60]',
      heading: 'Personal Care',
      description: 'Discover premium skincare, cosmetics, and wellness products for your daily routine.',
      cta: 'Explore Beauty',
      ctaCategory: 'beauty',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=500&q=80',
      alt: 'Beauty and Skincare Products',
    },
    {
      id: 'home-card',
      bgClass: 'bg-[#FDF7E6] border-[#F5E6CA]',
      eyebrow: 'LIVING SPACES',
      eyebrowColor: 'text-[#D97706]',
      heading: 'Home & Furniture',
      description: 'Upgrade your living space with modern furniture, decor, and smart home accessories.',
      cta: 'Explore Home',
      ctaCategory: 'furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=500&q=80',
      alt: 'Modern Home and Furniture',
    },
  ];

  return (
    <section 
      id="smart-digital-life-section"
      className="w-full bg-[#FFFFFF] py-12 sm:py-16 border-b border-[#EAF2F0]"
      aria-label="Smart Digital Life Feature Showcase and Collections"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* ============================================================= */}
        {/* 1. Large Wide Rounded Container ("Everything You Need...") */}
        {/* ============================================================= */}
        <div className="relative overflow-hidden rounded-[26px] bg-[#F4FBFA] border border-[#D8EDE8] p-6 sm:p-9 lg:p-12 shadow-[0_6px_24px_rgba(6,61,55,0.05)]">
          
          {/* Subtle decorative grid elements */}
          <div 
            className="pointer-events-none absolute inset-0 opacity-[0.28]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(7, 143, 131, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(7, 143, 131, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: '36px 36px',
            }}
            aria-hidden="true"
          />
          <div 
            className="pointer-events-none absolute right-[-5%] top-[-10%] w-[380px] h-[380px] rounded-full bg-[#7DD8CF]/20 blur-[80px]"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            
            {/* LEFT SIDE CONTENT */}
            <div className="w-full lg:w-[50%] flex flex-col items-start">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-3.5 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#078F83]" />
                <span>SMART TECHNOLOGY</span>
              </div>

              {/* Main Heading */}
              <h2 className="text-[#063D37] text-[26px] sm:text-[34px] lg:text-[38px] font-extrabold tracking-tight leading-[1.14] mb-3.5 text-left">
                <span>Everything You Need for a </span>
                <span className="text-[#078F83]">Smarter Digital Life</span>
              </h2>

              {/* Supporting Paragraph */}
              <p className="text-[#66727A] text-[14.5px] sm:text-[15.5px] leading-[1.65] font-normal mb-5 max-w-[500px] text-left">
                Explore reliable electronics, smart devices, computing essentials, and everyday technology designed for work, entertainment, and modern living.
              </p>

              {/* Category Indicator Pills */}
              <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-7">
                {categoriesPills.map((pill) => {
                  const Icon = pill.icon;
                  return (
                    <div 
                      key={pill.label}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#D9ECE7] shadow-xs text-[#063D37] text-[12px] font-semibold"
                    >
                      <Icon className="w-3.5 h-3.5 text-[#078F83]" />
                      <span>{pill.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-5">
                {/* Secondary CTA (Left) */}
                <ActionSecondaryButton
                  onClick={onExploreClick}
                >
                  Explore Products
                </ActionSecondaryButton>

                {/* Primary CTA (Right) */}
                <ActionPrimaryButton
                  onClick={onShopClick}
                >
                  Shop Products
                </ActionPrimaryButton>
              </div>

            </div>

            {/* RIGHT SIDE: Large Premium Electronics Composition */}
            <div className="w-full lg:w-[50%] relative flex items-center justify-center">
              
              {/* Rounded Image Container with Soft Shadow */}
              <div className="relative w-full max-w-[480px] rounded-[22px] overflow-hidden border border-white/80 bg-white/60 p-2.5 sm:p-3 shadow-[0_16px_36px_rgba(6,61,55,0.08)]">
                
                <img 
                  src="https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=900&q=85" 
                  alt="Modern Electronics Ecosystem"
                  className="w-full h-[250px] sm:h-[300px] object-cover rounded-[16px]"
                />

                {/* Ambient gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#063D37]/35 via-transparent to-transparent rounded-[16px] pointer-events-none" />

                {/* Bottom Status / Info Badge */}
                <div className="absolute bottom-5 left-5 right-5 sm:right-auto flex items-center gap-3 px-3.5 py-1.5 sm:py-2 rounded-full bg-white/95 backdrop-blur-md border border-[#D8EDE8] shadow-md">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#078F83] animate-pulse" />
                    <span className="text-[12px] font-bold text-[#063D37]">Quality Products</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-[#CBD5D1]" />
                  <span className="text-[11.5px] font-medium text-[#078F83]">ShopHub Collection</span>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* ============================================================= */}
        {/* 2. Three Feature Cards - brought UP directly below the top container */}
        {/* with small space (mt-5 sm:mt-6) so all 4 feel like ONE section */}
        {/* ============================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mt-5 sm:mt-6">
          {threeCards.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[20px] border p-5 sm:p-6 shadow-[0_4px_18px_rgba(6,61,55,0.03)] hover:shadow-[0_12px_28px_rgba(6,61,55,0.09)] transition-all duration-250 hover:-translate-y-1 ${card.bgClass}`}
            >
              {/* Top Text Content */}
              <div className="relative z-10 mb-4">
                {/* Eyebrow */}
                <span className={`inline-block text-[11px] font-extrabold tracking-wider uppercase mb-1.5 ${card.eyebrowColor}`}>
                  {card.eyebrow}
                </span>

                {/* Heading */}
                <h3 className="text-[19px] sm:text-[20px] font-bold text-[#063D37] tracking-tight mb-2 leading-snug">
                  {card.heading}
                </h3>

                {/* Description */}
                <p className="text-[#66727A] text-[13px] leading-[1.55] font-normal max-w-[270px]">
                  {card.description}
                </p>
              </div>

              {/* Bottom Area: CTA on left, Product visual on right */}
              <div className="relative z-10 flex items-end justify-between gap-3 pt-2">
                {/* Primary CTA Button for card */}
                <ActionPrimaryButton
                  onClick={() => onCategoryClick && onCategoryClick(card.ctaCategory)}
                  size="sm"
                >
                  {card.cta}
                </ActionPrimaryButton>

                {/* Partially integrated product image */}
                <div className="w-[100px] sm:w-[115px] h-[80px] sm:h-[90px] relative rounded-xl overflow-hidden shadow-2xs border border-white/80 bg-white/60">
                  <img 
                    src={card.image} 
                    alt={card.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
