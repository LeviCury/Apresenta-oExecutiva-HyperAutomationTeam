import { motion } from "motion/react";
import { cn } from "../../lib/utils";

function Card({ className, ...props }) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-[1.75rem] border border-[#172a39]/[.09] bg-white/80 text-[#172a39] shadow-[0_22px_60px_rgba(23,42,57,.09)] backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}

function MotionCard({ className, glow = true, ...props }) {
  return (
    <motion.div
      data-slot="motion-card"
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={cn(
        "group relative overflow-hidden rounded-[1.75rem] border border-[#172a39]/[.09] bg-white/80 text-[#172a39] shadow-[0_22px_60px_rgba(23,42,57,.09)] backdrop-blur-xl",
        glow &&
          "before:pointer-events-none before:absolute before:-right-16 before:-top-16 before:size-40 before:rounded-full before:bg-[#00a896]/10 before:blur-3xl before:transition-transform before:duration-700 group-hover:before:scale-125",
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }) {
  return (
    <div
      data-slot="card-header"
      className={cn("relative flex flex-col gap-1.5 p-6", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }) {
  return (
    <h3
      data-slot="card-title"
      className={cn("font-display text-xl font-semibold tracking-[-0.03em]", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }) {
  return (
    <p
      data-slot="card-description"
      className={cn("text-sm leading-6 text-[#5d7180]", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("relative px-6 pb-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  MotionCard,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
};
