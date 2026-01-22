import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface VisitorSession {
  sessionId: string;
  firstVisitAt: string;
  trafficSource: string;
  referrerUrl: string;
  referrerDomain: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

interface EventData {
  eventType: string;
  eventName?: string;
  eventData?: Record<string, any>;
  pageUrl?: string;
  pageTitle?: string;
  pagePath?: string;
  elementId?: string;
  elementClass?: string;
  elementText?: string;
  elementTag?: string;
  productId?: string;
  productName?: string;
  productCategory?: string;
  durationSeconds?: number;
  scrollDepth?: number;
}

// 生成唯一会话ID
const generateSessionId = (): string => {
  return `vs_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
};

// 获取或创建会话ID
const getOrCreateSessionId = (): string => {
  const storageKey = 'visitor_session_id';
  const sessionExpiry = 'visitor_session_expiry';
  const THIRTY_MINUTES = 30 * 60 * 1000;

  const existingId = localStorage.getItem(storageKey);
  const expiry = localStorage.getItem(sessionExpiry);

  if (existingId && expiry && Date.now() < parseInt(expiry)) {
    // 刷新过期时间
    localStorage.setItem(sessionExpiry, String(Date.now() + THIRTY_MINUTES));
    return existingId;
  }

  const newId = generateSessionId();
  localStorage.setItem(storageKey, newId);
  localStorage.setItem(sessionExpiry, String(Date.now() + THIRTY_MINUTES));
  return newId;
};

// 检测流量来源
const detectTrafficSource = (): { source: string; referrerUrl: string; referrerDomain: string } => {
  const referrer = document.referrer;
  let source = 'direct';
  let referrerDomain = '';

  if (referrer) {
    try {
      const url = new URL(referrer);
      referrerDomain = url.hostname;

      // 搜索引擎检测
      const searchEngines = ['google', 'bing', 'baidu', 'sogou', '360', 'yahoo', 'duckduckgo'];
      if (searchEngines.some(se => referrerDomain.includes(se))) {
        source = 'search_engine';
      }
      // 社交媒体检测
      else if (['weixin', 'wechat', 'weibo', 'qq.com', 'douyin', 'tiktok', 'facebook', 'twitter', 'linkedin'].some(sm => referrerDomain.includes(sm))) {
        source = 'social_media';
      }
      // 其他外链
      else if (referrerDomain !== window.location.hostname) {
        source = 'referral';
      }
    } catch {
      // 无效URL
    }
  }

  return { source, referrerUrl: referrer, referrerDomain };
};

// 获取UTM参数
const getUtmParams = (): { utmSource: string | null; utmMedium: string | null; utmCampaign: string | null } => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
  };
};

// 获取设备信息
const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let deviceType = 'desktop';
  let browser = 'unknown';
  let os = 'unknown';

  // 设备类型
  if (/Mobile|Android|iPhone|iPad/i.test(ua)) {
    deviceType = /iPad/i.test(ua) ? 'tablet' : 'mobile';
  }

  // 浏览器检测
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';

  // 操作系统
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone')) os = 'iOS';

  return {
    userAgent: ua,
    deviceType,
    browser,
    os,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
  };
};

export const useVisitorTracking = () => {
  const location = useLocation();
  const sessionIdRef = useRef<string | null>(null);
  const pageStartTimeRef = useRef<number>(Date.now());
  const scrollDepthRef = useRef<number>(0);
  const isInitializedRef = useRef<boolean>(false);

  // 初始化会话
  const initSession = useCallback(async () => {
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;

    const sessionId = getOrCreateSessionId();
    sessionIdRef.current = sessionId;

    const { source, referrerUrl, referrerDomain } = detectTrafficSource();
    const { utmSource, utmMedium, utmCampaign } = getUtmParams();
    const deviceInfo = getDeviceInfo();

    // 检查是否是新会话
    const { data: existingSession } = await supabase
      .from('visitor_sessions')
      .select('id')
      .eq('session_id', sessionId)
      .single();

    if (!existingSession) {
      // 创建新会话
      await supabase.from('visitor_sessions').insert({
        session_id: sessionId,
        traffic_source: source,
        referrer_url: referrerUrl,
        referrer_domain: referrerDomain,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        user_agent: deviceInfo.userAgent,
        device_type: deviceInfo.deviceType,
        browser: deviceInfo.browser,
        os: deviceInfo.os,
        screen_resolution: deviceInfo.screenResolution,
        pages_visited: [location.pathname],
      });
    }

    // 存储到localStorage供其他组件使用
    localStorage.setItem('current_visitor_session', sessionId);
  }, [location.pathname]);

  // 记录事件
  const trackEvent = useCallback(async (eventData: EventData) => {
    const sessionId = sessionIdRef.current || localStorage.getItem('visitor_session_id');
    if (!sessionId) return;

    await supabase.from('visitor_events').insert({
      session_id: sessionId,
      event_type: eventData.eventType,
      event_name: eventData.eventName,
      event_data: eventData.eventData || {},
      page_url: eventData.pageUrl || window.location.href,
      page_title: eventData.pageTitle || document.title,
      page_path: eventData.pagePath || location.pathname,
      element_id: eventData.elementId,
      element_class: eventData.elementClass,
      element_text: eventData.elementText?.substring(0, 100),
      element_tag: eventData.elementTag,
      product_id: eventData.productId,
      product_name: eventData.productName,
      product_category: eventData.productCategory,
      duration_seconds: eventData.durationSeconds,
      scroll_depth: eventData.scrollDepth,
    });

    // 更新会话最后活动时间
    await supabase
      .from('visitor_sessions')
      .update({ last_activity_at: new Date().toISOString() })
      .eq('session_id', sessionId);
  }, [location.pathname]);

  // 记录页面浏览
  const trackPageView = useCallback(async () => {
    await trackEvent({
      eventType: 'page_view',
      eventName: document.title,
      pageUrl: window.location.href,
      pageTitle: document.title,
      pagePath: location.pathname,
    });

    // 更新会话的页面列表
    const sessionId = sessionIdRef.current || localStorage.getItem('visitor_session_id');
    if (sessionId) {
      const { data } = await supabase
        .from('visitor_sessions')
        .select('pages_visited')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        const pages = data.pages_visited || [];
        if (!pages.includes(location.pathname)) {
          pages.push(location.pathname);
          await supabase
            .from('visitor_sessions')
            .update({ 
              pages_visited: pages,
              last_activity_at: new Date().toISOString(),
              total_page_views: pages.length,
            })
            .eq('session_id', sessionId);
        }
      }
    }
  }, [location.pathname, trackEvent]);

  // 记录点击事件
  const trackClick = useCallback((element: HTMLElement, additionalData?: Record<string, any>) => {
    trackEvent({
      eventType: 'click',
      eventName: element.innerText?.substring(0, 50) || element.tagName,
      elementId: element.id,
      elementClass: element.className,
      elementText: element.innerText?.substring(0, 100),
      elementTag: element.tagName.toLowerCase(),
      eventData: additionalData,
    });
  }, [trackEvent]);

  // 记录产品查看
  const trackProductView = useCallback((productId: string, productName: string, category?: string) => {
    trackEvent({
      eventType: 'product_view',
      eventName: productName,
      productId,
      productName,
      productCategory: category,
    });
  }, [trackEvent]);

  // 记录搜索
  const trackSearch = useCallback(async (keyword: string) => {
    await trackEvent({
      eventType: 'search',
      eventName: keyword,
      eventData: { keyword },
    });

    // 更新会话的搜索关键词
    const sessionId = sessionIdRef.current || localStorage.getItem('visitor_session_id');
    if (sessionId) {
      const { data } = await supabase
        .from('visitor_sessions')
        .select('search_keywords')
        .eq('session_id', sessionId)
        .single();

      if (data) {
        const keywords = data.search_keywords || [];
        if (!keywords.includes(keyword)) {
          keywords.push(keyword);
          await supabase
            .from('visitor_sessions')
            .update({ search_keywords: keywords })
            .eq('session_id', sessionId);
        }
      }
    }
  }, [trackEvent]);

  // 记录表单提交
  const trackFormSubmit = useCallback((formName: string, formData?: Record<string, any>) => {
    trackEvent({
      eventType: 'form_submit',
      eventName: formName,
      eventData: formData,
    });
  }, [trackEvent]);

  // 滚动深度追踪
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);
      
      if (scrollPercent > scrollDepthRef.current) {
        scrollDepthRef.current = scrollPercent;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 页面停留时间和退出追踪
  useEffect(() => {
    const handleBeforeUnload = async () => {
      const sessionId = sessionIdRef.current || localStorage.getItem('visitor_session_id');
      if (!sessionId) return;

      const duration = Math.round((Date.now() - pageStartTimeRef.current) / 1000);

      // 记录页面退出事件
      await trackEvent({
        eventType: 'page_exit',
        eventName: 'Page Exit',
        durationSeconds: duration,
        scrollDepth: scrollDepthRef.current,
      });

      // 更新会话退出页面
      await supabase
        .from('visitor_sessions')
        .update({
          exit_page: location.pathname,
          total_duration_seconds: duration,
          last_activity_at: new Date().toISOString(),
        })
        .eq('session_id', sessionId);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname, trackEvent]);

  // 初始化和页面切换追踪
  useEffect(() => {
    initSession();
  }, [initSession]);

  useEffect(() => {
    if (isInitializedRef.current) {
      pageStartTimeRef.current = Date.now();
      scrollDepthRef.current = 0;
      trackPageView();
    }
  }, [location.pathname, trackPageView]);

  // 全局点击追踪
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // 只追踪有意义的点击（按钮、链接、带有data-track属性的元素）
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-track')
      ) {
        const trackElement = target.closest('button') || target.closest('a') || target;
        if (trackElement instanceof HTMLElement) {
          trackClick(trackElement);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);
    return () => document.removeEventListener('click', handleGlobalClick);
  }, [trackClick]);

  return {
    sessionId: sessionIdRef.current,
    trackEvent,
    trackClick,
    trackProductView,
    trackSearch,
    trackFormSubmit,
  };
};

// 获取当前访客会话ID的工具函数
export const getVisitorSessionId = (): string | null => {
  return localStorage.getItem('visitor_session_id');
};

export type { VisitorSession, EventData };
