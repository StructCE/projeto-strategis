"use client";
import { signIn } from "next-auth/react";
import { CldImage } from "next-cloudinary";
import { Button } from "~/components/ui/button";

export function SignInButton() {
  return (
    <Button
      className="flex gap-3 rounded-full bg-[#ECECEC] py-6 pl-0 pr-6 font-inter text-lg font-medium text-black/60 hover:bg-[#E2E2E2]"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <CldImage alt="" src="google" width={56} height={56}></CldImage>
      Fazer Login com o Google
    </Button>
  );
}
