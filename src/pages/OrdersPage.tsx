import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PackageCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck,
  Receipt,
  Layers
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ActionPrimaryButton } from '../components/AnimatedButtons';

export const OrdersPage: React.FC = () => {
  const navigate = useNavigate();
  const { orders, user, ordersLoading } = useStore();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const loading = initialLoading && ordersLoading;

  // Filter orders for current user or guest
  const userOrders = orders.filter(
    (o) => !user || o.userId === user.id || o.userId === 'guest' || !o.userId
  );

  // SKELETON LOADING STATE
  if (loading) {
    return (
      <div className="w-full min-h-screen bg-[#F7FCFB] py-10 sm:py-14">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8 animate-pulse space-y-6">
          <div className="w-48 h-8 bg-[#EAF3F0] rounded" />
          <div className="w-full h-44 bg-[#EAF3F0] rounded-[22px]" />
          <div className="w-full h-44 bg-[#EAF3F0] rounded-[22px]" />
        </div>
      </div>
    );
  }

  // EMPTY ORDERS STATE
  if (userOrders.length === 0) {
    return (
      <div className="w-full min-h-[75vh] bg-[#F7FCFB] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center bg-white rounded-[26px] p-8 sm:p-12 border border-[#EAF2F0] shadow-[0_6px_24px_rgba(6,61,55,0.04)]">
          <div className="w-16 h-16 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center mx-auto mb-5 shadow-xs">
            <Receipt className="w-8 h-8" />
          </div>
          <h1 className="text-[24px] sm:text-[26px] font-extrabold text-[#063D37] mb-2">
            No Orders Yet
          </h1>
          <p className="text-[14px] text-[#66727A] mb-8 leading-relaxed">
            You have not placed any orders yet. Browse our selection of certified electronics to initiate your first purchase.
          </p>
          <ActionPrimaryButton
            onClick={() => navigate('/products')}
            icon={<ArrowRight className="w-4 h-4 text-[#0D7E73]" />}
          >
            Browse Products
          </ActionPrimaryButton>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[#F7FCFB] py-8 sm:py-12">
      <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[11px] font-bold tracking-wider uppercase mb-2.5 shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#078F83]" />
              <span>Purchase History</span>
            </div>
            <h1 className="text-[28px] sm:text-[36px] font-extrabold text-[#063D37] tracking-tight">
              My Orders
            </h1>
          </div>

          <div className="text-[13.5px] text-[#66727A]">
            Total orders on record: <strong className="text-[#063D37]">{userOrders.length}</strong>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {userOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-[24px] border border-[#EAF2F0] p-6 sm:p-7 shadow-[0_4px_20px_rgba(6,61,55,0.03)] hover:border-[#D5EFE8] transition-all"
            >
              {/* Order Header info bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#EAF2F0]">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div>
                    <span className="text-[11.5px] uppercase font-bold text-[#66727A] block">
                      Order ID
                    </span>
                    <span className="text-[14.5px] font-extrabold text-[#063D37]">
                      {order.id}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11.5px] uppercase font-bold text-[#66727A] block">
                      Date Placed
                    </span>
                    <span className="text-[13.5px] font-semibold text-[#063D37]">
                      {order.date}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11.5px] uppercase font-bold text-[#66727A] block">
                      Recipient
                    </span>
                    <span className="text-[13.5px] font-semibold text-[#063D37]">
                      {order.deliveryDetails?.fullName || user?.name || 'Customer'}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#EAF8F5] border border-[#7DD8CF]/40 text-[#078F83] text-[12.5px] font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#078F83]" />
                  <span>Status: {order.status}</span>
                </div>
              </div>

              {/* Items List in this order */}
              <div className="py-4 space-y-3">
                {order.items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <div className="flex items-center gap-3">
                      {item.thumbnail ? (
                        <img 
                          src={item.thumbnail} 
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-contain bg-[#F4F9F7] p-1 border border-[#EAF2F0] shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-[#F4F9F7] flex items-center justify-center text-[#078F83] border border-[#EAF2F0]">
                          <Layers className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <div className="text-[14px] font-bold text-[#063D37] line-clamp-1">
                          {item.title}
                        </div>
                        <div className="text-[12.5px] text-[#66727A]">
                          Qty: {item.quantity} &times; ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>

                    <div className="text-[14.5px] font-extrabold text-[#063D37]">
                      ${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Destination & Total footer */}
              <div className="pt-4 border-t border-[#EAF2F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[13px] text-[#66727A]">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#078F83] shrink-0" />
                  <span>
                    Dispatch to: <strong className="text-[#063D37]">{order.deliveryDetails?.address}, {order.deliveryDetails?.city}</strong>
                  </span>
                </div>

                <div className="flex items-baseline gap-2 sm:text-right">
                  <span className="text-[13.5px] text-[#66727A]">Order Total:</span>
                  <span className="text-[19px] font-black text-[#063D37]">
                    ${order.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-[11px] text-[#798C87]">(Free Delivery)</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
