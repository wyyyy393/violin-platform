# 小提琴垂直交易平台 - 完整部署方案

## 📋 项目结构

```
violin-platform/
├── frontend/              # 前端 (React + TypeScript)
│   ├── src/
│   ├── dist/
│   └── package.json
└── backend/              # 后端 (NestJS + TypeScript)
    ├── src/
    ├── prisma/
    └── package.json
```

---

## 🚀 第一步：本地开发环境搭建

### 1. 安装依赖

#### 后端
```bash
cd backend
npm install
cp .env.example .env
# 编辑 .env，配置数据库连接
```

#### 前端
```bash
cd ..  # 回到项目根目录
npm install
cp .env.example .env
```

### 2. 配置数据库

使用 Docker 启动 PostgreSQL（推荐）：

```bash
docker run -d \
  --name violin-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -e POSTGRES_DB=violin_platform \
  -p 5432:5432 \
  postgres:15
```

或使用本地安装的 PostgreSQL，创建数据库后修改 `backend/.env`。

### 3. 初始化数据库

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
```

### 4. 启动服务

#### 启动后端
```bash
cd backend
npm run dev
```

#### 启动前端
```bash
# 打开新终端
npm run dev
```

---

## ☁️ 第二步：云部署方案

### 方案一：前后端分离部署（推荐）

#### 前端部署（Vercel / Netlify）
1. 推送代码到 GitHub
2. 在 Vercel 导入仓库
3. 配置环境变量 `VITE_API_URL`（指向后端地址）
4. 自动部署

#### 后端部署（Railway / Fly.io）
1. 使用 Railway 一键部署
2. 配置环境变量（DATABASE_URL, JWT_SECRET, CORS_ORIGIN）
3. 配置 PostgreSQL 数据库
4. 自动部署

### 方案二：全栈部署（Docker）

#### 创建 Dockerfile

**后端 Dockerfile (`backend/Dockerfile`)**:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

**前端 Dockerfile (`Dockerfile`)**:
```dockerfile
FROM node:20-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### docker-compose.yml
```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: yourpassword
      POSTGRES_DB: violin_platform
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
  
  backend:
    build: ./backend
    environment:
      DATABASE_URL: postgresql://postgres:yourpassword@db:5432/violin_platform
      PORT: 3000
      JWT_SECRET: your-secret-key
      CORS_ORIGIN: https://yourdomain.com
    depends_on:
      - db
    ports:
      - "3000:3000"
  
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend

volumes:
  postgres_data:
```

#### 部署到云服务器
```bash
# 在服务器上
git clone <your-repo>
cd violin-platform
docker-compose up -d
```

---

## 🗄️ 数据库选择

| 数据库 | 场景 | 成本 |
|--------|------|------|
| **PostgreSQL** | 生产环境 | 免费 - 中等 |
| **MySQL** | 熟悉者 | 免费 - 中等 |
| **Supabase** | 云托管 | 免费 - 按需 |
| **Vercel Postgres** | Vercel部署 | 免费 - 按需 |

---

## 💳 支付集成（可选）

### 微信支付/支付宝
1. 申请商家账号
2. 配置支付回调
3. 后端实现支付接口

### Stripe（国际版）
1. 注册 Stripe 账号
2. 安装 `stripe` SDK
3. 实现支付流程

---

## 📦 文件存储方案

| 方案 | 优点 | 成本 |
|------|------|------|
| **阿里云 OSS** | 国内访问快 | 按量付费 |
| **腾讯云 COS** | 国内访问快 | 按量付费 |
| **Cloudflare R2** | 全球 CDN | 免费额度 |
| **AWS S3** | 国际访问 | 按需付费 |

---

## 🔐 生产环境安全检查清单

- [ ] 使用 HTTPS（配置 SSL 证书）
- [ ] 使用强密钥（JWT_SECRET, 数据库密码）
- [ ] 配置 CORS 白名单
- [ ] 启用数据库备份
- [ ] 配置日志收集
- [ ] 设置监控告警
- [ ] 限制 API 调用频率
- [ ] 加密敏感数据（如密码）

---

## 📊 扩展功能建议

### 阶段一（MVP）
- ✅ 用户注册登录
- ✅ 商品列表和详情
- ✅ 商品发布
- ✅ 订单系统

### 阶段二
- 🔄 支付集成
- 🔄 消息通知
- 🔄 评价系统
- 🔄 搜索优化

### 阶段三
- 📊 数据统计
- 🎯 推荐系统
- 📱 移动端适配
- 🔔 实时通知

---

## 💰 成本估算（参考）

| 项目 | 费用（月） |
|------|-----------|
| 云服务器（2核4G） | ¥100-300 |
| PostgreSQL 数据库 | ¥0-200 |
| OSS/CDN 存储 | ¥0-100 |
| 域名 + SSL | ¥0-100 |
| **总计** | **¥100-700** |

使用免费额度（Vercel + Supabase）可以几乎零成本启动！

---

## 🆘 需要帮助？

如果遇到问题：
1. 检查日志（`docker-compose logs`）
2. 查看 API 文档（后端 `/api` 路径）
3. 确认环境变量配置正确
