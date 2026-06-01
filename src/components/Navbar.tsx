import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../stores/useCartStore';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const totalItems = useCartStore((state) => state.totalItems());

  const navItems = [
    { name: '首页', path: '/' },
    { name: '商品', path: '/products' },
    { name: '资讯', path: '/information' },
    { name: '问答', path: '/qa' },
    { name: '服务', path: '/services' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <nav className="bg-white border-b-4 border-black sticky top-0 z-50">
      <div className="container-brutal">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-neon-yellow border-4 border-black px-3 py-2 font-display text-2xl shadow-brutal-sm">
              VIOLIN
            </div>
            <div className="hidden sm:block font-mono text-sm font-bold">
              小提琴交易平台
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="font-bold uppercase hover:text-neon-blue transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索小提琴、琴弓..."
              className="input-brutal w-64"
            />
            <button type="submit" className="btn-brutal p-2">
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center gap-4">
            <Link to="/user" className="hidden sm:block btn-brutal p-2">
              <User size={20} />
            </Link>
            
            <Link to="/user" className="relative btn-brutal p-2">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-neon-pink border-2 border-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden btn-brutal p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t-4 border-black py-4 bg-white">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索小提琴、琴弓..."
                className="input-brutal w-full"
              />
            </form>
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="font-bold uppercase py-2 px-4 hover:bg-neon-yellow transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/publish"
                className="btn-brutal-primary text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                免费开店
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
