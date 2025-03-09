import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Header } from "@/components/header";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider className="" suppressHydrationWarning>
      <AppSidebar />
      <main className="w-full">
        <div className=" flex items-center py-4 gap-x-10 px-5">
          <SidebarTrigger className="p-1" />
          <Header />
        </div>
        <Separator className="w-full" />
        <div className="px-5 py-5">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
