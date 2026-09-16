import React, { useState } from 'react';
import { ShoppingCart, Heart, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ActionPrimaryButton } from './AnimatedButtons';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewDetails?: (product: Product) => void;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: string) => void;
  showMoveToCart?: boolean;
  onMoveToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewDetails,
  isWishlisted,
  onToggleWishlist,
  showMoveToCart = false,
  onMoveToCart,
}) => {
  const navigate = useNavigate();
  const store = useStore();
  const [justAdded, setJustAdded] = useState(false);

  // Derive wishlist status from props or store
  const wishlisted = isWishlisted !== undefined ? isWishlisted : store.isInWishlist(String(product.id));

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      store.addToCart(product, 1);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      navigate(`/products/${product.id}`);
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(String(product.id));
    } else {
      store.toggleWishlist(product);
    }
  };

  const handleMoveToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMoveToCart) {
      onMoveToCart(product);
    } else {
      store.moveToCart(product);
    }
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between bg-white rounded-[22px] border border-[#EAF2F0] shadow-[0_2px_14px_rgba(6,61,55,0.04)] hover:shadow-[0_14px_30px_rgba(6,61,55,0.1)] hover:border-[#7DD8CF]/70 transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Top Product Image Container */}
      <div className="relative w-full h-[210px] sm:h-[225px] overflow-hidden bg-[#F4F8F7]">
        <img 
          src={product.image || product.thumbnail} 
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-contain transition-transform duration-400 group-hover:scale-105"
        />

        {/* Floating Wishlist Heart Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer shadow-xs ${
            wishlisted 
              ? 'bg-white text-[#078F83] border border-[#078F83]' 
              : 'bg-white/80 hover:bg-white text-[#66727A] hover:text-[#078F83] border border-white/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-[#078F83]' : ''}`} />
        </button>

        {/* Badge in Bottom Left of Image */}
        {product.badge && (
          <div className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-[#063D37]/85 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase">
            {product.badge}
          </div>
        )}

        {/* Out of Stock Ribbon if stock === 0 */}
        {product.stock !== undefined && product.stock <= 0 && (
          <div className="absolute inset-0 bg-[#063D37]/60 backdrop-blur-[2px] flex items-center justify-center">
            <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[11px] font-extrabold uppercase tracking-wider">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Content Information */}
      <div className="flex flex-col flex-1 justify-between p-5 sm:p-6">
        <div>
          {/* Brand or Category Name in uppercase teal */}
          <div className="text-[12px] font-bold tracking-wider uppercase text-[#078F83] mb-1.5 truncate">
            {product.brand || product.category}
          </div>

          {/* Product Title */}
          <h3 className="text-[#063D37] text-[15.5px] sm:text-[16.5px] font-bold leading-snug line-clamp-2 min-h-[48px] mb-3 group-hover:text-[#078F83] transition-colors">
            {product.title}
          </h3>

          {/* Price line */}
          <div className="flex items-baseline mb-4">
            <span className="text-[21px] sm:text-[23px] font-extrabold text-[#063D37]">
              ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[13px] text-[#8C9B97] line-through ml-2">
                ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col gap-2 pt-1" onClick={(e) => e.stopPropagation()}>
          {showMoveToCart ? (
            <ActionPrimaryButton
              onClick={handleMoveToCart}
              className="w-full"
              size="sm"
              icon={<ShoppingCart className="w-3 h-3 text-[#0D7E73]" />}
            >
              Move to Cart
            </ActionPrimaryButton>
          ) : (
            <ActionPrimaryButton
              onClick={handleAdd}
              disabled={product.stock !== undefined && product.stock <= 0}
              className="w-full"
              size="sm"
              icon={justAdded ? <Check className="w-3 h-3 text-white" /> : <ShoppingCart className="w-3 h-3 text-[#0D7E73]" />}
            >
              {product.stock !== undefined && product.stock <= 0
                ? 'Out of Stock'
                : justAdded 
                  ? 'Added to Cart' 
                  : 'Add to Cart'}
            </ActionPrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
};
