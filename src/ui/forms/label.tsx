import { forwardRef, type ComponentProps } from "react";
import { cn } from "@/utils/cn";

const Label = forwardRef<HTMLLabelElement, ComponentProps<"label">>(
  ({
    className,
    ...props
  }, ref) => {
    return (
      <label
        ref={ref}
        data-slot="label"
        className={cn("font-[600] text-sm select-none", className)}
        {...props}
      />
    );
  }
);

export { Label }