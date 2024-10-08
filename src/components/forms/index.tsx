import { Trash2 } from "lucide-react";
import React from "react";
import { cn } from "~/lib/utils";

type FormProps = {
  className?: string;
  children: React.ReactNode;
};

export const FormComponent = (props: FormProps) => {
  const rootStyle = cn("flex flex-col gap-[8px]", props.className);
  return <div className={rootStyle}>{props.children}</div>;
};

type FormComponentTitleProps = {
  className?: string;
  children: string;
};

FormComponent.Title = function FormComponentTitle(
  props: FormComponentTitleProps,
) {
  const style = cn(
    "text-[24px] sm:text-[32px] font-inter font-medium leading-tight",
    props.className,
  );
  return <p className={style}>{props.children}</p>;
};

type FormComponentLineProps = {
  className?: string;
  children: React.ReactNode;
};

FormComponent.Line = function FormComponentLine(props: FormComponentLineProps) {
  const style = cn(
    "flex lg:flex-row flex-col gap-[6px] lg:gap-[12px] w-full",
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

type FormComponentBoxSpecifyProps = {
  className?: string;
  children: React.ReactNode;
  boxName: string;
};

FormComponent.BoxSpecify = function FormComponentBoxSpecify(
  props: FormComponentBoxSpecifyProps,
) {
  const style = cn(
    "flex flex-col gap-[6px] lg:gap-[12px] w-full border border-hover_cinza_destaque_escuro p-2 rounded-md",
    props.className,
  );
  return (
    <div>
      <p>{props.boxName}</p>
      <div className={style}>{props.children}</div>
    </div>
  );
};

type FormComponentFrameProps = {
  className?: string;
  children: React.ReactNode;
};

FormComponent.Frame = function FormComponentFrame(
  props: FormComponentFrameProps,
) {
  const style = cn("flex flex-col gap-[0px] w-full", props.className);
  return <div className={style}>{props.children}</div>;
};

type FormComponentLabelProps = {
  className?: string;
  children: string;
};

FormComponent.Label = function FormComponentLabel(
  props: FormComponentLabelProps,
) {
  const style = cn("font-inter text-[16px] font-normal", props.className);
  return <p className={style}>{props.children}</p>;
};

type FormComponentButtonLayoutProps = {
  className?: string;
  children: React.ReactNode;
};

FormComponent.ButtonLayout = function FormComponentButtonLayout(
  props: FormComponentButtonLayoutProps,
) {
  const style = cn("flex w-full gap-3 justify-center pt-1", props.className);
  return <div className={style}>{props.children}</div>;
};

type FormComponentButtonProps = {
  handlePress?: () => void;
  className?: string;
  children: string;
};

FormComponent.Button = function FormComponentButton(
  props: FormComponentButtonProps,
) {
  const style = cn(
    "px-[20px] py-[8px] rounded-lg min-w-28 text-white",
    props.className,
  );
  return (
    <button onClick={props.handlePress} className={style} type="submit">
      <p className="text-[14px] font-semibold tracking-wider sm:text-[16px] sm:tracking-normal">
        {props.children}
      </p>
    </button>
  );
};

type FormComponentButtonRemoveProps = {
  handlePress?: () => void;
  className?: string;
};

FormComponent.ButtonRemove = function FormComponentButtonRemove(
  props: FormComponentButtonRemoveProps,
) {
  const style = cn("text-black", props.className);
  return (
    <div className="m-1 flex justify-end lg:m-0 lg:mt-[18px]">
      <button onClick={props.handlePress} className={style} type="button">
        <Trash2 />
      </button>
    </div>
  );
};
