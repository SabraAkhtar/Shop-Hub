import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  ShieldCheck, 
  Zap, 
  Layers,
  RotateCcw,
  Lock
} from 'lucide-react';
import { DepthCarousel, DepthCarouselItemObject } from './DepthCarousel';
import { ActionPrimaryButton, ActionSecondaryButton } from './AnimatedButtons';
import SpecularCard from './SpecularCard';
import { Product } from '../types';

interface HeroSectionProps {
  onShopClick?: () => void;
  onExploreClick?: () => void;
  products?: Product[];
}

const HERO_TECH_ITEMS: DepthCarouselItemObject[] = [
  {
    image: 'https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.png',
    alt: 'Apple MacBook Pro 14 Inch Space Grey',
    title: 'Apple MacBook Pro 14"',
    category: 'Laptops',
    price: '$1,999.99'
  },
  {
    image: 'https://cdn.dummyjson.com/products/images/smartphones/iPhone%2013%20Pro/1.png',
    alt: 'iPhone 13 Pro',
    title: 'iPhone 13 Pro',
    category: 'Smartphones',
    price: '$1,099.99'
  },
  {
    image: 'https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/1.png',
    alt: 'Apple AirPods Max Silver',
    title: 'Apple AirPods Max',
    category: 'Audio Gear',
    price: '$549.99'
  },
  {
    image: 'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp',
    alt: 'iPad Mini 2021 Starlight',
    title: 'iPad Mini 2021',
    category: 'Tablets',
    price: '$499.99'
  },
  {
    image: 'https://cdn.dummyjson.com/products/images/laptops/Asus%20Zenbook%20Pro%20Dual%20Screen%20Laptop/1.png',
    alt: 'Asus Zenbook Pro Dual Screen Laptop',
    title: 'Asus Zenbook Pro',
    category: 'Laptops',
    price: '$1,799.99'
  },
  {
    image: 'https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S10/1.png',
    alt: 'Samsung Galaxy S10',
    title: 'Samsung Galaxy S10',
    category: 'Smartphones',
    price: '$699.99'
  }
];

const ROTATING_PHRASES = [
  'Smart Electronics',
  'Luxury Fragrances',
  'Home & Lifestyle'
];

