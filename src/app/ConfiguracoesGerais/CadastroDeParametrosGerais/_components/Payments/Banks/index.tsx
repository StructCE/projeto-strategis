"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { default as DocumentTypeRegister } from "./_components/createBank/bankRegister";
import { useBankForm } from "./_components/createBank/useBankForm";
import { ManageBanksTable } from "./_components/manageBanks/manageBanks";

export default function Banks() {
  const { form, onSubmit } = useBankForm();

  return (
    <AccordionItem value="item-10" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Bancos
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">Cadastrar novo banco:</p>
        <DocumentTypeRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">Bancos já cadastrados:</p>
        <ManageBanksTable />
      </AccordionContent>
    </AccordionItem>
  );
}
