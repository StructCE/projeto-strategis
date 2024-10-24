"use client";
import { Trash2 } from "lucide-react";
import { TableComponent } from "~/components/table/index";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/react";

export const ManageSuppliersTableFromComapany = (props: { id: string }) => {
  const suppliers = api.company.getCompanySuppliers.useQuery({ id: props.id });

  return (
    <TableComponent>
      <TableComponent.Title>Fornecedores Cadastrados</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um fornecedor para editar seus dados ou remover
      </TableComponent.Subtitle>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_2fr_1fr_30px]">
          <TableComponent.ValueTitle>CNPJ</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Endereço</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Telefone</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {suppliers.data?.map((supplier, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_1fr_2fr_1fr_30px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{supplier.cnpj}</TableComponent.Value>
            <TableComponent.Value>{supplier.name}</TableComponent.Value>
            <TableComponent.Value>
              {supplier.address} - {supplier.neighborhood} - {supplier.city} (
              {supplier.federativeUnit})
            </TableComponent.Value>
            <TableComponent.Value>{supplier.phone}</TableComponent.Value>

            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger className="m-1 flex justify-end">
                  <button
                    onClick={() =>
                      console.log(
                        "Remover ligação entre esse fornecedor e essa empresa",
                      )
                    }
                    className="text-black"
                    type="button"
                  >
                    <Trash2 />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Remover</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
