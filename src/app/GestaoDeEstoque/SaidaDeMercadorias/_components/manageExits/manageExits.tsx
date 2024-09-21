import { Button } from "~/components/ui/button";
import { requisicoes } from "../exitsData";

export default function ManageExits() {
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold">Gerenciar Saídas</h1>
        <h2 className="text-xl font-bold">Requisições pendentes</h2>
        {requisicoes.map((req, index) => (
          <div
            key={index}
            className="m-2 grid w-full grid-cols-[1fr_2fr_3fr_1fr] rounded-lg border border-cinza_destaque px-4 py-2"
          >
            <div className="flex-col">
              <p className="font-bold">Data</p>{" "}
              <p className="opacity-75">{req.data}</p>
            </div>
            <div className="">
              <p className="font-bold">Requisitante</p>{" "}
              <p className="opacity-75">{req.requisitante}</p>
            </div>
            <div className="">
              <p className="font-bold">Descricao</p>{" "}
              <p className="opacity-75">{req.descricao}</p>
            </div>
            <div className="flex items-center justify-end">
              <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                Gerenciar
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
