import { usePathname } from "next/navigation";

export const useSidebarButton = () => {
  const pathname = usePathname();
  return {
    pathname,
  };
};
