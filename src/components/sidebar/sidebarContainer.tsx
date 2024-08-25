"use client";
import { SidebarContent } from "./_components/sidebarContent";
import SidebarLogo from "./_components/sidebarLogo";

export default function SidebarContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <div className="hidden h-fit w-full border-none bg-fundo_sidebar p-0 text-white sm:block sm:h-screen sm:w-[270px] lg:w-[330px]">
        <SidebarLogo />
        <SidebarContent />
      </div>
      <div className="flex-1 overflow-auto p-4 sm:p-8">{children}</div>
    </div>
  );
}
