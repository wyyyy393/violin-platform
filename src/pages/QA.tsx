import React, { useState } from 'react';
import { Plus, MessageCircle } from 'lucide-react';
import { QuestionCard } from '../components/QuestionCard';
import { questions, questionTypes } from '../data/questions';
import { Question } from '../types';

export const QA: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>(questions);

  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    if (type === '全部') {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(q => q.type === type));
    }
  };

  const typeColors: Record<string, string> = {
    '买琴咨询': 'bg-neon-blue',
    '二手估价': 'bg-orange-custom',
    '维修问题': 'bg-neon-pink',
    '配件选择': 'bg-neon-yellow',
    '儿童换琴': 'bg-neon-green',
    '艺考用琴': 'bg-neon-blue',
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-black text-white py-8 border-b-4 border-black">
        <div className="container-brutal">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-display text-5xl mb-2">问答咨询</h1>
              <p className="font-mono text-lg text-gray-300">
                共 {filteredQuestions.length} 个问题
              </p>
            </div>
            <button className="btn-brutal-primary flex items-center gap-2">
              <Plus size={20} />
              <span className="hidden sm:inline">发布问题</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container-brutal py-8">
        <div className="card-brutal p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle size={24} />
            <h2 className="font-bold text-xl">问题分类</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTypeFilter('全部')}
              className={`px-4 py-2 border-4 border-black font-bold transition-all ${
                selectedType === '全部'
                  ? 'bg-black text-white'
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              全部
            </button>
            {questionTypes.map(type => (
              <button
                key={type}
                onClick={() => handleTypeFilter(type)}
                className={`${typeColors[type]} border-4 border-black px-4 py-2 font-bold transition-all ${
                  selectedType === type ? 'ring-4 ring-black ring-offset-2' : 'hover:opacity-90'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="section-title mb-6">热门问题</h2>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="card-brutal p-12 text-center">
            <p className="font-display text-2xl mb-4">暂无该分类的问题</p>
            <button
              onClick={() => handleTypeFilter('全部')}
              className="btn-brutal-primary"
            >
              查看全部问题
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredQuestions.map((question, index) => (
              <div
                key={question.id}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <QuestionCard question={question} />
              </div>
            ))}
          </div>
        )}

        {filteredQuestions.length > 0 && (
          <div className="mt-8 text-center">
            <button className="btn-brutal">
              加载更多问题
            </button>
          </div>
        )}

        <div className="mt-12 card-brutal bg-neon-yellow p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-2xl mb-2">没有找到你的问题？</h3>
              <p className="font-mono text-gray-700">
                立即提问，让专家和社区为你解答
              </p>
            </div>
            <button className="btn-brutal bg-black text-white hover:bg-gray-800 flex items-center gap-2 whitespace-nowrap">
              <Plus size={20} />
              立即提问
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
