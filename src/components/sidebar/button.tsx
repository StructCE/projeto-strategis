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
      className={`my-0 flex w-full items-center justify-start gap-3 sm:gap-2 bg-transparent py-0 text-xl sm:text-sm ${
        disabled
          ? "opacity-40 hover:!bg-transparent"
          : "hover:!bg-vermelho_strategis"
      }`}
    >
      <span>
        <SidebarIcon src={src}/>
      </span>
      <span className="whitespace-normal text-left">{name}</span>
    </Button>
  );
}
