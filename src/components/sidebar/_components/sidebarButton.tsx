"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarIcon from "./sidebarIcon";

export default function SidebarButton({
  iconSource,
  name,
  buttonRef,
  refLink,
  disabled,
}: {
  iconSource: string;
  name: string;
  buttonRef?: React.Ref<HTMLAnchorElement>;
  refLink: string;
  disabled: boolean;
}) {
  const pathname = usePathname();

  return (
    <Link
      ref={buttonRef}
      className={`my-0 flex w-full items-center justify-start gap-[12px] rounded-[10px] bg-transparent px-[12px] py-[6px] sm:gap-[15px] ${
        disabled
          ? "opacity-40 hover:!bg-transparent"
          : "hover:!bg-vermelho_strategis"
      } ${pathname === refLink ? "bg-vermelho_strategis" : ""}`}
      href={refLink}
    >
      <span>
        <SidebarIcon iconSource={iconSource} />
      </span>
      <span className="text-semibold whitespace-normal text-left font-inter text-sm sm:text-base">
        {name}
      </span>
    </Link>
  );
}
