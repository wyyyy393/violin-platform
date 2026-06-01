import { Article } from '../types';

export const articles: Article[] = [
  {
    id: '1',
    title: '新手选琴指南：如何挑选你的第一把小提琴',
    category: '新手选琴',
    cover: 'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=800',
    summary: '本文详细介绍了初学者在选购第一把小提琴时需要考虑的关键因素，包括预算、品牌、尺寸等核心问题。',
    content: `
# 新手选琴指南

## 一、确定预算

作为初学者，建议将预算控制在 1000-3000 元之间。这个价位的琴已经能够满足初学练习的需求，同时不会造成过大的经济压力。

## 二、选择合适的尺寸

小提琴尺寸选择对照表：
- 1/8：适合4-6岁儿童
- 1/4：适合6-8岁儿童
- 1/2：适合8-10岁儿童
- 3/4：适合10-12岁青少年
- 4/4：适合12岁以上及成人

## 三、品牌推荐

入门级品牌推荐：
1. 雅马哈（Yamaha）- 品质稳定
2. 索尼（Sony）- 性价比高
3. 施坦霍夫（Stenhof）- 音色不错

## 四、购买渠道建议

建议选择正规琴行或平台认证卖家，务必支持试音和验琴服务。
    `,
    author: '小提琴教育专家王老师',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    publishDate: '2024-01-10',
    readCount: 2345,
    relatedProducts: ['1', '2', '6'],
  },
  {
    id: '2',
    title: '二手小提琴避坑指南：资深鉴定师的10条经验',
    category: '二手小提琴避坑',
    cover: 'https://images.unsplash.com/photo-1558098329-a11cff621064?w=800',
    summary: '购买二手小提琴时需要注意哪些问题？本文总结了资深鉴定师的实战经验，帮助你避开常见陷阱。',
    content: `
# 二手小提琴避坑指南

## 一、查看琴身细节

1. 检查琴身是否有裂缝，尤其是琴角和琴颈连接处
2. 观察琴漆是否原厂漆面
3. 检查音孔是否对称

## 二、验证琴弓品质

1. 弓杆是否笔直
2. 弓毛是否需要更换
3. 螺丝机构是否正常

## 三、了解琴的历史

- 购买年份
- 之前的保养情况
- 是否有维修记录
- 是否有正规鉴定证书

## 四、警惕价格陷阱

如果某把小提琴的价格低得离谱，很可能有隐藏问题。务必选择平台认证的卖家，并使用平台验琴服务。
    `,
    author: '资深鉴定师李老师',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
    publishDate: '2024-01-12',
    readCount: 3456,
    relatedProducts: ['4'],
  },
  {
    id: '3',
    title: '小提琴尺寸完全指南：不再为尺寸烦恼',
    category: '小提琴尺寸指南',
    cover: 'https://images.unsplash.com/photo-1576502200916-3808e07386a5?w=800',
    summary: '一文读懂小提琴尺寸选择，让你轻松找到最适合自己的尺寸。',
    content: `
# 小提琴尺寸完全指南

## 尺寸对照表

| 年龄 | 身高 | 推荐尺寸 |
|------|------|---------|
| 3-5岁 | 90-110cm | 1/16 |
| 4-6岁 | 100-115cm | 1/8 |
| 5-7岁 | 110-125cm | 1/4 |
| 7-9岁 | 120-135cm | 1/2 |
| 9-11岁 | 130-150cm | 3/4 |
| 12岁以上 | 150cm以上 | 4/4 |

## 如何测量

测量左手指尖到左肩的长度，这个长度就是你应该选择的小提琴琴身长度。
    `,
    author: '琴行老板张经理',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    publishDate: '2024-01-08',
    readCount: 1876,
    relatedProducts: ['2', '6'],
  },
  {
    id: '4',
    title: '琴弓选购指南：如何选择一把好弓',
    category: '琴弓选购',
    cover: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800',
    summary: '琴弓是小提琴演奏的重要工具，本文教你如何选购适合自己的琴弓。',
    content: `
# 琴弓选购指南

## 琴弓材质

### 木质琴弓
- 传统选择
- 音色温暖
- 需要细心保养

### 碳纤维琴弓
- 现代主流
- 耐用性强
- 性能稳定

## 价格区间

- 入门级：200-500元
- 进阶级：500-2000元
- 专业级：2000元以上

## 选购要点

1. 弓杆笔直度
2. 重量平衡
3. 弓毛张力
4. 握感舒适度
    `,
    author: '乐器专家刘老师',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    publishDate: '2024-01-05',
    readCount: 1234,
    relatedProducts: ['3'],
  },
  {
    id: '5',
    title: '琴弦评测：2024年最值得购买的琴弦推荐',
    category: '琴弦评测',
    cover: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800',
    summary: '对市场上主流琴弦进行专业评测，为你推荐最适合的琴弦。',
    content: `
# 2024年琴弦评测报告

## 入门级推荐

### Dominant
- 价格适中
- 音色均衡
- 耐用性好

### Larsen Student
- 性价比高
- 适合初学者

## 专业级推荐

### Thomastik Infeld Vision
- 音色出众
- 寿命长
- 专业首选

### Larsen Magnacore
- 温暖音色
- 稳定性强
    `,
    author: '乐器评测师陈老师',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    publishDate: '2024-01-03',
    readCount: 987,
    relatedProducts: [],
  },
  {
    id: '6',
    title: '松香评测：不同品牌松香的特点与适用场景',
    category: '松香评测',
    cover: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800',
    summary: '全面评测主流松香品牌，帮助你选择最适合的松香。',
    content: `
# 松香评测报告

## 入门级推荐

### Hill Dark
- 经典入门选择
- 附着力适中
- 价格实惠

### Andrea Dark
- 音色偏暖
- 适合古典演奏

## 专业级推荐

### 多米南达
- 纯净音质
- 专业首选
- 适用广泛

### Pirastro Goldflex
- 高端定位
- 极致音色
- 适合独奏
    `,
    author: '松香收藏家',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    publishDate: '2024-01-01',
    readCount: 654,
    relatedProducts: ['5'],
  },
];

export const articleCategories = [
  '新手选琴',
  '二手小提琴避坑',
  '小提琴尺寸指南',
  '琴弓选购',
  '琴弦评测',
  '松香评测',
  '肩托与腮托选择',
  '保养维修',
  '品牌百科',
  '制琴师介绍',
  '艺考与考级用琴推荐',
];
