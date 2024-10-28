import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableButtonComponent } from "~/components/tableButton";
import { type SerializedOrder } from "~/server/interfaces/order/order.route.interfaces";
import { api } from "~/trpc/react";

interface EditOrderProps {
  order: SerializedOrder;
}

export const EditOrder = (props: EditOrderProps) => {
  const router = useRouter();
  const editOrderMutation = api.order.editOrder.useMutation({
    onSuccess: (updatedOrder) => {
      console.log("Order updated successfully:", updatedOrder);
      toast.success(
        "Pedido de compra atualizado com sucesso. Atualizando a página...",
        {
          position: "bottom-right",
        },
      );
      setTimeout(function () {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Error updating order:", error);
      toast.error("Erro ao atualizar pedido de compra.", {
        position: "bottom-right",
      });
    },
  });

  function handleEditOrder() {
    try {
      editOrderMutation.mutate({
        id: props.order.id,
        data: {
          // date: props.order.date,
          // responsibleId: props.order.responsible.id,
          // orderProducts: props.order.orderProducts.map((orderProduct) => ({
          //   id: orderProduct.id,
          //   data: {
          //     purchaseQuantity: orderProduct.purchaseQuantity,
          //     productSupplierId: orderProduct.ProductSupplier.id,
          //   },
          // })),
          status: true,
        },
      });
    } catch (error) {
      console.error("Error submitting update form:", error);
    }
  }

  return (
    <TableButtonComponent.Button
      className="h-fit self-end rounded-lg bg-verde_botao hover:bg-hover_verde_botao max-[425px]:w-full sm:px-4 sm:py-1"
      handlePress={handleEditOrder}
      icon={
        <Check
          className="flex h-full cursor-pointer self-center"
          size={18}
          strokeWidth={2.2}
          color="white"
        />
      }
    >
      Confimar
    </TableButtonComponent.Button>
  );
};
