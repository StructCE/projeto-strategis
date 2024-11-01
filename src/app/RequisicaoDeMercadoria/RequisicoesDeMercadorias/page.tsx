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
        <Tabs defaultValue="Esperando Confirmação" className="w-fill h-fill">
          <TabsList className="my-3 flex h-fit w-full justify-start gap-1.5 bg-[#DBDBDB] p-2 sm:gap-4">
            <TabsTrigger
              className="px-1.5 py-1 text-[14px] sm:px-3 sm:text-[16px]"
              value="Esperando Confirmação"
            >
              Pendentes
            </TabsTrigger>
            <TabsTrigger
              className="px-1.5 py-1 text-[14px] sm:px-3 sm:text-[16px]"
              value="Confirmada"
            >
              Confirmadas
            </TabsTrigger>
            <TabsTrigger
              className="px-1.5 py-1 text-[14px] sm:px-3 sm:text-[16px]"
              value="Rejeitada"
            >
              Rejeitadas
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Esperando Confirmação">
            <ManagePendingRequestsTable />
          </TabsContent>
          <TabsContent value="Confirmada">
            <ManageAcceptedRequestsTable />
          </TabsContent>
          <TabsContent value="Rejeitada">
            <ManageRejectedRequestsTable />
          </TabsContent>
        </Tabs>
      </TableComponent>
    </div>
  );
}
