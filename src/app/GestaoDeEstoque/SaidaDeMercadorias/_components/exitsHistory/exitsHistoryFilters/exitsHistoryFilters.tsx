"use client";
import { Calendar, UserCog } from "lucide-react";
import { Filter } from "~/components/filter";
import { useExitsHistoryFilters } from "./useExitsHistoryFilters";

export default function ExitsHistoryFilters() {
  const filters = useExitsHistoryFilters();

  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Calendar className={className} />
          )}
        />
        <Filter.DatePicker date={filters.date} setDate={filters.setDate} />
      </Filter>
      <Filter>                                                                                                                              
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <UserCog className={className} />
          )}
        />{" "}
        <Filter.Input
          placeholder="Responsável"
          state={filters.responsible}
          setState={filters.setResponsible}
        />
      </Filter>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <UserCog className={className} />
          )}
        />{" "}
        <Filter.Input
          placeholder="Requisitante"
          state={filters.requester}
          setState={filters.setRequester}
        />
      </Filter>
    </>
  );
}
