import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { FolderCog } from "lucide-react";

import { TableNFs } from "./_components/tableNFs/tableNFs";

import {
  inputPath,
  outputPath,
  notasFiscaisAceitas,
  notasFiscaisPendentes,
  notasFiscaisRejeitadas,
} from "./_components/notasFiscaisData";
import { Button } from "~/components/ui/button";

export default function ImportacaoDeNFs() {
  return (
    <div className="flex w-full flex-col gap-2 bg-fundo_branco text-[16px]">
      <h1 className="text-[32px]">Importação de Notas Fiscais</h1>

      {/* <div className="flex items-center justify-between">
        <h1 className="text-[32px] w-[70%]">Importação de Notas Fiscais</h1>
        <div className="flex justify-end w-[30%]">
          <Button className="w-full self-end px-8">
            Adicionar Notas Fiscais
          </Button>
        </div>
      </div> */}
      <div className="flex-col">
        <button className="flex items-center gap-2 py-1">
          <FolderCog />
          <p className="font-bold">Origem:</p>
          <p className="hover:underline">{inputPath}</p>
        </button>
        <button className="flex items-center gap-2 py-1">
          <FolderCog />
          <p className="font-bold">Destino:</p>
          <p className="hover:underline">{outputPath}</p>
        </button>
      </div>
      <Tabs defaultValue="pending" className="w-fill h-fill">
        <TabsList className="mb-6 flex h-fit w-full justify-start gap-4 bg-[#DBDBDB] p-2">
          <TabsTrigger className="py-1 text-[16px]" value="pending">
            Pendentes
          </TabsTrigger>
          <TabsTrigger className="py-1 text-[16px]" value="accepted">
            Aceitas
          </TabsTrigger>
          <TabsTrigger className="py-1 text-[16px]" value="denied">
            Rejeitadas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pending">
          <TableNFs tableData={notasFiscaisPendentes} />
          <div className="mt-8 flex justify-end">
            <Button className="self-end px-8">Adicionar Notas Fiscais</Button>
          </div>
        </TabsContent>
        <TabsContent value="accepted">
          <TableNFs tableData={notasFiscaisAceitas} />
        </TabsContent>
        <TabsContent value="denied">
          <TableNFs tableData={notasFiscaisRejeitadas} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
