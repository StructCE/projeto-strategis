import { TableComponent } from "~/components/table/index";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { SupplierEdit } from "../../../../CadastroDeFornecedores/_components/editSuppliers/supplierEdit";
import { suppliers } from "../../../../CadastroDeFornecedores/_components/supplierData";

export const ManageSuppliersTableFromComapany = () => {
  return (
    <TableComponent>
      <TableComponent.Title>Fornecedores Cadastrados</TableComponent.Title>
      <TableComponent.Subtitle>
        Selecione um fornecedor para editar seus dados ou remover
      </TableComponent.Subtitle>
      <TableComponent.Table>
        <TableComponent.LineTitle className="grid-cols-[1fr_1fr_2fr_1fr_130px]">
          <TableComponent.ValueTitle>CNPJ</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Nome</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Endereço</TableComponent.ValueTitle>
          <TableComponent.ValueTitle>Telefone</TableComponent.ValueTitle>
          <TableComponent.ButtonSpace></TableComponent.ButtonSpace>
        </TableComponent.LineTitle>
        {suppliers.map((supplier, index) => (
          <TableComponent.Line
            className={`grid-cols-[1fr_1fr_2fr_1fr_130px] ${
              index % 2 === 0 ? "bg-fundo_tabela_destaque" : ""
            }`}
            key={index}
          >
            <TableComponent.Value>{supplier.cnpj}</TableComponent.Value>
            <TableComponent.Value>{supplier.name}</TableComponent.Value>
            <TableComponent.Value>
              {supplier.address} - {supplier.neighborhood} - {supplier.city} (
              {supplier.state})
            </TableComponent.Value>
            <TableComponent.Value>{supplier.phone}</TableComponent.Value>
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
