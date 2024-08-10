import { getServerAuthSession } from "~/server/auth";
import { SignInButton } from "./_components/signInButton";
import BgLogin from "./_components/bg-login";
import Ilustracao from "./_components/ilustracao";
import LogoBranca from "./_components/logo-branca";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Checkbox } from "../../components/ui/checkbox";
import { Button } from "../../components/ui/button";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <div className="grid auto-rows-min grid-cols-2 gap-y-10 max-[1024px]:grid-cols-1 max-[425px]:gap-y-5">
      <div className="absolute z-[-1] h-screen w-full overflow-hidden">
        <BgLogin />
      </div>
      <div className="col-span-2">
        <div className="ml-20 flex h-32 items-center max-[650px]:ml-0 max-[650px]:justify-center">
          <LogoBranca />
        </div>
      </div>
      <div className="row-start-2 self-center">
        <div className="ml-20 space-y-10 max-[650px]:ml-0">
          <h1 className="mb-16 font-aldrich text-5xl text-white max-[1400px]:text-4xl max-[650px]:mx-2 max-[650px]:text-center max-[425px]:text-3xl">
            Sistema de Gestão de Estoque
          </h1>
          <p className="font-montserrat text-4xl font-semibold text-white max-[1400px]:text-3xl max-[650px]:mx-2 max-[650px]:text-center max-[425px]:text-2xl">
            Faça login na sua conta
          </p>
          <div className="space-y-5 max-[650px]:mx-4 max-[650px]:text-center">
            <div>
              <div className="mb-4 grid w-full max-w-sm gap-1.5 text-left max-[650px]:mx-auto">
                <Label className="text-[#D1D5DB]" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  className=""
                  id="email"
                  placeholder="Seu email"
                />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1.5 text-left max-[650px]:mx-auto">
                <Label className="text-[#D1D5DB]" htmlFor="password">
                  Senha
                </Label>
                <Input
                  type="password"
                  className=""
                  id="password"
                  placeholder="Sua senha"
                />
              </div>
              <div className="mt-2 flex items-center space-x-2 text-white max-[650px]:mx-auto max-[650px]:max-w-sm">
                <Checkbox className="bg-white" id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Lembrar usuário
                </label>
              </div>
            </div>
            <Button className="relative w-full max-w-sm overflow-hidden bg-[#C43D3D] text-white shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:rounded-full before:bg-[#622631] before:duration-200 before:ease-out hover:bg-[#622631] hover:shadow-[#ff332852] hover:before:h-96 hover:before:w-96">
              <span className="relative z-10">Entrar</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="row-start-2 p-2 max-[1024px]:hidden">
        <Ilustracao />
      </div>
    </div>
  );
}
