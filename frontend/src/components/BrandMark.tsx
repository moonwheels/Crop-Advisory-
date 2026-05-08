import { Leaf, SunMedium } from "lucide-react";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  name?: string;
};

const BrandMark = ({
  className,
  iconClassName,
  textClassName,
  showText = true,
  name = "AgriFarms",
}: BrandMarkProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl",
          "bg-gradient-to-br from-emerald-500 via-lime-500 to-amber-400 shadow-lg shadow-emerald-950/20",
          iconClassName,
        )}
      >
        <SunMedium className="absolute right-1 top-1 h-3.5 w-3.5 text-amber-100" />
        <Leaf className="h-5 w-5 text-white" />
      </div>
      {showText ? (
        <span className={cn("font-heading text-xl font-bold tracking-tight", textClassName)}>{name}</span>
      ) : null}
    </div>
  );
};

export default BrandMark;
