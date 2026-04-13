import { useState } from 'react';
import { useAuth }  from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { useCart }  from '../context/CartContext';
import { ROUTES }   from '../hooks/useRouter.jsx';

/* ── Sidebar nav items ── */
const NAV = [
  { id: 'profile',  label: 'My Profile',    icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg> },
  { id: 'orders',   label: 'Order History', icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg> },
  { id: 'settings', label: 'Settings',      icon: (c) => <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
];

/* ── Profile Tab ── */
const ProfileTab = ({ dark }) => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: user?.name || '', phone: user?.phone || '', address: user?.address || '' });
  const [saving, setSaving] = useState(false);
  const set = k => v => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    const res = updateProfile(form);
    setSaving(false);
    if (res.ok) toast({ type: 'success', title: 'Profile updated!', message: 'Your changes have been saved.' });
    else toast({ type: 'error', title: 'Error', message: res.error });
  };

  const field = (label, key, placeholder, type = 'text') => (
    <div className="space-y-1.5">
      <label className={`text-xs font-semibold uppercase tracking-widest font-mono ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{label}</label>
      <input type={type} value={form[key]} onChange={e => set(key)(e.target.value)} placeholder={placeholder}
        className={`w-full rounded-xl px-4 py-3 text-sm outline-none transition-all font-body
          ${dark ? 'bg-white/5 border border-white/10 focus:border-obsidian-500/60 text-slate-200 placeholder-slate-600'
                 : 'bg-black/[0.04] border border-black/10 focus:border-obsidian-400/60 text-slate-800 placeholder-slate-400'}`}
      />
    </div>
  );

  return (
    <div className="space-y-8 max-w-xl">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <img src={user?.avatar} alt={user?.name} className="w-20 h-20 rounded-2xl object-cover ring-2 ring-obsidian-500/40" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-obsidian-950 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
          </div>
        </div>
        <div>
          <h3 className={`font-display text-xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>{user?.name}</h3>
          <p className="text-sm text-slate-500 font-mono">{user?.email}</p>
          <p className="text-xs text-slate-600 mt-1">
            Member since {new Date(user?.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className={`h-px ${dark ? 'bg-white/5' : 'bg-black/5'}`} />

      <div className="space-y-4">
        <h4 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-900'}`}>Personal Information</h4>
        {field('Full Name', 'name', 'Your full name')}
        <div className={`px-4 py-3 rounded-xl border text-sm font-body ${dark ? 'bg-white/[0.02] border-white/5 text-slate-600' : 'bg-black/[0.02] border-black/5 text-slate-400'}`}>
          {user?.email} <span className="text-xs ml-2 font-mono">(email cannot be changed)</span>
        </div>
        {field('Phone Number', 'phone', '+1 (555) 000-0000', 'tel')}
        {field('Shipping Address', 'address', '123 Main St, City, Country')}
      </div>

      <button onClick={save} disabled={saving}
        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-obsidian-600 to-obsidian-500
                    text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md
                    transition-all hover:scale-105 active:scale-95 disabled:opacity-60 font-body">
        {saving
          ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving…</>
          : <><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>Save Changes</>
        }
      </button>
    </div>
  );
};

/* ── Orders Tab ── */
const OrdersTab = ({ dark, navigate }) => {
  const { userOrders } = useAuth();
  const { addToCart }  = useCart();
  const { toast }      = useToast();

  if (userOrders.length === 0) return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5
                        ${dark ? 'bg-white/5 border border-white/8' : 'bg-black/5 border border-black/8'}`}>📭</div>
      <h3 className={`font-display text-xl font-black mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>No orders yet</h3>
      <p className="text-sm text-slate-500 mb-6">Start exploring and add items to your cart!</p>
      <button onClick={() => navigate(ROUTES.HOME)}
        className="px-5 py-2.5 rounded-xl bg-obsidian-600 hover:bg-obsidian-500 text-white text-sm font-semibold transition-all font-body">
        Browse Products
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
      <h4 className={`font-semibold text-sm ${dark ? 'text-white' : 'text-slate-900'}`}>{userOrders.length} order{userOrders.length !== 1 ? 's' : ''} placed</h4>
      {userOrders.map(order => (
        <div key={order.id} className={`rounded-2xl border overflow-hidden ${dark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8 shadow-sm'}`}>
          {/* Order header */}
          <div className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b ${dark ? 'border-white/5' : 'border-black/5'}`}>
            <div>
              <p className={`text-xs font-mono font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{order.id}</p>
              <p className="text-xs text-slate-500 mt-0.5">{new Date(order.placedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 font-mono">
                ✓ {order.status}
              </span>
              <span className={`font-display text-lg font-black ${dark ? 'text-white' : 'text-slate-900'}`}>${order.total.toFixed(2)}</span>
            </div>
          </div>
          {/* Items */}
          <div className="px-5 py-4 space-y-3">
            {order.items.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white flex-shrink-0 flex items-center justify-center overflow-hidden p-1">
                  <img src={item.image} alt={item.title} className="w-full h-full object-contain"/>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium line-clamp-1 ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{item.title}</p>
                  <p className="text-xs text-slate-500 font-mono">×{item.qty} · ${(item.price * item.qty).toFixed(2)}</p>
                </div>
                <button
                  onClick={() => { addToCart(item); toast({ type: 'cart', title: 'Added to cart!', message: item.title.slice(0,35) + '…' }); }}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all font-body font-medium
                               ${dark ? 'border-white/10 text-slate-500 hover:text-white hover:border-obsidian-500/50 hover:bg-obsidian-600/30'
                                      : 'border-black/10 text-slate-500 hover:text-slate-900 hover:border-obsidian-300 hover:bg-obsidian-50'}`}>
                  Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/* ── Settings Tab ── */
const SettingsTab = ({ dark, navigate }) => {
  const { logout, user } = useAuth();
  const { clearCart }    = useCart();
  const { toggle }       = useTheme();
  const { toast }        = useToast();

  const handleLogout = () => {
    logout();
    clearCart();
    toast({ type: 'info', title: 'Signed out', message: 'You have been logged out.' });
    navigate(ROUTES.HOME);
  };

  const rowCls = `flex items-center justify-between px-5 py-4 rounded-2xl border
    ${dark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8 shadow-sm'}`;

  return (
    <div className="space-y-4 max-w-lg">
      <h4 className={`font-semibold text-sm mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>Preferences & Account</h4>

      {/* Theme */}
      <div className={rowCls}>
        <div className="flex items-center gap-3">
          <span className="text-xl">{dark ? '🌙' : '☀️'}</span>
          <div>
            <p className={`text-sm font-medium ${dark ? 'text-slate-200' : 'text-slate-800'}`}>Appearance</p>
            <p className="text-xs text-slate-500">{dark ? 'Dark mode is on' : 'Light mode is on'}</p>
          </div>
        </div>
        <button onClick={toggle}
          className={`relative w-12 h-6 rounded-full transition-all duration-300
                       ${dark ? 'bg-obsidian-600' : 'bg-slate-200'}`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-300
                            ${dark ? 'left-7' : 'left-1'}`} />
        </button>
      </div>

      {/* Notifications */}
      <div className={rowCls}>
        <div className="flex items-center gap-3">
          <span className="text-xl">🔔</span>
          <div>
            <p className={`text-sm font-medium ${dark ? 'text-slate-200' : 'text-slate-800'}`}>Notifications</p>
            <p className="text-xs text-slate-500">Order updates and promotions</p>
          </div>
        </div>
        <button className={`relative w-12 h-6 rounded-full transition-all bg-obsidian-600`}>
          <div className="absolute top-1 left-7 w-4 h-4 rounded-full bg-white shadow" />
        </button>
      </div>

      {/* Account info */}
      <div className={`${rowCls} flex-col items-start gap-2`}>
        <p className={`text-xs font-mono uppercase tracking-widest ${dark ? 'text-slate-600' : 'text-slate-400'}`}>Account Info</p>
        <div className="space-y-1 w-full">
          {[
            { label: 'User ID', value: `#${user?.id}` },
            { label: 'Email',   value: user?.email },
            { label: 'Member',  value: new Date(user?.joinedAt).toLocaleDateString() },
          ].map(r => (
            <div key={r.label} className="flex justify-between items-center">
              <span className="text-xs text-slate-500">{r.label}</span>
              <span className={`text-xs font-mono ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{r.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`h-px my-2 ${dark ? 'bg-white/5' : 'bg-black/5'}`} />

      {/* Danger zone */}
      <div>
        <p className="text-xs font-mono uppercase tracking-widest text-rose-500/60 mb-3">Danger Zone</p>
        <button onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                      bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40
                      text-rose-400 hover:text-rose-300 text-sm font-semibold transition-all font-body">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
          </svg>
          Sign Out of Account
        </button>
      </div>
    </div>
  );
};

/* ── Dashboard Shell ── */
const DashboardPage = ({ navigate, initialTab }) => {
  const { user, logout } = useAuth();
  const { dark }         = useTheme();
  const { clearCart }    = useCart();
  const { toast }        = useToast();
  const [tab, setTab]    = useState(initialTab || 'profile');
  const [mobileMenu, setMobileMenu] = useState(false);

  if (!user) {
    navigate(ROUTES.LOGIN);
    return null;
  }

  const tabTitle  = { profile: 'My Profile', orders: 'Order History', settings: 'Settings' };
  const TABS_MAP  = { profile: <ProfileTab dark={dark} />, orders: <OrdersTab dark={dark} navigate={navigate} />, settings: <SettingsTab dark={dark} navigate={navigate} /> };

  return (
    <div className={`min-h-screen pt-16 ${dark ? 'bg-obsidian-950' : 'bg-cream-50'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* Page header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-obsidian-500/30" />
            <div>
              <h1 className={`font-display text-2xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>
                Hey, {user.name.split(' ')[0]} 👋
              </h1>
              <p className="text-xs text-slate-500 font-mono">{user.email}</p>
            </div>
          </div>
          <button onClick={() => navigate(ROUTES.HOME)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm border transition-all font-body
                         ${dark ? 'border-white/10 text-slate-400 hover:bg-white/5 hover:text-white' : 'border-black/10 text-slate-600 hover:bg-black/5 hover:text-slate-900'}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
            Back to Store
          </button>
        </div>

        <div className="flex gap-6 flex-col md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-56 flex-shrink-0">
            <nav className={`rounded-2xl border overflow-hidden ${dark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8 shadow-sm'}`}>
              {NAV.map(n => (
                <button key={n.id} onClick={() => setTab(n.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-left transition-all font-body
                               ${tab === n.id
                                 ? dark ? 'bg-obsidian-600/30 text-white border-r-2 border-obsidian-500'
                                        : 'bg-obsidian-50 text-obsidian-700 border-r-2 border-obsidian-500'
                                 : dark ? 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                        : 'text-slate-500 hover:bg-black/5 hover:text-slate-700'
                               }`}>
                  {n.icon(`w-4 h-4 ${tab === n.id ? (dark ? 'text-obsidian-400' : 'text-obsidian-600') : ''}`)}
                  {n.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className={`flex-1 min-w-0 rounded-2xl border p-6 md:p-8
                             ${dark ? 'bg-white/[0.03] border-white/8' : 'bg-white border-black/8 shadow-sm'}`}>
            <h2 className={`font-display text-xl font-black mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              {tabTitle[tab]}
            </h2>
            {TABS_MAP[tab]}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
