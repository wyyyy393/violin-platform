import React, { useState } from 'react';
import { 
  Package, 
  ShoppingCart, 
  MessageCircle, 
  BarChart3, 
  Wallet, 
  Store, 
  Shield, 
  Edit3, 
  DollarSign, 
  Eye, 
  Clock,
  CheckCircle,
  XCircle,
  ArrowUp,
  ArrowDown,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';

type MenuItem = 'products' | 'orders' | 'consultations' | 'dashboard' | 'earnings' | 'profile' | 'certification';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive';
  category: string;
  image: string;
}

interface Order {
  id: string;
  customerName: string;
  productName: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
}

interface Consultation {
  id: string;
  customerName: string;
  productName: string;
  question: string;
  status: 'pending' | 'replied';
  date: string;
}

const mockProducts: Product[] = [
  { id: '1', name: '斯特拉迪瓦里古董小提琴', price: 128000, stock: 1, status: 'active', category: '小提琴', image: 'violin1' },
  { id: '2', name: '雅马哈 SV-200 专业演奏琴', price: 15800, stock: 3, status: 'active', category: '小提琴', image: 'violin2' },
  { id: '3', name: '顶级巴西红木琴弓', price: 3800, stock: 5, status: 'active', category: '琴弓', image: 'bow1' },
  { id: '4', name: '德国 Pirastro 琴弦套装', price: 680, stock: 12, status: 'inactive', category: '配件', image: 'strings1' },
  { id: '5', name: '手工制作松香', price: 128, stock: 25, status: 'active', category: '配件', image: 'rosin1' },
  { id: '6', name: '专业小提琴肩垫', price: 168, stock: 8, status: 'inactive', category: '配件', image: 'shoulder1' },
];

const mockOrders: Order[] = [
  { id: 'ORD-2024-001', customerName: '张音乐', productName: '雅马哈 SV-200', amount: 15800, status: 'pending', date: '2024-01-15' },
  { id: 'ORD-2024-002', customerName: '李演奏', productName: '顶级巴西红木琴弓', amount: 3800, status: 'processing', date: '2024-01-14' },
  { id: 'ORD-2024-003', customerName: '王学者', productName: '德国 Pirastro 琴弦', amount: 680, status: 'completed', date: '2024-01-13' },
  { id: 'ORD-2024-004', customerName: '陈琴师', productName: '手工制作松香', amount: 256, status: 'completed', date: '2024-01-12' },
];

const mockConsultations: Consultation[] = [
  { id: '1', customerName: '赵新手', productName: '斯特拉迪瓦里古董小提琴', question: '这把琴适合专业演奏吗？音色特点是什么？', status: 'pending', date: '2024-01-15' },
  { id: '2', customerName: '孙老师', productName: '雅马哈 SV-200', question: '可以安排线下试琴吗？', status: 'pending', date: '2024-01-15' },
  { id: '3', customerName: '周学生', productName: '德国 Pirastro 琴弦', question: '请问如何安装这套琴弦？', status: 'replied', date: '2024-01-14' },
  { id: '4', customerName: '吴爱好者', productName: '手工制作松香', question: '这个松香适合什么季节使用？', status: 'replied', date: '2024-01-13' },
];

const mockEarnings = [
  { id: '1', date: '2024-01-15', amount: 15800, orderId: 'ORD-2024-001', status: 'completed' },
  { id: '2', date: '2024-01-13', amount: 680, orderId: 'ORD-2024-003', status: 'completed' },
  { id: '3', date: '2024-01-12', amount: 256, orderId: 'ORD-2024-004', status: 'completed' },
  { id: '4', date: '2024-01-10', amount: 5000, orderId: 'WDL-2024-001', status: 'pending' },
];

