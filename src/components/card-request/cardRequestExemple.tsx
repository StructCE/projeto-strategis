import { RequestComponent } from "~/components/card-request/cardRequest";

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
          <RequestComponent.ColumnButtonManage />
        </RequestComponent.Grid>
      </RequestComponent>
    </div>
  );
}
