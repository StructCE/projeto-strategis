"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { Button } from "~/components/ui/button";

export function SignInButton() {
  return (
    <Button
      className="font-inter flex gap-3 rounded-full bg-[#ECECEC] py-6 pl-0 pr-6 text-lg font-medium text-black/60 hover:bg-[#E2E2E2]"
      onClick={() =>
        signIn("google", {
          callbackUrl: "/",
        })
      }
    >
      <Image alt="" src="/google.png" width={56} height={56}></Image>
      Fazer Login com o Google
    </Button>
  );
}
