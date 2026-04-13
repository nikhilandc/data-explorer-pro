import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { ROUTES } from '../hooks/useRouter.jsx';

const InputField = ({ label, type = 'text', value, onChange, placeholder, icon, dark, error, hint }) => {
  const [show, setShow] = useState(false);
  const isPass = type === 'password';
  return (
    <div className="space-y-1.5">
      <label className={`text-xs font-semibold uppercase tracking-widest font-mono ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">{icon}</span>
        <input
          type={isPass && show ? 'text' : type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl pl-11 ${isPass ? 'pr-11' : 'pr-4'} py-3.5 text-sm outline-none transition-all font-body
            ${dark
              ? `bg-white/5 border ${error ? 'border-rose-500/60' : 'border-white/10'} focus:border-obsidian-500/70 focus:bg-obsidian-500/5 text-slate-200 placeholder-slate-600`
              : `bg-black/[0.04] border ${error ? 'border-rose-400' : 'border-black/10'} focus:border-obsidian-400/70 text-slate-800 placeholder-slate-400`
            }`}
        />
        {isPass && (
          <button type="button" onClick={() => setShow(s => !s)}
            className={`absolute right-4 top-1/2 -translate-y-1/2 ${dark ? 'text-slate-600 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}>
            {show
              ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/></svg>
              : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            }
          </button>
        )}
      </div>
      {error && <p className="text-xs text-rose-400 font-mono">{error}</p>}
      {hint && !error && <p className={`text-xs font-mono ${dark ? 'text-slate-600' : 'text-slate-400'}`}>{hint}</p>}
    </div>
  );
};

const PasswordStrength = ({ password, dark }) => {
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].filter(r => r.test(password)).length;
  const labels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', 'bg-rose-500', 'bg-amber-500', 'bg-yellow-400', 'bg-emerald-500'];
  if (!password) return null;
  return (
    <div className="space-y-1.5">
      <div className="flex gap-1">
        {[1,2,3,4].map(i => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= score ? colors[score] : dark ? 'bg-white/10' : 'bg-black/10'}`} />
        ))}
      </div>
      <p className={`text-xs font-mono ${score <= 1 ? 'text-rose-400' : score === 2 ? 'text-amber-400' : score === 3 ? 'text-yellow-400' : 'text-emerald-400'}`}>
        {labels[score]} password
      </p>
    </div>
  );
};

