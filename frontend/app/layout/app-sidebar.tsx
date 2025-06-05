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
import { Badge } from "~/components/ui/badge";
import { useLocation } from "react-router";
import { TeamSwitcher } from "~/components/team-switcher";
import { Gauge, ListTodo } from "lucide-react";
import { NavUser } from "~/components/nav-user";

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
          icon: Gauge,
        },
        {
          title: "Tasks",
          url: "/tasks",
          icon: ListTodo,
        },
      ],
    },
  ],
  user: {
    name: "Example User",
    email: "",
    avatar: "https://i.pravatar.cc/150?img=5",
  },
  teams: ["team1", "team2", "team3"],
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
        <TeamSwitcher teams={data.teams} defaultTeam={data.teams[0]} />
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
                      tooltip={item.title}
                    >
                      <a href={item.url}>
                        {item.icon && <item.icon />}
                        {item.title}
                      </a>
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
