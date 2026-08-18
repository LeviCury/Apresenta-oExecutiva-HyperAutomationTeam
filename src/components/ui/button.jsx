import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold outline-none transition-[color,background,transform,box-shadow,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-[#00a896]/45 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#172a39] text-white shadow-[0_12px_30px_rgba(23,42,57,.18)] hover:-translate-y-0.5 hover:bg-[#203c50]",
        cream:
          "border border-[#172a39]/10 bg-[#f3ead7] text-[#172a39] shadow-[0_10px_24px_rgba(23,42,57,.08)] hover:-translate-y-0.5 hover:border-[#00a896]/35",
        ghost:
          "border border-transparent bg-transparent text-[#47606f] hover:border-[#172a39]/10 hover:bg-white/70 hover:text-[#172a39]",
        darkGhost:
          "border border-white/10 bg-white/[.04] text-white/68 hover:border-[#00d6c2]/35 hover:bg-white/[.08] hover:text-white",
      },
      size: {
        default: "h-10 px-5",
        sm: "h-8 px-3 text-xs",
        icon: "size-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
