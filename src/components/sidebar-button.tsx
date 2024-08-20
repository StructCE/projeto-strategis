import SidebarIcon from "./sidebar-icon";
import { Button } from "./ui/button";

export default function SidebarButton({
  src,
  name,
  disabled,
}: {
  src: string;
  name: string;
  disabled: boolean;
}) {
  if (!disabled) {
    return (
      <Button className="my-0 flex w-full items-center justify-start gap-2 bg-transparent py-0 text-xs hover:!bg-vermelho_strategis">
        <SidebarIcon src={src} width={20} height={20} alt={src} />
        {name}
      </Button>
    );
  } else {
    return (
      <Button className="my-0 flex w-full items-center justify-start gap-2 bg-transparent py-0 text-xs opacity-40 hover:!bg-transparent">
        <SidebarIcon src={src} width={20} height={20} alt={src} />
        {name}
      </Button>
    );
  }
}
