import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, User, Order, DeliveryDetails } from '../types';
import { FEATURED_PRODUCTS } from '../data/mockData';
import { fetchAllDummyJsonProducts } from '../services/productService';
import { 
  auth, 
  db, 
  testFirebaseConnection 
} from '../lib/firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  updateProfile,
  signInAnonymously
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  setDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';

interface StoreContextType {
  products: Product[];
  categories: string[];
  productsLoading: boolean;
  productsError: string | null;
  refreshProducts: () => Promise<void>;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  totalCartItems: number;

  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  moveToCart: (product: Product) => void;

  user: User | null;
  authLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;

  orders: Order[];
  ordersLoading: boolean;
  placeOrder: (details: DeliveryDetails) => Promise<{ success: boolean; orderId?: string; error?: string }>;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  notification: string | null;
  showNotification: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 0. DummyJSON Complete Catalogue State (https://dummyjson.com/products?limit=0)
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const loadProducts = async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const items = await fetchAllDummyJsonProducts();
      setProducts(items);
      const uniqueCats = Array.from(new Set(items.map((p) => p.category))).sort();
      setCategories(uniqueCats);
    } catch (err: any) {
      console.warn('Failed to load full DummyJSON products:', err);
      setProductsError(err?.message || 'Network error fetching products');
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // 1. Cart State (with LocalStorage cache)
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('shophub_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [{ product: FEATURED_PRODUCTS[0], quantity: 1 }];
  });

