import { motion } from "framer-motion";
import { Droplet, FlaskConical, Leaf, Recycle } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { SectionHeading } from "./ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const benefitIcons = [Droplet, Leaf, Recycle, FlaskConical] as const;

export function Benefits() {
  const { t } = useI18n();
  const benefits = t.benefits.items.map((b, i) => ({
    ...b,
    icon: benefitIcons[i],
  }));

  return (
    <section id="benefits" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.benefits.eyebrow}
          title={t.benefits.title}
          subtitle={t.benefits.subtitle}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease }}
              whileHover={{ y: -6 }}
              className="group glass relative overflow-hidden rounded-3xl p-7 transition-[box-shadow,border-color] duration-300 hover:border-honey-300/25 hover:shadow-[0_30px_60px_-26px_rgba(226,154,30,0.55)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(237,178,62,0.35), transparent 70%)",
                }}
              />
              <span className="glow-sm relative grid h-14 w-14 place-items-center rounded-2xl border border-honey-200/15 bg-gradient-to-b from-honey-400/20 to-honey-600/10 text-honey-300">
                <b.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-6 font-display text-lg font-semibold text-cream">
                {b.title}
              </h3>
              <p className="relative mt-2.5 text-sm leading-relaxed text-sand/65">
                {b.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
