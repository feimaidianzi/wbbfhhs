# 多语言Sitemap提交指南

## 概述

本指南介绍如何将生成的多语言sitemap文件提交到主流搜索引擎，以确保所有语言版本的网站都能被正确索引。

## 准备工作

### 1. 下载Sitemap文件

在管理后台 `/admin/seo` 页面：
1. 点击"下载全部文件"按钮
2. 将获得以下文件：
   - `sitemap-index.xml` - 索引文件
   - `sitemap-zh.xml` - 中文版sitemap
   - `sitemap-en.xml` - 英文版sitemap
   - `sitemap-ja.xml` - 日文版sitemap
   - ... (其他14种语言)
   - `robots-*.txt` - 各语言版本的robots文件

### 2. 部署Sitemap文件

将sitemap文件上传到对应子域名的根目录：
```
www.cani.com/sitemap.xml    → sitemap-zh.xml
en.cani.com/sitemap.xml     → sitemap-en.xml
ja.cani.com/sitemap.xml     → sitemap-ja.xml
...
```

将主域名的sitemap-index.xml放在：
```
www.cani.com/sitemap-index.xml
```

---

## Google Search Console 提交

### 步骤1：添加网站资产

1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 点击"添加资产"
3. 选择"网址前缀"，分别添加每个子域名：
   - `https://www.cani.com`
   - `https://en.cani.com`
   - `https://ja.cani.com`
   - ... (所有14个子域名)

### 步骤2：验证所有权

使用以下任一方式验证：
- **HTML文件**：上传Google提供的验证文件到网站根目录
- **DNS记录**：添加TXT记录到DNS配置
- **Google Analytics**：使用已关联的GA账号

### 步骤3：提交Sitemap

1. 在左侧菜单选择"站点地图"
2. 输入sitemap地址：`sitemap.xml`
3. 点击"提交"

**注意**：需要为每个子域名重复此步骤

### 步骤4：验证hreflang

在"国际定位"报告中检查：
- hreflang标签是否正确识别
- 各语言版本之间的交叉引用是否正确

---

## 百度站长工具提交

### 步骤1：注册并添加站点

1. 访问 [百度站长平台](https://ziyuan.baidu.com/)
2. 注册/登录账号
3. 添加站点：`www.cani.com`

### 步骤2：验证站点

选择验证方式：
- **文件验证**：上传验证文件
- **HTML标签验证**：添加meta标签到首页
- **CNAME验证**：添加DNS CNAME记录

### 步骤3：提交Sitemap

1. 进入"链接提交" > "sitemap"
2. 输入sitemap地址：`https://www.cani.com/sitemap.xml`
3. 点击提交

### 步骤4：主动推送（推荐）

使用百度提供的API主动推送新链接：
```bash
curl -H 'Content-Type:text/plain' \
     --data-binary @urls.txt \
     "http://data.zz.baidu.com/urls?site=www.cani.com&token=YOUR_TOKEN"
```

---

## Bing Webmaster Tools 提交

### 步骤1：添加站点

1. 访问 [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. 使用Microsoft账号登录
3. 添加站点或从Google Search Console导入

### 步骤2：提交Sitemap

1. 选择"配置" > "站点地图"
2. 点击"提交站点地图"
3. 输入：`https://www.cani.com/sitemap.xml`

---

## Yandex Webmaster 提交（俄语版）

1. 访问 [Yandex Webmaster](https://webmaster.yandex.com/)
2. 添加站点：`https://ru.cani.com`
3. 在"索引" > "站点地图"中提交sitemap

---

## 子域名语言检测测试

### 测试方法

1. **直接访问测试**
   - 访问 `https://en.cani.com` → 应自动显示英文
   - 访问 `https://ja.cani.com` → 应自动显示日文
   - 访问 `https://www.cani.com` → 应自动显示中文

2. **浏览器开发者工具检查**
   - 打开开发者工具 → Network标签
   - 检查请求头中的语言设置
   - 检查HTML的 `lang` 属性

3. **控制台日志检查**
   ```
   Language detected from subdomain: en
   ```

### 预期行为

| 子域名 | 语言代码 | 显示语言 |
|--------|----------|----------|
| www.cani.com | zh | 中文 |
| en.cani.com | en | English |
| ja.cani.com | ja | 日本語 |
| ko.cani.com | ko | 한국어 |
| vi.cani.com | vi | Tiếng Việt |
| th.cani.com | th | ไทย |
| ms.cani.com | ms | Bahasa Melayu |
| id.cani.com | id | Bahasa Indonesia |
| fr.cani.com | fr | Français |
| de.cani.com | de | Deutsch |
| es.cani.com | es | Español |
| ru.cani.com | ru | Русский |
| ar.cani.com | ar | العربية |
| tr.cani.com | tr | Türkçe |

---

## 常见问题

### Q: hreflang标签没有被识别？
A: 确保所有子域名的页面都正确包含`<link rel="alternate">`标签，并且URL格式一致。

### Q: sitemap提交后没有被索引？
A: 索引需要时间，通常需要几天到几周。确保：
- robots.txt允许爬虫访问
- 页面返回200状态码
- 没有noindex标签

### Q: 语言切换后URL没变？
A: 当前实现是单页应用，语言切换在客户端完成。对于完整的多域名SEO，需要在服务器端根据子域名设置初始语言。

---

## 定期维护

1. **每月检查**
   - 检查搜索控制台的覆盖率报告
   - 处理爬网错误

2. **内容更新后**
   - 重新生成并提交sitemap
   - 使用主动推送通知搜索引擎

3. **新增页面时**
   - 更新`src/utils/sitemapGenerator.ts`中的路由列表
   - 重新生成所有sitemap
