"use client";
import { SignInForm } from "./signInForm";
import { useSignHook } from "./useSignHook";

export const FormsContainer = () => {
  const signIn = useSignHook();

  return <SignInForm {...signIn} />;
};
