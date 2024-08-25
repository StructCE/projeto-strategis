"use client";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { Sidebar as SidebarContent } from "./sidebarContent";
import SidebarLogo from "./sidebarLogo";

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
        className="h-screen w-full border-none bg-fundo_sidebar p-0 text-white sm:w-[330px]"
      >
        <SheetHeader>
          <SidebarLogo />
        </SheetHeader>

        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
