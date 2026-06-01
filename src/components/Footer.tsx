import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-white border-t-4 border-black mt-16">
      <div className="container-brutal py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-4 text-neon-yellow">
              VIOLIN
            </h3>
            <p className="font-mono text-sm">
              专注小提琴整琴、琴弓、配件交易的专业平台
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 border-b-2 border-neon-yellow pb-2">
              快速链接
            </h4>
            <ul className="space-y-2 font-mono text-sm">
              <li>
                <Link to="/products" className="hover:text-neon-yellow transition-colors">
                  商品列表
                </Link>
              </li>
              <li>
                <Link to="/information" className="hover:text-neon-yellow transition-colors">
                  选购资讯
                </Link>
              </li>
              <li>
                <Link to="/qa" className="hover:text-neon-yellow transition-colors">
                  问答社区
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-neon-yellow transition-colors">
                  平台服务
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 border-b-2 border-neon-pink pb-2">
              服务保障
            </h4>
            <ul className="space-y-2 font-mono text-sm">
              <li>平台验琴服务</li>
              <li>二手估价服务</li>
              <li>寄售服务</li>
              <li>专业维修</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 border-b-2 border-neon-blue pb-2">
              联系我们
            </h4>
            <ul className="space-y-3 font-mono text-sm">
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-neon-yellow" />
                <span>上海市浦东新区音乐街</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-neon-yellow" />
                <span>400-888-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-neon-yellow" />
                <span>contact@violin.cn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t-2 border-gray-700 mt-8 pt-8 text-center font-mono text-sm">
          <p>&copy; {currentYear} VIOLIN 小提琴交易平台. All rights reserved.</p>
          <p className="mt-2 text-gray-400">
            让每一把好琴都能找到它的主人
          </p>
        </div>
      </div>
    </footer>
  );
};
