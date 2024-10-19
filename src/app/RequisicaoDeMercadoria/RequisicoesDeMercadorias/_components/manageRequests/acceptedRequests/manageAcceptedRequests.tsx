"use client";
import { Calendar, Eraser, UserCog2 } from "lucide-react";
import React, { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import AcceptedRequestDetails from "./acceptedRequestDetails/requestDetailsTable";

export default function ManageAcceptedRequestsTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const {
    data: requests = [],
    error,
    isLoading,
  } = api.request.getAll.useQuery({});

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = request.status == "Confirmada";

    const matchesDate =
      !date ||
      (request.requestDate.getDate() === date.getDate() &&
        request.requestDate.getMonth() === date.getMonth() + 1 &&
        request.requestDate.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputResponsible === "" ||
      request.responsibleName
        ?.toLowerCase()
        .includes(inputResponsible.toLowerCase());

    return matchesStatus && matchesDate && matchesResponsible;
  });

  return (
    <TableComponent className="gap-3">
      <TableComponent.Subtitle>
        Requisições de mercadoria confirmadas
      </TableComponent.Subtitle>

      <TableComponent.FiltersLine>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Calendar className={className} />
            )}
          />
          <Filter.DatePicker
            date={date}
            setDate={setDate}
            open={open}
            setOpen={setOpen}
            placeholder="Data"
          />
        </Filter>

        <Filter className="lg:w-[250px]">
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <UserCog2 className={className} />
            )}
          />
          <Filter.Input
            placeholder="Responsável"
            state={inputResponsible}
            setState={setInputResponsible}
          />
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDate(undefined);
                  setInputResponsible("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.7fr_1fr_0.5fr_2fr_130px] gap-8">
          <TableComponent.ValueTitle>
            Data da Requisição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pela Requisição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Descrição</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar requisições: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando requisições...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {requests.length > 0 && !isLoading && !error ? (
          filteredRequests.length > 0 ? (
            filteredRequests
              .sort((a, b) => b.requestDate.getTime() - a.requestDate.getTime())
              .map((request, index) => (
                <TableComponent.Line
                  className={`grid-cols-[0.7fr_1fr_0.5fr_2fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    {`${request.requestDate.getDate()}/${request.requestDate.getMonth()}/${request.requestDate.getFullYear()}`}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {request.responsibleName}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {request.requestProducts.length}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {request.description === ""
                      ? "Não informada"
                      : request.description}
                  </TableComponent.Value>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      className="max-w-7xl overflow-x-auto p-3 pb-5 pt-10 sm:p-6"
                      aria-describedby={undefined}
                    >
                      <DialogHeader>
                        <DialogTitle className="w-fit pb-1.5">
                          Informações da Requisição de Mercadorias
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data da Requisição:
                            </span>{" "}
                            {`${request.requestDate.getDate()}/${request.requestDate.getMonth()}/${request.requestDate.getFullYear()}`}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">
                              Responsável pela Requisição:
                            </span>{" "}
                            {request.responsibleName}
                          </p>
                          <p className="w-fit font-semibold">
                            Produtos solicitados:
                          </p>
                        </DialogDescription>

                        <AcceptedRequestDetails request={request} />

                        <div className="mt-2 flex flex-col">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data da Confirmação:
                            </span>{" "}
                            {`${request.statusDate?.getDate()}/${request.statusDate?.getMonth()}/${request.statusDate?.getFullYear()}`}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">
                              Responsável pela Confirmação:
                            </span>{" "}
                            {request.statusResponsible}
                          </p>
                          {request.statusDescription != "" ? (
                            <p>
                              <span className="font-semibold">Descrição:</span>{" "}
                              {request.statusDescription}
                            </p>
                          ) : (
                            <></>
                          )}
                        </div>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhuma requisição encontrada com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhuma requisição encontrada
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
}
