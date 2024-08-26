import React from "react";
import { cn } from "~/lib/utils";

type TableProps = {
  className?: string;
  children: React.ReactNode;
};

export const TableComponent = (props: TableProps) => {
  const rootStyle = cn("flex flex-col gap-[8px]", props.className);
  return <div className={rootStyle}>{props.children}</div>;
};

type TableComponentTitleProps = {
  className?: string;
  children: string;
};

TableComponent.Title = function TableComponentTitle(
  props: TableComponentTitleProps,
) {
  const style = cn(
    "text-[24px] sm:text-[32px] font-inter font-medium",
    props.className,
  );
  return <p className={style}>{props.children}</p>;
};

type TableComponentSubtitleProps = {
  className?: string;
  children: string;
};

TableComponent.Subtitle = function TableComponentSubtitle(
  props: TableComponentSubtitleProps,
) {
  const style = cn(
    "text-[14px] sm:text-[16px] font-inter font-regular",
    props.className,
  );
  return <p className={style}>{props.children}</p>;
};

type TableComponentTableProps = {
  className?: string;
  children: React.ReactNode;
};

TableComponent.Table = function TableComponentTable(
  props: TableComponentTableProps,
) {
  const style = cn("flex flex-col overflow-x-auto", props.className);
  return <div className={style}>{props.children}</div>;
};

type TableComponentLineProps = {
  className?: string;
  children: React.ReactNode;
};

TableComponent.Line = function TableComponentLine(
  props: TableComponentLineProps,
) {
  const style = cn(
    "grid px-[16px] sm:px-[24px] py-[6px] items-center min-w-[1200px]",
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

type TableComponentFiltersLineProps = {
  className?: string;
  children: React.ReactNode;
};

TableComponent.FiltersLine = function TableComponentFiltersLine(
  props: TableComponentFiltersLineProps,
) {
  const style = cn(
    "flex lg:flex-row flex-col mt-1 lg:gap-[16px] gap-[10px]",
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

type TableComponentLineTitleProps = {
  className?: string;
  children: React.ReactNode;
};

TableComponent.LineTitle = function TableComponentLineTitle(
  props: TableComponentLineTitleProps,
) {
  const style = cn(
    "grid px-[16px] sm:px-[24px] border-b-[2px] border-b-borda_tabela py-[8px] items-center min-w-[1200px]",
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

type TableComponentValueProps = {
  className?: string;
  children: React.ReactNode;
};

TableComponent.Value = function TableComponentValue(
  props: TableComponentValueProps,
) {
  const style = cn("sm:text-[16px] font-regular text-[14px]", props.className);
  return <div className={style}>{props.children}</div>;
};

type TableComponentValueTitleProps = {
  className?: string;
  children: React.ReactNode;
};

TableComponent.ValueTitle = function TableComponentValueTitle(
  props: TableComponentValueTitleProps,
) {
  const style = cn("text-[18px] font-semibold sm:text-[20px]", props.className);
  return <div className={style}>{props.children}</div>;
};

type TableComponentButtonSpaceProps = {
  className?: string;
};

TableComponent.ButtonSpace = function TableComponentButtonSpace(
  props: TableComponentButtonSpaceProps,
) {
  const style = cn("w-[110px]sm:w-[130px] place-self-end", props.className);
  return <div className={style}></div>;
};

type TableComponentLineButtonProps = {
  handlePress?: () => void;
  className?: string;
  children: string;
};

TableComponent.LineButton = function TableComponentLineButton(
  props: TableComponentLineButtonProps,
) {
  const style = cn(
    "px-[24px] py-[4px] rounded-[8px] w-[110px] sm:w-[130px] place-self-end",
    props.className,
  );
  return (
    <button onClick={props.handlePress} className={style}>
      <p className="text-[14px] font-medium sm:text-[16px]">{props.children}</p>
    </button>
  );
};
