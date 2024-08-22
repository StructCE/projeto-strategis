import { Menu } from "lucide-react";
import { Button } from "../ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import SidebarLogo from "./logo";
import { SidebarContent } from "./sidebar";

export function Sidebar() {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="bg-fundo_sidebar p-0 text-white">
        <SheetHeader>
          <SidebarLogo />
        </SheetHeader>

        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
