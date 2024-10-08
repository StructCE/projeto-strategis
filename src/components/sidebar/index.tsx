import { SidebarContent } from "./_components/sidebarContent/sidebarContent";
import SidebarLogo from "./_components/sidebarLogo";

export default function SidebarContainer() {
  return (
    <div className="fixed z-20 hidden h-fit w-full border-none bg-fundo_sidebar p-0 text-white sm:h-screen sm:w-[270px] xl:block xl:w-[330px]">
      <SidebarLogo />
      <SidebarContent />
    </div>
  );
}
