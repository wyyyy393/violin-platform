import React from 'react';
import { Link } from 'react-router-dom';
import { Music, Box, Disc, Sparkles, Hand, ShoppingBag, CheckCircle } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
}

interface CategoryGridProps {
  categories: Category[];
}

const iconMap: Record<string, React.ReactNode> = {
  violin: <Music size={48} />,
  bow: <Box size={48} />,
  case: <Box size={48} />,
  strings: <Disc size={48} />,
  rosin: <Sparkles size={48} />,
  'shoulder-rest': <Hand size={48} />,
  'chin-rest': <Hand size={48} />,
  tuner: <Music size={48} />,
  metronome: <Music size={48} />,
  parts: <Box size={48} />,
  secondhand: <ShoppingBag size={48} />,
};

const colorMap: string[] = [
  'bg-neon-yellow',
  'bg-neon-pink',
  'bg-neon-blue',
  'bg-neon-green',
  'bg-orange-custom',
  'bg-neon-yellow',
  'bg-neon-pink',
  'bg-neon-blue',
];

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {categories.map((category, index) => (
        <Link
          key={category.id}
          to={`/products?category=${category.id}`}
          className="card-brutal hover:shadow-brutal-lg transition-all duration-200 p-6 group"
        >
          <div className="flex flex-col items-center gap-3">
            <div
              className={`${colorMap[index % colorMap.length]} border-4 border-black p-4 group-hover:scale-110 transition-transform`}
            >
              {iconMap[category.icon] || <Music size={48} />}
            </div>
            <h3 className="font-bold text-lg text-center">{category.name}</h3>
            <span className="font-mono text-sm text-gray-600">
              {category.count} 件商品
            </span>
          </div>
        </Link>
      ))}
      
      <Link
        to="/services"
        className="card-brutal hover:shadow-brutal-lg transition-all duration-200 p-6 group bg-neon-green"
      >
        <div className="flex flex-col items-center gap-3">
          <div className="bg-white border-4 border-black p-4 group-hover:scale-110 transition-transform">
            <CheckCircle size={48} />
          </div>
          <h3 className="font-bold text-lg text-center">验琴服务</h3>
          <span className="font-mono text-sm text-gray-700">
            专业保障
          </span>
        </div>
      </Link>
    </div>
  );
};
