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
    <AccordionItem value="item-3" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Setores de Utilização
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">
          Cadastrar novo Setor de Utilização:
        </p>
        <SectorRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Setores de Utilização já cadastrados:
        </p>
        <ManageSectorsTable />
      </AccordionContent>
    </AccordionItem>
  );
}
