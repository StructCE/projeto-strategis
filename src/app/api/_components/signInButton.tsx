"use client";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      className="rounded-md border-[1px] border-gray-400 px-8 py-2 text-2xl"
      onClick={() => signIn("google")}
    >
      Entrar
    </button>
  );
}
