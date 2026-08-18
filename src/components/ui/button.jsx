import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full text-sm font-semibold outline-none transition-[color,background,transform,box-shadow,border-color] duration-300 focus-visible:ring-2 focus-visible:ring-[#e83948]/45 disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-[#2c5372] text-white shadow-[0_12px_30px_rgba(44,83,114,.18)] hover:-translate-y-0.5 hover:bg-[#426a88]",
        cream:
          "border border-[#2c5372]/10 bg-[#eaeff5] text-[#2c5372] shadow-[0_10px_24px_rgba(44,83,114,.08)] hover:-translate-y-0.5 hover:border-[#e83948]/35",
        ghost:
          "border border-transparent bg-transparent text-[#426a88] hover:border-[#2c5372]/10 hover:bg-[#eaeff5]/70 hover:text-[#2c5372]",
        darkGhost:
          "border border-white/10 bg-white/[.04] text-white/68 hover:border-[#eb7380]/35 hover:bg-white/[.08] hover:text-white",
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