const TypewriterText = ({ phrases }: { phrases: string[] }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 30 : 100); // Fast delete, normal type

      if (!isDeleting && text === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // Pause at end of word
        return;
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        timer = setTimeout(handleType, 500); // Pause before next word
        return;
      }
      
      timer = setTimeout(handleType, typingSpeed);
    };
    
    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, phrases]);

  return (
    <>
      {text}
      <span className="inline-block w-[3px] h-[1em] ml-1 align-middle bg-[#078F83] opacity-100 transition-opacity duration-100" style={{ animation: 'blink 1s step-end infinite' }} />
    </>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onExploreClick,
  products,
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [gridIndex, setGridIndex] = useState(0);

  // Rotating phrase timer
  useEffect(() => {
    const timer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  // Bento Grid item rotation timer
  useEffect(() => {
    if (!products || products.length === 0) return;
    const timer = setInterval(() => {
      setGridIndex((prev) => prev + 1);
    }, 3500); // Swap every 3.5 seconds
    return () => clearInterval(timer);
  }, [products]);

  // Get one product from each unique category for the hero depth carousel
  const carouselItems: DepthCarouselItemObject[] = useMemo(() => {
    if (products && products.length > 0) {
      const categoryMap = new Map<string, any>();
      
      // Get first product of each category
      for (const p of products) {
        if (!categoryMap.has(p.category)) {
          categoryMap.set(p.category, p);
        }
        if (categoryMap.size >= 7) break; // Limit to 7 distinct items
      }

      const diverseProducts = Array.from(categoryMap.values());
      
      if (diverseProducts.length >= 4) {
        return diverseProducts.map((p) => ({
          image: p.image || p.thumbnail || '',
          alt: p.title,
          title: p.title,
          category: p.category ? (p.category.charAt(0).toUpperCase() + p.category.slice(1).replace('-', ' ')) : 'Product',
          price: `$${Number(p.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
        }));
      }
    }
    return HERO_TECH_ITEMS;
  }, [products]);


  return (
    <section 
      id="main-hero-section"
      className="relative w-full bg-gradient-to-b from-[#F2FBF8] via-[#EAF8F5] to-[#FAFCFB] border-b border-[#D5EFE8] pt-8 sm:pt-12 lg:pt-14 pb-12 sm:pb-16 lg:pb-20 overflow-hidden select-none"
      aria-label="ShopHub Featured Products Showcase"
    >
      {/* Background radial glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#7DD8CF]/20 blur-3xl"
      />
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-1/2 -right-32 w-[480px] h-[480px] rounded-full bg-[#078F83]/10 blur-3xl"
      />


      {/* Grid pattern */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#078F83_1px,transparent_1px),linear-gradient(to_bottom,#078F83_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.04]"
      />

      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
          
          {/* ================================================================= */}
          {/* LEFT COLUMN: ~45% width                                           */}
          {/* ================================================================= */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[46%] xl:w-[44%] flex flex-col items-start z-10"
          >
            {/* Small Eyebrow Label */}
            <div 
              id="hero-eyebrow"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#063D37] text-[11px] sm:text-[12px] font-semibold tracking-wide shadow-xs mb-5 select-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#078F83] animate-pulse inline-block" />
              <span className="text-[#063D37]">Everything You Need</span>
              <span className="text-[#078F83] font-bold">•</span>
              <span className="text-[#0A9F91]">All In One Place</span>
            </div>

            {/* Main Hero Heading */}
            <h1 
              id="hero-heading"
              className="text-[#063D37] text-[32px] sm:text-[40px] lg:text-[45px] font-extrabold tracking-[-0.03em] leading-[1.12] text-left mb-4 min-h-[82px] sm:min-h-[105px]"
            >
              <span className="text-[#063D37]">Powering Your World with </span>
              <span className="inline-block relative overflow-hidden align-baseline text-[#078F83]">
                <TypewriterText phrases={ROTATING_PHRASES} />
              </span>
            </h1>

            {/* Hero Description */}
            <p 
              id="hero-description"
              className="text-[#66727A] text-[15px] sm:text-[16px] leading-[1.6] max-w-[470px] text-left font-normal mb-7 sm:mb-8"
            >
              Discover reliable electronics, luxury fragrances, stylish fashion, and everyday essentials designed to make life easier.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto">
              {/* Primary CTA (Left) */}
              <ActionPrimaryButton
                id="hero-primary-cta"
                onClick={onExploreClick}
                size="lg"
              >
                View Products
              </ActionPrimaryButton>

              {/* Secondary CTA (Right) */}
              <ActionSecondaryButton
                id="hero-secondary-cta"
                onClick={onShopClick}
                size="lg"
              >
                Shop Everything
              </ActionSecondaryButton>
            </div>

            {/* Subtle trust badge indicator below CTAs */}
            <div className="mt-7 pt-4 flex items-center gap-5 border-t border-[#E0EFEA] text-[12px] text-[#66727A]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#078F83]" />
                <span>Official 2-Yr Warranty</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-[#7DD8CF]" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#078F83]" />
                <span>Same-Day Express Dispatch</span>
              </div>
            </div>



          </motion.div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: ~55% width featuring Modern Bento Grid Showcase     */}
          {/* ================================================================= */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[55%] relative flex items-center justify-center min-h-[460px] sm:min-h-[510px] lg:min-h-[560px]"
          >
            {/* CREATIVE BENTO BOX GRID CONTAINER */}
            <div className="w-full max-w-[640px] aspect-[0.9] sm:aspect-[1.1] md:aspect-auto md:h-[500px] grid grid-cols-5 grid-rows-2 gap-4 lg:gap-6 z-20">
              
              {/* CARD 1: MAIN FEATURED (Left, spans 3 cols & 2 rows) */}
              <SpecularCard 
                radius={32}
                lineColor="#7DD8CF"
                baseColor="transparent"
                thickness={1.5}
                intensity={0.8}
                shineSize={20}
                shineFade={60}
                followMouse={true}
                proximity={200}
                className="col-span-3 row-span-2 relative group shadow-[0_20px_50px_-12px_rgba(7,143,131,0.18)] bg-gradient-to-br from-[#EAF8F5] via-white to-[#F2FCF9]"
              >
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={carouselItems[gridIndex % carouselItems.length]?.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center p-6 sm:p-10"
                  >
                    {/* Floating Top Badge */}
                    <div className="absolute top-5 left-5 px-4 py-1.5 bg-white/80 backdrop-blur-md rounded-full text-[10px] font-black text-[#078F83] uppercase tracking-widest shadow-sm border border-[#7DD8CF]/30 z-20">
                      Featured
                    </div>

                    {/* Massive Image */}
                    <img 
                      src={carouselItems[gridIndex % carouselItems.length]?.image} 
                      alt={carouselItems[gridIndex % carouselItems.length]?.title}
                      className="w-full h-full max-h-[280px] object-contain mix-blend-multiply group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700 ease-out z-10" 
                    />

                    {/* Glassmorphism Title Pill */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-3 bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgba(6,61,55,0.1)] rounded-2xl w-[85%] text-center z-20 group-hover:translate-y-[-4px] transition-transform duration-700">
                      <h3 className="text-[16px] sm:text-[18px] font-black text-[#063D37] truncate">
                        {carouselItems[gridIndex % carouselItems.length]?.title}
                      </h3>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </SpecularCard>

              {/* CARD 2: SECONDARY ITEM (Top Right - Image Only) */}
              <SpecularCard 
                radius={28}
                lineColor="#078F83"
                baseColor="transparent"
                thickness={2}
                intensity={1}
                className="col-span-2 row-span-1 relative group shadow-[0_15px_40px_-10px_rgba(7,143,131,0.15)] bg-gradient-to-tr from-[#FAFCFB] to-[#F2FCF9]"
              >
                {/* Subtle Decorative Glow Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#7DD8CF]/20 rounded-full blur-[30px] z-0 group-hover:scale-[1.8] group-hover:bg-[#7DD8CF]/30 transition-all duration-700 ease-out"></div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={carouselItems[(gridIndex + 1) % carouselItems.length]?.title}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center p-6 sm:p-8 relative z-10"
                  >
                    <img 
                      src={carouselItems[(gridIndex + 1) % carouselItems.length]?.image} 
                      alt="Featured product"
                      className="w-full h-full max-h-[130px] sm:max-h-[160px] object-contain mix-blend-multiply group-hover:rotate-3 group-hover:scale-110 transition-transform duration-700 ease-out" 
                    />
                  </motion.div>
                </AnimatePresence>
              </SpecularCard>

              {/* CARD 3: TERTIARY ITEM (Bottom Right - Image Only) */}
              <SpecularCard 
                radius={28}
                lineColor="#078F83"
                baseColor="transparent"
                thickness={2}
                intensity={1}
                className="col-span-2 row-span-1 relative group shadow-[0_15px_40px_-10px_rgba(7,143,131,0.15)] bg-gradient-to-br from-[#F4F9F7] to-[#FAFCFB]"
              >
                {/* Subtle Decorative Glow Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#078F83]/10 rounded-full blur-[30px] z-0 group-hover:scale-[1.8] group-hover:bg-[#078F83]/15 transition-all duration-700 ease-out"></div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={carouselItems[(gridIndex + 2) % carouselItems.length]?.title}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center p-6 sm:p-8 relative z-10"
                  >
                    <img 
                      src={carouselItems[(gridIndex + 2) % carouselItems.length]?.image} 
                      alt="Featured product"
                      className="w-full h-full max-h-[130px] sm:max-h-[160px] object-contain mix-blend-multiply group-hover:-translate-y-3 group-hover:scale-[1.15] transition-transform duration-700 ease-out" 
                    />
                  </motion.div>
                </AnimatePresence>
              </SpecularCard>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
