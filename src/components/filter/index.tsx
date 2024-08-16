import React from "react";
import { cn } from "../../lib/utils";

type FiltersProps = {
  className?: string;
  children: React.ReactNode;
};

const Filters = (props: FiltersProps) => {
  const style = cn("flex w-full h-fit gap-[16px]", props.className);
  return <div className={style}>{props.children}</div>;
};

type FiltersInputProps = {
  className?: string;
  state: string;
  setState: (value: string) => void;
  placeholder: string;
};

Filters.Input = function FiltersInput(props: FiltersInputProps) {
  const style = cn(
    "bg-trasnparent font-inter font-regular text-[#000000] opacity-100 placeholder-opacity-50",
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

type FiltersSelectProps = {
  className?: string;
  state: string;
  setState: (value: string) => void;
};

Filters.Select = function FiltersSelect(props: FiltersSelectProps) {
  const style = cn("", props.className);
  return <div className={style}></div>;
};
