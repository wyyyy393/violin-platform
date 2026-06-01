import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Tag, Package, Users, Wrench, Building2, CheckCircle, ArrowRight, Camera } from 'lucide-react';

interface Service {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  description: string[];
  price?: string;
  features: string[];
  bgColor: string;
  borderColor: string;
}

const services: Service[] = [
  {
    id: 'authentication',
    icon: Shield,
    title: '平台验琴服务',
    description: ['专业鉴定师团队', '权威证书认证'],
    price: '¥199起',
    features: ['专业鉴定', '证书认证', '售后保障'],
    bgColor: 'bg-neon-yellow',
    borderColor: 'border-black'
  },
  {
    id: 'valuation',
    icon: Tag,
    title: '二手估价服务',
    description: ['免费专业估价', '详细评估报告'],
    price: '免费估价',
    features: ['免费服务', '详细报告', '照片要求'],
    bgColor: 'bg-neon-pink',
    borderColor: 'border-black'
  },
  {
    id: 'consignment',
    icon: Package,
    title: '寄售服务',
    description: ['专业销售团队', '全平台推广'],
    price: '分成模式',
    features: ['专业销售', '平台推广', '分成比例'],
    bgColor: 'bg-neon-blue',
    borderColor: 'border-black'
  },
  {
    id: 'teacher',
    icon: Users,
    title: '老师推荐服务',
    description: ['专业师资团队', '个性化推荐'],
    price: '咨询服务',
    features: ['专业老师', '个性化推荐', '试课体验'],
    bgColor: 'bg-neon-green',
    borderColor: 'border-black'
  },
  {
    id: 'repair',
    icon: Wrench,
    title: '制琴师维修服务',
    description: ['专业维修团队', '精细保养服务'],
    price: '预约维修',
    features: ['专业维修', '保养服务', '原厂配件'],
    bgColor: 'bg-orange-custom',
    borderColor: 'border-black'
  },
  {
    id: 'store',
    icon: Building2,
    title: '线下门店合作',
    description: ['多种合作模式', '欢迎入驻申请'],
    price: '合作咨询',
    features: ['合作模式', '入驻申请', '资源共享'],
    bgColor: 'bg-cream',
    borderColor: 'border-black'
  }
];