export const SellerCenter: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuItem>('dashboard');
  const [productFilter, setProductFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [shopName, setShopName] = useState('古典乐坊');
  const [shopDescription, setShopDescription] = useState('专注高端小提琴及配件销售，二十年行业经验，正品保障。');
  const [contactEmail, setContactEmail] = useState('contact@gudianyuefang.com');
  const [contactPhone, setContactPhone] = useState('400-888-9999');

  const menuItems: { id: MenuItem; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: '数据看板', icon: <BarChart3 size={20} /> },
    { id: 'products', label: '商品管理', icon: <Package size={20} /> },
    { id: 'orders', label: '订单管理', icon: <ShoppingCart size={20} /> },
    { id: 'consultations', label: '咨询管理', icon: <MessageCircle size={20} /> },
    { id: 'earnings', label: '收益记录', icon: <Wallet size={20} /> },
    { id: 'profile', label: '店铺资料', icon: <Store size={20} /> },
    { id: 'certification', label: '认证信息', icon: <Shield size={20} /> },
  ];

  const filteredProducts = productFilter === 'all' 
    ? mockProducts 
    : mockProducts.filter(p => p.status === productFilter);

  const pendingOrders = mockOrders.filter(o => o.status === 'pending').length;
  const pendingConsultations = mockConsultations.filter(c => c.status === 'pending').length;

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title bg-neon-yellow">数据看板</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-brutal p-6 bg-neon-yellow">
                <div className="flex items-center justify-between mb-4">
                  <Eye size={48} className="text-black" />
                  <TrendingUp size={24} className="text-black" />
                </div>
                <p className="font-mono text-sm mb-2">今日访客</p>
                <p className="font-display text-5xl">1,234</p>
                <p className="font-mono text-xs mt-2 text-black">↑ 12.5% 较昨日</p>
              </div>

              <div className="card-brutal p-6 bg-neon-pink">
                <div className="flex items-center justify-between mb-4">
                  <ShoppingCart size={48} className="text-black" />
                  <ArrowUp size={24} className="text-black" />
                </div>
                <p className="font-mono text-sm mb-2">今日订单</p>
                <p className="font-display text-5xl">{pendingOrders}</p>
                <p className="font-mono text-xs mt-2 text-black">待处理订单</p>
              </div>

              <div className="card-brutal p-6 bg-neon-green">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign size={48} className="text-black" />
                  <TrendingUp size={24} className="text-black" />
                </div>
                <p className="font-mono text-sm mb-2">今日收益</p>
                <p className="font-display text-5xl">¥1,580</p>
                <p className="font-mono text-xs mt-2 text-black">↑ 8.3% 较昨日</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-brutal p-6">
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <Clock size={24} />
                  待处理事项
                </h3>
                <div className="space-y-3">
                  {pendingOrders > 0 && (
                    <div 
                      className="bg-neon-pink border-4 border-black p-4 cursor-pointer hover:shadow-brutal transition-all"
                      onClick={() => setActiveMenu('orders')}
                    >
                      <p className="font-bold">新订单提醒</p>
                      <p className="font-mono text-sm">您有 {pendingOrders} 个新订单待处理</p>
                    </div>
                  )}
                  {pendingConsultations > 0 && (
                    <div 
                      className="bg-neon-yellow border-4 border-black p-4 cursor-pointer hover:shadow-brutal transition-all"
                      onClick={() => setActiveMenu('consultations')}
                    >
                      <p className="font-bold">待回复咨询</p>
                      <p className="font-mono text-sm">您有 {pendingConsultations} 条咨询待回复</p>
                    </div>
                  )}
                  {pendingOrders === 0 && pendingConsultations === 0 && (
                    <div className="bg-neon-green border-4 border-black p-4">
                      <p className="font-bold">🎉 太棒了！</p>
                      <p className="font-mono text-sm">暂无待处理事项</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="card-brutal p-6">
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <TrendingUp size={24} />
                  销售趋势
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-mono text-sm mb-2">本周销售额</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-neon-blue h-8 border-4 border-black" style={{ width: '75%' }}></div>
                      <span className="font-bold">¥28,450</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-sm mb-2">本月订单</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-neon-pink h-8 border-4 border-black" style={{ width: '60%' }}></div>
                      <span className="font-bold">156 单</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-sm mb-2">转化率</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-neon-green h-8 border-4 border-black" style={{ width: '45%' }}></div>
                      <span className="font-bold">4.8%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6 animate-slide-in">
            <div className="flex items-center justify-between">
              <h2 className="section-title bg-neon-yellow">商品管理</h2>
              <button className="btn-brutal-primary flex items-center gap-2">
                <Package size={20} />
                添加商品
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: '全部', count: mockProducts.length },
                { key: 'active', label: '出售中', count: mockProducts.filter(p => p.status === 'active').length },
                { key: 'inactive', label: '已下架', count: mockProducts.filter(p => p.status === 'inactive').length },
              ].map(filter => (
                <button
                  key={filter.key}
                  onClick={() => setProductFilter(filter.key as typeof productFilter)}
                  className={`px-4 py-2 border-4 border-black font-bold transition-all ${
                    productFilter === filter.key 
                      ? 'bg-neon-yellow shadow-brutal' 
                      : 'bg-white hover:bg-gray-100'
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            <div className="card-brutal overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-display">商品名称</th>
                      <th className="px-4 py-3 text-left font-display">价格</th>
                      <th className="px-4 py-3 text-left font-display">库存</th>
                      <th className="px-4 py-3 text-left font-display">状态</th>
                      <th className="px-4 py-3 text-left font-display">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((product, index) => (
                      <tr 
                        key={product.id} 
                        className={`border-b-4 border-black ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-bold">{product.name}</p>
                            <p className="font-mono text-sm text-gray-600">{product.category}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-display text-xl">
                          ¥{product.price.toLocaleString()}
                        </td>
                        <td className="px-4 py-4 font-mono">
                          {product.stock}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 border-2 border-black font-bold ${
                            product.status === 'active' 
                              ? 'bg-neon-green' 
                              : 'bg-gray-300'
                          }`}>
                            {product.status === 'active' ? '出售中' : '已下架'}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button className="btn-brutal text-sm px-3 py-1 flex items-center gap-1">
                              <Edit3 size={16} />
                              编辑
                            </button>
                            <button className={`btn-brutal text-sm px-3 py-1 flex items-center gap-1 ${
                              product.status === 'active' ? 'bg-orange-custom' : 'bg-neon-green'
                            }`}>
                              {product.status === 'active' ? (
                                <>
                                  <ArrowDown size={16} />
                                  下架
                                </>
                              ) : (
                                <>
                                  <ArrowUp size={16} />
                                  上架
                                </>
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title bg-neon-yellow">订单管理</h2>

            {pendingOrders > 0 && (
              <div className="card-brutal p-6 bg-neon-pink border-4 border-black">
                <div className="flex items-center gap-4">
                  <AlertCircle size={48} className="text-black" />
                  <div>
                    <p className="font-display text-2xl">新订单提醒</p>
                    <p className="font-mono">您有 {pendingOrders} 个新订单等待处理</p>
                  </div>
                </div>
              </div>
            )}

            <div className="card-brutal overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-display">订单号</th>
                      <th className="px-4 py-3 text-left font-display">客户</th>
                      <th className="px-4 py-3 text-left font-display">商品</th>
                      <th className="px-4 py-3 text-left font-display">金额</th>
                      <th className="px-4 py-3 text-left font-display">状态</th>
                      <th className="px-4 py-3 text-left font-display">日期</th>
                      <th className="px-4 py-3 text-left font-display">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order, index) => (
                      <tr 
                        key={order.id} 
                        className={`border-b-4 border-black ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-4 font-mono text-sm">{order.id}</td>
                        <td className="px-4 py-4 font-bold">{order.customerName}</td>
                        <td className="px-4 py-4">{order.productName}</td>
                        <td className="px-4 py-4 font-display text-xl">
                          ¥{order.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 border-2 border-black font-bold ${
                            order.status === 'pending' ? 'bg-neon-yellow' :
                            order.status === 'processing' ? 'bg-neon-blue text-white' :
                            order.status === 'completed' ? 'bg-neon-green' :
                            'bg-gray-300'
                          }`}>
                            {order.status === 'pending' && '待处理'}
                            {order.status === 'processing' && '处理中'}
                            {order.status === 'completed' && '已完成'}
                            {order.status === 'cancelled' && '已取消'}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono text-sm">{order.date}</td>
                        <td className="px-4 py-4">
                          {order.status === 'pending' && (
                            <button className="btn-brutal-primary text-sm px-3 py-1">
                              处理订单
                            </button>
                          )}
                          {order.status === 'processing' && (
                            <button className="btn-brutal text-sm px-3 py-1">
                              查看详情
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <button className="btn-brutal text-sm px-3 py-1 bg-neon-green">
                              已完成
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'consultations':
        return (
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title bg-neon-yellow">咨询管理</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-brutal p-6 border-4 border-black">
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <Clock size={24} className="text-neon-pink" />
                  待回复 ({pendingConsultations})
                </h3>
                <div className="space-y-4">
                  {mockConsultations.filter(c => c.status === 'pending').map(consultation => (
                    <div key={consultation.id} className="bg-neon-yellow border-4 border-black p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold">{consultation.customerName}</p>
                        <p className="font-mono text-xs">{consultation.date}</p>
                      </div>
                      <p className="font-mono text-sm text-gray-600 mb-2">关于: {consultation.productName}</p>
                      <p className="mb-3">{consultation.question}</p>
                      <button className="btn-brutal-primary w-full">
                        回复咨询
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card-brutal p-6 border-4 border-black">
                <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-neon-green" />
                  已回复 ({mockConsultations.filter(c => c.status === 'replied').length})
                </h3>
                <div className="space-y-4">
                  {mockConsultations.filter(c => c.status === 'replied').map(consultation => (
                    <div key={consultation.id} className="bg-neon-green border-4 border-black p-4">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-bold">{consultation.customerName}</p>
                        <p className="font-mono text-xs">{consultation.date}</p>
                      </div>
                      <p className="font-mono text-sm text-gray-600 mb-2">关于: {consultation.productName}</p>
                      <p className="mb-3">{consultation.question}</p>
                      <div className="bg-white border-2 border-black p-3">
                        <p className="font-mono text-sm">✓ 已回复</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'earnings':
        return (
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title bg-neon-yellow">收益记录</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card-brutal p-6 bg-neon-green">
                <p className="font-mono text-sm mb-2">账户余额</p>
                <p className="font-display text-5xl">¥5,580</p>
                <button className="btn-brutal mt-4 w-full bg-white">
                  提现
                </button>
              </div>

              <div className="card-brutal p-6 bg-neon-blue">
                <p className="font-mono text-sm mb-2">本周收益</p>
                <p className="font-display text-5xl">¥12,450</p>
                <p className="font-mono text-xs mt-2">共 23 笔交易</p>
              </div>

              <div className="card-brutal p-6 bg-neon-yellow">
                <p className="font-mono text-sm mb-2">本月收益</p>
                <p className="font-display text-5xl">¥45,680</p>
                <p className="font-mono text-xs mt-2">共 156 笔交易</p>
              </div>
            </div>

            <div className="card-brutal overflow-hidden">
              <div className="bg-black text-white p-4">
                <h3 className="font-display text-xl">收益明细</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-3 text-left font-display">日期</th>
                      <th className="px-4 py-3 text-left font-display">订单号</th>
                      <th className="px-4 py-3 text-left font-display">金额</th>
                      <th className="px-4 py-3 text-left font-display">状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockEarnings.map((earning, index) => (
                      <tr 
                        key={earning.id} 
                        className={`border-b-4 border-black ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="px-4 py-4 font-mono text-sm">{earning.date}</td>
                        <td className="px-4 py-4 font-mono text-sm">{earning.orderId}</td>
                        <td className="px-4 py-4 font-display text-xl text-neon-green">
                          +¥{earning.amount.toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-3 py-1 border-2 border-black font-bold ${
                            earning.status === 'completed' ? 'bg-neon-green' : 'bg-neon-yellow'
                          }`}>
                            {earning.status === 'completed' ? '已结算' : '处理中'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-brutal overflow-hidden">
              <div className="bg-black text-white p-4">
                <h3 className="font-display text-xl">提现记录</h3>
              </div>
              <div className="p-6">
                <div className="text-center py-12">
                  <Wallet size={64} className="mx-auto mb-4 text-gray-400" />
                  <p className="font-mono text-gray-600">暂无提现记录</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title bg-neon-yellow">店铺资料</h2>

            <div className="card-brutal p-6">
              <div className="flex items-center gap-4 mb-6">
                <Store size={48} />
                <h3 className="font-display text-3xl">店铺信息</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block font-bold mb-2 flex items-center gap-2">
                    <Store size={20} />
                    店铺名称
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="input-brutal w-full"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 flex items-center gap-2">
                    <FileText size={20} />
                    店铺简介
                  </label>
                  <textarea
                    value={shopDescription}
                    onChange={(e) => setShopDescription(e.target.value)}
                    rows={4}
                    className="input-brutal w-full resize-none"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 flex items-center gap-2">
                    <Mail size={20} />
                    联系方式 - 邮箱
                  </label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="input-brutal w-full"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-2 flex items-center gap-2">
                    <Phone size={20} />
                    联系方式 - 电话
                  </label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="input-brutal w-full"
                  />
                </div>

                <button className="btn-brutal-primary w-full md:w-auto">
                  保存修改
                </button>
              </div>
            </div>

            <div className="card-brutal p-6 bg-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <Users size={24} />
                <h3 className="font-bold">店铺统计</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white border-4 border-black p-4">
                  <p className="font-mono text-sm">商品总数</p>
                  <p className="font-display text-3xl">{mockProducts.length}</p>
                </div>
                <div className="bg-white border-4 border-black p-4">
                  <p className="font-mono text-sm">订单总数</p>
                  <p className="font-display text-3xl">{mockOrders.length}</p>
                </div>
                <div className="bg-white border-4 border-black p-4">
                  <p className="font-mono text-sm">咨询总数</p>
                  <p className="font-display text-3xl">{mockConsultations.length}</p>
                </div>
                <div className="bg-white border-4 border-black p-4">
                  <p className="font-mono text-sm">店铺评分</p>
                  <p className="font-display text-3xl">4.8</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'certification':
        return (
          <div className="space-y-6 animate-slide-in">
            <h2 className="section-title bg-neon-yellow">认证信息</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-brutal p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Shield size={48} className="text-neon-green" />
                  <div>
                    <h3 className="font-display text-2xl">商家认证</h3>
                    <span className="bg-neon-green border-4 border-black px-3 py-1 font-bold mt-2 inline-block">
                      ✓ 已认证
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-neon-green" />
                    <p className="font-mono">身份认证 ✓</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-neon-green" />
                    <p className="font-mono">营业执照 ✓</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-neon-green" />
                    <p className="font-mono">店铺认证 ✓</p>
                  </div>
                </div>
              </div>

              <div className="card-brutal p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Award size={48} className="text-neon-pink" />
                  <div>
                    <h3 className="font-display text-2xl">平台认证</h3>
                    <span className="bg-neon-yellow border-4 border-black px-3 py-1 font-bold mt-2 inline-block">
                      申请中
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mt-6">
                  <div className="flex items-center gap-2">
                    <Clock size={20} className="text-neon-yellow" />
                    <p className="font-mono">优质商家认证 (审核中)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle size={20} className="text-gray-400" />
                    <p className="font-mono">金牌卖家 (未申请)</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <XCircle size={20} className="text-gray-400" />
                    <p className="font-mono">官方旗舰店 (未申请)</p>
                  </div>
                </div>
                <button className="btn-brutal mt-6">
                  申请认证
                </button>
              </div>
            </div>

            <div className="card-brutal p-6">
              <h3 className="font-display text-2xl mb-4">认证徽章</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-neon-green border-4 border-black p-6 text-center">
                  <Shield size={48} className="mx-auto mb-2" />
                  <p className="font-bold">已认证商家</p>
                </div>
                <div className="bg-gray-200 border-4 border-black p-6 text-center opacity-50">
                  <Shield size={48} className="mx-auto mb-2" />
                  <p className="font-bold">金牌卖家</p>
                </div>
                <div className="bg-gray-200 border-4 border-black p-6 text-center opacity-50">
                  <Shield size={48} className="mx-auto mb-2" />
                  <p className="font-bold">官方认证</p>
                </div>
                <div className="bg-gray-200 border-4 border-black p-6 text-center opacity-50">
                  <Shield size={48} className="mx-auto mb-2" />
                  <p className="font-bold">VIP商家</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-black text-white border-b-8 border-neon-yellow">
        <div className="container-brutal py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Store size={40} className="text-neon-yellow" />
              <h1 className="font-display text-3xl">卖家中心</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <User size={20} />
                <span className="font-mono">古典乐坊</span>
              </div>
              <button className="btn-brutal bg-neon-pink text-sm">
                返回商城
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-brutal py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="card-brutal p-4 sticky top-6">
              <h2 className="font-display text-xl mb-4 pb-2 border-b-4 border-black">
                功能菜单
              </h2>
              <ul className="space-y-2">
                {menuItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full text-left px-4 py-3 border-4 border-black font-bold transition-all flex items-center gap-3 ${
                        activeMenu === item.id
                          ? 'bg-neon-yellow shadow-brutal'
                          : 'bg-white hover:bg-gray-100'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.id === 'orders' && pendingOrders > 0 && (
                        <span className="ml-auto bg-neon-pink px-2 py-1 text-xs font-bold">
                          {pendingOrders}
                        </span>
                      )}
                      {item.id === 'consultations' && pendingConsultations > 0 && (
                        <span className="ml-auto bg-neon-pink px-2 py-1 text-xs font-bold">
                          {pendingConsultations}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};
