import React, { useRef, useState, useEffect, useMemo } from 'react';
import { 
  Monitor,
  Server,
  Router,
  Cpu,
  Boxes,
  ShieldCheck,
  Usb,
  Smartphone,
  Laptop, 
  Headphones, 
  Watch, 
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Tablet,
  Sparkles,
  ShoppingBag,
  Utensils,
  Armchair,
  Shirt,
  Glasses,
  Car,
  Gem
} from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useStore } from '../context/StoreContext';
import { CategoryItem } from '../types';

interface CategorySectionProps {
  selectedCategory?: string | null;
  onSelectCategory?: (categoryId: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { products } = useStore();

  // Dynamically derive all DummyJSON categories without artificial filtering
  const apiCategories: CategoryItem[] = useMemo(() => {
    if (!products || products.length === 0) return CATEGORIES;

    const catMap = new Map<string, number>();
    products.forEach((p) => {
      const c = p.category;
      catMap.set(c, (catMap.get(c) || 0) + 1);
    });

    return Array.from(catMap.entries()).map(([slug, count]) => {
      const formattedName = slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      let icon = 'Boxes';
      const s = slug.toLowerCase();
      if (s.includes('laptop')) icon = 'Laptop';
      else if (s.includes('phone') || s.includes('mobile')) icon = 'Smartphone';
      else if (s.includes('tablet')) icon = 'Tablet';
      else if (s.includes('watch')) icon = 'Watch';
      else if (s.includes('audio') || s.includes('headphone')) icon = 'Headphones';
      else if (s.includes('beauty') || s.includes('skin') || s.includes('fragrance')) icon = 'Sparkles';
      else if (s.includes('grocer') || s.includes('food')) icon = 'ShoppingBag';
      else if (s.includes('kitchen')) icon = 'Utensils';
      else if (s.includes('furniture') || s.includes('home')) icon = 'Armchair';
      else if (s.includes('shirt') || s.includes('dress') || s.includes('top')) icon = 'Shirt';
      else if (s.includes('sunglass')) icon = 'Glasses';
      else if (s.includes('motorcycle') || s.includes('vehicle')) icon = 'Car';
      else if (s.includes('jewel')) icon = 'Gem';

      return {
        id: slug,
        name: formattedName,
        icon: icon,
        count: count,
        slug: slug,
      };
    });
  }, [products]);

  // Auto-scroll effect mimicking the smooth sliding motion in the video
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    const speed = 0.55; // Pixels per frame (~33px per second)

    const step = (time: number) => {
      const delta = (time - lastTime) / 16.67;
      lastTime = time;

      if (!isPaused && el) {
        el.scrollLeft += speed * delta;
        // If we've scrolled half way (due to duplicate items for seamless loop)
        if (el.scrollLeft >= el.scrollWidth / 2) {
          el.scrollLeft -= el.scrollWidth / 2;
        }
      }
      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = 260;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const getCategoryIcon = (iconName: string, isHighlighted: boolean) => {
    const iconClass = `w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 ${
      isHighlighted 
        ? 'text-[#078F83] scale-110' 
        : 'text-[#063D37] group-hover:text-[#078F83] group-hover:scale-105'
    }`;

    switch (iconName) {
      case 'Monitor':
        return <Monitor className={iconClass} />;
      case 'Server':
        return (
          <div className="relative flex items-center justify-center">
            <Server className={iconClass} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#078F83] animate-pulse" />
          </div>
        );
      case 'Router':
        return <Router className={iconClass} />;
      case 'Cpu':
        return <Cpu className={iconClass} />;
      case 'Boxes':
        return <Boxes className={iconClass} />;
      case 'ShieldCheck':
        return <ShieldCheck className={iconClass} />;
      case 'Usb':
        return <Usb className={iconClass} />;
      case 'Smartphone':
        return <Smartphone className={iconClass} />;
      case 'Laptop':
        return <Laptop className={iconClass} />;
      case 'Tablet':
        return <Tablet className={iconClass} />;
      case 'Headphones':
        return <Headphones className={iconClass} />;
      case 'Watch':
        return <Watch className={iconClass} />;
      case 'Gamepad2':
        return <Gamepad2 className={iconClass} />;
      case 'Sparkles':
        return <Sparkles className={iconClass} />;
      case 'ShoppingBag':
        return <ShoppingBag className={iconClass} />;
      case 'Utensils':
        return <Utensils className={iconClass} />;
      case 'Armchair':
        return <Armchair className={iconClass} />;
      case 'Shirt':
        return <Shirt className={iconClass} />;
      case 'Glasses':
        return <Glasses className={iconClass} />;
      case 'Car':
        return <Car className={iconClass} />;
      case 'Gem':
        return <Gem className={iconClass} />;
      default:
        return <Boxes className={iconClass} />;
    }
  };

  // Duplicate items for a seamless continuous scrolling carousel
  const duplicatedCategories = [...apiCategories, ...apiCategories];

  return (
    <section 
      id="category-section"
      className="w-full bg-[#FFFFFF] py-10 sm:py-14 lg:py-16 border-b border-[#EAF2F0] relative overflow-hidden"
      aria-label="Shop by Category"
    >
      <div className="mx-auto max-w-[1300px] px-4 sm:px-6 lg:px-8">
        
        {/* =================================================================== */}
        {/* Video Exact Section Header: • • ────── Shop by Category ────── • • */}
        {/* =================================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-2.5">
            {/* Left Decorative: 2 Teal Dots + Horizontal Line */}
            <div className="flex items-center gap-1.5 sm:gap-2" aria-hidden="true">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#7DD8CF]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#078F83]" />
              <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#078F83]/70 rounded-full" />
            </div>

            {/* Main Title: "Shop by Category" */}
            <h2 className="text-[26px] sm:text-[32px] lg:text-[36px] font-extrabold tracking-tight select-none">
              <span className="text-[#063D37]">Shop by </span>
              <span className="text-[#078F83]">Category</span>
            </h2>

            {/* Right Decorative: Horizontal Line + 2 Teal Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2" aria-hidden="true">
              <div className="w-10 sm:w-16 md:w-24 h-[1.5px] bg-[#078F83]/70 rounded-full" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#078F83]" />
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#7DD8CF]" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-[#66727A] text-[14px] sm:text-[15.5px] font-normal tracking-normal">
            Browse our full catalog of products across all categories
          </p>
        </div>

        {/* =================================================================== */}
        {/* Smooth Scrolling Carousel matching the video representation */}
        {/* =================================================================== */}
        <div 
          className="relative w-full group/carousel"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Subtle Left Gradient Edge Fade Mask */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-20" />

          {/* Subtle Right Gradient Edge Fade Mask */}
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-20" />

          {/* Prev Arrow Navigation Button (Shown on hover) */}
          <button
            type="button"
            onClick={() => handleManualScroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-[#D5EFE8] text-[#063D37] hover:text-[#078F83] hover:border-[#078F83] shadow-md flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
            aria-label="Scroll categories left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Next Arrow Navigation Button (Shown on hover) */}
          <button
            type="button"
            onClick={() => handleManualScroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-white/95 border border-[#D5EFE8] text-[#063D37] hover:text-[#078F83] hover:border-[#078F83] shadow-md flex items-center justify-center transition-all opacity-0 group-hover/carousel:opacity-100 cursor-pointer"
            aria-label="Scroll categories right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Marquee / Continuous Scrolling Track */}
          <div 
            ref={scrollContainerRef}
            className="flex items-center gap-8 sm:gap-11 lg:gap-13 overflow-x-auto no-scrollbar py-6 px-4 cursor-grab active:cursor-grabbing select-none"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {duplicatedCategories.map((cat, idx) => {
              const isSelected = selectedCategory === cat.id;
              const isHovered = hoveredId === `${cat.id}-${idx}`;
              // Make one of the initial items have the video's glowing active highlight ring if nothing is selected
              const isGlowingDefault = !selectedCategory && idx === 3; // Chips & Hardware highlighted as shown in frame
              const isHighlighted = isSelected || isHovered || isGlowingDefault;

              return (
                <button
                  key={`${cat.id}-${idx}`}
                  type="button"
                  id={`cat-card-${cat.id}-${idx}`}
                  onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                  onMouseEnter={() => setHoveredId(`${cat.id}-${idx}`)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group shrink-0 flex flex-col items-center text-center cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#078F83] rounded-2xl p-1 transition-all duration-300"
                >
                  {/* Soft Mint Circular Badge with Glowing Active Aura */}
                  <div 
                    className={`relative flex items-center justify-center w-[84px] h-[84px] sm:w-[92px] sm:h-[92px] rounded-full transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-[#E1F7F2] ring-4 ring-[#7DD8CF]/70 shadow-[0_0_24px_rgba(7,143,131,0.28)] scale-105'
                        : 'bg-[#EAF8F5] border border-[#D5EFE8]/70 group-hover:bg-[#d8f4ed] group-hover:shadow-[0_8px_18px_rgba(7,143,131,0.18)] group-hover:scale-105'
                    }`}
                  >
                    {/* Inner circular soft ambient gradient */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

                    {/* Category Icon */}
                    <div className="relative z-10">
                      {getCategoryIcon(cat.icon, isHighlighted)}
                    </div>
                  </div>

                  {/* Category Title Below */}
                  <span 
                    className={`mt-3.5 text-[13px] sm:text-[14px] font-semibold text-center max-w-[115px] sm:max-w-[125px] leading-[1.3] transition-colors duration-200 ${
                      isHighlighted ? 'text-[#078F83]' : 'text-[#063D37] group-hover:text-[#078F83]'
                    }`}
                  >
                    {cat.name}
                  </span>

                  {/* Subtitle Count */}
                  <span className="text-[11.5px] text-[#66727A] mt-0.5 font-normal">
                    {cat.count}+ Available
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
