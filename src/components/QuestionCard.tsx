import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Eye, DollarSign } from 'lucide-react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question }) => {
  const typeColors: Record<string, string> = {
    '买琴咨询': 'bg-neon-blue',
    '二手估价': 'bg-orange-custom',
    '维修问题': 'bg-neon-pink',
    '配件选择': 'bg-neon-yellow',
    '儿童换琴': 'bg-neon-green',
    '艺考用琴': 'bg-neon-blue',
  };

  return (
    <Link to={`/qa/${question.id}`} className="block">
      <div className="card-brutal hover:shadow-brutal-lg transition-shadow duration-200 animate-slide-in p-4">
        <div className="flex items-start gap-4">
          <img
            src={question.author.avatar}
            alt={question.author.username}
            className="w-12 h-12 rounded-full border-2 border-black"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`${typeColors[question.type] || 'bg-gray-300'} border-2 border-black px-2 py-1 text-xs font-bold`}>
                {question.type}
              </span>
              {question.reward && question.reward > 0 && (
                <span className="bg-neon-green border-2 border-black px-2 py-1 text-xs font-bold flex items-center gap-1">
                  <DollarSign size={12} />
                  ¥{question.reward}
                </span>
              )}
            </div>

            <h3 className="font-bold text-lg mb-2 hover:text-neon-blue transition-colors">
              {question.title}
            </h3>

            <p className="font-mono text-sm text-gray-600 mb-3 line-clamp-2">
              {question.description}
            </p>

            <div className="flex items-center justify-between text-xs font-mono text-gray-500">
              <div className="flex items-center gap-4">
                <span>{question.author.username}</span>
                <span>{question.publishDate}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  <span>{question.answerCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye size={14} />
                  <span>{question.viewCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
