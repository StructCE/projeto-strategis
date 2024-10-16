"use client";
import { UserRound } from "lucide-react";
import { type Session } from "next-auth";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
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

  const { data: companies = [] } = api.company.getAllCompanies.useQuery();
  const { data: roles = [] } = api.role.getAll.useQuery();

  const getCompanyNameById = (companyId: string) => {
    const company = companies.find((company) => company.id === companyId);
    return company ? company.name : "Empresa não encontrada";
  };

  const getRoleNameById = (roleId: string) => {
    const role = roles.find((role) => role.id === roleId);
    return role ? role.name : "Cargo não encontrado";
  };

  const [selectCompanyId, setSelectCompanyId] = useState<string>("");

  useEffect(() => {
    // Verificar se o window existe (somente no client-side)
    if (typeof window !== "undefined") {
      const storedCompanyId = localStorage.getItem("selectCompanyId");
      if (storedCompanyId) {
        setSelectCompanyId(storedCompanyId);
      }
    }
  }, []);

  useEffect(() => {
    if (selectCompanyId) {
      localStorage.setItem("selectCompanyId", selectCompanyId);
    }
  }, [selectCompanyId]);

  return (
    <nav className="z-10 flex h-[64px] w-full items-center justify-end gap-8 bg-black px-2 sm:h-[74px] sm:gap-12 sm:px-16 lg:h-[87px]">
      {/* Select */}
      {user?.UserRole.some(
        (userRole) => getRoleNameById(userRole.roleId) === "Administrador",
      ) && (
        <Select
          onValueChange={setSelectCompanyId}
          defaultValue={selectCompanyId}
        >
          <SelectTrigger className="h-fit w-fit gap-4 rounded-xl border-[1.5px] border-vermelho_botao_1 bg-black px-3 py-1.5 text-[12px] text-white ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-4 sm:py-2 sm:text-base">
            <SelectValue placeholder="Empresa a Operar" />
          </SelectTrigger>
          <SelectContent>
            {companies.map((company, index) => (
              <SelectItem value={company.id} key={index}>
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
            Telefone: <span className="font-normal">{session?.user.phone}</span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-0">
            Cargo:{" "}
            <span className="font-normal">
              {user?.UserRole.map((userRole) =>
                getRoleNameById(userRole.roleId),
              ).join(", ")}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuLabel className="p-0">
            Empresa:{" "}
            <span className="font-normal">
              {user?.UserRole.map((userRole) =>
                getCompanyNameById(userRole.companyId),
              ).join(", ")}
            </span>
          </DropdownMenuLabel>
          <SignButtons />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
