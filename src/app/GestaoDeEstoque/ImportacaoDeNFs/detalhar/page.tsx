"use client"

import DetailNF from "../_components/DetailNF/detailNF";

const nfExample = {
  numNF: 12345,
  date: "2024/09/05",
  quantity: "100",
  company: "Empresa 1",
  description: "Tomate, Alface, Batata",
};

export default function DetailNFPage() {

  return <DetailNF nf={nfExample} />;
}
