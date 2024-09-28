import { Separator } from "~/components/ui/separator";
import ExitsHistory from "./_components/exitsHistory/exitsHistory";
import ManageExits from "./_components/manageExits/manageExits";

export default function TelaSaidas() {
  return (
    <>
      <ManageExits />
      <Separator className="my-4" />
      <ExitsHistory />
    </>
  );
}
