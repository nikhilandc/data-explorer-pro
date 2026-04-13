import { useState } from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const CAT = {
  "electronics":     { emoji: '⚡', color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/20' },
  "jewelery":        { emoji: '💎', color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/20' },
  "men's clothing":  { emoji: '👔', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20' },
  "women's clothing":{ emoji: '👗', color: 'text-pink-400',   bg: 'bg-pink-500/10',   border: 'border-pink-500/20' },
};

const ProductCard = ({ product, onClick, index }) => {
  const [imgOk, setImgOk]       = useState(false);
  const [imgErr, setImgErr]     = useState(false);
  const [adding, setAdding]     = useState(false);
  const { addToCart, isInCart, getQty } = useCart();
  const { toast }               = useToast();
  const { dark }                = useTheme();
  const cat = CAT[product.category] || { emoji: '📦', color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-500/20' };
  const inCart = isInCart(product.id);
  const qty    = getQty(product.id);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart(product);
    toast({
      type: 'cart',
      title: 'Added to cart!',
      message: product.title.length > 40 ? product.title.slice(0, 40) + '…' : product.title,
    });
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden cursor-pointer
                  aurora-border noise
                  transition-all duration-300
                  hover:-translate-y-2
                  ${dark
                    ? 'bg-white/[0.04] border border-white/[0.07] hover:border-obsidian-500/40 shadow-card-dark hover:shadow-card-hover'
                    : 'bg-white/80 border border-black/[0.06] hover:border-obsidian-400/50 shadow-card-light hover:shadow-card-light-hover'
                  }`}
      style={{ animationDelay: `${Math.min(index * 50, 500)}ms`, opacity: 1 }}
      onClick={() => onClick(product)}
    >
      {/* Shine layer */}
      <div className="absolute inset-0 bg-card-shine opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10 rounded-2xl" />

      {/* Hover glow top edge */}
      <div className={`absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300
                       bg-gradient-to-r from-transparent via-obsidian-400/60 to-transparent`} />

      {/* Image */}
      <div className={`relative overflow-hidden rounded-t-2xl flex items-center justify-center
                       ${dark ? 'bg-white' : 'bg-white'}`}
           style={{ height: '220px' }}>
        {!imgOk && !imgErr && <div className="absolute inset-0 shimmer" />}
        {imgErr
          ? <div className="flex flex-col items-center gap-2 text-slate-400">
              <span className="text-5xl">{cat.emoji}</span>
              <span className="text-xs">No image</span>
            </div>
          : <img src={product.image} alt={product.title}
                 className={`max-h-[180px] max-w-[80%] object-contain transition-all duration-500
                              group-hover:scale-110 ${imgOk ? 'opacity-100' : 'opacity-0'}`}
                 onLoad={() => setImgOk(true)}
                 onError={() => { setImgErr(true); setImgOk(true); }}
            />
        }

        {/* Category pill */}
        <div className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full
                         text-[11px] font-semibold border backdrop-blur-sm font-body
                         ${cat.color} ${cat.bg} ${cat.border}`}>
          <span>{cat.emoji}</span>
          <span className="capitalize">{product.category.split(' ')[0]}</span>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full
                        bg-black/40 backdrop-blur-sm border border-white/10">
          <svg className="w-3 h-3 fill-amber-400" viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span className="text-[11px] font-mono font-bold text-white">{product.rating.rate}</span>
        </div>

        {/* In-cart badge */}
        {inCart && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full
                          bg-obsidian-600 border border-obsidian-400/50 animate-bounce-in">
            <span className="text-[10px] font-bold text-white font-mono">{qty} in cart</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className={`text-[13px] font-medium leading-snug line-clamp-2 font-body
                         transition-colors group-hover:text-obsidian-300
                         ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
          {product.title}
        </h3>

        <StarRating rate={product.rating.rate} count={product.rating.count} />

        <p className={`text-xs leading-relaxed line-clamp-2 flex-1
                        ${dark ? 'text-slate-500' : 'text-slate-500'}`}>
          {product.description}
        </p>

        <div className={`flex items-center justify-between pt-3 border-t
                          ${dark ? 'border-white/5' : 'border-black/5'}`}>
          <div className="flex flex-col">
            <span className={`text-[22px] font-display font-black leading-none tracking-tight
                               ${dark ? 'text-white' : 'text-slate-900'}`}>
              ${product.price}
            </span>
          </div>

          <button
            onClick={handleAdd}
            className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
                         font-body overflow-hidden transition-all duration-200
                         ${adding ? 'scale-95' : 'hover:scale-105'}
                         ${inCart
                           ? 'bg-obsidian-600 hover:bg-obsidian-500 text-white border border-obsidian-400/50 shadow-glow-sm'
                           : dark
                             ? 'bg-white/8 hover:bg-obsidian-600 text-slate-300 hover:text-white border border-white/10 hover:border-obsidian-400/50 hover:shadow-glow-sm'
                             : 'bg-slate-100 hover:bg-obsidian-600 text-slate-700 hover:text-white border border-slate-200 hover:border-obsidian-400/50'
                         }`}
          >
            {adding
              ? <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                </svg>
              : <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
            }
            {inCart ? 'Add More' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
