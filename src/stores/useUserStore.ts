import { create } from 'zustand';
import { User } from '../types';

interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  favorites: string[];
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addFavorite: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isLoggedIn: false,
  favorites: [],
  
  login: (user: User) => {
    set({ user, isLoggedIn: true });
    localStorage.setItem('user', JSON.stringify(user));
  },
  
  logout: () => {
    set({ user: null, isLoggedIn: false, favorites: [] });
    localStorage.removeItem('user');
  },
  
  updateProfile: (data: Partial<User>) => {
    const currentUser = get().user;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...data };
      set({ user: updatedUser });
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  },
  
  addFavorite: (productId: string) => {
    const favorites = get().favorites;
    if (!favorites.includes(productId)) {
      set({ favorites: [...favorites, productId] });
      localStorage.setItem('favorites', JSON.stringify([...favorites, productId]));
    }
  },
  
  removeFavorite: (productId: string) => {
    const favorites = get().favorites.filter(id => id !== productId);
    set({ favorites });
    localStorage.setItem('favorites', JSON.stringify(favorites));
  },
  
  isFavorite: (productId: string) => {
    return get().favorites.includes(productId);
  },
}));
