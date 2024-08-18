import BgLogin from "../../lib/assets/bg-login";
import Ilustracao from "../../lib/assets/ilustracao";
import LogoBranca from "../../lib/assets/logo-branca";
import { FormsContainer } from "./_components/signInForm/formsContainer";

export default function Login() {
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
          <FormsContainer />
        </div>
      </div>
      <div className="row-start-2 p-2 max-[1024px]:hidden">
        <Ilustracao />
      </div>
    </div>
  );
}
