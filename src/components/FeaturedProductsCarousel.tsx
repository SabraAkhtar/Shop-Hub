import React, { useState, useEffect, useRef } from 'react';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ActionPrimaryButton, ActionSecondaryButton } from './AnimatedButtons';

interface FeaturedProductsCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const FeaturedProductsCarousel: React.FC<FeaturedProductsCarouselProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  wishlist,
  onToggleWishlist,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(2); // Start centered (index 2)
  const [isHovered, setIsHovered] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const touchStartX = useRef<number | null>(null);

  const total = products.length;

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll right-to-left one by one every 3.5s (pauses on hover)
  useEffect(() => {
    if (isHovered || total <= 1) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, total]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const handleCardClick = (index: number, product: Product) => {
    if (index !== activeIndex) {
      // If clicking a side card, center it
      setActiveIndex(index);
    } else {
      // If already centered, open modal or navigate
      if (onViewDetails) {
        onViewDetails(product);
      } else {
        navigate(`/products/${product.id}`);
      }
    }
  };

  // Helper to compute offset relative to activeIndex (handles circular wrap)
  const getRelativeOffset = (index: number) => {
    let diff = index - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <section 
      id="featured-products-section"
      className="w-full bg-[#F7FCFB] py-8 sm:py-12 border-b border-[#EAF2F0] overflow-hidden select-none relative"
      aria-label="Featured Products Carousel"
    >
      {/* Decorative Background Auras & Radial Elements */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#078F83]/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#7DD8CF]/15 blur-3xl" />
      
      {/* Subtle Background Dot Grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(#078F83_1.2px,transparent_1.2px)] [background-size:28px_28px] opacity-[0.05]" />

      <div className="relative z-10 mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER                                                           */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-4 sm:mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-2.5 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#078F83]" />
              <span>Auto-Scrolling Showcase</span>
            </div>

            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-black tracking-tight leading-tight">
              <span className="text-[#063D37]">Featured </span>
              <span className="text-[#078F83]">Products</span>
            </h2>

            {/* Short descriptive paragraph under Featured Products */}
            <p className="text-[#66727A] text-[14px] sm:text-[15px] mt-1.5 max-w-[540px] leading-relaxed">
              Explore our handpicked collection of flagship devices, certified electronics, and modern essentials engineered for everyday excellence.
            </p>

            {/* View All Catalog Button under paragraph */}
            <div className="mt-3">
              <ActionSecondaryButton
                onClick={() => navigate('/products')}
                size="md"
              >
                View All Catalog
              </ActionSecondaryButton>
            </div>
          </div>

          {/* Decorative Center Line & Dots Accent (Fills empty gap nicely) */}
          <div className="hidden lg:flex items-center gap-2 self-center flex-1 max-w-[240px] mx-6 opacity-60 pointer-events-none" aria-hidden="true">
            <div className="h-[1.5px] flex-1 bg-gradient-to-r from-[#078F83]/40 via-[#078F83]/20 to-transparent rounded-full" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#078F83]/60 animate-pulse" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#7DD8CF]" />
            <span className="w-1 h-1 rounded-full bg-[#078F83]/30" />
          </div>

          {/* Navigation Prev / Next Controls on Header */}
          <div className="flex items-center gap-2.5 sm:self-end">
            {/* Left Prev Arrow Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous product"
              className="w-10 h-10 rounded-full bg-white border border-[#D5EFE8] text-[#063D37] hover:bg-[#078F83] hover:text-white hover:border-[#078F83] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Right Next Arrow Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next product"
              className="w-10 h-10 rounded-full bg-white border border-[#D5EFE8] text-[#063D37] hover:bg-[#078F83] hover:text-white hover:border-[#078F83] flex items-center justify-center transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAROUSEL STAGE (Centered Coverflow Inspired by Image 2)                    */}
        {/* ========================================================================= */}
        <div 
          className="relative w-full py-4 sm:py-6 flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Carousel Viewport */}
          <div className="relative w-full h-[510px] sm:h-[540px] flex items-center justify-center overflow-visible">
            
            {products.map((product, index) => {
              const offset = getRelativeOffset(index);
              const isCenter = offset === 0;
              const isWishlisted = wishlist.includes(String(product.id));
              const isJustAdded = justAddedId === product.id;

              const isDesktop = windowWidth >= 1024;
              const isTablet = windowWidth >= 640 && windowWidth < 1024;
              const isMobile = windowWidth < 640;

              // Requested: Exactly 3 cards shown (offsets: -1 on left, 0 in center, +1 on right)
              if (Math.abs(offset) > 1) return null;

              // Responsive translation math for 3 cards perfectly centered
              let translateX = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isDesktop) {
                const spacing = windowWidth >= 1280 ? 345 : 310;
                translateX = offset * spacing;
                zIndex = isCenter ? 40 : 25;
                scale = isCenter ? 1.12 : 0.94;
                opacity = isCenter ? 1 : 0.85;
              } else if (isTablet) {
                const spacing = 265;
                translateX = offset * spacing;
                zIndex = isCenter ? 40 : 25;
                scale = isCenter ? 1.08 : 0.92;
                opacity = isCenter ? 1 : 0.80;
              } else {
                const spacing = Math.min(235, windowWidth * 0.68);
                translateX = offset * spacing;
                zIndex = isCenter ? 40 : 25;
                scale = isCenter ? 1.06 : 0.88;
                opacity = isCenter ? 1 : 0.60;
              }

              return (
                <div
                  key={product.id}
                  onClick={() => handleCardClick(index, product)}
                  style={{
                    transform: `translateX(${translateX}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                  className={`absolute w-[260px] sm:w-[285px] md:w-[305px] lg:w-[325px] transition-all duration-500 ease-out cursor-pointer ${
                    isCenter 
                      ? 'shadow-[0_25px_60px_rgba(6,61,55,0.22)] ring-2 ring-[#078F83]/35' 
                      : 'shadow-[0_8px_25px_rgba(6,61,55,0.06)] hover:opacity-95'
                  } bg-white rounded-[28px] border border-[#EAF2F0] p-4 sm:p-5 flex flex-col justify-between`}
                >
                  
                  {/* Top Bar: Pill Badge on Left, Wishlist Heart on Right (From Image 2) */}
                  <div className="flex items-center justify-between mb-2 z-10">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full tracking-wider ${
                      isCenter 
                        ? 'bg-[#EAF8F5] text-[#078F83] border border-[#7DD8CF]/40' 
                        : 'bg-[#F4F9F7] text-[#66727A]'
                    }`}>
                      {product.badge || (index % 2 === 0 ? 'Best Seller' : 'Trending')}
                    </span>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleWishlist(String(product.id));
                      }}
                      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                        isWishlisted 
                          ? 'bg-[#EAF8F5] text-[#078F83]' 
                          : 'hover:bg-[#F4F9F7] text-[#8B9E99] hover:text-[#078F83]'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#078F83]' : ''}`} />
                    </button>
                  </div>

                  {/* Center Product Image Container (Light Clean Studio Canvas from Image 2) */}
                  <div className="w-full h-[180px] sm:h-[195px] rounded-2xl bg-[#F8FCFA] p-3 flex items-center justify-center overflow-hidden relative group/img">
                    <img
                      src={product.image || product.thumbnail}
                      alt={product.title}
                      loading="lazy"
                      className="w-full h-full object-contain transition-transform duration-400 group-hover/img:scale-105"
                    />
                  </div>

                  {/* 3 Dot Carousel Position Indicators under product image (Directly from Image 2) */}
                  <div className="flex items-center justify-center gap-1 my-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#078F83]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D5EFE8]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D5EFE8]" />
                  </div>

                  {/* Product Details (Title, Description, Rating from Image 2) */}
                  <div className="text-left px-1">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#063D37] leading-snug truncate mb-1">
                      {product.title}
                    </h3>

                    <p className="text-[12px] text-[#66727A] line-clamp-1 mb-2 font-normal">
                      {product.description || 'Enterprise certified hardware with multi-year official warranty.'}
                    </p>

                    {/* Star Rating from Image 2: ★ 4.8 (120) */}
                    <div className="flex items-center gap-1 text-[12px] text-[#66727A] mb-3">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-[#063D37]">{product.rating || 4.8}</span>
                      <span className="text-[#8B9E99]">({product.reviewsCount || 120})</span>
                    </div>

                    {/* Bottom Row: Price on Left, Action Button on Right (Image 2 Style) */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#F0F6F4]">
                      
                      {/* Price Display */}
                      <span className="text-[18px] sm:text-[19px] font-extrabold text-[#063D37]">
                        ${product.price.toFixed(2)}
                      </span>

                      {/* ACTION BUTTON (Image 2 logic: Center Card gets Full 'Add to Cart' Pill, Sides get Round Cart Icon) */}
                      {isCenter ? (
                        <ActionPrimaryButton
                          onClick={(e) => handleAddToCart(e, product)}
                          size="sm"
                          icon={isJustAdded ? <Check className="w-3.5 h-3.5 text-white" /> : <ShoppingCart className="w-3.5 h-3.5 text-[#0D7E73]" />}
                        >
                          {isJustAdded ? 'Added' : 'Add to Cart'}
                        </ActionPrimaryButton>
                      ) : (
                        /* Side Card Compact Cart Icon Button with Primary Green styling */
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(e, product)}
                          aria-label={`Add ${product.title} to cart`}
                          className="w-8 h-8 rounded-full bg-[#078F83] hover:bg-[#063D37] text-white flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-white" />
                        </button>
                      )}

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* ========================================================================= */}
        {/* BOTTOM PAGINATION DOTS (DIRECTLY FROM IMAGE 2: • • ● • •)                 */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {products.map((_, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  isActive 
                    ? 'w-6 h-2 bg-[#078F83]' 
                    : 'w-2 h-2 bg-[#D5EFE8] hover:bg-[#7DD8CF]'
                }`}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
};
