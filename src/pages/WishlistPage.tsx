import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  X, 
  Check, 
  Copy
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ActionPrimaryButton, ActionSecondaryButton } from '../components/AnimatedButtons';

export const WishlistPage: React.FC = () => {
  const { wishlist, moveToCart, toggleWishlist } = useStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddAllToCart = () => {
    const items = [...wishlist];
    items.forEach((item) => moveToCart(item));
  };

  const handleClearWishlist = () => {
    const items = [...wishlist];
    items.forEach((item) => toggleWishlist(item));
  };

  // EMPTY WISHLIST STATE
  if (wishlist.length === 0) {
    return (
      <div className="w-full min-h-[75vh] bg-[#F7FCFB] flex items-center justify-center py-12 px-4 select-none">
        <div className="max-w-md w-full text-center bg-white rounded-[26px] p-8 sm:p-12 border border-[#EAF2F0] shadow-[0_6px_24px_rgba(6,61,55,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Heart className="w-8 h-8" />
          </div>
          <h1 className="text-[24px] sm:text-[26px] font-extrabold text-[#063D37] mb-2">
            Your Wishlist is Empty
          </h1>
          <p className="text-[14px] text-[#66727A] mb-8 leading-relaxed">
            You haven&apos;t saved any tech essentials or devices yet. Click the heart icon on any product card to bookmark it for later.
          </p>
          <ActionPrimaryButton onClick={() => navigate('/products')} size="md">
            Browse Products
          </ActionPrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7FCFB] pb-16 select-none">
      
      {/* ========================================================================= */}
      {/* 1. BREADCRUMB & PAGE HERO HEADER (Matching Reference Image)               */}
      {/* ========================================================================= */}
      <div className="w-full bg-gradient-to-b from-[#EAF8F5] via-[#F4FBFA] to-[#F7FCFB] py-10 sm:py-14 border-b border-[#E2EFEA] relative overflow-hidden">
        {/* Subtle dot grid pattern */}
        <div 
          className="pointer-events-none absolute inset-0 opacity-[0.06] bg-[radial-gradient(#078F83_1.2px,transparent_1.2px)] [background-size:24px_24px]" 
          aria-hidden="true"
        />
        
        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-[32px] sm:text-[42px] font-black text-[#063D37] tracking-tight mb-2">
            Wishlist
          </h1>
          <div className="flex items-center justify-center gap-2 text-[13px] font-semibold text-[#66727A]">
            <Link to="/" className="hover:text-[#078F83] transition-colors">Home</Link>
            <span>/</span>
            <span className="text-[#078F83] font-bold">Wishlist</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN WISHLIST TABLE SECTION                                            */}
      {/* ========================================================================= */}
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Table Container */}
        <div className="bg-white rounded-[24px] border border-[#EAF2F0] shadow-[0_6px_28px_rgba(6,61,55,0.04)] overflow-hidden mb-8">
          
          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[760px]">
              
              {/* TABLE HEADER (Golden/Teal Header from Reference Image in ShopHub Theme) */}
              <thead>
                <tr className="bg-[#078F83] text-white text-[13px] sm:text-[14px] font-extrabold uppercase tracking-wider">
                  <th className="py-4 px-6 w-12 text-center"></th>
                  <th className="py-4 px-4">Product</th>
                  <th className="py-4 px-4">Price</th>
                  <th className="py-4 px-4">Date Added</th>
                  <th className="py-4 px-4">Stock Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>

              {/* TABLE BODY ROWS */}
              <tbody className="divide-y divide-[#EAF2F0] text-[14px]">
                {wishlist.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F9FDFB] transition-colors group">
                    
                    {/* Clear Button (X) */}
                    <td className="py-5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleWishlist(item)}
                        className="w-8 h-8 rounded-full hover:bg-rose-50 text-[#94A3B8] hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </td>

                    {/* Product Image + Details */}
                    <td className="py-5 px-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-[#F4FBFA] p-1 border border-[#E2EFEA] shrink-0 overflow-hidden flex items-center justify-center">
                          <img 
                            src={item.thumbnail || item.images?.[0]} 
                            alt={item.title} 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>
                        <div>
                          <Link 
                            to={`/products`} 
                            className="font-bold text-[#063D37] hover:text-[#078F83] transition-colors line-clamp-1 text-[15px]"
                          >
                            {item.title}
                          </Link>
                          <span className="text-[12px] text-[#078F83] font-semibold uppercase tracking-wider block mt-0.5">
                            Category: {item.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-5 px-4 font-extrabold text-[#063D37] text-[15.5px]">
                      ${Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Date Added */}
                    <td className="py-5 px-4 text-[#66727A] font-medium text-[13.5px]">
                      15 April 2026
                    </td>

                    {/* Stock Status Badge */}
                    <td className="py-5 px-4">
                      {item.stock !== undefined && item.stock <= 0 ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-rose-50 text-rose-600 font-bold text-[12px]">
                          Out of Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#EAF8F5] text-[#078F83] font-bold text-[12px]">
                          In Stock
                        </span>
                      )}
                    </td>

                    {/* Add to Cart Action */}
                    <td className="py-5 px-6 text-right">
                      <ActionPrimaryButton
                        onClick={() => moveToCart(item)}
                        size="sm"
                        disabled={item.stock !== undefined && item.stock <= 0}
                      >
                        Add to Cart
                      </ActionPrimaryButton>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM ACTIONS ROW (Matching Reference Image Layout)                   */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-[22px] border border-[#EAF2F0] shadow-xs mb-12">
          
          {/* Left: Shareable Wishlist Link */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[13.5px] font-bold text-[#063D37]">Wishlist link:</span>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                readOnly 
                value={window.location.href}
                className="h-10 px-4 rounded-full bg-[#F4FBFA] border border-[#D5EFE8] text-[12.5px] text-[#66727A] font-medium w-60 sm:w-72 focus:outline-none select-all"
              />
              <ActionPrimaryButton 
                onClick={handleCopyLink} 
                size="sm"
                icon={copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-white" />}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </ActionPrimaryButton>
            </div>
          </div>

          {/* Right: Clear Wishlist + Add All to Cart */}
          <div className="flex items-center justify-end gap-4 pt-2 md:pt-0 border-t md:border-t-0 border-[#EAF2F0]">
            <button
              type="button"
              onClick={handleClearWishlist}
              className="text-[13.5px] font-bold text-[#66727A] hover:text-rose-600 underline transition-colors cursor-pointer"
            >
              Clear Wishlist
            </button>

            <ActionPrimaryButton onClick={handleAddAllToCart} size="md">
              Add All to Cart
            </ActionPrimaryButton>
          </div>

        </div>

      </div>
    </div>
  );
};
