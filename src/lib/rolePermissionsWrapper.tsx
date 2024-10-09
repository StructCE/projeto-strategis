"use client";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

export function RolePermissionsWrapper({
  children,
}: {
  children: React.ReactNode[];
}) {
  const session = useSession();
  const router = useRouter();
  const path = usePathname();
  if (!session) {
    router.push("/login");
  }
  if (path !== "/" && !session.data?.user.allowedFrontendPaths.includes(path)) {
    router.push("/");
  }
  return <>{children}</>;
}
