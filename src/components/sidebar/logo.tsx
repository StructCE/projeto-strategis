import Link from "next/link";
import Image from "next/image";

export default function SidebarLogo() {
  return (
    <div className="flex h-fit w-full items-center justify-center p-4">
      <Link href="/">
        <Image src="/logo-strategis.svg" width={180} height={54} alt="logo" />
      </Link>
    </div>
  );
}
