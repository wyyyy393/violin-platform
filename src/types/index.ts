export interface Product {
  id: string;
  title: string;
  type: 'violin' | 'bow' | 'accessory';
  price: number;
  originalPrice?: number;
  condition: '全新' | '99新' | '95新' | '9成新' | '8成新';
  brand?: string;
  maker?: string;
  origin: string;
  size?: '1/8' | '1/4' | '1/2' | '3/4' | '4/4';
  stage: '初学' | '考级' | '艺考' | '专业演奏' | '收藏';
  year?: string;
  description: string;
  soundDescription?: string;
  flaws?: string;
  repairHistory?: string;
  hasCertificate: boolean;
  supportOfflineTrial: boolean;
  supportPlatformTrial: boolean;
  platformCertified: boolean;
  negotiable: boolean;
  images: string[];
  videoUrl?: string;
  seller: Seller;
  rating: number;
  reviewCount: number;
  views: number;
  createdAt: string;
}

export interface Seller {
  id: string;
  username: string;
  avatar: string;
  creditScore: number;
  salesCount: number;
  joinedDate: string;
  role: 'individual' | 'shop' | 'maker' | 'expert';
}

export interface Article {
  id: string;
  title: string;
  category: string;
  cover: string;
  summary: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readCount: number;
  relatedProducts?: string[];
}

export interface Question {
  id: string;
  title: string;
  type: string;
  description: string;
  images?: string[];
  author: User;
  publishDate: string;
  viewCount: number;
  answerCount: number;
  answers: Answer[];
  reward?: number;
}

export interface Answer {
  id: string;
  content: string;
  author: User;
  publishDate: string;
  helpful: number;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  email: string;
  phone: string;
  role: 'buyer' | 'seller' | 'expert';
  creditScore: number;
  salesCount?: number;
  joinedDate: string;
}

export interface Review {
  id: string;
  productId: string;
  user: User;
  rating: number;
  content: string;
  images?: string[];
  publishDate: string;
}

export interface Order {
  id: string;
  product: Product;
  buyer: User;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  totalPrice: number;
}
