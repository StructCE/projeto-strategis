import Image from "next/image";
import Link from "next/link";

export default function SidebarLogo() {
  return (
    <div className="flex h-fit w-full items-center justify-center border-b-2 border-cinza_mais_escuro_botao p-4">
      <Link href="/">
        <Image
          src="/logo-strategis.svg"
          width={180}
          height={54}
          alt="logo"
          className="mr-4"
        />
      </Link>
    </div>
  );
}
