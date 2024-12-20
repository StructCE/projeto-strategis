"use client";
import { Calendar, Eraser, UserCog2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
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
import { useCompany } from "~/lib/companyProvider";
import { api } from "~/trpc/react";
import PendingRequestDetails from "./pendingRequestDetails/requestDetailsTable";

export default function ManagePendingRequestsTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const session = useSession();

  const { data: user } = api.user.getUserById.useQuery({
    id: session?.data?.user.id,
  });

  const { selectedCompany } = useCompany();

  const companyFilter = user?.UserRole.some(
    (userRole) => userRole.role.name === "Administrador",
  )
    ? selectedCompany === "all_companies" || !selectedCompany
      ? undefined
      : selectedCompany
    : user?.UserRole[0]?.company.name;

  const {
    data: requests = [],
    error,
    isLoading,
  } = api.request.getAll.useQuery({
    filters: {
      date: date,
      requestResponsible: inputResponsible,
      status: "Esperando Confirmação",
      company: companyFilter,
    },
  });

  return (
    <TableComponent className="gap-3">
      <TableComponent.Subtitle>
        Requisições de mercadoria esperando confirmação
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
            placeholder="Selecione uma data"
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
        <TableComponent.LineTitle className="min-w-[0px] grid-cols-[80px_1fr_90px] gap-4 sm:min-w-[1200px] sm:grid-cols-[0.7fr_1fr_0.5fr_2fr_130px] sm:gap-8">
          <TableComponent.ValueTitle className="hidden text-sm sm:block sm:text-[20px]">
            Data da Requisição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="block text-sm sm:hidden sm:text-[20px]">
            Data
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="hidden text-sm sm:block sm:text-[20px]">
            Responsável pela Requisição
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="text-center text-sm sm:text-[20px]">
            Produtos
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle className="hidden text-sm sm:block sm:text-[20px]">
            Descrição
          </TableComponent.ValueTitle>
          <TableComponent.ButtonSpace className="w-[90px] sm:w-[130px]"></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar requisições: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
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
                  className={`min-w-[0px] grid-cols-[80px_1fr_90px] gap-4 sm:grid-cols-[0.7fr_1fr_0.5fr_2fr_130px] sm:gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>
                    {`${String(request.requestDate.getDate()).padStart(2, "0")}/${String(request.requestDate.getMonth()).padStart(2, "0")}/${String(request.requestDate.getFullYear()).padStart(2, "0")}`}
                  </TableComponent.Value>
                  <TableComponent.Value className="hidden text-[13px] sm:block sm:text-[16px]">
                    {request.responsibleName}
                  </TableComponent.Value>
                  <TableComponent.Value className="text-center text-[13px] sm:text-[16px]">
                    {request.requestProducts.length}
                  </TableComponent.Value>
                  <TableComponent.Value className="hidden sm:block">
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
                      className="max-h-[90vh] max-w-[320px] overflow-y-auto overflow-x-hidden p-3 pb-5 pt-10 sm:max-w-7xl sm:p-6"
                      aria-describedby={undefined}
                    >
                      <DialogHeader>
                        <DialogTitle className="w-fit pb-1 text-left text-base leading-4 sm:text-lg">
                          Informações da Requisição{" "}
                          <br className="block sm:hidden" />
                          de Mercadorias
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit text-sm sm:text-base">
                            <span className="font-semibold">
                              Data da Requisição:
                            </span>{" "}
                            {`${String(request.requestDate.getDate()).padStart(2, "0")}/${String(request.requestDate.getMonth()).padStart(2, "0")}/${String(request.requestDate.getFullYear()).padStart(2, "0")}`}
                          </p>
                          <p className="w-fit text-sm sm:text-base">
                            <span className="font-semibold">
                              Responsável pela Requisição:
                            </span>{" "}
                            {request.responsibleName}
                          </p>
                          <p className="w-fit text-sm font-semibold sm:text-base">
                            Produtos solicitados:
                          </p>
                        </DialogDescription>

                        <PendingRequestDetails request={request} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhuma requisição encontrada com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="min-w-[0px] bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
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
