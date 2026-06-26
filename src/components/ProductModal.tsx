import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Product } from "../data/products";
import type { Lang } from "../data/translations";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { lockScroll, unlockScroll } from "../lib/scrollLock";
import { Honeycomb } from "./visuals/Honeycomb";
import { HoneyJar } from "./visuals/HoneyJar";

export function ProductModal({
  product,
  onClose,
}: {
  product: Product | null;
  onClose: () => void;
}) {
  const { addToCart, openCart } = useCart();
  const { lang, t } = useI18n();
  const other: Lang = lang === "en" ? "bg" : "en";
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) setQty(1);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [product, onClose]);

  const handleAdd = () => {
    if (!product) return;
    addToCart(product, qty);
    onClose();
    openCart();
  };

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/75 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={product.name[lang]}
            className="glass-strong relative z-[90] grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl sm:grid-cols-2"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.modal.close}
              className="glass absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-cream transition-colors hover:bg-honey-500/15"
            >
              <X className="h-5 w-5" />
            </button>

            {/* visual */}
            <div className="relative h-52 overflow-hidden sm:h-auto">
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(160deg, ${product.from}33, ${product.to}1a 58%, transparent)`,
                }}
              />
              <Honeycomb
                className="absolute inset-0 text-honey-200"
                opacity={0.12}
                scale={1.3}
              />
              <div
                className="animate-pulse-glow absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
                style={{
                  background: `radial-gradient(circle, ${product.from}77, transparent 70%)`,
                }}
              />
              <div className="absolute inset-0 grid place-items-center">
                <HoneyJar
                  from={product.from}
                  to={product.to}
                  className="animate-floaty h-[78%] w-auto drop-shadow-[0_28px_50px_rgba(0,0,0,0.5)]"
                />
              </div>
            </div>

            {/* details */}
            <div className="flex flex-col p-7 sm:p-8">
              {product.badge && (
                <span className="chip mb-4 w-fit">{product.badge[lang]}</span>
              )}
              <h3 className="font-display text-2xl font-semibold text-cream">
                {product.name[lang]}
              </h3>
              <p className="mt-1 text-honey-300/90">{product.name[other]}</p>

              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5 text-honey-300">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-stone">
                  4.9 · {t.modal.verified}
                </span>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-sand/70">
                {product.description[lang]}
              </p>

              {/* tasting notes */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-stone">
                  {t.modal.tastingNotes}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.notes[lang].map((note) => (
                    <span
                      key={note}
                      className="rounded-full border border-honey-200/15 bg-honey-500/5 px-3 py-1 text-xs text-sand/80"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* flavour profile: floral → robust */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-stone">
                  {t.modal.flavour}
                </p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-honey-500/10">
                  <motion.div
                    key={product.id}
                    initial={{ width: 0 }}
                    animate={{ width: `${product.flavor}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-honey-300 to-honey-600"
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[11px] text-stone">
                  <span>{t.modal.floral}</span>
                  <span>{t.modal.robust}</span>
                </div>
              </div>

              {/* origin + harvest */}
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-stone">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  {product.origin[lang]}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {t.modal.harvest}: {product.harvest[lang]}
                </span>
              </div>

              {/* pairings */}
              <div className="mt-5">
                <p className="text-xs uppercase tracking-wider text-stone">
                  {t.modal.pairings}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.pairings[lang].map((pairing) => (
                    <span
                      key={pairing}
                      className="rounded-full border border-honey-200/10 px-3 py-1 text-xs text-sand/70"
                    >
                      {pairing}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between gap-4 pt-7">
                <div className="flex items-center gap-1 rounded-full border border-honey-200/15 p-1">
                  <button
                    type="button"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label={t.cart.decrease}
                    className="grid h-8 w-8 place-items-center rounded-full text-cream transition-colors hover:bg-honey-500/15"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-7 text-center font-semibold text-cream">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((q) => q + 1)}
                    aria-label={t.cart.increase}
                    className="grid h-8 w-8 place-items-center rounded-full text-cream transition-colors hover:bg-honey-500/15"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span className="font-display text-2xl font-semibold text-cream">
                  €{product.price * qty}
                </span>
              </div>

              <motion.button
                type="button"
                onClick={handleAdd}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-6 py-3.5 font-semibold text-ink transition-colors duration-300 hover:from-honey-200 hover:to-honey-400 hover:shadow-[0_14px_36px_-10px_rgba(237,178,62,0.8)]"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
                {t.modal.add}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
