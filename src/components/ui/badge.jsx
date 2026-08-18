import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]",
  {
    variants: {
      variant: {
        default: "border-[#e83948]/20 bg-[#e83948]/10 text-[#bf404f]",
        cream: "border-[#2c5372]/10 bg-[#eaeff5] text-[#2c5372]",
        dark: "border-white/12 bg-white/[.06] text-white/70",
        warning: "border-[#c7b475]/35 bg-[#c7b475]/18 text-[#2c5372]",
        success: "border-[#5d86a5]/25 bg-[#5d86a5]/12 text-[#2c5372]",
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
