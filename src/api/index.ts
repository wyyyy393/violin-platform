import { products } from '../data/products';
import { questions } from '../data/questions';

class ApiClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token');
    }
    return this.token;
  }
}

export const api = new ApiClient();

export const authApi = {
  register: async (_data: { email: string; password: string; nickname: string; phone?: string }) => {
    return Promise.resolve({ success: true, token: 'mock-token' });
  },
  login: async (_data: { email: string; password: string }) => {
    return Promise.resolve({ success: true, token: 'mock-token' });
  },
};

export const productApi = {
  getProducts: async (_params?: any) => {
    return Promise.resolve({ products, total: products.length });
  },
  getProduct: async (id: string) => {
    const product = products.find(p => p.id === id);
    return Promise.resolve(product);
  },
};

export const orderApi = {
  createOrder: async (_data: { buyerId: string; items: { productId: string; price: number }[] }) => {
    return Promise.resolve({ success: true, orderId: 'mock-order-id' });
  },
  getOrders: async (_params?: { buyerId: string; status?: string }) => {
    return Promise.resolve([]);
  },
  updateStatus: async (_id: string, _status: string) => {
    return Promise.resolve({ success: true });
  },
};

export const favoriteApi = {
  add: async (_userId: string, _productId: string) => {
    return Promise.resolve({ success: true });
  },
  remove: async (_userId: string, _productId: string) => {
    return Promise.resolve({ success: true });
  },
  getUserFavorites: async (_userId: string) => {
    return Promise.resolve([]);
  },
  isFavorite: async (_userId: string, _productId: string) => {
    return Promise.resolve({ isFavorite: false });
  },
};

export const reviewApi = {
  create: async (_data: { userId: string; productId: string; rating: number; content: string }) => {
    return Promise.resolve({ success: true });
  },
  getProductReviews: async (_params: { productId: string; page?: number; limit?: number }) => {
    return Promise.resolve({ reviews: [], total: 0 });
  },
};

export const messageApi = {
  getMessages: async (_userId: string) => {
    return Promise.resolve([]);
  },
  getUnreadCount: async (_userId: string) => {
    return Promise.resolve({ count: 0 });
  },
  markAsRead: async (_id: string) => {
    return Promise.resolve({ success: true });
  },
};

export const qaApi = {
  createQuestion: async (_data: { userId: string; title: string; content: string; category: string }) => {
    return Promise.resolve({ success: true });
  },
  getQuestions: async (_params?: { category?: string; status?: string; page?: number; limit?: number }) => {
    return Promise.resolve({ questions, total: questions.length });
  },
  getQuestion: async (id: string) => {
    const question = questions.find(q => q.id === id);
    return Promise.resolve(question);
  },
  createAnswer: async (_data: { questionId: string; userId: string; content: string; isExpert?: boolean }) => {
    return Promise.resolve({ success: true });
  },
};
