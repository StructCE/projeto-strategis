"use client";
// import { Trash2 } from "lucide-react";
import { TableComponent } from "~/components/table/index";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "~/components/ui/tooltip";
import { api } from "~/trpc/react";

export const ManageSuppliersTableFromComapany = (props: { id: string }) => {
  const {
    data: suppliers = [],
    error,
    isLoading,
  } = api.company.getCompanySuppliers.useQuery({ id: props.id });

  function formatPhoneNumber(
    phone: string | null | undefined,
  ): string | undefined {
    const cleaned = phone?.replace(/\D/g, ""); // Remove caracteres não numéricos
    const isMobile = cleaned?.length === 11; // Verifica se o número tem 11 dígitos

    if (isMobile) {
      // Formato (XX) XXXXX-XXXX
      return cleaned?.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      // Formato (XX) XXXX-XXXX
      return cleaned?.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  }

  return (
    <TableComponent>
      <TableComponent.Title>Fornecedores Cadastrados</TableComponent.Title>
      {/* <TableComponent.Subtitle>
        Selecione um fornecedor para editar seus dados ou remover
      </TableComponent.Subtitle> */}
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_2fr_1fr] gap-4 sm:gap-8">
          <TableComponent.ValueTitle>CNPJ</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Endereço</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Telefone</TableComponent.ValueTitle>
          {/* <TableComponent.ButtonSpace></TableComponent.ButtonSpace> */}
        </TableComponent.LineTitle>

        {error && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Erro ao mostrar fornecedores: {error.message}
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {isLoading && (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Carregando fornecedores...
            </TableComponent.Value>
          </TableComponent.Line>
        )}
        {suppliers.length === 0 ? (
          <TableComponent.Line className="bg-fundo_tabela_destaque py-2.5 text-center text-gray-500">
            <TableComponent.Value>
              Nenhum fornecedor encontrado
            </TableComponent.Value>
          </TableComponent.Line>
        ) : (
          suppliers.map((supplier, index) => (
            <TableComponent.Line
              className={`grid-cols-[1fr_1fr_2fr_1fr] gap-4 sm:gap-8 ${
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
              <TableComponent.Value>
                {formatPhoneNumber(supplier.phone)}
              </TableComponent.Value>

              {/* <TooltipProvider delayDuration={300}>
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
            </TooltipProvider> */}
            </TableComponent.Line>
          ))
        )}
      </TableComponent.Table>
    </TableComponent>
  );
};
