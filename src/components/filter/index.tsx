import React from "react";
import { cn } from "~/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type FilterProps = {
  className?: string;
  children: React.ReactNode;
  icon: ({ className }: { className: string }) => React.ReactNode;
};

export const Filter = (props: FilterProps) => {
  const style = cn(
    "flex items-center justify-center rounded-[12px] bg-filtro px-[12px] py-[6px] gap-[10px]",
    props.className,
  );
  return (
    <div className={style}>
      <props.icon className={"size-[16px] stroke-[1.5px]"}></props.icon>
      {props.children}
    </div>
  );
};

type FilterInputProps = {
  className?: string;
  state: string;
  setState: (value: string) => void;
  placeholder: string;
};

Filter.Input = function FilterInput(props: FilterInputProps) {
  const style = cn(
    "bg-trasnparent font-inter  text-[#000000] opacity-100 placeholder-opacity-50",
    props.className,
  );
  return (
    <input
      className={style}
      type="text"
      placeholder={props.placeholder}
      onChange={(ev) => props.setState(ev.target.value)}
      value={props.state}
    />
  );
};

type FilterSelectProps = {
  className?: string;
  placeholder: string;
  state: string;
  setState: (value: string) => void;
  children: React.ReactNode[];
};

Filter.Select = function FilterSelect(props: FilterSelectProps) {
  const style = cn(
    "w-fit gap-[10px] border-none bg-transparent font-inter text-[20px] font-regular text-[#000000] opacity-100 placeholder:opacity-50",
    props.className,
  );
  return (
    <Select
      value={props.state}
      onValueChange={(value) => props.setState(value)}
    >
      <SelectTrigger className={style + "placeholder-opacity-10"}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-transparent">
        <SelectGroup>{props.children}</SelectGroup>
      </SelectContent>
    </Select>
  );
};

type FilterSelectItemsProps = {
  className?: string;
  value: string;
};

Filter.SelectItems = function FilterSelectItems(props: FilterSelectItemsProps) {
  const style = cn(
    "font-regular font-inter text-[16px] text-[#000000]",
    props.className,
  );
  return (
    <SelectItem className={style} value={props.value}>
      {props.value}
    </SelectItem>
  );
};
