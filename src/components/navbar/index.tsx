import { NavbarDropdown } from "./_components/navbarDropdown";
import { NavbarSelect } from "./_components/navbarSelect";
import { Empresas, UserData } from "./_components/userData";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 z-10 flex h-20 w-full items-center justify-end gap-12 bg-black px-20">
      <NavbarSelect userData={UserData} empresas={Empresas} />
      <NavbarDropdown userData={UserData} />
    </nav>
  );
}
