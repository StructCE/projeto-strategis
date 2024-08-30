"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import TypeRegister from "./_components/createTypes/typeRegister";
import { useTypeForm } from "./_components/createTypes/useTypeForm";
import { ManageTypesTable } from "./_components/manageTypes/manageTypes";

export default function TiposDeControle() {
  const { form, onSubmit } = useTypeForm();

  return (
    <AccordionItem value="item-1" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Tipos de Controle
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar novo Tipo de Controle:
        </p>
        <TypeRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Tipos de Controle já cadastrados:
        </p>
        <ManageTypesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
