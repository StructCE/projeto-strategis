import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { type InvoiceProduct } from "~/server/interfaces/invoice/invoice.route.interfaces";
import { api } from "~/trpc/react";

const AutoCreateInvoice = () => {
  const invoiceMutation = api.invoice.autoRegisterInvoice.useMutation({
    onSuccess: (newInvoice) => {
      console.log("Nota fiscal criada com sucesso:", newInvoice);
      alert("Nota fiscal criada com sucesso.");
      setTimeout(() => {
        location.reload();
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

  function capitalizeName(name: string) {
    return name
      .toLowerCase() // Primeiro transforma tudo em minúsculo
      .split(" ") // Divide em palavras
      .map((word) => {
        if (word.length === 0) return word; // Caso especial de palavras vazias
        return word.charAt(0).toUpperCase() + word.slice(1); // Capitaliza a primeira letra de cada palavra
      })
      .join(" "); // Junta as palavras de volta
  }

  const handleImport = async () => {
    const invoiceDataList = [];

    for (const file of selectedFiles) {
      const text = await file.text(); // Lê o conteúdo do arquivo
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, "text/xml"); // Analisa o XML

      // Extrai os dados da fatura (invoice)
      const documentNumber =
        xmlDoc.getElementsByTagName("cNF")[0]?.textContent ?? "";
      const dateDocumentStr =
        xmlDoc.getElementsByTagName("dhEmi")[0]?.textContent;
      const documentDate = dateDocumentStr
        ? new Date(dateDocumentStr)
        : new Date();

      const supplier = {
        name: capitalizeName(
          xmlDoc.getElementsByTagName("xNome")[0]?.textContent ?? "",
        ),
        cnpj: xmlDoc.getElementsByTagName("CNPJ")[0]?.textContent ?? "",
        stateRegistration:
          xmlDoc.getElementsByTagName("IE")[0]?.textContent ?? "",
        address: capitalizeName(
          xmlDoc
            .getElementsByTagName("enderEmit")[0]
            ?.getElementsByTagName("xLgr")[0]?.textContent ?? "",
        ),
        city: capitalizeName(
          xmlDoc
            .getElementsByTagName("enderEmit")[0]
            ?.getElementsByTagName("xMun")[0]?.textContent ?? "",
        ),
        neighborhood: capitalizeName(
          xmlDoc
            .getElementsByTagName("enderEmit")[0]
            ?.getElementsByTagName("xBairro")[0]?.textContent ?? "",
        ),
        federativeUnit:
          xmlDoc
            .getElementsByTagName("enderEmit")[0]
            ?.getElementsByTagName("UF")[0]?.textContent ?? "",
        cep:
          xmlDoc
            .getElementsByTagName("enderEmit")[0]
            ?.getElementsByTagName("CEP")[0]?.textContent ?? "",
        phone:
          xmlDoc
            .getElementsByTagName("enderEmit")[0]
            ?.getElementsByTagName("fone")[0]?.textContent ?? "",
      };

      const recipient = {
        name: capitalizeName(
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("xNome")[0]?.textContent ?? "",
        ),
        cnpj:
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("CNPJ")[0]?.textContent ?? "",
        stateRegistration:
          xmlDoc.getElementsByTagName("dest")[0]?.getElementsByTagName("IE")[0]
            ?.textContent ?? "",
        address: capitalizeName(
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("enderDest")[0]
            ?.getElementsByTagName("xLgr")[0]?.textContent ?? "",
        ),
        city: capitalizeName(
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("enderDest")[0]
            ?.getElementsByTagName("xMun")[0]?.textContent ?? "",
        ),
        neighborhood: capitalizeName(
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("enderDest")[0]
            ?.getElementsByTagName("xBairro")[0]?.textContent ?? "",
        ),
        federativeUnit:
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("enderDest")[0]
            ?.getElementsByTagName("UF")[0]?.textContent ?? "",
        cep:
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("enderDest")[0]
            ?.getElementsByTagName("CEP")[0]?.textContent ?? "",
        phone:
          xmlDoc
            .getElementsByTagName("dest")[0]
            ?.getElementsByTagName("fone")[0]?.textContent ?? "",
      };

      const installment =
        xmlDoc.getElementsByTagName("nDup")[0]?.textContent ?? "";
      const dateDeadlineStr =
        xmlDoc.getElementsByTagName("dVenc")[0]?.textContent;
      const dateDeadline = dateDeadlineStr
        ? new Date(dateDeadlineStr)
        : new Date();
      const invoiceValue =
        xmlDoc.getElementsByTagName("vNF")[0]?.textContent ?? "";

      // Extrai produtos
      const products: InvoiceProduct[] = [];
      const productNodes = xmlDoc.getElementsByTagName("det");

      for (const productNode of productNodes) {
        const prodNode = productNode.getElementsByTagName("prod")[0];

        const uCom =
          prodNode?.getElementsByTagName("uCom")[0]?.textContent ?? "";
        const match = uCom.match(/^(\w+)(?:\s+(\d+))?$/);
        const unitAbbreviation = match ? match[1] : "";
        const unitsPerPack = match?.[2] ? parseInt(match[2], 10) : 0;

        const product: InvoiceProduct = {
          code: prodNode?.getElementsByTagName("cProd")[0]?.textContent ?? "",
          name: capitalizeName(
            prodNode?.getElementsByTagName("xProd")[0]?.textContent ?? "",
          ),
          purchaseQuantity: parseFloat(
            prodNode?.getElementsByTagName("qCom")[0]?.textContent ?? "0",
          ),
          unitValue: parseFloat(
            prodNode?.getElementsByTagName("vUnCom")[0]?.textContent ?? "0",
          ),
          ncm: parseFloat(
            prodNode?.getElementsByTagName("NCM")[0]?.textContent ?? "0",
          ),
          cfop: parseFloat(
            prodNode?.getElementsByTagName("CFOP")[0]?.textContent ?? "0",
          ),
          unit: {
            id: "",
            name: "",
            abbreviation: unitAbbreviation ?? "",
            unitsPerPack: unitsPerPack ?? 1,
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

      const invoiceData = {
        supplier: supplier,
        company: recipient,
        documentNumber: documentNumber,
        documentDate: documentDate,
        installment: installment,
        deadlineDate: dateDeadline,
        confirmedStatus: "Pendente",
        invoiceValue: Number(invoiceValue),
        invoiceProducts: products.map((product) => ({
          name: product.name,
          code: product.code,
          ncm: product.ncm,
          cfop: product.cfop,
          unit: {
            unitAbbreviation: product.unit.abbreviation,
            unitsPerPack: product.unit.unitsPerPack ?? 1,
          },
          productId: product.productId,
          purchaseQuantity: product.purchaseQuantity,
          unitValue: product.unitValue,
        })),
      };

      invoiceDataList.push(invoiceData);
    }

    // Envia cada fatura para o backend
    for (const invoiceData of invoiceDataList) {
      try {
        await invoiceMutation.mutateAsync(invoiceData);
      } catch (error) {
        console.error("Erro ao criar a fatura:", error);
      }
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
        className="h-fit bg-verde_botao px-[20px] py-[7px] hover:bg-hover_verde_botao"
        onClick={handleImport}
      >
        Importar
      </Button>
    </div>
  );
};

export default AutoCreateInvoice;
