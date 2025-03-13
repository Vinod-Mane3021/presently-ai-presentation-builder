import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Header } from "@/components/header/header";
import { Separator } from "@/components/ui/separator";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider suppressHydrationWarning>
      <AppSidebar />
      <main className="w-full">
        <Header />
        <Separator className="w-full" />
        <div className="px-5 py-5 overflow-y-auto">{children}</div>
      </main>
    </SidebarProvider>
  );
}
