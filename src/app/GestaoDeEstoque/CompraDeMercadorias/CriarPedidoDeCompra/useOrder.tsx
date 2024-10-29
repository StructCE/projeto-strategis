import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableButtonComponent } from "~/components/tableButton";
import { type ProductWithFeatures } from "~/server/interfaces/product/product.route.interfaces";
import { api } from "~/trpc/react";

interface FinalizeOrderProps {
  selectResponsible: string | undefined;
  addedProducts: ProductWithFeatures[];
  quantities: Record<string, string>;
  selectedSuppliers: Record<string, string>;
  date?: Date;
}

const FinalizeOrder: React.FC<FinalizeOrderProps> = ({
  selectResponsible,
  addedProducts,
  quantities,
  selectedSuppliers,
  date,
}) => {
  const router = useRouter();
  const orderMutation = api.order.registerOrder.useMutation({
    onSuccess: (newOrder) => {
      console.log("Pedido de compra criado com sucesso:", newOrder);
      toast.success(
        "Pedido de compra criado com sucesso. Atualizando a página...",
        {
          position: "bottom-right",
        },
      );
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Erro ao criar pedido de compra:", error);
      toast.error("Erro ao criar pedido de compra.", {
        position: "bottom-right",
      });
    },
  });

  const handleFinalizeOrder = () => {
    if (!selectResponsible) {
      toast.warn("Selecione o reponsável pelo pedido de compra.", {
        position: "top-center",
      });
      return;
    }
    if (addedProducts.length === 0) {
      toast.warn("Adicione pelo menos um produto.", {
        position: "top-center",
      });
      return;
    }

    const invalidProducts = addedProducts.filter((product) => {
      const supplierSelected = selectedSuppliers[product.id];
      const quantitySelected = Number(quantities[product.id]);

      // Retorna true para produtos sem fornecedor ou quantidade válida
      return !supplierSelected || quantitySelected <= 0;
    });

    if (invalidProducts.length > 0) {
      toast.warn(
        "Certifique-se de que todos os produtos tenham um fornecedor selecionado e uma quantidade válida.",
        {
          position: "top-center",
        },
      );
      return;
    }

    const orderData = {
      date: date ?? new Date(),
      responsibleId: selectResponsible,
      status: false,
      orderProducts: addedProducts.map((product) => ({
        productSupplierId: selectedSuppliers[product.id] ?? "",
        purchaseQuantity: Number(quantities[product.id]) || 0,
      })),
    };

    console.log(orderData);

    try {
      orderMutation.mutate({ ...orderData });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <TableButtonComponent className="pt-2 sm:pt-4">
      <TableButtonComponent.Button
        className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
        handlePress={handleFinalizeOrder}
      >
        Finalizar Pedido de Compra
      </TableButtonComponent.Button>
    </TableButtonComponent>
  );
};

export default FinalizeOrder;
