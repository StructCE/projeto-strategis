import { RequestComponent } from "~/components/card-request/cardRequest";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function CardRequest() {
  return (
    <div>
      <RequestComponent>
        <RequestComponent.Grid>
          <RequestComponent.ColumnItem
            isnº={true}
            title="Nota Fiscal"
            description="201531"
          />
          <RequestComponent.ColumnItem
            title="Data de Emissão"
            description="25/08/2024"
          />
          <RequestComponent.ColumnItem
            title="Quantidade de Produtos"
            description="16"
          />
          <RequestComponent.ColumnItem
            title="Fornecedor(es)"
            description="Brasal, Ambev, etc"
          />
          <Dialog>
            <DialogTrigger asChild>
              <RequestComponent.ColumnButtonManage />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Detalhes da Entrada:</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </RequestComponent.Grid>
      </RequestComponent>
    </div>
  );
}
