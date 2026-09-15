import { cn } from "@/utils/cn";
import { SearchIcon } from "lucide-react";
import { forwardRef, type ComponentProps } from "react";

type SearchProps = ComponentProps<"input"> & {
  className?: string;
  containerClassName?: string;
}

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ 
    className = "",
    containerClassName = "", 
    ...props 
  }, ref) => {
    return (
      <div className={cn(
          "flex group items-center gap-2 w-1/4 h-[40px] px-3 rounded-lg bg-neutral-3 border border-gray-200 transition-colors overflow-hidden focus-within:border-gray-300 focus-within:shadow-sm",
          "[&:has(input:not(:placeholder-shown))]:bg-neutral-3",
          containerClassName
        )}
      >
        <SearchIcon className="size-4 text-gray-400 group-has-[input:not(:placeholder-shown)]:text-neutral-9 group-focus-within:text-neutral-9" />
        <div className="group-has-[input:not(:placeholder-shown)]:bg-neutral-9 group-focus-within:bg-neutral-9 w-[1px] h-4.5 bg-neutral-5"></div>
        <input
          ref={ref}
          role="search"
          type="search"
          className={cn(
            "flex-1 w-full h-full outline-none text-black text-sm bg-transparent transition-colors placeholder:text-gray-400",
            " disabled:cursor-not-allowed disabled:text-neutral-9 disabled:placeholder:text-neutral-9",
            "focus:placeholder:text-neutral-9",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);

export { Search }