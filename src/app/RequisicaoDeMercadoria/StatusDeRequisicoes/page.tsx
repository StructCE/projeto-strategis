"use client";
import { Calendar, Eraser, Search, UserCog2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";
import { api } from "~/trpc/react";
import AcceptedRequestDetails from "./_components/acceptedRequestDetailsTable";
import PendingRequestDetails from "./_components/pendingRequestDetailsTable";
import RejectedRequestDetails from "./_components/rejectedRequestDetailsTable";

export default function ManageRequestsTable() {
  const session = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (!session.data?.user.allowedPagesPath.includes(pathname)) {
      redirect("/");
    }
  }, [session, pathname]);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");
  const [selectStatus, setSelectStatus] = useState("");

  const {
    data: requests = [],
    error,
    isLoading,
  } = api.request.getAll.useQuery({
    filters: {
      date: date,
      requestResponsible: inputResponsible,
      status: selectStatus,
    },
  });

  function handleRequestStatus(status: string) {
    if (status == "Esperando Confirmação")
      return <span className="text-amarelo_botao">Esperando Confirmação</span>;
    if (status == "Confirmada")
      return <span className="text-verde_botao">Confirmada</span>;
    if (status == "Rejeitada")
      return <span className="text-vermelho_botao_2">Rejeitada</span>;
  }

  function handleRequestDetailsPage(
    status: string,
    request: SerializedRequest,
  ) {
    if (status == "Esperando Confirmação")
      return <PendingRequestDetails request={request} />;
    if (status == "Confirmada")
      return <AcceptedRequestDetails request={request} />;
    if (status == "Rejeitada")
      return <RejectedRequestDetails request={request} />;
  }

  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>Status de Requisições</TableComponent.Title>

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

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Search className={className} />
            )}
          />
          <Filter.Select
            placeholder="Status"
            state={selectStatus}
            setState={setSelectStatus}
          >
            <Filter.SelectItems
              value={"Esperando Confirmação"}
            ></Filter.SelectItems>
            <Filter.SelectItems value={"Confirmada"}></Filter.SelectItems>
            <Filter.SelectItems value={"Rejeitada"}></Filter.SelectItems>
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDate(undefined);
                  setInputResponsible("");
                  setSelectStatus("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[0.7fr_1fr_0.5fr_1fr_130px] gap-8">
          <TableComponent.ValueTitle>
            Data da Requisição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pela Requisição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center">
            Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Status</TableComponent.ValueTitle>
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
          requests.length > 0 ? (
            requests
              .sort((a, b) => b.requestDate.getTime() - a.requestDate.getTime())
              .map((request, index) => (
                <TableComponent.Line
                  className={`grid-cols-[0.7fr_1fr_0.5fr_1fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    {`${String(request.requestDate.getDate()).padStart(2, "0")}/${String(request.requestDate.getMonth()).padStart(2, "0")}/${String(request.requestDate.getFullYear()).padStart(2, "0")}`}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {request.responsibleName}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center">
                    {request.requestProducts.length}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {handleRequestStatus(request.status)}
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
                            {`${String(request.requestDate.getDate()).padStart(2, "0")}/${String(request.requestDate.getMonth()).padStart(2, "0")}/${String(request.requestDate.getFullYear()).padStart(2, "0")}`}
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

                        {/* Renderiza uma página diferente dependendo do status da requisição */}
                        {handleRequestDetailsPage(request.status, request)}
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
