import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../lib/i18n";
import { Reveal } from "./ui/Reveal";
import { Honeycomb } from "./visuals/Honeycomb";

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setDone(true);
  };

  return (
    <section className="px-5 py-16 sm:px-8 sm:py-24">
      <Reveal className="mx-auto max-w-5xl">
        <div className="glass relative overflow-hidden rounded-[2.5rem] px-6 py-14 text-center sm:px-14 sm:py-20">
          <Honeycomb
            className="absolute inset-0 text-honey-200"
            opacity={0.07}
            scale={2}
          />
          <div
            className="animate-pulse-glow pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(237,178,62,0.35), transparent 70%)",
            }}
          />

          <div className="relative">
            <span className="chip mb-6">{t.newsletter.badge}</span>
            <h2 className="text-pretty text-4xl font-semibold sm:text-5xl">
              {t.newsletter.titleA}{" "}
              <span className="text-gold">{t.newsletter.titleHighlight}</span>{" "}
              {t.newsletter.titleB}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sand/75">
              {t.newsletter.subtext}
            </p>

            <div className="mx-auto mt-9 max-w-md">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center justify-center gap-3 rounded-full border border-honey-300/30 bg-honey-500/10 px-6 py-4 text-cream"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-honey-400 text-ink">
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                    {t.newsletter.success}
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={submit}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="newsletter-email" className="sr-only">
                      {t.newsletter.emailLabel}
                    </label>
                    <input
                      id="newsletter-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.newsletter.placeholder}
                      className="w-full flex-1 rounded-full border border-honey-200/15 bg-ink/50 px-5 py-3.5 text-cream placeholder:text-stone focus:border-honey-300/40 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-b from-honey-300 to-honey-500 px-6 py-3.5 font-semibold text-ink transition-all duration-300 hover:from-honey-200 hover:to-honey-400 hover:shadow-[0_14px_36px_-10px_rgba(237,178,62,0.8)]"
                    >
                      {t.newsletter.subscribe}
                      <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
