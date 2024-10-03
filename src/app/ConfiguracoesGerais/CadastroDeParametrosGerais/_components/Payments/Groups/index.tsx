"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { default as DocumentTypeRegister } from "./_components/createGroup/groupRegister";
import { useGroupForm } from "./_components/createGroup/useGroupForm";
import { ManageGroupsTable } from "./_components/manageGroups/manageGroups";

export default function Groups() {
  const { form, onSubmit } = useGroupForm();

  return (
    <AccordionItem value="item-11" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Grupos
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">Cadastrar novo grupo:</p>
        <DocumentTypeRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">Grupos já cadastrados:</p>
        <ManageGroupsTable />
      </AccordionContent>
    </AccordionItem>
  );
}
