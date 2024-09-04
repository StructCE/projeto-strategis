import { usePathname } from "next/navigation";
import { useRef } from "react";

export const useSidebarButtons = () => {
  const pathname = usePathname();
  const buttonRef = useRef<HTMLAnchorElement>(null);
  return {
    pathname,
    buttonRef,
  };
};
