import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { Honeycomb } from "./visuals/Honeycomb";
import { HoneyJar } from "./visuals/HoneyJar";

const ease = [0.22, 1, 0.36, 1] as const;

const wordsContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

/** Renders text as individually-staggered, rising words. */
function StaggerWords({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariant}
          className={`me-[0.25em] inline-block ${className ?? ""}`}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

function FloatingChip({
  className,
  delay,
  children,
}: {
  className: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease }}
      className={`glass-strong absolute z-20 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 text-sm shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function Hero() {
  const { t } = useI18n();
  const { scrollY } = useScroll();
  const yVisual = useTransform(scrollY, [0, 700], [0, -70]);
  const yText = useTransform(scrollY, [0, 700], [0, 50]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="relative overflow-hidden pb-10 pt-28 sm:pt-36 lg:pb-20"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* ---- copy ---- */}
        <motion.div style={{ y: yText, opacity }} className="relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="chip"
          >
            <Sparkles className="h-3.5 w-3.5" />
            {t.hero.badge}
          </motion.span>

          <motion.h1
            variants={wordsContainer}
            initial="hidden"
            animate="show"
            className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-6xl lg:text-7xl"
          >
            <StaggerWords text={t.hero.headline1} />
            <br />
            <StaggerWords text={t.hero.headline2} className="text-gold" />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-6 max-w-xl text-base leading-relaxed text-sand/80 sm:text-lg"
          >
            {t.hero.subhead}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#products"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-7 py-3.5 font-semibold text-ink transition-colors duration-300 hover:from-honey-200 hover:to-honey-400 hover:shadow-[0_16px_40px_-12px_rgba(237,178,62,0.8)]"
            >
              {t.hero.shopCta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.a>
            <a
              href="#story"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-honey-200/15 px-7 py-3.5 font-medium text-cream transition-all duration-300 hover:border-honey-200/30 hover:bg-honey-500/5"
            >
              {t.hero.storyCta}
            </a>
          </motion.div>

          {/* trust row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.36, ease }}
            className="mt-10 flex items-center gap-4"
          >
            <div className="flex -space-x-3">
              {["#F3C667", "#E29A1E", "#C77C12", "#9E5D0F"].map((c, i) => (
                <span
                  key={i}
                  className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink text-[11px] font-bold text-ink"
                  style={{ background: c }}
                >
                  {["A", "M", "K", "S"][i]}
                </span>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-1 text-honey-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-0.5 text-stone">
                <span className="text-cream">{t.hero.ratingStrong}</span>{" "}
                {t.hero.ratingRest}
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- visual ---- */}
        <motion.div
          style={{ y: yVisual }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-square">
            {/* glow orb */}
            <div
              className="animate-pulse-glow absolute left-1/2 top-1/2 h-[78%] w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(237,178,62,0.55), rgba(199,124,18,0.15) 55%, transparent 72%)",
              }}
            />
            {/* rotating honeycomb disc */}
            <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full opacity-[0.13]">
              <Honeycomb
                className="animate-spin-slow h-full w-full text-honey-200"
                opacity={1}
                scale={1.6}
              />
            </div>
            {/* ring */}
            <div className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-honey-200/15" />

            {/* jar */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="absolute inset-0 grid place-items-center"
            >
              <HoneyJar
                from="#F8DC9B"
                to="#C77C12"
                className="animate-floaty h-[68%] w-auto drop-shadow-[0_30px_60px_rgba(199,124,18,0.45)]"
              />
            </motion.div>

            {/* floating chips */}
            <FloatingChip
              className="left-0 top-[14%] animate-floaty-slow"
              delay={0.5}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-honey-400/20 text-honey-300">
                <Sparkles className="h-4 w-4" />
              </span>
              <span className="font-medium text-cream">{t.hero.chipRaw}</span>
            </FloatingChip>

            <FloatingChip
              className="bottom-[12%] right-0 animate-floaty-slow [animation-delay:-3s]"
              delay={0.7}
            >
              <span className="flex items-center gap-0.5 text-honey-300">
                <Star className="h-4 w-4 fill-current" />
              </span>
              <span>
                <span className="font-semibold text-cream">4.9</span>
                <span className="text-stone"> · {t.modal.verified}</span>
              </span>
            </FloatingChip>

            {/* honey droplets */}
            <span className="absolute left-[22%] top-[40%] h-2.5 w-2.5 rounded-full bg-honey-300/70 [animation:drip_5s_ease-in-out_infinite]" />
            <span className="absolute right-[26%] top-[30%] h-2 w-2 rounded-full bg-honey-200/60 [animation:drip_6s_ease-in-out_infinite_1.5s]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
