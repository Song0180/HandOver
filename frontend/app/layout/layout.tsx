import { Outlet, useLocation } from "react-router";

import { ThemeProvider } from "~/components/theme-provider";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { Separator } from "~/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { ModeToggle } from "~/components/mode-toggle";

export default function Layout() {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const paths = location.pathname.split("/").filter((path) => path);
    let currentPath = "";

    return paths.map((path, index) => {
      currentPath += `/${path}`;
      const formattedPath = path.charAt(0).toUpperCase() + path.slice(1);

      return (
        <BreadcrumbItem key={currentPath}>
          {index === paths.length - 1 ? (
            <BreadcrumbPage>{formattedPath}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={currentPath}>{formattedPath}</BreadcrumbLink>
          )}
          {index < paths.length - 1 && <BreadcrumbSeparator />}
        </BreadcrumbItem>
      );
    });
  };

  return (
    <ThemeProvider defaultTheme="system" storageKey="handover-theme">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 sticky top-0 z-10">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {location.pathname == "/" ? (
                  <BreadcrumbItem>
                    <BreadcrumbPage>Dashboard</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  getBreadcrumbs()
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              <ModeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
