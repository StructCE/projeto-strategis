import { usePathname } from "next/navigation";
import { type Ref, useRef } from "react";

export type UseSideBarButtonReturn = {
  pathname: string;
  buttonRef: Ref<HTMLAnchorElement>;
};

export const useSidebarButtons = (): UseSideBarButtonReturn => {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  return {
    pathname,
    buttonRef,
  };
};
