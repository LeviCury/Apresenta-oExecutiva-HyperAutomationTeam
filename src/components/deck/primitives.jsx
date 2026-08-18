import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge } from "../ui/badge";
import { MotionCard } from "../ui/card";
import { cn } from "../../lib/utils";

export const EASE = [0.22, 1, 0.36, 1];

export const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 90 : -90,
    scale: 0.975,
    rotateY: direction > 0 ? 2.5 : -2.5,
    filter: "blur(14px)",
  }),
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -65 : 65,
    scale: 0.985,
    rotateY: direction > 0 ? -1.8 : 1.8,
    filter: "blur(10px)",
  }),
};

export function LogoMark({ dark = false, className }) {
  return (
    <span
      className={cn(
        "brand-bars flex h-7 items-end gap-[3px] rounded-lg p-1",
        dark ? "bg-white/[.08]" : "bg-[#172a39]/[.06]",
        className,
      )}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </span>
  );
}

export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}) {
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(reducedMotion ? value : 0);

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const duration = 950;
    const precision = 10 ** decimals;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 4;
      setDisplay(Math.round(value * eased * precision) / precision);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [decimals, reducedMotion, value]);

  return (
    <>
      {prefix}
      {display.toLocaleString("pt-BR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </>
  );
}

export function SceneHeading({
  eyebrow,
  title,
  description,
  aside,
  dark = false,
  className,
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.56, ease: EASE }}
      className={cn(
        "flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="max-w-[980px]">
        {eyebrow ? (
          <Badge variant={dark ? "dark" : "default"} className="mb-3">
            {eyebrow}
          </Badge>
        ) : null}
        <h1
          className={cn(
            "font-display text-[clamp(2rem,3.3vw,4.15rem)] font-semibold leading-[.98] tracking-[-0.065em]",
            dark ? "text-white" : "text-[#172a39]",
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-3 max-w-[850px] text-[clamp(.88rem,1.1vw,1.1rem)] leading-7",
              dark ? "text-white/58" : "text-[#5d7180]",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </motion.header>
  );
}

export function Scene({
  children,
  dark = false,
  className,
  contentClassName,
}) {
  return (
    <div
      className={cn(
        "slide-scroll relative h-full overflow-y-auto overflow-x-hidden",
        dark ? "bg-[#0d1c27] text-white" : "bg-[#f8f3e9] text-[#172a39]",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0",
          dark ? "dark-grid" : "deck-grid",
        )}
        aria-hidden="true"
      />
      <div
        className="noise-texture pointer-events-none absolute inset-0 mix-blend-soft-light"
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute -right-40 -top-44 size-[34rem] rounded-full blur-[110px]",
          dark ? "bg-[#00a896]/12" : "bg-[#00a896]/10",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-64 -left-48 size-[38rem] rounded-full blur-[130px]",
          dark ? "bg-[#a5222f]/12" : "bg-[#a5222f]/[.07]",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "compact-on-short relative mx-auto flex min-h-full w-full max-w-[1580px] flex-col px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-8 2xl:px-16",
          contentClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}

export function MetricCard({
  icon: Icon,
  value,
  decimals,
  prefix,
  suffix,
  label,
  delta,
  tone = "positive",
  dark = false,
  delay = 0,
  className,
}) {
  return (
    <MotionCard
      glow={!dark}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: EASE }}
      className={cn(
        "min-h-[118px] p-5",
        dark &&
          "border-white/10 bg-white/[.055] text-white shadow-[0_22px_60px_rgba(0,0,0,.18)]",
        tone === "negative" &&
          (dark
            ? "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#e95a65]"
            : "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#a5222f]"),
        tone !== "negative" &&
          (dark
            ? "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#00d6c2]"
            : "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#00a896]"),
        className,
      )}
    >
      <div
        className={cn(
          "mb-3 flex items-center justify-between",
          dark ? "text-white/50" : "text-[#6d7f8b]",
        )}
      >
        {Icon ? <Icon className="size-4" strokeWidth={1.8} /> : <span />}
        <span
          className={cn(
            "size-1.5 animate-pulse-soft rounded-full",
            tone === "negative" ? "bg-[#d94b57]" : "bg-[#00a896]",
          )}
        />
      </div>
      <strong
        className={cn(
          "font-display block text-[clamp(1.8rem,2.4vw,2.7rem)] font-semibold leading-none tracking-[-0.06em]",
          dark ? "text-white" : "text-[#172a39]",
        )}
      >
        <AnimatedNumber
          value={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      </strong>
      <div className="mt-2 flex items-center justify-between gap-3">
        <span
          className={cn(
            "text-xs font-semibold",
            dark ? "text-white/58" : "text-[#526875]",
          )}
        >
          {label}
        </span>
        {delta ? (
          <small
            className={cn(
              "whitespace-nowrap text-[10px] font-bold",
              tone === "negative"
                ? "text-[#d94b57]"
                : dark
                  ? "text-[#6be5d6]"
                  : "text-[#16806f]",
            )}
          >
            {delta}
          </small>
        ) : null}
      </div>
    </MotionCard>
  );
}

export function SectionLabel({ children, dark = false, className }) {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em]",
        dark ? "text-white/42" : "text-[#71838e]",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          dark ? "bg-[#00d6c2]/55" : "bg-[#00a896]/55",
        )}
      />
      {children}
    </div>
  );
}
