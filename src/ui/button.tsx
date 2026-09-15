import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-sm whitespace-nowrap rounded-lg transition-all disabled:pointer-events-none disabled:border-0 disabled:bg-grey-100 disabled:text-neutral-7 disabled:select-none",

    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6 shrink-0 [&_svg]:shrink-0",
    "outline-none focus-visible:border-ring focus-visible:ring-black focus-visible:ring-[1.5px]",
    "aria-invalid:ring-red-500/20 aria-invalid:border-red-500",
    "disabled:!pointer-events-none disabled:!border-0 disabled:!bg-grey-100 disabled:!text-neutral-7 disabled:!bg-none",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-gray-100 shadow bg-background text-foreground hover:bg-gray-100 hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        download: "bg-green-50 text-green-500",
        dangers: "text-red-500 bg-red-50 rounded-[8px] py-3 px-4 gap-2",
        primary: "text-primary-500 bg-blue-50 rounded-[8px] py-3 px-4 gap-2",
        newPrimary:
          "text-white bg-blue-500 rounded-[8px] py-3 px-4 gap-2",
        success: "text-white bg-green-50 text-green-500",
        warning: "text-orange-500 bg-orange-50 rounded-[8px] py-3 px-4 gap-2",
        softDangers: "text-white bg-red-50",
        boldWarning: "text-white bg-orange-500",
        primaryPagination:
          "text-white bg-blue-50 text-blue-500 border border-blue-100 border-[1px]",
        plain: "text-black bg-grey-50",
        red: "text-white bg-red-500 rounded-[8px] py-3 px-4 gap-2",
        grey: "text-black bg-gray-100",
        greyDark: "text-white bg-gray-500",
        greenDark: "text-white bg-green-500",
        blueBca: "text-white bg-[#5385D3]",
        outlineRed:
          "border-2 border-red-500 text-red-500 hover:bg-red-50 active:bg-red-100",
        purple: "text-purple-500 bg-purple-50",
        bluelight: [
          "bg-blue-300 text-blue-50",
          "hover:bg-blue-300",
        ].join(" "),
        gradient: [
          "text-white",
          "bg-[linear-gradient(90deg,#1874A5,#A31AF2)]",
          "hover:bg-[linear-gradient(0deg,#ffffff33_0%,#ffffff33_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)]",
          "active:bg-[linear-gradient(0deg,#00000033_0%,#00000033_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)]",
        ].join(" "),
        gradienHover: [
          "text-black",
          "bg-white",
          "hover:bg-[linear-gradient(0deg,#ffffff33_0%,#ffffff33_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)] hover:text-white",
          "active:bg-[linear-gradient(0deg,#00000033_0%,#00000033_100%),linear-gradient(283deg,#A31AF2_6%,#1874A5_97%)]",
        ].join(" "),
        blue: "bg-blue-500 hover:bg-blue-600 text-white rounded-lg",
        lightBlue: "bg-primary-50 text-primary-500",
        icon: "p-2 rounded-lg border border-gray-300 hover:bg-gray-100 hover:border-gray-300 text-gray-400 data-[state=open]:bg-gray-100 data-[state=open]:border-gray-300",
      },
      intent: {
        edit:    "hover:border-orange-300 hover:bg-orange-50  hover:text-orange-500  hover:shadow-none active:bg-orange-100",
        delete:  "hover:border-red-300    hover:bg-red-50     hover:text-red-500     hover:shadow-none active:bg-red-100",
        view:    "hover:border-blue-300   hover:bg-blue-50    hover:text-blue-500    hover:shadow-none active:bg-blue-100",
        primary:    "hover:border-blue-300   hover:bg-blue-50    hover:text-blue-500    hover:shadow-none active:bg-blue-100",
        lock:    "hover:border-orange-300   hover:bg-orange-50   hover:text-orange-600    hover:shadow-none active:bg-orange-200",
        key:     "hover:border-amber-300  hover:bg-amber-50   hover:text-amber-500   hover:shadow-none active:bg-amber-100",
        success: "hover:border-green-300  hover:bg-green-50   hover:text-green-500   hover:shadow-none active:bg-green-100",
        info:    "hover:border-cyan-300   hover:bg-cyan-50    hover:text-cyan-500    hover:shadow-none active:bg-cyan-100",
        warning: "hover:border-yellow-300 hover:bg-yellow-50  hover:text-yellow-500  hover:shadow-none active:bg-yellow-100",
        purple:  "hover:border-purple-300 hover:bg-purple-50  hover:text-purple-500  hover:shadow-none active:bg-purple-100",
        // add more intents icon colors as needed
      },
      size: {
        s: "h-[26px] text-[10px] px-2",
        xs: "h-[32px] text-[12px]",
        sm: "h-[32px] text-[12px]",
        md: "h-[44px] text-[14px]",
        lg: "h-[52px] text-[16px]",
        iconS: "[&_svg:not([class*='size-'])]:size-3.5",
        iconSm: "[&_svg:not([class*='size-'])]:size-5",
        iconMd: "[&_svg:not([class*='size-'])]:size-6",
        iconLg: "[&_svg:not([class*='size-'])]:size-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    text?: React.ReactNode;
    icon?: React.ReactNode;
    load?: boolean;
    asChild?: boolean;
    iconPosition?: "left" | "right";
    href?: string;
  };

export const Button = ({
  className,
  variant,
  size,
  intent,
  text,
  icon,
  load = false,
  asChild = false,
  iconPosition = "left",
  href,
  children,
  ...props
}: ButtonProps) => {

  const Comp: React.ElementType = asChild ? Slot : href ? "a" : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, intent }), className)}
      {...(href ? { href } : {})}
      {...(props as Record<string, unknown>)}
    >
      {load ? (
        <Loader2 className="animate-spin size-5" />
      ) : children ? (
        children
      ) : iconPosition === "right" ? (
        <>
          {text}
          {icon}
        </>
      ) : (
        <>
          {icon}
          {text}
        </>
      )}
    </Comp>
  );
};

export { buttonVariants };