"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { DropdownMenuLabel } from "~/components/ui/dropdown-menu";

export default function SignButtons() {
  return (
    <>
      <DropdownMenuLabel className="p-0">
        <Button
          className="h-fit bg-white p-0 pt-1 text-[15px] font-bold text-vermelho_strategis hover:bg-white"
          onClick={() => signOut()}
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
    </>
  );
}
