
# 替换 ELRS 2.4G LNA 接收机产品图片

## 任务概述
将 **ELRS 2.4G LNA 接收机** (`elrs-2-4g-lna`) 产品的主图替换为用户上传的新图片。

---

## 实施步骤

### 步骤 1: 复制图片资源
将用户上传的图片复制到项目资源目录：
- 源文件: `user-uploads://17-17-13-6352639957740.images.400x400.jpg`
- 目标路径: `src/assets/elrs/elrs-2-4g-lna.jpg`

### 步骤 2: 更新产品数据文件
修改 `src/data/elrsProducts.ts`:

1. **添加 ES6 模块导入**:
```typescript
import elrs24gLnaImage from "@/assets/elrs/elrs-2-4g-lna.jpg";
```

2. **更新 `elrs-2-4g-lna` 产品条目**:
   - `image` 字段: 从外部 URL 改为导入的变量 `elrs24gLnaImage`
   - `gallery` 数组: 同步更新为使用相同的本地资源

---

## 涉及文件
| 文件 | 操作 |
|------|------|
| `src/assets/elrs/elrs-2-4g-lna.jpg` | 新增（复制用户图片） |
| `src/data/elrsProducts.ts` | 修改（更新图片引用） |

---

## 技术说明
- 按照项目规范，配件类产品图片存储在 `src/assets/` 目录下
- 使用 ES6 模块导入方式确保 Vite 正确处理资源路径和哈希生成
- 同时更新 `image` 和 `gallery` 字段以保持一致性
