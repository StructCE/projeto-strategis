"use client";
import { Filter } from "~/components/filter";
import { BookMarked } from "lucide-react";
import { useState } from "react";

export default function Home() {
  //exemplo
  const [select, setSelect] = useState("");
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Filter
        icon={({ className }) => (
          <BookMarked className={className}> </BookMarked>
        )}
      >
        <Filter.Select
          placeholder="Fornecedor"
          state={select}
          setState={setSelect}
        >
          <Filter.SelectItems value="Primeiro"></Filter.SelectItems>
          <Filter.SelectItems value="Segundo"></Filter.SelectItems>
        </Filter.Select>
      </Filter>
    </div>
  );
}
