# 小提琴垂直交易与资讯咨询平台 - 技术架构文档

## 1. 架构设计概述

本项目采用 React 18 + TypeScript 前端技术栈，使用 Vite 作为构建工具，Tailwind CSS 处理样式，React Router DOM 管理路由，Zustand 进行状态管理。项目采用组件化设计，所有页面和可复用组件都遵循单一职责原则，确保代码的可维护性和可扩展性。

### 1.1 架构层次
```
┌─────────────────────────────────────┐
│          Pages（页面层）              │
│   首页、商品列表、商品详情等页面组件     │
├─────────────────────────────────────┤
│        Components（组件层）           │
│   可复用的 UI 组件（卡片、按钮等）      │
├─────────────────────────────────────┤
│         Stores（状态层）              │
│   Zustand 全局状态管理                │
├─────────────────────────────────────┤
│           Data（数据层）              │
│   模拟数据（商品、资讯、用户等）        │
├─────────────────────────────────────┤
│         Types（类型层）               │
│   TypeScript 类型定义                  │
└─────────────────────────────────────┘
```

### 1.2 技术选型理由
- **React 18**：成熟的组件化框架，生态丰富
- **TypeScript**：类型安全，提高代码质量
- **Vite**：快速的开发服务器和构建工具
- **Tailwind CSS**：原子化 CSS，快速构建样式
- **React Router DOM**：标准的前端路由解决方案
- **Zustand**：轻量级状态管理，简单易用
- **Lucide React**：高质量图标库

## 2. 项目结构

