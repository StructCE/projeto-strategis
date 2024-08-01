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
    <div className="h-screen overflow-hidden">
      <div className="absolute z-[-1] h-screen w-full overflow-hidden">
        {/* overflow-hidden porque o svg estava expandindo para baixo!*/}
        <BgLogin />
      </div>
      <div className="grid grid-cols-2 grid-rows-1 gap-0">
        <div className="space-y-10">
          <div>
            <LogoBranca />
          </div>
          <h1 className="font-aldrich text-5xl text-white">
            Sistema de Gestão de Estoque
          </h1>
          <p className="font-montserrat text-4xl font-semibold text-white">
            Faça login na sua conta
          </p>
          {/*<SignInButton />
          <h1 className="text-4xl font-semibold">
            Olá{" "}
            <span className="text-struct-2 font-bold">
              {session?.user?.email}
            </span>
            , o que deseja fazer?
          </h1>
          */}
          <div className="space-y-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-[#D1D5DB]" htmlFor="email">
                Email
              </Label>
              <Input type="email" className="" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="text-[#D1D5DB]" htmlFor="password">
                Senha
              </Label>
              <Input
                type="password"
                className=""
                id="password"
                placeholder="Senha"
              />
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Checkbox className="bg-white" id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Lembrar-me
              </label>
            </div>
            <Button className="bg-[#C43D3D]" color="#ffffff">
              Entrar
            </Button>
          </div>
        </div>
        <div>
          <Ilustracao />
        </div>
      </div>
    </div>
  );
}
