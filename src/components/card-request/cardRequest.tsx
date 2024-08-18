import React from "react";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";

type RequestProps = {
  classname?: string;
  children: React.ReactNode;
};

export const RequestComponent = (props: RequestProps) => {
  const rootStyle = cn(
    "mx-24 my-5 border-1 solid gap-auto rounded-lg py-2.5 px-4 shadow-[0px_0px_4px_0px_#0000004d]",
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
    "grid grid-cols-5 grid-rows-2 gap-2 items-center",
    props.className,
  );
  return <div className={style}>{props.children}</div>;
};

//// Linha itens (Título e Descrição) ////
type RequestComponentColumnItemProps = {
  title: string;
  description: string;
};

RequestComponent.ColumnItem = function RequestComponentColumnItem(
  props: RequestComponentColumnItemProps,
) {
  return (
    <div className="flex flex-col">
      <span className="text-xl font-medium">{props.title}</span>
      <span className="text-base font-normal text-[#828282]">
        {props.description}
      </span>
    </div>
  );
};

//// Botão confirmar ////

RequestComponent.ColumnButtonConfirm =
  function RequestComponentColumnButtonConfirm() {
    return (
      <div className="flex items-center justify-center">
        <Button
          size={"sm"}
          className="w-24 rounded-xl bg-verde_botao hover:bg-hover_verde_botao"
        >
          Confirmar
        </Button>
      </div>
    );
  };

//// Botão rejeitar  ////

RequestComponent.ColumnButtonReject =
  function RequestComponentColumnButtonReject() {
    return (
      <div className="flex items-center justify-center">
        <Button
          size={"sm"}
          className="w-24 rounded-xl bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
        >
          Rejeitar
        </Button>
      </div>
    );
  };

//// Coluna responsável (título e descrição, ocupando 2 rows) ////
type RequestComponentColumnResponsibleProps = {
  title: string;
  description: string;
};

RequestComponent.ColumnResponsible = function RequestComponentColumnItem(
  props: RequestComponentColumnResponsibleProps,
) {
  return (
    <div className="row-span-2 mx-auto flex flex-col justify-center">
      <span className="text-base font-medium">{props.title}</span>
      <span className="text-sm font-medium text-[#828282]">
        {props.description}
      </span>
    </div>
  );
};
