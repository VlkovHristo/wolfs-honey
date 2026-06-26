import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type CounterProps = {
  to: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

/** Counts up from 0 → `to` once it scrolls into view. */
export function Counter({
  to,
  decimals = 0,
  duration = 1.8,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toFixed(decimals)}
      {suffix}
    </span>
  );
}
