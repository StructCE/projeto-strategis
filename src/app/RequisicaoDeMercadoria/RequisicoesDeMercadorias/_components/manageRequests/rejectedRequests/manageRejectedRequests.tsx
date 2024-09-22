"use client";
import { Calendar, Eraser, UserCog2 } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";
import { TableComponent } from "~/components/table";
import { TableButtonComponent } from "~/components/tableButton";
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
import { requests } from "../../requestsData";
import RejectedRequestDetails from "./rejectedRequestDetails/requestDetailsTable";

export default function ManageRejectedRequestsTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");

  const filteredRequests = requests.filter((request) => {
    const matchesStatus = request.status == "rejected";

    const matchesDate =
      !date ||
      (request.date.getDate() === date.getDate() &&
        request.date.getMonth() === date.getMonth() + 1 &&
        request.date.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputResponsible === "" ||
      request.responsible
        .toLowerCase()
        .includes(inputResponsible.toLowerCase());

    return matchesStatus && matchesDate && matchesResponsible;
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
            <TooltipContent side="right">
              <p>Limpar filtros</p>
            </TooltipContent>
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

        {filteredRequests.map((request, index) => (
          <TableComponent.Line
            className={`grid-cols-[0.7fr_1fr_0.5fr_2fr_130px] gap-8 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>
              {`${request.date.getDate()}/${request.date.getMonth()}/${request.date.getFullYear()}`}
            </TableComponent.Value>
            <TableComponent.Value>{request.responsible}</TableComponent.Value>
            <TableComponent.Value className="text-center">
              {request.products.length}
            </TableComponent.Value>
            <TableComponent.Value>{request.description}</TableComponent.Value>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-7xl overflow-x-auto p-3 pb-5 pt-10 sm:p-6">
                <DialogHeader>
                  <DialogTitle className="w-fit pb-1.5">
                    Informações da Requisição de Mercadorias
                  </DialogTitle>
                  <DialogDescription className="w-fit text-base text-black">
                    <p className="w-fit">
                      <span className="font-semibold">Data da Requisição:</span>{" "}
                      {`${request.date.getDate()}/${request.date.getMonth()}/${request.date.getFullYear()}`}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">
                        Responsável pela Requisição:
                      </span>{" "}
                      {request.responsible}
                    </p>
                    <p className="w-fit font-semibold">Produtos solicitados:</p>
                  </DialogDescription>

                  <RejectedRequestDetails request={request} />

                  <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
                    <TableButtonComponent.Button className="bg-vermelho_botao_2 hover:bg-hover_vermelho_login max-[425px]:w-full">
                      Rejeitar Requisição
                    </TableButtonComponent.Button>

                    <TableButtonComponent.Button className="bg-verde_botao hover:bg-hover_verde_botao max-[425px]:w-full">
                      Confirmar Requisição
                    </TableButtonComponent.Button>
                  </TableButtonComponent>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
