import { useState, type FormEvent } from "react";
import { signInSchema } from "./signInSchema";
import type { z } from "zod";

export const useSignHook = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] =
    useState<z.inferFlattenedErrors<typeof signInSchema>>();

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();

    const parsed = signInSchema.safeParse({ email, password });
    if (parsed.success) {
      console.log("Email:", parsed.data.email);
      console.log("Senha:", parsed.data.password);
    } else {
      setErrors(parsed.error.flatten());
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    setErrors,
    handleSignIn,
  };
};
