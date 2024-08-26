"use client";
import { UserRound } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type UserDataType } from "./userData";

interface NavbarDropdownProps {
  userData: UserDataType;
}

import { useNavbar } from "./useNavbar";

export const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ userData }) => {
  const { handleSignOut } = useNavbar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer rounded-full border-[2px] border-white p-1">
          <UserRound color="white" size={26} strokeWidth={2} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 mt-1.5 flex w-64 flex-col gap-2 p-4">
        <DropdownMenuLabel className="p-0">
          Nome: <span className="font-normal">{userData.nome}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          Telefone: <span className="font-normal">{userData.telefone}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          Cargo: <span className="font-normal">{userData.cargo}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          Empresa: <span className="font-normal">{userData.empresa}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          <Button
            className="h-fit bg-white p-0 pt-1 text-[15px] font-bold text-vermelho_strategis hover:bg-white"
            onClick={handleSignOut}
          >
            Sair
          </Button>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
