import { TableButtonComponent } from "~/components/tableButton";
import { type SerializedRequest } from "~/server/interfaces/request/request.route.interfaces";
import { api } from "~/trpc/react";

interface RejectRequestProps {
  statusDate?: Date;
  statusResponsibleId: string | undefined;
  statusDescription: string;
  request: SerializedRequest;
}

const RejectRequest: React.FC<RejectRequestProps> = ({
  statusDate,
  statusResponsibleId,
  statusDescription,
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

  const handleRejectRequest = () => {
    try {
      requestMutation.mutate({
        id: request.id,
        requestData: {
          status: "Rejeitada",
          statusDescription: statusDescription,
          statusDate: statusDate,
          statusResponsibleId: statusResponsibleId,
          requestProducts: request.requestProducts.map((product) => ({
            id: product.id,
            releasedQuantity: 0,
          })),
        },
      });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <TableButtonComponent.Button
      className="bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2 max-[425px]:w-full"
      handlePress={handleRejectRequest}
    >
      Rejeitar Requisição
    </TableButtonComponent.Button>
  );
};

export default RejectRequest;
