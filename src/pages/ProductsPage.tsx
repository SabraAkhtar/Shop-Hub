import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  AlertCircle, 
  Sparkles, 
  PackageOpen, 
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../context/StoreContext';
import { fetchAllDummyJsonProducts } from '../services/productService';
import { AnimatedOtter } from '../components/AnimatedOtter';
import { ActionPrimaryButton } from '../components/AnimatedButtons';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchQuery: globalSearch, setSearchQuery: setGlobalSearch } = useStore();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filters State
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || globalSearch || '';

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Fetch full products catalogue from DummyJSON (https://dummyjson.com/products?limit=0)
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAllDummyJsonProducts();
      setProducts(data);

      // Extract all unique categories directly from DummyJSON without restricting
      const rawCategories = Array.from(new Set(data.map((p) => p.category))).sort();
      setCategories(rawCategories);
    } catch (err: any) {
      console.error('Failed to load DummyJSON products:', err);
      setError(err?.message || 'Failed to load product catalogue. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Sync with URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const q = searchParams.get('search');
    if (q !== null) setSearchTerm(q);
  }, [searchParams]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setGlobalSearch(val);
    if (!val) {
      searchParams.delete('search');
    } else {
      searchParams.set('search', val);
    }
    setSearchParams(searchParams);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setGlobalSearch('');
    setSelectedCategory('all');
    setSortBy('default');
    setSearchParams({});
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Search filter
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      list = list.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, searchTerm, selectedCategory, sortBy]);

  return (
    <div className="w-full min-h-screen bg-[#F7FCFB] py-10 sm:py-14">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================= */}
        {/* Header Title Area */}
        {/* ========================================================= */}
        <div className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-3 shadow-2xs">
            <Sparkles className="w-3 h-3 text-[#078F83]" />
            <span>Official 2026 Catalog</span>
          </div>

          <h1 className="text-[30px] sm:text-[38px] lg:text-[42px] font-extrabold text-[#063D37] tracking-tight leading-tight mb-2">
            All Products
          </h1>

          <p className="text-[#66727A] text-[14px] sm:text-[15.5px] max-w-[680px]">
            Explore certified laptops, workstations, smart devices, audio gear, and cutting-edge electronics with official multi-year warranties.
          </p>
        </div>

        {/* ========================================================= */}
        {/* Controls Toolbar: Search, Category, Price Sorting, Reset */}
        {/* ========================================================= */}
        <div className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#EAF2F0] shadow-[0_4px_18px_rgba(6,61,55,0.03)] mb-8">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search input field */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#078F83]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by title, brand, or model..."
                className="w-full h-[42px] pl-10 pr-4 rounded-full bg-[#F4F9F7] border border-[#D8EDE8] text-[#063D37] text-[13.5px] font-medium placeholder-[#7D918C] focus:bg-white focus:border-[#078F83] focus:outline-none transition-all"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[12px] font-bold text-[#7D918C] hover:text-[#063D37] cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Right Filters Group */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Category Dropdown */}
              <div className="relative flex items-center">
                <Filter className="absolute left-3.5 w-3.5 h-3.5 text-[#078F83] pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="h-[42px] pl-9 pr-8 rounded-full bg-[#F4F9F7] border border-[#D8EDE8] text-[#063D37] text-[13px] font-semibold appearance-none cursor-pointer focus:bg-white focus:border-[#078F83] focus:outline-none transition-all"
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Sort Dropdown */}
              <div className="relative flex items-center">
                <ArrowUpDown className="absolute left-3.5 w-3.5 h-3.5 text-[#078F83] pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="h-[42px] pl-9 pr-8 rounded-full bg-[#F4F9F7] border border-[#D8EDE8] text-[#063D37] text-[13px] font-semibold appearance-none cursor-pointer focus:bg-white focus:border-[#078F83] focus:outline-none transition-all"
                >
                  <option value="default">Sort by: Default</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>

              {/* Reset Filters Button */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="h-[42px] px-4 rounded-full border border-[#D8EDE8] bg-white hover:bg-[#EAF8F5] text-[#063D37] hover:text-[#078F83] text-[13px] font-bold inline-flex items-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

            </div>

          </div>

          {/* Current result count indicator */}
          <div className="mt-3.5 pt-3.5 border-t border-[#EAF2F0] flex items-center justify-between text-[12.5px] text-[#66727A]">
            <div>
              Showing <span className="font-bold text-[#063D37]">{filteredProducts.length}</span> matching products
              {selectedCategory !== 'all' && (
                <span> in <strong className="text-[#078F83] capitalize">{selectedCategory}</strong></span>
              )}
              {searchTerm && (
                <span> for &ldquo;<strong className="text-[#063D37]">{searchTerm}</strong>&rdquo;</span>
              )}
            </div>

            {(selectedCategory !== 'all' || searchTerm || sortBy !== 'default') && (
              <span className="text-[#078F83] font-semibold">
                Filters Active
              </span>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* Content Area: Loading / Error / Empty / Product Grid */}
        {/* ========================================================= */}

        {/* LOADING SKELETON STATE */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-[22px] border border-[#EAF2F0] p-5 animate-pulse flex flex-col justify-between h-[390px]"
              >
                <div>
                  <div className="w-full h-[200px] bg-[#EAF3F0] rounded-xl mb-4" />
                  <div className="w-20 h-4 bg-[#EAF3F0] rounded mb-2" />
                  <div className="w-full h-5 bg-[#EAF3F0] rounded mb-2" />
                  <div className="w-2/3 h-5 bg-[#EAF3F0] rounded mb-4" />
                </div>
                <div className="w-full h-11 bg-[#EAF3F0] rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE WITH RETRY BUTTON */}
        {!loading && error && products.length === 0 && (
          <div className="bg-white rounded-[24px] border border-rose-100 p-8 sm:p-12 text-center max-w-md mx-auto my-12 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-7 h-7" />
            </div>
            <h3 className="text-[20px] font-bold text-[#063D37] mb-2">Unable to Load Catalog</h3>
            <p className="text-[14px] text-[#66727A] mb-6">
              There was an issue connecting to the hardware catalog service. Please check your connection or retry.
            </p>
            <button
              type="button"
              onClick={fetchProducts}
              className="px-6 py-2.5 rounded-full bg-[#078F83] hover:bg-[#067a70] text-white font-bold text-[14px] transition-all cursor-pointer shadow-sm"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* EMPTY SEARCH / FILTER STATE (Cute Otter Animated 404 Experience) */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="bg-white rounded-[28px] border border-[#EAF2F0] p-8 sm:p-12 text-center max-w-xl mx-auto my-8 shadow-[0_10px_35px_rgba(6,61,55,0.06)] text-[#063D37] overflow-hidden relative flex flex-col items-center">
            
            {/* Background Soft Aura */}
            <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-[#EAF8F5] blur-3xl opacity-70" />

            {/* Interactive Animated Cute Otter Character */}
            <div className="w-full flex items-center justify-center mb-4">
              <AnimatedOtter maxW="max-w-[320px] sm:max-w-[360px]" />
            </div>

            {/* 404 / No Match Headline */}
            <div className="text-[26px] sm:text-[32px] font-black tracking-tight text-[#063D37] mb-2">
              <span className="text-[#078F83]">404 • </span>No Products Found
            </div>

            <p className="text-[14px] sm:text-[15px] text-[#66727A] max-w-[460px] mx-auto mb-7 leading-relaxed font-normal">
              {searchTerm 
                ? `We couldn't find any product matching "${searchTerm}". Our cute assistant searched everywhere in the catalog!`
                : 'No products matched your selected filters. Try broadening your criteria or reset all filters.'}
            </p>

            <ActionPrimaryButton
              onClick={handleResetFilters}
              size="md"
            >
              Reset Filters &amp; View All Products
            </ActionPrimaryButton>
          </div>
        )}

        {/* PRODUCT GRID */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
