import React from 'react';
import { ArrowRight, Laptop, Smartphone, Headphones } from 'lucide-react';

interface ThreeFeatureCardsSectionProps {
  onCardClick?: (category: string) => void;
}

export const ThreeFeatureCardsSection: React.FC<ThreeFeatureCardsSectionProps> = ({
  onCardClick,
}) => {
  const cards = [
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
      id: 'devices-card',
      bgClass: 'bg-[#EEF7FB] border-[#D6EBF4]',
      eyebrow: 'CONNECTED TECHNOLOGY',
      eyebrowColor: 'text-[#0284C7]',
      heading: 'Smart Devices',
      description: 'Stay connected with modern smartphones, tablets, wearables, and smart technology.',
      cta: 'Explore Devices',
      ctaCategory: 'smartphones',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=500&q=80',
      alt: 'Smart Devices and Wearables',
    },
    {
      id: 'audio-card',
      bgClass: 'bg-[#FBF7EF] border-[#EFE5D3]',
      eyebrow: 'ENTERTAINMENT & ACCESSORIES',
      eyebrowColor: 'text-[#B45309]',
      heading: 'Audio & Accessories',
      description: 'Upgrade your everyday experience with headphones, speakers, gaming gear, and useful accessories.',
      cta: 'Explore Accessories',
      ctaCategory: 'audio',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=500&q=80',
      alt: 'Audio & Premium Accessories',
    },
  ];

  return (
    <section 
      id="three-feature-cards-section"
      className="w-full bg-[#FFFFFF] py-14 sm:py-18 lg:py-22"
      aria-label="ShopHub Collections"
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-10">
        
        {/* Three Horizontal Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {cards.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-[20px] border p-6 sm:p-7 shadow-[0_4px_20px_rgba(6,61,55,0.04)] hover:shadow-[0_14px_32px_rgba(6,61,55,0.1)] transition-all duration-250 hover:-translate-y-1 ${card.bgClass}`}
            >
              {/* Top Text Content */}
              <div className="relative z-10 mb-6">
                {/* Eyebrow */}
                <span className={`inline-block text-[11px] font-extrabold tracking-wider uppercase mb-2 ${card.eyebrowColor}`}>
                  {card.eyebrow}
                </span>

                {/* Heading */}
                <h3 className="text-[20px] sm:text-[22px] font-bold text-[#063D37] tracking-tight mb-2.5 leading-snug">
                  {card.heading}
                </h3>

                {/* Description */}
                <p className="text-[#66727A] text-[13.5px] leading-[1.6] font-normal max-w-[260px]">
                  {card.description}
                </p>
              </div>

              {/* Bottom Area: CTA on left, Product visual on right */}
              <div className="relative z-10 flex items-end justify-between gap-3 pt-2">
                {/* Pill CTA with circular arrow icon */}
                <button
                  type="button"
                  onClick={() => onCardClick && onCardClick(card.ctaCategory)}
                  className="inline-flex items-center gap-2 h-[38px] px-3.5 rounded-full bg-white hover:bg-[#078F83] text-[#063D37] hover:text-white font-semibold text-[13px] shadow-xs border border-black/5 hover:border-transparent transition-all duration-200 cursor-pointer group-hover:shadow-md"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#EAF8F5] text-[#078F83] transition-transform duration-200 group-hover:scale-105">
                    <ArrowRight className="w-3 h-3 text-[#078F83]" />
                  </span>
                  <span>{card.cta}</span>
                </button>

                {/* Partially integrated product image */}
                <div className="w-[105px] sm:w-[120px] h-[85px] sm:h-[95px] relative rounded-xl overflow-hidden shadow-xs border border-white/70 bg-white/50">
                  <img 
                    src={card.image} 
                    alt={card.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-106"
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
