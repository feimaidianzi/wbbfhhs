# 网站三站拆分 — 迁移交接文档

> **本项目的定位 = `caniuav.com` 工业无人机整机厂站**
>
> 本文档记录当前项目（caniuav.com）做的隐藏改造 + 整机厂叙事重塑，方便另外两个 Remix 项目（canilink.com / canipower.com）按相反逻辑各自执行。
>
> **最近一次更新**：完成首页"配件专家 → 工业整机厂"叙事切换。

---

## 一、三站定位总览

| 站点 | 域名 | 核心叙事 | 保留品类 | 隐藏品类 |
|---|---|---|---|---|
| **整机厂站**（本项目） | `caniuav.com` | Industrial UAV Manufacturer / 整机平台 OEM&ODM | C10/C20/C30、W200/W300/W400、T100/T200/T300、X650/X850/X1200/X1600、WL10/20/30、FPV 整机、农业/消防/测绘等行业整机 | VTX/VRX、MeshLink、ELRS、天线、FC/ESC、Gimbal、Camera、Digital FPV、AI Module、14S 电源、BMS、电池组 |
| **链路通信站** | `canilink.com` | Long-range Datalink & Digital VTX 专家 | VTX/VRX、MeshLink、ELRS、天线、Digital FPV、Camera、Gimbal、AI Module、FC/ESC | 所有整机、电源类 |
| **电源能源站** | `canipower.com` | 14S Heavy-Lift Power System 专家 | 14S 高压系统、大电流 BMS、大载重电池组 | 整机、链路类、其他配件 |

---

## 二、本项目（caniuav.com）已执行的改动

### 1. `src/components/Header.tsx`（导航栏）
- `accessoryCategories` 改为空数组 `[]`，导航栏「产品中心」下拉**不再显示** VTX、FC/ESC、Gimbal、Digital FPV、Camera、ELRS、Others、AI Module
- `droneCategories` 保持不变（系留 / 物流 / 集群 / FPV 整机）

### 2. `src/components/ProductsSection.tsx`（首页产品板块）
- 完全重写，5 张卡片改为整机平台展示：
  - C30 集群套件（大卡片，HOT）
  - 系留无人机
  - 物流无人机
  - 多旋翼平台
  - FPV 整机（NEW）
- 移除 VTX/FC/Gimbal/Digital FPV/ELRS 配件卡片

### 3. `src/pages/Products.tsx`（产品中心页）
- `techClusters` 仅保留 `platform.title`（飞行平台集群），移除 digitalLink / fc / ai 三个配件集群
- `accessoryCategories` 改为空数组，配件版块整体被 `{accessoryCategories.length > 0 && ...}` 条件渲染隐藏
- `droneCategories` 板块保持完整展示

### 4. `src/components/Footer.tsx`（页脚）
- `productLinks` 改为整机：Swarm / Tethered / Logistics / Multi-Rotor / FPV
- 「Core Keyword Anchors」SEO 锚点改为整机平台关键词
- 「Comprehensive Sitemap Links」爬虫导航移除所有 `/products/accessories/*` 链接

### 5. `src/utils/sitemapGenerator.ts`（sitemap）
- 删除 9 条 `/products/accessories/*` 路由（vtx-vrx / fc-esc / gimbal / camera / digital-fpv / elrs / others / mesh-link / ai-module）
- 整机路由全部保留并被索引

### 6. **首页 Hero 与叙事重塑**（本轮新增 ⭐）

**视觉资产**
- 新增旗舰整机棚拍图：`src/assets/hero/cani-flagship-drone-hero.webp`（同步至 `public/cani-flagship-drone-hero.webp` 用于 LCP 预加载）
- 替换原 PCB / 配件类 hero 视觉

**修改的文件**
- `src/components/HeroSection.tsx`：右侧 hero 改为旗舰整机产品图，alt 标签强调 "industrial UAV / quadcopter platform / gimbal camera / carbon-fiber chassis"
- `src/components/hero/HeroContent.tsx`：移动端 hero 同步换图
- `index.html`：`<link rel="preload" as="image" href="/cani-flagship-drone-hero.webp" fetchpriority="high">` LCP 预加载

**i18n 文案改造**（4 个文件）
- `src/i18n/zh-home.ts` + `src/i18n/zh.ts`
- `src/i18n/en-home.ts` + `src/i18n/en.ts`

