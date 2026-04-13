const StarRating = ({ rate, count, size = 'sm' }) => {
  const sz = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <div className="flex items-center gap-0.5">
        {[1,2,3,4,5].map(star => {
          const filled = star <= Math.floor(rate);
          const half   = !filled && star - 0.5 <= rate;
          const id     = `h-${star}-${rate}`;
          return (
            <svg key={star} className={sz} viewBox="0 0 24 24">
              {half && (
                <defs>
                  <linearGradient id={id}>
                    <stop offset="50%" stopColor="#fbbf24"/>
                    <stop offset="50%" stopColor="transparent"/>
                  </linearGradient>
                </defs>
              )}
              <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                fill={filled ? '#fbbf24' : half ? `url(#${id})` : 'transparent'}
                stroke={filled || half ? '#fbbf24' : '#374151'}
                strokeWidth="1.5"
              />
            </svg>
          );
        })}
      </div>
      <span className={`font-mono font-semibold ${size === 'lg' ? 'text-sm text-slate-300' : 'text-xs text-slate-400'}`}>{rate}</span>
      {count && <span className={`${size === 'lg' ? 'text-sm' : 'text-xs'} text-slate-600`}>({count})</span>}
    </div>
  );
};

export default StarRating;
