"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import SectorRegister from "./_components/createSectors/sectorRegister";
import { useSectorForm } from "./_components/createSectors/useSectorForm";
import { ManageSectorsTable } from "./_components/manageSectors/manageSectors";

export default function SetoresDeUtilizacao() {
  const { form, onSubmit } = useSectorForm();

  return (
    <AccordionItem value="item-3" className="border-cinza_borda_acordeao px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Setores de Utilização
      </AccordionTrigger>
      <AccordionContent>
        <SectorRegister form={form} onSubmit={onSubmit} />
        <p className="pb-2 text-[16px]">
          Setores de Utilização já cadastrados:
        </p>
        <ManageSectorsTable />
      </AccordionContent>
    </AccordionItem>
  );
}