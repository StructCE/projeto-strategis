"use client";
import { ArrowRight, Building2, Search } from "lucide-react";
import { Filter } from "~/components/filter";
import { companies } from "../../notasFiscaisData";
import { useTableNFsFilters } from "./useTableNFsFilters";

export default function TableNFsFilters() {
  const filters = useTableNFsFilters();
  return (
    <div className="flex w-full justify-between">
      <div className="flex w-fit gap-6">
        <Filter>
          <Filter.DatePicker
            date={filters.dateBegin}
            setDate={filters.setDateBegin}
            open={filters.openDatePickerBegin}
            setOpen={filters.setOpenDatePickerBegin}
          />
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <ArrowRight className={className} />
            )}
          />
          <Filter.DatePicker
            date={filters.dateEnd}
            setDate={filters.setDateEnd}
            open={filters.openDatePickerEnd}
            setOpen={filters.setOpenDatePickerEnd}
          />
        </Filter>
        <Filter>
          <Filter.Icon
            icon={({ className }: { className: string }) => (
              <Building2 className={className} />
            )}
          />
          <Filter.Select
            placeholder="Fornecedor"
            state={filters.selectCompany}
            setState={filters.setSelectCompany}
          >
            {companies.map((company, index) => (
              <Filter.SelectItems
                value={company.name}
                key={index}
              ></Filter.SelectItems>
            ))}
          </Filter.Select>
        </Filter>
      </div>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Nº NF, Fornecedor, Produto..."
          state={filters.inputName}
          setState={filters.setInputName}
        />
      </Filter>
    </div>
  );
}
