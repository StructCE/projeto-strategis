import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function Prateleiras() {
  return (
    <>
      <AccordionItem
        value="item-3"
        className="border-cinza_borda_acordeao px-0"
      >
        <AccordionTrigger className="mx-0 pb-1 text-[24px] font-medium">
          Prateleiras
        </AccordionTrigger>
        <AccordionContent>Prateleiras</AccordionContent>
      </AccordionItem>
    </>
  );
}
