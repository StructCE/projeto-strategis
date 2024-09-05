"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import UnitRegister from "./_components/createUnits/unitRegister";
import { useUnitForm } from "./_components/createUnits/useUnitForm";
import { ManageCategoriesTable } from "./_components/manageUnits/manageUnits";

export default function Units() {
  const { form, onSubmit } = useUnitForm();

  return (
    <AccordionItem value="item-7" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Unidades
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">Cadastrar nova unidade:</p>
        <UnitRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">Unidades já cadastradas:</p>
        <ManageCategoriesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
