"use client";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
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

  const session = useSession();
  const userId = session.data?.user.id;

  // Busca os dados do usuário, incluindo cargos e permissões
  const { data: user } = api.user.getUserById.useQuery({ id: userId });

  // Extrair os códigos dos módulos permitidos para o usuário
  const userPermissions =
    user?.UserRole?.flatMap((userRole) =>
      userRole.role?.modules.map((mod) => mod.pagePath),
    ) ?? [];

  return (
    <ScrollArea className="w-fill h-[90%]">
      <Accordion type="multiple" className="mb-0 w-full">
        {Object.entries(sidebarButtons).map(([category, items], index) => (
          <AccordionItem className="" key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="pb-0 text-base sm:text-lg">
              {category}
            </AccordionTrigger>

            {items.map((item, itemIndex) => {
              const isDisabled = !userPermissions.includes(item.refLink);

              return (
                <AccordionContent
                  className="flex-row p-[5px] pb-2 pt-[3px]"
                  key={itemIndex}
                >
                  <SidebarButton
                    {...buttons}
                    icon={item.icon}
                    refLink={item.refLink}
                    name={item.name}
                    disabled={isDisabled} // Desabilita o botão com base na permissão
                  />
                </AccordionContent>
              );
            })}
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  );
}
