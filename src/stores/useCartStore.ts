import { create } from 'zustand';
import { Product } from '../types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
  totalItems: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  
  addItem: (product: Product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        ),
      });
    } else {
      set({ items: [...items, { product, quantity }] });
    }
    
    localStorage.setItem('cart', JSON.stringify(get().items));
  },
  
  removeItem: (productId: string) => {
    const items = get().items.filter(item => item.product.id !== productId);
    set({ items });
    localStorage.setItem('cart', JSON.stringify(items));
  },
  
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    set({
      items: get().items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ),
    });
    localStorage.setItem('cart', JSON.stringify(get().items));
  },
  
  clearCart: () => {
    set({ items: [] });
    localStorage.removeItem('cart');
  },
  
  totalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  },
  
  totalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },
}));
