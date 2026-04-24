# 网站三站拆分 — 迁移交接文档

> **本项目的定位 = `caniuav.com` 工业无人机飞行平台站**
>
> 本文档记录当前项目（caniuav.com）做的隐藏改造，方便另外两个 Remix 项目（canilink.com / canipower.com）按相反逻辑各自执行。

---

## 一、三站定位总览

| 站点 | 域名 | 保留品类 | 隐藏品类 |
|---|---|---|---|
| **飞行平台站**（本项目） | `caniuav.com` | C10/C20/C30、W200/W300/W400、T100/T200/T300、X650/X850/X1200/X1600、WL10/20/30、FPV 整机、农业/消防/测绘等行业整机 | VTX/VRX、MeshLink、ELRS、天线、FC/ESC、Gimbal、Camera、Digital FPV、AI Module、14S 电源、BMS、电池组 |
| **链路通信站** | `canilink.com` | VTX/VRX、MeshLink、ELRS、天线、Digital FPV、Camera、Gimbal、AI Module、FC/ESC | 所有整机、电源类 |
| **电源能源站** | `canipower.com` | 14S 高压系统、大电流 BMS、大载重电池组 | 整机、链路类、其他配件 |

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

### 6. **路由保留**（重要）
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
   - 保持原版（已经是配件展示），可以把大卡片换成 **MeshLink 150km 链路**主推

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

6. **路由保留**：整机页面路由不要删，只是不索引

7. **首页 Hero / SEO 标题** 改成：
   - `home.seo.title`：`150km Long-Range UAV Datalink & Digital Video Transmission | CANI`
   - 关键词：`long-range UAV datalink, 150km video transmission, MeshLink, digital VTX, 6-7GHz video link, long-range ground station`

### 🟠 canipower.com（电源能源站）需要做的事

**保留：** 14S 高压系统、大电流 BMS、大载重电池组（如果数据库 products 表 category 有 `power` / `battery` / `bms`，否则需要先添加）
**隐藏：** 整机 + 链路 + 其他配件

操作步骤：

1. **`src/components/Header.tsx`**：`droneCategories` 和 `accessoryCategories` 都改为空数组，新增 `powerCategories` 数组（电池 / BMS / 电源管理）
2. **`src/components/ProductsSection.tsx`**：5 张卡片全换成电源产品（14S 电池组 / 大电流 BMS / 充电器 / 电源分配板 / 智能电池）
3. **`src/pages/Products.tsx`**：清空 `techClusters` 后新增「Power & Energy」集群
4. **`src/components/Footer.tsx`**：`productLinks` 改为电源产品链接，SEO 关键词改成 14S battery / heavy-lift UAV BMS / industrial battery management
5. **`src/utils/sitemapGenerator.ts`**：删除所有整机和现有配件路由，保留 / 新增 `/products/power/*` 路由
6. **首页 SEO 标题**：`14S Heavy-Lift UAV Power System & Smart BMS | CANI`

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
   > 「请参考 @caniuav-主项目 的 `MIGRATION_NOTES.md` 文档第三节 canilink.com 部分，按相反逻辑改造本项目，把整机隐藏，只保留链路和配件类目」

2. 然后在 canipower.com 项目里说同样的话，让 AI 按第三节 canipower.com 部分操作。

3. 三个站全部部署后，分别在各自首页加一条小卡片：
   - caniuav.com → 「Looking for components? Visit canilink.com」
   - canilink.com → 「Need a complete UAV platform? Visit caniuav.com」
   - canipower.com → 「Power up your UAV at canilink.com or caniuav.com」

这样三站独立 SEO + 互相导流，符合分析师建议的垂直化布局。