### 2.1 目录结构
```
violin-trading-platform/
├── public/                    # 静态资源
├── src/
│   ├── components/           # 可复用组件
│   │   ├── Navbar.tsx       # 导航栏
│   │   ├── Footer.tsx       # 页脚
│   │   ├── ProductCard.tsx  # 商品卡片
│   │   ├── ArticleCard.tsx  # 文章卡片
│   │   ├── QuestionCard.tsx # 问答卡片
│   │   ├── SearchBar.tsx    # 搜索框
│   │   ├── CategoryGrid.tsx # 分类网格
│   │   ├── FilterPanel.tsx  # 筛选面板
│   │   └── ...
│   ├── pages/               # 页面组件
│   │   ├── Home.tsx         # 首页
│   │   ├── ProductList.tsx  # 商品列表
│   │   ├── ProductDetail.tsx # 商品详情
│   │   ├── PublishProduct.tsx # 发布商品
│   │   ├── Information.tsx  # 资讯
│   │   ├── InformationDetail.tsx # 资讯详情
│   │   ├── QA.tsx          # 问答
│   │   ├── QuestionDetail.tsx # 问答详情
│   │   ├── UserCenter.tsx  # 用户中心
│   │   ├── SellerCenter.tsx # 卖家中心
│   │   └── Services.tsx    # 平台服务
│   ├── stores/             # Zustand 状态管理
│   │   ├── useCartStore.ts  # 购物车状态
│   │   ├── useUserStore.ts  # 用户状态
│   │   └── useFilterStore.ts # 筛选状态
│   ├── data/               # 模拟数据
│   │   ├── products.ts      # 商品数据
│   │   ├── articles.ts      # 资讯数据
│   │   ├── questions.ts     # 问答数据
│   │   └── users.ts         # 用户数据
│   ├── types/              # TypeScript 类型定义
│   │   └── index.ts         # 类型定义
│   ├── utils/              # 工具函数
│   │   └── formatters.ts    # 格式化函数
│   ├── App.tsx             # 应用入口
│   ├── main.tsx            # React 入口
│   └── index.css           # 全局样式
├── package.json            # 项目依赖
├── tailwind.config.js      # Tailwind 配置
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

### 2.2 路由定义
| 路由路径 | 页面组件 | 功能描述 |
|---------|---------|---------|
| / | Home | 首页 |
| /products | ProductList | 商品列表 |
| /products/:id | ProductDetail | 商品详情 |
| /publish | PublishProduct | 发布商品 |
| /information | Information | 资讯列表 |
| /information/:id | InformationDetail | 资讯详情 |
| /qa | QA | 问答列表 |
| /qa/:id | QuestionDetail | 问答详情 |
| /user | UserCenter | 用户中心 |
| /seller | SellerCenter | 卖家中心 |
| /services | Services | 平台服务 |

## 3. 数据模型

### 3.1 商品类型（Product）
```typescript
interface Product {
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
```

### 3.2 资讯类型（Article）
```typescript
interface Article {
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
```

### 3.3 问答类型（Question）
```typescript
interface Question {
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
```

### 3.4 用户类型（User）
```typescript
interface User {
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
```

## 4. 组件设计

### 4.1 组件分类
- **布局组件**：Navbar、Footer
- **商品组件**：ProductCard、ProductList、FilterPanel
- **内容组件**：ArticleCard、QuestionCard
- **表单组件**：SearchBar、Input、Select、Button
- **展示组件**：Modal、Tag、Badge

### 4.2 通用组件设计
所有组件遵循以下设计原则：
- 接收明确的 Props 类型定义
- 支持 className 外部样式覆盖
- 保持组件纯净（Pure Component）
- 事件处理函数外部传入
- 尺寸和颜色等使用预设值

### 4.3 组件示例
```typescript
// ProductCard.tsx
interface ProductCardProps {
  product: Product;
  onFavorite?: (id: string) => void;
  onCompare?: (id: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onFavorite, onCompare }) => {
  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_#000]">
      {/* 商品内容 */}
    </div>
  );
};
```

## 5. 状态管理

### 5.1 购物车状态
```typescript
interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalPrice: () => number;
}
```

### 5.2 用户状态
```typescript
interface UserStore {
  user: User | null;
  isLoggedIn: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}
```

### 5.3 筛选状态
```typescript
interface FilterStore {
  filters: FilterState;
  updateFilter: (key: string, value: any) => void;
  resetFilters: () => void;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedConditions: string[];
}
```

## 6. 样式设计

### 6.1 Tailwind CSS 配置
```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'cream': '#F5F5F0',
        'neon-yellow': '#FFFF00',
        'neon-pink': '#FF69B4',
        'neon-blue': '#00BFFF',
        'orange': '#FF6B35',
        'neon-green': '#00FF00',
      },
      boxShadow: {
        'brutal': '6px 6px 0px #000',
        'brutal-hover': '8px 8px 0px #000',
      },
      fontFamily: {
        'display': ['Impact', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
```

### 6.2 全局样式
```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-cream font-mono text-black;
  }
}

@layer components {
  .btn-brutal {
    @apply bg-white border-4 border-black px-6 py-3 font-bold uppercase;
    @apply shadow-[6px_6px_0px_#000] transition-all duration-100;
    @apply hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[2px_2px_0px_#000];
  }

  .card-brutal {
    @apply bg-white border-4 border-black shadow-[6px_6px_0px_#000];
  }

  .input-brutal {
    @apply border-4 border-black bg-white px-4 py-2 outline-none;
    @apply focus:shadow-[6px_6px_0px_#000];
  }
}
```

## 7. 模拟数据策略

### 7.1 数据来源
使用 TypeScript 文件存储静态模拟数据，包含：
- 30+ 商品数据（覆盖小提琴、琴弓、配件）
- 15+ 资讯文章（覆盖所有分类）
- 20+ 问答数据（覆盖所有问题类型）
- 10+ 用户数据（包含买家、卖家、专家）

### 7.2 数据文件
```typescript
// data/products.ts
export const products: Product[] = [
  {
    id: '1',
    title: '斯特拉迪瓦里 style 小提琴 4/4 专业演奏级',
    type: 'violin',
    price: 15800,
    condition: '99新',
    // ... 更多字段
  },
  // 更多商品
];
```

## 8. 响应式策略

### 8.1 断点设置
- **桌面端**：≥ 1024px
- **平板端**：768px - 1023px
- **移动端**：< 768px

### 8.2 布局调整
| 组件 | 桌面端 | 平板端 | 移动端 |
|------|--------|--------|--------|
| 导航栏 | 固定显示 | 固定显示 | 汉堡菜单 |
| 商品网格 | 4列 | 3列 | 1-2列 |
| 筛选面板 | 左侧固定 | 顶部折叠 | 抽屉式 |
| Hero 区域 | 大标题 | 中标题 | 小标题 |

## 9. 性能优化

### 9.1 代码分割
- 使用 React.lazy 进行路由级代码分割
- 按需加载页面组件

### 9.2 图片优化
- 使用 WebP 格式图片
- 实现图片懒加载
- 提供适当的图片尺寸

### 9.3 缓存策略
- 浏览器缓存静态资源
- 本地状态持久化

## 10. 开发规范

### 10.1 命名规范
- 组件文件：PascalCase（如 ProductCard.tsx）
- 组件名称：PascalCase
- 函数和变量：camelCase
- 常量：UPPER_SNAKE_CASE
- CSS 类名：kebab-case

### 10.2 代码规范
- 所有组件使用函数式组件
- Props 必须有类型定义
- 避免使用 any 类型
- 组件文件不超过 200 行
- 单一职责原则

### 10.3 Git 规范
- commit 信息使用中文
- 分支命名：feature/xxx、fix/xxx
- 保持提交原子性

## 11. 部署方案

### 11.1 构建配置
- 使用 Vite build 命令构建
- 输出目录：dist/
- 静态资源哈希命名

### 11.2 环境配置
- 开发环境：localhost:3000
- 生产环境：nginx 或 Vercel

## 12. 技术债务与未来规划

### 12.1 当前限制
- 仅前端实现，无后端 API
- 使用模拟数据，无真实数据库
- 无用户认证系统

### 12.2 未来规划
- 添加后端 API（Express/NestJS）
- 实现用户认证系统
- 添加实时聊天功能
- 添加支付功能
- 添加地图功能（线下验琴）
