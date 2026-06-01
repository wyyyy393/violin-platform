import React, { useState } from 'react';
import {
  Package,
  Tag,
  Heart,
  MessageCircle,
  Bell,
  Star,
  MapPin,
  Settings,
  X,
  ChevronRight,
  Plus,
  Minus,
  CheckCircle,
  Clock,
  Truck,
  FileEdit,
  Trash2,
  Edit,
} from 'lucide-react';
import { Product } from '../types';

type MenuItem =
  | 'orders'
  | 'publish'
  | 'favorites'
  | 'consultations'
  | 'messages'
  | 'reviews'
  | 'addresses'
  | 'settings';

interface Order {
  id: string;
  product: Product;
  status: 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
  totalPrice: number;
}

interface PublishedItem {
  id: string;
  product: Product;
  views: number;
  favorites: number;
  status: 'active' | 'sold' | 'expired';
}

interface FavoriteItem {
  id: string;
  type: 'product' | 'article';
  product?: Product;
  title: string;
  price?: number;
  addedAt: string;
}

interface Consultation {
  id: string;
  title: string;
  type: 'question' | 'answer';
  content: string;
  responseCount: number;
  createdAt: string;
  status: 'pending' | 'answered';
}

interface Message {
  id: string;
  title: string;
  content: string;
  type: 'system' | 'order' | 'promotion';
  isRead: boolean;
  createdAt: string;
}

interface Review {
  id: string;
  productTitle: string;
  rating: number;
  content: string;
  createdAt: string;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  province: string;
  city: string;
  district: string;
  detail: string;
  isDefault: boolean;
}

const mockOrders: Order[] = [
  {
    id: 'ORD001',
    product: {
      id: '1',
      title: '雅马哈 SV-200 专业演奏小提琴',
      type: 'violin',
      price: 12800,
      condition: '99新',
      brand: '雅马哈',
      origin: '日本',
      stage: '专业演奏',
      hasCertificate: true,
      supportOfflineTrial: true,
      supportPlatformTrial: true,
      platformCertified: true,
      negotiable: false,
      images: ['/violin1.jpg'],
      seller: {
        id: 's1',
        username: '专业琴行',
        avatar: '/avatar1.jpg',
        creditScore: 98,
        salesCount: 156,
        joinedDate: '2023-01-15',
        role: 'shop',
      },
      rating: 4.9,
      reviewCount: 89,
      views: 2340,
      createdAt: '2024-01-10',
      description: '原装进口，专业演奏级，适合音乐会使用',
    },
    status: 'shipped',
    createdAt: '2024-01-20 14:30',
    totalPrice: 12800,
  },
  {
    id: 'ORD002',
    product: {
      id: '2',
      title: 'Dominant 弦线套装 初学推荐',
      type: 'accessory',
      price: 320,
      condition: '全新',
      origin: '奥地利',
      stage: '初学',
      hasCertificate: true,
      supportOfflineTrial: false,
      supportPlatformTrial: false,
      platformCertified: false,
      negotiable: true,
      images: ['/string1.jpg'],
      seller: {
        id: 's2',
        username: '音乐配件店',
        avatar: '/avatar2.jpg',
        creditScore: 95,
        salesCount: 234,
        joinedDate: '2022-06-20',
        role: 'shop',
      },
      rating: 4.7,
      reviewCount: 156,
      views: 890,
      createdAt: '2024-01-08',
      description: '进口琴弦，适合各种小提琴',
    },
    status: 'pending',
    createdAt: '2024-01-22 09:15',
    totalPrice: 320,
  },
  {
    id: 'ORD003',
    product: {
      id: '3',
      title: '古董意大利小提琴 1920年制',
      type: 'violin',
      price: 88000,
      condition: '95新',
      origin: '意大利',
      stage: '收藏',
      year: '1920',
      hasCertificate: true,
      supportOfflineTrial: true,
      supportPlatformTrial: true,
      platformCertified: true,
      negotiable: true,
      images: ['/antique.jpg'],
      seller: {
        id: 's3',
        username: '古董收藏家',
        avatar: '/avatar3.jpg',
        creditScore: 100,
        salesCount: 12,
        joinedDate: '2021-03-10',
        role: 'individual',
      },
      rating: 5.0,
      reviewCount: 8,
      views: 4560,
      createdAt: '2024-01-05',
      description: '百年古董琴，音色绝佳，具有收藏价值',
    },
    status: 'completed',
    createdAt: '2024-01-15 16:45',
    totalPrice: 88000,
  },
];

