import React, { useState } from 'react';
import { ArticleCard } from '../components/ArticleCard';
import { articles, articleCategories } from '../data/articles';

export const Information: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');

  const filteredArticles = selectedCategory === '全部'
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-black text-white py-8 border-b-4 border-black">
        <div className="container-brutal">
          <h1 className="section-title mb-4">资讯中心</h1>
          <p className="font-mono text-lg text-gray-300">
            共 {filteredArticles.length} 篇精选文章
          </p>
        </div>
      </div>

      <div className="container-brutal py-8">
        <div className="card-brutal p-6 mb-8">
          <h2 className="font-display text-2xl mb-4">分类浏览</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedCategory('全部')}
              className={`tag-brutal transition-all duration-100 ${
                selectedCategory === '全部'
                  ? 'bg-neon-yellow shadow-brutal-sm'
                  : 'bg-white hover:bg-neon-yellow'
              }`}
            >
              全部
            </button>
            {articleCategories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`tag-brutal transition-all duration-100 ${
                  selectedCategory === category
                    ? 'bg-neon-yellow shadow-brutal-sm'
                    : 'bg-white hover:bg-neon-yellow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="card-brutal p-12 text-center">
            <p className="font-display text-2xl mb-4">该分类暂无文章</p>
            <button
              onClick={() => setSelectedCategory('全部')}
              className="btn-brutal-primary"
            >
              查看全部文章
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
