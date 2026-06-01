import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Calendar } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/information/${article.id}`} className="block">
      <div className="card-brutal hover:shadow-brutal-lg transition-shadow duration-200 animate-slide-in overflow-hidden">
        <div className="relative">
          <img
            src={article.cover}
            alt={article.title}
            className="w-full h-48 object-cover border-b-4 border-black"
          />
          <div className="absolute top-2 left-2 bg-neon-yellow border-2 border-black px-3 py-1 text-sm font-bold">
            {article.category}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-display text-xl mb-3 leading-tight">
            {article.title}
          </h3>

          <p className="font-mono text-sm text-gray-600 mb-4 line-clamp-3">
            {article.summary}
          </p>

          <div className="flex items-center justify-between text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <img
                src={article.authorAvatar}
                alt={article.author}
                className="w-6 h-6 rounded-full border-2 border-black"
              />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Eye size={14} />
                <span>{article.readCount}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{article.publishDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
