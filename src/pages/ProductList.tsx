import React, { useState, useEffect } from 'react';
import { Filter, Grid, List } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { products, brands, origins, sizes, conditions, stages } from '../data/products';
import { Product } from '../types';

export const ProductList: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    priceMin: '',
    priceMax: '',
    condition: [] as string[],
    size: [] as string[],
    stage: [] as string[],
    brand: [] as string[],
    origin: [] as string[],
  });

  useEffect(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter(p => p.type === filters.category);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(searchLower) ||
        p.brand?.toLowerCase().includes(searchLower) ||
        p.maker?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.priceMin) {
      result = result.filter(p => p.price >= parseInt(filters.priceMin));
    }

    if (filters.priceMax) {
      result = result.filter(p => p.price <= parseInt(filters.priceMax));
    }

    if (filters.condition.length > 0) {
      result = result.filter(p => filters.condition.includes(p.condition));
    }

    if (filters.size.length > 0 && filters.size[0]) {
      result = result.filter(p => p.size && filters.size.includes(p.size));
    }

    if (filters.stage.length > 0) {
      result = result.filter(p => filters.stage.includes(p.stage));
    }

    if (filters.brand.length > 0) {
      result = result.filter(p => p.brand && filters.brand.includes(p.brand));
    }

    if (filters.origin.length > 0) {
      result = result.filter(p => filters.origin.includes(p.origin));
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.views - a.views);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    setFilteredProducts(result);
  }, [filters, sortBy]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: string, value: string) => {
    setFilters(prev => {
      const current = prev[key as keyof typeof prev] as string[];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-black text-white py-8 border-b-4 border-black">
        <div className="container-brutal">
          <h1 className="font-display text-5xl mb-2">商品列表</h1>
          <p className="font-mono text-lg text-gray-300">
            共找到 {filteredProducts.length} 件商品
          </p>
        </div>
      </div>

      <div className="container-brutal py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card-brutal p-4 sticky top-24">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Filter size={20} />
                筛选条件
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold mb-2">价格区间</h4>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="最低"
                      value={filters.priceMin}
                      onChange={(e) => handleFilterChange('priceMin', e.target.value)}
                      className="input-brutal w-full"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="最高"
                      value={filters.priceMax}
                      onChange={(e) => handleFilterChange('priceMax', e.target.value)}
                      className="input-brutal w-full"
                    />
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">新旧程度</h4>
                  <div className="space-y-2">
                    {conditions.map(c => (
                      <label key={c} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.condition.includes(c)}
                          onChange={() => toggleArrayFilter('condition', c)}
                          className="w-5 h-5 border-2 border-black"
                        />
                        <span className="font-mono text-sm">{c}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">尺寸</h4>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map(s => (
                      <button
                        key={s}
                        onClick={() => toggleArrayFilter('size', s)}
                        className={`px-3 py-1 border-2 border-black font-mono text-sm ${
                          filters.size.includes(s) ? 'bg-neon-yellow' : 'bg-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">适用阶段</h4>
                  <div className="space-y-2">
                    {stages.map(s => (
                      <label key={s} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.stage.includes(s)}
                          onChange={() => toggleArrayFilter('stage', s)}
                          className="w-5 h-5 border-2 border-black"
                        />
                        <span className="font-mono text-sm">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">品牌</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map(b => (
                      <label key={b} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.brand.includes(b)}
                          onChange={() => toggleArrayFilter('brand', b)}
                          className="w-5 h-5 border-2 border-black"
                        />
                        <span className="font-mono text-sm">{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold mb-2">产地</h4>
                  <div className="space-y-2">
                    {origins.map(o => (
                      <label key={o} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.origin.includes(o)}
                          onChange={() => toggleArrayFilter('origin', o)}
                          className="w-5 h-5 border-2 border-black"
                        />
                        <span className="font-mono text-sm">{o}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setFilters({
                    category: '',
                    search: '',
                    priceMin: '',
                    priceMax: '',
                    condition: [],
                    size: [],
                    stage: [],
                    brand: [],
                    origin: [],
                  })}
                  className="btn-brutal w-full"
                >
                  重置筛选
                </button>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="card-brutal p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-brutal lg:hidden flex items-center gap-2"
                >
                  <Filter size={20} />
                  筛选
                </button>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm">排序：</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-brutal"
                  >
                    <option value="newest">最新发布</option>
                    <option value="price-low">价格从低到高</option>
                    <option value="price-high">价格从高到低</option>
                    <option value="popular">热度最高</option>
                    <option value="rating">评价最好</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 border-2 border-black ${viewMode === 'grid' ? 'bg-neon-yellow' : 'bg-white'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 border-2 border-black ${viewMode === 'list' ? 'bg-neon-yellow' : 'bg-white'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card-brutal p-12 text-center">
                <p className="font-display text-2xl mb-4">没有找到符合条件的商品</p>
                <button
                  onClick={() => setFilters({
                    category: '',
                    search: '',
                    priceMin: '',
                    priceMax: '',
                    condition: [],
                    size: [],
                    stage: [],
                    brand: [],
                    origin: [],
                  })}
                  className="btn-brutal-primary"
                >
                  重置筛选
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
