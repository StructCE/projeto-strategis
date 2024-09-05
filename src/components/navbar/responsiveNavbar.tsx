"use client";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { SidebarContent } from "../sidebar/_components/sidebarContent/sidebarContent";
import { NavbarDropdown } from "./_components/navbarDropdown";
import { NavbarSelect } from "./_components/navbarSelect";
import { companies, user } from "./_components/userData";

export default function Navbar() {
  return (
    <nav className="flex w-screen items-center bg-black px-4 py-3 sm:px-6 sm:py-4">
      <Accordion className="flex w-full border-none" type="single" collapsible>
        <AccordionItem className="w-full border-none" value="menu">
          <div className="flex w-full items-center justify-between px-0">
            <AccordionTrigger className="m-0 p-0">
              <Menu className="size-[36px]" color="white" />
            </AccordionTrigger>
            <div className="flex items-center gap-6 sm:gap-8">
              <NavbarSelect user={user} companies={companies} />
              <NavbarDropdown user={user} />
            </div>
          </div>
          <AccordionContent className="mt-4 w-full text-white">
            <SidebarContent />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </nav>
  );
}
