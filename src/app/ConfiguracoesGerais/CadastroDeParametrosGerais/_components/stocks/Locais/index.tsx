import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function Locais() {
  return (
    <>
      <AccordionItem
        value="item-1"
        className="border-cinza_borda_acordeao px-0"
      >
        <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
          Locais
        </AccordionTrigger>
        <AccordionContent>Locais</AccordionContent>
      </AccordionItem>
    </>
  );
}
