import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TableButtonComponent } from "~/components/tableButton";
import { type AdjustProduct } from "~/server/interfaces/adjust/adjust.route.interfaces";
import { api } from "~/trpc/react";

interface FinalizeAdjustProps {
  date?: Date;
  selectResponsible: string | undefined;
  stockId: string;
  addedProducts: AdjustProduct[];
  adjustedStock: Record<string, string>;
  adjustmentReasons: Record<string, string>;
}

const FinalizeAdjust: React.FC<FinalizeAdjustProps> = ({
  date,
  selectResponsible,
  stockId,
  addedProducts,
  adjustedStock,
  adjustmentReasons,
}) => {
  const adjustMutation = api.adjust.registerAdjust.useMutation({
    onSuccess: (newAdjust) => {
      console.log("Ajuste de estoque criado com sucesso:", newAdjust);
      toast.success(
        "Ajuste de estoque criado com sucesso. Atualizando a página...",
        {
          position: "bottom-right",
        },
      );
      setTimeout(() => {
        location.reload();
      }, 2000);
    },
    onError: (error) => {
      console.error("Erro ao criar ajuste de estoque:", error);
      toast.error("Erro ao criar ajuste de estoque.", {
        position: "bottom-right",
      });
    },
  });

  const handleFinalizeAdjust = () => {
    if (!selectResponsible || addedProducts.length === 0) {
      toast.warn(
        "Preencha todos os campos obrigatórios e adicione pelo menos um produto.",
        {
          position: "top-center",
        },
      );
      return;
    }

    const adjustData = {
      responsibleId: selectResponsible,
      date: date ?? new Date(),
      type: "Manual",
      stockId: stockId,
      adjustProducts: addedProducts.map((product) => ({
        productId: product.id,
        oldStock: product.oldStock,
        adjustedStock: Number(adjustedStock[product.code]) || 0,
        reasonId: adjustmentReasons[product.code] ?? "",
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
    <TableButtonComponent className="pt-2 sm:pt-4">
      <TableButtonComponent.Button
        className="bg-vermelho_botao_1 hover:bg-hover_vermelho_botao_1"
        handlePress={handleFinalizeAdjust}
      >
        Finalizar Ajuste de Estoque
      </TableButtonComponent.Button>
    </TableButtonComponent>
  );
};

export default FinalizeAdjust;
