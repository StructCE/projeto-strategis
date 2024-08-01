import { getServerAuthSession } from "~/server/auth";
import { SignInButton } from "./_components/signInButton";
import BgLogin from "./_components/bg-login";
import LogoBranca from "./_components/logo-branca";

export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <>
      <div className="absolute z-[-1] h-screen w-full overflow-hidden">
        {" "}
        {/* overflow-hidden porque o svg estava expandindo para baixo!*/}
        <BgLogin />
      </div>
      <div className="">
        <div>
          <LogoBranca />
        </div>
        <h1 className="font-aldrich text-5xl text-white">
          Sistema de Gestão de Estoque
        </h1>
        <p className="font-montserrat text-4xl font-semibold text-white">
          Faça login na sua conta
        </p>
        <SignInButton />
        <h1 className="text-4xl font-semibold">
          Olá{" "}
          <span className="text-struct-2 font-bold">
            {session?.user?.email}
          </span>
          , o que deseja fazer?
        </h1>
      </div>
    </>
  );
}
