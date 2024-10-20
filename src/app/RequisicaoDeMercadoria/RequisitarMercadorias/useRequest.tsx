import { TableButtonComponent } from "~/components/tableButton";
import { type ProductWithFeatures } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";

interface FinalizeRequestProps {
  requestDate?: Date;
  selectResponsibleId: string | undefined;
  addedProducts: ProductWithFeatures[];
  quantities: Record<string, string>;
  requestDescription: string | undefined;
}

const FinalizeRequest: React.FC<FinalizeRequestProps> = ({
  requestDate,
  selectResponsibleId,
  addedProducts,
  quantities,
  requestDescription,
}) => {
  const requestMutation = api.request.registerRequest.useMutation({
    onSuccess: (newRequest) => {
      console.log("Requisição criado com sucesso:", newRequest);
      alert("Requisição criado com sucesso.");
      setTimeout(() => {
        location.reload(); // Atualiza a página após criar o requisição
      }, 500);
    },
    onError: (error) => {
      console.error("Erro ao criar requisição:", error);
      alert("Erro ao criar requisição.");
    },
  });

  const handleFinalizeRequest = () => {
    if (!selectResponsibleId) {
      alert("Selecione o reponsável pelo requisição.");
      return;
    } else if (addedProducts.length === 0) {
      alert("Adicione pelo menos um produto.");

      return;
    }

    const requestData = {
      description: requestDescription ?? "",
      requestDate: requestDate ?? new Date(),
      responsibleId: selectResponsibleId,
      status: "Esperando Confirmação",
      statusDescription: undefined,
      statusDate: undefined,
      statusResponsibleId: undefined,
      requestProducts: addedProducts.map((product) => ({
        requestedQuantity: Number(quantities[product.code]) || 0,
        releasedQuantity: undefined,
        // requestId: ,
        productId: product.id,
        // unitId: product.unit.id,
      })),
    };

    console.log(requestData);

    try {
      requestMutation.mutate({ ...requestData });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <TableButtonComponent className="pt-2 sm:pt-4">
      <TableButtonComponent.Button
        className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
        handlePress={handleFinalizeRequest}
      >
        Finalizar Requisição
      </TableButtonComponent.Button>
    </TableButtonComponent>
  );
};

export default FinalizeRequest;