const mockPublishedItems: PublishedItem[] = [
  {
    id: 'PUB001',
    product: {
      id: 'p1',
      title: '萨陶布 Bows 工作室定制琴弓',
      type: 'bow',
      price: 5600,
      condition: '全新',
      origin: '巴西',
      stage: '专业演奏',
      hasCertificate: true,
      supportOfflineTrial: true,
      supportPlatformTrial: false,
      platformCertified: true,
      negotiable: false,
      images: ['/bow1.jpg'],
      seller: {
        id: 'u1',
        username: '我的店铺',
        avatar: '/myavatar.jpg',
        creditScore: 96,
        salesCount: 8,
        joinedDate: '2024-01-01',
        role: 'individual',
      },
      rating: 4.8,
      reviewCount: 3,
      views: 567,
      createdAt: '2024-01-18',
      description: '专业定制琴弓，巴西苏木材质',
    },
    views: 567,
    favorites: 23,
    status: 'active',
  },
  {
    id: 'PUB002',
    product: {
      id: 'p2',
      title: '斯特拉迪瓦里风格练习琴',
      type: 'violin',
      price: 4200,
      condition: '9成新',
      origin: '中国',
      stage: '考级',
      hasCertificate: false,
      supportOfflineTrial: true,
      supportPlatformTrial: true,
      platformCertified: false,
      negotiable: true,
      images: ['/violin2.jpg'],
      seller: {
        id: 'u1',
        username: '我的店铺',
        avatar: '/myavatar.jpg',
        creditScore: 96,
        salesCount: 8,
        joinedDate: '2024-01-01',
        role: 'individual',
      },
      rating: 4.6,
      reviewCount: 5,
      views: 234,
      createdAt: '2024-01-16',
      description: '考级用琴，音色优秀',
    },
    views: 234,
    favorites: 12,
    status: 'sold',
  },
];

const mockFavorites: FavoriteItem[] = [
  {
    id: 'FAV001',
    type: 'product',
    product: {
      id: 'f1',
      title: '德国原装进口琴弦套装',
      type: 'accessory',
      price: 890,
      condition: '全新',
      origin: '德国',
      stage: '专业演奏',
      hasCertificate: true,
      supportOfflineTrial: false,
      supportPlatformTrial: false,
      platformCertified: true,
      negotiable: false,
      images: ['/string2.jpg'],
      seller: {
        id: 's4',
        username: '进口乐器商',
        avatar: '/avatar4.jpg',
        creditScore: 97,
        salesCount: 89,
        joinedDate: '2022-11-05',
        role: 'shop',
      },
      rating: 4.9,
      reviewCount: 234,
      views: 1200,
      createdAt: '2024-01-12',
      description: '德国制造，品质保证',
    },
    title: '德国原装进口琴弦套装',
    price: 890,
    addedAt: '2024-01-20 10:30',
  },
  {
    id: 'FAV002',
    type: 'article',
    title: '如何选择适合初学者的小提琴',
    addedAt: '2024-01-19 15:20',
  },
  {
    id: 'FAV003',
    type: 'product',
    product: {
      id: 'f2',
      title: '雅马哈 V5SK 学生入门小提琴',
      type: 'violin',
      price: 2680,
      condition: '99新',
      brand: '雅马哈',
      origin: '日本',
      stage: '初学',
      size: '1/4',
      hasCertificate: true,
      supportOfflineTrial: true,
      supportPlatformTrial: true,
      platformCertified: true,
      negotiable: false,
      images: ['/violin3.jpg'],
      seller: {
        id: 's1',
        username: '专业琴行',
        avatar: '/avatar1.jpg',
        creditScore: 98,
        salesCount: 156,
        joinedDate: '2023-01-15',
        role: 'shop',
      },
      rating: 4.8,
      reviewCount: 567,
      views: 8900,
      createdAt: '2024-01-08',
      description: '学生入门首选，音色均衡',
    },
    title: '雅马哈 V5SK 学生入门小提琴',
    price: 2680,
    addedAt: '2024-01-18 09:15',
  },
];

