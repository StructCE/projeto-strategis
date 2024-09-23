import type { LucideProps } from "lucide-react";
import Link from "next/link";
import React from "react";

export type SidebarButtonProps = {
  pathname: string;
  name: string;
  buttonRef?: React.Ref<HTMLAnchorElement>;
  refLink: string;
  disabled: boolean;
  icon: (props: LucideProps) => React.ReactNode;
};

export default function SidebarButton(props: SidebarButtonProps) {
  const isActive = props.pathname.startsWith(props.refLink);

  return (
    <Link
      ref={props.buttonRef}
      className={`my-0 flex w-full items-center justify-start gap-[12px] rounded-[10px] bg-transparent px-[12px] py-[6px] sm:gap-[15px] ${
        props.disabled
          ? "opacity-40 hover:!bg-transparent"
          : "hover:!bg-vermelho_strategis"
      } ${isActive ? "bg-vermelho_strategis" : ""}`}
      href={props.refLink}
    >
      <span>
        <props.icon size={20}></props.icon>
      </span>
      <span className="text-semibold font-inter whitespace-normal text-left text-sm sm:text-base">
        {props.name}
      </span>
    </Link>
  );
}
