import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Music } from 'lucide-react';
import { Product } from '../types';
import { useUserStore } from '../stores/useUserStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addFavorite, removeFavorite, isFavorite } = useUserStore();
  const favorite = isFavorite(product.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFavorite(product.id);
    } else {
      addFavorite(product.id);
    }
  };

  const conditionColors: Record<string, string> = {
    '全新': 'bg-neon-green',
    '99新': 'bg-neon-blue',
    '95新': 'bg-neon-yellow',
    '9成新': 'bg-orange-custom',
    '8成新': 'bg-neon-pink',
  };

  return (
    <Link to={`/products/${product.id}`} className="block">
      <div className="card-brutal hover:shadow-brutal-lg transition-shadow duration-200 animate-slide-in">
        <div className="relative">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-64 object-cover border-b-4 border-black"
          />
          
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 bg-white border-2 border-black p-2 hover:bg-neon-pink transition-colors"
          >
            <Heart
              size={20}
              className={favorite ? 'fill-neon-pink text-neon-pink' : ''}
            />
          </button>

          {product.platformCertified && (
            <div className="absolute top-2 left-2 bg-neon-green border-2 border-black px-2 py-1 text-xs font-bold">
              平台认证
            </div>
          )}

          {product.supportOfflineTrial && (
            <div className="absolute bottom-2 left-2 bg-neon-blue border-2 border-black px-2 py-1 text-xs font-bold flex items-center gap-1">
              <Music size={12} />
              可试音
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className={`${conditionColors[product.condition]} border-2 border-black px-2 py-1 text-xs font-bold`}>
              {product.condition}
            </span>
            {product.size && (
              <span className="border-2 border-black px-2 py-1 text-xs font-bold">
                {product.size}
              </span>
            )}
          </div>

          <h3 className="font-bold text-lg mb-2 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="font-display text-2xl text-red-600">
              ¥{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-sm text-gray-500 line-through">
                ¥{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between text-sm font-mono text-gray-600">
            <span>{product.brand || product.maker || '手工定制'}</span>
            <div className="flex items-center gap-1">
              <span>★</span>
              <span>{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs font-mono">
            <span className="text-gray-500">{product.origin}</span>
            <span className="text-gray-400">销量 {product.seller.salesCount}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
