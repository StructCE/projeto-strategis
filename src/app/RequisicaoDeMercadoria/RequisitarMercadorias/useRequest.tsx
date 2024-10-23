import { toast } from "react-toastify";
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
      console.log("Requisição criada com sucesso:", newRequest);
      toast.success("Requisição criada com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        location.reload(); // Atualiza a página após criar o requisição
      }, 2000);
    },
    onError: (error) => {
      console.error("Erro ao criar requisição:", error);
      toast.error("Erro ao criar requisição.", {
        position: "bottom-right",
      });
    },
  });

  const handleFinalizeRequest = () => {
    if (!selectResponsibleId) {
      toast.warn("Selecione o reponsável pelo requisição.", {
        position: "top-center",
      });
      return;
    } else if (addedProducts.length === 0) {
      toast.warn("Adicione pelo menos um produto.", {
        position: "top-center",
      });
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
