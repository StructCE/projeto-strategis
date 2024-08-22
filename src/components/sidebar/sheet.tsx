"use client";

import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import SidebarLogo from "./logo";
import { SidebarContent } from "./sidebar-content";

export function Sidebar() {
  const [side, setSide] = useState<"left" | "top" | "bottom" | "right">("left");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 640) {
        setSide("top");
      } else {
        setSide("left");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent
        side={side}
        className="h-screen bg-fundo_sidebar p-0 text-white border-none"
      >
        <SheetHeader>
          <SidebarLogo />
        </SheetHeader>

        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
