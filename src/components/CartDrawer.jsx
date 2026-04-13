import { useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useTheme } from '../context/ThemeContext';

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart, increment, decrement, clearCart, totalItems, totalPrice } = useCart();
  const { toast } = useToast();
  const { dark }  = useTheme();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else      document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleRemove = (item) => {
    removeFromCart(item.id);
    toast({ type: 'error', title: 'Removed', message: item.title.slice(0, 40) + '…' });
  };

  const handleCheckout = () => {
    clearCart();
    onClose();
    toast({ type: 'success', title: '🎉 Order Placed!', message: 'Thanks for your purchase. (Demo only)' });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300
                     bg-black/60 backdrop-blur-sm
                     ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 flex flex-col
                     w-full max-w-sm shadow-drawer
                     transition-transform duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]
                     ${open ? 'translate-x-0' : 'translate-x-full'}
                     ${dark
                       ? 'bg-obsidian-950/95 border-l border-white/8 backdrop-blur-2xl'
                       : 'bg-white/95 border-l border-black/8 backdrop-blur-2xl'
                     }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-6 py-5 border-b
                          ${dark ? 'border-white/8' : 'border-black/8'}`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-obsidian-600/80 flex items-center justify-center shadow-glow-sm">
              <svg className="w-4.5 h-4.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
              </svg>
            </div>
            <div>
              <h2 className={`font-display text-lg font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Your Cart</h2>
              <p className="text-xs text-slate-500 font-mono">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <button onClick={onClose}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                         ${dark ? 'bg-white/8 hover:bg-white/15 text-slate-400 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-slate-500 hover:text-slate-900'}`}>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-20">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl
                               ${dark ? 'bg-white/5 border border-white/8' : 'bg-black/5 border border-black/8'}`}>
                🛒
              </div>
              <div>
                <p className={`font-display text-xl font-bold ${dark ? 'text-slate-300' : 'text-slate-700'}`}>Cart is empty</p>
                <p className="text-sm text-slate-500 mt-1">Add some products to get started</p>
              </div>
              <button onClick={onClose}
                className="mt-2 px-5 py-2 rounded-xl bg-obsidian-600 hover:bg-obsidian-500 text-white text-sm font-semibold transition-all">
                Browse Products
              </button>
            </div>
          ) : cart.map(item => (
            <div key={item.id}
              className={`flex gap-3 p-3 rounded-2xl border transition-all
                           ${dark ? 'bg-white/[0.03] border-white/[0.06] hover:border-white/10' : 'bg-black/[0.02] border-black/[0.05] hover:border-black/10'}`}>
              {/* Image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white flex-shrink-0 flex items-center justify-center p-1">
                <img src={item.image} alt={item.title} className="w-full h-full object-contain"/>
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-medium leading-snug line-clamp-2 font-body
                                ${dark ? 'text-slate-200' : 'text-slate-800'}`}>
                  {item.title}
                </p>
                <p className={`text-sm font-display font-bold mt-1 ${dark ? 'text-white' : 'text-slate-900'}`}>
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                {/* Qty controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => decrement(item.id)}
                    className={`qty-btn ${dark ? 'bg-white/8 hover:bg-white/15 text-slate-300' : 'bg-black/8 hover:bg-black/15 text-slate-700'}`}>
                    −
                  </button>
                  <span className={`text-sm font-mono font-bold w-5 text-center ${dark ? 'text-white' : 'text-slate-900'}`}>{item.qty}</span>
                  <button onClick={() => increment(item.id)}
                    className={`qty-btn ${dark ? 'bg-white/8 hover:bg-white/15 text-slate-300' : 'bg-black/8 hover:bg-black/15 text-slate-700'}`}>
                    +
                  </button>
                  <button onClick={() => handleRemove(item)}
                    className="ml-auto text-slate-600 hover:text-rose-400 transition-colors p-1 rounded-lg hover:bg-rose-500/10">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className={`px-6 py-5 border-t space-y-4 ${dark ? 'border-white/8' : 'border-black/8'}`}>
            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-mono">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500">
                <span>Shipping</span>
                <span className="text-emerald-400 font-semibold">Free</span>
              </div>
              <div className={`h-px my-2 ${dark ? 'bg-white/8' : 'bg-black/8'}`} />
              <div className="flex justify-between">
                <span className={`font-display text-lg font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>Total</span>
                <span className={`font-display text-xl font-black ${dark ? 'text-white' : 'text-slate-900'}`}>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            {/* CTA */}
            <button onClick={handleCheckout}
              className="w-full py-3.5 rounded-xl font-semibold text-sm text-white
                          bg-gradient-to-r from-obsidian-600 to-obsidian-500
                          hover:from-obsidian-500 hover:to-obsidian-400
                          shadow-glow-sm hover:shadow-glow-md
                          transition-all duration-200 hover:scale-[1.02] active:scale-95
                          flex items-center justify-center gap-2 font-body">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Checkout — ${totalPrice.toFixed(2)}
            </button>
            <button onClick={clearCart}
              className={`w-full py-2.5 rounded-xl text-sm transition-all font-body
                           ${dark ? 'text-slate-600 hover:text-rose-400 hover:bg-rose-500/8' : 'text-slate-500 hover:text-rose-500 hover:bg-rose-50'}`}>
              Clear cart
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
