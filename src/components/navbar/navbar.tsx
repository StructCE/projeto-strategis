import { NavbarDropdown } from "./_components/navbarDropdown";
import { NavbarSelect } from "./_components/navbarSelect";
import { companies, user } from "./_components/userData";

export default function Navbar() {
  return (
    <nav className="z-10 flex h-[64px] w-full items-center justify-end gap-8 bg-black px-8 sm:h-[74px] sm:gap-12 sm:px-16 lg:h-[87px]">
      <NavbarSelect user={user} companies={companies} />
      <NavbarDropdown user={user} />
    </nav>
  );
}