const mockConsultations: Consultation[] = [
  {
    id: 'CON001',
    title: '关于如何判断小提琴音色的好坏',
    type: 'question',
    content: '初学者如何通过试音来判断一把小提琴的音色是否优秀？有哪些具体的方法和标准？',
    responseCount: 5,
    createdAt: '2024-01-21 11:20',
    status: 'answered',
  },
  {
    id: 'CON002',
    title: '专业老师解答关于琴弓选购问题',
    type: 'answer',
    content: '根据您的描述，建议选择中等重量的巴西苏木琴弓，弓杆弹性要好...',
    responseCount: 1,
    createdAt: '2024-01-19 16:30',
    status: 'answered',
  },
  {
    id: 'CON003',
    title: '关于二手小提琴的保养问题',
    type: 'question',
    content: '购买的二手小提琴需要注意哪些保养问题？特别是琴弦和琴弓的更换周期？',
    responseCount: 0,
    createdAt: '2024-01-22 08:45',
    status: 'pending',
  },
];

const mockMessages: Message[] = [
  {
    id: 'MSG001',
    title: '您的订单已发货',
    content: '订单 ORD001 已发货，快递单号：SF1234567890，预计3天内送达',
    type: 'order',
    isRead: false,
    createdAt: '2024-01-22 14:30',
  },
  {
    id: 'MSG002',
    title: '平台认证通过通知',
    content: '恭喜！您发布的小提琴已通过平台专业鉴定，获得平台认证标志',
    type: 'system',
    isRead: true,
    createdAt: '2024-01-21 10:00',
  },
  {
    id: 'MSG003',
    title: '新春特惠活动开始了',
    content: '全场小提琴8折起，优惠码：SPRING2024，立即使用',
    type: 'promotion',
    isRead: false,
    createdAt: '2024-01-20 09:00',
  },
  {
    id: 'MSG004',
    title: '用户咨询您的商品',
    content: '用户"音乐爱好者"咨询了您发布的"萨陶布 Bows 工作室定制琴弓"',
    type: 'order',
    isRead: true,
    createdAt: '2024-01-19 15:45',
  },
];

const mockReviews: Review[] = [
  {
    id: 'REV001',
    productTitle: '雅马哈 SV-200 专业演奏小提琴',
    rating: 5,
    content: '非常满意！音色浑厚，做工精细，物流也很快，包装很专业。',
    createdAt: '2024-01-21 16:20',
  },
  {
    id: 'REV002',
    productTitle: 'Dominant 弦线套装',
    rating: 4,
    content: '弦线质量很好，换上后音色有明显提升，客服态度也很好。',
    createdAt: '2024-01-20 11:30',
  },
];

const mockAddresses: Address[] = [
  {
    id: 'ADDR001',
    name: '张三',
    phone: '138****6789',
    province: '北京市',
    city: '北京市',
    district: '朝阳区',
    detail: '建国路88号现代城1号楼1501室',
    isDefault: true,
  },
  {
    id: 'ADDR002',
    name: '李四',
    phone: '139****1234',
    province: '上海市',
    city: '上海市',
    district: '浦东新区',
    detail: '世纪大道100号上海中心大厦201室',
    isDefault: false,
  },
];

