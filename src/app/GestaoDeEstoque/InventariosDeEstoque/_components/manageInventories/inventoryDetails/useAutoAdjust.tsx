import { TableButtonComponent } from "~/components/tableButton";
import {
  type InventoryProduct,
  type SerializedInventory,
} from "~/server/interfaces/inventory/inventory.route.interfaces";
import { api } from "~/trpc/react";

interface FinalizeAutoAdjustProps {
  inventory: SerializedInventory;
  date?: Date;
  selectResponsible: string | undefined;
  stockId: string;
  addedProducts: InventoryProduct[];
  adjustReasonId: string | undefined;
}

const FinalizeAutoAdjust: React.FC<FinalizeAutoAdjustProps> = ({
  inventory,
  date,
  selectResponsible,
  stockId,
  addedProducts,
  adjustReasonId,
}) => {
  const adjustMutation = api.adjust.registerAdjust.useMutation({
    onSuccess: (newAdjust) => {
      console.log("Ajuste de estoque realizado com sucesso:", newAdjust);
      // Chama a função para atualizar o status do inventário para "Ajuste realizado"
      editInventoryMutation.mutate({
        id: inventory.id,
        inventoryData: { status: "Ajuste realizado" },
      });

      alert("Ajuste de estoque realizado com sucesso.");
      setTimeout(() => {
        location.reload(); // Atualiza a página após criar o Ajuste de estoque
      }, 500);
    },
    onError: (error) => {
      console.error("Erro ao realizar ajuste de estoque:", error);
      alert("Erro ao realizar ajuste de estoque.");
    },
  });

  // Mutação para editar o inventário
  const editInventoryMutation = api.inventory.editInventory.useMutation({
    onSuccess: (editedInventory) => {
      console.log("Inventário atualizado com sucesso:", editedInventory);
    },
    onError: (error) => {
      console.error("Erro ao atualizar o status do inventário:", error);
    },
  });

  const handleFinalizeAutoAdjust = () => {
    if (!selectResponsible || addedProducts.length === 0) {
      alert(
        "Preencha todos os campos obrigatórios e adicione pelo menos um produto.",
      );
      return;
    }

    const adjustData = {
      responsibleId: selectResponsible,
      date: date ?? new Date(),
      type: "Automático",
      stockId: stockId,
      adjustProducts: addedProducts.map((product) => ({
        productId: product.productId,
        oldStock: product.stockQuantity,
        adjustedStock: product.inventoryQuantity,
        reasonId: adjustReasonId ?? "",
      })),
    };

    console.log(adjustData);

    try {
      adjustMutation.mutate({ ...adjustData });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <TableButtonComponent className="w-fit pt-2 sm:pt-4 lg:w-full">
      <TableButtonComponent.Button
        className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1 max-[425px]:w-full"
        handlePress={handleFinalizeAutoAdjust}
      >
        Realizar Ajuste de Estoque Automático
      </TableButtonComponent.Button>
    </TableButtonComponent>
  );
};

export default FinalizeAutoAdjust;