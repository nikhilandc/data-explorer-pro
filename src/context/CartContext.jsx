import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      const exists = state.find(i => i.id === action.product.id);
      if (exists) {
        return state.map(i =>
          i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.product, qty: 1 }];
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id);
    case 'INCREMENT':
      return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i);
    case 'DECREMENT':
      return state.map(i =>
        i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i
      );
    case 'CLEAR':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const stored = (() => {
    try { return JSON.parse(localStorage.getItem('cart_v1')) || []; }
    catch { return []; }
  })();

  const [cart, dispatch] = useReducer(cartReducer, stored);

  useEffect(() => {
    localStorage.setItem('cart_v1', JSON.stringify(cart));
  }, [cart]);

  const addToCart     = (product)  => dispatch({ type: 'ADD', product });
  const removeFromCart = (id)      => dispatch({ type: 'REMOVE', id });
  const increment     = (id)       => dispatch({ type: 'INCREMENT', id });
  const decrement     = (id)       => dispatch({ type: 'DECREMENT', id });
  const clearCart     = ()         => dispatch({ type: 'CLEAR' });

  const totalItems    = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice    = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const isInCart      = (id)       => cart.some(i => i.id === id);
  const getQty        = (id)       => cart.find(i => i.id === id)?.qty || 0;

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, increment, decrement, clearCart,
      totalItems, totalPrice, isInCart, getQty,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
