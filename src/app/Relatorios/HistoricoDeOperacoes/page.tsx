"use client";
import { Building2, Calendar, Eraser, Settings, UserCog2 } from "lucide-react";
import { useState } from "react";
import { companies } from "~/app/ConfiguracoesGerais/CadastroDeEmpresas/_components/companiesData";
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
import OperationDetails from "./_components/operationDetails";
import { operations } from "./_components/operationsData";

export default function ManageRequestsTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputOperator, setInputOperator] = useState("");
  const [selectCompany, setSelectCompany] = useState("");
  const [selectOperation, setSelectOperation] = useState("");

  const filteredOperations = operations.filter((operation) => {
    const matchesDate =
      !date ||
      (operation.date.getDate() === date.getDate() &&
        operation.date.getMonth() === date.getMonth() + 1 &&
        operation.date.getFullYear() === date.getFullYear());

    const matchesResponsible =
      inputOperator === "" ||
      operation.operator.name
        .toLowerCase()
        .includes(inputOperator.toLowerCase());

    const matchesCompany =
      selectCompany === "" || operation.operator.company == selectCompany;

    const matchesOperation =
      selectOperation === "" || operation.operation == selectOperation;

    return (
      matchesDate && matchesResponsible && matchesCompany && matchesOperation
    );
  });

  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>Histórico de Operações</TableComponent.Title>

      <TableComponent.Subtitle>
        Selecione os dados nos filtros abaixo para visualizar a atividade dos
        usuários
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
            placeholder="Operador"
            state={inputOperator}
            setState={setInputOperator}
          />
        </Filter>

        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Building2 className={className} />
            )}
          />
          <Filter.Select
            placeholder="Empresa"
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
              <Settings className={className} />
            )}
          />
          <Filter.Select
            placeholder="Operação"
            state={selectOperation}
            setState={setSelectOperation}
          >
            {operations.map((operation, index) => (
              <Filter.SelectItems
                value={operation.operation}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>

        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger className="flex h-full cursor-pointer self-center">
              <Eraser
                size={20}
                onClick={() => {
                  setDate(undefined);
                  setInputOperator("");
                  setSelectCompany("");
                  setSelectOperation("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_1fr_2fr] gap-8">
          <TableComponent.ValueTitle>
            Data da Operação
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Empresa</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Operador</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Descrição</TableComponent.ValueTitle>
        </TableComponent.LineTitle>

        {filteredOperations.map((operation, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_1fr_1fr_2fr] gap-8 ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>
              {`${operation.date.getDate()}/${operation.date.getMonth()}/${operation.date.getFullYear()}`}
            </TableComponent.Value>
            <TableComponent.Value>
              {operation.operator.company}
            </TableComponent.Value>
            <TableComponent.Value>
              {operation.operator.name}
            </TableComponent.Value>
            <TableComponent.Value>{operation.operation}</TableComponent.Value>

            {/* 
            Não sei como fazer os detalhes da operação, cada operação teria q mostrar infromações diferentes
            então não sei como seria estruturado o banco de dados para isso.
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
                      <span className="font-semibold">Data da Operação:</span>{" "}
                      {`${operation.date.getDate()}/${operation.date.getMonth()}/${operation.date.getFullYear()}`}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">Esmpresa:</span>{" "}
                      {operation.operator.company}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">Operador:</span>{" "}
                      {operation.operator.name}
                    </p>
                    <p className="w-fit">
                      <span className="font-semibold">Operação:</span>{" "}
                      {operation.operation}
                    </p>
                    <p className="w-fit font-semibold">Produtos solicitados:</p>
                  </DialogDescription>

                  <OperationDetails operation={operation} />
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
