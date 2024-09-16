"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import PlaceRegister from "./_components/createPlaces/placeRegister";
import { usePlaceForm } from "./_components/createPlaces/usePlaceForm";
import { ManagePlacesTable } from "./_components/managePlaces/managePlaces";

export default function Places() {
  const { form, onSubmit } = usePlaceForm();

  return (
    <AccordionItem value="item-4" className="border-vinho_strategis px-0">
      <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
        Locais
      </AccordionTrigger>
      <AccordionContent>
        <p className="pb-2 text-[16px] font-medium">Cadastrar novo local:</p>
        <PlaceRegister form={form} onSubmit={onSubmit} />
        <p className="py-2 text-[16px] font-medium">
          Locais já cadastrados e seus armários/zonas pertencentes:
        </p>
        <ManagePlacesTable />
      </AccordionContent>
    </AccordionItem>
  );
}
