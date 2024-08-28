import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function ArmariosZonas() {
  return (
    <>
      <AccordionItem
        value="item-2"
        className="border-cinza_borda_acordeao px-0"
      >
        <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
          Armários/Zonas
        </AccordionTrigger>
        <AccordionContent>Armários/Zonas</AccordionContent>
      </AccordionItem>
    </>
  );
}
