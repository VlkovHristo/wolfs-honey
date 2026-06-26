import { AnimatePresence, motion } from "framer-motion";
import { Check, Eye, MapPin, Plus } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { products, type Product } from "../data/products";
import type { Lang } from "../data/translations";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { ProductModal } from "./ProductModal";
import { SectionHeading } from "./ui/SectionHeading";
import { Honeycomb } from "./visuals/Honeycomb";
import { HoneyJar } from "./visuals/HoneyJar";

const ease = [0.22, 1, 0.36, 1] as const;

function ProductCard({
  product,
  index,
  onQuickView,
}: {
  product: Product;
  index: number;
  onQuickView: (p: Product) => void;
}) {
  const { addToCart } = useCart();
  const { lang, t } = useI18n();
  const other: Lang = lang === "en" ? "bg" : "en";
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => void (timer.current && clearTimeout(timer.current)),
    [],
  );

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease }}
      whileHover={{ y: -8 }}
      className="group glass relative flex flex-col overflow-hidden rounded-3xl transition-[box-shadow,border-color] duration-300 hover:border-honey-300/25 hover:shadow-[0_34px_70px_-24px_rgba(226,154,30,0.5)]"
    >
      {/* visual — opens quick view */}
      <button
        type="button"
        onClick={() => onQuickView(product)}
        aria-label={`${t.products.quickView}: ${product.name[lang]}`}
        className="relative block aspect-[5/4] w-full overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(160deg, ${product.from}2b, ${product.to}14 58%, transparent)`,
          }}
        />
        <Honeycomb
          className="absolute inset-0 text-honey-200"
          opacity={0.12}
          scale={1.2}
        />
        <div
          className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, ${product.from}66, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 grid place-items-center">
          <HoneyJar
            from={product.from}
            to={product.to}
            className="h-[82%] w-auto drop-shadow-[0_22px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-out group-hover:-rotate-2 group-hover:scale-105"
          />
        </div>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 bg-gradient-to-t from-ink/85 to-transparent pb-4 pt-12 text-sm font-medium text-cream opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Eye className="h-4 w-4" /> {t.products.quickView}
        </span>
        {product.badge && (
          <span className="chip absolute left-4 top-4 bg-ink/60 backdrop-blur-md">
            {product.badge[lang]}
          </span>
        )}
      </button>

      {/* body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-cream">
              {product.name[lang]}
            </h3>
            <p className="mt-1 text-sm text-honey-300/90">
              {product.name[other]}
            </p>
          </div>
          <span className="font-display text-xl font-semibold text-cream">
            €{product.price}
          </span>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-sand/65">
          {product.description[lang]}
        </p>

        <div className="mt-auto pt-5">
          <div className="mb-4 flex items-center gap-1.5 text-xs text-stone">
            <MapPin className="h-3.5 w-3.5" />
            {product.origin[lang]}
          </div>
          <motion.button
            type="button"
            onClick={handleAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            aria-label={`${t.products.add}: ${product.name[lang]}`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-honey-200/15 bg-honey-500/5 px-5 py-3 text-sm font-semibold text-cream transition-colors duration-300 hover:border-honey-300/30 hover:bg-honey-500/15"
          >
            <AnimatePresence mode="wait" initial={false}>
              {added ? (
                <motion.span
                  key="added"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 text-honey-300"
                >
                  <Check className="h-4 w-4" strokeWidth={2.5} />
                  {t.products.added}
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  {t.products.add}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

export function Products() {
  const { t } = useI18n();
  const [active, setActive] = useState<Product | null>(null);
  const closeModal = useCallback(() => setActive(null), []);

  return (
    <section id="products" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.products.eyebrow}
          title={
            <>
              {t.products.title1}
              <br className="hidden sm:block" /> {t.products.title2}
            </>
          }
          subtitle={t.products.subtitle}
        />
        <div className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2">
          {products.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              onQuickView={setActive}
            />
          ))}
        </div>
      </div>

      <ProductModal product={active} onClose={closeModal} />
    </section>
  );
}
