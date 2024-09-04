"use client";
import { BookMarked, Calendar as CalendarIcon, Search } from "lucide-react";
import { useState } from "react";
import { Filter } from "~/components/filter";

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

const FilterDatePickerExample = (props: {
  date: Date | undefined;
  setDate: (value: Date | undefined) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Filter>
      <Filter.Icon
        icon={({ className }: { className: string }) => (
          <CalendarIcon className={className} />
        )}
      />
      <Filter.DatePicker {...props}></Filter.DatePicker>
    </Filter>
  );
};

export default function FilterExample() {
  const [select, setSelect] = useState("");
  const [input, setInput] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-[12px] sm:flex-row sm:gap-[20px]">
      <FilterSelectExample state={select} setState={setSelect} />
      <FilterInputExample state={input} setState={setInput} />
      <FilterDatePickerExample
        date={date}
        setDate={setDate}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
