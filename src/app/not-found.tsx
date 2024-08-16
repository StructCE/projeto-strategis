"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="bg-fundo_branco text-vermelho_botao_2 flex h-screen w-full flex-col items-center justify-center gap-4 font-bold">
      <h2 className="text-4xl sm:text-6xl">404 | Not Found</h2>
      <p className="text-md font-normal sm:text-xl">
        A página que você está procurando não existe.
      </p>
      <Button
        onClick={() => (router.push("/"), router.refresh())}
        className="bg-vermelho_botao_2 hover:bg-vermelho_escuro_strategis m-2 rounded-lg px-6 py-2 text-xl font-bold text-white"
      >
        Voltar
      </Button>
    </div>
  );
}
