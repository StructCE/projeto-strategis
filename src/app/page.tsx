"use client";
import { Filter } from "~/components/filter";
import { BookMarked, Calendar, Search } from "lucide-react";
import { useState } from "react";

const FilterSelectExample = ({
  state,
  setState,
}: {
  state: string;
  setState: (value: string) => void;
}) => {
  return (
    <Filter>
      <Filter.Icon
        icon={({ className }) => (
          <BookMarked className={className}> </BookMarked>
        )}
      />
      <Filter.Select placeholder="Fornecedor" state={state} setState={setState}>
        <Filter.SelectItems value="Primeiro"></Filter.SelectItems>
        <Filter.SelectItems value="Segundo"></Filter.SelectItems>
      </Filter.Select>
    </Filter>
  );
};

const FilterInputExample = ({
  state,
  setState,
}: {
  state: string;
  setState: (value: string) => void;
}) => {
  return (
    <Filter>
      <Filter.Icon
        icon={({ className }: { className: string }) => (
          <Search className={className} />
        )}
      />
      <Filter.Input placeholder="Produto" state={state} setState={setState} />
    </Filter>
  );
};

const FilterDatePickerExample = ({
  state,
  setState,
}: {
  state: Date;
  setState: (value: Date) => void;
}) => {
  return (
    <Filter>
      <Filter.Icon
        icon={({ className }: { className: string }) => (
          <Calendar className={className} />
        )}
      />
    </Filter>
  );
};

export default function Home() {
  const [select, setSelect] = useState("");
  const [input, setInput] = useState("");
  const [date, setDate] = useState(new Date());
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-[20px]">
      <FilterSelectExample state={select} setState={setSelect} />
      <FilterInputExample state={input} setState={setInput} />
      <FilterDatePickerExample state={date} setState={setDate} />
    </div>
  );
}
