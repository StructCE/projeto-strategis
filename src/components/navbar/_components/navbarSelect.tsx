"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { companies, type User } from "./navbarData";

interface NavbarSelectProps {
  user: User;
}

export const NavbarSelect: React.FC<NavbarSelectProps> = ({ user }) => {
  const [selectCompany, setSelectCompany] = useState(user.company);

  return (
    <Select onValueChange={setSelectCompany} defaultValue={selectCompany}>
      <SelectTrigger className="h-fit w-fit gap-4 rounded-xl border-[1.5px] border-vermelho_botao_1 bg-black px-3 py-1.5 text-[12px] text-white ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 sm:px-4 sm:py-2 sm:text-base">
        <SelectValue placeholder="Cargo do usuário" />
      </SelectTrigger>
      <SelectContent>
        {companies.map((company, index) => (
          <SelectItem value={company.value} key={index}>
            {company.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
