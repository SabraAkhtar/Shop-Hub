import React, { useState } from 'react';
import { Sparkles, ArrowRight, Layers } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ActionSecondaryButton } from './AnimatedButtons';

interface NewArrivalsSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  wishlist: string[];
  onToggleWishlist: (productId: string) => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onAddToCart,
  onViewDetails,
  wishlist,
  onToggleWishlist,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'laptops' | 'phones' | 'displays' | 'accessories'>('all');

  const filterTabs = [
    { id: 'all', label: 'All Arrivals' },
    { id: 'laptops', label: 'Laptops & PCs' },
    { id: 'phones', label: 'Smartphones & Tablets' },
    { id: 'displays', label: 'Monitors & Displays' },
    { id: 'accessories', label: 'Audio & Tech Docks' },
  ] as const;

  const filteredProducts = products.filter((p) => {
    const cat = (p.category || '').toLowerCase();
    const title = (p.title || '').toLowerCase();
    if (activeTab === 'all') return true;
    if (activeTab === 'laptops') return cat.includes('laptop') || cat.includes('computer') || title.includes('laptop') || title.includes('macbook');
    if (activeTab === 'phones') return cat.includes('smartphone') || cat.includes('mobile') || cat.includes('tablet') || title.includes('iphone') || title.includes('galaxy');
    if (activeTab === 'displays') return cat.includes('monitor') || cat.includes('screen') || cat.includes('tv') || cat.includes('tablet') || title.includes('screen');
    if (activeTab === 'accessories') return cat.includes('accessor') || cat.includes('audio') || cat.includes('headphone') || cat.includes('watch') || title.includes('airpods');
    return true;
  });

  const displayedProducts = filteredProducts.slice(0, 8);

  return (
    <section 
      id="new-arrivals-section"
      className="w-full bg-[#FFFFFF] py-10 sm:py-14 lg:py-16 border-b border-[#EAF2F0]"
      aria-label="New Arrivals and Hardware Grid"
    >
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION HEADER: NEW ARRIVALS -> PARAGRAPH -> ONE-LINE TABS                */}
        {/* ========================================================================= */}
        <div className="mb-8 sm:mb-10">
          {/* Section Eyebrow */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#078F83]" />
            <span>Direct Inventory Intake</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-[28px] sm:text-[34px] lg:text-[40px] font-black tracking-tight leading-tight">
            <span className="text-[#063D37]">New </span>
            <span className="text-[#078F83]">Arrivals</span>
          </h2>

          {/* Descriptive Paragraph Under Heading */}
          <p className="text-[14px] sm:text-[15px] text-[#66727A] mt-2 max-w-2xl leading-relaxed">
            Fresh enterprise hardware, verified flagship workstations, and certified personal technology updated regularly in our live catalogue.
          </p>

          {/* Category Filter Tabs In One Single Line */}
          <div className="flex items-center gap-2.5 mt-5 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#063D37] text-white shadow-xs'
                    : 'bg-[#F4F9F7] text-[#66727A] hover:bg-[#EAF8F5] hover:text-[#078F83] border border-[#EAF2F0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PRODUCT CARDS 4-COLUMN GRID (Exactly 2 Rows = 8 Products)                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onViewDetails={onViewDetails}
              isWishlisted={wishlist.includes(String(product.id))}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>

        {/* Empty state safeguard */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-[#F8FCFA] rounded-3xl border border-[#EAF2F0]">
            <Layers className="w-12 h-12 text-[#8B9E99] mx-auto mb-3" />
            <p className="text-[16px] font-bold text-[#063D37]">No products in this specific filter</p>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className="mt-3 text-[13px] font-bold text-[#078F83] hover:underline"
            >
              Reset to All Arrivals
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* BOTTOM CATALOG CALLOUT                                                   */}
        {/* ========================================================================= */}
        <div className="mt-10 text-center">
          <ActionSecondaryButton
            onClick={() => navigate('/products')}
            size="md"
          >
            Explore All {products.length}+ Catalog Products
          </ActionSecondaryButton>
        </div>

      </div>
    </section>
  );
};
