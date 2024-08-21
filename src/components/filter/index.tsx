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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";

type FilterProps = {
  className?: string;
  children: React.ReactNode;
};

export const Filter = (props: FilterProps) => {
  const style = cn(
    "flex items-center justify-center rounded-[12px] bg-filtro bg-opacity-50 px-[12px] py-[6px] gap-[14px]",
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

type FilterIconProps = {
  className?: string;
  icon: ({ className }: { className: string }) => React.ReactNode;
};

Filter.Icon = function FilterIcon(props: FilterIconProps) {
  const style = cn("size-[16px] stroke-[1.5px]", props.className);
  return <props.icon className={style}></props.icon>;
};

type FilterInputProps = {
  className?: string;
  state: string;
  setState: (value: string) => void;
  placeholder: string;
};

Filter.Input = function FilterInput(props: FilterInputProps) {
  const style = cn(
    "border-none bg-transparent font-inter text-[16px] text-[#000000] placeholder-opacity-50 opacity-100 outline-none focus:outline-none",
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
    "w-fit h-auto gap-[14px] bg-transparent font-inter text-[16px] font-regular text-[#000000] opacity-100 data-[placeholder]:opacity-50 m-0 p-0 border-none focus:outline-none focus:ring-0 focus:border-transparent",
    props.className,
  );
  return (
    <Select
      value={props.state}
      onValueChange={(value) => props.setState(value)}
    >
      <SelectTrigger className={style}>
        <SelectValue placeholder={props.placeholder} />
      </SelectTrigger>
      <SelectContent>
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

type FilterDatePickerProps = {
  className?: string;
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
};

Filter.DatePicker = function FilterDatePicker(props: FilterDatePickerProps) {
  const style = cn(
    "rounded-0 font-regular m-0 mr-[4px] justify-start bg-transparent p-0 font-inter text-[16px] opacity-50 hover:bg-accent",
    props.className,
  );
  return (
    <div>
      <Popover open={props.open} onOpenChange={props.setOpen}>
        <PopoverTrigger asChild>
          <button className={style}>
            {props.date ? (
              `${String(props.date.getDate()).padStart(2, "0")}/${String(props.date.getMonth() + 1).padStart(2, "0")}/${props.date.getFullYear()}`
            ) : (
              <span>Pick a date</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="m-0 w-auto">
          <Calendar
            required
            mode="single"
            selected={props.date}
            onSelect={props.setDate}
          ></Calendar>
        </PopoverContent>
      </Popover>
    </div>
  );
};
