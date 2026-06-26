import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "../data/products";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { HoneyJar } from "./visuals/HoneyJar";

const featured = products[0];

/** Compact buy bar that appears once the Products section is scrolled past. */
export function StickyBuyBar() {
  const { addToCart, openCart, isOpen, isCheckoutOpen } = useCart();
  const { lang, t } = useI18n();
  const [past, setPast] = useState(false);

  useEffect(() => {
    const section = document.getElementById("products");
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setPast(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const show = past && !isOpen && !isCheckoutOpen;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4"
        >
          <div className="glass-strong flex w-full max-w-2xl items-center gap-4 rounded-full py-2.5 pl-3 pr-2.5 shadow-[0_18px_50px_-16px_rgba(0,0,0,0.7)]">
            <div className="grid h-11 w-9 shrink-0 place-items-center overflow-hidden rounded-xl border border-honey-200/10 bg-ink/40">
              <HoneyJar
                from={featured.from}
                to={featured.to}
                className="h-9 w-auto"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-cream">
                {featured.name[lang]}
              </p>
              <p className="text-xs text-stone">€{featured.price}</p>
            </div>
            <motion.button
              type="button"
              onClick={() => {
                addToCart(featured, 1);
                openCart();
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              aria-label={`${t.products.add}: ${featured.name[lang]}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-300 hover:from-honey-200 hover:to-honey-400"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              <span className="hidden sm:inline">{t.products.add}</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
