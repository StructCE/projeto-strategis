import Link from "next/link";
import React from "react";
import { cn } from "~/lib/utils";

type TableButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export const TableButtonComponent = (props: TableButtonProps) => {
  const rootStyle = cn(
    "flex pt-3 sm:pt-6 justify-end gap-3 sm:gap-4",
    props.className,
  );
  return <div className={rootStyle}>{props.children}</div>;
};

type TableButtonComponentButtonProps = {
  icon?: React.ReactNode;
  handlePress?: () => void;
  className?: string;
  children: string;
};

TableButtonComponent.Button = function TableButtonComponentButton(
  props: TableButtonComponentButtonProps,
) {
  const style = cn(
    "px-[16px] sm:px-[24px] py-[8px] rounded-xl min-w-28",
    props.className,
  );
  return (
    <button onClick={props.handlePress} className={style}>
      <p className="flex gap-2 text-[14px] font-medium tracking-wider text-white sm:text-[18px] sm:tracking-normal">
        {props.icon}
        {props.children}
      </p>
    </button>
  );
};

type TableButtonComponentLinkProps = {
  handlePress?: () => void;
  className?: string;
  children?: React.ReactNode;
  link_ref: string;
  placeholder: string;
};

TableButtonComponent.Link = function TableButtonComponentLink(
  props: TableButtonComponentLinkProps,
) {
  const style = cn(
    "px-[16px] sm:px-[24px] py-[8px] rounded-xl min-w-28",
    props.className,
  );
  return (
    <button onClick={props.handlePress} className={style}>
      <Link
        href={props.link_ref}
        className="flex gap-2 text-[14px] font-medium tracking-wider text-white sm:text-[18px] sm:tracking-normal"
      >
        {props.children}
        {props.placeholder}
      </Link>
    </button>
  );
};

type TableButtonComponentHomepageLinkProps = {
  handlePress?: () => void;
  className?: string;
  link_ref: string;
  placeholder: string;
  isAccessible?: boolean;
};

TableButtonComponent.HomepageLink = function TableButtonComponentHomepageLink(
  props: TableButtonComponentHomepageLinkProps,
) {
  const style = cn(
    `min-w-[288px] rounded-xl  px-[12px] py-[8px]  sm:min-w-[308px] sm:px-[20px] ${
      !props.isAccessible
        ? "bg-cinza_mais_escuro_botao cursor-not-allowed"
        : "bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 cursor-pointer"
    }`,
    props.className,
  );
  return (
    <button
      onClick={props.handlePress}
      className={style}
      disabled={!props.isAccessible}
    >
      <Link
        href={props.isAccessible ? props.link_ref : ""}
        className={`flex gap-2 text-[13px] font-medium tracking-wider text-white sm:text-[16px] sm:tracking-normal ${
          !props.isAccessible ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        <span
          className={
            !props.isAccessible
              ? "font-normal opacity-50"
              : "font-medium opacity-100"
          }
        >
          {props.placeholder}
        </span>
      </Link>
    </button>
  );
};