export const Services: React.FC = () => {
  return (
    <div className="min-h-screen">
      <section className="bg-neon-yellow border-b-8 border-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-40 h-40 border-4 border-black rotate-12"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 border-4 border-black -rotate-12"></div>
          <div className="absolute top-1/2 right-1/4 w-48 h-48 border-4 border-black rotate-45"></div>
        </div>
        
        <div className="container-brutal py-16 md:py-20 relative">
          <div className="text-center">
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-4">
              平台服务
            </h1>
            <p className="font-mono text-xl md:text-2xl mb-6">
              专业的全方位服务，让您的音乐之旅更轻松
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <span className="bg-white border-4 border-black px-4 py-2 font-bold text-lg">
                ✓ 专业鉴定
              </span>
              <span className="bg-white border-4 border-black px-4 py-2 font-bold text-lg">
                ✓ 透明定价
              </span>
              <span className="bg-white border-4 border-black px-4 py-2 font-bold text-lg">
                ✓ 售后保障
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-brutal py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className={`${service.bgColor} border-4 ${service.borderColor} shadow-brutal-lg hover:shadow-brutal transition-all duration-200 hover:-translate-y-2`}
              >
                <div className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent size={48} className="text-black" strokeWidth={3} />
                    <span className="font-display text-2xl md:text-3xl text-black">
                      {service.price}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-2xl md:text-3xl mb-4 border-b-4 border-black pb-4">
                    {service.title}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    {service.description.map((desc, idx) => (
                      <p key={idx} className="font-mono text-base md:text-lg">
                        {desc}
                      </p>
                    ))}
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle size={20} className="text-black flex-shrink-0" />
                        <span className="font-mono text-sm md:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <button className="btn-brutal w-full flex items-center justify-center gap-2 bg-white border-4 border-black">
                    立即预约 <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="container-brutal">
          <h2 className="font-display text-4xl md:text-5xl text-center mb-12 text-neon-yellow">
            服务流程
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-neon-yellow text-black border-4 border-black font-display text-4xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-bold text-xl mb-2">在线咨询</h3>
              <p className="font-mono text-sm text-gray-300">
                描述您的需求，获得专业建议
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neon-pink text-black border-4 border-black font-display text-4xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-bold text-xl mb-2">预约服务</h3>
              <p className="font-mono text-sm text-gray-300">
                选择时间，提交预约申请
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neon-blue text-black border-4 border-black font-display text-4xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-bold text-xl mb-2">专业服务</h3>
              <p className="font-mono text-sm text-gray-300">
                专家团队为您提供专业服务
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-neon-green text-black border-4 border-black font-display text-4xl flex items-center justify-center mx-auto mb-4">
                4
              </div>
              <h3 className="font-bold text-xl mb-2">完成交付</h3>
              <p className="font-mono text-sm text-gray-300">
                获得专业报告，享受售后服务
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-brutal py-16">
        <div className="card-brutal bg-neon-yellow p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <Camera size={64} className="text-black mb-4" />
              <h2 className="font-display text-4xl mb-4">二手估价小贴士</h2>
              <p className="font-mono text-lg mb-6">
                为了获得更准确的估价，请准备以下照片：
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-black flex-shrink-0 mt-1" />
                  <span className="font-mono">琴身正面、侧面、背面清晰照片</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-black flex-shrink-0 mt-1" />
                  <span className="font-mono">琴头和琴颈特写</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-black flex-shrink-0 mt-1" />
                  <span className="font-mono">琴弦和琴弓状态</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-black flex-shrink-0 mt-1" />
                  <span className="font-mono">琴盒和配件（如果有）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle size={24} className="text-black flex-shrink-0 mt-1" />
                  <span className="font-mono">品牌和型号标签</span>
                </li>
              </ul>
            </div>
            <div className="text-center lg:text-right">
              <div className="bg-white border-4 border-black p-8 mb-4">
                <p className="font-mono text-lg mb-2">估价服务</p>
                <p className="font-display text-5xl text-neon-pink mb-2">完全免费</p>
                <p className="font-mono text-sm">24小时内获得估价结果</p>
              </div>
              <button className="btn-brutal-primary px-8 py-4 text-lg">
                立即上传照片估价
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neon-pink border-y-8 border-black py-16">
        <div className="container-brutal">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4">
              联系我们
            </h2>
            <p className="font-mono text-xl">
              专业的客服团队随时为您服务
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-brutal bg-white p-6 text-center">
              <div className="font-display text-3xl mb-4">📞</div>
              <h3 className="font-bold text-xl mb-2">电话咨询</h3>
              <p className="font-mono text-lg">400-888-9999</p>
              <p className="font-mono text-sm text-gray-600 mt-2">工作日 9:00-18:00</p>
            </div>
            <div className="card-brutal bg-white p-6 text-center">
              <div className="font-display text-3xl mb-4">💬</div>
              <h3 className="font-bold text-xl mb-2">在线客服</h3>
              <p className="font-mono text-lg">微信公众号</p>
              <p className="font-mono text-sm text-gray-600 mt-2">全天24小时服务</p>
            </div>
            <div className="card-brutal bg-white p-6 text-center">
              <div className="font-display text-3xl mb-4">📧</div>
              <h3 className="font-bold text-xl mb-2">邮件联系</h3>
              <p className="font-mono text-lg">service@violin.com</p>
              <p className="font-mono text-sm text-gray-600 mt-2">24小时内回复</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-neon-blue border-y-8 border-black py-16">
        <div className="container-brutal">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl mb-4 text-white">
              常见问题
            </h2>
          </div>
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="card-brutal bg-white">
              <div className="p-6 border-b-4 border-black">
                <h3 className="font-display text-xl mb-2">Q: 验琴服务需要多长时间？</h3>
                <p className="font-mono text-gray-700">
                  A: 通常验琴服务需要1-3个工作日完成，具体时间取决于琴的具体情况和预约人数。
                </p>
              </div>
            </div>
            <div className="card-brutal bg-white">
              <div className="p-6 border-b-4 border-black">
                <h3 className="font-display text-xl mb-2">Q: 寄售服务需要收取哪些费用？</h3>
                <p className="font-mono text-gray-700">
                  A: 寄售服务采用分成模式，平台收取销售价格的10%作为服务费，包括推广、销售和售后支持。
                </p>
              </div>
            </div>
            <div className="card-brutal bg-white">
              <div className="p-6 border-b-4 border-black">
                <h3 className="font-display text-xl mb-2">Q: 如何申请成为合作门店？</h3>
                <p className="font-mono text-gray-700">
                  A: 请通过客服电话或邮件联系我们，我们的商务团队会在3个工作日内与您联系。
                </p>
              </div>
            </div>
            <div className="card-brutal bg-white">
              <div className="p-6">
                <h3 className="font-display text-xl mb-2">Q: 维修服务有保修吗？</h3>
                <p className="font-mono text-gray-700">
                  A: 是的，所有维修服务都提供3个月的保修期，保修范围包括维修部位的材料和工艺。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-16">
        <div className="container-brutal text-center">
          <h2 className="font-display text-4xl mb-6 text-neon-yellow">
            准备好开始了吗？
          </h2>
          <p className="font-mono text-xl mb-8 text-gray-300">
            无论您需要什么服务，我们都在这里为您提供帮助
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/products" className="btn-brutal-primary px-8 py-4 text-lg">
              浏览商品
            </Link>
            <button className="btn-brutal bg-white px-8 py-4 text-lg">
              预约服务
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
