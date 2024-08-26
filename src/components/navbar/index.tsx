import { Button } from "../ui/button";
import { UserRound } from "lucide-react";
import { Select, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
    return (
        <nav className="bg-black w-full max-w-screen-2xl h-24 mx-auto p-4 py-6 flex items-center justify-between space-x-4">
            <Select>
                <SelectTrigger className="bg-black px-4 py-2 border border-red-800 rounded-xl text-white w-40 right-px">
                    <SelectValue placeholder="Nome Empresa" className="text-white text-sm font-medium"></SelectValue>
                </SelectTrigger>
            </Select>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <UserRound color="white" size={30} strokeWidth={1.5}></UserRound>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-60">
                    <DropdownMenuLabel>Nome: Nome do Usuário</DropdownMenuLabel>
                    <DropdownMenuLabel>Telefone: (XX) XXXXX-XXXX</DropdownMenuLabel>
                    <DropdownMenuLabel>Cargo: Cargo do Usuário</DropdownMenuLabel>
                    <DropdownMenuLabel>Empresa: Empresa do Usuário</DropdownMenuLabel>
                    <Button className="bg-white text-black font-semibold hover:bg-red-700 hover:text-white">Sair</Button>
                </DropdownMenuContent>
            </DropdownMenu>
        </nav>

    );
};


export default Navbar;
