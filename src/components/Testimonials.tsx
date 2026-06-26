import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { testimonials } from "../data/testimonials";
import { useI18n } from "../lib/i18n";
import { SectionHeading } from "./ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -70 : 70, opacity: 0 }),
};

export function Testimonials() {
  const { lang, t: tr } = useI18n();
  const count = testimonials.length;
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  const active = ((page % count) + count) % count;
  const t = testimonials[active];

  const paginate = (dir: number) => setPage([page + dir, dir]);
  const goTo = (i: number) => setPage([i, i > active ? 1 : -1]);

  useEffect(() => {
    const id = setInterval(() => setPage(([p]) => [p + 1, 1]), 6000);
    return () => clearInterval(id);
  }, [page]);

  return (
    <section id="testimonials" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={tr.testimonials.eyebrow}
          title={tr.testimonials.title}
          subtitle={tr.testimonials.subtitle}
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="mx-auto mb-6 h-10 w-10 text-honey-400/40" />

          <div className="relative min-h-[18rem] sm:min-h-[15rem]">
            <AnimatePresence custom={direction} mode="wait">
              <motion.figure
                key={page}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease }}
                className="absolute inset-0 flex flex-col items-center text-center"
              >
                <div className="mb-5 flex items-center gap-1 text-honey-300">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-balance font-display text-xl font-medium leading-relaxed text-cream sm:text-2xl">
                  &ldquo;{t.quote[lang]}&rdquo;
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-honey-300 to-honey-600 font-display text-sm font-bold text-ink">
                    {t.initials}
                  </span>
                  <div className="text-left">
                    <div className="font-semibold text-cream">{t.name}</div>
                    <div className="text-sm text-stone">{t.role[lang]}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label={tr.testimonials.prev}
              className="grid h-11 w-11 place-items-center rounded-full border border-honey-200/15 text-cream transition-all duration-300 hover:border-honey-300/30 hover:bg-honey-500/10 active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`${tr.testimonials.goTo} ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 bg-honey-400"
                      : "w-2 bg-honey-200/25 hover:bg-honey-200/45"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label={tr.testimonials.next}
              className="grid h-11 w-11 place-items-center rounded-full border border-honey-200/15 text-cream transition-all duration-300 hover:border-honey-300/30 hover:bg-honey-500/10 active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
