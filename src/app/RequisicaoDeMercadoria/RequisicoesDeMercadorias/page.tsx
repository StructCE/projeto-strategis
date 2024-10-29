"use client";
import { useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { TableComponent } from "~/components/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ManageAcceptedRequestsTable from "./_components/manageRequests/acceptedRequests/manageAcceptedRequests";
import ManagePendingRequestsTable from "./_components/manageRequests/pendingRequests/managePendingRequests";
import ManageRejectedRequestsTable from "./_components/manageRequests/rejectedRequests/manageRejectedRequests";

export default function RequestsHistory() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (
      status === "authenticated" &&
      !session?.user.allowedPagesPath.includes(pathname)
    ) {
      redirect("/");
    }
  }, [session, status, pathname]);

  if (status === "loading") return null;

  return (
    <div className="flex w-full flex-col bg-fundo_branco">
      <TableComponent>
        <TableComponent.Title>
          Requisições de Mercadorias do Estoque
        </TableComponent.Title>
        <Tabs defaultValue="pending" className="w-fill h-fill">
          <TabsList className="my-3 flex h-fit w-full justify-start gap-4 bg-[#DBDBDB] p-2">
            <TabsTrigger className="py-1 text-[16px]" value="pending">
              Pendentes
            </TabsTrigger>
            <TabsTrigger className="py-1 text-[16px]" value="accepted">
              Confirmadas
            </TabsTrigger>
            <TabsTrigger className="py-1 text-[16px]" value="denied">
              Rejeitadas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="pending">
            <ManagePendingRequestsTable />
          </TabsContent>
          <TabsContent value="accepted">
            <ManageAcceptedRequestsTable />
          </TabsContent>
          <TabsContent value="denied">
            <ManageRejectedRequestsTable />
          </TabsContent>
        </Tabs>
      </TableComponent>
    </div>
  );
}
