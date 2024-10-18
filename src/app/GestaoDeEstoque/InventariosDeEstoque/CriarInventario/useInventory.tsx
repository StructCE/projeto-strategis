import { TableButtonComponent } from "~/components/tableButton";
import { type InventoryProduct } from "~/server/interfaces/inventory/inventory.route.interfaces";
import { api } from "~/trpc/react";

interface FinalizeInventoryProps {
  selectResponsible: string | undefined;
  addedProducts: InventoryProduct[];
  quantities: Record<string, string>;
  date?: Date;
}

const FinalizeInventory: React.FC<FinalizeInventoryProps> = ({
  selectResponsible,
  addedProducts,
  quantities,
  date,
}) => {
  const inventoryMutation = api.inventory.registerInventory.useMutation({
    onSuccess: (newInventory) => {
      console.log("Inventário criado com sucesso:", newInventory);
      alert("Inventário criado com sucesso.");
      setTimeout(() => {
        location.reload(); // Atualiza a página após criar o inventário
      }, 500);
    },
    onError: (error) => {
      console.error("Erro ao criar inventário:", error);
      alert("Erro ao criar inventário.");
    },
  });

  const handleFinalizeInventory = () => {
    if (!selectResponsible || addedProducts.length === 0) {
      alert(
        "Preencha todos os campos obrigatórios e adicione pelo menos um produto.",
      );
      return;
    }

    const inventoryData = {
      responsibleId: selectResponsible,
      date: date ?? new Date(),
      inventoryProducts: addedProducts.map((product) => ({
        productId: product.id,
        stockQuantity: product.stockQuantity, // Quantidade em estoque
        inventoryQuantity: Number(quantities[product.code]) || 0, // Quantidade no inventário
      })),
    };

    console.log(inventoryData);

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
