import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function SelectInput(props: {
  options: string[];
  useValue;
  setUseValue;
}) {
  return (
    <>
      <Select defaultValue={props.useValue} onValueChange={props.setUseValue}>
        <SelectTrigger className="">
          <SelectValue placeholder="Selecione" />
        </SelectTrigger>
        <SelectContent>
          {props.options.map((item, index) => (
            <SelectItem value={item} key={index}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
