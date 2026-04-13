import { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext(null);

// Mock user database stored in localStorage
const USERS_KEY = 'dex_users_v1';
const SESSION_KEY = 'dex_session_v1';

const getUsers = () => {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
};

const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(SESSION_KEY)) || null; }
    catch { return null; }
  });

  const [orders, setOrders] = useState(() => {
    try { return JSON.parse(localStorage.getItem('dex_orders_v1')) || []; }
    catch { return []; }
  });

  const signup = useCallback(({ name, email, password }) => {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, error: 'Email already registered.' };
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app: hashed
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=6366f1&textColor=ffffff`,
      joinedAt: new Date().toISOString(),
      phone: '',
      address: '',
    };
    saveUsers([...users, newUser]);
    const session = { ...newUser };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const login = useCallback(({ email, password }) => {
    const users = getUsers();
    const found = users.find(u => u.email === email && u.password === password);
    if (!found) return { ok: false, error: 'Invalid email or password.' };
    const session = { ...found };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const updateProfile = useCallback((updates) => {
    const users = getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return { ok: false, error: 'User not found.' };
    const updated = { ...users[idx], ...updates };
    users[idx] = updated;
    saveUsers(users);
    const session = { ...updated };
    delete session.password;
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true };
  }, [user]);

  const placeOrder = useCallback((cartItems, total) => {
    const order = {
      id: `ORD-${Date.now()}`,
      userId: user?.id,
      items: cartItems,
      total,
      status: 'Confirmed',
      placedAt: new Date().toISOString(),
    };
    const allOrders = (() => {
      try { return JSON.parse(localStorage.getItem('dex_orders_v1')) || []; }
      catch { return []; }
    })();
    const updated = [order, ...allOrders];
    localStorage.setItem('dex_orders_v1', JSON.stringify(updated));
    setOrders(updated);
    return order;
  }, [user]);

  const userOrders = orders.filter(o => o.userId === user?.id);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, placeOrder, userOrders }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
};