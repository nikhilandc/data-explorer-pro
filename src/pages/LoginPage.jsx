import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../hooks/useRouter.jsx';

const InputField = ({ label, type = 'text', value, onChange, placeholder, icon, dark, error }) => {
  const [show, setShow] = useState(false);
  const isPass = type === 'password';
  return (
    <div className="space-y-1.5">
      <label className={`text-xs font-semibold uppercase tracking-widest font-mono ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {label}
      </label>
      <div className="relative group">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          {icon}
        </span>
        <input
          type={isPass && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl pl-11 ${isPass ? 'pr-11' : 'pr-4'} py-3.5 text-sm outline-none transition-all duration-200 font-body
            ${dark
              ? `bg-white/5 border ${error ? 'border-rose-500/60' : 'border-white/10'} focus:border-obsidian-500/70 focus:bg-obsidian-500/5 text-slate-200 placeholder-slate-600`
              : `bg-black/[0.04] border ${error ? 'border-rose-400' : 'border-black/10'} focus:border-obsidian-400/70 text-slate-800 placeholder-slate-400`
            }`}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${dark ? 'text-slate-600 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}>
            {show
              ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            }
          </button>
        )}
      </div>
      {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
    </div>
  );
};

const LoginPage = ({ navigate }) => {
  const { login } = useAuth();
  const { dark }  = useTheme();
  const { toast } = useToast();

  const [form, setForm]     = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.email)    e.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const res = login(form);
    setLoading(false);
    if (res.ok) {
      toast({ type: 'success', title: 'Welcome back! 👋', message: 'You are now signed in.' });
      navigate(ROUTES.HOME);
    } else {
      setErrors({ submit: res.error });
    }
  };

  const iconCls = `w-4 h-4 ${dark ? 'text-slate-600' : 'text-slate-400'}`;

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-obsidian-950' : 'bg-cream-50'}`}>

      {/* Left decorative panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16"
           style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a3e 50%, #0b0b18 100%)' }}>
        {/* Animated blobs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-obsidian-600/20 blur-[80px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 rounded-full bg-aurora-violet/15 blur-[60px] animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-100" />

        <div className="relative z-10 text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-obsidian-400 to-obsidian-700
                          flex items-center justify-center mx-auto mb-8 shadow-glow-md animate-pulse-glow">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
            </svg>
          </div>
          <h2 className="font-display text-4xl font-black text-white mb-4 tracking-tight">
            Data<span className="gradient-text">Explorer</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed max-w-xs">
            Your premium product discovery platform. Explore, compare, and shop with confidence.
          </p>

          {/* Feature list */}
          <div className="mt-10 space-y-4 text-left">
            {[
              { icon: '🛒', text: 'Smart cart with persistence' },
              { icon: '🔍', text: 'Real-time search & filters' },
              { icon: '🌙', text: 'Dark & light mode support' },
              { icon: '📦', text: 'Order history & tracking' },
            ].map(f => (
              <div key={f.text} className="flex items-center gap-3">
                <span className="text-xl">{f.icon}</span>
                <span className="text-slate-300 text-sm">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badge */}
        <div className="absolute bottom-8 left-0 right-0 text-center">
          <span className="text-xs text-slate-700 font-mono">Trusted · Secure · Beautiful</span>
        </div>
      </div>

      {/* Right form panel */}
      <div className={`flex-1 flex items-center justify-center px-6 py-16 lg:py-0
                        ${dark ? 'bg-obsidian-950' : 'bg-cream-50'}`}>
        <div className="w-full max-w-md animate-fade-up">

          {/* Logo (mobile) */}
          <div className="lg:hidden flex items-center gap-3 mb-10">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-obsidian-400 to-obsidian-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </div>
            <span className={`font-display text-xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>
              Data<span className="gradient-text">Explorer</span>
            </span>
          </div>

          <div className="mb-8">
            <h1 className={`font-display text-3xl md:text-4xl font-black mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Welcome back
            </h1>
            <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
              Don't have an account?{' '}
              <button onClick={() => navigate(ROUTES.SIGNUP)}
                className="text-obsidian-400 hover:text-obsidian-300 font-semibold underline underline-offset-2 transition-colors">
                Sign up free
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField label="Email address" type="email" value={form.email} onChange={set('email')}
              placeholder="you@example.com" dark={dark} error={errors.email}
              icon={<svg className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>}
            />
            <InputField label="Password" type="password" value={form.password} onChange={set('password')}
              placeholder="Your password" dark={dark} error={errors.password}
              icon={<svg className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>}
            />

            {errors.submit && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>
                </svg>
                <p className="text-sm text-rose-400">{errors.submit}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white font-body
                          bg-gradient-to-r from-obsidian-600 to-obsidian-500
                          hover:from-obsidian-500 hover:to-obsidian-400
                          shadow-glow-sm hover:shadow-glow-md
                          transition-all duration-200 hover:scale-[1.02] active:scale-95
                          disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                          flex items-center justify-center gap-2">
              {loading
                ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Signing in…</>
                : <>Sign In <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg></>
              }
            </button>

            {/* Demo hint */}
            <div className={`text-center text-xs font-mono px-4 py-3 rounded-xl border ${dark ? 'text-slate-600 border-white/5 bg-white/[0.02]' : 'text-slate-500 border-black/5 bg-black/[0.02]'}`}>
              💡 Demo: Register first, then login with your credentials
            </div>
          </form>

          <div className="mt-8 text-center">
            <button onClick={() => navigate(ROUTES.HOME)}
              className={`text-xs transition-colors font-mono ${dark ? 'text-slate-700 hover:text-slate-500' : 'text-slate-400 hover:text-slate-600'}`}>
              ← Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
