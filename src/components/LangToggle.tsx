import { Languages } from "lucide-react";
import { type Lang } from "../data/translations";
import { useI18n } from "../lib/i18n";

const options: Lang[] = ["en", "bg"];

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      className={`flex items-center gap-1 rounded-full border border-honey-200/15 p-1 ${className}`}
      role="group"
      aria-label={t.lang.label}
    >
      <Languages className="ml-1 h-3.5 w-3.5 text-stone" aria-hidden="true" />
      {options.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${
            lang === l
              ? "bg-gradient-to-b from-honey-300 to-honey-500 text-ink"
              : "text-sand/70 hover:text-cream"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
