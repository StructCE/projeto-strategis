import { RequestComponent } from "~/components/card-request/cardRequest";

export default function CardRequest() {
  return (
    <div>
      {/* Card exibindo os botões confirmar e rejeitar */}
      <RequestComponent>
        <RequestComponent.Grid>
          <RequestComponent.ColumnItem
            title="Data"
            description="22/07/2024 - 14h30"
          />
          <RequestComponent.ColumnItem
            title="Fornecedor(es)"
            description="Brasil"
          />
          <RequestComponent.ColumnItem title="Código" description="235" />
          <RequestComponent.ColumnItem title="Lote" description="058" />
          <RequestComponent.ColumnButtonConfirm />
          <RequestComponent.ColumnItem
            title="Produto"
            description="Guaraná Antarctica Zero"
          />
          <RequestComponent.ColumnItem
            title="Quantidade (und)"
            description="16"
          />
          <RequestComponent.ColumnItem
            title="Quantidade (frd)"
            description="4"
          />

          <RequestComponent.ColumnItem
            title="Requisitante"
            description="Nome do Requisitante 1"
          />
          <RequestComponent.ColumnButtonReject />
        </RequestComponent.Grid>
      </RequestComponent>

      {/* Card exibindo a coluna que mostra a coluna responsável */}
      <RequestComponent>
        <RequestComponent.Grid>
          <RequestComponent.ColumnItem
            title="Data"
            description="22/07/2024 - 14h30"
          />
          <RequestComponent.ColumnItem
            title="Fornecedor(es)"
            description="Brasil"
          />
          <RequestComponent.ColumnItem title="Código" description="235" />
          <RequestComponent.ColumnItem title="Lote" description="058" />
          <RequestComponent.ColumnResponsible
            title="Responsável"
            description="Estoquista 1"
          />
          <RequestComponent.ColumnItem
            title="Produto"
            description="Guaraná Antarctica Zero"
          />
          <RequestComponent.ColumnItem
            title="Quantidade (und)"
            description="16"
          />
          <RequestComponent.ColumnItem
            title="Quantidade (frd)"
            description="4"
          />

          <RequestComponent.ColumnItem
            title="Requisitante"
            description="Nome do Requisitante 1"
          />
        </RequestComponent.Grid>
      </RequestComponent>

      {/* Card sem a ultima coluna */}
      <RequestComponent>
        <RequestComponent.Grid
          className="max-[768px]:grid-flow-row"
          showFourColumn={true}
        >
          <RequestComponent.ColumnItem
            title="Data"
            description="22/07/2024 - 14h30"
          />
          <RequestComponent.ColumnItem
            title="Produto"
            description="Guaraná Antarctica Zero"
          />
          <RequestComponent.ColumnItem
            title="Fornecedor(es)"
            description="Brasil"
          />
          <RequestComponent.ColumnItem
            title="Quantidade (und)"
            description="16"
          />
          <RequestComponent.ColumnItem title="Código" description="235" />
          <RequestComponent.ColumnItem
            title="Quantidade (frd)"
            description="4"
          />
          <RequestComponent.ColumnItem title="Lote" description="058" />
          <RequestComponent.ColumnItem
            title="Requisitante"
            description="Nome do Requisitante 1"
          />
        </RequestComponent.Grid>
      </RequestComponent>
    </div>
  );
}
