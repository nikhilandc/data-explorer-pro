import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts(ts => ts.map(t => t.id === id ? { ...t, leaving: true } : t));
    setTimeout(() => setToasts(ts => ts.filter(t => t.id !== id)), 350);
  }, []);

  const toast = useCallback(({ type = 'success', title, message, duration = 3500 }) => {
    const id = Date.now() + Math.random();
    setToasts(ts => [...ts.slice(-4), { id, type, title, message, leaving: false }]);
    timers.current[id] = setTimeout(() => dismiss(id), duration);
    return id;
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none" style={{ maxWidth: '340px' }}>
        {toasts.map(t => (
          <Toast key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ICONS = {
  success: (
    <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
  cart: (
    <svg className="w-5 h-5 text-obsidian-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
};

const ACCENTS = {
  success: 'border-l-emerald-500',
  error:   'border-l-rose-500',
  info:    'border-l-cyan-500',
  cart:    'border-l-obsidian-400',
};

const Toast = ({ toast: t, onDismiss }) => (
  <div
    className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-2xl
                border-l-4 ${ACCENTS[t.type] || ACCENTS.success}
                shadow-toast backdrop-blur-xl
                bg-obsidian-950/90 dark:bg-obsidian-950/90
                border border-white/10 w-full
                ${t.leaving ? 'animate-toast-out' : 'animate-toast-in'}`}
    style={{ width: '320px' }}
  >
    <div className="flex-shrink-0 mt-0.5">{ICONS[t.type] || ICONS.success}</div>
    <div className="flex-1 min-w-0">
      {t.title && <p className="text-sm font-semibold text-white leading-tight">{t.title}</p>}
      {t.message && <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{t.message}</p>}
    </div>
    <button onClick={onDismiss} className="flex-shrink-0 text-slate-600 hover:text-slate-300 transition-colors mt-0.5">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
);

export const useToast = () => useContext(ToastContext);
