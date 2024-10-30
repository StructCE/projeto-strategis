import { Calendar, Eraser, Search, UserCog2 } from "lucide-react";
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
import AdjustmentDetails from "./adjustmentDetails/adjustmentDetailsTable";

export default function ManageAdjustmentsTable() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [inputResponsible, setInputResponsible] = useState("");
  const [selectType, setSelectType] = useState("");

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
    data: adjusts = [],
    error,
    isLoading,
  } = api.adjust.getAll.useQuery({
    filters: {
      adjustType: selectType,
      date: date,
      responsible: inputResponsible,
      company: companyFilter,
    },
  });

  return (
    <TableComponent className="gap-3">
      <TableComponent.Title>
        Histórico de Ajustes de Estoque
      </TableComponent.Title>

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
            icon={({ className }) => <Search className={className}> </Search>}
          />
          <Filter.Select
            placeholder="Tipo de ajuste"
            state={selectType}
            setState={setSelectType}
          >
            <Filter.SelectItems value="Manual"></Filter.SelectItems>
            <Filter.SelectItems value="Automático"></Filter.SelectItems>
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
                  setSelectType("");
                }}
              />
            </TooltipTrigger>
            <TooltipContent side="right">Limpar filtros</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableComponent.FiltersLine>

      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1.5fr_1.3fr_0.8fr_130px] gap-8">
          <TableComponent.ValueTitle>Data do Ajuste</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>
            Responsável pelo Ajuste
          </TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Estoque</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Tipo de Ajuste</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar ajustes de estoque: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando ajustes de estoque...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {adjusts.length > 0 && !isLoading && !error ? (
          adjusts.length > 0 ? (
            adjusts
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .map((adjustment, index) => (
                <TableComponent.Line
                  className={`grid-cols-[1fr_1.5fr_1.3fr_0.8fr_130px] gap-8 ${
                    index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
                  }`}
                  key={index}
                >
                  <TableComponent.Value>{`${String(adjustment.date.getDate()).padStart(2, "0")}/${String(adjustment.date.getMonth()).padStart(2, "0")}/${String(adjustment.date.getFullYear()).padStart(2, "0")}`}</TableComponent.Value>
                  <TableComponent.Value>
                    {adjustment.responsibleName}
                  </TableComponent.Value>
                  <TableComponent.Value>
                    {adjustment.stockName}
                  </TableComponent.Value>
                  <TableComponent.Value>{adjustment.type}</TableComponent.Value>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[16px]">
                        Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="max-h-[90vh] max-w-7xl overflow-x-auto overflow-y-auto p-3 pb-5 pt-10 sm:p-6"
                    >
                      <DialogHeader>
                        <DialogTitle className="w-fit pb-1.5">
                          Informações do ajuste de estoque
                        </DialogTitle>
                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data do Ajuste:
                            </span>{" "}
                            {`${String(adjustment.date.getDate()).padStart(2, "0")}/${String(adjustment.date.getMonth()).padStart(2, "0")}/${String(adjustment.date.getFullYear()).padStart(2, "0")}`}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">
                              Responsável pelo Ajuste:
                            </span>{" "}
                            {adjustment.responsibleName}
                          </p>
                          <p className="w-fit font-semibold">Ajustes:</p>
                        </DialogDescription>

                        <AdjustmentDetails adjustment={adjustment} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableComponent.Line>
              ))
          ) : (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum ajuste de estoque encontrado com os filtros aplicados
              </TableComponent.Value>
            </TableComponent.Line>
          )
        ) : (
          !isLoading &&
          !error && (
            <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
              <TableComponent.Value>
                Nenhum ajuste de estoque encontrado
              </TableComponent.Value>
            </TableComponent.Line>
          )
        )}
      </TableComponent.Table>
    </TableComponent>
  );
}
