const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000';

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

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (options.headers) {
      Object.assign(headers, options.headers);
    }

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: '请求失败' }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  }

  get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' });
  }

  post(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  put(endpoint: string, data?: any) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete(endpoint: string) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

function buildQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined && params[key] !== null) {
      searchParams.append(key, String(params[key]));
    }
  }
  return searchParams.toString();
}

export const api = new ApiClient();

export const authApi = {
  register: (data: { email: string; password: string; nickname: string; phone?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
};

export const productApi = {
  getProducts: (params?: Record<string, string | number>) => {
    const query = params ? buildQueryString(params) : '';
    return api.get(`/products${query ? `?${query}` : ''}`);
  },
  getProduct: (id: string) =>
    api.get(`/products/${id}`),
};

export const orderApi = {
  createOrder: (data: { buyerId: string; items: { productId: string; price: number }[] }) =>
    api.post('/orders', data),
  getOrders: (params?: { buyerId: string; status?: string }) => {
    const query = params ? buildQueryString(params as Record<string, string>) : '';
    return api.get(`/orders${query ? `?${query}` : ''}`);
  },
  updateStatus: (id: string, status: string) =>
    api.put(`/orders/${id}/status`, { status }),
};

export const favoriteApi = {
  add: (userId: string, productId: string) =>
    api.post(`/favorites?userId=${userId}&productId=${productId}`),
  remove: (userId: string, productId: string) =>
    api.delete(`/favorites?userId=${userId}&productId=${productId}`),
  getUserFavorites: (userId: string) =>
    api.get(`/favorites?userId=${userId}`),
  isFavorite: (userId: string, productId: string) =>
    api.get(`/favorites/check?userId=${userId}&productId=${productId}`),
};

export const reviewApi = {
  create: (data: { userId: string; productId: string; rating: number; content: string }) =>
    api.post('/reviews', data),
  getProductReviews: (params: { productId: string; page?: number; limit?: number }) => {
    const query = buildQueryString(params as Record<string, string | number>);
    return api.get(`/reviews?${query}`);
  },
};

export const messageApi = {
  getMessages: (userId: string) =>
    api.get(`/messages?userId=${userId}`),
  getUnreadCount: (userId: string) =>
    api.get(`/messages/unread?userId=${userId}`),
  markAsRead: (id: string) =>
    api.put(`/messages/${id}/read`),
};

export const qaApi = {
  createQuestion: (data: { userId: string; title: string; content: string; category: string }) =>
    api.post('/qa/questions', data),
  getQuestions: (params?: { category?: string; status?: string; page?: number; limit?: number }) => {
    const query = params ? buildQueryString(params as Record<string, string | number>) : '';
    return api.get(`/qa/questions${query ? `?${query}` : ''}`);
  },
  getQuestion: (id: string) =>
    api.get(`/qa/questions/${id}`),
  createAnswer: (data: { questionId: string; userId: string; content: string; isExpert?: boolean }) =>
    api.post('/qa/answers', data),
};

export { API_BASE_URL };