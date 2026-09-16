import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft,
  X,
  CreditCard,
  Banknote,
  Sparkles,
  Lock
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DeliveryDetails } from '../types';
import { ActionPrimaryButton, ActionSecondaryButton } from '../components/AnimatedButtons';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartTotal, 
    totalCartItems, 
    placeOrder, 
    removeFromCart, 
    user 
  } = useStore();

  // Stepper state: 'contact' | 'delivery' | 'payment'
  const [currentStep, setCurrentStep] = useState<'contact' | 'delivery' | 'payment'>('contact');

  // Payment Method Tabs (From Image 3: Cash | Bank Card | PayPal)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'paypal'>('card');

  // Form Fields
  const [fullName, setFullName] = useState(user?.name || 'Subrah Khan');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8829');
  const [expires, setExpires] = useState('12/28');
  const [cvv, setCvv] = useState('492');
  const [phone, setPhone] = useState('+1 (555) 349-2810');
  const [address, setAddress] = useState('450 Innovation Way, Suite 800');
  const [city, setCity] = useState('San Francisco');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderConfirmedId, setOrderConfirmedId] = useState<string | null>(null);

  // If cart is empty and no order was just placed, show empty view
  if (cart.length === 0 && !orderConfirmedId) {
    return (
      <div className="w-full min-h-[70vh] bg-[#F7FCFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center bg-white rounded-[28px] p-8 sm:p-10 border border-[#D8EDE8] shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-7 h-7" />
          </div>
          <h2 className="text-[22px] font-bold text-[#063D37] mb-2">Your Cart is Empty</h2>
          <p className="text-[14px] text-[#66727A] mb-6">
            Add hardware products to your shopping cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#078F83] hover:bg-[#063D37] text-white font-bold text-[13.5px] transition-colors shadow-sm"
          >
            <span>Explore Hardware Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  // ORDER SUCCESS CONFIRMATION VIEW
  if (orderConfirmedId) {
    return (
      <div className="w-full min-h-[75vh] bg-[#F7FCFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full text-center bg-white rounded-[32px] p-8 sm:p-11 border border-[#D8EDE8] shadow-[0_12px_40px_rgba(6,61,55,0.06)]">
          <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-3">
            Payment Verified &bull; Order Confirmed
          </div>

          <h1 className="text-[26px] sm:text-[30px] font-extrabold text-[#063D37] mb-2">
            Thank You for Your Order!
          </h1>
          
          <p className="text-[14px] text-[#66727A] mb-5">
            Your enterprise order <strong className="text-[#063D37]">#{orderConfirmedId}</strong> has been placed and registered in our dispatch system.
          </p>

          <div className="bg-[#F4F9F7] rounded-2xl p-5 mb-7 text-left text-[13px] text-[#063D37] border border-[#D5EFE8] space-y-2">
            <div className="flex justify-between">
              <span className="text-[#66727A]">Customer:</span>
              <span className="font-semibold">{fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#66727A]">Payment Method:</span>
              <span className="font-semibold capitalize">
                {paymentMethod === 'card' ? 'Bank Card (Encrypted)' : paymentMethod === 'cash' ? 'Cash on Delivery' : 'PayPal Instant'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#66727A]">Destination:</span>
              <span className="font-semibold">{address}, {city}</span>
            </div>
            <div className="flex justify-between border-t border-[#D5EFE8] pt-2 mt-1">
              <span className="text-[#66727A]">Delivery Status:</span>
              <span className="font-bold text-[#078F83]">Express Dispatch Scheduled</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              type="button"
              onClick={() => navigate('/orders')}
              className="h-11 px-6 rounded-full bg-[#078F83] hover:bg-[#063D37] text-white font-bold text-[14px] transition-all cursor-pointer shadow-sm"
            >
              Track in My Orders
            </button>
            <Link
              to="/products"
              className="h-11 px-6 rounded-full bg-white hover:bg-[#EAF8F5] border border-[#D5EFE8] text-[#063D37] font-bold text-[14px] flex items-center justify-center transition-colors cursor-pointer"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please provide your full name');
      return;
    }
    if (!phone.trim()) {
      setError('Please provide a contact phone number');
      return;
    }
    if (!address.trim()) {
      setError('Please provide a delivery address');
      return;
    }
    if (!city.trim()) {
      setError('Please enter your city');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.length < 5) {
        setError('Please enter a valid card number');
        return;
      }
      if (!expires.trim()) {
        setError('Please enter card expiration date');
        return;
      }
      if (!cvv.trim()) {
        setError('Please enter card CVV security code');
        return;
      }
    }

    setLoading(true);
    try {
      const details: DeliveryDetails = {
        fullName,
        phone,
        address,
        city,
      };

      const res = await placeOrder(details);
      setLoading(false);

      if (res.success && res.orderId) {
        setOrderConfirmedId(res.orderId);
      } else {
        setError(res.error || 'Checkout failed. Please try again.');
      }
    } catch (err: any) {
      setLoading(false);
      setError(err?.message || 'Checkout failed. Please try again.');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F7FCFB] py-10 sm:py-14">
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* 1. TOP HEADER & STEPPER (DIRECTLY FROM IMAGE 3)                            */}
        {/* ========================================================================= */}
        <div className="text-center mb-10">
          
          {/* Top Title from Image 3: 'CHECKOUT' in bold uppercase */}
          <h1 className="text-[26px] sm:text-[30px] font-black tracking-[0.14em] text-[#063D37] uppercase mb-5">
            CHECKOUT
          </h1>

          {/* Stepper: CONTACT INFO ──── DELIVERY ──── PAYMENT */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 text-[12px] sm:text-[13px] font-bold tracking-wider uppercase text-[#8B9E99]">
            
            {/* Step 1: Contact Info */}
            <button
              type="button"
              onClick={() => setCurrentStep('contact')}
              className={`transition-colors cursor-pointer ${
                currentStep === 'contact' ? 'text-[#078F83] font-black' : 'hover:text-[#063D37]'
              }`}
            >
              CONTACT INFO
            </button>

            <span className="w-8 sm:w-16 h-[1px] bg-[#D5EFE8]" />

            {/* Step 2: Delivery */}
            <button
              type="button"
              onClick={() => setCurrentStep('delivery')}
              className={`transition-colors cursor-pointer ${
                currentStep === 'delivery' ? 'text-[#078F83] font-black' : 'hover:text-[#063D37]'
              }`}
            >
              DELIVERY
            </button>

            <span className="w-8 sm:w-16 h-[1px] bg-[#D5EFE8]" />

            {/* Step 3: Payment (Active from Image 3) */}
            <button
              type="button"
              onClick={() => setCurrentStep('payment')}
              className={`transition-colors cursor-pointer ${
                currentStep === 'payment' ? 'text-[#063D37] font-black border-b-2 border-[#063D37] pb-0.5' : 'hover:text-[#063D37]'
              }`}
            >
              PAYMENT
            </button>

          </div>

        </div>

        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-[13.5px] flex items-center gap-2.5 max-w-xl mx-auto animate-in fade-in">
            <AlertCircle className="w-4.5 h-4.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MAIN TWO-COLUMN LAYOUT (LEFT FORM, RIGHT ORDER CARD FROM IMAGE 3)      */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* ======================================================================= */}
          {/* LEFT SIDE: PAYMENT TABS & MINIMALIST FORM FIELDS                       */}
          {/* ======================================================================= */}
          <div className="lg:col-span-7 bg-white rounded-[28px] p-6 sm:p-10 border border-[#D8EDE8] shadow-sm">
            
            {/* PAYMENT METHOD TABS (Cash | Bank Card | PayPal from Image 3) */}
            <div className="flex items-center justify-start gap-8 sm:gap-12 border-b border-[#EAF2F0] pb-2 mb-8">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`text-[14.5px] font-bold pb-2 transition-colors cursor-pointer ${
                  paymentMethod === 'cash' 
                    ? 'text-[#063D37] border-b-2 border-[#063D37]' 
                    : 'text-[#8B9E99] hover:text-[#063D37]'
                }`}
              >
                Cash
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`text-[14.5px] font-bold pb-2 transition-colors cursor-pointer ${
                  paymentMethod === 'card' 
                    ? 'text-[#063D37] border-b-2 border-[#063D37]' 
                    : 'text-[#8B9E99] hover:text-[#063D37]'
                }`}
              >
                Bank Card
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('paypal')}
                className={`text-[14.5px] font-bold pb-2 transition-colors cursor-pointer ${
                  paymentMethod === 'paypal' 
                    ? 'text-[#063D37] border-b-2 border-[#063D37]' 
                    : 'text-[#8B9E99] hover:text-[#063D37]'
                }`}
              >
                PayPal
              </button>

            </div>

            {/* FORM FIELDS WITH CLEAN UNDERLINE/MINIMALIST FRAMING (Image 3 Style) */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              
              {/* Field 1: Your Name (as in Image 3 cursor example) */}
              <div>
                <label 
                  htmlFor="checkout-name" 
                  className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                >
                  Your name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full py-2.5 px-1 bg-transparent border-b border-[#D5EFE8] text-[15px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                />
              </div>

              {/* Bank Card Specific Fields (shown if Bank Card selected) */}
              {paymentMethod === 'card' && (
                <>
                  {/* Field 2: Card Number */}
                  <div>
                    <label 
                      htmlFor="checkout-card" 
                      className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                    >
                      Card number
                    </label>
                    <input
                      id="checkout-card"
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4532 •••• •••• 8829"
                      className="w-full py-2.5 px-1 bg-transparent border-b border-[#D5EFE8] text-[15px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Side-by-side: Expires & CVV from Image 3 */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label 
                        htmlFor="checkout-expires" 
                        className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                      >
                        Expires
                      </label>
                      <input
                        id="checkout-expires"
                        type="text"
                        required
                        value={expires}
                        onChange={(e) => setExpires(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full py-2.5 px-1 bg-transparent border-b border-[#D5EFE8] text-[15px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label 
                        htmlFor="checkout-cvv" 
                        className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                      >
                        CVV
                      </label>
                      <input
                        id="checkout-cvv"
                        type="password"
                        maxLength={4}
                        required
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="•••"
                        className="w-full py-2.5 px-1 bg-transparent border-b border-[#D5EFE8] text-[15px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* PayPal Notice (if PayPal selected) */}
              {paymentMethod === 'paypal' && (
                <div className="p-4 rounded-2xl bg-[#EAF8F5] border border-[#D5EFE8] text-[13.5px] text-[#063D37] flex items-center gap-3">
                  <span className="font-bold text-[#078F83]">PayPal Instant:</span>
                  <span>Your transaction will be securely authorized with one-click checkout.</span>
                </div>
              )}

              {/* Cash Notice (if Cash selected) */}
              {paymentMethod === 'cash' && (
                <div className="p-4 rounded-2xl bg-[#EAF8F5] border border-[#D5EFE8] text-[13.5px] text-[#063D37] flex items-center gap-3">
                  <Banknote className="w-5 h-5 text-[#078F83] shrink-0" />
                  <span>Pay upon express courier delivery at your doorstep with verified receipt.</span>
                </div>
              )}

              {/* Delivery Details Section */}
              <div className="pt-4 border-t border-[#EAF2F0] space-y-5">
                <div className="text-[12px] font-bold text-[#078F83] uppercase tracking-wider">
                  Delivery Destination
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label 
                      htmlFor="checkout-phone" 
                      className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                    >
                      Phone number
                    </label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full py-2 px-1 bg-transparent border-b border-[#D5EFE8] text-[14px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="checkout-city" 
                      className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                    >
                      City
                    </label>
                    <input
                      id="checkout-city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Berlin, Paris, etc."
                      className="w-full py-2 px-1 bg-transparent border-b border-[#D5EFE8] text-[14px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="checkout-address" 
                    className="block text-[13px] text-[#8B9E99] font-medium mb-1.5"
                  >
                    Street address
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="450 Innovation Way, Suite 800"
                    className="w-full py-2 px-1 bg-transparent border-b border-[#D5EFE8] text-[14px] font-semibold text-[#063D37] placeholder-[#C2D8D2] focus:border-[#078F83] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* BOTTOM ACTIONS (← BACK on Left, CHECKOUT on Right from Image 3) */}
              <div className="pt-6 flex items-center justify-between">
                
                {/* Secondary CTA (Left) */}
                <ActionSecondaryButton
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                  size="md"
                  showArrow={false}
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> BACK
                </ActionSecondaryButton>

                {/* Primary CTA (Right) */}
                <ActionPrimaryButton
                  type="submit"
                  disabled={loading}
                  size="md"
                  icon={loading ? <div className="w-4 h-4 border-2 border-[#0D7E73] border-t-transparent rounded-full animate-spin" /> : undefined}
                >
                  {loading ? 'PROCESSING...' : 'CHECKOUT'}
                </ActionPrimaryButton>

              </div>

            </form>

          </div>


          {/* ======================================================================= */}
          {/* RIGHT SIDE: "YOUR ORDER" FLOATING SUMMARY CARD (DIRECTLY FROM IMAGE 3) */}
          {/* ======================================================================= */}
          <div className="lg:col-span-5 bg-white rounded-[28px] p-6 sm:p-8 border border-[#D8EDE8] shadow-[0_8px_30px_rgba(6,61,55,0.04)]">
            
            {/* Header: 'Your order' on left, 'Edit order' on right (Image 3) */}
            <div className="flex items-center justify-between pb-4 border-b border-[#EAF2F0] mb-5">
              <h3 className="text-[17px] font-bold text-[#063D37]">
                Your order
              </h3>
              <Link
                to="/cart"
                className="text-[12.5px] font-medium text-[#8B9E99] hover:text-[#078F83] underline transition-colors"
              >
                Edit order
              </Link>
            </div>

            {/* ORDER ITEMS LIST (Image 3: thumbnail, title, price, quantity badge, 'x' button) */}
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex items-center justify-between gap-3 pb-4 border-b border-dashed border-[#D8EDE8]"
                >
                  {/* Thumbnail */}
                  <div className="w-13 h-13 rounded-xl bg-[#F4F9F7] p-1.5 shrink-0 flex items-center justify-center border border-[#EAF2F0]">
                    <img 
                      src={item.product.image} 
                      alt={item.product.title}
                      className="w-full h-full object-contain" 
                    />
                  </div>

                  {/* Title & Price */}
                  <div className="flex-1 min-w-0 pr-2">
                    <h4 className="text-[13.5px] font-bold text-[#063D37] truncate">
                      {item.product.title}
                    </h4>
                    <span className="text-[13px] font-semibold text-[#8B9E99]">
                      ${item.product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Quantity Badge (e.g., 1 x from Image 3) */}
                  <span className="text-[12.5px] font-bold text-[#8B9E99] whitespace-nowrap">
                    {item.quantity} ×
                  </span>

                  {/* 'x' Remove Button from Image 3 */}
                  <button
                    type="button"
                    onClick={() => removeFromCart(item.product.id)}
                    aria-label={`Remove ${item.product.title}`}
                    className="w-6 h-6 rounded-full hover:bg-[#F4F9F7] text-[#8B9E99] hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* FINANCIAL BREAKDOWN WITH DASHED DIVIDERS (From Image 3) */}
            <div className="space-y-2.5 text-[13.5px] text-[#66727A]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-[#063D37]">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-[#078F83]">
                  Free Express
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Taxes</span>
                <span className="font-semibold text-[#063D37]">
                  Included
                </span>
              </div>
            </div>

            {/* Dashed Separator before TOTAL */}
            <div className="my-4 border-t border-dashed border-[#D8EDE8]" />

            {/* Prominent TOTAL Display (Image 3 Style) */}
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-extrabold text-[#063D37] uppercase tracking-wider">
                TOTAL
              </span>
              <span className="text-[24px] sm:text-[26px] font-black text-[#063D37] tracking-tight">
                ${cartTotal.toFixed(2)}
              </span>
            </div>

            {/* Guarantee Tag */}
            <div className="mt-6 pt-4 border-t border-[#EAF2F0] flex items-center justify-center gap-2 text-[12px] text-[#8B9E99]">
              <ShieldCheck className="w-4 h-4 text-[#078F83]" />
              <span>256-Bit Encrypted Secure Checkout</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
