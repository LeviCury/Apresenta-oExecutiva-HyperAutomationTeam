import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
    <svg
      viewBox="0 0 86 64"
      className={cn("h-8 w-11 shrink-0", className)}
      aria-hidden="true"
    >
      <path fill={dark ? "#5d86a5" : "#2c5372"} d="M0 14h14v50H0z" />
      <path
        fill="#c7b475"
        d="M14 64V29C14 12 23 5 35 5s22 7 22 24v35H43V30c0-8-3-13-8-13s-8 5-8 13v34H14z"
      />
      <path
        fill="#e83948"
        d="M43 64V29C43 12 52 5 64 5s22 7 22 24v35H72V30c0-8-3-13-8-13s-8 5-8 13v34H43z"
      />
    </svg>
  );
}

export function MinervaWordmark({ className }) {
  return (
    <span
      className={cn(
        "flex items-baseline gap-1 font-display text-sm font-extrabold leading-none tracking-[-0.055em]",
        className,
      )}
      aria-label="Minerva Foods"
    >
      <span className="text-[#2c5372]">minerva</span>
      <span className="text-[#e83948]">foods</span>
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
  titleClassName,
  description,
  descriptionClassName,
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
        "flex flex-col gap-2.5 lg:flex-row lg:items-end lg:justify-between",
        className,
      )}
    >
      <div className="max-w-[1040px]">
        {eyebrow ? (
          <Badge variant={dark ? "dark" : "default"} className="mb-2">
            {eyebrow}
          </Badge>
        ) : null}
        <h1
          className={cn(
            "font-display text-[clamp(1.75rem,2.55vw,3.2rem)] font-semibold leading-[1] tracking-[-0.055em]",
            dark ? "text-white" : "text-[#2c5372]",
            titleClassName,
          )}
        >
          {title}
        </h1>
        {description ? (
          <p
            className={cn(
              "mt-2 max-w-[900px] text-[clamp(.9rem,.95vw,1.02rem)] leading-6",
              dark ? "text-white/75" : "text-[#426a88]",
              descriptionClassName,
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
  fitKey,
  className,
  contentClassName,
}) {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = contentRef.current;
    if (!viewport || !content) return undefined;

    let frame;
    const measure = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const availableWidth = viewport.clientWidth;
        const availableHeight = viewport.clientHeight;
        const previousStyles = {
          left: content.style.left,
          width: content.style.width,
          maxWidth: content.style.maxWidth,
          transform: content.style.transform,
        };

        content.style.left = "0";
        content.style.width = "100%";
        content.style.maxWidth = "1880px";
        content.style.transform = "none";

        const contentWidth = content.scrollWidth;
        const contentHeight = content.scrollHeight;

        content.style.left = previousStyles.left;
        content.style.width = previousStyles.width;
        content.style.maxWidth = previousStyles.maxWidth;
        content.style.transform = previousStyles.transform;

        if (!availableWidth || !availableHeight || !contentWidth || !contentHeight) {
          return;
        }

        // Amplia até 1.3x quando sobra espaço, para maximizar a legibilidade em TV.
        const targetScale = Math.min(
          1.3,
          (availableWidth - 2) / contentWidth,
          (availableHeight - 2) / contentHeight,
        );

        setScale((current) =>
          Math.abs(current - targetScale) < 0.002 ? current : targetScale,
        );
      });
    };

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    document.fonts?.ready.then(measure);
    measure();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [fitKey]);

  return (
    <div
      ref={viewportRef}
      className={cn(
        "slide-scroll relative h-full overflow-hidden",
        dark ? "bg-[#2c5372] text-white" : "bg-white text-[#2c5372]",
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
          dark ? "bg-[#e83948]/12" : "bg-[#e83948]/[.07]",
        )}
        aria-hidden="true"
      />
      <div
        className={cn(
          "pointer-events-none absolute -bottom-64 -left-48 size-[38rem] rounded-full blur-[130px]",
          dark ? "bg-[#5d86a5]/18" : "bg-[#eaeff5]/80",
        )}
        aria-hidden="true"
      />
      <div
        ref={contentRef}
        style={{
          left: `${(100 - 100 / scale) / 2}%`,
          width: `${100 / scale}%`,
          maxWidth: Math.abs(scale - 1) > 0.001 ? "none" : undefined,
          marginLeft: Math.abs(scale - 1) > 0.001 ? "0" : undefined,
          marginRight: Math.abs(scale - 1) > 0.001 ? "0" : undefined,
          transform: `scale(${scale})`,
          transformOrigin: "top center",
        }}
        className={cn(
          "scene-fit-content relative mx-auto flex min-h-full w-full max-w-[1880px] flex-col px-5 py-4 sm:px-8 sm:py-5 lg:px-10 lg:py-6 2xl:px-12",
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
        "min-h-[112px] p-5",
        dark &&
          "border-white/10 bg-white/[.055] text-white shadow-[0_22px_60px_rgba(0,0,0,.18)]",
        tone === "negative" &&
          (dark
            ? "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#eb7380]"
            : "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#e83948]"),
        tone === "brand" &&
          (dark
            ? "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#eb7380]"
            : "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#e83948]"),
        tone === "positive" &&
          (dark
            ? "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#5d86a5]"
            : "after:absolute after:inset-x-0 after:top-0 after:h-0.5 after:bg-[#426a88]"),
        className,
      )}
    >
      <div
        className={cn(
          "mb-2.5 flex items-center justify-between",
          dark ? "text-white/50" : "text-[#5d86a5]",
        )}
      >
        {Icon ? <Icon className="size-4" strokeWidth={1.8} /> : <span />}
        <span
          className={cn(
            "size-1.5 animate-pulse-soft rounded-full",
            tone === "positive" ? "bg-[#5d86a5]" : "bg-[#e83948]",
          )}
        />
      </div>
      <strong
        className={cn(
          "font-display block text-[clamp(1.8rem,2.4vw,2.7rem)] font-semibold leading-none tracking-[-0.06em]",
          dark ? "text-white" : "text-[#2c5372]",
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
            "text-[13px] font-semibold 2xl:text-sm",
            dark ? "text-white/58" : "text-[#426a88]",
          )}
        >
          {label}
        </span>
        {delta ? (
          <small
            className={cn(
              "whitespace-nowrap text-[11px] font-bold 2xl:text-xs",
              tone === "negative"
                ? "text-[#e83948]"
                : dark
                  ? "text-[#eaeff5]"
                  : "text-[#426a88]",
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
        "mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] 2xl:text-xs",
        dark ? "text-white/75" : "text-[#426a88]",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-6",
          dark ? "bg-[#eb7380]/70" : "bg-[#e83948]/65",
        )}
      />
      {children}
    </div>
  );
}
