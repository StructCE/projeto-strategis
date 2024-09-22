import { Download, ExternalLink } from "lucide-react";
import { TableButtonComponent } from ".";

export default function ButtonsExamples() {
  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      {/* Botão de link para redirecionar para outra página */}
      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Link
          link_ref="/GestaoDeEstoque/AjustesDeEstoque/CriarAjusteDeEstoque"
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
          placeholder="Criar Novo Ajuste de Estoque"
        >
          <ExternalLink
            className="flex h-full cursor-pointer self-center"
            size={20}
            strokeWidth={2.2}
            color="white"
          />
        </TableButtonComponent.Link>
      </TableButtonComponent>

      {/* Botão que faz uma ação/operação */}
      <TableButtonComponent className="pt-2 sm:pt-4">
        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao"
          handlePress={() => console.log("a")}
        >
          Finalizar Ajuste de Estoque
        </TableButtonComponent.Button>
      </TableButtonComponent>

      {/* Botão que faz uma ação/operação com icone */}
      <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
        <TableButtonComponent.Button
          className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao max-[425px]:w-full"
          icon={
            <Download
              className="flex h-full cursor-pointer self-center"
              size={20}
              strokeWidth={2.2}
              color="white"
            />
          }
        >
          Baixar Relatório
        </TableButtonComponent.Button>
      </TableButtonComponent>
    </div>
  );
}
