import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products, type Product } from "../data/products";
import { bundleRate } from "./bundle";

export type CartItem = { product: Product; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  discountRate: number;
  discount: number;
  total: number;
  isOpen: boolean;
  isCheckoutOpen: boolean;
  addToCart: (product: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "wolfs-honey-cart";

/** Rehydrate persisted {id, qty} pairs against the current product catalog. */
function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    const items: CartItem[] = [];
    for (const entry of parsed) {
      if (!entry || typeof entry !== "object") continue;
      const { id, qty } = entry as { id?: unknown; qty?: unknown };
      const product = products.find((p) => p.id === id);
      const n = Number(qty);
      if (product && Number.isFinite(n) && n > 0) {
        items.push({ product, qty: Math.floor(n) });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Persist on every change (id + qty only, so catalog edits stay authoritative).
  useEffect(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items.map((i) => ({ id: i.product.id, qty: i.qty }))),
      );
    } catch {
      // ignore storage failures (private mode, quota)
    }
  }, [items]);

  const addToCart = useCallback((product: Product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + qty } : i,
        );
      }
      return [...prev, { product, qty }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.product.id !== id)
        : prev.map((i) => (i.product.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const openCheckout = useCallback(() => {
    setIsOpen(false);
    setIsCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.qty * i.product.price, 0),
    [items],
  );
  const discountRate = useMemo(() => bundleRate(count), [count]);
  const discount = useMemo(
    () => Math.round(subtotal * discountRate * 100) / 100,
    [subtotal, discountRate],
  );
  const total = useMemo(
    () => Math.round((subtotal - discount) * 100) / 100,
    [subtotal, discount],
  );

  const value = useMemo(
    () => ({
      items,
      count,
      subtotal,
      discountRate,
      discount,
      total,
      isOpen,
      isCheckoutOpen,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
    }),
    [
      items,
      count,
      subtotal,
      discountRate,
      discount,
      total,
      isOpen,
      isCheckoutOpen,
      addToCart,
      removeFromCart,
      setQty,
      clearCart,
      openCart,
      closeCart,
      openCheckout,
      closeCheckout,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
