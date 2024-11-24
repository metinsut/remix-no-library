import type { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { SidebarProvider } from "~/components/ui/sidebar";
import { requireAuthCookie } from "~/services/auth.server";
import { Header } from "./header";
import { AppSidebar } from "./sidebar/app-sidebar";

export async function loader({ request }: LoaderFunctionArgs) {
  await requireAuthCookie(request);
  return null;
}

export default function Index() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Header />
        <div className="flex flex-col flex-1 w-full p-4">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
