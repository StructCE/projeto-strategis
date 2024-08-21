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
import { Button } from "../ui/button";
import { format } from "date-fns";

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
    " border-none bg-transparent font-inter text-[16px] text-[#000000] placeholder-opacity-50 opacity-100 outline-none focus:outline-none",
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
  date: Date;
  setDate: (value: Date) => void;
};

Filter.DatePicker = function FilterDatePicker(props: FilterDatePickerProps) {
  const style = cn(
    "w-[280px] justify-start text-left font-normal",
    !props.date && "text-muted-foreground",
    props.className,
  );
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"} className={style}>
            {props.date ? format(props.date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            required
            mode="single"
            selected={props.date}
            onSelect={props.setDate}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
