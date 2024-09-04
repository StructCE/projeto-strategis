"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type EmpresasType, type UserDataType } from "./userData";

interface NavbarSelectProps {
  userData: UserDataType;
  empresas: EmpresasType;
}

export const NavbarSelect: React.FC<NavbarSelectProps> = ({
  userData,
  empresas,
}) => {
  const [selectEmpresa, setSelectEmpresa] = useState(userData.empresa);

  return (
    <Select onValueChange={setSelectEmpresa} defaultValue={selectEmpresa}>
      <SelectTrigger className="h-fit w-fit gap-4 rounded-xl border-[1.5px] border-vermelho_botao_1 bg-black px-3 py-1.5 text-[12px] text-white ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-4 sm:py-2 sm:text-base">
        <SelectValue placeholder="Cargo do usuário" />
      </SelectTrigger>
      <SelectContent>
        {empresas.map((empresa, index) => (
          <SelectItem value={empresa.value} key={index}>
            {empresa.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
