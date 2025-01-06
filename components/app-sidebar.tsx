import { type LucideIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface AppSidebarProps {
  items: SidebarItem[];
  activeView: string;
  setActiveView: (view: string) => void;
}

export function AppSidebar({
  items,
  activeView,
  setActiveView,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-8 px-3">
        <Image
          src="/logo.png"
          width={70}
          height={70}
          className="rounded-full"
          alt="OUTR Logo"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => setActiveView(item.value)}
                    isActive={activeView === item.value}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