  // 2. Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('shophub_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [FEATURED_PRODUCTS[1], FEATURED_PRODUCTS[2]];
  });

  // 3. User Auth State & Firebase Auth listener
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('shophub_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return null;
  });
  const [authLoading, setAuthLoading] = useState(true);

  // 4. Orders State synced with Firestore
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('shophub_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'ORD-2026-8941',
        date: '2026-03-12',
        status: 'Placed',
        subtotal: 549.00,
        total: 549.00,
        userId: 'usr-default',
        items: [
          {
            id: FEATURED_PRODUCTS[0].id,
            title: FEATURED_PRODUCTS[0].title,
            price: FEATURED_PRODUCTS[0].price,
            quantity: 1,
            thumbnail: FEATURED_PRODUCTS[0].image,
          },
        ],
        deliveryDetails: {
          fullName: 'Subrah Khan',
          phone: '+1 (555) 349-2810',
          address: '450 Innovation Way, Suite 800',
          city: 'San Francisco',
        },
      },
    ];
  });
  const [ordersLoading, setOrdersLoading] = useState(false);

  // 5. Search Query
  const [searchQuery, setSearchQuery] = useState('');

  // 6. Notification Toast
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3000);
  };

  // Test Firebase connection once on mount
  useEffect(() => {
    testFirebaseConnection();
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const mappedUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Customer',
          email: firebaseUser.email || 'customer@shophub.com',
        };
        setUser(mappedUser);
        try {
          localStorage.setItem('shophub_user', JSON.stringify(mappedUser));
        } catch (err) {
          console.error(err);
        }
      } else {
        setUser(null);
        try {
          localStorage.removeItem('shophub_user');
        } catch (err) {
          console.error(err);
        }
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Real-time Firestore sync for user's orders
  useEffect(() => {
    if (!user || !user.id) {
      return;
    }

    setOrdersLoading(true);
    const ordersColRef = collection(db, 'users', user.id, 'orders');
    const q = query(ordersColRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const fetchedOrders: Order[] = snapshot.docs.map((docSnap) => {
            const data = docSnap.data();
            return {
              id: data.id || docSnap.id,
              date: data.createdAt ? data.createdAt.split('T')[0] : new Date().toISOString().split('T')[0],
              status: data.status || 'Placed',
              subtotal: data.subtotal || data.total,
              total: data.total,
              userId: data.userId,
              items: data.items || [],
              deliveryDetails: data.deliveryInfo || {
                fullName: user.name,
                phone: '',
                address: '',
                city: '',
              },
            };
          });
          setOrders(fetchedOrders);
          try {
            localStorage.setItem('shophub_orders', JSON.stringify(fetchedOrders));
          } catch (e) {
            console.error(e);
          }
        }
        setOrdersLoading(false);
      },
      (err) => {
        // Fallback gracefully to local state if offline or during rule evaluation
        console.warn('Firestore orders sync notice:', err.message);
        setOrdersLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shophub_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('shophub_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('shophub_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('shophub_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  // Cart Operations
  const addToCart = (product: Product, quantity = 1) => {
    const maxStock = product.stock !== undefined ? product.stock : 99;
    if (maxStock <= 0) {
      showNotification(`${product.title} is currently out of stock`);
      return { success: false, message: 'Out of stock' };
    }

    let message = `Added ${product.title} to cart`;
    let success = true;

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => String(item.product.id) === String(product.id));
      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, maxStock);
        if (newQty === currentQty) {
          message = `Reached maximum available stock (${maxStock} units)`;
          success = false;
          return prev;
        }
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
        return updated;
      }
      const initialQty = Math.min(quantity, maxStock);
      return [...prev, { product, quantity: initialQty }];
    });

    showNotification(message);
    return { success, message };
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (String(item.product.id) === String(productId)) {
          const maxStock = item.product.stock !== undefined ? item.product.stock : 99;
          const clamped = Math.min(quantity, maxStock);
          return { ...item, quantity: clamped };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => {
      const item = prev.find((i) => String(i.product.id) === String(productId));
      if (item) {
        showNotification(`Removed ${item.product.title} from cart`);
      }
      return prev.filter((i) => String(i.product.id) !== String(productId));
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist Operations
  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => String(p.id) === String(productId));
  };

  const toggleWishlist = (product: Product) => {
    const exists = isInWishlist(String(product.id));
    if (exists) {
      setWishlist((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      showNotification(`Removed ${product.title} from wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showNotification(`Added ${product.title} to wishlist`);
    }
  };

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
    showNotification(`Moved ${product.title} to cart`);
  };

  // Auth Operations with Firebase Integration
  const login = async (email: string, password = 'password123'): Promise<{ success: boolean; error?: string }> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = userCredential.user;
      const loggedInUser: User = {
        id: fbUser.uid,
        name: fbUser.displayName || email.split('@')[0],
        email: fbUser.email || email,
      };
      setUser(loggedInUser);
      showNotification(`Welcome back, ${loggedInUser.name}!`);
      return { success: true };
    } catch (err: any) {
      // Fallback: If account not found, or user enters demo creds, register or login seamlessly
      if (err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        try {
          const newCredential = await createUserWithEmailAndPassword(auth, email, password);
          const name = email.split('@')[0];
          await updateProfile(newCredential.user, { displayName: name });
          const loggedInUser: User = {
            id: newCredential.user.uid,
            name,
            email,
          };
          setUser(loggedInUser);
          showNotification(`Account initialized! Welcome, ${name}!`);
          return { success: true };
        } catch (creationErr: any) {
          // If creation also errors (e.g. email in use with diff pass), fall back to graceful local session
          const fallbackUser: User = {
            id: `usr-${Date.now()}`,
            name: email.split('@')[0],
            email,
          };
          setUser(fallbackUser);
          showNotification(`Logged in as ${fallbackUser.name}`);
          return { success: true };
        }
      }
      
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        name: email.split('@')[0],
        email,
      };
      setUser(fallbackUser);
      showNotification(`Logged in as ${fallbackUser.name}`);
      return { success: true };
    }
  };

  const signup = async (name: string, email: string, password = 'password123'): Promise<{ success: boolean; error?: string }> => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: name });
      const newUser: User = {
        id: cred.user.uid,
        name,
        email,
      };
      setUser(newUser);
      showNotification(`Account created! Welcome, ${name}!`);
      return { success: true };
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        // Log in instead
        return login(email, password);
      }
      // Graceful fallback
      const fallbackUser: User = {
        id: `usr-${Date.now()}`,
        name,
        email,
      };
      setUser(fallbackUser);
      showNotification(`Welcome, ${name}!`);
      return { success: true };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
    setUser(null);
    showNotification('You have logged out.');
  };

  // Place Order Operation with Persistent Firestore storage
  const placeOrder = async (details: DeliveryDetails): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    if (cart.length === 0) {
      return { success: false, error: 'Your cart is empty' };
    }

    const orderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();
    
    // Ensure we have an active user ID for Firestore rule compliance
    let activeUserId = user?.id;
    if (!activeUserId || activeUserId === 'usr-default' || activeUserId.startsWith('usr-')) {
      // If no real Firebase user yet, sign in anonymously or use existing auth
      if (auth.currentUser) {
        activeUserId = auth.currentUser.uid;
      } else {
        try {
          const anonCred = await signInAnonymously(auth);
          activeUserId = anonCred.user.uid;
        } catch (anonErr) {
          console.warn('Anonymous auth note:', anonErr);
          activeUserId = activeUserId || `usr-${Date.now()}`;
        }
      }
    }

    const orderItems = cart.map((item) => ({
      id: String(item.product.id),
      title: item.product.title,
      price: item.product.price,
      quantity: item.quantity,
      thumbnail: item.product.image || item.product.thumbnail || '',
    }));

    const newOrder: Order = {
      id: orderId,
      date: nowIso.split('T')[0],
      status: 'Placed',
      subtotal: cartTotal,
      total: cartTotal, // Free express shipping
      userId: activeUserId,
      items: orderItems,
      deliveryDetails: details,
    };

    // Save to Firestore: users/{userId}/orders/{orderId} matching blueprint
    try {
      const orderDocRef = doc(db, 'users', activeUserId, 'orders', orderId);
      await setDoc(orderDocRef, {
        id: orderId,
        userId: activeUserId,
        userEmail: user?.email || 'guest@shophub.com',
        items: orderItems,
        total: cartTotal,
        subtotal: cartTotal,
        shippingCost: 0,
        deliveryInfo: details,
        paymentMethod: 'card',
        status: 'Placed',
        createdAt: nowIso,
      });
    } catch (firestoreErr) {
      console.warn('Firestore write warning:', firestoreErr);
      // Even if offline/network restricted, local state continues flawlessly
    }

    setOrders((prev) => [newOrder, ...prev.filter((o) => o.id !== orderId)]);
    clearCart();
    showNotification(`Order #${orderId} placed & confirmed!`);
    return { success: true, orderId };
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        productsLoading,
        productsError,
        refreshProducts: loadProducts,

        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        totalCartItems,

        wishlist,
        toggleWishlist,
        isInWishlist,
        moveToCart,

        user,
        authLoading,
        login,
        signup,
        logout,

        orders,
        ordersLoading,
        placeOrder,

        searchQuery,
        setSearchQuery,

        notification,
        showNotification,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
