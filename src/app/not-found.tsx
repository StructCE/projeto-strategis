"use client";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-4 bg-fundo_branco font-bold text-black">
      <h2 className="text-4xl sm:text-6xl">404 | Not Found</h2>
      <p className="text-md font-normal sm:text-xl">
        A página que você está procurando não existe.
      </p>
      <Button
        onClick={() => (router.push("/"), router.refresh())}
        className="m-2 rounded-lg bg-vermelho_botao_2 px-6 py-2 text-xl font-bold text-white hover:bg-vermelho_escuro_strategis"
      >
        Voltar
      </Button>
    </div>
  );
}
