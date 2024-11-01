"use client";
import { UserRound } from "lucide-react";
import { type Session } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useCompany } from "~/lib/companyProvider";
import { api } from "~/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import SignButtons from "./_components/signButtons";

export default function Navbar({ session }: { session: Session | null }) {
  const { data: user } = api.user.getUserById.useQuery({
    id: session?.user.id,
  });

  const { data: companies = [] } = api.company.getAllCompanies.useQuery({
    filters: {},
  });
  const { data: roles = [] } = api.role.getAll.useQuery();

  function formatPhoneNumber(
    phone: string | null | undefined,
  ): string | undefined {
    const cleaned = phone?.replace(/\D/g, ""); // Remove caracteres não numéricos
    const isMobile = cleaned?.length === 11; // Verifica se o número tem 11 dígitos

    if (isMobile) {
      // Formato (XX) XXXXX-XXXX
      return cleaned?.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      // Formato (XX) XXXX-XXXX
      return cleaned?.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  }

  const { selectedCompany, setSelectedCompany } = useCompany();

  return (
    <nav className="z-10 flex h-[64px] w-full items-center justify-end gap-8 bg-black px-2 sm:h-[74px] sm:gap-12 sm:px-16 lg:h-[87px]">
      {/* Select */}
      {user?.UserRole.some(
        (userRole) => userRole.role.name === "Administrador",
      ) && (
        <Select
          onValueChange={setSelectedCompany}
          value={selectedCompany ?? ""}
          defaultValue={selectedCompany ?? ""}
        >
          <SelectTrigger className="h-fit w-fit gap-4 rounded-xl border-[1.5px] border-vermelho_botao_1 bg-black px-3 py-1.5 text-[12px] text-white ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-4 sm:py-2 sm:text-base">
            <SelectValue placeholder="Empresa a Operar" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all_companies">Todas Empresas</SelectItem>
            {companies.map((company, index) => (
              <SelectItem value={company.name} key={index}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {/* Dropdown */}
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
            Nome: <span className="font-normal">{session?.user.name}</span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-0">
            Telefone:{" "}
            <span className="font-normal">
              {formatPhoneNumber(session?.user.phone)}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-0">
            Empresa:{" "}
            <span className="font-normal">
              {user?.UserRole[0]?.company.name}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-0">
            Cargo:{" "}
            <span className="font-normal">{user?.UserRole[0]?.role.name}</span>
          </DropdownMenuLabel>
          <SignButtons />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
