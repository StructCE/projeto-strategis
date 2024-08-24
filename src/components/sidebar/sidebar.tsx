import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import SidebarButton from "./sidebarButton";
import { sidebarButtons } from "./sidebarButtonsData";

export function Sidebar() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  return (
    <ScrollArea className="w-fill">
      <Accordion type="multiple" className="mb-0 w-full">
        {Object.entries(sidebarButtons).map(([category, items], index) => (
          <AccordionItem
            className="pb-0"
            key={index}
            value={`item-${index + 1}`}
          >
            <AccordionTrigger className="pb-0 text-base sm:text-lg">
              {category}
            </AccordionTrigger>

            {items.map((item, itemIndex) => (
              <AccordionContent className="flex-row p-[5px]" key={itemIndex}>
                <SidebarButton
                  iconSource={item.iconSource}
                  refLink={item.linkRef}
                  buttonRef={buttonRef}
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
