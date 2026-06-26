import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";
import { useI18n } from "../lib/i18n";
import { LangToggle } from "./LangToggle";
import { WolfMark } from "./visuals/WolfMark";

const links = [
  { key: "collection", href: "#products" },
  { key: "origins", href: "#story" },
  { key: "benefits", href: "#benefits" },
  { key: "process", href: "#process" },
  { key: "reviews", href: "#testimonials" },
] as const;

function Logo({ label }: { label: string }) {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={label}>
      <WolfMark className="h-9 w-9 drop-shadow-[0_0_10px_rgba(237,178,62,0.45)]" />
      <span className="font-display text-lg font-semibold tracking-tight text-cream">
        Wolf&rsquo;s <span className="text-honey-400">Honey</span>
      </span>
    </a>
  );
}

function CartButton({
  count,
  onClick,
  label,
  ariaLabel,
}: {
  count: number;
  onClick: () => void;
  label: string;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-4 py-2 text-sm font-semibold text-ink transition-all duration-300 hover:from-honey-200 hover:to-honey-400 hover:shadow-[0_10px_30px_-8px_rgba(237,178,62,0.7)]"
    >
      <ShoppingBag className="h-4 w-4" strokeWidth={2.4} />
      <span>{label}</span>
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key={count}
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 600, damping: 18 }}
            className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-honey-300 ring-2 ring-honey-400/40"
          >
            {count}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const { count, openCart } = useCart();
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: mark the section currently crossing the upper third active.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActive(topmost.target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "glass-strong border-b border-honey-200/10"
          : "border-b border-transparent"
      }`}
    >
      <div className="relative">
        {/* scroll-progress line pinned to the bottom edge of the bar */}
        <motion.div
          style={{ scaleX: progress }}
          className={`absolute bottom-0 left-0 h-px w-full origin-left bg-gradient-to-r from-honey-300 via-honey-400 to-honey-600 transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Logo label={t.nav.home} />

          <div className="hidden items-center gap-8 md:flex">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative text-sm transition-colors hover:text-cream ${
                    isActive ? "text-cream" : "text-sand/80"
                  }`}
                >
                  {t.nav[l.key]}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-honey-400 transition-all duration-300 group-hover:w-full ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <LangToggle className="hidden sm:flex" />
            <div className="hidden sm:block">
              <CartButton
                count={count}
                onClick={openCart}
                label={t.nav.shop}
                ariaLabel={t.nav.openCart}
              />
            </div>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full text-cream md:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong overflow-hidden border-t border-honey-200/10 md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-sand/85 transition-colors hover:bg-honey-500/10 hover:text-cream"
                >
                  {t.nav[l.key]}
                </a>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3 px-1 pb-1">
                <LangToggle />
                <CartButton
                  count={count}
                  onClick={() => {
                    setOpen(false);
                    openCart();
                  }}
                  label={t.nav.shop}
                  ariaLabel={t.nav.openCart}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
