import { TableComponent } from "~/components/table/tableContainer";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SupplierEdit } from "../editSuppliers/supplierEdit";
import { suppliers } from "../supplierData";
import ManageSuppliersFilters from "./manageSuppliersFilters/manageSuppliersFilters";

export const ManageSuppliersTable = () => {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Fornecedores</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um fornecedor para editar ou remover
      </TableComponent.Subtitle>
      <TableComponent.FiltersLine>
        <ManageSuppliersFilters />
      </TableComponent.FiltersLine>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[2fr_4fr_3fr_130px]">
          <TableComponent.ValueTitle>Fornecedor</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Endereço</TableComponent.ValueTitle>
          {/* <TableComponent.ValueTitle>Telefone</TableComponent.ValueTitle> */}
          <TableComponent.ValueTitle>Email</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {suppliers.map((supplier, index) => (
          <TableComponent.Line
            className={`grid-cols-[2fr_4fr_3fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{supplier.name}</TableComponent.Value>
            <TableComponent.Value>
              {supplier.address} - {supplier.neighborhood} - {supplier.city} (
              {supplier.state})
            </TableComponent.Value>
            {/* <TableComponent.Value>{supplier.phone}</TableComponent.Value> */}
            <TableComponent.Value>{supplier.email}</TableComponent.Value>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-0 h-8 bg-cinza_destaque text-[14px] font-medium text-black hover:bg-hover_cinza_destaque sm:text-[16px]">
                  Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-7xl">
                <DialogHeader>
                  <DialogTitle className="pb-1.5">
                    Utilize os campos abaixo para editar os dados do fornecedor
                    ou o botão para remover
                  </DialogTitle>
                  <SupplierEdit supplier={supplier} />
                  <DialogDescription></DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </TableComponent.Line>
        ))}
      </TableComponent.Table>
    </TableComponent>
  );
};
