"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { ShelfRegister } from "./_components/createShelves/shelvesRegister";
import { ManageShelvesTable } from "./_components/manageShelves/manageShelves";

export default function Shelves() {
  return (
    <AccordionItem value="item-6" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Prateleiras
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar nova prateleira:
        </p>
        <ShelfRegister />
        <p className="py-2 text-[16px] font-medium">
          Prateleiras já cadastradas e seus endereços:
        </p>
        <ManageShelvesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
