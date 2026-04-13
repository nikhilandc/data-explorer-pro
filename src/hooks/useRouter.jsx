import { useState, useCallback } from 'react';

// Lightweight hash-based router — no dependencies needed
export const ROUTES = {
  HOME:    'home',
  LOGIN:   'login',
  SIGNUP:  'signup',
  ABOUT:   'about',
  PROFILE: 'profile',
  ORDERS:  'orders',
  SETTINGS:'settings',
};

export const useRouter = () => {
  const [page, setPage] = useState(() => {
    const h = window.location.hash.replace('#', '') || ROUTES.HOME;
    return Object.values(ROUTES).includes(h) ? h : ROUTES.HOME;
  });

  const navigate = useCallback((route) => {
    window.location.hash = route;
    setPage(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return { page, navigate };
};