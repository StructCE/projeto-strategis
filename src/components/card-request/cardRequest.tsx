import React from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

type RequestProps = {
  classname?: string;
  children: React.ReactNode;
};

export const RequestComponent = (props: RequestProps) => {
  const rootStyle = cn(
    "my-3 border-1 solid gap-auto rounded-lg py-2.5 px-4 shadow-[0px_0px_4px_0px_#0000004d]",
    props.classname,
  );
  return <div className={rootStyle}>{props.children}</div>;
};

//// Grid Component ////
type RequestComponentGridProps = {
  className?: string;
  children: React.ReactNode;
};

RequestComponent.Grid = function RequestComponentGrid(
  props: RequestComponentGridProps,
) {
  const style = cn(
    `flex flex-col sm:grid md:grid-cols-[repeat(4,_1fr)_130px] sm:grid-cols-2 gap-3 sm:gap-4 items-center`,
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

//// Linha itens (Título e Descrição) ////
type RequestComponentColumnItemProps = {
  title: string;
  description: string;
  isnº?: boolean;
};

type ColumnButtonManageProps = {
  onOpen: () => void;
};

RequestComponent.ColumnItem = function RequestComponentColumnItem(
  props: RequestComponentColumnItemProps,
) {
  const { isnº = false } = props;
  return (
    <div className="flex flex-col max-[768px]:text-center">
      <span className="text-base font-medium max-[1100px]:text-sm">
        {props.title}
      </span>
      <span className="text-sm font-normal text-[#828282] max-[1100px]:text-xs">
        {isnº ? `nº ${props.description}` : props.description}
      </span>
    </div>
  );
};

//// Botão gerenciar  ////
RequestComponent.ColumnButtonManage =
  function RequestComponentColumnButtonManage({
    onOpen,
  }: ColumnButtonManageProps) {
    return (
      <div className="flex items-center justify-center max-[768px]:col-span-2 max-[768px]:row-end-4">
        <Button
          size={"sm"}
          onClick={onOpen}
          className="w-[130px] rounded-xl bg-cinza_destaque text-base font-semibold text-black hover:bg-hover_cinza_destaque"
        >
          Gerenciar
        </Button>
      </div>
    );
  };
