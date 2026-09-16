import React, { useState } from 'react';
import { 
  X, 
  ShoppingCart, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Cpu, 
  HardDrive, 
  Layers, 
  CheckCircle2, 
  Sparkles,
  Heart
} from 'lucide-react';
import { Product } from '../types';
import { ActionPrimaryButton } from './AnimatedButtons';

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#063D37]/50 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative w-full max-w-[840px] max-h-[90vh] overflow-y-auto bg-white rounded-[24px] shadow-[0_25px_60px_rgba(6,61,55,0.25)] border border-[#E3F2EE] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-[#F2F9F7] hover:bg-[#E0EFEA] text-[#063D37] flex items-center justify-center transition-colors cursor-pointer z-10"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column: Product Image Showcase */}
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[280px] sm:h-[340px] rounded-[20px] overflow-hidden bg-[#F5F8F7] border border-[#E8F3F0] p-4 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover rounded-[14px]"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#063D37] text-white text-[11px] font-bold tracking-wider uppercase shadow-sm">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Micro guarantees */}
            <div className="grid grid-cols-3 gap-2 w-full mt-4 text-center">
              <div className="p-2 rounded-xl bg-[#F7FCFB] border border-[#E5F2EE] flex flex-col items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#078F83]" />
                <span className="text-[10.5px] font-bold text-[#063D37]">2-Yr Warranty</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F7FCFB] border border-[#E5F2EE] flex flex-col items-center justify-center gap-1">
                <Truck className="w-4 h-4 text-[#078F83]" />
                <span className="text-[10.5px] font-bold text-[#063D37]">Free Shipping</span>
              </div>
              <div className="p-2 rounded-xl bg-[#F7FCFB] border border-[#E5F2EE] flex flex-col items-center justify-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#078F83]" />
                <span className="text-[10.5px] font-bold text-[#063D37]">30-Day Return</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Brand and Rating */}
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="text-[12px] font-extrabold tracking-wider uppercase text-[#078F83]">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1 text-[12.5px] text-[#66727A]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-[#063D37]">{product.rating}</span>
                  <span>({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-[#063D37] text-[20px] sm:text-[24px] font-extrabold leading-tight mb-3">
                {product.title}
              </h2>

              {/* Price Line matching Image 2 */}
              <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-[#EAF2F0]">
                <span className="text-[26px] sm:text-[28px] font-black text-[#063D37]">
                  ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && (
                  <span className="text-[15px] text-[#8C9B97] line-through ml-2 font-normal">
                    ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[#556966] text-[13.5px] leading-relaxed mb-5">
                {product.description || 'Enterprise-grade certified technology unit with rigorously tested hardware components, original packaging, and immediate dispatch readiness.'}
              </p>

              {/* Highlights Specs Checklist */}
              <div className="space-y-2 mb-6 bg-[#F7FCFB] p-3.5 rounded-[16px] border border-[#E2F0EC]">
                <div className="flex items-center gap-2 text-[12.5px] text-[#063D37]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#078F83] shrink-0" />
                  <span>Fully tested and certified hardware inspection checklist passed.</span>
                </div>
                <div className="flex items-center gap-2 text-[12.5px] text-[#063D37]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#078F83] shrink-0" />
                  <span>Original enterprise power adapter &amp; accessories included.</span>
                </div>
                <div className="flex items-center gap-2 text-[12.5px] text-[#063D37]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#078F83] shrink-0" />
                  <span>Dispatched via insured express logistics within 24 hours.</span>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[13px] font-semibold text-[#063D37]">Quantity:</span>
                <div className="flex items-center border border-[#D5EFE8] rounded-full overflow-hidden bg-[#F7FCFB]">
                  <button 
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-[#063D37] hover:bg-[#EAF8F5] transition-colors font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-9 text-center text-[13px] font-bold text-[#063D37]">
                    {quantity}
                  </span>
                  <button 
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-[#063D37] hover:bg-[#EAF8F5] transition-colors font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {onToggleWishlist && (
                  <button
                    type="button"
                    onClick={() => onToggleWishlist(product.id)}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[12px] font-semibold transition-colors cursor-pointer ${
                      isWishlisted 
                        ? 'bg-[#EAF8F5] border-[#078F83] text-[#078F83]' 
                        : 'bg-white border-[#E0EFEA] text-[#66727A] hover:text-[#078F83]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-[#078F83]' : ''}`} />
                    <span>{isWishlisted ? 'Wishlisted' : 'Save'}</span>
                  </button>
                )}
              </div>

              {/* Add to Cart Button matching Image 2 */}
              <div className="space-y-2.5 mt-4">
                <ActionPrimaryButton
                  onClick={handleAdd}
                  className="w-full"
                  size="md"
                  icon={added ? <Check className="w-4 h-4 text-white" /> : <ShoppingCart className="w-4 h-4 text-[#0D7E73]" />}
                >
                  {added ? 'Added to Cart!' : `Add to Cart • $${(product.price * quantity).toFixed(2)}`}
                </ActionPrimaryButton>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    window.location.href = `/products/${product.id}`;
                  }}
                  className="w-full text-center text-[12.5px] font-bold text-[#078F83] hover:text-[#063D37] hover:underline pt-1 transition-colors cursor-pointer block"
                >
                  View Full Product Details &amp; Specifications &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
