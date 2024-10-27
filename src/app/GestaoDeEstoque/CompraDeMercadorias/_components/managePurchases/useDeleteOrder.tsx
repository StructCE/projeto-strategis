import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableButtonComponent } from "~/components/tableButton";
import { api } from "~/trpc/react";

interface DeleteOrderProps {
  orderId: string;
}

export const DeleteOrder = (props: DeleteOrderProps) => {
  const router = useRouter();
  const deleteOrderMutation = api.order.deleteOrder.useMutation({
    onSuccess: (deletedOrder) => {
      console.log("Order removed successfully:", deletedOrder);
      toast.success(
        "Pedido de compra removido com sucesso. Atualizando a página...",
        {
          position: "bottom-right",
        },
      );
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error removing order:", error);
      toast.error("Erro ao remover pedido de compra.", {
        position: "bottom-right",
      });
    },
  });

  function handleDeleteOrder() {
    try {
      deleteOrderMutation.mutate({
        id: props.orderId,
      });
    } catch (error) {
      console.error("Error submitting delete form:", error);
    }
  }

  return (
    <TableButtonComponent.Button
      className="h-fit self-end rounded-lg bg-vermelho_botao_2 hover:bg-hover_vermelho_botao_2 max-[425px]:w-full sm:px-4 sm:py-1"
      handlePress={handleDeleteOrder}
      icon={
        <Trash2
          className="flex h-full cursor-pointer self-center"
          size={18}
          strokeWidth={2.2}
          color="white"
        />
      }
    >
      Deletar
    </TableButtonComponent.Button>
  );
};
