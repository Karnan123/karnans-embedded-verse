import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms (0, 100, 200, 300...). */
  delay?: number;
  /** Visibility ratio that triggers the reveal. */
  threshold?: number;
  /** Re-trigger every time it enters the viewport. Defaults to one-shot. */
  repeat?: boolean;
};

/**
 * Lightweight, Apple-style scroll reveal.
 * - Starts hidden with a subtle tilt, scale, and vertical offset.
 * - Animates to a clean, level visible state on intersection.
 * - Honours `prefers-reduced-motion` (see styles.css `[data-reveal]` rule).
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  threshold = 0.15,
  repeat = false,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (!repeat) io.unobserve(entry.target);
          } else if (repeat) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [threshold, repeat]);

  return (
    <Tag
      ref={ref as never}
      data-reveal=""
      data-reveal-visible={visible ? "" : undefined}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        "transform-gpu transition-all duration-700 ease-out will-change-[opacity,transform] motion-reduce:transition-none",
        visible
          ? "opacity-100 translate-y-0 scale-100 rotate-0 skew-x-0"
          : "opacity-0 translate-y-12 scale-95 -rotate-1 skew-x-1",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export default Reveal;

