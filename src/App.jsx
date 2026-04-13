import { useState, useEffect, useCallback } from 'react';
import Navbar          from './components/Navbar';
import Hero            from './components/Hero';
import SearchAndFilter from './components/SearchAndFilter';
import ProductCard     from './components/ProductCard';
import SkeletonCard    from './components/SkeletonCard';
import Modal           from './components/Modal';
import CartDrawer      from './components/CartDrawer';
import LoginPage       from './pages/LoginPage';
import SignupPage      from './pages/SignupPage';
import AboutPage       from './pages/AboutPage';
import DashboardPage   from './pages/DashboardPage';
import { useTheme }    from './context/ThemeContext';
import { useRouter, ROUTES } from './hooks/useRouter.jsx';

const API = 'https://fakestoreapi.com/products';

// Home page content
const HomePage = ({ navigate, onCartOpen }) => {
  const { dark } = useTheme();
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search,   setSearch]   = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy,   setSortBy]   = useState('default');
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(null);
  const [selected, setSelected] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const r = await fetch(API);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      setProducts(await r.json());
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  useEffect(() => {
    let r = [...products];
    if (category !== 'all') r = r.filter(p => p.category === category);
    if (search.trim())      r = r.filter(p => p.title.toLowerCase().includes(search.toLowerCase().trim()));
    if (sortBy === 'price-asc')  r.sort((a,b) => a.price - b.price);
    if (sortBy === 'price-desc') r.sort((a,b) => b.price - a.price);
    if (sortBy === 'rating')     r.sort((a,b) => b.rating.rate - a.rating.rate);
    if (sortBy === 'name')       r.sort((a,b) => a.title.localeCompare(b.title));
    setFiltered(r);
  }, [products, search, category, sortBy]);

  return (
    <>
      <Hero total={products.length} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className={`h-px mb-10 bg-gradient-to-r from-transparent via-current to-transparent ${dark ? 'text-white/10' : 'text-black/10'}`} />
        {!error && (
          <div className="mb-10">
            <SearchAndFilter search={search} setSearch={setSearch} category={category} setCategory={setCategory}
              sortBy={sortBy} setSortBy={setSortBy} resultCount={filtered.length} total={products.length} />
          </div>
        )}
        {error && (
          <div className={`flex flex-col items-center justify-center py-32 text-center rounded-3xl border mx-auto max-w-md
                            ${dark ? 'bg-rose-500/5 border-rose-500/20' : 'bg-rose-50 border-rose-200'}`}>
            <div className="text-6xl mb-5">⚠️</div>
            <h3 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>Failed to Load</h3>
            <p className="text-slate-500 text-sm mb-8">{error}</p>
            <button onClick={fetchProducts} className="px-6 py-3 rounded-xl bg-obsidian-600 hover:bg-obsidian-500 text-white font-semibold text-sm shadow-glow-sm transition-all font-body flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
              Retry
            </button>
          </div>
        )}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_,i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-6 ${dark ? 'bg-white/5 border border-white/8' : 'bg-black/5 border border-black/8'}`}>🔍</div>
            <h3 className={`font-display text-2xl font-bold mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>No Results</h3>
            <p className="text-slate-500 text-sm mb-8">Try different keywords or reset your filters.</p>
            <button onClick={() => { setSearch(''); setCategory('all'); setSortBy('default'); }}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all font-body
                           ${dark ? 'border-white/10 text-slate-400 hover:bg-white/5 hover:text-white' : 'border-black/10 text-slate-600 hover:bg-black/5'}`}>
              Reset Filters
            </button>
          </div>
        )}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filtered.map((p, i) => <ProductCard key={p.id} product={p} onClick={setSelected} index={i} />)}
            </div>
            <div className="text-center mt-12 text-xs text-slate-600 font-mono">— {filtered.length} of {products.length} products shown —</div>
          </>
        )}
      </main>
      {selected && <Modal product={selected} onClose={() => setSelected(null)} />}
    </>
  );
};

export default function App() {
  const { dark }              = useTheme();
  const { page, navigate }    = useRouter();
  const [cartOpen, setCartOpen] = useState(false);

  const bg  = dark ? 'bg-obsidian-950' : 'bg-cream-50';
  const txt = dark ? 'text-slate-100'  : 'text-slate-900';

  // Auth pages don't show the main Navbar/Footer
  const isAuthPage = [ROUTES.LOGIN, ROUTES.SIGNUP].includes(page);

  return (
    <div className={`min-h-screen ${bg} ${txt} transition-colors duration-300`}>
      {!isAuthPage && <Navbar onCartOpen={() => setCartOpen(true)} navigate={navigate} />}

      {page === ROUTES.HOME     && <HomePage navigate={navigate} onCartOpen={() => setCartOpen(true)} />}
      {page === ROUTES.LOGIN    && <LoginPage navigate={navigate} />}
      {page === ROUTES.SIGNUP   && <SignupPage navigate={navigate} />}
      {page === ROUTES.ABOUT    && <AboutPage navigate={navigate} />}
      {(page === ROUTES.PROFILE || page === ROUTES.ORDERS || page === ROUTES.SETTINGS) && (
        <DashboardPage navigate={navigate} initialTab={page === ROUTES.ORDERS ? 'orders' : page === ROUTES.SETTINGS ? 'settings' : 'profile'} />
      )}

      {!isAuthPage && (
        <footer className={`border-t py-10 ${dark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-obsidian-400 to-obsidian-700 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"/></svg>
              </div>
              <span className={`text-xs font-mono ${dark ? 'text-slate-600' : 'text-slate-500'}`}>DataExplorer Pro · React 18 + Tailwind CSS 3</span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <button onClick={() => navigate(ROUTES.ABOUT)} className={`transition-colors ${dark ? 'text-slate-700 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}>About</button>
              <button onClick={() => navigate(ROUTES.LOGIN)} className={`transition-colors ${dark ? 'text-slate-700 hover:text-slate-400' : 'text-slate-400 hover:text-slate-600'}`}>Login</button>
            </div>
          </div>
        </footer>
      )}

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}