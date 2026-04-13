import { useTheme } from '../context/ThemeContext';

const CATS = [
  { v: 'all',               l: 'All',         e: '✦' },
  { v: 'electronics',       l: 'Electronics', e: '⚡' },
  { v: 'jewelery',          l: 'Jewelry',     e: '💎' },
  { v: "men's clothing",    l: 'Men',         e: '👔' },
  { v: "women's clothing",  l: 'Women',       e: '👗' },
];
const SORTS = [
  { v: 'default',    l: 'Featured'         },
  { v: 'price-asc',  l: 'Price: Low → High' },
  { v: 'price-desc', l: 'Price: High → Low' },
  { v: 'rating',     l: 'Top Rated'        },
  { v: 'name',       l: 'Name A–Z'         },
];

const SearchAndFilter = ({ search, setSearch, category, setCategory, sortBy, setSortBy, resultCount, total }) => {
  const { dark } = useTheme();

  const inputCls = `w-full rounded-2xl pl-12 pr-12 py-4 text-sm outline-none font-body transition-all duration-200
    ${dark
      ? 'bg-white/[0.05] border border-white/[0.09] focus:border-obsidian-500/60 focus:bg-obsidian-500/5 text-slate-200 placeholder-slate-600'
      : 'bg-white border border-black/[0.08] focus:border-obsidian-400/60 focus:bg-obsidian-50/30 text-slate-800 placeholder-slate-400 shadow-sm'
    }`;

  const selectCls = `rounded-xl px-3 py-2.5 text-xs font-body outline-none cursor-pointer transition-all appearance-none pr-8
    ${dark
      ? 'bg-white/5 border border-white/8 text-slate-400 hover:border-white/15'
      : 'bg-white border border-black/8 text-slate-600 hover:border-black/15 shadow-sm'
    }`;

  const catBtn = (active) =>
    `flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-150 font-body
     ${active
       ? 'bg-obsidian-600 border-obsidian-500/80 text-white shadow-glow-sm'
       : dark
         ? 'bg-white/5 border-white/8 text-slate-400 hover:bg-white/10 hover:text-slate-200 hover:border-white/15'
         : 'bg-white border-black/8 text-slate-600 hover:bg-obsidian-50 hover:text-obsidian-700 hover:border-obsidian-200 shadow-sm'
     }`;

  const arrowSvg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${dark ? '%236B7280' : '%239CA3AF'}' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>`);

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative group">
        <svg className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors pointer-events-none
                          ${dark ? 'text-slate-600 group-focus-within:text-obsidian-400' : 'text-slate-400 group-focus-within:text-obsidian-500'}`}
             fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8"/><path strokeLinecap="round" d="m21 21-4.35-4.35"/>
        </svg>
        <input
          type="text"
          placeholder="Search products by name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className={inputCls}
        />
        {search && (
          <button onClick={() => setSearch('')}
            className={`absolute right-4 top-1/2 -translate-y-1/2 rounded-lg p-1 transition-colors
                         ${dark ? 'text-slate-600 hover:text-slate-300' : 'text-slate-400 hover:text-slate-700'}`}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-2">
        {CATS.map(c => (
          <button key={c.v} onClick={() => setCategory(c.v)} className={catBtn(category === c.v)}>
            <span>{c.e}</span>
            <span>{c.l}</span>
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <svg className={`w-4 h-4 flex-shrink-0 ${dark ? 'text-slate-600' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M6 12h12M10 17h4"/>
          </svg>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className={selectCls}
            style={{ backgroundImage: `url("data:image/svg+xml,${arrowSvg}")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '14px' }}>
            {SORTS.map(s => (
              <option key={s.v} value={s.v} className={dark ? 'bg-obsidian-900 text-slate-300' : 'bg-white text-slate-700'}>{s.l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center gap-2 text-xs font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-obsidian-400 animate-pulse" />
        <span className={dark ? 'text-slate-600' : 'text-slate-500'}>
          Showing{' '}
          <span className="text-obsidian-400 font-semibold">{resultCount}</span>
          {' '}of {total} products
        </span>
        {search && (
          <span className={dark ? 'text-slate-700' : 'text-slate-400'}>
            · matching "<span className={`italic ${dark ? 'text-slate-500' : 'text-slate-600'}`}>{search}</span>"
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;