const SignupPage = ({ navigate }) => {
  const { signup } = useAuth();
  const { dark }   = useTheme();
  const { toast }  = useToast();

  const [form, setForm]     = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Full name is required';
    if (!form.email)          e.email   = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email';
    if (!form.password)       e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    if (!agreed)              e.agreed  = 'You must agree to the terms';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = signup({ name: form.name.trim(), email: form.email, password: form.password });
    setLoading(false);
    if (res.ok) {
      toast({ type: 'success', title: 'Account created! 🎉', message: `Welcome to DataExplorer, ${form.name.split(' ')[0]}!` });
      navigate(ROUTES.HOME);
    } else {
      setErrors({ submit: res.error });
    }
  };

  const ic = `w-4 h-4 ${dark ? 'text-slate-600' : 'text-slate-400'}`;

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-obsidian-950' : 'bg-cream-50'}`}>

      {/* Left decorative */}
      <div className="hidden lg:flex lg:w-5/12 relative overflow-hidden flex-col justify-between p-16"
           style={{ background: 'linear-gradient(135deg, #0f0f1e 0%, #1e1040 50%, #0b0b18 100%)' }}>
        <div className="absolute inset-0 bg-grid-dark bg-grid opacity-100" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-aurora-violet/10 blur-[100px] animate-float" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-obsidian-400 to-obsidian-700 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </div>
            <span className="font-display text-xl font-black text-white">DataExplorer</span>
          </div>

          <h2 className="font-display text-3xl font-black text-white mb-4 leading-tight">
            Join thousands of<br /><span className="gradient-text">happy shoppers</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Create your free account and start exploring our curated product catalog today.
          </p>
        </div>

        {/* Testimonials */}
        <div className="relative z-10 space-y-4">
          {[
            { text: '"The best product explorer I have ever used. Clean, fast, beautiful."', name: 'Sarah M.', role: 'Designer' },
            { text: '"Love the dark mode and how smooth everything feels. Impressive work."', name: 'James K.', role: 'Developer' },
          ].map(t => (
            <div key={t.name} className="p-4 rounded-2xl bg-white/5 border border-white/8 backdrop-blur-sm">
              <p className="text-slate-300 text-xs leading-relaxed mb-3 italic">{t.text}</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-obsidian-600 flex items-center justify-center text-[10px] text-white font-bold">{t.name[0]}</div>
                <span className="text-xs text-slate-400">{t.name} · <span className="text-slate-600">{t.role}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className={`flex-1 flex items-center justify-center px-6 py-12 lg:py-0 overflow-y-auto
                        ${dark ? 'bg-obsidian-950' : 'bg-cream-50'}`}>
        <div className="w-full max-w-md animate-fade-up py-8">

          <div className="mb-8">
            <h1 className={`font-display text-3xl md:text-4xl font-black mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Create account
            </h1>
            <p className={`text-sm ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
              Already have one?{' '}
              <button onClick={() => navigate(ROUTES.LOGIN)}
                className="text-obsidian-400 hover:text-obsidian-300 font-semibold underline underline-offset-2 transition-colors">
                Sign in
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Full Name" value={form.name} onChange={set('name')} placeholder="John Doe" dark={dark} error={errors.name}
              icon={<svg className={ic} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>}
            />
            <InputField label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" dark={dark} error={errors.email}
              icon={<svg className={ic} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>}
            />
            <div className="space-y-2">
              <InputField label="Password" type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" dark={dark} error={errors.password}
                icon={<svg className={ic} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>}
              />
              <PasswordStrength password={form.password} dark={dark} />
            </div>
            <InputField label="Confirm Password" type="password" value={form.confirm} onChange={set('confirm')} placeholder="Repeat password" dark={dark} error={errors.confirm}
              icon={<svg className={ic} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>}
            />

            {/* Terms */}
            <div className="flex items-start gap-3 pt-1">
              <button type="button" onClick={() => setAgreed(a => !a)}
                className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                             ${agreed
                               ? 'bg-obsidian-600 border-obsidian-500'
                               : dark ? 'border-white/20 bg-transparent' : 'border-black/20 bg-transparent'
                             } ${errors.agreed ? 'border-rose-500' : ''}`}>
                {agreed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>}
              </button>
              <p className={`text-xs leading-relaxed ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
                I agree to the{' '}
                <span className="text-obsidian-400 cursor-pointer underline underline-offset-2">Terms of Service</span>
                {' '}and{' '}
                <span className="text-obsidian-400 cursor-pointer underline underline-offset-2">Privacy Policy</span>
              </p>
            </div>
            {errors.agreed && <p className="text-xs text-rose-400 font-mono -mt-2">{errors.agreed}</p>}

            {errors.submit && (
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <svg className="w-4 h-4 text-rose-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
                <p className="text-sm text-rose-400">{errors.submit}</p>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white font-body
                          bg-gradient-to-r from-obsidian-600 to-obsidian-500
                          hover:from-obsidian-500 hover:to-obsidian-400
                          shadow-glow-sm hover:shadow-glow-md
                          transition-all duration-200 hover:scale-[1.02] active:scale-95
                          disabled:opacity-60 disabled:cursor-not-allowed
                          flex items-center justify-center gap-2">
              {loading
                ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Creating account…</>
                : <>Create Account <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg></>
              }
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => navigate(ROUTES.HOME)}
              className={`text-xs font-mono transition-colors ${dark ? 'text-slate-700 hover:text-slate-500' : 'text-slate-400 hover:text-slate-600'}`}>
              ← Back to Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
