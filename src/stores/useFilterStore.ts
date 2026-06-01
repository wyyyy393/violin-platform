import { create } from 'zustand';

interface FilterState {
  category: string | null;
  priceRange: [number, number] | null;
  condition: string[];
  size: string[];
  stage: string[];
  brand: string[];
  origin: string[];
  searchQuery: string;
  sortBy: 'newest' | 'price-low' | 'price-high' | 'popular' | 'rating';
}

interface FilterStore {
  filters: FilterState;
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
}

const initialFilters: FilterState = {
  category: null,
  priceRange: null,
  condition: [],
  size: [],
  stage: [],
  brand: [],
  origin: [],
  searchQuery: '',
  sortBy: 'newest',
};

export const useFilterStore = create<FilterStore>((set) => ({
  filters: initialFilters,
  
  updateFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    set((state) => ({
      filters: {
        ...state.filters,
        [key]: value,
      },
    }));
  },
  
  resetFilters: () => {
    set({ filters: initialFilters });
  },
  
  setSearchQuery: (query: string) => {
    set((state) => ({
      filters: {
        ...state.filters,
        searchQuery: query,
      },
    }));
  },
}));
