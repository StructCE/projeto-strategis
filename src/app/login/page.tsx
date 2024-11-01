"use client";
import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";
import BgLogin from "../../lib/assets/bg-login";
import Ilustracao from "../../lib/assets/ilustracao";
import LogoBranca from "../../lib/assets/logo-branca";

export default function Login() {
  const handleLogin = async () => {
    // Limpa o localStorage
    localStorage.clear();

    // Faz o login usando o provedor Google
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex w-full">
      <div className="absolute z-[-1] h-screen w-full overflow-hidden">
        <BgLogin />
      </div>
      <div className="grid auto-rows-min grid-cols-2 gap-y-10 p-4 max-[1024px]:grid-cols-1 max-[425px]:gap-y-5 sm:p-10 md:p-20">
        <div className="flex w-full flex-col gap-6 sm:w-fit sm:gap-20">
          <div className="ml-12 flex h-32 w-[70%] items-center justify-center sm:ml-0 sm:w-full sm:justify-start">
            <LogoBranca />
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="text-center font-aldrich text-2xl text-white sm:text-left md:text-5xl">
              Sistema de Gestão de Estoque
            </h1>
            <div className="flex w-full flex-col gap-2 sm:w-fit">
              <p className="text-center font-montserrat text-lg font-medium text-white sm:text-left sm:text-xl sm:font-semibold md:text-2xl">
                Faça login na sua conta com Google
              </p>
              <Button
                onClick={handleLogin}
                className="relative w-full overflow-hidden bg-vermelho_botao_1 px-4 text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-hover_vermelho_login before:duration-200 before:ease-out hover:bg-hover_vermelho_login hover:shadow-[#ff332852] hover:before:h-96 hover:before:w-96"
              >
                <span className="relative z-10">Entrar</span>
              </Button>
            </div>
          </div>
        </div>
        <div className="col-start-2 p-2 max-[1024px]:hidden">
          <Ilustracao />
        </div>
      </div>
    </div>
  );
}

{
  /* Login com credenciais:
<div className="grid auto-rows-min grid-cols-2 gap-y-10 max-[1024px]:grid-cols-1 max-[425px]:gap-y-5">
<div className="absolute z-[-1] h-screen w-full overflow-hidden">
<BgLogin />
</div>
<div className="col-span-2 w-full max-[425px]:p-4">
<div className="ml-20 flex h-48 w-[85%] items-center max-[650px]:justify-center sm:w-full">
<LogoBranca />
</div>
</div>
<div className="row-start-2 self-center max-[425px]:p-4">
<div className="ml-20 space-y-3 max-[650px]:ml-0">
<h1 className="mb-12 font-aldrich text-5xl text-white max-[1400px]:text-4xl max-[650px]:mx-2 max-[650px]:text-center max-[425px]:text-3xl">
  Sistema de Gestão de Estoque
</h1>
<p className="font-montserrat text-2xl font-semibold text-white max-[1400px]:text-xl max-[650px]:mx-2 max-[650px]:text-center max-[425px]:text-lg">
  Faça login na sua conta com Google
</p>
<SignInForm />
</div>
</div>
<div className="row-start-2 p-2 max-[1024px]:hidden">
<Ilustracao />
</div>
</div> */
}
