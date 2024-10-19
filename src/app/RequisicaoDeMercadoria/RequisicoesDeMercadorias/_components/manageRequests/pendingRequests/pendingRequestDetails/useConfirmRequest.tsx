import { TableButtonComponent } from "~/components/tableButton";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";
import { api } from "~/trpc/react";

interface ConfirmRequestProps {
  statusDate?: Date;
  statusResponsibleId: string | undefined;
  statusDescription: string;
  quantities: Record<string, string>;
  request: SerializedRequest;
}

const ConfirmRequest: React.FC<ConfirmRequestProps> = ({
  statusDate,
  statusResponsibleId,
  statusDescription,
  quantities,
  request,
}) => {
  const requestMutation = api.request.editRequest.useMutation({
    onSuccess: (newRequest) => {
      console.log("Requisição atualizada com sucesso:", newRequest);
      alert("Requisição atualizada com sucesso.");
      setTimeout(() => {
        location.reload();
      }, 500);
    },
    onError: (error) => {
      console.error("Erro ao atualizar requisição:", error);
      alert("Erro ao atualizar requisição.");
    },
  });

  const handleConfirmRequest = () => {
    try {
      requestMutation.mutate({
        id: request.id,
        requestData: {
          status: "Confirmada",
          statusDescription: statusDescription,
          statusDate: statusDate,
          statusResponsibleId: statusResponsibleId,
          requestProducts: request.requestProducts.map((product) => ({
            id: product.id,
            releasedQuantity: Number(quantities[product.code]) || 0,
          })),
        },
      });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <TableButtonComponent.Button
      className="bg-verde_botao hover:bg-hover_verde_botao max-[425px]:w-full"
      handlePress={handleConfirmRequest}
    >
      Confirmar Requisição
    </TableButtonComponent.Button>
  );
};

export default ConfirmRequest;
