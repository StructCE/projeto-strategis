"use client";
import { UserRound } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { type User } from "./userData";

interface NavbarDropdownProps {
  user: User;
}

import Link from "next/link";
import { useNavbar } from "./useNavbar";

export const NavbarDropdown: React.FC<NavbarDropdownProps> = ({ user }) => {
  const { handleSignOut } = useNavbar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex cursor-pointer rounded-full border-[2px] border-white p-1">
          <UserRound
            color="white"
            className="size-[23px] stroke-[1.5px] sm:size-[26px] sm:stroke-2"
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4 mt-1.5 flex w-64 flex-col gap-2 p-4">
        <DropdownMenuLabel className="p-0">
          Nome: <span className="font-normal">{user.name}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          Telefone: <span className="font-normal">{user.phone}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          Cargo: <span className="font-normal">{user.role}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          Empresa: <span className="font-normal">{user.company}</span>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          <Button
            className="h-fit bg-white p-0 pt-1 text-[15px] font-bold text-vermelho_strategis hover:bg-white"
            onClick={handleSignOut}
          >
            Sair
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuLabel className="p-0">
          <Link
            className="h-fit bg-white p-0 pt-1 text-[15px] font-bold text-verde_botao hover:bg-white"
            href="/login"
          >
            Entrar
          </Link>
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
