import { useNavigate, NavigateOptions } from 'react-router-dom';
import { useCallback } from 'react';
import { useLangPath } from '@/hooks/useLangPath';

/**
 * A wrapper around react-router-dom's useNavigate that automatically
 * applies language prefix to string paths.
 * Use this instead of useNavigate() in non-admin pages.
 */
export const useLangNavigate = () => {
  const navigate = useNavigate();
  const langPath = useLangPath();

  return useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof to === 'number') {
        navigate(to);
      } else {
        navigate(langPath(to), options);
      }
    },
    [navigate, langPath]
  );
};
