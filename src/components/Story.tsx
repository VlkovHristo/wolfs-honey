import { motion } from "framer-motion";
import { Leaf, Microscope, ShieldCheck } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { Reveal } from "./ui/Reveal";
import { Honeycomb } from "./visuals/Honeycomb";
import { HoneyJar } from "./visuals/HoneyJar";
import { RhodopeMap } from "./visuals/RhodopeMap";

const ease = [0.22, 1, 0.36, 1] as const;

const factIcons = [Leaf, Microscope, ShieldCheck] as const;

export function Story() {
  const { t } = useI18n();
  const facts = t.story.facts.map((f, i) => ({ ...f, icon: factIcons[i] }));

  return (
    <section id="story" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        {/* visual */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="relative"
        >
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(150deg, rgba(243,198,103,0.22), rgba(199,124,18,0.10) 55%, transparent)",
              }}
            />
            <Honeycomb
              className="absolute inset-0 text-honey-200"
              opacity={0.1}
              scale={1.6}
            />
            <div
              className="animate-pulse-glow absolute left-1/2 top-1/2 h-2/3 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(237,178,62,0.4), transparent 70%)",
              }}
            />
            <div className="absolute inset-0 grid place-items-center">
              <HoneyJar
                from="#F4C45E"
                to="#9E5D0F"
                className="animate-floaty h-3/5 w-auto drop-shadow-[0_30px_60px_rgba(199,124,18,0.5)]"
              />
            </div>

            <RhodopeMap
              className="animate-floaty-slow absolute left-4 top-5 w-40 sm:w-44"
              title={t.story.mapTitle}
              pinLabel={t.story.mapPin}
            />
            <div className="glass-strong animate-floaty-slow absolute bottom-6 right-5 rounded-2xl px-4 py-2.5 text-sm [animation-delay:-4s]">
              <span className="font-semibold text-honey-300">
                {t.story.chipFamilyA}
              </span>{" "}
              <span className="text-stone">{t.story.chipFamilyB}</span>
            </div>
          </div>
        </motion.div>

        {/* narrative */}
        <div>
          <Reveal>
            <span className="chip mb-5">{t.story.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="text-pretty text-4xl font-semibold sm:text-5xl">
              {t.story.heading}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 leading-relaxed text-sand/75">{t.story.p1}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-sand/75">{t.story.p2}</p>
          </Reveal>

          <div className="mt-9 flex flex-col gap-5">
            {facts.map((f, i) => (
              <Reveal key={f.title} delay={0.2 + i * 0.08}>
                <div className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-honey-200/15 bg-honey-500/10 text-honey-300">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-cream">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-sand/65">
                      {f.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
