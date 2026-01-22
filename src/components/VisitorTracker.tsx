import { useVisitorTracking } from '@/hooks/useVisitorTracking';

/**
 * 访客追踪组件 - 放置在App根组件中以启用全局追踪
 * 自动追踪：页面浏览、点击事件、滚动深度、停留时间
 */
const VisitorTracker = () => {
  // 初始化访客追踪hook
  useVisitorTracking();
  
  // 这是一个无UI的追踪组件
  return null;
};

export default VisitorTracker;
