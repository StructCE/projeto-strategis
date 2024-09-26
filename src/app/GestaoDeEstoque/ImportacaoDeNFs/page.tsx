"use client";
import { FolderCog } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import { TableNFs } from "./_components/tableNFs/tableNFs";

import { TableButtonComponent } from "~/components/tableButton";
import {
  inputPath,
  notasFiscaisAceitas,
  notasFiscaisPendentes,
  notasFiscaisRejeitadas,
  outputPath,
} from "./_components/notasFiscaisData";

export default function ImportacaoDeNFs() {
  return (
    <div className="flex w-full flex-col gap-2 bg-fundo_branco text-[16px] font-semibold">
      <h1 className="text-[32px]">Importação de Notas Fiscais</h1>

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
          <TableButtonComponent className="pt-2 sm:pt-4">
            <TableButtonComponent.Button
              className="bg-azul_botao hover:bg-hover_azul_botao"
              handlePress={() => console.log("a")}
            >
              Adicionar Notas Fiscais
            </TableButtonComponent.Button>
          </TableButtonComponent>
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
