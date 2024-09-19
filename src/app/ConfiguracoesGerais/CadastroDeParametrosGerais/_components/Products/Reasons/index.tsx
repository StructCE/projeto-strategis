"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import UnitRegister from "./_components/createReasons/reasonRegister";
import { useReasonForm } from "./_components/createReasons/useReasonForm";
import { ManageReasonsTable } from "./_components/manageReasons/manageReasons";

export default function Reasons() {
  const { form, onSubmit } = useReasonForm();

  return (
    <AccordionItem value="item-8" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Motivos de Ajustes de Estoque
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar novo motivo para ajuste de estoque:
        </p>
        <UnitRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">Motivos já cadastrados:</p>
        <ManageReasonsTable />
      </AccordionContent>
    </AccordionItem>
  );
}
