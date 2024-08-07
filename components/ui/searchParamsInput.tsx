"use client";
import * as React from "react";

import { cn } from "../../@/lib/utils";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export interface SearchParamsInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const SearchParamsInput = React.forwardRef<
  HTMLInputElement,
  SearchParamsInputProps
>(({ className, type, ...props }, ref) => {
  const searchParams = useSearchParams();
  console.log("defalut searchParams", searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  // 検索するタイミングを 0.3 秒伸ばす
  const handleSearch = useDebouncedCallback((userId) => {
    // console.log(`Searching... ${userId}`);

    const params = new URLSearchParams(searchParams);

    if (userId) {
      params.set("userId", userId);
    } else {
      params.delete("userId");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      defaultValue={searchParams.get("userId")?.toString()}
    />
  );
});
SearchParamsInput.displayName = "SearchParamsInput";

export { SearchParamsInput };
