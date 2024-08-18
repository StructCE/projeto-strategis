"use client";
import { useSignHook } from "./useSignHook";
import { SignInForm } from "./signInForm";

export const FormsContainer = () => {
  const signIn = useSignHook();

  return (
    <>
      <SignInForm {...signIn} />
    </>
  );
};
