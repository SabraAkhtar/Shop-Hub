import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ArrowRight,
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  AlertCircle,
  Plus,
  Minus,
  Sparkles,
  Layers
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { fetchDummyJsonProductById } from '../services/productService';
import { FEATURED_PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { ActionPrimaryButton, ActionSecondaryButton } from '../components/AnimatedButtons';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, toggleWishlist, products } = useStore();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);

      // Check current in-memory products from DummyJSON first
      const existing = products.find(p => String(p.id) === String(id));
      if (existing) {
        setProduct(existing);
        setSelectedImage(existing.images?.[0] || existing.image);
        setLoading(false);
        return;
      }

      // Check local featured inventory
      const local = FEATURED_PRODUCTS.find(p => String(p.id) === String(id));
      if (local) {
        setProduct(local);
        setSelectedImage(local.images?.[0] || local.image);
        setLoading(false);
        return;
      }

      // Fetch from DummyJSON API
      try {
        const item = await fetchDummyJsonProductById(id);
        setProduct(item);
        setSelectedImage(item.images?.[0] || item.image);
      } catch (err: any) {
        console.error('Error loading product details:', err);
        setError(err.message || 'Error loading product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, products]);

  const isStockAvailable = product && (product.stock === undefined || product.stock > 0);
  const maxStock = product?.stock !== undefined ? product.stock : 99;

  const handleDecrease = () => {
    setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleIncrease = () => {
    setQuantity(prev => Math.min(maxStock, prev + 1));
  };

  const handleAddToCart = () => {
    if (!product || !isStockAvailable) return;
    addToCart(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  // 1. Loading Skeleton State
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F7FCFB] py-10 sm:py-14">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="w-36 h-6 bg-[#EAF3F0] rounded mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            <div className="w-full h-[440px] bg-[#EAF3F0] rounded-[24px]" />
            <div className="space-y-4">
              <div className="w-24 h-4 bg-[#EAF3F0] rounded" />
              <div className="w-full h-8 bg-[#EAF3F0] rounded" />
              <div className="w-32 h-7 bg-[#EAF3F0] rounded" />
              <div className="w-full h-24 bg-[#EAF3F0] rounded" />
              <div className="w-48 h-12 bg-[#EAF3F0] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="w-full min-h-screen bg-[#F7FCFB] py-14">
        <div className="mx-auto max-w-md px-4 text-center bg-white rounded-[24px] p-8 border border-rose-100 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-[20px] font-bold text-[#063D37] mb-2">Error Loading Product</h2>
          <p className="text-[14px] text-[#66727A] mb-6">{error}</p>
          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-5 py-2.5 rounded-full bg-[#078F83] text-white text-[13.5px] font-bold"
            >
              Retry
            </button>
            <Link
              to="/products"
              className="px-5 py-2.5 rounded-full bg-[#EAF8F5] text-[#063D37] text-[13.5px] font-bold hover:bg-[#d5efe9]"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Product Not Found State
  if (!product) {
    return (
      <div className="w-full min-h-screen bg-[#F7FCFB] py-14">
        <div className="mx-auto max-w-md px-4 text-center bg-white rounded-[24px] p-8 border border-[#EAF2F0] shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center mx-auto mb-4">
            <Layers className="w-7 h-7" />
          </div>
          <h2 className="text-[22px] font-bold text-[#063D37] mb-2">Product Not Found</h2>
          <p className="text-[14px] text-[#66727A] mb-6">
            The requested equipment or electronic model could not be found in our official inventory.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#078F83] hover:bg-[#067a70] text-white font-bold text-[13.5px] shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Products</span>
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(String(product.id));

  return (
    <div className="w-full min-h-screen bg-[#F7FCFB] py-8 sm:py-12">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#078F83] hover:text-[#063D37] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>

          <span className="text-[12.5px] text-[#66727A] capitalize">
            Hardware &gt; {product.category}
          </span>
        </div>

        {/* Main Product Details Card */}
        <div className="bg-white rounded-[26px] border border-[#EAF2F0] p-6 sm:p-9 lg:p-11 shadow-[0_6px_28px_rgba(6,61,55,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            
            {/* ======================================================= */}
            {/* LEFT COLUMN: Large Image & Thumbnail Gallery */}
            {/* ======================================================= */}
            <div className="flex flex-col gap-4">
              
              {/* Primary Featured Image Display */}
              <div className="relative w-full h-[320px] sm:h-[420px] rounded-[20px] overflow-hidden bg-[#F4F9F7] border border-[#EAF2F0] flex items-center justify-center p-4">
                <img
                  src={selectedImage || product.image}
                  alt={product.title}
                  className="w-full h-full object-contain transition-all duration-300"
                />

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-xs border transition-all cursor-pointer ${
                    wishlisted
                      ? 'bg-white text-[#078F83] border-[#078F83]'
                      : 'bg-white/90 text-[#66727A] hover:text-[#078F83] border-white/60'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-[#078F83]' : ''}`} />
                </button>

                {/* Badge if present */}
                {product.badge && (
                  <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-[#063D37] text-white text-[11px] font-bold tracking-wider uppercase shadow-xs">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery (if multiple images available) */}
              {product.images && product.images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto py-1 scrollbar-none">
                  {product.images.slice(0, 5).map((imgUrl, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#F4F9F7] border-2 shrink-0 transition-all cursor-pointer ${
                        selectedImage === imgUrl 
                          ? 'border-[#078F83] shadow-xs scale-102' 
                          : 'border-transparent hover:border-[#D5EFE8]'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${product.title} view ${idx + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Guarantees Box */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#EAF2F0] text-[12px] text-[#66727A]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>30-Day Returns</span>
                </div>
              </div>

            </div>


            {/* ======================================================= */}
            {/* RIGHT COLUMN: Information, Stock, Quantity, Add to Cart */}
            {/* ======================================================= */}
            <div className="flex flex-col">
              
              {/* Category & Brand */}
              <div className="flex items-center gap-2 mb-2 text-[12.5px] font-bold uppercase tracking-wider text-[#078F83]">
                <span>{product.brand}</span>
                <span>•</span>
                <span className="text-[#66727A]">{product.category}</span>
              </div>

              {/* Title */}
              <h1 className="text-[24px] sm:text-[30px] lg:text-[34px] font-extrabold text-[#063D37] tracking-tight leading-snug mb-3">
                {product.title}
              </h1>

              {/* Price Line */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="text-[28px] sm:text-[32px] font-extrabold text-[#063D37]">
                  ${Number(product.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-[15px] text-[#8C9B97] line-through">
                    ${product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
              </div>

              {/* Stock Status Notification */}
              <div className="mb-6">
                {isStockAvailable ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F5] border border-[#D5EFE8] text-[#078F83] text-[13px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-[#078F83] animate-pulse" />
                    <span>In Stock ({product.stock} units available)</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-[13px] font-bold">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Out of Stock</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="mb-7 pb-6 border-b border-[#EAF2F0]">
                <h3 className="text-[13.5px] font-bold text-[#063D37] uppercase tracking-wider mb-2">
                  Product Overview
                </h3>
                <p className="text-[#66727A] text-[14.5px] leading-[1.65]">
                  {product.description}
                </p>
              </div>

              {/* Quantity Controls & Add to Cart */}
              <div className="space-y-4">
                
                {/* Quantity Selector */}
                <div>
                  <label className="block text-[12.5px] font-bold text-[#063D37] uppercase tracking-wider mb-2">
                    Select Quantity
                  </label>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-[#D5EFE8] rounded-full p-1 bg-[#F4F9F7]">
                      <button
                        type="button"
                        onClick={handleDecrease}
                        disabled={!isStockAvailable || quantity <= 1}
                        aria-label="Decrease quantity"
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#063D37] hover:bg-[#EAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      
                      <span className="w-12 text-center text-[15px] font-extrabold text-[#063D37]">
                        {isStockAvailable ? quantity : 0}
                      </span>

                      <button
                        type="button"
                        onClick={handleIncrease}
                        disabled={!isStockAvailable || quantity >= maxStock}
                        aria-label="Increase quantity"
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#063D37] hover:bg-[#EAF8F5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[12.5px] text-[#66727A]">
                      {isStockAvailable ? `Max ${maxStock} per order` : 'Cannot purchase'}
                    </span>
                  </div>
                </div>

                {/* Add to Cart & Buy Now CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <ActionPrimaryButton
                    onClick={handleAddToCart}
                    disabled={!isStockAvailable}
                    size="md"
                    className="flex-1"
                    icon={justAdded ? <Check className="w-4 h-4 text-white" /> : <ShoppingCart className="w-4 h-4 text-[#0D7E73]" />}
                  >
                    {justAdded ? 'Added to Cart!' : isStockAvailable ? 'Add to Cart' : 'Out of Stock'}
                  </ActionPrimaryButton>

                  <ActionSecondaryButton
                    onClick={() => {
                      if (isStockAvailable) {
                        addToCart(product, quantity);
                        navigate('/cart');
                      }
                    }}
                    disabled={!isStockAvailable}
                    size="md"
                  >
                    Buy Now
                  </ActionSecondaryButton>
                </div>

              </div>

            </div>

          </div>
        </div>

        {/* ======================================================= */}
        {/* RELATED PRODUCTS SECTION (Replaces irrelevant banners) */}
        {/* ======================================================= */}
        <div className="mt-14 sm:mt-18">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-2.5 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#078F83]" />
                <span>Recommended Selection</span>
              </div>
              <h2 className="text-[26px] sm:text-[32px] font-extrabold text-[#063D37] tracking-tight">
                Related Products
              </h2>
              <p className="text-[14px] text-[#66727A] mt-1">
                More certified hardware and devices in <strong className="text-[#078F83]">{product.category}</strong>
              </p>
            </div>

            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-[13.5px] font-bold text-[#078F83] hover:text-[#063D37] transition-colors"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Related Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
            {products
              .filter(p => String(p.id) !== String(product.id) && p.category === product.category)
              .concat(products.filter(p => String(p.id) !== String(product.id) && p.category !== product.category))
              .slice(0, 4)
              .map((relatedProd) => (
                <ProductCard
                  key={relatedProd.id}
                  product={relatedProd}
                  onAddToCart={addToCart}
                  isInWishlist={isInWishlist(String(relatedProd.id))}
                  onToggleWishlist={() => toggleWishlist(relatedProd)}
                />
              ))}
          </div>
        </div>

      </div>
    </div>
  );
};
