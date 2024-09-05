"use client";
import { Label } from "@radix-ui/react-label";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useSignHook } from "./useSignHook";

export const SignInForm = () => {
  const signIn = useSignHook();
  return (
    <form onSubmit={signIn.handleSignIn}>
      <div className="space-y-6 max-[650px]:mx-4 max-[650px]:text-center">
        <div>
          <div className="mb-3 grid w-full max-w-sm gap-1 text-left max-[650px]:mx-auto">
            <Label className="text-cinza_destaque" htmlFor="email">
              Email
            </Label>
            <div>
              <Input
                type="email"
                className=""
                id="email"
                placeholder="Digite seu email"
                value={signIn.email}
                onChange={(e) => signIn.setEmail(e.target.value)}
              />
              {signIn.errors?.fieldErrors?.email?.map((err) => (
                <p
                  key={err}
                  className="absolute text-right text-sm text-red-500"
                >
                  {err}
                </p>
              ))}
            </div>
          </div>
          <div className="grid w-full max-w-sm items-center gap-1 text-left max-[650px]:mx-auto">
            <Label className="text-cinza_destaque" htmlFor="password">
              Senha
            </Label>
            <div>
              <Input
                type="password"
                className=""
                id="password"
                placeholder="Digite sua senha"
                value={signIn.password}
                onChange={(event) => signIn.setPassword(event.target.value)}
              />
              {signIn.errors?.fieldErrors?.password?.map((err) => (
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
          onClick={signIn.handleSignIn}
          className="relative w-full max-w-sm overflow-hidden bg-vermelho_botao_1 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-hover_vermelho_login before:duration-200 before:ease-out hover:bg-hover_vermelho_login hover:shadow-[#ff332852] hover:before:h-96 hover:before:w-96"
        >
          <span className="relative z-10">Entrar</span>
        </Button>
      </div>
    </form>
  );
};
