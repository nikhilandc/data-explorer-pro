import { useTheme } from '../context/ThemeContext';

const SkeletonCard = () => {
  const { dark } = useTheme();
  const s = dark ? 'shimmer bg-white/5' : 'shimmer-light bg-black/5';
  return (
    <div className={`rounded-2xl overflow-hidden border ${dark ? 'border-white/5 bg-white/[0.02]' : 'border-black/5 bg-black/[0.02]'}`}>
      <div className={`${s} h-56 w-full`} />
      <div className="p-5 space-y-3">
        <div className={`${s} h-3 w-20 rounded-full`} />
        <div className={`${s} h-4 w-full rounded-lg`} />
        <div className={`${s} h-4 w-4/5 rounded-lg`} />
        <div className={`${s} h-3 w-28 rounded-full mt-1`} />
        <div className="flex justify-between items-center pt-3">
          <div className={`${s} h-8 w-20 rounded-xl`} />
          <div className={`${s} h-10 w-28 rounded-xl`} />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
