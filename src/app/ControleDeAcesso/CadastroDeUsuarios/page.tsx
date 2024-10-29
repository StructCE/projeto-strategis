"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { UserRegister } from "./_components/createUsers/userRegister";
import { ManageUsersTable } from "./_components/manageUsers/manageUsers";

export default function UsersRegister() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  return (
    <div className="flex w-full flex-col gap-4 bg-fundo_branco">
      <UserRegister />
      <ManageUsersTable />
    </div>
  );
}
