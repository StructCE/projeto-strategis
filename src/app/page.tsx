import { TableButtonComponent } from "~/components/tableButton";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="rounded-">A</h1>
      <TableButtonComponent className="">
        <TableButtonComponent.Button className="bg-[#3398F5] hover:bg-[#2A82D7]">
          Adicionar Nota Fiscal
        </TableButtonComponent.Button>
      </TableButtonComponent>
      <TableButtonComponent className="sm:pt-3">
        <TableButtonComponent.Button className="bg-[#D01F30] hover:bg-[#B01A29]">
          Notas Fiscais Aceitas
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </div>
  );
}
