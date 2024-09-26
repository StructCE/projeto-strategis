import DetailNF from "./detailNF";

const nfExample = {
  numNF: 12345,
  date: "2024/09/05",
  quantity: "100",
  company: "Empresa 1",
  supplier: "Fornecedor 1",
  description: "Tomate, Alface, Batata",
}

// TODO: rota dinâmica 
export default function DetailNFPage() {
  return <DetailNF nf={nfExample} />;
}
