/**
 * 开发环境图片Alt标签扫描器
 * 自动检测页面中缺失或低质量Alt标签的<img>元素
 * 仅在开发环境下运行，生产环境自动跳过
 */
import { useEffect, useRef } from 'react';

interface AltIssue {
  src: string;
  issue: 'missing' | 'empty' | 'generic' | 'too_short';
  element: HTMLImageElement;
  suggestion?: string;
}

// 通用无意义alt标签
const GENERIC_ALTS = [
  'image', 'img', 'photo', 'picture', 'pic', 'icon',
  '图片', '图', '照片', 'placeholder', 'untitled',
  'image1', 'image2', 'image3', 'img1', 'img2',
];

// 从文件名推测alt建议
const suggestAltFromSrc = (src: string): string => {
  try {
    const filename = src.split('/').pop()?.split('?')[0]?.split('.')[0] || '';
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase())
      .trim() || '需要手动添加描述性Alt标签';
  } catch {
    return '需要手动添加描述性Alt标签';
  }
};

const scanImages = (): AltIssue[] => {
  const images = document.querySelectorAll('img');
  const issues: AltIssue[] = [];

  images.forEach((img) => {
    const alt = img.getAttribute('alt');
    const src = img.src || img.getAttribute('src') || '[unknown]';
    
    // 跳过SVG data URIs和占位图
    if (src.startsWith('data:') || src.includes('placeholder')) return;
    // 跳过装饰性小图标 (< 24px)
    if (img.width > 0 && img.width < 24 && img.height > 0 && img.height < 24) return;

    if (alt === null) {
      issues.push({ src, issue: 'missing', element: img, suggestion: suggestAltFromSrc(src) });
    } else if (alt.trim() === '') {
      // 空alt可能是有意的装饰图片，但对于产品图应该有alt
      if (src.includes('/products/') || src.includes('/assets/') || src.includes('/images/')) {
        issues.push({ src, issue: 'empty', element: img, suggestion: suggestAltFromSrc(src) });
      }
    } else if (GENERIC_ALTS.includes(alt.toLowerCase().trim())) {
      issues.push({ src, issue: 'generic', element: img, suggestion: suggestAltFromSrc(src) });
    } else if (alt.length < 5 && !['logo', 'CANI'].includes(alt)) {
      issues.push({ src, issue: 'too_short', element: img, suggestion: suggestAltFromSrc(src) });
    }
  });

  return issues;
};

const issueLabels: Record<string, string> = {
  missing: '❌ 缺失Alt标签',
  empty: '⚠️ Alt标签为空',
  generic: '⚠️ Alt标签过于通用',
  too_short: '⚠️ Alt标签过短',
};

export const ImageAltScanner = () => {
  const lastScanRef = useRef<number>(0);

  useEffect(() => {
    // 仅在开发环境下运行
    if (import.meta.env.PROD) return;

    const runScan = () => {
      // 防抖：300ms内不重复扫描
      const now = Date.now();
      if (now - lastScanRef.current < 300) return;
      lastScanRef.current = now;

      // 等DOM稳定后扫描
      setTimeout(() => {
        const issues = scanImages();
        
        if (issues.length === 0) {
          console.log('%c✅ [Alt Scanner] 所有图片Alt标签检查通过！', 'color: #22c55e; font-weight: bold;');
          return;
        }

        console.groupCollapsed(
          `%c🔍 [Alt Scanner] 发现 ${issues.length} 个图片Alt标签问题`,
          'color: #f59e0b; font-weight: bold; font-size: 14px;'
        );

        issues.forEach((issue, i) => {
          const shortSrc = issue.src.split('/').slice(-2).join('/');
          console.log(
            `%c${i + 1}. ${issueLabels[issue.issue]}%c\n   文件: ${shortSrc}\n   建议: alt="${issue.suggestion}"`,
            'color: #ef4444; font-weight: bold;',
            'color: #6b7280;'
          );
        });

        console.log(
          '%c\n💡 SEO提示: 描述性Alt标签应包含产品名称和关键词，如:\n   alt="CANI S900 50km远距高清数字图传系统"\n   alt="F722飞控电调一体板-正面接口图"',
          'color: #3b82f6;'
        );
        console.groupEnd();
      }, 1000);
    };

    // 初始扫描
    runScan();

    // MutationObserver监听DOM变化（路由切换时）
    const observer = new MutationObserver((mutations) => {
      const hasImageChanges = mutations.some(m => 
        m.type === 'childList' && 
        (m.addedNodes.length > 0 || m.removedNodes.length > 0)
      );
      if (hasImageChanges) runScan();
    });

    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    return () => observer.disconnect();
  }, []);

  return null; // 不渲染任何UI
};

export default ImageAltScanner;
