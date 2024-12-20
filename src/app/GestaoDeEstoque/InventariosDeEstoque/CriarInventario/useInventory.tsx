import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableButtonComponent } from "~/components/tableButton";
import { type InventoryProduct } from "~/server/interfaces/inventory/inventory.route.interfaces";
import { api } from "~/trpc/react";

interface FinalizeInventoryProps {
  date?: Date;
  selectResponsible: string | undefined;
  stockId: string;
  addedProducts: InventoryProduct[];
  quantities: Record<string, string>;
}

const FinalizeInventory: React.FC<FinalizeInventoryProps> = ({
  date,
  selectResponsible,
  stockId,
  addedProducts,
  quantities,
}) => {
  const router = useRouter();
  const inventoryMutation = api.inventory.registerInventory.useMutation({
    onSuccess: (newInventory) => {
      // console.log("Inventário criado com sucesso:", newInventory);
      toast.success("Inventário criado com sucesso. Atualizando a página...", {
        position: "bottom-right",
      });
      setTimeout(() => {
        router.refresh();
      }, 2000);
    },
    onError: (error) => {
      console.error("Erro ao criar inventário:", error);
      toast.error("Erro ao criar inventário.", {
        position: "bottom-right",
      });
    },
  });

  const handleFinalizeInventory = () => {
    if (!selectResponsible || addedProducts.length === 0) {
      toast.warn(
        "Preencha todos os campos obrigatórios e adicione pelo menos um produto.",
        {
          position: "top-center",
        },
      );
      return;
    }

    let status = "";
    const hasDiscrepancy = addedProducts.some((product) => {
      const inventoryQuantity = Number(quantities[product.code] ?? "0"); // Quantidade registrada no inventário
      return inventoryQuantity !== product.stockQuantity; // Verifica se há diferença
    });

    if (hasDiscrepancy) {
      status = "Ajuste necessário";
    } else {
      status = "Estoque OK";
    }

    const inventoryData = {
      responsibleId: selectResponsible,
      date: date ?? new Date(),
      stockId: stockId,
      status: status,
      inventoryProducts: addedProducts.map((product) => ({
        productId: product.id,
        stockQuantity: product.stockQuantity ?? 0, // Quantidade em estoque
        inventoryQuantity: Number(quantities[product.code]) || 0, // Quantidade no inventário
      })),
    };

    // console.log(inventoryData);

    try {
      inventoryMutation.mutate({ ...inventoryData });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <TableButtonComponent className="pt-2 sm:pt-4">
      <TableButtonComponent.Button
        className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
        handlePress={handleFinalizeInventory}
      >
        Finalizar Inventário
      </TableButtonComponent.Button>
    </TableButtonComponent>
  );
};

export default FinalizeInventory;
