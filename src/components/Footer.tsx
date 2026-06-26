import type { ReactNode } from "react";
import { useI18n } from "../lib/i18n";

const socials: { label: string; icon: ReactNode }[] = [
  {
    label: "Instagram",
    icon: (
      <svg
        viewBox="0 0 24 24"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "X",
    icon: (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12z" />
      </svg>
    ),
  },
];

export function Footer() {
  const { t } = useI18n();
  const columns = [
    { title: t.footer.shop, links: t.footer.shopLinks },
    { title: t.footer.company, links: t.footer.companyLinks },
    { title: t.footer.support, links: t.footer.supportLinks },
  ];

  return (
    <footer className="relative border-t border-honey-200/10">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* brand */}
          <div>
            <a href="#top" className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 32" className="h-8 w-8">
                <defs>
                  <linearGradient id="foot-g" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#F8DC9B" />
                    <stop offset="0.5" stopColor="#F3C667" />
                    <stop offset="1" stopColor="#C77C12" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 1.5 27.6 8.25 V21.75 L16 28.5 4.4 21.75 V8.25 Z"
                  fill="url(#foot-g)"
                />
                <path
                  d="M16 8.5c2.7 3.5 4.3 5.9 4.3 8a4.3 4.3 0 1 1-8.6 0c0-2.1 1.6-4.5 4.3-8z"
                  fill="#0B0A09"
                  opacity="0.85"
                />
              </svg>
              <span className="font-display text-lg font-semibold tracking-tight text-cream">
                Wolf&rsquo;s <span className="text-honey-400">Honey</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-sand/60">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-honey-200/15 text-sand/70 transition-all duration-300 hover:border-honey-300/30 hover:bg-honey-500/10 hover:text-honey-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-cream">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-sand/60 transition-colors hover:text-honey-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm text-stone sm:flex-row">
          <p>© 2026 {t.footer.rights}</p>
          <div className="flex gap-6">
            <a href="#top" className="transition-colors hover:text-honey-300">
              {t.footer.privacy}
            </a>
            <a href="#top" className="transition-colors hover:text-honey-300">
              {t.footer.terms}
            </a>
            <a href="#top" className="transition-colors hover:text-honey-300">
              {t.footer.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
