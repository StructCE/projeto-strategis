import { RequestComponent } from "~/components/card-request/cardRequest";
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
import { requests } from "../exitsData";
import { RequestDetail } from "./requestDetails/requestDetails";

export default function ManageExits() {
  return (
    <TableComponent>
      <TableComponent.Title>Gerenciar Saídas</TableComponent.Title>

      <TableComponent.Subtitle>Requisições pendentes:</TableComponent.Subtitle>

      <TableComponent.Table>
        {requests
          .sort((a, b) => a.date.getTime() - b.date.getTime())
          .map((request, index) => (
            <RequestComponent classname="mx-[2px] my-1.5" key={index}>
              <RequestComponent.Grid className="md:grid-cols-[0.7fr_1.5fr_2fr_2fr_130px]">
                <RequestComponent.ColumnItem
                  title="Data"
                  description={`${request.date.getDate()}/${request.date.getMonth()}/${request.date.getFullYear()}`}
                />

                <RequestComponent.ColumnItem
                  title="Requisitante"
                  description={request.request_responsible}
                />

                <RequestComponent.ColumnItem
                  title="Produtos"
                  description={
                    request.products.length > 3
                      ? `${request.products
                          .slice(0, 3)
                          .map((product) => product.name)
                          .join(", ")}...`
                      : request.products
                          .map((product) => product.name)
                          .join(", ")
                  }
                />

                <RequestComponent.ColumnItem
                  title="Descrição"
                  description={
                    request.description ? request.description : "Sem descrição"
                  }
                />

                <div className="flex items-center justify-end">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-0 h-8 bg-cinza_destaque px-5 text-[16px] font-medium text-black hover:bg-hover_cinza_destaque_escuro sm:text-[18px]">
                        Gerenciar
                      </Button>
                    </DialogTrigger>
                    <DialogContent
                      aria-describedby={undefined}
                      className="overflow-x-auto sm:max-w-[80rem]"
                    >
                      <DialogHeader>
                        <DialogTitle className="pb-1 text-xl">
                          Detalhes da Requisição:
                        </DialogTitle>

                        <DialogDescription className="w-fit text-base text-black">
                          <p className="w-fit">
                            <span className="font-semibold">
                              Data do Requisição:
                            </span>{" "}
                            {`${request.date.getDate()}/${request.date.getMonth()}/${request.date.getFullYear()}`}
                          </p>
                          <p className="w-fit">
                            <span className="font-semibold">
                              Responsável pelo Requisição:
                            </span>{" "}
                            {request.request_responsible}
                          </p>
                          <p className="w-fit font-semibold">
                            Produtos Solicitados:
                          </p>
                        </DialogDescription>

                        <RequestDetail request={request} />
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </div>
              </RequestComponent.Grid>
            </RequestComponent>
          ))}
      </TableComponent.Table>
    </TableComponent>
  );
}
