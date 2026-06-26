import { Honeycomb } from "./Honeycomb";

/** Fixed, full-viewport atmosphere layer rendered behind everything. */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* deep warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(226,154,30,0.10), transparent 55%), radial-gradient(100% 60% at 100% 100%, rgba(158,93,15,0.10), transparent 60%)",
        }}
      />

      {/* drifting amber orbs */}
      <div
        className="animate-drift absolute -left-40 -top-48 h-[42rem] w-[42rem] rounded-full blur-[130px]"
        style={{
          background:
            "radial-gradient(circle, rgba(237,178,62,0.20), transparent 70%)",
        }}
      />
      <div
        className="animate-drift absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full blur-[130px] [animation-delay:-7s]"
        style={{
          background:
            "radial-gradient(circle, rgba(199,124,18,0.18), transparent 70%)",
        }}
      />
      <div
        className="animate-drift absolute -bottom-40 left-1/4 h-[36rem] w-[36rem] rounded-full blur-[140px] [animation-delay:-14s]"
        style={{
          background:
            "radial-gradient(circle, rgba(243,198,103,0.12), transparent 70%)",
        }}
      />

      {/* honeycomb texture */}
      <Honeycomb
        className="absolute inset-0 text-honey-300"
        opacity={0.05}
        scale={2.4}
      />

      {/* film grain */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
