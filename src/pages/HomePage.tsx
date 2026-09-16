import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategorySection } from '../components/CategorySection';
import { FeaturedProductsCarousel } from '../components/FeaturedProductsCarousel';
import { PromoBannerSection } from '../components/PromoBannerSection';
import { NewArrivalsSection } from '../components/NewArrivalsSection';
import { SmartDigitalLifeSection } from '../components/SmartDigitalLifeSection';
import { ProductDetailsModal } from '../components/ProductDetailsModal';
import { CartDrawer } from '../components/CartDrawer';
import { FEATURED_PRODUCTS } from '../data/mockData';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Eye } from 'lucide-react';

export const HomePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'full' | 'heroOnly'>('full');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { 
    cart, 
    addToCart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    wishlist, 
    toggleWishlist,
    searchQuery,
    products 
  } = useStore();

  const allAvailableProducts = products && products.length > 0 ? products : FEATURED_PRODUCTS;
  const wishlistIds = wishlist.map((p) => String(p.id));

  const scrollToSection = (sectionId: string) => {
    if (viewMode === 'heroOnly') {
      setViewMode('full');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
    scrollToSection('featured-products-section');
  };

  // Filter products if search query or category is selected on homepage (supports all DummyJSON categories)
  const displayedProducts = allAvailableProducts.filter((p) => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchesTitle = p.title.toLowerCase().includes(q);
      const matchesBrand = p.brand.toLowerCase().includes(q);
      const matchesCategory = p.category.toLowerCase().includes(q);
      if (!matchesTitle && !matchesBrand && !matchesCategory) return false;
    }

    if (selectedCategory) {
      const cat = selectedCategory.toLowerCase();
      const pCat = p.category.toLowerCase();
      return pCat === cat || pCat.includes(cat) || cat.includes(pCat);
    }

    return true;
  });

  return (
    <>
      {/* ============================================================= */}
      {/* 1. HERO SECTION — FULL VIEWPORT / EDGE-TO-EDGE WIDTH         */}
      {/* ============================================================= */}
      <HeroSection
        products={allAvailableProducts}
        onShopClick={() => scrollToSection('featured-products-section')}
        onExploreClick={() => scrollToSection('category-section')}
      />

      {/* ============================================================= */}
      {/* 2. ALL OTHER SECTIONS — NOT FULL WIDTH (CENTERED CONTAINER)  */}
      {/* ============================================================= */}
      <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 py-8 sm:py-12">
        {viewMode === 'full' ? (
          <>
            {/* Section One: Shop by Category */}
            <CategorySection
              selectedCategory={selectedCategory}
              onSelectCategory={handleSelectCategory}
            />

            {/* Section Two: Featured Products Auto-Scrolling Coverflow Carousel */}
            <FeaturedProductsCarousel
              products={allAvailableProducts.slice(0, 16)}
              onAddToCart={(product) => addToCart(product, 1)}
              onViewDetails={(product) => setSelectedProductForModal(product)}
              wishlist={wishlistIds}
              onToggleWishlist={(id) => {
                const item = allAvailableProducts.find((p) => String(p.id) === String(id));
                if (item) toggleWishlist(item);
              }}
            />

            {/* Section Three: Promotional Flash Sale Banner */}
            <PromoBannerSection
              onShopClick={() => scrollToSection('new-arrivals-section')}
            />

            {/* Section Four: New Arrivals & Trending Product Cards */}
            <NewArrivalsSection
              products={displayedProducts}
              onAddToCart={(product) => addToCart(product, 1)}
              onViewDetails={(product) => setSelectedProductForModal(product)}
              wishlist={wishlistIds}
              onToggleWishlist={(id) => {
                const item = allAvailableProducts.find((p) => String(p.id) === String(id));
                if (item) toggleWishlist(item);
              }}
            />

            {/* Section Five: Unified Showcase & 3 Feature Cards */}
            <SmartDigitalLifeSection
              onShopClick={() => scrollToSection('new-arrivals-section')}
              onExploreClick={() => scrollToSection('category-section')}
              onCategoryClick={(cat) => handleSelectCategory(cat)}
            />
          </>
        ) : (
          /* Hero-Only Notice Bar */
          <div className="bg-[#EAF8F5] py-8 text-center rounded-2xl border border-[#D4EDE6]">
            <div className="max-w-md mx-auto px-4 flex flex-col items-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#078F83] text-[12px] font-bold shadow-2xs mb-2">
                <Eye className="w-3.5 h-3.5" />
                Hero Section Isolated View
              </span>
              <p className="text-[13.5px] text-[#66727A] mb-3">
                Viewing solely the ShopHub Hero Section as specified in the prompt requirement.
              </p>
              <button
                type="button"
                onClick={() => setViewMode('full')}
                className="px-4 py-2 rounded-full bg-[#078F83] hover:bg-[#067a70] text-white text-[13px] font-semibold transition-all shadow-xs cursor-pointer"
              >
                Expand All 4 Sections (Categories, Featured, Showcase, Cards)
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
      />

      {/* Product Details Modal (Interactive View Details) */}
      <ProductDetailsModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={(product) => addToCart(product, 1)}
        isWishlisted={selectedProductForModal ? wishlistIds.includes(String(selectedProductForModal.id)) : false}
        onToggleWishlist={(id) => {
          const item = allAvailableProducts.find((p) => String(p.id) === String(id));
          if (item) toggleWishlist(item);
        }}
      />
    </>
  );
};
