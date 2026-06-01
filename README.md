# 🎻 小提琴垂直交易与资讯咨询平台 - 部署指南

## 项目简介

这是一个使用 React + TypeScript + Tailwind CSS 构建的小提琴垂直交易与资讯咨询平台前端项目。

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:5173
```

### 构建生产版本

```bash
npm run build
```

构建后的文件会生成在 `dist` 文件夹中。

## 部署到公网

### 方案一：Vercel（推荐，最简单）

1. **创建 GitHub 仓库**
   - 在 GitHub 上创建一个新仓库
   - 将项目代码推送到 GitHub

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 使用 GitHub 账号登录
   - 点击 "Add New" → "Project"
   - 选择您的 GitHub 仓库
   - 点击 "Deploy"

3. **完成！**
   - Vercel 会自动构建并部署
   - 您会获得一个公开的 URL，例如：`your-app.vercel.app`
   - 您可以在 Vercel 控制台绑定自定义域名

### 方案二：Netlify

1. **构建项目**
   ```bash
   npm run build
   ```

2. **手动部署**
   - 访问 [netlify.com](https://netlify.com)
   - 注册/登录账号
   - 点击 "Sites" → "Add new site" → "Deploy manually"
   - 将 `dist` 文件夹拖拽到上传区域

3. **完成！**
   - Netlify 会分配一个随机子域名
   - 您可以在设置中更改为自定义域名

### 方案三：GitHub Pages

1. **修改 vite.config.ts**
   ```typescript
   import { defineConfig } from 'vite'
   import react from '@vitejs/plugin-react'

   export default defineConfig({
     plugins: [react()],
     base: './',  // 添加这行
   })
   ```

2. **安装 GitHub Pages 插件**
   ```bash
   npm install -D gh-pages
   ```

3. **配置 package.json**
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

4. **部署**
   ```bash
   npm run deploy
   ```

5. **启用 GitHub Pages**
   - 在 GitHub 仓库 Settings → Pages
   - Source 选择 "gh-pages" 分支
   - 您的网站将在 `https://yourusername.github.io/repository-name` 可用

### 方案四：Cloudflare Pages

1. **构建项目**
   ```bash
   npm run build
   ```

2. **连接 Cloudflare**
   - 访问 [pages.cloudflare.com](https://pages.cloudflare.com)
   - 使用 Cloudflare 账号登录
   - 选择 "Create a project" → "Direct upload"
   - 上传 `dist` 文件夹

### 方案五：阿里云/腾讯云 OSS

1. **构建项目**
   ```bash
   npm run build
   ```

2. **上传到 OSS**
   - 登录阿里云/腾讯云控制台
   - 创建 OSS 存储桶（设置为公共读）
   - 将 `dist` 文件夹内容上传到存储桶

3. **配置静态网站托管**
   - 在 OSS 控制台开启静态网站托管
   - 设置默认首页为 `index.html`

## 项目结构

```
violin-trading-platform/
├── dist/                    # 构建输出目录（部署时使用）
├── public/                  # 静态资源
├── src/
│   ├── components/          # 可复用组件
│   ├── pages/              # 页面组件
│   ├── stores/             # Zustand 状态管理
│   ├── data/               # 模拟数据
│   ├── types/              # TypeScript 类型定义
│   └── App.tsx            # 应用入口
├── package.json
├── tailwind.config.js      # Tailwind 配置
├── vite.config.ts         # Vite 配置
└── tsconfig.json          # TypeScript 配置
```

## 功能页面

- **首页** - Hero、热门分类、推荐商品、资讯、问答
- **商品列表** - 筛选、排序、网格/列表视图
- **商品详情** - 图片展示、商品信息、卖家信息、评价
- **发布商品** - 发布二手小提琴、琴弓、配件
- **资讯页面** - 选购指南、评测文章
- **问答社区** - 选琴咨询、估价、维修问答
- **用户中心** - 订单、收藏、咨询、消息、设置
- **卖家中心** - 商品管理、订单管理、数据看板
- **平台服务** - 验琴、估价、寄售、维修服务

## 技术栈

- React 18 + TypeScript
- Vite 构建工具
- Tailwind CSS
- React Router DOM
- Zustand 状态管理
- Lucide React 图标

## 注意事项

1. 本项目为纯前端项目，使用模拟数据，无需后端 API
2. 所有数据存储在浏览器的 localStorage 中
3. 部署后刷新页面可能需要重新登录（因为没有真实后端）

## 许可证

MIT License

---

**🎻 让每一把好琴都能找到它的主人**