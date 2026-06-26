import { motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { products } from "../data/products";
import { BUNDLE_TIERS } from "../lib/bundle";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { SectionHeading } from "./ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

/** Presentational box sizes — discount rate mirrors the cart's BUNDLE_TIERS. */
const BOX_TIERS = [
  { jars: 2, rate: 0 },
  { jars: 3, rate: 0.1 },
  { jars: 6, rate: 0.15 },
] as const;

const UNIT_PRICE = products[0]?.price ?? 10;

export function BuildYourBox() {
  const { t } = useI18n();
  const { addToCart, openCart, count, discountRate } = useCart();

  const addBox = (jars: number) => {
    for (let i = 0; i < jars; i++) {
      addToCart(products[i % products.length], 1);
    }
    openCart();
  };

  // Smallest tier the cart hasn't reached yet, for the live nudge.
  const nextTier = [...BUNDLE_TIERS]
    .sort((a, b) => a.minJars - b.minJars)
    .find((tier) => count < tier.minJars);

  return (
    <section id="bundle" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.bundle.eyebrow}
          title={
            <>
              {t.bundle.title1}
              <br className="hidden sm:block" /> {t.bundle.title2}
            </>
          }
          subtitle={t.bundle.subtitle}
        />

        {/* live saving status */}
        <div className="mx-auto mt-8 flex max-w-xl items-center justify-center">
          <span className="chip bg-honey-500/10">
            {discountRate > 0 ? (
              <>
                <Check className="h-3.5 w-3.5" />
                {t.bundle.applied} {Math.round(discountRate * 100)}%
              </>
            ) : nextTier ? (
              <>
                {t.bundle.addMore} {nextTier.minJars - count} {t.bundle.jars}{" "}
                {t.bundle.more} {Math.round(nextTier.rate * 100)}%{" "}
                {t.bundle.off}
              </>
            ) : null}
          </span>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-3">
          {BOX_TIERS.map((tier, i) => {
            const full = tier.jars * UNIT_PRICE;
            const price = Math.round(full * (1 - tier.rate));
            const best = i === BOX_TIERS.length - 1;
            const meta = t.bundle.tiers[i];
            return (
              <motion.div
                key={tier.jars}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease }}
                className={`glass relative flex flex-col rounded-3xl p-7 ${
                  best ? "border-honey-300/30 glow-md" : ""
                }`}
              >
                {best && (
                  <span className="chip absolute -top-3 left-1/2 -translate-x-1/2 bg-ink/80 backdrop-blur-md">
                    {t.bundle.bestValue}
                  </span>
                )}
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-semibold text-cream">
                    {meta.name}
                  </h3>
                  <span className="text-sm text-stone">
                    {tier.jars} {t.bundle.jars}
                  </span>
                </div>
                <p className="mt-1 text-sm text-sand/65">{meta.note}</p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="font-display text-3xl font-semibold text-cream">
                    €{price}
                  </span>
                  {tier.rate > 0 && (
                    <span className="mb-1 text-sm text-stone line-through">
                      €{full}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs font-medium text-honey-300">
                  {tier.rate > 0
                    ? `${t.bundle.save} ${Math.round(tier.rate * 100)}%`
                    : t.bundle.fullPrice}
                </p>

                <motion.button
                  type="button"
                  onClick={() => addBox(tier.jars)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 ${
                    best
                      ? "bg-gradient-to-b from-honey-300 to-honey-500 text-ink hover:from-honey-200 hover:to-honey-400"
                      : "border border-honey-200/15 bg-honey-500/5 text-cream hover:border-honey-300/30 hover:bg-honey-500/15"
                  }`}
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  {t.bundle.add}
                </motion.button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
