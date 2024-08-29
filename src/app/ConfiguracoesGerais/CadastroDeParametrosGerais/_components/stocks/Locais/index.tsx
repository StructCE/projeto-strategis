"use client";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import PlaceRegister from "./_components/createPlaces/placeRegister";
import { usePlaceForm } from "./_components/createPlaces/usePlaceForm";
import { ManagePlacesTable } from "./_components/managePlaces/managePlaces";

export default function Locais() {
  const { form, onSubmit } = usePlaceForm();

  return (
    <>
      <AccordionItem
        value="item-4"
        className="border-cinza_borda_acordeao px-0"
      >
        <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
          Locais
        </AccordionTrigger>
        <AccordionContent>
          <PlaceRegister form={form} onSubmit={onSubmit} />
          <p className="pb-2 text-[16px]">
            Locais já cadastrados e seus armários e zonas associados:
          </p>
          <ManagePlacesTable />
        </AccordionContent>
      </AccordionItem>
    </>
  );
}
