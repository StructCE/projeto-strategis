"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import { ScrollArea } from "../../../ui/scroll-area";
import SidebarButton from "./button/sidebarButton";
import { sidebarButtons } from "./button/sidebarButtonsData";
import { useSidebarButtons } from "./button/useSidebarButtons";

export function SidebarContent() {
  const buttons = useSidebarButtons();
  return (
    <ScrollArea className="w-fill h-[90%]">
      <Accordion type="multiple" className="mb-0 w-full">
        {Object.entries(sidebarButtons).map(([category, items], index) => (
          <AccordionItem className="" key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="pb-0 text-base sm:text-lg">
              {category}
            </AccordionTrigger>

            {items.map((item, itemIndex) => (
              <AccordionContent
                className="flex-row p-[5px] pb-2 pt-[3px]"
                key={itemIndex}
              >
                <SidebarButton
                  {...buttons}
                  icon={item.icon}
                  refLink={item.refLink}
                  name={item.name}
                  disabled={false} //TODO: logica para habilitar o botão
                />
              </AccordionContent>
            ))}
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}
