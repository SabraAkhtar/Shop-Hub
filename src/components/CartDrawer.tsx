import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { ActionPrimaryButton } from './AnimatedButtons';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= 99 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#063D37]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#EAF2F0] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#EAF8F5] flex items-center justify-center text-[#078F83]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-[17px] font-bold text-[#063D37]">Your Cart</h3>
                <p className="text-[12px] text-[#66727A]">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button 
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#66727A] hover:text-[#063D37] hover:bg-[#F4FBFA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[#EAF8F5] flex items-center justify-center text-[#078F83] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-[16px] font-bold text-[#063D37] mb-1">Your cart is empty</h4>
                <p className="text-[13.5px] text-[#66727A] max-w-[240px] mb-6">
                  Add items from our Featured Products or category explorer to get started.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full bg-[#078F83] hover:bg-[#067a70] text-white text-[13px] font-semibold transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3.5 rounded-2xl bg-[#F7FCFB] border border-[#E6F0ED]"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl bg-white border border-[#EAF2F0] p-1.5 flex items-center justify-center shrink-0">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#078F83]">
                        {item.product.brand}
                      </span>
                      <h4 className="text-[13.5px] font-bold text-[#063D37] line-clamp-1">
                        {item.product.title}
                      </h4>
                      <div className="text-[14px] font-extrabold text-[#063D37] mt-0.5">
                        ${(item.product.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>
                    </div>

                    {/* Quantity Selector & Remove */}
                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#EAF2F0]">
                      <div className="flex items-center gap-2 bg-white rounded-lg border border-[#E0EFEA] px-2 py-0.5">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="text-[#66727A] hover:text-[#063D37] cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[12px] font-bold text-[#063D37] w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="text-[#66727A] hover:text-[#063D37] cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-[#66727A] hover:text-red-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#EAF2F0] bg-white space-y-4">
              <div className="space-y-2 text-[13.5px]">
                <div className="flex justify-between text-[#66727A]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#063D37]">
                    ${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between text-[#66727A]">
                  <span>Express Shipping</span>
                  <span className="font-semibold text-[#078F83]">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-[16px] font-extrabold text-[#063D37] pt-2 border-t border-[#EAF2F0]">
                  <span>Total</span>
                  <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <ActionPrimaryButton
                className="w-full"
                onClick={() => {
                  onClose();
                  navigate('/checkout');
                }}
              >
                Proceed to Checkout
              </ActionPrimaryButton>

              <div className="flex items-center justify-center gap-2 text-[11.5px] text-[#66727A]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#078F83]" />
                <span>256-Bit SSL Encrypted Electronics Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
