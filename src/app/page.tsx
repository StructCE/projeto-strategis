import { redirect } from "next/navigation";

export default function Home() {
  redirect("/ConfiguracoesGerais/CadastroDeProdutos"); // TODO: lógica de redirecionamento com base no cargo
}
