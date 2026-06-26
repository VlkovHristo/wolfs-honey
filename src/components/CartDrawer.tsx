import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import type { Lang } from "../data/translations";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { HoneyJar } from "./visuals/HoneyJar";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    discount,
    discountRate,
    total,
    count,
    setQty,
    removeFromCart,
    openCheckout,
  } = useCart();
  const { lang, t } = useI18n();
  const other: Lang = lang === "en" ? "bg" : "en";

  useEffect(() => {
    if (!isOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [isOpen, closeCart]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-ink/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={t.cart.title}
            className="glass-strong fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-honey-200/10"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-honey-200/10 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-honey-300" />
                <h2 className="font-display text-lg font-semibold text-cream">
                  {t.cart.title}
                </h2>
                <span className="text-sm text-stone">({count})</span>
              </div>
              <button
                type="button"
                onClick={closeCart}
                aria-label={t.cart.close}
                className="grid h-9 w-9 place-items-center rounded-full text-sand/70 transition-colors hover:bg-honey-500/10 hover:text-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6 text-center">
                <div className="grid h-16 w-16 place-items-center rounded-full border border-honey-200/15 bg-honey-500/10">
                  <ShoppingBag className="h-7 w-7 text-honey-300/70" />
                </div>
                <p className="text-sand/70">{t.cart.empty}</p>
                <a
                  href="#products"
                  onClick={closeCart}
                  className="rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:from-honey-200 hover:to-honey-400"
                >
                  {t.cart.browse}
                </a>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li
                      key={item.product.id}
                      className="glass flex gap-4 rounded-2xl p-3"
                    >
                      <div className="grid h-20 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-honey-200/10 bg-ink/40">
                        <HoneyJar
                          from={item.product.from}
                          to={item.product.to}
                          className="h-16 w-auto"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <div>
                            <p className="font-medium text-cream">
                              {item.product.name[lang]}
                            </p>
                            <p className="text-xs text-stone">
                              {item.product.name[other]}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            aria-label={`${t.cart.remove}: ${item.product.name[lang]}`}
                            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-stone transition-colors hover:bg-honey-500/10 hover:text-honey-300"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center gap-1 rounded-full border border-honey-200/15 p-1">
                            <button
                              type="button"
                              onClick={() =>
                                setQty(item.product.id, item.qty - 1)
                              }
                              aria-label={t.cart.decrease}
                              className="grid h-7 w-7 place-items-center rounded-full text-cream transition-colors hover:bg-honey-500/15"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold text-cream">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setQty(item.product.id, item.qty + 1)
                              }
                              aria-label={t.cart.increase}
                              className="grid h-7 w-7 place-items-center rounded-full text-cream transition-colors hover:bg-honey-500/15"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-display font-semibold text-cream">
                            €{item.product.price * item.qty}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {items.length > 0 && (
              <div className="border-t border-honey-200/10 px-6 py-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-sand/70">{t.cart.subtotal}</span>
                  <span className="text-cream">€{subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="mt-1.5 flex items-center justify-between text-sm">
                    <span className="text-honey-300">
                      {t.cart.discount} (−{Math.round(discountRate * 100)}%)
                    </span>
                    <span className="text-honey-300">−€{discount}</span>
                  </div>
                )}
                <div className="mt-3 flex items-center justify-between border-t border-honey-200/10 pt-3">
                  <span className="text-sand/70">{t.cart.total}</span>
                  <span className="font-display text-xl font-semibold text-cream">
                    €{total}
                  </span>
                </div>
                <p className="mt-1 text-xs text-stone">{t.cart.taxes}</p>
                <button
                  type="button"
                  onClick={openCheckout}
                  className="mt-4 w-full rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-6 py-3.5 font-semibold text-ink transition-all duration-300 hover:from-honey-200 hover:to-honey-400 hover:shadow-[0_14px_36px_-10px_rgba(237,178,62,0.8)]"
                >
                  {t.cart.checkout} · €{total}
                </button>
                <p className="mt-3 text-center text-xs text-stone">
                  {t.cart.demo}
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
