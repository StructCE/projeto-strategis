import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import type { FormEvent } from "react";
import type { z } from "zod";
import type { signInSchema } from "./signInSchema";

type SignInFormsProps = {
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  handleSignIn: (event: FormEvent) => void;
  errors: z.inferFlattenedErrors<typeof signInSchema> | undefined;
};

export const SignInForm = (props: SignInFormsProps) => {
  return (
    <form onSubmit={props.handleSignIn}>
      <div className="space-y-10 max-[650px]:mx-4 max-[650px]:text-center">
        <div>
          <div className="mb-6 grid w-full max-w-sm gap-1.5 text-left max-[650px]:mx-auto">
            <Label className="text-[#D1D5DB]" htmlFor="email">
              Email
            </Label>
            <div>
              <Input
                type="email"
                className=""
                id="email"
                placeholder="Digite seu email"
                value={props.email}
                onChange={(e) => props.setEmail(e.target.value)}
              />
              {props.errors?.fieldErrors?.email?.map((err) => (
                <p
                  key={err}
                  className="absolute text-right text-sm text-red-500"
                >
                  {err}
                </p>
              ))}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 text-left max-[650px]:mx-auto">
            <Label className="text-[#D1D5DB]" htmlFor="password">
              Senha
            </Label>
            <div>
              <Input
                type="password"
                className=""
                id="password"
                placeholder="Digite sua senha"
                value={props.password}
                onChange={(event) => props.setPassword(event.target.value)}
              />
              {props.errors?.fieldErrors?.password?.map((err) => (
                <p
                  key={err}
                  className="absolute text-right text-sm text-red-500"
                >
                  {err}
                </p>
              ))}
            </div>
          </div>
        </div>
        <Button
          onClick={props.handleSignIn}
          className="relative w-full max-w-sm overflow-hidden bg-[#C43D3D] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#622631] before:duration-200 before:ease-out hover:bg-[#622631] hover:shadow-[#ff332852] hover:before:h-96 hover:before:w-96"
        >
          <span className="relative z-10">Entrar</span>
        </Button>
      </div>
    </form>
  );
};
