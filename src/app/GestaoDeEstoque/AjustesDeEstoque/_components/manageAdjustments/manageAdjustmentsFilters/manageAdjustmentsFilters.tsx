"use client";
import { Calendar, UserCog2 } from "lucide-react";
import { Filter } from "~/components/filter";
import { useManageAdjustmentsFilters } from "./useManageAdjustmentsFilters";

export default function ManageAdjustmentsFilters() {
  const filters = useManageAdjustmentsFilters();

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Calendar className={className} />
          )}
        />
        <Filter.DatePicker
          date={filters.date}
          setDate={filters.setDate}
          open={filters.open}
          setOpen={filters.setOpen}
        />
      </Filter>
      <Filter className="lg:w-[250px]">
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <UserCog2 className={className} />
          )}
        />
        <Filter.Input
          placeholder="Responsável"
          state={filters.inputResponsible}
          setState={filters.setInputResponsible}
        />
      </Filter>
    </>
  );
}
