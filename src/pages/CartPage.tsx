import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    updateCartQuantity, 
    removeFromCart, 
    clearCart, 
    cartTotal, 
    totalCartItems 
  } = useStore();

  // EMPTY CART STATE
  if (cart.length === 0) {
    return (
      <div className="w-full min-h-[75vh] bg-[#F7FCFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center bg-white rounded-[26px] p-8 sm:p-12 border border-[#EAF2F0] shadow-[0_6px_24px_rgba(6,61,55,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-[24px] sm:text-[26px] font-extrabold text-[#063D37] mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-[14px] text-[#66727A] mb-8 leading-relaxed">
            Looks like you haven&apos;t added any electronics or hardware to your cart yet. Explore our verified 2026 catalog to find what you need.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#078F83] hover:bg-[#067a70] text-white font-bold text-[14px] transition-all duration-200 shadow-sm hover:shadow-[0_6px_18px_rgba(7,143,131,0.3)]"
          >
            <span>Browse Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7FCFB] py-8 sm:py-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        
        {/* Page Heading */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-2.5 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#078F83]" />
              <span>Checkout Preview</span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] font-extrabold text-[#063D37] tracking-tight">
              Your Cart
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[13.5px] text-[#66727A]">
              Total Items: <strong className="text-[#063D37]">{totalCartItems}</strong>
            </span>
            <button
              type="button"
              onClick={clearCart}
              className="text-[12.5px] font-bold text-rose-600 hover:text-rose-800 underline cursor-pointer"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* Two-Column Layout on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT: Cart Items List (8 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {cart.map(({ product, quantity }) => {
              const maxStock = product.stock !== undefined ? product.stock : 99;
              const subtotal = product.price * quantity;

              return (
                <div 
                  key={product.id}
                  className="bg-white rounded-[20px] p-4 sm:p-5 border border-[#EAF2F0] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:border-[#D5EFE8]"
                >
                  {/* Thumbnail & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <Link 
                      to={`/products/${product.id}`}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#F4F9F7] border border-[#EAF2F0] p-1.5 shrink-0 flex items-center justify-center"
                    >
                      <img 
                        src={product.image || product.thumbnail} 
                        alt={product.title}
                        className="w-full h-full object-contain"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="text-[11px] font-bold tracking-wider uppercase text-[#078F83] mb-1">
                        {product.brand || product.category}
                      </div>
                      <Link 
                        to={`/products/${product.id}`}
                        className="text-[15px] sm:text-[16px] font-bold text-[#063D37] line-clamp-2 hover:text-[#078F83] transition-colors"
                      >
                        {product.title}
                      </Link>
                      <div className="text-[13px] font-semibold text-[#66727A] mt-1">
                        ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })} each
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls + Price + Remove */}
                  <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0F5F3]">
                    
                    {/* Quantity Pill */}
                    <div className="flex items-center border border-[#D5EFE8] rounded-full p-1 bg-[#F4F9F7]">
                      <button
                        type="button"
                        onClick={() => updateCartQuantity(String(product.id), quantity - 1)}
                        aria-label="Decrease quantity"
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#063D37] hover:bg-[#EAF8F5] transition-colors cursor-pointer shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-9 text-center text-[13.5px] font-extrabold text-[#063D37]">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateCartQuantity(String(product.id), quantity + 1)}
                        disabled={quantity >= maxStock}
                        aria-label="Increase quantity"
                        className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-[#063D37] hover:bg-[#EAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right min-w-[90px]">
                      <div className="text-[16px] sm:text-[17px] font-extrabold text-[#063D37]">
                        ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>

                    {/* Remove Action */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(String(product.id))}
                      aria-label="Remove item"
                      className="w-8 h-8 rounded-full flex items-center justify-center text-[#798C87] hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              );
            })}

            {/* Back to Products Link */}
            <div className="pt-2">
              <Link 
                to="/products"
                className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#078F83] hover:text-[#063D37] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>


          {/* ========================================================= */}
          {/* RIGHT: Cart Summary (4 cols) */}
          {/* ========================================================= */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-[24px] p-6 sm:p-7 border border-[#EAF2F0] shadow-[0_4px_20px_rgba(6,61,55,0.04)] sticky top-24">
              
              <h2 className="text-[18px] font-extrabold text-[#063D37] mb-4 pb-3 border-b border-[#EAF2F0]">
                Order Summary
              </h2>

              <div className="space-y-3 text-[14px] mb-6">
                <div className="flex justify-between text-[#66727A]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#063D37]">
                    ${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex justify-between text-[#66727A]">
                  <span>Express Delivery</span>
                  <span className="font-bold text-[#078F83]">
                    FREE
                  </span>
                </div>

                <div className="pt-3 border-t border-[#EAF2F0] flex justify-between items-baseline">
                  <span className="text-[16px] font-bold text-[#063D37]">Total</span>
                  <span className="text-[24px] font-black text-[#063D37]">
                    ${cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={() => navigate('/checkout')}
                className="w-full h-12 rounded-full bg-[#078F83] hover:bg-[#067a70] text-white font-bold text-[14.5px] flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(7,143,131,0.28)] hover:shadow-[0_6px_20px_rgba(7,143,131,0.36)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Badges */}
              <div className="mt-6 pt-5 border-t border-[#EAF2F0] space-y-2 text-[12px] text-[#66727A]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>256-Bit SSL Encrypted Checkout</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>Complimentary Tracked Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>30-Day Money-Back Guarantee</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
