import { useTheme } from '../context/ThemeContext';

const Hero = ({ total }) => {
  const { dark } = useTheme();
  return (
    <section className="relative overflow-hidden pt-16 pb-10 md:pb-16">

      {/* Background mesh gradient */}
      <div className={`absolute inset-0 ${dark ? 'bg-mesh-dark' : 'bg-mesh-light'} pointer-events-none`} />

      {/* Grid pattern */}
      <div className={`absolute inset-0 ${dark ? 'bg-grid-dark' : 'bg-grid-light'} bg-grid pointer-events-none opacity-100`} />

      {/* Floating blobs */}
      <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full
                      bg-obsidian-600/10 blur-[100px] animate-float pointer-events-none" />
      <div className="absolute top-10 right-1/4 w-56 h-56 rounded-full
                      bg-aurora-violet/8 blur-[80px] animate-float pointer-events-none"
           style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40
                      bg-obsidian-600/5 blur-3xl pointer-events-none" />

      {/* Spinning aurora ring */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10
                      border border-aurora-violet animate-spin-slow pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full opacity-10
                      border border-aurora-cyan animate-spin-slow pointer-events-none"
           style={{ animationDirection: 'reverse' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 pb-8 text-center">


        {/* Headline */}
        <h1 className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px]
                         font-black leading-none tracking-tighter mb-6
                         ${dark ? 'text-white' : 'text-slate-900'}
                         animate-fade-up`}
            style={{ animationDelay: '0.08s', animationFillMode: 'both' }}>
          Discover &<br />
          <span className="gradient-text">Explore</span>{' '}
          <span className={`relative inline-block ${dark ? 'text-white' : 'text-slate-900'}`}>
            Products
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
              <path d="M2 9C50 3 100 1 150 3C200 5 250 8 298 5" stroke="url(#ul)" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="ul" x1="0" y1="0" x2="300" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a78bfa"/>
                  <stop offset="0.5" stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#22d3ee"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-12 font-light
                        ${dark ? 'text-slate-400' : 'text-slate-600'}
                        animate-fade-up`}
           style={{ animationDelay: '0.16s', animationFillMode: 'both' }}>
          A premium, fully-featured data explorer with cart management, real-time filtering,
          and a stunning UI that's built to impress.
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12
                        animate-fade-up"
             style={{ animationDelay: '0.24s', animationFillMode: 'both' }}>
          {[
            { val: total || '20', label: 'Products', icon: '📦' },
            { val: '4',           label: 'Categories', icon: '🗂️' },
            { val: '100%',        label: 'Responsive', icon: '📱' },
            { val: 'Live',        label: 'API Data', icon: '⚡' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl mb-0.5">{s.icon}</span>
              <span className={`font-display text-2xl md:text-3xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>{s.val}</span>
              <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