涉及的关键 key：
- `hero.tagline` / `hero.title` / `hero.subtitle`：从"配件专家"改为"整机厂 / 5 大整机产品线（Swarm / Tethered / Logistics / Multi-Rotor / FPV）"
- `home.seo.title` / `home.seo.description` / `home.seo.keywords`：核心关键词替换为 `industrial UAV manufacturer`、`OEM/ODM drone`、`heavy-lift quadcopter`、`tethered drone`、`logistics drone`、`drone swarm`
- `home.brandSummary`：强调整机制造能力 + 行业平台
- 修复 `en-home.ts` 中英文 hero CTA 误填为中文的 bug

**结构化数据**（`src/pages/Index.tsx`）
- `Organization` schema 的 `knowsAbout` 数组移除 VTX / MeshLink / ELRS 等配件关键词，替换为 `Industrial UAV Manufacturing`、`Drone Swarm Systems`、`Tethered UAV`、`Logistics Drone`、`Heavy-lift Multi-rotor`、`FPV Drone Platform`
- `BreadcrumbList` 中产品集合面包屑同步更新

### 7. **路由保留**（重要）
`src/App.tsx` 中所有配件页面路由**未删除**，原因：
- 防止外链直接访问导致 404，影响 Google 历史索引
- 配件页面仍可通过直链访问，方便后续做「跳转到 canilink.com」的引导卡片
- 后续如果想彻底删除路由，可以移除 `src/App.tsx` 第 80–98 行的 lazy import 和对应路由

---

## 三、给另外两个 Remix 项目的反向操作清单

### 🔵 canilink.com（链路通信站）需要做的事

**保留：** VTX/VRX、MeshLink、ELRS、天线、Digital FPV、Camera、Gimbal、AI Module、FC/ESC
**隐藏：** 所有整机（Swarm/Tethered/Logistics/Multi-Rotor/FPV/Agriculture/Firefighting/Training/WireLaying/WorkDrone）+ 电源类

操作步骤（让那个项目的 AI 执行）：

1. **`src/components/Header.tsx`**
   - `droneCategories` 改为空数组 `[]`
   - `accessoryCategories` 保留全部（VTX、FC、Gimbal、Digital FPV、Camera、ELRS、Others、AI Module）
   - `productCenterCategories` 改为只展开 `accessoryCategories`，移除 `multiRotor` 入口

2. **`src/components/ProductsSection.tsx`**
   - 重写为配件展示，可以把大卡片换成 **MeshLink 150km 链路**主推

3. **`src/pages/Products.tsx`**
   - `techClusters` 保留 `digitalLink` / `fc` / `ai` 三个配件集群，移除 `platform`
   - `droneCategories` 改为空数组 `[]`
   - `accessoryCategories` 保留全部
   - 「Drone Systems」板块用条件渲染隐藏

4. **`src/components/Footer.tsx`**
   - `productLinks` 保留 5 个配件链接
   - SEO 关键词锚点改为 long-range datalink / digital VTX / MeshLink / ELRS

5. **`src/utils/sitemapGenerator.ts`**
   - 删除所有 `/products/{tethered,logistics,swarm,multi-rotor,agriculture,firefighting,training,wire-laying,work-drone,swarm-kit}` 及其子路径
   - 保留所有 `/products/accessories/*` 路由
   - 保留 `/fpv` 但建议改成「FPV 配件套装」定位

6. **首页 Hero / 视觉**（参考本项目第二节第 6 条逆向操作）
   - 替换 hero 主视觉为 **MeshLink 模块 / 数字图传 OSD 画面 / 长距天线阵列**棚拍图
   - 同步更新 `index.html` 的 LCP 预加载图

7. **i18n 文案**（zh-home.ts / zh.ts / en-home.ts / en.ts）
   - `hero.tagline / title / subtitle`：核心叙事改为 "150 km Long-range Datalink / Digital Video Transmission Specialist"
   - `home.seo.title`：`150km Long-Range UAV Datalink & Digital Video Transmission | CANI`
   - `home.seo.keywords`：`long-range UAV datalink, 150km video transmission, MeshLink, digital VTX, 6-7GHz video link, long-range ground station`
   - `home.brandSummary`：强调链路 R&D 能力

8. **结构化数据**（`src/pages/Index.tsx`）
   - `Organization.knowsAbout` 替换为 MeshLink / Digital VTX / ELRS / Long-range Antenna 等关键词
   - `BreadcrumbList` 同步更新

