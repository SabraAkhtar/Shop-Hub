import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  Bell, 
  Search, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  Menu
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/images/shophub_logo_transparent.png';

export const AdminDashboardPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Realistic mock data for the admin presentation
  const stats = [
    { title: 'Total Revenue', value: '$24,592.00', increase: '+14.5%', icon: <DollarSign className="w-5 h-5" /> },
    { title: 'Orders This Month', value: '342', increase: '+8.2%', icon: <ShoppingCart className="w-5 h-5" /> },
    { title: 'Active Customers', value: '1,204', increase: '+12.1%', icon: <Users className="w-5 h-5" /> },
    { title: 'Pending Orders', value: '18', increase: '-2.4%', icon: <Clock className="w-5 h-5" /> },
  ];

  const recentOrders = [
    { id: 'ORD-2026-8941', customer: 'Sabra Akhtar', date: 'Just now', amount: '$1,999.00', status: 'Pending' },
    { id: 'ORD-2026-8940', customer: 'Ali Khan', date: '2 hours ago', amount: '$459.99', status: 'Processing' },
    { id: 'ORD-2026-8939', customer: 'Sarah Ahmed', date: '5 hours ago', amount: '$129.50', status: 'Delivered' },
    { id: 'ORD-2026-8938', customer: 'Usman Raza', date: 'Yesterday', amount: '$89.00', status: 'Delivered' },
    { id: 'ORD-2026-8937', customer: 'Fatima Noor', date: 'Yesterday', amount: '$1,299.00', status: 'Cancelled' },
    { id: 'ORD-2026-8936', customer: 'Zain Malik', date: '2 days ago', amount: '$340.00', status: 'Delivered' },
  ];

  const chartData = [
    { day: 'Mon', sales: 45 },
    { day: 'Tue', sales: 62 },
    { day: 'Wed', sales: 85 },
    { day: 'Thu', sales: 55 },
    { day: 'Fri', sales: 90 },
    { day: 'Sat', sales: 120 },
    { day: 'Sun', sales: 80 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Delivered</span>;
      case 'Processing':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700"><Package className="w-3 h-3" /> Processing</span>;
      case 'Pending':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700"><Clock className="w-3 h-3" /> Pending</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-100 text-rose-700"><XCircle className="w-3 h-3" /> Cancelled</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-gray-100 text-gray-700">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F9F7] flex text-[#063D37]">
      {/* Sidebar */}
      <aside className={`bg-[#063D37] text-white transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-20 flex items-center justify-center border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="Logo" className={`h-10 transition-all ${sidebarOpen ? 'block' : 'hidden'}`} />
            {!sidebarOpen && <div className="w-10 h-10 bg-[#078F83] rounded-xl flex items-center justify-center font-bold text-xl">S</div>}
          </Link>
        </div>
        
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          <NavItem icon={<LayoutDashboard />} label="Dashboard" active isOpen={sidebarOpen} />
          <NavItem icon={<ShoppingCart />} label="Orders" isOpen={sidebarOpen} />
          <NavItem icon={<Package />} label="Products" isOpen={sidebarOpen} />
          <NavItem icon={<Users />} label="Customers" isOpen={sidebarOpen} />
          <NavItem icon={<BarChart3 />} label="Analytics" isOpen={sidebarOpen} />
        </nav>

        <div className="p-4 border-t border-white/10">
          <NavItem icon={<Settings />} label="Settings" isOpen={sidebarOpen} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-[#EAF2F0] flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-[#F2F9F7] text-[#063D37] transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="font-bold text-xl tracking-tight hidden sm:block">Admin Portal</div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search orders, users..." 
                className="w-64 pl-10 pr-4 py-2 bg-[#F4F9F7] border border-[#EAF2F0] rounded-full text-[13px] outline-none focus:border-[#078F83] transition-colors"
              />
            </div>
            
            <button className="relative p-2 rounded-full hover:bg-[#F2F9F7] transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-3 pl-4 border-l border-[#EAF2F0]">
              <div className="w-9 h-9 rounded-full bg-[#078F83] flex items-center justify-center text-white font-bold text-sm shadow-md">
                SA
              </div>
              <div className="hidden sm:block">
                <div className="text-[13px] font-bold">Sabra Akhtar</div>
                <div className="text-[11px] text-gray-500">Super Admin</div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-black tracking-tight">Overview</h1>
              <p className="text-[14px] text-gray-500 mt-1">Monitor your store's performance and recent activities.</p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-[#EAF2F0] rounded-lg text-[13px] font-bold shadow-sm hover:bg-gray-50">Export Report</button>
              <button className="px-4 py-2 bg-[#063D37] text-white rounded-lg text-[13px] font-bold shadow-md hover:bg-[#078F83] transition-colors">Manage Products</button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAF2F0]">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#EAF8F5] text-[#078F83] flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div className={`text-[12px] font-bold px-2 py-1 rounded-full ${stat.increase.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {stat.increase}
                  </div>
                </div>
                <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-1">{stat.title}</div>
                <div className="text-2xl font-black">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sales Chart Area */}
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-[#EAF2F0] flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[16px] font-bold">Revenue Last 7 Days</h2>
                <select className="bg-[#F4F9F7] border-none text-[12px] font-bold py-1.5 px-3 rounded-lg outline-none">
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>
              
              <div className="flex-1 flex items-end justify-between gap-2 pt-6">
                {chartData.map((d, i) => {
                  const max = 120;
                  const heightPercent = (d.sales / max) * 100;
                  const isMax = d.sales === max;
                  
                  return (
                    <div key={i} className="flex flex-col items-center flex-1 group">
                      <div className="text-[11px] font-bold text-gray-400 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">${d.sales}k</div>
                      <div className="w-full max-w-[40px] bg-[#EAF2F0] rounded-t-lg relative overflow-hidden h-[200px]">
                        <div 
                          className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all duration-1000 ${isMax ? 'bg-[#063D37]' : 'bg-[#078F83]'}`}
                          style={{ height: `${heightPercent}%` }}
                        ></div>
                      </div>
                      <div className="text-[12px] font-semibold text-gray-500 mt-3">{d.day}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#EAF2F0]">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[16px] font-bold">Recent Orders</h2>
                <button className="text-[12px] font-bold text-[#078F83] hover:underline">View All</button>
              </div>
              
              <div className="flex flex-col gap-4">
                {recentOrders.slice(0, 5).map((order, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-[#F4F9F7] rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold text-gray-500">
                        {order.customer.charAt(0)}
                      </div>
                      <div>
                        <div className="text-[13px] font-bold">{order.customer}</div>
                        <div className="text-[11px] text-gray-500">{order.id} • {order.date}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="text-[13px] font-black">{order.amount}</div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sidebar Nav Item Component
const NavItem = ({ icon, label, active = false, isOpen }: { icon: React.ReactNode, label: string, active?: boolean, isOpen: boolean }) => (
  <button className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-colors cursor-pointer outline-none ${
    active ? 'bg-[#078F83] text-white shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'
  }`}>
    <div className="shrink-0">{icon}</div>
    {isOpen && <span className="text-[14px] font-semibold tracking-wide whitespace-nowrap">{label}</span>}
  </button>
);
