import SidebarIcon from "./icon";
import { Button } from "../ui/button";

export default function SidebarButton({
  src,
  name,
  disabled,
}: {
  src: string;
  name: string;
  disabled: boolean;
}) {
  return (
    <Button
      className={`my-0 flex w-full items-center justify-start gap-2 bg-transparent py-0 text-xs ${
        disabled
          ? "opacity-40 hover:!bg-transparent"
          : "hover:!bg-vermelho_strategis"
      }`}
    >
      <span>
        <SidebarIcon src={src} width={20} height={20} alt={src} />
      </span>
      <span className="whitespace-normal text-left">{name}</span>
    </Button>
  );
}
