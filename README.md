# next.js-starter-template

基于 NextJS 14 和 Tailwind CSS 构建的网站。

## Tech Stack

- [next](https://nextjs.org/)
- [react](https://reactjs.org/)
- [shadcn ui](https://ui.shadcn.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [react-query](https://tanstack.com/query/latest/)
- [tailwindcss](https://tailwindcss.com/)
- [postcss](https://postcss.org/)
- [eslint](https://eslint.org/)/[stylelint](https://stylelint.io/)
- [prettier](https://prettier.io/)
- [svgr](https://react-svgr.com/)
- [editorconfig](https://editorconfig.org/)
- [husky](https://typicode.github.io/husky/#/)/[lint-staged](https://github.com/okonet/lint-staged)
- [commitlint](https://commitlint.js.org/)
- [next-sitemap](https://github.com/iamvishnusankar/next-sitemap#readme)
- [mongodb](https://www.mongodb.com/)（后端数据库）

## Run

```sh
yarn
yarn dev
```

## 开发流程 & Deploy

### 开发流程

- 特性分支：`feat/**`
- 开发分支：`dev`
- 主分支：`main`

新特性开始时从 main 分支创建开发分支 dev-[date]，开发完后合入 dev 分支发布 UAT 进行测试，测试通过后合并到 main 分支发布 Production 环境。

### UAT 环境

dev 分支更新后会自动触发 docker 镜像构建，构建镜像好后由管理员或运维进行发布。

### Production 环境

main 分支更新后会自动触发 docker 镜像构建，构建镜像好后由管理员或运维进行发布。

## Analytics

- Google Analytics
- Google Search Console

## i18n (国际化)

本项目使用 [next-intl](https://next-intl-docs.vercel.app/) 实现国际化。

- **目录结构:**
  - `locales/`: 存放不同语言的翻译文件，目前支持 `en`、 `zh-Hans`、`zh-Hant` 、`ja` 等多种语言
- **实现方式:**
  - 使用 `useTranslations` hook 在组件中获取翻译文本。
  - 使用 `<Link>` 组件进行语言切换。
  - 配置 `next.config.js` 文件以支持不同的语言。
- **如何添加新的语言:**
  1. 在 `locales/` 目录下创建新的语言文件，例如 `fr.json`。
  2. 在 `next.config.js` 文件中添加新的语言代码。
  3. 在组件中使用 `useTranslations` hook 获取新的语言的翻译文本。

## 数据获取

### API 生成

API 生成同其他项目一样，使用 `@xverse/api-generator` 生成。

### Server Component 数据获取

在 Server Component 中直接从 `apis` 里引入函数进行调用，需要将客户端传过来的 Cookie 传给服务端来实现鉴权透传，Next 层不做真正的鉴权。

### Server Action 数据获取

Server Action 是 Next 14 新特性，可以实现在客户端直接调用服务端声明的函数来数据获取。

### 普通 XHR

在一些特殊情况无法使用上述两种请求方式，就只能使用 route handler 来调用 `apis` 里的函数，然后使用普通的 XHR 来调用。例如 SSE 请求 `/api/chat` 路由。

## 数据库

本项目后端数据库采用 [MongoDB](https://www.mongodb.com/)。

- 数据库连接配置在 `.env` 文件中，使用 `MONGODB_URI` 环境变量。
- 数据库操作通过 `src/lib/mongodb.ts` 工具文件实现单例连接。
- API 路由（如 `src/app/api/user/route.ts`）中可直接操作 MongoDB。

## auth

本项目采用多层次的鉴权机制，确保用户访问安全和搜索引擎爬虫的正常工作。

- 匿名登录：middleware 自动进行匿名登录，token 存储在 HTTP-only cookie。
- 用户登录：支持邮箱、手机验证码、Google、Apple 第三方登录。
- 搜索引擎爬虫处理：middleware 检测爬虫并设置特定 token。
- 受保护路由：未登录用户访问受保护路由时自动弹出登录弹窗或重定向。
- 权限管理：Server Component 和 Server Action 通过 `getHeader()` 获取带 token 的请求头，前端不做真正鉴权，后端根据 token 判断权限。

## sitemap (站点地图)

本项目使用自定义脚本生成站点地图，以提高 SEO。

- **目录结构:**
  - `src/sitemap/`: 生成脚本和相关数据
  - `public/sitemap/`: 生成的站点地图文件
- **站点地图类型:**
  - 聊天站点地图、搜索站点地图、站点地图索引
- **生成方式:**
  - 聊天站点地图通过 API 获取数据
  - 搜索站点地图基于 CSV 文件生成
  - 支持多语言 URL
- **如何更新:**
  1. 更新 CSV 文件
  2. 运行 `node src/sitemap/index.js` 生成最新站点地图
  3. 将 `public/sitemap/sitemap.xml` 覆盖 `public/sitemap.xml`
  4. 提交到 Google Search Console
