"use client";
import { ArrowRight, Building2, FolderCog, Search } from "lucide-react";
import { useState } from "react";
import { companies } from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/companiesData";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import DetailNF from "./_components/DetailNF/detailNF";
import {
  inputPath,
  notasFiscais,
  outputPath,
} from "./_components/notasFiscaisData";

export default function ImportacaoDeNFs() {
  const [inputName, setInputName] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [dateBegin, setDateBegin] = useState<Date | undefined>(undefined);
  const [openDatePickerBegin, setOpenDatePickerBegin] = useState(false);
  const [dateEnd, setDateEnd] = useState<Date | undefined>(undefined);
  const [openDatePickerEnd, setOpenDatePickerEnd] = useState(false);

  const [selectedTab, setSelectedTab] = useState("pending");

  const filteredNotasFiscais = notasFiscais.filter((notaFiscal) => {
    if (selectedTab === "pending") return notaFiscal.status === "Pendente";
    if (selectedTab === "accepted") return notaFiscal.status === "Confirmada";
    if (selectedTab === "denied") return notaFiscal.status === "Rejeitada";
    return true;
  });

  return (
    <div className="flex w-full flex-col gap-2 bg-fundo_branco text-[16px] font-semibold">
      <TableComponent>
        <TableComponent.Title>Importação de Notas Fiscais</TableComponent.Title>
      </TableComponent>

      <div className="flex-col">
        <button className="flex items-center gap-2 py-1">
          <FolderCog />
          <p className="font-bold">Origem:</p>
          <p className="font-normal hover:underline">{inputPath}</p>
        </button>
        <button className="flex items-center gap-2 py-1">
          <FolderCog />
          <p className="font-bold">Destino:</p>
          <p className="font-normal hover:underline">{outputPath}</p>
        </button>
      </div>

      <Tabs
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-fill h-fill"
      >
        <TabsList className="mb-3 flex h-fit w-full justify-start gap-4 bg-[#DBDBDB] p-2">
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

        <TableComponent.FiltersLine className="mt-0">
          <Filter>
            <Filter.DatePicker
              date={dateBegin}
              setDate={setDateBegin}
              open={openDatePickerBegin}
              setOpen={setOpenDatePickerBegin}
            />
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <ArrowRight className={className} />
              )}
            />
            <Filter.DatePicker
              date={dateEnd}
              setDate={setDateEnd}
              open={openDatePickerEnd}
              setOpen={setOpenDatePickerEnd}
            />
          </Filter>
          <Filter>
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Building2 className={className} />
              )}
            />
            <Filter.Select
              placeholder="Fornecedor"
              state={selectCompany}
              setState={setSelectCompany}
            >
              {companies.map((company, index) => (
                <Filter.SelectItems
                  value={company.name}
                  key={index}
                ></Filter.SelectItems>
              ))}
            </Filter.Select>
          </Filter>
          <Filter>
            <Filter.Icon
              icon={({ className }: { className: string }) => (
                <Search className={className} />
              )}
            />
            <Filter.Input
              placeholder="Nº NF, Fornecedor, Produto..."
              state={inputName}
              setState={setInputName}
            />
          </Filter>
        </TableComponent.FiltersLine>

        <TabsContent value={selectedTab}>
          <TableComponent>
            <TableComponent.Table>
              <TableComponent.LineTitle className="grid-cols-[repeat(3,_1fr)_2fr_3fr_130px]">
                <TableComponent.ValueTitle>Nº da NF</TableComponent.ValueTitle>
                <TableComponent.ValueTitle>Emissão</TableComponent.ValueTitle>
                <TableComponent.ValueTitle>Quant</TableComponent.ValueTitle>
                <TableComponent.ValueTitle>
                  Fornecedor
                </TableComponent.ValueTitle>
                <TableComponent.ValueTitle>Descrição</TableComponent.ValueTitle>
                <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
              </TableComponent.LineTitle>

              {filteredNotasFiscais.map((notaFiscal, index) => (
                <TableComponent.Line
                  className={`grid-cols-[repeat(3,_1fr)_2fr_3fr_130px] ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    nº {notaFiscal.numNF}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {`${notaFiscal.date.getDate()}/${notaFiscal.date.getMonth()}/${notaFiscal.date.getFullYear()}`}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {notaFiscal.quantity}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {notaFiscal.company}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {notaFiscal.description}
                  </TableComponent.Value>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="scroll-hidden max-h-[90vh] overflow-auto sm:max-w-[90rem]"
                    >
                      <DetailNF nf={notaFiscal} />;
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))}
            </TableComponent.Table>
          </TableComponent>

          {selectedTab === "pending" ? (
            <TableButtonComponent className="pt-2 sm:pt-4">
              <TableButtonComponent.Button
                className="bg-azul_botao hover:bg-hover_azul_botao"
                handlePress={() => console.log("a")}
              >
                Adicionar Notas Fiscais
              </TableButtonComponent.Button>
            </TableButtonComponent>
          ) : (
            <></>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
