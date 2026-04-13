# 🛍️ DataExplorer Pro

> A production-grade, full-featured interactive product browser built with **React 18** + **Tailwind CSS 3**. Engineered to mid-level standards — clean architecture, global state management, client-side auth, routing, and a premium glassmorphism UI.

<br />

![React](https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)

---

## 🔗 Live Demo
> 🔴 Live: [https://data-explorer-pro.vercel.app](https://data-explorer-pro-rho.vercel.app/)
> 🟢 Source Code: https://github.com/your-username/data-explorer-pro

> Deploy in under 2 minutes — see the [Deployment](#-deployment) section below.

---

## ✨ Feature Overview

### 🛒 Shopping
- Browse 20 real products from the Fake Store API
- Real-time search filtering by product name
- Category filters — Electronics, Jewelry, Men's & Women's Clothing
- Sort by price (low→high, high→low), top rated, or name A–Z
- Product detail modal with full description and cart controls
- Add to cart, increment/decrement quantity, remove items
- Cart subtotal and total calculation
- Cart persisted in `localStorage` — survives page refresh
- One-click checkout with order confirmation toast

### 👤 Authentication
- Register with name, email, password + confirmation
- Password strength meter (Weak → Fair → Good → Strong)
- Login with email and password validation
- Session persisted in `localStorage`
- Protected routes — dashboard redirects to login if unauthenticated
- Logout clears session and cart

### 📋 User Dashboard
- **Profile tab** — edit name, phone, shipping address; avatar auto-generated from initials
- **Orders tab** — full order history with item images, quantities, totals, and one-click reorder
- **Settings tab** — theme toggle, notification preferences, account info, sign out

### 🎨 Design & UX
- Dark / Light mode with OS preference detection + `localStorage` memory
- Glassmorphism cards with aurora gradient hover borders
- Animated mesh gradient hero with floating blobs
- Shimmer skeleton loaders while API data fetches
- Staggered card entry animations
- Toast notification system — stacked, auto-dismissing, 4 types
- Slide-in cart drawer with smooth easing
- Fully responsive — mobile-first: 1 → 2 → 3 → 4 column grid
- User avatar dropdown in navbar with profile navigation

### 🏢 About Page
- Company mission and values
- Tech stack showcase with version badges
- Team member cards
- Animated statistics
- CTA section with sign-up flow

---

## 🗂️ Project Structure

```
data-explorer-pro/
├── index.html                        # Entry HTML + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js                # Custom tokens, colors, animations
├── postcss.config.js
└── src/
    ├── main.jsx                      # Root — all providers composed here
    ├── App.jsx                       # Router shell + page rendering
    ├── index.css                     # Tailwind + glass/shimmer utilities
    │
    ├── hooks/
    │   └── useRouter.js              # Lightweight hash-based router
    │
    ├── context/
    │   ├── AuthContext.jsx           # Auth: signup, login, logout, updateProfile, placeOrder
    │   ├── CartContext.jsx           # Cart: useReducer + localStorage persistence
    │   ├── ThemeContext.jsx          # Dark/light mode + OS detection
    │   └── ToastContext.jsx          # Global toast notifications
    │
    ├── pages/
    │   ├── LoginPage.jsx             # Split-panel login with validation
    │   ├── SignupPage.jsx            # Signup with password strength meter
    │   ├── AboutPage.jsx             # Company info, team, tech stack, CTA
    │   └── DashboardPage.jsx         # Profile / Orders / Settings tabs
    │
    └── components/
        ├── Navbar.jsx                # Sticky nav, user menu, cart badge, theme toggle
        ├── Hero.jsx                  # Animated hero with mesh gradients + stats
        ├── SearchAndFilter.jsx       # Search input + category pills + sort dropdown
        ├── ProductCard.jsx           # Card with hover effects + add to cart
        ├── SkeletonCard.jsx          # Shimmer loading placeholder
        ├── StarRating.jsx            # Half-star SVG rating component
        ├── Modal.jsx                 # Product detail overlay + cart controls
        └── CartDrawer.jsx            # Slide-in cart sidebar with checkout
```

---

## ⚙️ Architecture & Key Decisions

### Routing
A zero-dependency hash router (`useRouter.js`) built with `useState` + `window.location.hash`. No `react-router` needed — keeps the bundle lean and demonstrates understanding of routing fundamentals.

```js
const { page, navigate } = useRouter();
navigate(ROUTES.PROFILE); // sets window.location.hash = 'profile'
```

### State Management
Four React Contexts handle all global state — no Redux, no Zustand, just React built-ins:

| Context | Hook | Manages |
|---------|------|---------|
| `AuthContext` | `useAuth()` | User session, signup/login/logout, profile updates, orders |
| `CartContext` | `useCart()` | Cart items via `useReducer`, totals, localStorage sync |
| `ThemeContext` | `useTheme()` | Dark/light mode, OS detection, localStorage memory |
| `ToastContext` | `useToast()` | Stacked toast queue, auto-dismiss timers, animation states |

Cart uses `useReducer` instead of plain `useState` for clean, predictable state transitions:

```js
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':       // add new item or increment qty if exists
    case 'REMOVE':    // remove by id
    case 'INCREMENT': // qty + 1
    case 'DECREMENT': // qty - 1 (min 1)
    case 'CLEAR':     // empty entire cart
  }
};
```

### Auth (Mock / Client-Side)
Client-side auth using `localStorage` as a user store. In production this pattern connects to a real backend API — the Context interface, session handling, and protected route logic remain identical.

```js
const { user, login, signup, logout, updateProfile, placeOrder } = useAuth();
```

### Performance
- `useCallback` on `fetchProducts` prevents unnecessary re-renders
- Card animation delays capped at 500ms to avoid sluggish large grids
- Per-card image `onLoad` / `onError` state prevents layout shifts
- Toast queue trimmed to 5 max — older toasts ejected automatically

---

## 🚀 Setup & Terminal Commands

### Step 1 — Scaffold the project
```bash
npm create vite@latest data-explorer-pro -- --template react
cd data-explorer-pro
```

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Add Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 4 — Copy all source files
Replace every auto-generated file with the provided source files, maintaining the exact folder structure above.

### Step 5 — Start the dev server
```bash
npm run dev
# → Open http://localhost:5173
```

### Step 6 — Build for production
```bash
npm run build
# Output → dist/
```

### Step 7 — Preview the production build locally
```bash
npm run preview
```

---

## 🌐 Deployment

### ▲ Vercel (Recommended — fastest, 1 command)
```bash
npm install -g vercel
vercel
# Vercel auto-detects Vite. Live in ~60 seconds.
```

### Netlify
```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```
Or connect your GitHub repo with these settings:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

### GitHub Pages
```bash
# 1. Add to vite.config.js:
#    base: '/your-repo-name/'

# 2. Install gh-pages
npm install -D gh-pages

# 3. Add to package.json scripts:
#    "deploy": "gh-pages -d dist"

# 4. Build and deploy
npm run build
npm run deploy
```

---

## 🛠️ Tech Stack

| Tool | Version | Role |
|------|---------|------|
| **React** | 18.2 | UI library — hooks, context, concurrent features |
| **Vite** | 5.0 | Build tool — instant HMR, optimized production bundles |
| **Tailwind CSS** | 3.4 | Utility-first styling — custom design tokens, dark mode, animations |
| **Fake Store API** | — | Free REST API — 20 real products, no auth required |

Zero external UI libraries. Every component is hand-crafted from scratch.

---

## 📱 Pages & Routes

| Hash Route | Page | Auth Required |
|---|---|---|
| `#home` | Product store — search, filter, browse | No |
| `#login` | Sign in with email + password | No |
| `#signup` | Create account with validation | No |
| `#about` | Company info, tech stack, team | No |
| `#profile` | Edit personal info | ✅ Yes |
| `#orders` | Order history + reorder | ✅ Yes |
| `#settings` | Theme, notifications, sign out | ✅ Yes |

---

## 🎨 Design System

### Color Palette
| Role | Color | Value |
|------|-------|-------|
| Primary | Obsidian Indigo | `#6366f1` |
| Accent Violet | Aurora Violet | `#a78bfa` |
| Accent Cyan | Aurora Cyan | `#22d3ee` |
| Accent Pink | Aurora Pink | `#f472b6` |
| Dark Background | Deep Obsidian | `#0b0b18` |
| Light Background | Warm Cream | `#fefcf7` |

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Playfair Display | Headings, prices, logo |
| Body | DM Sans | UI text, buttons, labels |
| Mono | JetBrains Mono | Badges, IDs, metadata |

### Custom Animations
`float` · `shimmer` · `fade-up` · `scale-in` · `bounce-in` · `toast-in` · `toast-out` · `pulse-glow` · `card-in` · `spin-slow`

---

## 🧩 Component API Reference

### `useCart()`
```js
const {
  cart,            // CartItem[]
  addToCart,       // (product) => void
  removeFromCart,  // (id) => void
  increment,       // (id) => void
  decrement,       // (id) => void
  clearCart,       // () => void
  totalItems,      // number
  totalPrice,      // number
  isInCart,        // (id) => boolean
  getQty,          // (id) => number
} = useCart();
```

### `useAuth()`
```js
const {
  user,            // User | null
  login,           // ({ email, password }) => { ok, error? }
  signup,          // ({ name, email, password }) => { ok, error? }
  logout,          // () => void
  updateProfile,   // (updates) => { ok, error? }
  placeOrder,      // (cartItems, total) => Order
  userOrders,      // Order[]
} = useAuth();
```

### `useToast()`
```js
const { toast, dismiss } = useToast();

toast({
  type: 'success' | 'error' | 'info' | 'cart',
  title: string,
  message?: string,
  duration?: number, // default 3500ms
});
```

### `useRouter()`
```js
const { page, navigate } = useRouter();

navigate(ROUTES.HOME);    // 'home'
navigate(ROUTES.LOGIN);   // 'login'
navigate(ROUTES.SIGNUP);  // 'signup'
navigate(ROUTES.ABOUT);   // 'about'
navigate(ROUTES.PROFILE); // 'profile'
navigate(ROUTES.ORDERS);  // 'orders'
navigate(ROUTES.SETTINGS);// 'settings'
```

---

## 📝 License

MIT © 2025 — Free to use for portfolio, hiring assignments, and commercial projects.

---

## 🙏 Acknowledgements

- [Fake Store API](https://fakestoreapi.com) — free product data, no auth required
- [DiceBear](https://dicebear.com) — auto-generated initials avatars
- [Tailwind CSS](https://tailwindcss.com) — utility-first CSS framework
- [Vite](https://vitejs.dev) — next-generation frontend build tool
