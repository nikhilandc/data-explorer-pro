import { useTheme } from '../context/ThemeContext';
import { ROUTES }   from '../hooks/useRouter.jsx';

const AboutPage = ({ navigate }) => {
  const { dark } = useTheme();

  const card = `rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1
    ${dark ? 'bg-white/[0.04] border-white/8 hover:border-white/15' : 'bg-white border-black/8 hover:border-obsidian-200 shadow-card-light hover:shadow-card-light-hover'}`;

  return (
    <div className={`min-h-screen ${dark ? 'bg-obsidian-950' : 'bg-cream-50'} pt-16`}>

      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-center">
        <div className={`absolute inset-0 ${dark ? 'bg-mesh-dark' : 'bg-mesh-light'} pointer-events-none`} />
        <div className={`absolute inset-0 ${dark ? 'bg-grid-dark' : 'bg-grid-light'} bg-grid pointer-events-none`} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-obsidian-600/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono uppercase tracking-widest mb-8
                            ${dark ? 'bg-obsidian-500/10 border-obsidian-500/25 text-obsidian-400' : 'bg-obsidian-100 border-obsidian-200 text-obsidian-600'}`}>
            🏢 About Us
          </div>
          <h1 className={`font-display text-5xl md:text-7xl font-black leading-none tracking-tight mb-6
                           ${dark ? 'text-white' : 'text-slate-900'}`}>
            We're building the<br />
            <span className="gradient-text">future of shopping</span>
          </h1>
          <p className={`text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10 font-light
                          ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            DataExplorer Pro is a premium product discovery platform built to make finding exactly what you need fast, beautiful, and effortless. We combine powerful APIs with world-class design.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <button onClick={() => navigate(ROUTES.SIGNUP)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-obsidian-600 to-obsidian-500 text-white font-semibold text-sm shadow-glow-sm hover:shadow-glow-md transition-all hover:scale-105 font-body">
              Get Started Free
            </button>
            <button onClick={() => navigate(ROUTES.HOME)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm border transition-all hover:scale-105 font-body
                           ${dark ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-black/10 text-slate-700 hover:bg-black/5'}`}>
              Browse Products
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-20">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { val: '20+',   label: 'Products',       icon: '📦' },
            { val: '4',     label: 'Categories',      icon: '🗂️' },
            { val: '100%',  label: 'Open Source',     icon: '💻' },
            { val: '∞',     label: 'Possibilities',  icon: '✨' },
          ].map(s => (
            <div key={s.label} className={`${card} text-center`}>
              <div className="text-3xl mb-3">{s.icon}</div>
              <div className={`font-display text-3xl font-black mb-1 ${dark ? 'text-white' : 'text-slate-900'}`}>{s.val}</div>
              <div className="text-xs text-slate-500 uppercase tracking-widest font-mono">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission */}
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-6
                              ${dark ? 'bg-aurora-violet/10 border border-aurora-violet/20 text-aurora-violet' : 'bg-obsidian-100 border border-obsidian-200 text-obsidian-600'}`}>
              🎯 Our Mission
            </div>
            <h2 className={`font-display text-4xl font-black leading-tight mb-6 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Making product discovery a <span className="gradient-text">delightful experience</span>
            </h2>
            <p className={`text-sm leading-relaxed mb-4 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              We believe that shopping online should feel as intuitive and enjoyable as browsing a beautiful physical store. Every design decision we make is focused on reducing friction and maximizing delight.
            </p>
            <p className={`text-sm leading-relaxed ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Our platform is built with real-world engineering standards — clean component architecture, efficient state management, accessible design, and performance-first thinking.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: '⚡', title: 'Lightning Fast', desc: 'Optimized React with minimal re-renders and smart caching' },
              { icon: '🎨', title: 'Beautiful UI', desc: 'Glassmorphism, animations, and premium design tokens' },
              { icon: '♿', title: 'Accessible', desc: 'WCAG compliant with keyboard navigation support' },
              { icon: '🔒', title: 'Secure', desc: 'Client-side auth with encrypted session management' },
            ].map(f => (
              <div key={f.title} className={card}>
                <div className="text-2xl mb-3">{f.icon}</div>
                <h4 className={`font-semibold text-sm mb-1 ${dark ? 'text-white' : 'text-slate-900'}`}>{f.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4
                              ${dark ? 'bg-aurora-cyan/10 border border-aurora-cyan/20 text-aurora-cyan' : 'bg-cyan-100 border border-cyan-200 text-cyan-700'}`}>
              ⚙️ Tech Stack
            </div>
            <h2 className={`font-display text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>Built with modern tools</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: 'React 18', role: 'UI Framework', desc: 'Concurrent features, hooks, and Context API for scalable state management', color: 'text-cyan-400', bg: 'bg-cyan-500/10', badge: '18.2' },
              { name: 'Tailwind CSS', role: 'Styling', desc: 'Utility-first CSS with custom design tokens, dark mode, and animations', color: 'text-sky-400', bg: 'bg-sky-500/10', badge: '3.4' },
              { name: 'Vite', role: 'Build Tool', desc: 'Sub-second HMR in dev and optimized production bundles', color: 'text-violet-400', bg: 'bg-violet-500/10', badge: '5.0' },
              { name: 'Fake Store API', role: 'Data Source', desc: 'Free REST API serving real product data — no auth required', color: 'text-emerald-400', bg: 'bg-emerald-500/10', badge: 'Live' },
              { name: 'Context API', role: 'State Mgmt', desc: 'Cart, Auth, Theme, and Toast — all managed with React Context + useReducer', color: 'text-amber-400', bg: 'bg-amber-500/10', badge: 'Built-in' },
              { name: 'localStorage', role: 'Persistence', desc: 'Cart and session state persisted across page refreshes automatically', color: 'text-pink-400', bg: 'bg-pink-500/10', badge: 'Native' },
            ].map(t => (
              <div key={t.name} className={`${card} group`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold ${t.color} ${t.bg}`}>{t.badge}</div>
                  <span className="text-xs text-slate-600 font-mono">{t.role}</span>
                </div>
                <h4 className={`font-display text-lg font-black mb-2 ${dark ? 'text-white' : 'text-slate-900'}`}>{t.name}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div className="text-center mb-10">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono mb-4
                              ${dark ? 'bg-aurora-pink/10 border border-aurora-pink/20 text-aurora-pink' : 'bg-pink-100 border border-pink-200 text-pink-700'}`}>
              👥 The Team
            </div>
            <h2 className={`font-display text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>Small team. Big vision.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Alex Chen', role: 'Frontend Lead', emoji: '👨‍💻', desc: '6 years React experience. Passionate about design systems and performance.', skills: ['React', 'Tailwind', 'TypeScript'] },
              { name: 'Priya Sharma', role: 'UX Designer', emoji: '👩‍🎨', desc: 'Creates interfaces that feel intuitive. Obsessed with micro-interactions.', skills: ['Figma', 'Motion', 'A11y'] },
              { name: 'Marcus Lee', role: 'Backend Dev', emoji: '⚙️', desc: 'Builds the APIs that power beautiful frontends. Node.js & PostgreSQL expert.', skills: ['Node.js', 'REST', 'DevOps'] },
            ].map(m => (
              <div key={m.name} className={`${card} text-center`}>
                <div className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl
                                  ${dark ? 'bg-obsidian-500/20 border border-obsidian-500/30' : 'bg-obsidian-100 border border-obsidian-200'}`}>
                  {m.emoji}
                </div>
                <h4 className={`font-display text-lg font-black mb-0.5 ${dark ? 'text-white' : 'text-slate-900'}`}>{m.name}</h4>
                <p className="text-xs text-obsidian-400 font-mono mb-3">{m.role}</p>
                <p className={`text-xs leading-relaxed mb-4 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{m.desc}</p>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {m.skills.map(s => (
                    <span key={s} className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold
                                              ${dark ? 'bg-white/5 border border-white/10 text-slate-400' : 'bg-black/5 border border-black/8 text-slate-500'}`}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`rounded-3xl p-10 text-center relative overflow-hidden border
                          ${dark ? 'border-obsidian-500/20' : 'border-obsidian-200'}`}
             style={{ background: dark ? 'linear-gradient(135deg, rgba(99,102,241,0.08), rgba(167,139,250,0.05))' : 'linear-gradient(135deg, rgba(99,102,241,0.06), rgba(167,139,250,0.03))' }}>
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-obsidian-600/10 blur-3xl" />
          </div>
          <div className="relative">
            <h2 className={`font-display text-3xl md:text-4xl font-black mb-4 ${dark ? 'text-white' : 'text-slate-900'}`}>
              Ready to explore?
            </h2>
            <p className={`text-sm leading-relaxed max-w-md mx-auto mb-8 ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
              Create a free account and start browsing our curated product catalog with a cart, filters, and a stunning experience.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => navigate(ROUTES.SIGNUP)}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-obsidian-600 to-obsidian-500 text-white font-semibold shadow-glow-md hover:shadow-glow-lg transition-all hover:scale-105 font-body">
                Sign Up Free →
              </button>
              <button onClick={() => navigate(ROUTES.HOME)}
                className={`px-8 py-3.5 rounded-xl font-semibold border transition-all hover:scale-105 font-body
                             ${dark ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-black/10 text-slate-700 hover:bg-black/5'}`}>
                View Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
