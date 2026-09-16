export interface Product {
  id: string;
  title: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount?: number;
  image: string;
  thumbnail?: string;
  images?: string[];
  stock?: number;
  description: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  count: number;
  slug: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface DeliveryDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
}

export interface OrderItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: 'Placed' | 'Processing' | 'Delivered';
  deliveryDetails: DeliveryDetails;
  userId?: string;
}
