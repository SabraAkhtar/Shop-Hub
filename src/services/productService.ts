import { Product } from '../types';

export function mapDummyJsonToProduct(item: any): Product {
  const price = typeof item.price === 'number' ? item.price : Number(item.price) || 0;
  const discount = typeof item.discountPercentage === 'number' ? item.discountPercentage : 0;
  const originalPrice = discount > 0 ? Number((price * (1 + discount / 100)).toFixed(2)) : undefined;

  return {
    id: String(item.id),
    title: item.title,
    brand: item.brand || 'Original Brand',
    category: item.category,
    price: price, // Exact API USD price, NO artificial multipliers
    originalPrice: originalPrice,
    rating: typeof item.rating === 'number' ? item.rating : 4.5,
    reviewsCount: (item.reviews && item.reviews.length) || Math.floor((item.rating || 4) * 12),
    image: item.thumbnail,
    thumbnail: item.thumbnail,
    images: Array.isArray(item.images) && item.images.length > 0 ? item.images : [item.thumbnail],
    stock: typeof item.stock === 'number' ? item.stock : 15,
    description: item.description,
    badge: (item.rating && item.rating >= 4.7) ? 'TOP RATED' : (item.stock && item.stock < 5) ? 'LOW STOCK' : undefined,
    isFeatured: typeof item.rating === 'number' ? item.rating >= 4.5 : false,
  };
}

let cachedProducts: Product[] | null = null;

export async function fetchAllDummyJsonProducts(): Promise<Product[]> {
  if (cachedProducts && cachedProducts.length > 0) {
    return cachedProducts;
  }

  const res = await fetch('https://dummyjson.com/products?limit=0');
  if (!res.ok) {
    throw new Error(`Failed to load DummyJSON products (HTTP ${res.status})`);
  }
  const data = await res.json();
  const products = (data.products || []).map(mapDummyJsonToProduct);
  cachedProducts = products;
  return products;
}

export async function fetchDummyJsonProductById(id: string): Promise<Product> {
  // Check cached catalog first
  if (cachedProducts) {
    const found = cachedProducts.find(p => String(p.id) === String(id));
    if (found) return found;
  }

  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error(`Failed to load product #${id} (HTTP ${res.status})`);
  }
  const data = await res.json();
  return mapDummyJsonToProduct(data);
}
