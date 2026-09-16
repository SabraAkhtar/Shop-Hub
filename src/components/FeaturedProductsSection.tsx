import React from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsSectionProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  wishlist,
  onToggleWishlist,
}) => {
  return (
    <section 
      id="featured-products-section"
      className="w-full bg-[#F7FCFB] py-14 sm:py-18 lg:py-22 border-b border-[#EAF2F0]"
      aria-label="Featured Products"
    >
      {/* Expanded max-width (1360px) to give product cards wider, more spacious proportions */}
      <div className="mx-auto max-w-[1360px] px-5 sm:px-8 lg:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            {/* Small Eyebrow Label */}
            <div 
              id="featured-eyebrow"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-3 shadow-2xs"
            >
              <Sparkles className="w-3 h-3 text-[#078F83]" />
              <span>Certified Tech Inventory</span>
            </div>

            {/* Main Heading */}
            <h2 className="text-[28px] sm:text-[34px] lg:text-[38px] font-extrabold tracking-tight leading-tight">
              <span className="text-[#063D37]">Featured </span>
              <span className="text-[#078F83]">Hardware &amp; Equipment</span>
            </h2>
          </div>

          {/* Quick Filter Tag / Indicator */}
          <div className="text-[13px] font-medium text-[#66727A]">
            Showing <span className="font-bold text-[#063D37]">{products.length}</span> verified enterprise units
          </div>
        </div>

        {/* Product Grid: 4 columns desktop with wider cards and comfortable spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
