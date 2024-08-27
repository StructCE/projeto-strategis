import SidebarButton from "./sidebarButton";
import { useSidebarButton } from "./useSidebarButton";
import type { LucideProps } from "lucide-react";

type SidebarButtonContainerProps = {
  name: string;
  buttonRef?: React.Ref<HTMLAnchorElement>;
  refLink: string;
  disabled: boolean;
  icon: (props: LucideProps) => React.ReactNode;
};

export default function SidebarButtonContainer(
  props: SidebarButtonContainerProps,
) {
  const sidebarButton = useSidebarButton();
  return <SidebarButton {...sidebarButton} {...props} />;
}
