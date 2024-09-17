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
      {props.icon}
      <p className="text-[14px] font-medium tracking-wider text-white sm:text-[18px] sm:tracking-normal">
        {props.children}
      </p>
    </button>
  );
};

type TableButtonComponentLinkProps = {
  icon?: React.ReactNode;
  handlePress?: () => void;
  className?: string;
  children: string;
  link_ref: string;
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
      {props.icon}
      <Link
        href={props.link_ref}
        className="text-[14px] font-medium tracking-wider text-white sm:text-[18px] sm:tracking-normal"
      >
        {props.children}
      </Link>
    </button>
  );
};