9. **路由保留**：整机页面路由不要删，只是不索引

### 🟠 canipower.com（电源能源站）需要做的事

**保留：** 14S 高压系统、大电流 BMS、大载重电池组（如果数据库 products 表 category 有 `power` / `battery` / `bms`，否则需要先添加）
**隐藏：** 整机 + 链路 + 其他配件

操作步骤：

1. **`src/components/Header.tsx`**：`droneCategories` 和 `accessoryCategories` 都改为空数组，新增 `powerCategories` 数组（电池 / BMS / 电源管理）
2. **`src/components/ProductsSection.tsx`**：5 张卡片全换成电源产品（14S 电池组 / 大电流 BMS / 充电器 / 电源分配板 / 智能电池）
3. **`src/pages/Products.tsx`**：清空 `techClusters` 后新增「Power & Energy」集群
4. **`src/components/Footer.tsx`**：`productLinks` 改为电源产品链接，SEO 关键词改成 14S battery / heavy-lift UAV BMS / industrial battery management
5. **`src/utils/sitemapGenerator.ts`**：删除所有整机和现有配件路由，保留 / 新增 `/products/power/*` 路由
6. **首页 Hero**：替换为 14S 电池组 / BMS 主板棚拍图，同步更新 `index.html` LCP 预加载
7. **i18n 文案**：
   - `home.seo.title`：`14S Heavy-Lift UAV Power System & Smart BMS | CANI`
   - `hero.tagline / title / subtitle`：突出电源能源专长
8. **结构化数据**：`Organization.knowsAbout` 改为 UAV Battery / BMS / 14S Power System / Smart Charger 等

> ⚠️ **重要**：电源站可能需要新建产品页面（当前项目没有独立的 power 板块），可以让 AI 仿照 `src/pages/products/swarm/` 的结构新建 `src/pages/products/power/` 目录。

---

## 四、共享数据库注意事项

如果三个 Remix 项目**共用同一套 Lovable Cloud（Supabase）数据库**：
- `products` 表数据全部共享 → 各站只能用前端 `category` 字段过滤显示，**不要直接 DELETE 数据库记录**
- `news_articles` 同理 → 各站可以按 `category` 显示不同主题的新闻
- 各站独立的 admin 后台仍能看到全部数据

如果三站各自有独立的 Lovable Cloud：
- 可以删除不需要的 `products` 记录
- 但建议仍然保留前端过滤，便于后续灵活调整

> 用 Lovable 项目对话框输入 `@当前项目名` 可以让另外两个项目的 AI 直接读取本项目的代码作为参照。

---

## 五、操作建议

1. 先在 canilink.com 项目里和 AI 说：
   > 「请参考 @caniuav-主项目 的 `MIGRATION_NOTES.md` 文档第三节 canilink.com 部分，按相反逻辑改造本项目，把整机隐藏，只保留链路和配件类目，并完成首页 Hero 视觉 + i18n 文案 + 结构化数据的同步切换」

2. 然后在 canipower.com 项目里说同样的话，让 AI 按第三节 canipower.com 部分操作。

3. 三个站全部部署后，分别在各自首页加一条小卡片：
   - caniuav.com → 「Looking for datalink components? Visit canilink.com」「Need high-voltage power? Visit canipower.com」
   - canilink.com → 「Need a complete UAV platform? Visit caniuav.com」
   - canipower.com → 「Power up your UAV at canilink.com or caniuav.com」

这样三站独立 SEO + 互相导流，符合分析师建议的垂直化布局。

---

## 六、本项目改造的验证清单（给反向操作时的对照）

完成后建议在浏览器和 Lighthouse 中确认：

- [ ] 首页 Hero 主视觉为目标品类产品图，alt 标签语义正确
- [ ] `index.html` 的 `<link rel="preload">` 指向新 hero 图
- [ ] 中/英文首页 SEO title / description / keywords 完全反映新定位
- [ ] 首页 5 张产品卡片为目标品类
- [ ] 导航栏「产品中心」下拉只展示目标品类
- [ ] 页脚 productLinks + SEO 锚点都是目标品类
- [ ] sitemap.xml 不再包含被隐藏品类的路由
- [ ] `Organization.knowsAbout` schema 不再出现旧品类关键词
- [ ] 控制台无 `useLanguage must be used within a LanguageProvider` 等运行时报错（如有，硬刷新清 HMR 缓存即可）
