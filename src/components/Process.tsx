import { motion } from "framer-motion";
import { Droplets, Flower2, PackageCheck, Snowflake } from "lucide-react";
import { useI18n } from "../lib/i18n";
import { SectionHeading } from "./ui/SectionHeading";

const ease = [0.22, 1, 0.36, 1] as const;

const stepIcons = [Flower2, Droplets, Snowflake, PackageCheck] as const;

export function Process() {
  const { t } = useI18n();
  const steps = t.process.steps.map((s, i) => ({ ...s, icon: stepIcons[i] }));

  return (
    <section id="process" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow={t.process.eyebrow}
          title={t.process.title}
          subtitle={t.process.subtitle}
        />

        <div className="relative mt-16">
          {/* horizontal rail (desktop) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-honey-200/15 md:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.3, ease }}
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px origin-left bg-gradient-to-r from-honey-300 via-honey-400 to-honey-600 md:block"
          />
          {/* vertical rail (mobile) */}
          <div className="absolute bottom-8 left-8 top-8 w-px bg-honey-200/15 md:hidden" />

          <div className="grid gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.25 + i * 0.15, ease }}
                className="relative z-10 flex items-start gap-5 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <div className="relative shrink-0">
                  <span className="glass-strong glow-sm grid h-16 w-16 place-items-center rounded-2xl text-honey-300">
                    <step.icon className="h-7 w-7" />
                  </span>
                  <span className="absolute -right-1.5 -top-1.5 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-b from-honey-300 to-honey-500 font-display text-xs font-bold text-ink">
                    {i + 1}
                  </span>
                </div>
                <div className="md:mt-6">
                  <h3 className="font-display text-lg font-semibold text-cream">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sand/65 md:mx-auto md:max-w-[15rem]">
                    {step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
