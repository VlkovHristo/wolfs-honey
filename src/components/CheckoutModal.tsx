import { AnimatePresence, motion } from "framer-motion";
import { Check, Lock, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { lockScroll, unlockScroll } from "../lib/scrollLock";

const ease = [0.22, 1, 0.36, 1] as const;

function Field({
  label,
  type = "text",
  autoComplete,
  className = "",
}: {
  label: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-xs uppercase tracking-wider text-stone">
        {label}
      </span>
      <input
        type={type}
        required
        autoComplete={autoComplete}
        className="rounded-xl border border-honey-200/15 bg-ink/40 px-3.5 py-2.5 text-sm text-cream outline-none transition-colors placeholder:text-stone focus:border-honey-300/40"
      />
    </label>
  );
}

export function CheckoutModal() {
  const {
    items,
    subtotal,
    discount,
    discountRate,
    total,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
  } = useCart();
  const { lang, t } = useI18n();
  const [placed, setPlaced] = useState(false);

  useEffect(() => {
    if (isCheckoutOpen) setPlaced(false);
  }, [isCheckoutOpen]);

  useEffect(() => {
    if (!isCheckoutOpen) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCheckout();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [isCheckoutOpen, closeCheckout]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clearCart();
  };

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <motion.div
          key="checkout"
          className="fixed inset-0 z-[80] grid place-items-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={closeCheckout}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.checkout.title}
            className="glass-strong relative z-[90] max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 10 }}
            transition={{ duration: 0.3, ease }}
          >
            <button
              type="button"
              onClick={closeCheckout}
              aria-label={t.checkout.close}
              className="glass absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full text-cream transition-colors hover:bg-honey-500/15"
            >
              <X className="h-5 w-5" />
            </button>

            {placed ? (
              <div className="flex flex-col items-center gap-5 px-8 py-16 text-center">
                <motion.div
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-b from-honey-300 to-honey-500 text-ink"
                >
                  <Check className="h-8 w-8" strokeWidth={2.5} />
                </motion.div>
                <h2 className="font-display text-2xl font-semibold text-cream">
                  {t.checkout.successTitle}
                </h2>
                <p className="max-w-md text-sm leading-relaxed text-sand/70">
                  {t.checkout.successBody}
                </p>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-7 py-3 font-semibold text-ink transition-all duration-300 hover:from-honey-200 hover:to-honey-400"
                >
                  {t.checkout.continue}
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="px-8 py-20 text-center text-sand/70">
                {t.checkout.empty}
              </div>
            ) : (
              <div className="grid sm:grid-cols-[1.1fr_0.9fr]">
                {/* form */}
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col p-7 sm:p-8"
                >
                  <h2 className="font-display text-xl font-semibold text-cream">
                    {t.checkout.title}
                  </h2>
                  <p className="mt-1 text-sm text-sand/65">
                    {t.checkout.contact}
                  </p>

                  <div className="mt-6 grid gap-4">
                    <Field label={t.checkout.fullName} autoComplete="name" />
                    <Field
                      label={t.checkout.email}
                      type="email"
                      autoComplete="email"
                    />
                    <Field
                      label={t.checkout.address}
                      autoComplete="street-address"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        label={t.checkout.city}
                        autoComplete="address-level2"
                      />
                      <Field
                        label={t.checkout.postal}
                        autoComplete="postal-code"
                      />
                    </div>
                    <Field
                      label={t.checkout.country}
                      autoComplete="country-name"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-6 py-3.5 font-semibold text-ink transition-colors duration-300 hover:from-honey-200 hover:to-honey-400"
                  >
                    <Lock className="h-4 w-4" strokeWidth={2.4} />
                    {t.checkout.placeOrder} · €{total}
                  </motion.button>
                  <p className="mt-3 text-center text-xs text-stone">
                    {t.checkout.demoNote}
                  </p>
                </form>

                {/* summary */}
                <div className="border-t border-honey-200/10 bg-ink/30 p-7 sm:border-l sm:border-t-0 sm:p-8">
                  <h3 className="font-display text-sm uppercase tracking-wider text-stone">
                    {t.checkout.summary}
                  </h3>
                  <ul className="mt-5 flex flex-col gap-3">
                    {items.map((item) => (
                      <li
                        key={item.product.id}
                        className="flex items-start justify-between gap-3 text-sm"
                      >
                        <span className="text-sand/80">
                          {item.product.name[lang]}
                          <span className="text-stone"> ×{item.qty}</span>
                        </span>
                        <span className="text-cream">
                          €{item.product.price * item.qty}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 space-y-1.5 border-t border-honey-200/10 pt-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-sand/70">
                        {t.checkout.subtotal}
                      </span>
                      <span className="text-cream">€{subtotal}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-honey-300">
                        <span>
                          {t.checkout.discount} (−
                          {Math.round(discountRate * 100)}%)
                        </span>
                        <span>−€{discount}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sand/70">
                        {t.checkout.shipping}
                      </span>
                      <span className="text-honey-300">{t.checkout.free}</span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-honey-200/10 pt-4">
                    <span className="text-sand/70">{t.checkout.total}</span>
                    <span className="font-display text-xl font-semibold text-cream">
                      €{total}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