const UserCenter: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('orders');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [profileForm, setProfileForm] = useState({
    username: '小提琴爱好者',
    email: 'user@example.com',
    phone: '13812345678',
    description: '热爱古典音乐，专注小提琴收藏与交流',
  });

  const menuItems: { id: MenuItem; label: string; icon: React.ReactNode }[] = [
    { id: 'orders', label: '我的订单', icon: <Package size={20} /> },
    { id: 'publish', label: '我的发布', icon: <Tag size={20} /> },
    { id: 'favorites', label: '我的收藏', icon: <Heart size={20} /> },
    { id: 'consultations', label: '我的咨询', icon: <MessageCircle size={20} /> },
    { id: 'messages', label: '我的消息', icon: <Bell size={20} /> },
    { id: 'reviews', label: '我的评价', icon: <Star size={20} /> },
    { id: 'addresses', label: '我的地址', icon: <MapPin size={20} /> },
    { id: 'settings', label: '账户设置', icon: <Settings size={20} /> },
  ];

  const filteredOrders =
    orderFilter === 'all'
      ? mockOrders
      : mockOrders.filter((order) => order.status === orderFilter);

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      pending: '待付款',
      paid: '待发货',
      shipped: '待收货',
      completed: '已完成',
      cancelled: '已取消',
    };
    return labels[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-orange-custom',
      paid: 'bg-neon-blue',
      shipped: 'bg-neon-yellow',
      completed: 'bg-neon-green',
      cancelled: 'bg-gray-400',
    };
    return colors[status];
  };

  const getStatusIcon = (status: Order['status']) => {
    const icons = {
      pending: <Clock size={16} />,
      paid: <FileEdit size={16} />,
      shipped: <Truck size={16} />,
      completed: <CheckCircle size={16} />,
      cancelled: <X size={16} />,
    };
    return icons[status];
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    alert('个人信息已保存！');
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'orders':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="section-title">我的订单</h2>
              <div className="flex flex-wrap gap-2">
                {['all', 'pending', 'paid', 'shipped', 'completed'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setOrderFilter(filter)}
                    className={`px-4 py-2 border-4 border-black font-bold transition-colors ${
                      orderFilter === filter
                        ? 'bg-neon-yellow'
                        : 'bg-white hover:bg-gray-100'
                    }`}
                  >
                    {filter === 'all'
                      ? '全部'
                      : filter === 'pending'
                      ? '待付款'
                      : filter === 'paid'
                      ? '待发货'
                      : filter === 'shipped'
                      ? '待收货'
                      : '已完成'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="card-brutal bg-white">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b-4 border-black">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-sm">订单号: {order.id}</span>
                      <span className="font-mono text-sm text-gray-500">
                        {order.createdAt}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-4 py-2 border-4 border-black ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      <span className="font-bold">{getStatusLabel(order.status)}</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-gray-200 border-4 border-black flex items-center justify-center">
                      <Package size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {order.product.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {order.product.condition} | {order.product.origin}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>卖家: {order.product.seller.username}</span>
                        <span>销量: {order.product.seller.salesCount}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl text-neon-pink">
                        ¥{order.totalPrice.toLocaleString()}
                      </p>
                      <div className="flex flex-col gap-2 mt-4">
                        {order.status === 'pending' && (
                          <>
                            <button className="btn-brutal-primary px-4 py-2">
                              立即付款
                            </button>
                            <button className="btn-brutal px-4 py-2">取消订单</button>
                          </>
                        )}
                        {order.status === 'shipped' && (
                          <button className="btn-brutal-primary px-4 py-2">
                            确认收货
                          </button>
                        )}
                        {order.status === 'completed' && (
                          <button className="btn-brutal px-4 py-2">
                            评价订单
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'publish':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="section-title">我的发布</h2>
              <button className="btn-brutal-primary flex items-center gap-2">
                <Plus size={20} />
                发布新商品
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPublishedItems.map((item) => (
                <div key={item.id} className="card-brutal bg-white">
                  <div className="flex gap-4 mb-4">
                    <div className="w-32 h-32 bg-gray-200 border-4 border-black flex items-center justify-center">
                      <Tag size={48} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {item.product.title}
                      </h3>
                      <p className="font-display text-2xl text-neon-pink mb-2">
                        ¥{item.product.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2">
                        {item.status === 'active' && (
                          <span className="bg-neon-green border-2 border-black px-3 py-1 text-sm font-bold">
                            在售
                          </span>
                        )}
                        {item.status === 'sold' && (
                          <span className="bg-gray-400 border-2 border-black px-3 py-1 text-sm font-bold text-white">
                            已售出
                          </span>
                        )}
                        {item.product.platformCertified && (
                          <span className="bg-neon-yellow border-2 border-black px-3 py-1 text-sm font-bold">
                            平台认证
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t-4 border-black">
                    <div className="flex gap-6 text-sm text-gray-600">
                      <span>浏览 {item.views}</span>
                      <span>收藏 {item.favorites}</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="btn-brutal p-2">
                        <Edit size={16} />
                      </button>
                      <button className="btn-brutal p-2">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'favorites':
        return (
          <div className="space-y-6">
            <h2 className="section-title">我的收藏</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockFavorites.map((item) => (
                <div key={item.id} className="card-brutal bg-white">
                  {item.type === 'product' && item.product && (
                    <>
                      <div className="w-full h-48 bg-gray-200 border-b-4 border-black flex items-center justify-center">
                        <Package size={64} />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <p className="font-display text-2xl text-neon-pink mb-2">
                          ¥{item.price?.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mb-4">
                          {item.product.condition} | {item.product.origin}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            收藏于 {item.addedAt}
                          </span>
                          <button className="btn-brutal px-4 py-2">
                            取消收藏
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  {item.type === 'article' && (
                    <>
                      <div className="w-full h-48 bg-neon-blue border-b-4 border-black flex items-center justify-center">
                        <FileEdit size={64} />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            收藏于 {item.addedAt}
                          </span>
                          <button className="btn-brutal px-4 py-2">
                            阅读
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'consultations':
        return (
          <div className="space-y-6">
            <h2 className="section-title">我的咨询</h2>

            <div className="space-y-4">
              {mockConsultations.map((item) => (
                <div key={item.id} className="card-brutal bg-white">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 border-4 border-black flex items-center justify-center ${
                        item.type === 'question' ? 'bg-neon-yellow' : 'bg-neon-blue'
                      }`}
                    >
                      {item.type === 'question' ? (
                        <MessageCircle size={24} />
                      ) : (
                        <CheckCircle size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 border-2 border-black text-sm font-bold ${
                            item.type === 'question'
                              ? 'bg-neon-yellow'
                              : 'bg-neon-green'
                          }`}
                        >
                          {item.type === 'question' ? '提问' : '回答'}
                        </span>
                        <span
                          className={`px-3 py-1 border-2 border-black text-sm font-bold ${
                            item.status === 'answered'
                              ? 'bg-neon-green'
                              : 'bg-orange-custom'
                          }`}
                        >
                          {item.status === 'answered' ? '已回复' : '待回复'}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{item.content}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{item.createdAt}</span>
                        <span>{item.responseCount} 条回复</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'messages':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="section-title">我的消息</h2>
              <button className="btn-brutal px-4 py-2">全部标记为已读</button>
            </div>

            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`card-brutal bg-white cursor-pointer transition-all ${
                    !message.isRead ? 'ring-4 ring-neon-pink' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 border-4 border-black flex items-center justify-center ${
                        message.type === 'order'
                          ? 'bg-neon-yellow'
                          : message.type === 'system'
                          ? 'bg-neon-blue'
                          : 'bg-neon-pink'
                      }`}
                    >
                      {message.type === 'order' ? (
                        <Package size={24} />
                      ) : message.type === 'system' ? (
                        <CheckCircle size={24} />
                      ) : (
                        <Bell size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-lg">
                            {message.title}
                          </h3>
                          {!message.isRead && (
                            <span className="w-3 h-3 bg-neon-pink rounded-full"></span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">
                          {message.createdAt}
                        </span>
                      </div>
                      <p className="text-gray-600">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <h2 className="section-title">我的评价</h2>

            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="card-brutal bg-white">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-neon-yellow border-4 border-black flex items-center justify-center">
                      <Star size={32} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-2">
                        {review.productTitle}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={
                              i < review.rating
                                ? 'text-neon-yellow fill-current'
                                : 'text-gray-300'
                            }
                          />
                        ))}
                      </div>
                      <p className="text-gray-600">{review.content}</p>
                    </div>
                  </div>
                  <div className="pt-4 border-t-4 border-black">
                    <span className="text-sm text-gray-500">
                      评价于 {review.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'addresses':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="section-title">我的地址</h2>
              <button className="btn-brutal-primary flex items-center gap-2">
                <Plus size={20} />
                新增地址
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockAddresses.map((address) => (
                <div
                  key={address.id}
                  className={`card-brutal bg-white relative ${
                    address.isDefault ? 'ring-4 ring-neon-yellow' : ''
                  }`}
                >
                  {address.isDefault && (
                    <div className="absolute -top-3 -right-3 bg-neon-yellow border-4 border-black px-3 py-1 font-bold text-sm">
                      默认地址
                    </div>
                  )}
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-xl">{address.name}</span>
                      <span className="font-mono">{address.phone}</span>
                    </div>
                    <p className="text-gray-600">
                      {address.province} {address.city} {address.district}{' '}
                      {address.detail}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t-4 border-black">
                      {!address.isDefault && (
                        <button className="btn-brutal px-4 py-2">
                          设为默认
                        </button>
                      )}
                      <div className="flex gap-2">
                        <button className="btn-brutal p-2">
                          <Edit size={16} />
                        </button>
                        <button className="btn-brutal p-2">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="section-title">账户设置</h2>

            <form onSubmit={handleSaveProfile} className="card-brutal bg-white">
              <div className="space-y-6">
                <div>
                  <label className="block font-bold mb-2">用户名</label>
                  <input
                    type="text"
                    value={profileForm.username}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, username: e.target.value })
                    }
                    className="input-brutal w-full"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">邮箱</label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, email: e.target.value })
                    }
                    className="input-brutal w-full"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">手机号</label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={(e) =>
                      setProfileForm({ ...profileForm, phone: e.target.value })
                    }
                    className="input-brutal w-full"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2">个人简介</label>
                  <textarea
                    value={profileForm.description}
                    onChange={(e) =>
                      setProfileForm({
                        ...profileForm,
                        description: e.target.value,
                      })
                    }
                    rows={4}
                    className="input-brutal w-full"
                  />
                </div>

                <button type="submit" className="btn-brutal-primary px-8 py-3">
                  保存修改
                </button>
              </div>
            </form>

            <div className="card-brutal bg-white">
              <h3 className="font-bold text-xl mb-4">安全设置</h3>
              <div className="space-y-4">
                <button className="btn-brutal w-full justify-between">
                  <span>修改密码</span>
                  <ChevronRight size={20} />
                </button>
                <button className="btn-brutal w-full justify-between">
                  <span>绑定手机</span>
                  <ChevronRight size={20} />
                </button>
                <button className="btn-brutal w-full justify-between">
                  <span>绑定邮箱</span>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container-brutal py-8">
        <div className="flex gap-8">
          <aside className="w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="card-brutal bg-white mb-6">
                <div className="p-6 border-b-4 border-black">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-neon-yellow border-4 border-black flex items-center justify-center">
                      <span className="font-display text-2xl">Y</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{profileForm.username}</h3>
                      <p className="text-sm text-gray-600">信用: 98</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="font-display text-2xl">12</p>
                    <p className="text-xs">订单</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl">8</p>
                    <p className="text-xs">发布</p>
                  </div>
                  <div>
                    <p className="font-display text-2xl">23</p>
                    <p className="text-xs">收藏</p>
                  </div>
                </div>
              </div>

              <div className="md:hidden mb-4">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="btn-brutal w-full flex items-center justify-between"
                >
                  <span>菜单</span>
                  {isMobileMenuOpen ? <Minus size={20} /> : <Plus size={20} />}
                </button>
              </div>

              <nav
                className={`card-brutal bg-white ${
                  isMobileMenuOpen ? 'block' : 'hidden md:block'
                }`}
              >
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveMenu(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 font-bold transition-all ${
                        activeMenu === item.id
                          ? 'bg-neon-yellow border-l-8 border-black'
                          : 'hover:bg-gray-100 border-l-8 border-transparent'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </nav>
            </div>
          </aside>

          <main className="flex-1">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
};

export default UserCenter;
