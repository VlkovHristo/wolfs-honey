import { useI18n } from "../lib/i18n";
import { Counter } from "./ui/Counter";
import { Reveal } from "./ui/Reveal";

export function StatsStrip() {
  const { t } = useI18n();

  const stats = [
    { to: 12, suffix: "k+", decimals: 0, label: t.stats.jars },
    { to: 4.9, suffix: "", decimals: 1, label: t.stats.rating },
    { to: 38, suffix: "", decimals: 0, label: t.stats.hives },
    { to: 100, suffix: "%", decimals: 0, label: t.stats.purity },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 sm:px-8">
      <Reveal>
        <div className="glass grid grid-cols-2 gap-y-8 rounded-3xl px-6 py-9 sm:px-10 md:grid-cols-4 md:divide-x md:divide-honey-200/10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-center md:px-4"
            >
              <span className="font-display text-4xl font-semibold text-gold sm:text-5xl">
                <Counter to={s.to} decimals={s.decimals} suffix={s.suffix} />
              </span>
              <span className="mt-2 text-sm uppercase tracking-wider text-stone">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
