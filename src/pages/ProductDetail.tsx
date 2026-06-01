import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, Share2, Shield, Music, CheckCircle, 
  Star, MessageCircle, ShoppingCart,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { products } from '../data/products';
import { articles } from '../data/articles';
import { ProductCard } from '../components/ProductCard';
import { useCartStore } from '../stores/useCartStore';
import { useUserStore } from '../stores/useUserStore';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'description' | 'reviews'>('description');
  
  const product = products.find(p => p.id === id);
  const relatedProducts = products.filter(p => p.type === product?.type && p.id !== id).slice(0, 4);
  const relatedArticles = articles.filter(a => a.relatedProducts?.includes(id || '')).slice(0, 2);
  
  const { addItem } = useCartStore();
  const { addFavorite, removeFavorite, isFavorite } = useUserStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">商品不存在</h1>
          <Link to="/products" className="btn-brutal-primary">
            返回商品列表
          </Link>
        </div>
      </div>
    );
  }

  const favorite = isFavorite(product.id);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    addItem(product);
    alert('已添加到购物车');
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-brutal py-8">
        <nav className="mb-6 font-mono text-sm">
          <Link to="/" className="hover:text-neon-blue">首页</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-neon-blue">商品</Link>
          <span className="mx-2">/</span>
          <span>{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card-brutal p-4">
            <div className="relative mb-4">
              <img
                src={product.images[currentImageIndex]}
                alt={product.title}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-3 hover:bg-neon-yellow"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white border-2 border-black p-3 hover:bg-neon-yellow"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {product.platformCertified && (
                <div className="absolute top-4 left-4 bg-neon-green border-2 border-black px-4 py-2 font-bold flex items-center gap-2">
                  <CheckCircle size={20} />
                  平台认证
                </div>
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`border-2 border-black p-1 flex-shrink-0 ${
                    index === currentImageIndex ? 'bg-neon-yellow' : 'bg-white'
                  }`}
                >
                  <img src={img} alt="" className="w-20 h-20 object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="card-brutal p-6 mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-neon-pink border-2 border-black px-3 py-1 font-bold text-sm">
                  {product.type === 'violin' ? '小提琴' : product.type === 'bow' ? '琴弓' : '配件'}
                </span>
                <span className="bg-neon-yellow border-2 border-black px-3 py-1 font-bold text-sm">
                  {product.condition}
                </span>
                {product.size && (
                  <span className="bg-neon-blue border-2 border-black px-3 py-1 font-bold text-sm text-white">
                    {product.size}
                  </span>
                )}
              </div>

              <h1 className="font-display text-3xl lg:text-4xl mb-4">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-display text-5xl text-red-600">
                  ¥{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="font-mono text-xl text-gray-500 line-through">
                      ¥{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="bg-red-600 text-white px-2 py-1 font-bold text-sm">
                      降价 {Math.round((1 - product.price / product.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 font-mono text-sm">
                <div>
                  <span className="text-gray-600">品牌/制琴师：</span>
                  <span className="font-bold">{product.brand || product.maker || '手工定制'}</span>
                </div>
                <div>
                  <span className="text-gray-600">产地：</span>
                  <span className="font-bold">{product.origin}</span>
                </div>
                {product.year && (
                  <div>
                    <span className="text-gray-600">年份：</span>
                    <span className="font-bold">{product.year}</span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">适用阶段：</span>
                  <span className="font-bold">{product.stage}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mb-6">
                {product.platformCertified && (
                  <span className="flex items-center gap-2 bg-neon-green border-2 border-black px-3 py-2 font-bold text-sm">
                    <CheckCircle size={16} /> 平台认证
                  </span>
                )}
                {product.supportOfflineTrial && (
                  <span className="flex items-center gap-2 bg-neon-blue border-2 border-black px-3 py-2 font-bold text-sm text-white">
                    <Music size={16} /> 支持试音
                  </span>
                )}
                {product.supportPlatformTrial && (
                  <span className="flex items-center gap-2 bg-orange-custom border-2 border-black px-3 py-2 font-bold text-sm text-white">
                    <Shield size={16} /> 支持验琴
                  </span>
                )}
                {product.hasCertificate && (
                  <span className="flex items-center gap-2 bg-white border-2 border-black px-3 py-2 font-bold text-sm">
                    <CheckCircle size={16} /> 有鉴定证书
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => favorite ? removeFavorite(product.id) : addFavorite(product.id)}
                  className="btn-brutal flex-1 flex items-center justify-center gap-2"
                >
                  <Heart className={favorite ? 'fill-neon-pink text-neon-pink' : ''} size={20} />
                  {favorite ? '已收藏' : '收藏'}
                </button>
                <button className="btn-brutal-secondary flex-1 flex items-center justify-center gap-2">
                  <Share2 size={20} />
                  分享
                </button>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <button
                  onClick={handleAddToCart}
                  className="btn-brutal flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  加入购物车
                </button>
                <button className="btn-brutal-primary flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  联系卖家
                </button>
              </div>
            </div>

            <div className="card-brutal p-6">
              <h3 className="font-bold text-xl mb-4">卖家信息</h3>
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={product.seller.avatar}
                  alt={product.seller.username}
                  className="w-16 h-16 rounded-full border-2 border-black"
                />
                <div>
                  <p className="font-bold text-lg">{product.seller.username}</p>
                  <p className="font-mono text-sm text-gray-600">
                    {product.seller.role === 'maker' ? '制琴师' : 
                     product.seller.role === 'shop' ? '琴行' : '个人卖家'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center font-mono text-sm">
                <div className="bg-gray-100 p-3 border-2 border-black">
                  <p className="text-2xl font-bold">{product.seller.creditScore}</p>
                  <p className="text-gray-600">信用评分</p>
                </div>
                <div className="bg-gray-100 p-3 border-2 border-black">
                  <p className="text-2xl font-bold">{product.seller.salesCount}</p>
                  <p className="text-gray-600">销量</p>
                </div>
                <div className="bg-gray-100 p-3 border-2 border-black">
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold">{product.rating}</span>
                    <Star className="text-neon-yellow fill-current" size={20} />
                  </div>
                  <p className="text-gray-600">评价</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="card-brutal p-6">
              <div className="flex gap-4 mb-6 border-b-4 border-black pb-4">
                <button
                  onClick={() => setSelectedTab('description')}
                  className={`px-6 py-3 font-bold ${
                    selectedTab === 'description' 
                      ? 'bg-neon-yellow border-4 border-black' 
                      : 'bg-white border-2 border-black'
                  }`}
                >
                  商品详情
                </button>
                <button
                  onClick={() => setSelectedTab('reviews')}
                  className={`px-6 py-3 font-bold ${
                    selectedTab === 'reviews' 
                      ? 'bg-neon-yellow border-4 border-black' 
                      : 'bg-white border-2 border-black'
                  }`}
                >
                  用户评价 ({product.reviewCount})
                </button>
              </div>

              {selectedTab === 'description' ? (
                <div className="space-y-6 font-mono">
                  <div>
                    <h4 className="font-bold text-lg mb-2">商品描述</h4>
                    <p className="text-gray-700">{product.description}</p>
                  </div>
                  
                  {product.soundDescription && (
                    <div>
                      <h4 className="font-bold text-lg mb-2">音色描述</h4>
                      <p className="text-gray-700">{product.soundDescription}</p>
                    </div>
                  )}

                  {product.flaws && (
                    <div>
                      <h4 className="font-bold text-lg mb-2 text-orange-custom">瑕疵说明</h4>
                      <p className="text-gray-700">{product.flaws}</p>
                    </div>
                  )}

                  {product.repairHistory && (
                    <div>
                      <h4 className="font-bold text-lg mb-2">维修记录</h4>
                      <p className="text-gray-700">{product.repairHistory}</p>
                    </div>
                  )}

                  <div className="bg-neon-yellow border-4 border-black p-4">
                    <h4 className="font-bold text-lg mb-2">购买提示</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      <li>支持议价，具体价格可与卖家协商</li>
                      {product.supportOfflineTrial && <li>支持线下试音，欢迎预约</li>}
                      {product.supportPlatformTrial && <li>可申请平台验琴服务</li>}
                      {product.hasCertificate && <li>附送正规鉴定证书</li>}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-2 border-black p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-neon-blue rounded-full border-2 border-black"></div>
                        <div>
                          <p className="font-bold">用户{i}***</p>
                          <p className="font-mono text-xs text-gray-500">2024-01-{20-i}</p>
                        </div>
                        <div className="ml-auto flex gap-1">
                          {[1,2,3,4,5].map(star => (
                            <Star 
                              key={star} 
                              size={16} 
                              className={star <= 4 ? 'text-neon-yellow fill-current' : 'text-gray-300'} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="font-mono text-sm text-gray-700">
                        商品质量很好，音色优美，卖家人也很热情，下次还会再来购买！
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            {relatedArticles.length > 0 && (
              <div className="card-brutal p-4">
                <h3 className="font-bold text-xl mb-4">相关选购指南</h3>
                <div className="space-y-4">
                  {relatedArticles.map(article => (
                    <Link
                      key={article.id}
                      to={`/information/${article.id}`}
                      className="block group"
                    >
                      <img
                        src={article.cover}
                        alt={article.title}
                        className="w-full h-32 object-cover border-2 border-black mb-2 group-hover:border-neon-yellow"
                      />
                      <h4 className="font-bold text-sm group-hover:text-neon-blue">
                        {article.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="card-brutal bg-neon-yellow p-4">
              <h3 className="font-bold text-xl mb-4">平台服务保障</h3>
              <ul className="space-y-3 font-mono text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>平台认证商品</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>支持验琴服务</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>资金托管保障</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle size={16} />
                  <span>售后无忧</span>
                </li>
              </ul>
              <Link to="/services" className="btn-brutal mt-4 w-full text-center block">
                了解更多服务
              </Link>
            </div>
          </div>
        </div>

        <section>
          <h2 className="section-title mb-8">相关推荐</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
