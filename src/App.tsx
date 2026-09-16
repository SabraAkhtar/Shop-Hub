import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { WishlistPage } from './pages/WishlistPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { Check } from 'lucide-react';

// Automatically scroll window to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  const { notification } = useStore();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FCFB] text-[#102F2C]">
      <ScrollToTop />
      
      {/* Universal 2026 Navigation Bar */}
      <Header />

      {/* Main Routed Page Content */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Universal ShopHub Footer (Includes Unified Pre-Footer Section) */}
      <Footer />

      {/* Global Floating Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#063D37] text-white text-[13.5px] font-medium shadow-xl border border-[#0A9F91]/40 animate-fade-in">
          <div className="w-5 h-5 rounded-full bg-[#078F83] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{notification}</span>
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </StoreProvider>
  );
}
