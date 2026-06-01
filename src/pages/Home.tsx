import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle, Music, Shield } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ArticleCard } from '../components/ArticleCard';
import { QuestionCard } from '../components/QuestionCard';
import { CategoryGrid } from '../components/CategoryGrid';
import { products, categories } from '../data/products';
import { articles } from '../data/articles';
import { questions } from '../data/questions';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  const featuredProducts = products.filter(p => p.platformCertified).slice(0, 4);
  const secondhandProducts = products.filter(p => p.condition !== '全新').slice(0, 4);
  const bowProducts = products.filter(p => p.type === 'bow').slice(0, 4);
  const latestArticles = articles.slice(0, 3);
  const hotQuestions = questions.slice(0, 3);

  return (
    <div className="min-h-screen">
      <section className="bg-neon-yellow border-b-8 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black rotate-45"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 border-4 border-black rotate-12"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 border-4 border-black -rotate-12"></div>
        </div>
        
        <div className="container-brutal py-16 md:py-24 relative">
          <div className="text-center mb-8">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-4">
              FIND YOUR NEXT
            </h1>
            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-neon-pink border-8 border-black bg-white inline-block px-8 py-4 shadow-brutal-lg">
              VIOLIN
            </h2>
          </div>

          <div className="text-center mb-12">
            <p className="font-display text-2xl md:text-4xl mb-2">
              BUY. SELL. PLAY.
            </p>
            <p className="font-mono text-lg md:text-xl">
              二手好琴，也值得被重新演奏。
            </p>
          </div>

          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索小提琴、琴弓、琴弦、制琴师、品牌……"
                className="input-brutal flex-1 text-lg py-4"
              />
              <button type="submit" className="btn-brutal-primary px-8 py-4">
                <Search size={24} />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['斯特拉迪瓦里', '雅马哈', '专业演奏', '二手好琴', '初学推荐'].map((keyword) => (
              <Link
                key={keyword}
                to={`/products?search=${encodeURIComponent(keyword)}`}
                className="bg-white border-2 border-black px-4 py-2 font-mono text-sm hover:bg-neon-pink transition-colors"
              >
                {keyword}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-brutal py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">热门分类</h2>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="bg-white border-y-8 border-black py-16">
        <div className="container-brutal">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="section-title">推荐小提琴</h2>
              <span className="bg-neon-green border-4 border-black px-4 py-2 font-bold">
                精选认证
              </span>
            </div>
            <Link to="/products" className="btn-brutal flex items-center gap-2">
              查看更多 <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-brutal py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h2 className="section-title bg-orange-custom">二手好琴</h2>
            <span className="font-mono text-sm">高性价比，平台认证</span>
          </div>
          <Link to="/products?condition=二手" className="btn-brutal flex items-center gap-2">
            查看更多 <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {secondhandProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-neon-pink border-y-8 border-black py-16">
        <div className="container-brutal">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="section-title bg-white">琴弓专区</h2>
              <span className="font-mono text-sm">专业演奏级</span>
            </div>
            <Link to="/products?type=bow" className="btn-brutal bg-white flex items-center gap-2">
              查看更多 <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bowProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-brutal py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title">最新选购指南</h2>
          <Link to="/information" className="btn-brutal flex items-center gap-2">
            查看更多 <ArrowRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

      <section className="bg-neon-blue border-y-8 border-black py-16">
        <div className="container-brutal">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title bg-white">热门问答</h2>
            <Link to="/qa" className="btn-brutal bg-white flex items-center gap-2">
              查看更多 <ArrowRight size={20} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hotQuestions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-brutal py-16">
        <div className="card-brutal bg-neon-green p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <Shield size={64} className="text-black" />
                <h2 className="font-display text-4xl">平台验琴服务</h2>
              </div>
              <p className="font-mono text-lg mb-6">
                专业鉴定师团队，为您的小提琴提供权威认证。
                <br />
                二手交易更放心，平台保障更安心。
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="bg-white border-2 border-black px-3 py-2 font-bold text-sm">
                  ✓ 专业鉴定
                </span>
                <span className="bg-white border-2 border-black px-3 py-2 font-bold text-sm">
                  ✓ 证书认证
                </span>
                <span className="bg-white border-2 border-black px-3 py-2 font-bold text-sm">
                  ✓ 售后保障
                </span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white border-4 border-black p-8 mb-4">
                <Music size={64} className="mx-auto mb-4" />
                <p className="font-display text-2xl mb-2">验琴服务费</p>
                <p className="font-display text-5xl text-neon-pink">¥199</p>
                <p className="font-mono text-sm mt-2">起</p>
              </div>
              <Link to="/services" className="btn-brutal-primary inline-block">
                立即预约
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="container-brutal">
          <h2 className="font-display text-4xl text-center mb-12 text-neon-yellow">
            为什么选择我们？
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <CheckCircle size={64} className="mx-auto mb-4 text-neon-green" />
              <h3 className="font-bold text-xl mb-2">平台认证</h3>
              <p className="font-mono text-sm text-gray-300">
                所有认证商品经过专业鉴定
              </p>
            </div>
            <div className="text-center">
              <Shield size={64} className="mx-auto mb-4 text-neon-blue" />
              <h3 className="font-bold text-xl mb-2">交易保障</h3>
              <p className="font-mono text-sm text-gray-300">
                资金托管，满意后再付款
              </p>
            </div>
            <div className="text-center">
              <Music size={64} className="mx-auto mb-4 text-neon-pink" />
              <h3 className="font-bold text-xl mb-2">试音服务</h3>
              <p className="font-mono text-sm text-gray-300">
                支持线下试音，确保满意
              </p>
            </div>
            <div className="text-center">
              <CheckCircle size={64} className="mx-auto mb-4 text-neon-yellow" />
              <h3 className="font-bold text-xl mb-2">专业咨询</h3>
              <p className="font-mono text-sm text-gray-300">
                老师、制琴师在线答疑
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
