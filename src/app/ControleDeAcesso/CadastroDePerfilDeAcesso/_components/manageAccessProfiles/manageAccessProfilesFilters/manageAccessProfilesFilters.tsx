import { Search } from "lucide-react";
import { Filter } from "~/components/filter";

type ManageAccessProfilesFiltersProps = {
  inputNome: string;
  setInputNome: (value: string) => void;
};

export default function ManageAccessProfilesFilters(
  props: ManageAccessProfilesFiltersProps,
) {
  return (
    <>
      <Filter>
        <Filter.Icon
          icon={({ className }: { className: string }) => (
            <Search className={className} />
          )}
        />
        <Filter.Input
          placeholder="Nome do Cargo"
          state={props.inputNome}
          setState={props.setInputNome}
        />
      </Filter>
    </>
  );
}
