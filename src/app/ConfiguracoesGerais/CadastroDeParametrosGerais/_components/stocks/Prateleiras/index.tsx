"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ShelfRegister from "./_components/createShelves/shelvesRegister";
import { useShelfForm } from "./_components/createShelves/useShelvesForm";
import { ManageShelvesTable } from "./_components/manageShelves/manageShelves";

export default function Prateleiras() {
  const { form, onSubmit } = useShelfForm();

  return (
    <AccordionItem value="item-6" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Prateleiras
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar nova Prateleira:
        </p>
        <ShelfRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Prateleiras já cadastradas e seus endereços:
        </p>
        <ManageShelvesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
