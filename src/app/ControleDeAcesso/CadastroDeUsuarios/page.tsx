"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { UserRegister } from "./_components/createUsers/userRegister";
import { ManageUsersTable } from "./_components/manageUsers/manageUsers";

export default function UsersRegister() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.allowedPagesPath.includes(pathname)
    ) {
      redirect("/");
    }
  }, [session, status, pathname]);

  if (status === "loading") return null;

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <UserRegister />
      <ManageUsersTable />
    </div>
  );
}
