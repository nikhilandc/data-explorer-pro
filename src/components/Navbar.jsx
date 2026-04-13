import { useState, useEffect, useRef } from 'react';
import { useCart }  from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth }  from '../context/AuthContext';
import { ROUTES }   from '../hooks/useRouter.jsx';

const Navbar = ({ onCartOpen, navigate }) => {
  const { totalItems }   = useCart();
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled]   = useState(false);
  const [userMenu, setUserMenu]   = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setUserMenu(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const navLink = (label, route) => (
    <button onClick={() => navigate(route)}
      className={`text-sm font-medium transition-colors font-body
                   ${dark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}>
      {label}
    </button>
  );

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300
                      ${scrolled
                        ? dark  ? 'bg-obsidian-950/90 backdrop-blur-xl border-b border-white/8 shadow-lg'
                                : 'bg-white/90 backdrop-blur-xl border-b border-black/8 shadow-md'
                        : 'bg-transparent'
                      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Logo */}
          <button onClick={() => navigate(ROUTES.HOME)} className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-obsidian-400 to-obsidian-700 flex items-center justify-center shadow-glow-sm">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/>
              </svg>
            </div>
            <span className={`font-display text-lg font-black hidden sm:block ${dark ? 'text-white' : 'text-slate-900'}`}>
              Data<span className="gradient-text">Explorer</span>
            </span>
          </button>

          {/* Center links */}
          <div className="hidden md:flex items-center gap-6">
            {navLink('Store', ROUTES.HOME)}
            {navLink('About', ROUTES.ABOUT)}
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Theme */}
            <button onClick={toggle}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all border
                           ${dark ? 'bg-white/8 hover:bg-white/15 text-amber-400 border-white/8' : 'bg-black/5 hover:bg-black/10 text-obsidian-600 border-black/8'}`}>
              {dark
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>
                : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"/></svg>
              }
            </button>

            {/* Cart */}
            <button onClick={onCartOpen}
              className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all border
                           ${dark ? 'bg-white/8 hover:bg-white/15 text-slate-300 hover:text-white border-white/8' : 'bg-black/5 hover:bg-black/10 text-slate-600 border-black/8'}`}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-aurora-pink text-white
                                  text-[9px] font-black flex items-center justify-center border border-obsidian-950 animate-bounce-in">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* User menu / Auth */}
            {user ? (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setUserMenu(m => !m)}
                  className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl transition-all border
                              hover:scale-105 font-body
                              ${dark ? 'bg-white/5 border-white/8 hover:bg-white/10' : 'bg-black/5 border-black/8 hover:bg-black/8'}">
                  <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-lg object-cover"/>
                  <span className={`text-xs font-semibold hidden sm:block ${dark ? 'text-slate-300' : 'text-slate-700'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                  <svg className={`w-3.5 h-3.5 transition-transform ${userMenu ? 'rotate-180' : ''} ${dark ? 'text-slate-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                  </svg>
                </button>

                {userMenu && (
                  <div className={`absolute right-0 top-full mt-2 w-52 rounded-2xl border shadow-2xl overflow-hidden z-50 animate-scale-in
                                    ${dark ? 'bg-obsidian-950 border-white/10' : 'bg-white border-black/10'}`}>
                    <div className={`px-4 py-3 border-b ${dark ? 'border-white/5' : 'border-black/5'}`}>
                      <p className={`text-xs font-semibold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>{user.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono truncate">{user.email}</p>
                    </div>
                    {[
                      { label: 'My Profile',     icon: '👤', route: ROUTES.PROFILE },
                      { label: 'Order History',  icon: '📦', route: ROUTES.ORDERS  },
                      { label: 'Settings',       icon: '⚙️', route: ROUTES.SETTINGS },
                    ].map(item => (
                      <button key={item.route}
                        onClick={() => { navigate(item.route); setUserMenu(false); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors font-body
                                     ${dark ? 'text-slate-400 hover:bg-white/5 hover:text-white' : 'text-slate-600 hover:bg-black/5 hover:text-slate-900'}`}>
                        <span>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <div className={`border-t ${dark ? 'border-white/5' : 'border-black/5'}`}>
                      <button onClick={() => { logout(); setUserMenu(false); navigate(ROUTES.HOME); }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors font-body
                                     text-rose-400 hover:bg-rose-500/10`}>
                        <span>🚪</span>Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={() => navigate(ROUTES.LOGIN)}
                  className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all border font-body
                               ${dark ? 'border-white/8 text-slate-400 hover:text-white hover:bg-white/5' : 'border-black/8 text-slate-600 hover:text-slate-900 hover:bg-black/5'}`}>
                  Sign In
                </button>
                <button onClick={() => navigate(ROUTES.SIGNUP)}
                  className="text-xs font-semibold px-3 py-2 rounded-xl bg-obsidian-600 hover:bg-obsidian-500 text-white transition-all shadow-glow-sm font-body">
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;