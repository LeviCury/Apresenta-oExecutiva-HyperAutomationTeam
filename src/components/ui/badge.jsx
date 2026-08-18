import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "border-[#00a896]/20 bg-[#00a896]/10 text-[#087f74]",
        cream: "border-[#172a39]/10 bg-[#f3ead7] text-[#47606f]",
        dark: "border-white/12 bg-white/[.06] text-white/70",
        warning: "border-[#d9a441]/25 bg-[#d9a441]/12 text-[#8a5d0b]",
        success: "border-[#2e9d78]/22 bg-[#2e9d78]/12 text-[#22785c]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({ className, variant, ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
