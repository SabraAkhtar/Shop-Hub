import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Heart, 
  User, 
  Menu, 
  X, 
  Cpu, 
  ChevronRight,
  ShieldCheck,
  Zap,
  LogIn,
  LogOut,
  PackageCheck
} from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import logoImg from '../assets/images/shophub_logo_trimmed.png';
import { ActionPrimaryButton } from './AnimatedButtons';

interface HeaderProps {
  viewMode?: 'full' | 'heroOnly';
  onToggleViewMode?: (mode: 'full' | 'heroOnly') => void;
  onNavigateSection?: (sectionId: string) => void;
}


export const Header: React.FC<HeaderProps> = ({
  viewMode = 'full',
  onToggleViewMode,
  onNavigateSection,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    cart, 
    wishlist, 
    user, 
    logout, 
    searchQuery, 
    setSearchQuery,
    totalCartItems 
  } = useStore();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSearchHovered, setIsSearchHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const wishlistCount = wishlist.length;

  // Determine current active nav based on path
  const currentPath = location.pathname;
  const isHome = currentPath === '/';
  const isProducts = currentPath.startsWith('/products');
  const isWishlist = currentPath === '/wishlist';
  const isCart = currentPath === '/cart';

  // Expanded if hovered, focused, or has non-empty query
  const isSearchExpanded = isSearchHovered || isSearchFocused || searchQuery.trim().length > 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/products');
    }
  };

  const handleClearSearch = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <>
      {/* Top Micro-Announcement Bar (Non-sticky) */}
      <div className="bg-[#063D37] text-white w-full border-b border-white/5">
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-1.5 text-[12px] font-medium tracking-wide flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-[#7DD8CF]">
            <Cpu className="w-3.5 h-3.5 text-[#7DD8CF]" />
            <span>2026 Next-Gen Enterprise Tech &amp; Hardware</span>
          </div>

          <div className="flex-1 text-center">
            <span className="text-white/90">
              Complimentary Express Delivery on Orders over $99
            </span>
            <span className="mx-2 text-[#7DD8CF]">•</span>
            <span className="text-[#7DD8CF] font-semibold">2-Year Official Warranty</span>
          </div>

          {/* Quick Orders Link */}
          <div className="hidden md:flex items-center gap-1.5">
            <Link to="/orders" className="hover:text-[#7DD8CF] transition-colors cursor-pointer flex items-center gap-1.5">
              <PackageCheck className="w-3.5 h-3.5" />
              Order Tracking
            </Link>
          </div>
        </div>
      </div>

      <header 
        id="main-navigation"
        className="sticky top-0 z-40 w-full bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E6F0ED] shadow-[0_2px_12px_rgba(6,61,55,0.03)]"
        aria-label="Main Store Navigation"
      >
        {/* Main Navbar: Constrained Width to Match Page */}
        <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-[76px] sm:h-[84px] flex items-center justify-between">
          
          {/* ========================================================= */}
          {/* 1. LEFT: Official ShopHub Logo                            */}
          {/* ========================================================= */}
          <div className="flex items-center shrink-0 flex-1 justify-start">
            <Link 
              to="/"
              className="flex items-center group cursor-pointer focus:outline-none"
              aria-label="ShopHub - Shop More • Live Better"
            >
              <img 
                src={logoImg} 
                alt="ShopHub - Shop More • Live Better" 
                className="h-12 sm:h-14 lg:h-16 w-auto max-w-[160px] sm:max-w-[200px] lg:max-w-[240px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
              />
            </Link>
          </div>


          {/* ========================================================= */}
          {/* 2. CENTER: Navigation Links (Home, Products, Wishlist)     */}
          {/* ========================================================= */}
          <nav 
            className="hidden md:flex flex-none justify-center items-center gap-1.5 lg:gap-3 text-[14px] font-semibold text-[#063D37]"
            aria-label="Primary Navigation"
          >
            {/* Home Link */}
            <Link
              to="/"
              className={`relative px-4 py-2 rounded-full transition-all cursor-pointer ${
                isHome
                  ? 'text-[#078F83] font-bold bg-[#EAF8F5]'
                  : 'hover:text-[#078F83] hover:bg-[#F2F9F7]'
              }`}
            >
              <span>Home</span>
              {isHome && (
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#078F83] rounded-full" />
              )}
            </Link>

            {/* Products Link */}
            <Link
              to="/products"
              className={`relative px-4 py-2 rounded-full transition-all cursor-pointer ${
                isProducts
                  ? 'text-[#078F83] font-bold bg-[#EAF8F5]'
                  : 'hover:text-[#078F83] hover:bg-[#F2F9F7]'
              }`}
            >
              <span>Products</span>
              {isProducts && (
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#078F83] rounded-full" />
              )}
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full transition-all cursor-pointer ${
                isWishlist
                  ? 'text-[#078F83] font-bold bg-[#EAF8F5]'
                  : 'hover:text-[#078F83] hover:bg-[#F2F9F7]'
              }`}
            >
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#078F83] text-white text-[10.5px] font-bold">
                  {wishlistCount}
                </span>
              )}
              {isWishlist && (
                <span className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#078F83] rounded-full" />
              )}
            </Link>
          </nav>


          {/* ========================================================= */}
          {/* 3. RIGHT SIDE: Expanding Search + Subrah + Standalone Cart */}
          {/* ========================================================= */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 lg:gap-3.5 shrink-0 flex-1">
            
            {/* CLEAN EXPANDING SEARCH (Icon in normal state, expands on hover/focus to 220–250px) */}
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setIsSearchHovered(true)}
              onMouseLeave={() => setIsSearchHovered(false)}
            >
              <form 
                onSubmit={handleSearchSubmit}
                role="search"
                className={`relative flex items-center h-10 transition-all duration-300 ease-out ${
                  isSearchExpanded 
                    ? 'w-[200px] xs:w-[220px] sm:w-[240px] md:w-[250px] bg-[#F4F9F7] border border-[#D6ECE6] rounded-full px-2.5 shadow-2xs' 
                    : 'w-10 bg-transparent border border-transparent rounded-full justify-center'
                }`}
              >
                {/* Search Icon */}
                <button
                  type={isSearchExpanded ? "submit" : "button"}
                  onClick={() => {
                    if (!isSearchExpanded) {
                      setIsSearchFocused(true);
                      searchInputRef.current?.focus();
                    }
                  }}
                  aria-label={isSearchExpanded ? "Submit search" : "Open search"}
                  className="flex items-center justify-center w-8 h-8 text-[#063D37] hover:text-[#078F83] rounded-full hover:bg-[#F2F9F7] cursor-pointer shrink-0 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Input Field */}
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search products..."
                  className={`bg-transparent text-[13px] text-[#063D37] placeholder-[#798C87] outline-none tracking-tight font-medium transition-all duration-300 ${
                    isSearchExpanded 
                      ? 'w-full opacity-100 pl-1.5 pr-2' 
                      : 'w-0 opacity-0 p-0 pointer-events-none'
                  }`}
                />

                {/* Clear search 'X' button when query exists */}
                {isSearchExpanded && searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                    className="flex items-center justify-center w-5 h-5 mr-1 text-[#798C87] hover:text-[#063D37] rounded-full hover:bg-[#EAF2F0] cursor-pointer shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>
            </div>

            {/* Account / Login Action on the right */}
            <div className="relative">
              {user ? (
                <ActionPrimaryButton
                  type="button"
                  size="sm"
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  icon={<User className="w-3.5 h-3.5 text-[#0D7E73]" />}
                  className="hidden sm:inline-flex h-9 shadow-[0_4px_14px_rgba(13,126,115,0.22)]"
                >
                  {user.name.split(' ')[0]}
                </ActionPrimaryButton>
              ) : (
                <ActionPrimaryButton
                  type="button"
                  size="sm"
                  onClick={() => navigate('/login')}
                  icon={<LogIn className="w-3.5 h-3.5 text-[#0D7E73]" />}
                  className="hidden sm:inline-flex h-9 shadow-[0_4px_14px_rgba(13,126,115,0.22)]"
                >
                  Login
                </ActionPrimaryButton>
              )}

              {/* Account Dropdown */}
              {accountMenuOpen && user && (
                <div 
                  className="absolute right-0 mt-2 w-52 bg-white rounded-2xl p-2 shadow-xl border border-[#D8EDE8] z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                  onMouseLeave={() => setAccountMenuOpen(false)}
                >
                  <div className="px-3 py-2 border-b border-[#EAF2F0]">
                    <div className="text-[13px] font-bold text-[#063D37] truncate">{user.name}</div>
                    <div className="text-[11.5px] text-[#66727A] truncate">{user.email}</div>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-[#063D37] hover:bg-[#EAF8F5] hover:text-[#078F83] transition-colors"
                  >
                    <PackageCheck className="w-4 h-4 text-[#078F83]" />
                    <span>My Orders</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setAccountMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            {/* Standalone Cart Control (Single clean icon with small circular quantity badge) */}
            <Link
              to="/cart"
              id="open-cart-button"
              aria-label={`View shopping cart with ${totalCartItems} items`}
              className="relative flex items-center justify-center w-10 h-10 rounded-full text-[#063D37] hover:text-[#078F83] hover:bg-[#F2F9F7] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 text-[#063D37] hover:text-[#078F83] transition-colors" />
              <span className="absolute top-0.5 right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#078F83] text-white text-[10px] font-bold leading-none shadow-2xs">
                {totalCartItems}
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#D5EFE8] text-[#063D37] hover:bg-[#EAF8F5] transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Drawer (when open) */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#EAF2F0] bg-white px-5 py-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-left text-[14px] font-semibold ${
                  isHome ? 'bg-[#EAF8F5] text-[#078F83]' : 'text-[#063D37]'
                }`}
              >
                <span>Home</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>

              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-left text-[14px] font-semibold ${
                  isProducts ? 'bg-[#EAF8F5] text-[#078F83]' : 'text-[#063D37]'
                }`}
              >
                <span>Products</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>

              <Link
                to="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-left text-[14px] font-semibold ${
                  isWishlist ? 'bg-[#EAF8F5] text-[#078F83]' : 'text-[#063D37]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#078F83]" />
                  <span>Wishlist</span>
                </div>
                <span className="text-[12px] font-bold text-[#078F83]">{wishlistCount} items</span>
              </Link>

              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-2.5 rounded-xl text-left text-[14px] font-semibold ${
                  isCart ? 'bg-[#EAF8F5] text-[#078F83]' : 'text-[#063D37]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#078F83]" />
                  <span>Shopping Cart</span>
                </div>
                <span className="text-[12px] font-bold text-[#078F83]">{totalCartItems} items</span>
              </Link>

              <Link
                to="/orders"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-left text-[14px] font-semibold text-[#063D37]"
              >
                <div className="flex items-center gap-2">
                  <PackageCheck className="w-4 h-4 text-[#078F83]" />
                  <span>My Orders</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>

              <Link
                to={user ? "/orders" : "/login"}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl text-left text-[14px] font-semibold text-[#063D37]"
              >
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#078F83]" />
                  <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
