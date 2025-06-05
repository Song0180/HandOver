import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "~/components/ui/sidebar";
import { Logo } from "~/components/ui/logo";
import { NavUser } from "~/components/nav-user";
import { Badge } from "~/components/ui/badge";
import { useLocation } from "react-router";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Basic",
      url: "/",
      items: [
        {
          title: "Dashboard",
          url: "/",
        },
        {
          title: "Tasks",
          url: "/tasks",
        },
      ],
    },
  ],
  user: {
    name: "John Doe",
    email: "",
    avatar: "https://i.pravatar.cc/150?img=3",
  },
};

const version = __APP_VERSION__;

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-between w-full">
          <Logo />
          <Badge variant="secondary" className="text-xs">
            v{version}
          </Badge>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={
                        item.url === "/"
                          ? location.pathname === "/"
                          : location.pathname.startsWith(item.url)
                      }
                    >
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
