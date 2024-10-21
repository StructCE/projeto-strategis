import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type InventoryProduct } from "~/server/interfaces/inventory/inventory.route.interfaces";
import { type InvoiceProduct } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";

// interface AutoCreateInvoiceProps {
// documentNumber: string | null | undefined;
// documentDate: Date | null | undefined;
// supplier: string | null | undefined;
// installment: string | null | undefined;
// dateDeadline: Date | null | undefined;
// products: InvoiceProduct[] | null | undefined;
// }

const AutoCreateInvoice = (
  {
    // documentNumber,
    // documentDate,
    // supplier,
    // installment,
    // dateDeadline,
    // products,
  },
) => {
  const invoiceMutation = api.invoice.registerInvoice.useMutation({
    onSuccess: (newInvoice) => {
      console.log("Nota fiscal criada com sucesso:", newInvoice);
      alert("Nota fiscal criada com sucesso.");
      setTimeout(() => {
        location.reload(); // Atualiza a página após criar o inventário
      }, 500);
    },
    onError: (error) => {
      console.error("Erro ao criar nota fiscal:", error);
      alert("Erro ao criar nota fiscal.");
    },
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const xmlFiles = Array.from(files).filter(
        (file) => file.type === "text/xml" || file.name.endsWith(".xml"),
      );
      setSelectedFiles(xmlFiles);
    }
  };

  const handleImport = async () => {
    const invoiceData = [];

    for (const file of selectedFiles) {
      const text = await file.text(); // Lê o conteúdo do arquivo
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml"); // Analisa o XML

      // Extrai os dados desejados
      const documentNumber =
        xmlDoc.getElementsByTagName("cNF")[0]?.textContent ?? null; // Número do documento
      const dateDocumentStr =
        xmlDoc.getElementsByTagName("dhEmi")[0]?.textContent; // Data de emissão
      const documentDate = dateDocumentStr ? new Date(dateDocumentStr) : null; // Converte para Date
      const supplierName = xmlDoc.getElementsByTagName("xNome")[0]?.textContent; // Nome do fornecedor
      const installment =
        xmlDoc.getElementsByTagName("nDup")[0]?.textContent ?? null; // Número da parcela, se aplicável
      const dateDeadlineStr =
        xmlDoc.getElementsByTagName("dVenc")[0]?.textContent; // Data de vencimento da NF
      const dateDeadline = dateDeadlineStr ? new Date(dateDeadlineStr) : null; // Converte para Date

      // Extrai produtos
      const products: InvoiceProduct[] = [];
      const productNodes = xmlDoc.getElementsByTagName("det");

      for (const productNode of productNodes) {
        const prodNode = productNode.getElementsByTagName("prod")[0];
        const product: InvoiceProduct = {
          code: prodNode?.getElementsByTagName("cProd")[0]?.textContent ?? "", // Código do produto
          name: prodNode?.getElementsByTagName("xProd")[0]?.textContent ?? "", // Descrição do produto
          purchaseQuantity: parseFloat(
            prodNode?.getElementsByTagName("qCom")[0]?.textContent ?? "0",
          ), // Quantidade
          unitValue: parseFloat(
            prodNode?.getElementsByTagName("vProd")[0]?.textContent ?? "0",
          ), // Valor unitário
          ncm: parseFloat(
            prodNode?.getElementsByTagName("NCM")[0]?.textContent ?? "0",
          ),
          cfop: parseFloat(
            prodNode?.getElementsByTagName("CFOP")[0]?.textContent ?? "0",
          ),
          unit: {
            id: "",
            name: prodNode?.getElementsByTagName("uCom")[0]?.textContent ?? "",
            abbreviation: "",
            unitsPerPack: 0,
          },
          id: "",
          productId: "",
          controlType: undefined,
          category: undefined,
          useSector: undefined,
          shelf: undefined,
        };
        products.push(product);
      }

      invoiceData.push({
        documentNumber: documentNumber,
        documentDate: documentDate,
        supplier: supplierName,
        installment: installment,
        dateDeadline: dateDeadline,
        products,
      });
    }

    console.log("Todos os dados extraídos:", invoiceData); // Criar as Invoices aqui com os dados extraidos
    try {
      invoiceMutation.mutate({ ...invoiceData });
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        multiple
        accept=".xml"
        id="xmlFileInput"
        onChange={handleFileChange}
        className="cursor-pointer font-normal hover:bg-[#F6F6F6]"
      />
      <Button
        className="h-fit bg-cinza_escuro_botao px-[20px] py-[7px] hover:bg-cinza_borda_acordeao"
        onClick={handleImport}
      >
        Importar
      </Button>
    </div>
  );
};

export default AutoCreateInvoice;
