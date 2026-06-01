import { useState, FormEvent } from 'react';

interface FormData {
  productType: string;
  title: string;
  brand: string;
  origin: string;
  dimensions: string;
  purchaseDate: string;
  usageDuration: string;
  condition: string;
  price: string;
  negotiable: boolean;
  services: string[];
  defects: string;
  soundDescription: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactWechat: string;
  images: string[];
  videos: string[];
}

export default function PublishProduct() {
  const [formData, setFormData] = useState<FormData>({
    productType: '',
    title: '',
    brand: '',
    origin: '',
    dimensions: '',
    purchaseDate: '',
    usageDuration: '',
    condition: '',
    price: '',
    negotiable: false,
    services: [],
    defects: '',
    soundDescription: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    contactWechat: '',
    images: [],
    videos: [],
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const productTypes = [
    { value: 'violin', label: '小提琴' },
    { value: 'bow', label: '琴弓' },
    { value: 'case', label: '琴盒' },
    { value: 'accessories', label: '配件' },
    { value: 'strings', label: '琴弦' },
    { value: 'rosin', label: '松香' },
  ];

  const conditions = [
    { value: '全新', label: '全新未使用' },
    { value: '几乎全新', label: '几乎全新（9-9.5新）' },
    { value: '很好', label: '很好（8-8.5新）' },
    { value: '良好', label: '良好（7-7.5新）' },
    { value: '一般', label: '一般（6新以下）' },
  ];

  const serviceOptions = [
    { value: '免费送货', label: '免费送货' },
    { value: '支持试琴', label: '支持试琴' },
    { value: '可以寄存', label: '可以寄存' },
    { value: '协助运输', label: '协助运输' },
    { value: '提供证书', label: '提供证书' },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'negotiable') {
        setFormData(prev => ({ ...prev, negotiable: checked }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceChange = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service],
    }));
  };

  const handleImageUpload = () => {
    const mockImage = `image_${Date.now()}.jpg`;
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, mockImage],
    }));
  };

  const handleVideoUpload = () => {
    const mockVideo = `video_${Date.now()}.mp4`;
    setFormData(prev => ({
      ...prev,
      videos: [...prev.videos, mockVideo],
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const removeVideo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    
    if (!formData.productType) newErrors.productType = '请选择商品类型';
    if (!formData.title.trim()) newErrors.title = '请输入商品标题';
    if (!formData.price.trim()) newErrors.price = '请输入价格';
    if (!formData.contactName.trim()) newErrors.contactName = '请输入联系人姓名';
    if (!formData.contactPhone.trim()) newErrors.contactPhone = '请输入联系电话';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setFormData({
        productType: '',
        title: '',
        brand: '',
        origin: '',
        dimensions: '',
        purchaseDate: '',
        usageDuration: '',
        condition: '',
        price: '',
        negotiable: false,
        services: [],
        defects: '',
        soundDescription: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        contactWechat: '',
        images: [],
        videos: [],
      });
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-cream py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card-brutal p-8 text-center animate-slide-in">
            <div className="text-6xl mb-4">🎻</div>
            <h2 className="title-display text-4xl mb-4">发布成功！</h2>
            <p className="text-lg mb-6">您的商品信息已成功提交，我们将尽快审核。</p>
            <button
              onClick={() => setSubmitSuccess(false)}
              className="btn-brutal-primary"
            >
              继续发布
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="title-display text-5xl md:text-6xl mb-8 text-center">
          发布商品
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="card-brutal p-6">
            <h2 className="section-title text-2xl mb-6">基本信息</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  商品类型 <span className="text-red-600">*</span>
                </label>
                <select
                  name="productType"
                  value={formData.productType}
                  onChange={handleInputChange}
                  className="input-brutal w-full"
                >
                  <option value="">请选择商品类型</option>
                  {productTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
                {errors.productType && (
                  <p className="text-red-600 text-sm mt-1">{errors.productType}</p>
                )}
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  商品标题 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="例如：德国制斯特拉迪瓦里型小提琴"
                  className="input-brutal w-full"
                />
                {errors.title && (
                  <p className="text-red-600 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">品牌</label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  placeholder="例如：Guarneri, Stradivari等"
                  className="input-brutal w-full"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">产地</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                  placeholder="例如：德国、意大利、中国"
                  className="input-brutal w-full"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">尺寸</label>
                <input
                  type="text"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleInputChange}
                  placeholder="例如：4/4, 3/4, 1/2"
                  className="input-brutal w-full"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">购买时间</label>
                <input
                  type="month"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleInputChange}
                  className="input-brutal w-full"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">使用时长</label>
                <input
                  type="text"
                  name="usageDuration"
                  value={formData.usageDuration}
                  onChange={handleInputChange}
                  placeholder="例如：3年、5个月"
                  className="input-brutal w-full"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">成色</label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  className="input-brutal w-full"
                >
                  <option value="">请选择成色</option>
                  {conditions.map(cond => (
                    <option key={cond.value} value={cond.value}>
                      {cond.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="card-brutal p-6">
            <h2 className="section-title text-2xl mb-6">价格与交易</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  价格（元） <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="请输入价格"
                  className="input-brutal w-full"
                  min="0"
                  step="0.01"
                />
                {errors.price && (
                  <p className="text-red-600 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div className="flex items-center">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="negotiable"
                    checked={formData.negotiable}
                    onChange={handleInputChange}
                    className="w-6 h-6 border-4 border-black cursor-pointer"
                  />
                  <span className="ml-3 font-bold uppercase text-sm">支持议价</span>
                </label>
              </div>
            </div>

            <div className="mt-6">
              <label className="block font-bold mb-3 uppercase text-sm">服务选项</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {serviceOptions.map(service => (
                  <label
                    key={service.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service.value)}
                      onChange={() => handleServiceChange(service.value)}
                      className="w-5 h-5 border-4 border-black cursor-pointer"
                    />
                    <span className="ml-2 font-bold text-sm">{service.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="card-brutal p-6">
            <h2 className="section-title text-2xl mb-6">商品详情</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2 uppercase text-sm">瑕疵说明</label>
                <textarea
                  name="defects"
                  value={formData.defects}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="请详细描述商品的瑕疵情况（如有）"
                  className="input-brutal w-full resize-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">音色描述</label>
                <textarea
                  name="soundDescription"
                  value={formData.soundDescription}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="请描述商品的音色特点"
                  className="input-brutal w-full resize-none"
                />
              </div>
            </div>
          </div>

          <div className="card-brutal p-6">
            <h2 className="section-title text-2xl mb-6">图片上传</h2>
            
            <div className="border-4 border-dashed border-black p-8 text-center">
              {formData.images.length === 0 ? (
                <div>
                  <div className="text-5xl mb-4">📷</div>
                  <p className="font-bold mb-4">点击按钮上传商品图片</p>
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="btn-brutal"
                  >
                    选择图片
                  </button>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                    {formData.images.map((_img, index) => (
                      <div key={index} className="relative border-4 border-black p-2 bg-white">
                        <div className="bg-gray-200 border-2 border-dashed border-gray-400 aspect-square flex items-center justify-center text-3xl">
                          🖼️
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 border-2 border-black font-bold hover:bg-red-600"
                        >
                          ×
                        </button>
                        <p className="text-xs mt-1 truncate">图片 {index + 1}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleImageUpload}
                    className="btn-brutal"
                  >
                    添加更多图片
                  </button>
                </div>
              )}
              <p className="text-sm mt-4 text-gray-600">
                建议上传多角度图片，包括琴头、琴背、侧面等
              </p>
            </div>
          </div>

          <div className="card-brutal p-6">
            <h2 className="section-title text-2xl mb-6">视频上传</h2>
            
            <div className="border-4 border-dashed border-black p-8 text-center">
              {formData.videos.length === 0 ? (
                <div>
                  <div className="text-5xl mb-4">🎬</div>
                  <p className="font-bold mb-4">点击按钮上传商品视频</p>
                  <button
                    type="button"
                    onClick={handleVideoUpload}
                    className="btn-brutal"
                  >
                    选择视频
                  </button>
                </div>
              ) : (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {formData.videos.map((_video, index) => (
                      <div key={index} className="relative border-4 border-black p-2 bg-white">
                        <div className="bg-gray-200 border-2 border-dashed border-gray-400 aspect-video flex items-center justify-center text-3xl">
                          ▶️
                        </div>
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white w-8 h-8 border-2 border-black font-bold hover:bg-red-600"
                        >
                          ×
                        </button>
                        <p className="text-xs mt-1">视频 {index + 1}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleVideoUpload}
                    className="btn-brutal"
                  >
                    添加更多视频
                  </button>
                </div>
              )}
              <p className="text-sm mt-4 text-gray-600">
                建议上传演奏视频或音色展示视频
              </p>
            </div>
          </div>

          <div className="card-brutal p-6">
            <h2 className="section-title text-2xl mb-6">联系方式</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  联系人姓名 <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                  placeholder="请输入联系人姓名"
                  className="input-brutal w-full"
                />
                {errors.contactName && (
                  <p className="text-red-600 text-sm mt-1">{errors.contactName}</p>
                )}
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">
                  联系电话 <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder="请输入联系电话"
                  className="input-brutal w-full"
                />
                {errors.contactPhone && (
                  <p className="text-red-600 text-sm mt-1">{errors.contactPhone}</p>
                )}
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">电子邮箱</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleInputChange}
                  placeholder="请输入电子邮箱（选填）"
                  className="input-brutal w-full"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 uppercase text-sm">微信号</label>
                <input
                  type="text"
                  name="contactWechat"
                  value={formData.contactWechat}
                  onChange={handleInputChange}
                  placeholder="请输入微信号（选填）"
                  className="input-brutal w-full"
                />
              </div>
            </div>
          </div>

          <div className="text-center pb-8">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-brutal-primary text-xl px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '提交中...' : '发布商品'}
            </button>
            <p className="text-sm mt-4 text-gray-600">
              点击发布即表示您同意我们的服务条款和隐私政策
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
