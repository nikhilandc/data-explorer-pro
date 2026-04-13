import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const CAT = {
  "electronics":     { emoji: '⚡' },
  "jewelery":        { emoji: '💎' },
  "men's clothing":  { emoji: '👔' },
  "women's clothing":{ emoji: '👗' },
};

const Modal = ({ product, onClose }) => {
  const [adding, setAdding] = useState(false);
  const { addToCart, isInCart, getQty, increment, decrement } = useCart();
  const { toast } = useToast();
  const { dark }  = useTheme();
  const inCart = isInCart(product?.id);
  const qty    = getQty(product?.id);
  const cat    = CAT[product?.category] || { emoji: '📦' };

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    setAdding(true);
    addToCart(product);
    toast({ type: 'cart', title: 'Added to cart!', message: product.title.slice(0, 45) + '…' });
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8" style={{ animation: 'fadeIn 0.2s ease' }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-auto rounded-3xl
                        border shadow-2xl
                        ${dark
                          ? 'bg-obsidian-950 border-white/10'
                          : 'bg-white border-black/10'
                        }`}
           style={{ animation: 'scaleIn 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>

        {/* Close */}
        <button onClick={onClose}
          className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center
                       transition-all border
                       ${dark ? 'bg-white/8 hover:bg-white/15 text-slate-400 hover:text-white border-white/10' : 'bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-900 border-black/10'}`}>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        {/* Image */}
        <div className="relative flex items-center justify-center bg-white rounded-t-3xl" style={{ minHeight: '280px' }}>
          <img src={product.image} alt={product.title} className="max-h-60 max-w-[75%] object-contain p-4"/>
          <div className={`absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full
                            text-xs font-medium font-body backdrop-blur-sm border
                            ${dark ? 'bg-obsidian-950/80 border-white/10 text-slate-300' : 'bg-white/80 border-black/10 text-slate-700'}`}>
            <span>{cat.emoji}</span>
            <span className="capitalize">{product.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <h2 className={`font-display text-2xl md:text-3xl font-black leading-tight mb-4
                           ${dark ? 'text-white' : 'text-slate-900'}`}>
            {product.title}
          </h2>

          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <StarRating rate={product.rating.rate} count={product.rating.count} size="lg"/>
            <span className={`text-xs px-2 py-1 rounded-full font-mono
                               ${dark ? 'bg-white/5 text-slate-500' : 'bg-black/5 text-slate-500'}`}>
              ID #{product.id}
            </span>
          </div>

          <p className={`text-sm leading-relaxed mb-8 pl-4 border-l-2 border-obsidian-500/40 font-body
                          ${dark ? 'text-slate-400' : 'text-slate-600'}`}>
            {product.description}
          </p>

          {/* Price + Cart */}
          <div className={`rounded-2xl p-4 border mb-6
                            ${dark ? 'bg-white/[0.03] border-white/8' : 'bg-black/[0.02] border-black/8'}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-mono">Price</p>
                <p className={`font-display text-4xl font-black tracking-tight ${dark ? 'text-white' : 'text-slate-900'}`}>
                  ${product.price}
                </p>
              </div>

              {inCart ? (
                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75"/>
                    </svg>
                    In cart
                  </p>
                  <div className="flex items-center gap-2">
                    <button onClick={() => decrement(product.id)}
                      className={`qty-btn w-9 h-9 text-lg rounded-xl ${dark ? 'bg-white/8 hover:bg-white/15 text-white' : 'bg-black/8 hover:bg-black/15 text-slate-900'}`}>−</button>
                    <span className={`text-lg font-mono font-black w-8 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{qty}</span>
                    <button onClick={() => increment(product.id)}
                      className={`qty-btn w-9 h-9 text-lg rounded-xl ${dark ? 'bg-white/8 hover:bg-white/15 text-white' : 'bg-black/8 hover:bg-black/15 text-slate-900'}`}>+</button>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">Subtotal: ${(product.price * qty).toFixed(2)}</p>
                </div>
              ) : (
                <button onClick={handleAdd}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white font-body
                               bg-gradient-to-r from-obsidian-600 to-obsidian-500
                               hover:from-obsidian-500 hover:to-obsidian-400
                               shadow-glow-sm hover:shadow-glow-md
                               transition-all duration-200 hover:scale-[1.03] active:scale-95
                               ${adding ? 'opacity-80 scale-95' : ''}`}>
                  {adding
                    ? <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83"/>
                      </svg>
                    : <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                      </svg>
                  }
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          <button onClick={onClose}
            className={`w-full py-3 rounded-xl text-sm font-medium transition-all border font-body
                         ${dark ? 'text-slate-500 border-white/8 hover:bg-white/5 hover:text-slate-300' : 'text-slate-500 border-black/8 hover:bg-black/5 hover:text-slate-700'}`}>
            Continue Shopping
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes scaleIn { from{opacity:0;transform:scale(0.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
      `}</style>
    </div>
  );
};

export default Modal;
